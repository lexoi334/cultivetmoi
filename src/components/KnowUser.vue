<template>

  <div class="knowuser flex flex-col">
    <label for="mailuser">Email ou Nom d'utilisateur</label>
    <input type="text" v-model="user">
    <label for="mdpuser">Mot de passe</label>
    <input type="password" v-model="mdp">
    <div class="validateButton" v-if="validatedUser()"><button type="button" class="button" @click="login">Connexion</button></div>
  </div>

</template>

<script>

const axios = require('axios')

export default {
  name: 'KnowUser',
  data () {
    return {
      user: '',
      mdp: ''
    }
  },
  methods: {
    login () {
      const data = {
        user: this.user,
        mdp: this.mdp
      }
      axios
        .post('http://localhost/API/view/login.php', { data })
        .then(res => {
          this.$store.state.token = res.data.response
          // console.log(this.$store.state.token)
          localStorage.setItem('token', res.data.response)
          // console.log(localStorage.getItem('token'))
          this.$router.push({ path: 'profil' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    validatedUser () {
      if (this.user !== '' && this.mdp !== '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

input {
  /* border: 2px solid black; */
  width: 200px;
  margin: 10px auto;
  height: 35px;
  /*width: 100%;*/
  border-radius: 20px;
  border: 0.2px solid #FFC152;
  background-color: khaki;
  box-shadow: inset 5px 5px 7px rgba(0, 0, 0, 0.650),
          inset -5px -5px 7px rgb(0, 0, 0, 0.350);
  color: #34481F;
  font-weight: bold;
  padding: 0 10px;

}

label {
  color: #FFC152;
  margin-top: 15px;
  text-align: center;
}

.knowuser {
  padding: 50px 0;
  background-color: hsla(54, 64%, 36%, 0.5);
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 430px;
}

.buttonDisabled {
  border: 2px solid red;
}

.validateButton {
  color: white;
  width: 100px;
  height: 35px;
  border-radius: 15px;
  border: 0.4px solid green;
  background-color: #ac7c14;
  box-shadow:  8px 8px 15px #6f7c2d,
           -8px -8px 15px #96a83d;
  margin: 20px auto 0 auto;
}

.button {
  width: 100%;
  height: 100%;
}

.validateButton :hover {
  color: white;
  border-radius: 15px;
  background-color: #829235;
  box-shadow: inset 5px 5px 7px #6f7c2d,
            inset -5px -5px 7px #96a83d;
}
</style>
