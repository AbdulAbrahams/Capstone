<template>
    <div v-if="user">
       <Navbar/>
    <div class="profile">
        <div class="single">
           <div class="main container justify-content-center">
                <div class="row justify-content-center">
                    <div class="col-md-4 my-5 mt-1 prof">
                        <div class="card text-center sidebar">
                            <div class="card-body">
                                <img :src="user.userProfile" alt="" class="my-4">
                                <div class="card-text">
                                    <h3 class="my-4">{{ user.firstName }} {{ user.lastName }}</h3>
                                    <a href="" class="logBut bg-white my-3 p-2 px-5" @click="LogOut()">Log Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 my-5 mt-1 about">
                        <div class=" mx">
                            <h1>Profile</h1>
                            <!-- <form @submit.prevent="editUser" action="POST">
                            <div class="row my-5 aboutRow">
                                <div class="col aboutHead">
                                    First Name
                                </div>
                                <div class="col-8">
                                    <input type="text" v-model="user.firstName">
                                </div>
                            </div>
                            <div class="row my-5 aboutRow">
                                    <div class="col aboutHead">
                                        Last Name
                                    </div>
                                    <div class="col-8">
                                        {{ user.lastName }}
                                    </div>
                        </div>
                            <div class="row my-5 aboutRow">
                                <div class="col aboutHead">
                                    Email
                                </div>
                                <div class="col-8 email">
                                    {{ user.userEmail }}
                                </div>
                        </div>
                        <button @click="this.$store.dispatch('editUser', user)" class="btn btn-dark" id="submit">Save Changes</button>
                        </form> -->

            <form autocomplete="off" @submit.prevent="editUser" method="POST">
                <p>First Name</p>
                <input class="col-12 my-3" id="Name" type="text" v-model="user.firstName" required>
                <p>Last Name</p>
                <input class="col-12 my-3" id="Brand" type="text" v-model="user.lastName" required>
                <p>Email Address</p>
                <input class="col-12 my-3 emailAdd" id="Price" type="text" v-model="user.userEmail" required>
                <p>Profile Image</p>
                <input class="col-12 my-3" id="img" type="text" v-model="user.userProfile" required>
                <div class="modal-footer">
                    <button @click="this.$store.dispatch('editUser', user)" class="btn btn-dark" id="submit">Save Changes</button>
                </div>
            </form>
                </div>
            </div>
        </div>
        </div>
        </div>
        <Footer/>
        </div> 
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
        name: 'Profile', 
        components: {Navbar, Footer, Spinner} ,
        computed: {

        user() {
            return this.$store.state.user;
        },
    },
    created() {
        console.log();
    },
    methods: {

        LogOut() {
       this.$store.state.user = null
       localStorage.clear()
       this.$router.push("/");
    }
}
}
</script>

<style scoped>

.prof{
    justify-content: center !important;
}
.profile{
    justify-content: center;
    align-items: center;
    /* overflow-x: hidden; */
    margin-top: 130px;
    min-height: 120vh;
}

.card{
    max-width: 100%;
}

.card-body{
    height: 445px;
    background-color: black;
    color: white;
}

.card-body img{
    margin-top: 15px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
}

.logOut{
    margin-top: 30px !important;
}

.about{
    max-width: 100%;
}

.aboutRow{
    padding: 10px;
    border-bottom: 1px solid black;
}

.aboutHead{
    font-size: 20px;
    font-weight: bold;
}

.col-8{
    word-wrap: break-word;   
    font-size: 18px;
}



.logBut{
            text-align: center;
            text-decoration: none;
            max-width: 100px !important;
            color: rgb(0, 0, 0);
        }

        .logBut:hover{
            color: rgb(0, 0, 0);
           opacity: 90%;
        }

</style>