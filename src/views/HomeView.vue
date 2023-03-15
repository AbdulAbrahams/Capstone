<template>
  <div class="everything">
    <Navbar/>
  <div class="intro">
    <video autoplay loop muted playsinline class="vid">
      <source src="../assets/videoplayback.webm" type="video/mp4">
    </video>
  </div>
  <div class="container">
    <h1>Our Sneakers</h1>
    <div class="row justify-content-center">
      <div class="col-md-4 mt-5 sneaks" v-for="item in items" :key="item.id">
              <div class="card">
                <img :src="item.imgURL" alt="" class="card-img-top w-100" style="height: 300px;">
                <div class="card-body">
                  <h3 class="card-title my-2">{{ item.prodName }}</h3>
                    <div class="d-flex justify-content-between deats">
                      <router-link :to="{ name: 'singleProduct', params: { id: item.id }}">
                    <button type="button" class="btn btn-sm view">View More</button>
                </router-link>
                      <p class="my-1 price text-success">${{ item.price }}</p>
                    </div>
                </div>
              </div>
            </div>
    </div>
  </div>
  <Footer/>
  </div>
  
  
</template>

<script>
import axios from "axios";
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
  export default {
      name: 'HomeView',
      components: {Navbar, Footer},
      data() {
     return {
         items: this.$store.state.products,
     };
 },
 
 computed: {
        products() {
            return this.$store.state.products?.filter(products => { let isMatch = true; if (!products.title.toLowerCase().includes(this.search.toLowerCase())) { isMatch = false; } return isMatch });
        },
    },
    mounted() {
        this.$store.dispatch("getProducts");
        this.$store.commit("setSingleProduct", null);
    },
};

</script>

<style>

.intro{
    overflow-x: hidden;
}

.intro video{
 max-width: 100vw;
}

.container{
  margin-top: 5vh;
}

.prodHead{
  text-align: center;
}

.card{
  border-radius: 0px;
  max-height: 420px; 
  max-width: 450px;
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

</style>