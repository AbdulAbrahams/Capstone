<template>
    <div class="body">
        <div class="loginbox p-2  animate__animated animate__fadeIn">
            <h1 class="my-4 head">Login</h1>
            
            <form @submit.prevent="loginUser" method="POST" class="mx-3 my-3">
    <div>
        <p>Email</p>
       <input type="email" v-model="userEmail" name="userEmail" id="email" class="my-2" placeholder="Enter Email" required> 
    </div>
    <div>
        <p>Password</p>
        <input type="password" v-model="userPass" name="password" id="password" class="my-2" placeholder="Enter Password" required>
    </div>
    <div>
      <button class="btn btn-light log" v-on:click="submit">Login</button>
    </div>
    
    <a href="">Forgot Password?</a><br>
    <router-link to="/register"><a href="">Don't have an account?</a></router-link>
     </form>

        
    </div>
        </div>
</template>

<script>
import 'animate.css';
    export default {
        name: 'Login',
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