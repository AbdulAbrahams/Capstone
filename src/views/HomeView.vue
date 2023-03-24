<template>
  <div class="everything" v-if="items">
    <Navbar/>
  <div class="intro">
    <video autoplay loop muted playsinline class="vid">
      <source src="../assets/videoplayback.webm" type="video/mp4">
    </video>
  </div>
  <div class="container">
    <div class="row justify-content-center">
      <div class="d-flex justify-content-between">
        <h1>Our Sneakers</h1>
        <nav class="navbar navbar-light">
  <div class="container-fluid">
    <button class="navbar-toggler2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar">
      <img src="https://i.postimg.cc/vTWgfnFC/search-interface-symbol.png" class="icon">
    </button>
    <div class="offcanvas searchCan offcanvas-end" tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <input class="offcanvas-title search" type="text" v-model="searching" name="name" placeholder="Search">
      </div>
    </div>
  </div>
</nav>
      </div>
      <button class="sort my-3" @click="sortPrice">Sort by Price</button>
        <div class="col-md-4 mt-5 sneaks" v-for="item in items" :key="item.id">
                <div class="card homeCard">
                  <img :src="item.imgURL" alt="" class="card-img-top w-100" style="height: 300px;">
                  <div class="card-body">
                    <h3 class="card-title my-2">{{ item.prodName }}</h3>
                      <div class="d-flex justify-content-between deats" v-if="user">
                        <router-link :to="{ name: 'singleProduct', params: { id: item.id }}">
                      <button type="button" class="btn btn-sm view">View More</button>
                  </router-link>
                        <p class="my-1 price text-success">${{ item.price }}</p>
                      </div>
                      <div v-else>
                        <div class="d-flex justify-content-between deats">
                        <router-link :to="{ name: 'login'}">
                      <button type="button" class="btn btn-sm view">View More</button>
                  </router-link>
                        <p class="my-1 price text-success">${{ item.price }}</p>
                      </div>
                      </div>
                  </div>
                </div>
              </div>  
      </div>
  </div>
  <Footer/>
</div>
<div v-else>
    <Spinner />
</div>
  

 

  
  
  
</template>

<script>
import axios from "axios";
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Spinner from '../components/Spinner.vue'
  export default {
      name: 'HomeView',
      components: {Navbar, Footer, Spinner},
      data() {
     return {
         searching: '',
     };
 },
 
 computed: {
        user() {
            return this.$store.state.user;
        },
        products() {
            return this.$store.state.products;
        },
        items() {
          if(this.searching.toLowerCase().trim().length > 0){
            return this.products.filter((name)=> name.prodName.toLowerCase().includes(this.searching.toLowerCase().trim()))
          }
            return this.products
        }
    },
    mounted() {
        this.$store.dispatch("getProducts");
        this.$store.commit("setSingleProduct", null);
    },

    methods: {
        sortPrice() {
            this.$store.commit("sortPrice")
        },
      }
};

</script>

<style>

.sort{
  border: none;
  background: transparent;
}


.navbar-toggler2{
  border: none;
  background: transparent;
}

.icon{
  height: 25px;
}

.search{
  border: none;
  background: black;
  color: white;
  width: 100%;
  padding: 10px;
}

.searchCan{
  width: 100%;
  background: black;
  height: 80px;
}

.intro{
    overflow-x: hidden;
}

.intro video{
 max-width: 100vw;
}

.container{
  justify-content: center;
  margin-top: 5vh;
}

.prodHead{
  text-align: center;
}

.sneaks{
  min-width: 360px;
}
.homeCard{
  border-radius: 0px;
  height: 420px; 
  max-width: 510px;
}

.col{
  justify-content: center;
}

.card img{
  max-width: 510px;
}

.deats{
  align-items: center;
}

.view{
  border-radius: 0px;
  border: 2px solid black;
  
}

.view:hover{
  color: white;
  background-color: black;
}

.card-title{
  font-size: 23px;
}
.price{
  font-size: 19px;
}

@media screen and (width <= 768px) {
  .intro video{
    margin-top: 20vh;
  }
}

@media screen and (width <= 375px) {
  .sneaks{
  min-width: 300px;
}
}

</style>