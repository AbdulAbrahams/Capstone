<template>
    <Navbar/>
    <div v-if="product" class="single">
        <div class="container">
            <div class="row">
                <div class="col-md-6 my-4">
                <div class="card">
                <img :src="product.imgURL" alt="" class="card-img-top w-100" style="max-height: 320px;">
              </div>
                </div>
                <div class="col-md-6 my-4">
                   <h2 class="title">{{ product.prodName }}</h2>
                <p>{{ product.prodDescription }}</p> 
                <div class="row mx-2">
                    <button class="col-6 price">${{ product.price }}</button>
                    <button class="my-5 buy col-6" @click="addCart">Add to Cart</button>
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
import Spinner from '../components/Spinner.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
    props: ['id'],
    name: 'SingleProduct',
    components: {Navbar, Footer, Spinner},
    computed: {
        product() {
            return this.$store.state.product;
        },
    },
    created() {
        this.$store.dispatch("getSingleProduct", this.$route.params.id);
        console.log();
    },

    methods: {
        addCart() {
      this.$store.dispatch("addToCart", {
        userID: this.userID,
      })
    }
  }
}

    //     Alert() {
    //         alert("Item added to Cart")
    //    }
</script>

<style>

.card{
    max-width: 500px;
}

.buy{
    padding: 10px;
    border: 2px solid rgb(255, 255, 255);
    color: rgb(255, 255, 255);
    background-color: rgb(16, 114, 16);
}

.title{
    font-size: 55px;
   font-weight: 800;
}

.price{
    font-size: 26px;
    background: transparent;
    border: 0px;
    color: rgb(16, 114, 16);
    cursor: default !important;
}

.single{
    margin-top: 120px;
}


</style>