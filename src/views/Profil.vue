<template>
  <div class="profil" v-if="user">
    <div class="topContent">
      <p>Profil de {{ user.user_pseudo }}</p>
    </div>
    <div class="persoContent">
      <p class="title">Informations personnelles</p>
      <div class="infoUser">
        <div class="infoContent">
          <div class="buttonContainer"><button class="modifButton" @click="changeLastname()"><img src="http://localhost/API/images/cog.png" alt=""></button><p>Nom : </p></div>
          <p>{{ user.user_lastname }}</p>
        </div>
        <div class="infoContent">
          <div class="buttonContainer"><button class="modifButton" @click="changeFirstname()"><img src="http://localhost/API/images/cog.png" alt=""></button><p>Prénom :</p></div>
          <p>{{ user.user_firstname }}</p>
        </div>
        <div class="infoContent">
          <div class="buttonContainer"><button class="modifButton" @click="changeEmail()"><img src="http://localhost/API/images/cog.png" alt=""></button><p>Email : </p></div>
          <p>{{ user.user_email }}</p>
        </div>
      </div>
    </div>
    <button class="decoButton" @click="deconnexion()">Déconnexion</button>
  </div>
</template>

<script>

import swal from 'sweetalert'
const axios = require('axios')

export default {
  name: 'profil',
  data () {
    return {
      user: null
    }
  },
  methods: {
    deconnexion () {
      this.$store.state.token = ''
      this.$router.push('Login')
    },
    changeLastname () {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
      const data = {}
      swal('Quel est votre nom ?', {
        content: 'input'
      })
        .then((value) => {
          axios
            .put('http://localhost/API/view/changeLastname.php?lastname=' + value, data, config)
          swal(`Vous avez changé votre nom pour : ${value}`)
            .then((ok) =>
              axios
                .get(
                  'http://localhost/API/view/profile.php',
                  config
                )
                .then(res => {
                  // console.log(res.data[0])
                  this.user = res.data[0]
                  // this.user = res.data
                })
                .catch(err => {
                  console.log(err)
                })
            )
        })
    },
    changeFirstname () {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
      const data = {}
      swal('Quel est votre prénom ?', {
        content: 'input'
      })
        .then((value) => {
          axios
            .put('http://localhost/API/view/changeFirstname.php?firstname=' + value, data, config)
          swal(`Vous avez changé votre prénom pour : ${value}`)
            .then((ok) =>
              axios
                .get(
                  'http://localhost/API/view/profile.php',
                  config
                )
                .then(res => {
                  // console.log(res.data[0])
                  this.user = res.data[0]
                  // this.user = res.data
                })
                .catch(err => {
                  console.log(err)
                })
            )
        })
    },
    changeEmail () {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
      const data = {}
      swal('Quel est votre Email ?', {
        content: 'input'
      })
        .then((value) => {
          axios
            .put('http://localhost/API/view/changeEmail.php?email=' + value, data, config)
          swal(`Vous avez changé votre Email pour : ${value}`)
            .then((ok) =>
              axios
                .get(
                  'http://localhost/API/view/profile.php',
                  config
                )
                .then(res => {
                  // console.log(res.data[0])
                  this.user = res.data[0]
                  // this.user = res.data
                })
                .catch(err => {
                  console.log(err)
                })
            )
        })
    }
  },
  beforeCreate () {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }

    axios
      .get(
        'http://localhost/API/view/profile.php',
        config
      )
      .then(res => {
        console.log(res.data[0])
        this.user = res.data[0]
        // this.user = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>

.profil {
  justify-content: center;
  margin: 25px auto;
  width: 60%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 20px;
  border: 0.5px solid #eeff52;
  background-color: hsla(54, 64%, 36%, 0.4);

}

.topContent {
  text-align: center;
  margin: 25px auto;
  font-size: 22px;
  font-weight: bold;
  width: 50%;
}

.persoContent {
  margin: 15px auto;
  width: 50%;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 15px;
}

.infoUser {
  font-size: 18px;
  width: 100%;
  text-align: center;
  width: 100%;
}

.infoContent {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.modifButton {
  margin-right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: khaki;
}

button img {
  width: 28px;
  height: 28px;
}

.buttonContainer {
  display: flex;
}

.decoButton {
  font-weight: bold;
  color: #34481F;
  margin: 15px auto;
  width: 120px;
  height: 35px;
  border-radius: 15px;
  background-color: #c3dd42;
  box-shadow:  8px 8px 15px hsl(0, 0%, 0%),
             0px 0px 0px #0a0a09;
}

@media screen and (max-width: 900px){
  .persoContent {
    width: 100%;
    padding: 0 10px;
  }
}

@media screen and (max-width: 600px) {
  .profil {
    width: 90%;
  }
}

</style>
