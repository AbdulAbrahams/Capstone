<template>
    <Navbar/>
    <div class="body">
        <div class="loginbox p-2  animate__animated animate__fadeIn container">
            <h1 class="my-4 head">Contact</h1>
            <form action="https://formspree.io/f/xzbwjdvo" method="POST" class="form" style="padding-bottom: 7%;">
          <div class="row">
            <div class="col mx-3">
              <input type="text" class="form-control" name="name" placeholder="First name" aria-label="First name" required>
            </div>
            <div class="col mx-3">
              <input type="text" class="form-control" name="lastname" placeholder="Last name" aria-label="Last name" required>
            </div>
          </div>
          <div class="mb-3 mx-3">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Your Email" required>
          </div>
        
            <div class="mb-3 mx-3">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name="message" placeholder="Enter Message Here" required></textarea>
            </div>
            <div class="but">
                <button type="submit" class="btn btn-light subButton" name="submit">Submit</button>
            </div>
        </form>

        
    </div>
        </div>
</template>

<script>
import 'animate.css';
import Navbar from '../components/Navbar.vue'
    export default {
        name: 'Contact',
        components: {Navbar}
}
</script>

<style scoped>

.form{
    justify-content: center;
}
.my-element {
  animation: fadeIn;
  animation-duration: 5s;
}

.body{
    margin: 0;
    padding: 0;
    min-height: 100vh;
}
.loginbox{
    min-width: 315px;
    width: 60%;
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
    border-radius: 0px;
    outline: none;
    height: 40px;
    color: white;

}

.loginbox textarea{
    width: 100%;
    margin-bottom: 20px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    outline: none;
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

.but{
    display: flex;
  justify-content: center;
  align-items: center;
}

.head{
    font-family: 'Syne', sans-serif !important;
}

.subButton{
    max-width: 50%;
    font-family: 'Syne', sans-serif !important;
}

</style>