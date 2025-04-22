const url = `${process.env.BACKEND_URL}`;

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {},
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      signupFetch: async (body) => {
        try {
          const response = await fetch(`${url}/api/users`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(response.status);
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      fetchUser: async () => {
        try {
          const response = await fetch(`${url}/api/users`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
			  "Authorization":`Bearer ${sessionStorage.getItem("user_token")}`
            },
          });

          if (!response.ok) {
            throw new Error(response.status);
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      loginFetch: async (body) => {
        try {
          const response = await fetch(`${url}/api/token`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(response.status);
          }

          const data = await response.json();

          sessionStorage.setItem("user_token", data.access_token);
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      getSessionStorage: () => {
        let data = sessionStorage.getItem("user_token");

        if (data) {
          return true;
        } else {
          return false;
        }
      },
      deleteSessionStorage: () => {
        sessionStorage.removeItem("user_token");
      },
    },
  };
};

export default getState;
