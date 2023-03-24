import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

// const Supremium = "https://supremium2.onrender.com/";

export default createStore({
  state: {
    users: null,
    user: null || JSON.parse(localStorage.getItem("user")),
    products: null,
    product: null,
    token: null  || localStorage.getItem("token"),
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

    sortPrice: (state) => {
      state.products.sort((a, b)=> {
        return a.price - b.price;
      })
      if(!state.asc) {
        state.products.reverse()
      }
      state.asc =!state.asc
    },

    setCart: (state, cart) => {
      if (cart === null) {
        state.cart = null;
      } else {
        state.cart = cart;
      }
    },
  },
  actions: {
    registerUser: async (context, payload) => {
      const { firstName, lastName, userEmail, userPass } = payload;
      await fetch("https://supremium2.onrender.com/register", {
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
        .then((data) => {
          if (data.err === "Email already in use") {
            alert( "Email already in use." );
            document.location.reload();
          } else {
            console.log("Registered");
          context.commit("setUsers", data)
            router.push({name: "login"})
          }
        });
    },

    async loginUser(context, payload) {
      fetch("https://supremium2.onrender.com/login", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.err === "You entered an incorrect password or not registered. Please try again") {
            alert( "You have entered an incorrect Email or Password. Please try again." );
            document.location.reload();
          } else {
            console.log("Logged in");
            context.commit("setUser", data.data.user);        
            cookies.set("token", data.token)
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

    addUser: async (context, payload) => {
      const { firstName, lastName, userEmail, userPass } = payload;
      await fetch("https://supremium2.onrender.com/register", {
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
          document.location.reload()
        });
    },

    checkAdmin(context) {
      // fetch("https://supremium2.onrender.com/user/" + user.userID);
      if (context.state.user != null) {
        if (context.state.user.userRole = "Admin") {
          context.state.admin = true;
        } else {
          context.state.admin = false;
        }
      }
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

    addProduct: async (context, payload) => {
      console.log(payload)
      const { prodName, prodDescription, brand, price, prodQuantity, imgURL } = payload;
      await fetch("https://supremium2.onrender.com/product", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ 
          prodName: prodName,
          prodDescription: prodDescription,
          brand: brand,
          price: price, 
          prodQuantity: prodQuantity, 
          imgURL: imgURL 
        }),
      })
        .then((response) => response.json())
        .then((json) =>
          context.commit("setProducts", json,
            router.push({name: "admin"})
          )
        );
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

    getCart: async (context, userID) => {
      userID = context.state.user.userID
      await fetch(`https://supremium2.onrender.com/users/${userID}/cart`, {
          method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data != null) {
            context.commit("setCart", data);
          } else {
            context.commit("setCart", null);
          }
        });
    },
    
    addToCart: async (context, item, userID) => {
      userID = context.state.user.userID;
        await fetch("https://supremium2.onrender.com/users/" + userID + "/cart", {
          method: "POST",
          body: JSON.stringify(item),
          headers: {"Content-type": "application/json; charset=UTF-8"},
        })
        .then((res) => res.json())
        .then((data) => {
          context.dispatch("getCart", data);
        });
    },

    deleteFromCart: async (context, cart, userID) => {
      console.log(cart)
      userID = context.state.user.userID;
      await fetch("https://supremium2.onrender.com/users/" + userID + "/cart/" + cart, {
            method: "DELETE",
          }
        )
        .then((res) => res.json())
        .then((data) => {
          context.dispatch("getCart", userID, data);
        });
    },

    deleteCart: async (context, userID) => {
      await fetch("https://supremium2.onrender.com/users/" + userID + "/cart/", {
          method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // context.state.msg = data.msg;
          context.dispatch("getCart", userID);
        });
    },
  },

  modules: {},
});
