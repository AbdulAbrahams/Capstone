<template>
    <div v-if="user">
    <Navbar/>
    <div v-if="cart">
        <div class="body">
            <div class="container loginbox p-2  animate__animated animate__fadeIn">
                <h1 class="my-4 head">Checkout</h1>
                <div class="container">
                    <table class="table">
                    <thead>
                        <tr>
                        <th class="col-6"><h3>Product</h3></th>
                        <th class="col-6"><h3>Price</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="prodRow my-5" v-for="item in cart" :key="item.id">
                        <td><img :src="item.imgURL" alt="" class="checkIMG"></td>
                        <td class="text-success"><h5 class="my-4">${{ item.price }}</h5></td>
                        <th><button class="btn btn-danger my-3" @click="deleteFromCart(item.id)">Del</button></th>
                        </tr>
                    </tbody>
                    </table>
                </div>
        </div>
            </div>
            <Footer/>
    </div>
    <div v-else>
        <div class="body">
            <div class="container loginbox p-2  animate__animated animate__fadeIn">
                <h1 class="my-4 head">Checkout</h1>
                <div class="container">
                    <table class="table">
                    <thead>
                        <tr>
                        <th class="col-6"><h3>Product</h3></th>
                        <th class="col-6"><h3>Price</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="prodRow my-5">
                        <td><img src="https://i.postimg.cc/7ZXKpZ68/nikesb-dunk-paris-020d4294749750daa11b9b866154bc17.jpg" alt="" class="checkIMG"></td>
                        <td class="text-success"><h5 class="my-4">$130000</h5></td>
                        <th><button class="btn btn-danger my-3" @click="deleteFromCart(item.id)">Del</button></th>
                        </tr>
                    </tbody>
                    </table>
                </div>
        </div>
    </div>
    </div>
    <Footer/>
    </div>


    <div v-else>
    <div class="container">
        <div class="row vh-100 d-flex justify-content-center align-content-center">
          <div class="text-center">
            <h2>You are not Logged In<br/>Please Log In</h2>
              <router-link to="/login"><a class="btn btn-dark mx-2">Login</a></router-link>
              <router-link to="/"><a class="btn btn-dark mx-2">Back to Homepage</a></router-link>
          </div>
        </div>
      </div>
</div>
</template>

<script>
import 'animate.css';
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
    export default {
        name: 'Checkout',
        components: {Navbar, Footer},
    computed: {
        user() {
            return this.$store.state.user;
        },
        cart() {
            console.log(this.$store.state.cart)
            return this.$store.state.cart
        },
    },

    mounted() {
        this.$store.dispatch("getCart", this.userID)
    },

    methods: {
        deleteFromCart(id) {
          this.$store.dispatch("deleteFromCart", id);
           alert("Product was deleted");
        },
    }
}
</script>

<style scoped>

.table{ 
    color: white;
    text-align: center;
}

.table th{
    border-style: none;
}

.table td{
    border-style: none;
}

.checkIMG{
    height: 70px;
    width: 110px;
}

.my-element {
  animation: fadeIn;
  animation-duration: 5s;
}


.body{
    margin: 0;
    padding: 0;
    background-position: center;
    background-size: cover;
    min-height: 100vh;
}
.loginbox{
    background-color: #000;
    color: white;
    top: 30%;
    left: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    margin-top: 130px;
}

h1{
    margin: 0;
    padding: 0 0 10px;
    text-align: center;
    font-size: 28px;
}

.loginbox p{
    margin: 0;
    padding: 0;

}

.loginbox input{
    width: 100%;
    margin-bottom: 20px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    outline: none;
    height: 40px;
    color: white;

}

.loginbox button{
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 0px;
}

.loginbox button:hover{
    transition: 0.3s;
    opacity: 80%;
}

.loginbox a{
    text-decoration: none;
    color: white;
}

.loginbox a:hover{
    color: rgb(198, 191, 191);
    transition: 0.3s;
}

.head{
    font-family: 'Syne', sans-serif !important;
}

.log{
    font-family: 'Syne', sans-serif !important;
}

.btn{
    border-radius: 0px;
}

</style>