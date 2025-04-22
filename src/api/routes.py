"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import timedelta

from flask_jwt_extended import  JWTManager,create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)

jwt = JWTManager() 
bcrypt = Bcrypt()  

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['POST'])
def add_user():

    try:
        email=request.get_json()["email"]
        name=request.get_json()["name"]
        password=request.get_json()["password"]
        
        if not email or not name or not password:
            return jsonify({"msg":"Falta por llenar campos"}),400
        
        existe_user=User.query.filter_by(email=email).first()

        if existe_user:
            return jsonify({"msg":"Ya se registro el email"}),409

        password_hashed=bcrypt.generate_password_hash(password).decode("utf-8")

        new_usuario=User(email=email,password=password_hashed,name=name)

        db.session.add(new_usuario)
        db.session.commit()

        
        return jsonify({"msg":"Craedo exitosamente"}), 201

    except Exception as e:
        return jsonify({
            "error":str(e)
        })

@api.route("/token",methods=["POST"])
def token():
    try:
        email=request.get_json()["email"]
        password=request.get_json()["password"]

        if not email or not password:
            return jsonify({"msg":"Falta por llenar campos"}),400
        
        user=User.query.filter_by(email=email).one()

        if not user :
            return jsonify({"msg":"Email no encntrado"}),404
        
        hashed_password=user.password

        its_valid_password=bcrypt.check_password_hash(hashed_password,password)

        if its_valid_password:
            expires=timedelta(days=1)
          
            token=create_access_token(identity=str(user.id),expires_delta=expires)
            return jsonify({ 'access_token':token}), 200
        else :
            return jsonify({"msg":"Password  email equivocado"}),404
    

    except Exception as e:
        return jsonify({
            "error":str(e)
        })



   

@api.route("/users",methods=["GET"])
@jwt_required()
def get_users():
    user_id=get_jwt_identity()

    if user_id:
        user=User.query.filter_by(id=user_id).one()

        return jsonify(user.serialize()), 200
    
    else:
        return {"Error": "Token inválido o no proporcionado"}, 401
