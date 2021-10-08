<template>

  <div class="login mt-14 flex flex-col">
    <div class="loginContent">
      <div class="topBar mx-auto w-3/12">
        <button class="topLeftButton" :class="{leftButton: isLeftClass}" @click="displaySub()">Déjà inscrit</button>
        <button class="topRightButton" :class="{rightButton: isRightClass}" @click="displayLogin()">Première fois</button>
      </div>

      <div class="formContent mx-auto w-3/12">
        <KnowUser v-if="isActive"/>
        <NewUser v-else/>
      </div>
    </div>
  </div>

</template>

<script>

import NewUser from '../components/NewUser.vue'
import KnowUser from '../components/KnowUser.vue'

export default {
  name: 'Login',
  components: {
    NewUser,
    KnowUser
  },
  data () {
    return {
      isActive: true,
      isLeftClass: false,
      isRightClass: true
    }
  },
  methods: {
    displayLogin () {
      this.isActive = false
      this.isLeftClass = true
      this.isRightClass = false
    },
    displaySub () {
      this.isActive = true
      this.isRightClass = true
      this.isLeftClass = false
    }
  },
  computed: {

  }
}
</script>

<style scoped>

.login {
  display: flex;
}

.loginContent {
  margin: auto;
  min-width: 20rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: hsla(54, 64%, 36%, 0.5);
  /* box-shadow:  8px 8px 15px #6f7c2d,
              -8px -8px 15px #96a83d; */
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.topBar {
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.formContent {
  width: 100%;
  height: 430px;
}

button {
  color: #e4960f;
  font-weight: bolder;
  border-bottom: none;
  width: 50%;
  height: 60px;
  background-color:khaki;

}

.leftButton {
  border-top-left-radius: 20px;
  color: #34481F;
  background-color: hsla(54, 64%, 36%, 1);
  box-shadow: -3px -3px 3px 2px #6f7c2d inset;
  -webkit-box-shadow: -3px -3px 3px 2px #6f7c2d inset;
  -moz-box-shadow: -3px -3px 3px 2px #6f7c2d inset;
}

.rightButton {
  border-top-right-radius: 20px;
  color: #34481F;
  background-color: hsla(54, 64%, 36%, 1);
  box-shadow: 3px -3px 3px 2px #6f7c2d inset;
  -webkit-box-shadow: 3px -3px 3px 2px #6f7c2d inset;
  -moz-box-shadow: 3px -3px 3px 2px #6f7c2d inset;
}

.topLeftButton {
  border-top-left-radius: 20px;
}

.topRightButton {
  border-top-right-radius: 20px;
}

</style>
