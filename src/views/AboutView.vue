<template>
  <Navbar/>
  <div class="about container justify-content-center">
    <div class="row my-5 content">
      <div class="col-12">
        <div class="row">
          <div class="col">
            <img src="https://i.postimg.cc/2j2YC6n8/6d8ca61e04a2cc767f78356f4a1d0342.jpg" alt="" class="aboutIMG">
          </div>
          <div class="col">
            <img src="https://i.postimg.cc/FF3ZSW9Y/Untitled-design-17-1.png" alt="" class="aboutIMG2">
          </div>
        </div>
      </div>
      <div class="col my-3">
          <strong>About</strong>
          <p>For sneakerheads and collectors, the website that sells the most expensive sneakers in the world is a must-visit destination. This website offers a range of limited edition and one-of-a-kind sneakers that are not only stylish but also incredibly expensive. From classic Jordans to high-end collaborations, this website has it all, with some pairs costing tens of thousands of dollars. The website is a testament to the idea that sneakers can be considered high fashion, and it offers the ultimate in luxury footwear for those who are willing to pay for it.
            The website that sells the most expensive sneakers in the world is a hub for sneaker enthusiasts, collectors, and resellers alike. Its inventory features rare and highly coveted releases from the biggest names in the sneaker industry, such as Nike and Jordan. The website also caters to the growing trend of customized sneakers, with some pairs featuring unique designs and materials that are exclusive to the site.
          </p>
        </div>
      </div>
  </div>

<Footer/>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

  export default {
    name: 'About',
    components: { Navbar, Footer }
  }
</script>

<style scoped>

.about{
  min-height: 100vh;
}

.about strong{
  margin-bottom: 10px !important;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 35px;
   border: 2px solid black;
}
.content{
  margin-top: 140px !important;
}

.aboutIMG{
  max-width: 100%;
}
.aboutIMG2{
  max-width: 97.7%;
}

.about p{
  font-size: 20px;
}
</style>
