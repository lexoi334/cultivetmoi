<template>
    <div class="plants">
        <h1>Page des plantes</h1>
    </div>
</template>

<script>

const axios = require('axios')

export default {
  name: 'Plants',
  props: {
    namePlant: {
      type: String
    },
    typePlant: {
      type: String
    },
    urlPlant: {
      type: String
    }
  },
  data () {
    return {
      plants: null
    }
  },
  beforeCreate () {
    axios
      .get('http://localhost/API/view/plants.php')
      .then(res => {
        console.log(res)
        this.plants = res.data
      })
  }
}
</script>
