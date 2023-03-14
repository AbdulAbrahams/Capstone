<template>
    <nav class="navbar navbar-light fixed-top">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <span class="name animate__animated animate__backInDown">Supremium</span>
          <button type="button" class="btn position-relative">
            <router-link to="/checkout"><i class="fa fa-shopping-cart cart"></i></router-link>
  <!-- <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill numbers">
    0
  </span> -->
</button>
          <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header" v-for="user in users" :key="user.userID">
      <a href="/profile" class="d-flex align-items-center link-dark text-decoration-none my-3 mx-2" :data-bs-target="`#NavUser${user.userID}`">
        <img :src="user.userProfile" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>{{ user.firstName }} {{ user.lastName }}</strong>
      </a>
            <button type="button" class="btn-close btn-light text-reset mx-2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3" data-bs-dismiss="offcanvas">
                <li class="nav-item my-4 mx-2">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="nav-item my-4 mx-2">
                    <router-link to="/admin">Admin</router-link>
                </li>
                <li class="nav-item my-4 mx-2">
                    <router-link to="/contact">Contact</router-link>
                </li>
              </ul>
            </div>
            <router-link to="/login" class="logBut mx-5 my-3 p-2"><a href="/login" class="butLog">Login</a></router-link>
          </div>
        </div>
      </nav>

</template>

<script>
import 'animate.css';
import axios from "axios";
    export default {
        name: 'Navbar',
        data() {
       return {
           users: []
       };
   },
   created() {
       this.fetchUsers();
   },
   methods: {
    async fetchUsers() {
           try{
               const response = await axios.get(`https://supremium2.onrender.com/users`);
               this.users = response.data.results;
               console.log(response);
           } catch (err) {
               console.log(err);
           }
       },
   },
};

</script>

<style  scoped>
.my-element {
  display: inline-block;
  margin: 0 0.5rem;

  animation: backInDown;
  animation-duration: 2s;
}

.container-fluid{
  text-align: center;
}

.navbar{
  text-align: center;
  background-color: white;
    opacity: 97%;
}

.navbar span{
  text-align: center;
}

.offcanvas{
    background-color: rgb(242, 242, 242);
    max-width: 70vw;
}


nav {
  padding: 30px;
}

nav a {
  font-size: 20px;
  text-decoration: none;
  font-weight: bold;
  color: #000000;
}

nav a.router-link-exact-active {
  color: rgb(16, 114, 16);
}
.navbar-toggler{
    border: 2px solid grey;
    border-radius: 0px;
}
.cart{
    font-size: 29px;
}

.name{
  padding-right: 5px;
  padding-left: 5px;
  border: 2px solid black;
  font-size: 20px;
  font-family: 'Syne', sans-serif !important;
  font-weight: 800;
}

.numbers{
    color: black;
    font-size: 18px;
}

.butLog{
  font-family: 'Syne', sans-serif !important;
    color: rgb(0, 0, 0);
}

.logBut{
            text-align: center;
            text-decoration: none;
            max-width: 75%;
            background: transparent;
            border: 2px solid black;
        }

        .logBut:hover{
           opacity: 60%;
           transition: 0.4s;
        }

</style>