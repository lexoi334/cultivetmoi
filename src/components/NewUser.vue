<template>
  <form @submit.prevent="handleSubmit">
    <div class="newuser flex flex-col">
      <label for="username">Nom d'utilisateur</label>
      <input @input="testUsername" type="text" v-model="user">
      <label for="mailuser">Adresse Email</label>
      <input @input="testMail" type="text" v-model="mail">
      <label for="mdpuser">Entrez votre mot de passe</label>
      <input @input="testMdp" type="password" v-model="mdp">
      <label for="mdpuser">Confirmez votre mot de passe</label>
      <input @input="testMdpv" type="password" v-model="mdpv">
      <div class="validateButton" v-if="validatedUser()"><button type="submit" class="button">Inscription</button></div>
    </div>
  </form>
</template>

<script>

import swal from 'sweetalert'
const axios = require('axios')

export default {
  name: 'NewUser',
  data () {
    return {
      user: '',
      mail: '',
      mdp: '',
      mdpv: '',
      log: null,
      isRegistered: null
    }
  },
  methods: {
    validatedUser () {
      if (this.user !== '' && this.mail !== '' && this.mdp !== '' && this.mdpv !== '') {
        return true
      } else {
        return false
      }
    },
    testUsername () {
      const testPatternUser = new RegExp(/^[a-z0-9_-]{3,15}$/)
      console.log(testPatternUser.test(this.user))
      return testPatternUser.test(this.user)
    },
    testMail () {
      const testPatternMail = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
      console.log(testPatternMail.test(this.mail))
      return testPatternMail.test(this.mail)
    },
    testMdp () {
      const testPatternMdp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
      console.log(testPatternMdp.test(this.mdp))
      return testPatternMdp.test(this.mdp)
    },
    testMdpv () {
      if (this.mdp === this.mdpv) {
        return true
      } else {
        return false
      }
    },
    handleSubmit () {
      if (this.testMail() && this.testMdp() && this.testUsername() && this.testMdpv()) {
        const data = {
          user: this.user,
          mail: this.mail,
          mdp: this.mdp
        }
        axios
          .post('http://localhost/API/view/inscription.php', { data })
          .then(res => {
            swal(res.data)
              .then((value) => {
                this.$router.go()
              })
            // if (res.data === 'Enregistrement réussi !') {
            //   this.$router.go()
            // }
          })
          .catch(err => {
            console.log(err)
          })
      } else swal('Champs incorrects !')
    }
  }
}
</script>

<style scoped>

input {
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

.newuser {
  background-color: hsla(54, 64%, 36%, 0.5);
  height: 430px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding-bottom: 15px;
}

.buttonDisabled {
  border: 2px solid red;
}

.validateButton {
  color: white;
  width: 120px;
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

.eventText {
  text-align: center;
}

</style>
