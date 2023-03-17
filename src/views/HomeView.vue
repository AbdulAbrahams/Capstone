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
      <div>
        <h1>Our Sneakers</h1>
        <select v-model="sort" @change="sortItems" class="form-select">
                <option value="" selected disabled>Sort Alphabetically</option>
                <option value="desc">A-Z</option>
                <option value="asc">Z-A</option>
              </select>
      </div>
      <div class="col-md-4 mt-5 sneaks" v-for="item in items" :key="item.id">
              <div class="card homeCard">
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
         items: this.$store.state.products,
     };
 },
 
 computed: {
        items() {
            return this.$store.state.products;
        },
    },
    mounted() {
        this.$store.dispatch("getProducts");
        this.$store.commit("setSingleProduct", null);
    },

      // search: function(){
      //   searchInput = document.querySelector("[data-search]")

      //   searchInput.addEventListener("input", e => {
      //     const value = e.target.value
      //     items.forEach(item => {
      //       const isVisible = item.prodName.includes(value)
      //       item.element.classList.toggle("hide", !isVisible)
      //     })
      //   })
      // }

  //     methods: {
  //       sortItems() {
  //     let items = this.$store.state.products;
  //     let sorting = this.sort;
  //     if (sorting === "desc") {
  //       items.sort(function (a, z) {
  //         var nameA = a.product.toLowerCase(),
  //           nameB = z.product.toLowerCase();
  //         if (nameA < nameB)
  //           //sort string ascending
  //           return -1;
  //         if (nameA > nameB) return 1;
  //         return 0; //default return value (no sorting)
  //       });
  //     } else if (sorting === "asc") {
  //       items.sort(function (a, ) {
  //         var nameA = a.product.toLowerCase(),
  //           nameB = b.product.toLowerCase();
  //         if (nameA > nameB)
  //           //sort string ascending
  //           return -1;
  //         if (nameA < nameB) return 1;
  //         return 0; //default return value (no sorting)
  //       });
  //     }
  //   },
  // },
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