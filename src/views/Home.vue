<template>
  <div class="home">
    <h1>Bienvenue dans votre jardin privé</h1>
    <div class="garden">
      <div class="cardPlant"  v-for="item in list" :key="item.plant_id">
        <router-link :to="{ name: 'SinglePlant', params: { idPlant: item.plant_id }}" class="cardContent">
          <p>{{ item.plant_type}}</p>
          <img class="plantImage" :src="`http://localhost/API/images/${item.plant_url}`" alt="photo d'une {{ item.plant_name }}">
          <p>{{ item.plant_name }}</p>
        </router-link>
        <div class="buttonContainer">
          <button @click="deletePlant(item.plant_id, item.plant_name)"><img src="http://localhost/API/images/x-mark.png" alt="icone supprimer"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      list: {},
      id: this.idButton
    }
  },
  components: {

  },
  methods: {
    deletePlant ($data, $name) {
      swal({
        title: 'Êtes vous sûr ?',
        text: 'Voulez vous vraiment supprimer cette plante de votre e-jardin ?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios
              .delete('http://localhost/API/view/deletePlant.php?id=' + $data)
              .then(res => {
                console.log(res)
                const config = {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }

                axios
                  .get('http://localhost/API/view/homeList.php', config)
                  .then(res => {
                    // console.log(res.data)
                    this.list = res.data
                  })
              })
            swal('Voila ! ' + $name + ' est supprimé de votre e-jardin !', {
              icon: 'success'
            })
          } else {
            swal('Ouf ! Votre plante reste à sa place !')
          }
        })
    }
  },
  mounted () {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }

    axios
      .get('http://localhost/API/view/homeList.php', config)
      .then(res => {
        // console.log(res.data)
        this.list = res.data
      })
  },
  beforeMount () {
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
  }
}
</script>

<style scoped>

h1 {
  color: #FFC152;
  font-weight: bold;
  font-size: 24px;
  margin: 20px 0;
  text-align: center;
}

.garden {
  justify-content: center;
  margin: 25px auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px;
  border: 0.5px solid #eeff52;
  background-color: hsla(54, 64%, 36%, 0.5);
  /* box-shadow: inset 5px 5px 7px #6f7c2d,
              inset -5px -5px 7px #96a83d; */
}

.cardPlant {
  margin: 20px 25px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 0.2px solid #FFC152;
  background-color: #03813e;
  box-shadow:  12px 12px 15px #000000,
                0px 0px 0px #000000;
}

.cardContent {
  width: 100%;
  height: 100%;
}

.plantImage {
  width: 150px;
  height: 150px;
  margin: 10px;
}

.cardPlant p {
  text-align: center;
  margin: 5px 0;
}

.buttonContainer {
  display: flex;
  border-radius: 50%;
  background-color: #FFC152;
  width: 34px;
  height: 34px;
  margin: 5px auto;
}

button img {
  margin: auto;
  width: 34px;
  height: 34px;
}

</style>
