<template>
  <div class="recherche">
    <h1>Rechercher une plante</h1>
    <div class="topContent">
      <div class="searchTitle">
        <div :class="{isSelected: allSelected}" class="filterButton"><button  @click="setType(''); allButton()">Tous</button></div>
        <div :class="{isSelected: veggiesSelected}" class="filterButton"><button  @click="setType('Legume'); veggiesButton()">Légumes</button></div>
        <div :class="{isSelected: fruitsSelected}" class="filterButton"><button  @click="setType('Fruit'); fruitsButton()">Fruits</button></div>
        <div :class="{isSelected: herbsSelected}" class="filterButton"><button  @click="setType('Aromate'); herbsButton()">Aromates</button></div>
      </div>
      <div class="inputBar">
        <div class="searchInput">
          <input type="text" v-model="searchInput">
          <div class="searchButton">
            <button @click="startSearch">
              <img src="http://localhost/API/images/loupe.png" alt="boutton d'  image de loupe pour la recherche">
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="searchContent">
      <router-link :to="{ name: 'SinglePlant', params: { idPlant: plant.plant_id }}" class="cardPlant" v-for="plant in search" :key="plant.plant_id">
        <p>{{ plant.plant_type}}</p>
        <img :src="`http://localhost/API/images/${plant.plant_url}`" alt="photo d'une {{ plant.plant_name }}">
        <p>{{ plant.plant_name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>

const axios = require('axios')

export default {
  name: 'Recherche',
  data () {
    return {
      searchInput: '',
      search: {},
      type: '',
      allSelected: false,
      veggiesSelected: false,
      fruitsSelected: false,
      herbsSelected: false
    }
  },
  methods: {
    // Mise en place des fonctions pour gérer le v-bind lorsqu'un bouton est selectionné ou non
    allButton () {
      this.allSelected = true
      this.veggiesSelected = false
      this.fruitsSelected = false
      this.herbsSelected = false
    },
    veggiesButton () {
      this.allSelected = false
      this.veggiesSelected = true
      this.fruitsSelected = false
      this.herbsSelected = false
    },
    fruitsButton () {
      this.allSelected = false
      this.veggiesSelected = false
      this.fruitsSelected = true
      this.herbsSelected = false
    },
    herbsButton () {
      this.allSelected = false
      this.veggiesSelected = false
      this.fruitsSelected = false
      this.herbsSelected = true
    },
    // Atribution de la valeur type
    setType (type) {
      this.type = type
    },
    // Requete axios en Get prennant en compte le contenu du l'input et le type si ils sont selectionnés
    startSearch () {
      this.$store.state.searchPlant = this.searchInput
      axios
        .get(`http://localhost/API/view/search.php?s=${this.$store.state.searchPlant}&type=${this.type}`)
        .then(res => {
          this.search = res.data
          // console.log(res)
          // console.log(this.search)
        })
    }
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

  .topContent {
    display: flex;
    flex-direction: column;
  }

  .searchTitle {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 15px auto;
  }

  .filterButton button {
    width: 100%;
    height: 100%;
  }

  .filterButton {
    font-weight: bold;
    color: #34481F;
    margin: 10px;
    width: 100px;
    height: 35px;
    border-radius: 15px;
    background-color: #c3dd42;
    box-shadow:  8px 8px 15px hsl(0, 0%, 0%),
             0px 0px 0px #0a0a09;
  }

  .isSelected {
    font-weight: bold;
    border: 0.5px solid #FFC152;
    color: #8a4723;
    width: 100px;
    height: 35px;
    border-radius: 15px;
    background-color: #aec73d;
    box-shadow: inset 5px 5px 7px hsla(0, 0%, 0%, 0.61),
            inset -5px -5px 7px hsla(0, 0%, 3%, 0.308);
  }

  /* .inputBar input, .inputBar button {
    margin: 0 15px;
  } */

  .inputBar {
    margin: 15px auto;
    display: flex;
  }

  .searchInput input {
    padding: 0 5px;
    color: #34481F;
    font-weight: bold;
    height: 35px;
    width: 100%;
    border-radius: 20px;
    background-color: white;
    /* border: 0.2px solid #FFC152;
    background-color: #015D2C; */
    box-shadow: inset 4px 4px 5px rgba(0, 0, 0, 0.650),
                inset -4px -4px 5px rgba(0, 0, 0, 0.350);
  }

  .searchInput {
    position: relative;
    height: 35px;
    width: 250px;
    border-radius: 20px;
    border: 0.2px solid #FFC152;
    /* background-color: #03813e; */
   box-shadow: inset 4px 4px 5px rgba(0, 0, 0, 0.650),
                inset -4px -4px 5px rgba(0, 0, 0, 0.350);
  }

  .searchButton {
    position: absolute;
    right: 10px;
    top: 5px;
  }

  .cardPlant {
    color: #FFC152;
    margin: 20px 25px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    border: 0.2px solid #FFC152;
    background-color: #03813e;
    box-shadow:  12px 12px 15px #000000,
             0px 0px 0px #000000;
  }
  .cardPlant img {
    width: 150px;
    height: 150px;
    margin: 10px;
  }

  .cardPlant p {
    text-align: center;
    margin: 5px 0;
  }

  .searchContent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* .cardContent {
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  } */

</style>
