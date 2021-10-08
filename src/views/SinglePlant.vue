<template>
  <div class="singlePlant" v-if="singlePlant">
    <div class="pageContent" >
      <div class="topContent">
        <img :src="`http://localhost/API/images/${singlePlant.plant_url}`" alt="photo de la plante">
        <div class="titleContent">
          <h1>{{ singlePlant.plant_name }}</h1>
          <h2>{{ singlePlant.plant_type }}</h2>
          <p>Température min : {{ singlePlant.temp_min }}°C</p>
          <p>Température max : {{ singlePlant.temp_max }}°C</p>
          <p>Sol idéal : {{ singlePlant.soil}}</p>
          <p>Exposition idéale : {{ singlePlant.exposure }}</p>
          <p>Dimensions du pot : {{ singlePlant.spacing }}</p>
          <p>Saisonalité : {{ singlePlant.season }}</p>
        </div>
      </div>
      <div class="botContent">
        <p>{{ singlePlant.tip_text }}</p>
      </div>
      <div class="addContainer"><button class="addButton" @click="addPlant()"><img src="http://localhost/API/images/add.png" alt="bouton ajout"></button></div>
    </div>
    <Comment :id="singlePlant.plant_id"></Comment>
  </div>
</template>

<script>

import swal from 'sweetalert'
import Comment from '@/components/Comment.vue'

const axios = require('axios')

export default {
  name: 'SinglePlant',
  data () {
    return {
      singlePlant: null,
      userInfo: null
    }
  },
  components: {
    Comment
  },
  props: {
    idPlant: {
      type: String,
      required: true
    }
  },
  methods: {
    addPlant () {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }

      axios
        .get(
          'http://localhost/API/view/checkToken.php',
          config
        )
        .then(res => {
          if (res.data.expired) {
            this.$store.state.token = ''
            this.$router.push({ name: 'Login' })
          } else {
            const bodyParameters = {
              plant: this.idPlant
            }
            axios
              .post('http://localhost/API/view/addPlant.php', bodyParameters, config)
              .then(res => {
                console.log(res.data)
                if (res.data === true) {
                  swal('Bien joué !', 'Une plante de plus dans votre collection !', 'success')
                } else {
                  swal('Impossible !', 'Vous avez déjà ajouté cette plante !', 'error')
                }
              })
            console.log(res)
          }
          // this.user = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  beforeMount () {
    axios
      .get(`http://localhost/API/view/singlePlant.php?id=${this.idPlant}`)
      .then(res => {
        this.singlePlant = res.data[0]
      })
  }
}
</script>

<style scoped>

h1 {
  font-weight: bolder;
  font-size: 22px;
  color: #FFC152;
}

h2 {
  font-size: 18px;
  font-weight:bold;
  color: #FFC152;
}

p {
  font-weight: bold;
}

.singlePlant {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.pageContent {
  padding: 10px;
  width: 80%;
  margin: 65px auto 0 auto;
  border-radius: 20px;
  border: 0.5px solid #eeff52;
  background-color: hsla(21, 41%, 15%, 0.800);
}

.topContent {
  width: 100%;
  display: flex;
}

.topContent img {
  width: 300px;
  height: 300px;
  border-top-left-radius: 20px;
}

.titleContent {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 30px;
  justify-content: space-evenly;
}

.botContent {
  margin: auto;
  width: 100%;
}

.botContent p {
  margin-top: 25px;
}

button img {
  width: 60%;
  height: 60%;
  margin: auto;
}

button {
  display: flex;
  width: 100%;
  height: 100%;
}

.addContainer {
  border-radius: 50%;
  width: 42px;
  height: 42px;
  margin: 20px auto;
  background-color: khaki;
}

.addContainer :hover {
  border-radius: 50%;
  background-color: khaki;
    box-shadow:  inset 2px 2px 6px rgb(0, 0, 0, 0.700),
             inset -2px -2px 6px rgb(0, 0, 0, 0.300);
}

@media screen and (max-width: 800px) {
  .topContent {
    display: flex;
    flex-direction: column;
  }

  .topContent img {
    margin: auto;
  }

  .pageContent {
    padding: 0;
  }

  .titleContent {
    text-align: center;
    margin: 0;
  }

  .titleContent p {
    margin: 5px 0;
  }

  .botContent {
    text-align: center;
  }
}

</style>
