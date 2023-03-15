<template>
    <Navbar/>
    <div class="body">
        <div class="container loginbox p-2  animate__animated animate__fadeIn">
            <h1 class="my-4 head">Checkout</h1>
            <div class="row justify-content-center">
                <div class="col products"> Products</div>
                <div class="col price">Price</div>
            </div>
    </div>
        </div>
</template>

<script>
import 'animate.css';
import Navbar from '../components/Navbar.vue'
    export default {
        name: 'Login',
        components: {Navbar},
        data() {
        return {
           userEmail: "",
           userPass: "",
        };
    },
    methods: {
       async loginUser () {
       const payload = {
            userEmail: this.userEmail,
            userPass: this.userPass
        };
        await this.$store.dispatch("loginUser", payload)
       },
    }
}
</script>

<style scoped>

.row{
    text-align: center;
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

</style>