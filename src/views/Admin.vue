<template>
    <Navbar/>
    <div class="cont">
      <div class="users container">
      <h1 >Users</h1>
      <!-- <button type="button" class="btn btn-dark my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Add User
  </button> -->
  
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="registerUser" method="POST">
            <p>First Name</p>
            <input class="col-12 my-3" id="Name" type="text" v-model="register.firstName" name="firstName"  required>
                  <p>Last Name</p>
                  <input class="col-12 my-3" id="Brand" type="text" v-model="register.lastName" name="lastName" required>
                  <p>Email Address</p>
                  <input class="col-12 my-3" id="Price" type="text" v-model="register.userEmail" name="userEmail" required>
                  <p>Password</p>
                  <input class="col-12 my-3" id="img" type="password" v-model="register.userPass" name="userPass" required>
          </form>
          <div class="modal-footer">
          <button type="submit" class="btn btn-primary">Create User</button>
        </div>
        </div>
        
      </div>
    </div>
  </div>
    </div>
         <div class="table crud-table">
              <table class="table align-middle container-sm">
              <thead class="">
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>Profile Image</th>
                  <th>Edit</th>
              </thead>
              <tbody id="shoe-list" class="">
                <tr v-for="user in users" :key="user.id" style="font-size: 14px;">
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.userRole }}</td>
                    <td><img :src="user.userProfile" style="width: 60px; height: 50px;"></td>
                    <td>
                      <a  class="btn btn-dark btn-md edit" data-bs-toggle="modal" :data-bs-target="`#editModal${user.userID}`" id="addCart" style="font-size: 12px;">Edit</a>
      <div class="modal fade" :id="`editModal${user.userID}`" :key="user.userID" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
            <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form autocomplete="off" @submit.prevent="editUser" method="POST">
              <p>First Name</p>
                <input class="col-12 my-3" id="Name" type="text" v-model="user.firstName" required>
                <p>Last Name</p>
                <input class="col-12 my-3" id="Brand" type="text" v-model="user.lastName" required>
                <p>Email Address</p>
                <input class="col-12 my-3 emailAdd" id="Price" type="text" v-model="user.userEmail" required>
                <p>User Role</p>
                <input class="col-12 my-3" id="Price" type="text" v-model="user.userRole" required>
                <p>Profile Image</p>
                <input class="col-12 my-3" id="img" type="text" v-model="user.userProfile" required>
                <div class="modal-footer">
                    <button @click="this.$store.dispatch('editUser', user)" class="btn btn-light" id="submit" data-bs-dismiss="modal">Edit User</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
      <button class="btn btn-danger btn-md delete" @click="deleteUser(user.userID)" style="font-size: 12px;">Del</button>
                    </td>
      </tr>
  
  
              </tbody>
          </table>
          </div>
  
          <div class="products container">
          <h1>Products</h1>
                  <!-- <button type="button" class="btn btn-dark my-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">
            Add Product
          </button> -->
          </div>
  <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
             <p>Product Name</p>
                  <input class="col-12 my-3" id="Name" type="text"  required>
                  <p>Product Description</p>
                  <input class="col-12 my-3" id="Brand" type="text"  required>
                  <p>Product Price</p>
                  <input class="col-12 my-3" id="Price" type="text" required>
                  <p>Image URL</p>
                  <input class="col-12 my-3" id="img" type="text"  required>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" @click="createProduct">Save changes</button>
        </div>
      </div>
    </div>
  </div>
          <div class="table crud-table">
              <table class="table align-middle container-sm justify-content-between">
              <thead class="">
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Edit</th>
              </thead>
              <tbody id="shoe-list" class="">
                <tr v-for="item in products" :key="item.id" style="font-size: 14px;">
                    <td>{{ item.prodName }}</td>
                    <td>{{ item.brand }}</td>
                    <td>${{ item.price }}</td>
                    <td><img :src="item.imgURL" style="width: 60px; height: 50px;"></td>
                    <td>
                      <a  class="btn btn-dark btn-md edit" data-bs-toggle="modal" :data-bs-target="`#productModal${item.id}`" id="addCart" style="font-size: 12px;">Edit</a>
      <div class="modal fade" :id="`productModal${item.id}`" :key="item.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
            <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form autocomplete="off" @submit.prevent="editProduct" method="POST">
              <p>Product Name</p>
                <input class="col-12 my-3" id="Name" type="text" v-model="item.prodName" required>
                <p>Product Description</p>
                <textarea class="col-12 my-3" id="Des" type="text" v-model="item.prodDescription" required></textarea>
                <p>Brand</p>
                <input class="col-12 my-3" id="Brand" type="text" v-model="item.brand" required>
                <p>Price</p>
                <input class="col-12 my-3" id="price" type="text" v-model="item.price" required>
                <p>Quantity</p>
                <input class="col-12 my-3" id="Qty" type="text" v-model="item.prodQuantity" required>
                <p>Product Image</p>
                <input class="col-12 my-3" id="img" type="text" v-model="item.imgURL" required>

                <div class="modal-footer">
                    <button @click="this.$store.dispatch('editProduct', item)" class="btn btn-light" data-bs-dismiss="modal">Edit Product</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
      <button class="btn btn-danger btn-md delete" @click="deleteProduct(item.id)" style="font-size: 12px;">Del</button>
                    </td>
      </tr>
              </tbody>
          </table>
          </div>
    </div>
    
          <Footer/>
  </template>
  
  <script>
  import axios from "axios";
  import Navbar from '../components/Navbar.vue';
//   import Footer from '../components/Footer.vue';
//   import AddUser from '../components/AddUser.vue';
//   import UpdateUser from "../components/UpdateUser.vue";
    export default {
      name: 'Admin',
      components: {
        Navbar
      },
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
      mounted() {
            this.$store.dispatch("getUsers"),
            this.$store.dispatch("getProducts");
    },
    computed: {
        users() {
            return this.$store.state.users;
        },
        products() {
            return this.$store.state.products;
        },
    },
    methods: {
      async registerUser() {
           await this.$store.dispatch("registerUser", this.register);
            this.register.firstName = "";
            this.register.lastName = "";
            this.register.userEmail = "";
            this.register.userPass = "";
            },
        deleteUser(id) {
          this.$store.dispatch("deleteUser", id);
          return console.log("User was deleted");
        },
        deleteProduct(id) {
          this.$store.dispatch("deleteProduct", id);
          return console.log("Product was deleted");
        }
    }
  };
  
  </script>
  
  <style scoped>
  
  .cont{
    overflow-x: hidden;
  }
  
  .users{
    justify-content: space-between;
    display: flex;
    margin-top: 150px;
  }
  
  .products{
    justify-content: space-between;
    display: flex;
    margin-top: 30px;
  }
  
  thead{
    background: black;
    color: white;
  }
  
  tbody{
    background: black;
    color: white;
  }
  
  .modal-content{
    background: black;
  }
  .modal-body p{
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: white;
  }
  
  .modal-body input{
      width: 100%;
      margin-bottom: 20px;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid white;
      outline: none;
      height: 40px;
      color: white;
  
  }
  .modal-body textarea{
    justify-content: end;
    width: 100%;
      margin-bottom: 20px;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid white;
      outline: none;
      height: 40px;
      color: white;
    height: 150px;
  }
  
  .modal-header{
    color: white;
    border-bottom: 0px;
  }
  
  .modal-footer{
    border-top: 0px;
  }
  
  .btn-close{
    background-color: white;
  }
  
  </style>