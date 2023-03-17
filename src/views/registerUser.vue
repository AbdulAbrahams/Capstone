<template>
    <div class="body">
        <div class="loginbox animate__animated animate__fadeIn">
            <h1 class="my-5 head">Register</h1>
            <form @submit.prevent="registerUser" method="POST" class="mx-4 my-5">
                <div class="row">
        <div class="col">
            <p>FirstName</p>
          <input type="text" class="form-control" v-model="register.firstName" name="firstName" placeholder="Enter FirstName" aria-label="First name" required="">
        </div>
        <div class="col">
            <p>LastName</p>
          <input type="text" class="form-control" v-model="register.lastName" name="lastName" placeholder="Enter LastName" aria-label="Last name" required="">
        </div>
      </div>
      <div class="row">
        <div class="col">
            <p>Email</p>
          <input type="text" class="form-control" v-model="register.userEmail" name="userEmail" placeholder="Enter Email" aria-label="First name" required="">
        </div>
      </div>
      <div class="row">
        <div class="col">
            <p>Password</p>
          <input type="password" class="form-control"  v-model="register.userPass" name="userPass" placeholder="Enter Password" aria-label="Last name" required="">
        </div>
      </div>

<div>
<button type="submit" class="btn btn-light reg" value="register" v-on:click="toggle"><span id="logs">Register</span><i class="fa fa-spinner fa-spin" id="icon"></i></button>
</div>

<router-link to="/login"><a href="">Already have an account?</a></router-link>
</form>
            

        
    </div>
        </div>
</template>

<script>
import 'animate.css';
    export default {
        name: 'registerUser',
        data() {
        return {
            register: {
            firstName: "",
            lastName: "",
            userEmail: "",
            userPass: "", 
            }
            
        };
    },
    methods: {
        async registerUser() {
           await this.$store.dispatch("registerUser", this.register);
            this.register.firstName = "";
            this.register.lastName = "";
            this.register.userEmail = "";
            this.register.userPass = "";
            },

            toggle: function(){
        document.querySelector("#icon").style.display = "inline-block";
        document.querySelector("#logs").style.display = "none";
       }
        }
    }
    
</script>

<style scoped>

i{
    display: none;
}
.my-element {
  animation: fadeIn;
  animation-duration: 5s;
}

.body{
    margin: 0;
    padding: 0;
    background: url(https://i.postimg.cc/FHmM7t6Z/paul-volkmer-AZf7-DL-8-Qhk-unsplash.jpg);
    background-position: center;
    background-size: cover;
    min-height: 100vh;
}

.loginbox{
    min-width: 300px;
    max-width: 700px;
    background-color: #000;
    color: white;
    top: 50%;
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

.loginbox form input{
    /* width: 100%; */
    margin-bottom: 20px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    outline: none;
    height: 30px;
    color: white;
    border-radius: 0px;

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

.reg{
    font-family: 'Syne', sans-serif !important;
}

@media screen and (width <= 650){
    .loginbox{
        width: 70% !important;
    }
}
</style>