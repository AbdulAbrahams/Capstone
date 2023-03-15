import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";

const Supremium = "https://supremium2.onrender.com/";

export default createStore({
  state: {
    users: null,
    user: null || JSON.parse(localStorage.getItem("user")),
    products: null,
    product: null,
    token: null,
    cart: null,
  },
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getProducts: (state) => state.products,
    getProduct: (state) => state.product,
    getCart: (state) => state.cart,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },

    setUser(state, user) {
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },

    setProducts(state, products) {
      state.products = products;
    },

    setSingleProduct(state, product) {
      state.product = product;
    },

    setCart(state, cart) {
      state.cart = cart;
    },
    LogOut(state){ 
      (state.user = ""), 
      (state.token = "") 
     },
  },
  actions: {
    registerUser: async (context, payload) => {
      const { firstName, lastName, userEmail, userPass } = payload;
      await fetch("http://localhost:6060/register", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          userEmail: userEmail,
          userPass: userPass,
        }),
      })
        .then((response) => response.json())
        .then((json) =>
          context.commit(
            "setUsers",
            json,
            router.push({
              name: "login",
            })
          )
        );
    },

    async loginUser(context, payload) {
      fetch("http://localhost:6060/login", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (
            data.msg ===
            " You have entered an incorrect Email or Password. Please try again."
          ) {
          } else {
            console.log("Logged in");
            console.log(data.data.user);
            context.commit("setUser", data.data.user);
            router.push({ name: "home" });
          }
        });
    },

    getUsers: async (context) => {
      let res = await fetch("https://supremium2.onrender.com/users");
      let data = await res.json();
      let result = data.results;
      if (result) {
        context.commit("setUsers", result);
      } else {
        console.log(`Loading...`);
      }
    },

    getUser: async (context, userID) => {
      console.log(userID);
      let data = await fetch(`https://supremium2.onrender.com/user/` + userID);
      let user = await data.json();
      console.log(user);
      // context.commit("setUser", user.results[0]);
    },

    deleteUser: async (context, userID) => {
      await fetch("https://supremium2.onrender.com/user/" + userID, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => context.dispatch("getUsers"));
    },

    createUser: async (context, payload) => {
      const { firstName, lastName, userEmail, userPass } = payload;

      await fetch(
        "https://supremium2.onrender.com/users/" + context.state.user.userID,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            userEmail: userEmail,
            userPass: userPass,
          }),
        }
      )
        .then((response) => response.json())
        .then((json) =>
          context.commit(
            "setUser",
            json,
            router.push({
              name: "Admin",
            })
          )
        );
    },

    editUser: async (context, user) => {
      await fetch("https://supremium2.onrender.com/user/" + user.userID, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((editUser) => editUser.json())
        .then((data) => {
          context.dispatch("getUser");
          console.log(data);
          router.push({ name: "admin" });
        });
    },

    getProducts: async (context) => {
      let res = await fetch("https://supremium2.onrender.com/products");
      let data = await res.json();
      let result = data.results;
      if (result) {
        context.commit("setProducts", result);
      } else {
        console.log("Get products failed");
      }
    },

    getSingleProduct: async (context, id) => {
      let data = await fetch(`https://supremium2.onrender.com/product/` + id);
      let product = await data.json();
      console.log(product.results);
      context.commit("setSingleProduct", product.results[0]);
    },

    addProducts: async (context, payload) => {
      const { prodName, price, brand, prodDescription, imgURL } = payload;

      try {
        await fetch("https://supremium2.onrender.com/products/", {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            prodName: prodName,
            price: price,
            brand: brand,
            prodDescription: prodDescription,
            imgURL: imgURL,
          }),
        })
          .then((response) => response.json)
          .then((json) => context.commit("setProducts", json.data));
        router.push({ name: "Admin" });
      } catch (e) {
        console.log(e);
      }
    },

    deleteProduct: async (context, id) => {
      await fetch("https://supremium2.onrender.com/product/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => context.dispatch("getProducts"));
    },

    editProduct: async (context, product) => {
      await fetch("https://supremium2.onrender.com/product/" + product.id, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((editProduct) => editProduct.json())
        .then((data) => {
          context.dispatch("getSingleProducts");
          console.log(data);
          router.push({ name: "admin" });
        });
    },
  },

  modules: {},
});
