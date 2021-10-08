<template>
<div id="main-container">
    <div id="nav">
      <div class="leftNav">
        <router-link to="/">Home</router-link>
        <router-link to="/recherche">Recherche</router-link>
      </div>
      <div class="rightNav">
        <router-link v-if="!this.$store.state.token" :to="{ name: 'Login' }">Connexion</router-link>
        <router-link v-else :to="{ name: 'Profil'}">Profil</router-link>
      </div>
    </div>
    <div class="bar"></div>
    <router-view/>
  </div>
  <div class="footer">
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>

// import Footer from '@/components/Footer.vue'
const axios = require('axios')

export default {
  name: 'App',
  components: {
    // Footer
  },
  mounted () {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }

    axios
      .get(
        'http://localhost/API/view/checkToken.php',
        config
      )
      .then(res => {
        console.log(res)
        if (res.data.expired) {
          this.$store.state.token = ''
          this.$router.push({ path: 'login' })
        }
        // this.user = res.data
      })
      .catch(err => {
        console.log(err)
      })
    if (localStorage.getItem('token') !== this.$store.state.token) {
      this.$store.state.token = localStorage.getItem('token')
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');

* {
  font-family: Merriweather;
}

p {
  color: #FFC152;
}

body {
  position: relative;
  background-color: #015D2C;
  background-image: url('../public/fond1.jpg');
  background-size: cover;
  background-blend-mode:overlay;
  background-attachment: fixed;
}

#main-container {
  position: relative;
  min-height: 100vh;
}

.bar {
  width: 31%;
  height: 1px;
  background-color: red;
}

#nav {
  justify-content: space-between;
  width: 100%;
  height: 65px;
  display: flex;
  background-color: rgba(54, 34, 23, 0.8);
  padding: 0 20px;
}

.leftNav {
  height: 100%;
  display: flex;
  width: 30%;
  justify-content: space-between;
  align-items: center;
}

.rightNav {
  height: 100%;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

@media screen and (max-width: 700px) {

  .rightNav {
    width: 30%;
  }

  #nav {
    justify-content: space-between;
  }
}

#nav a {
  margin: 0 15px;
  font-weight: bold;
  color: #FFEAD6;
}

#nav a.router-link-exact-active {
  color: #FFC152;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  align-self: flex-end;
}

</style>
