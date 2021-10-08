<template>
    <div class="comment">
        <div class="inputContainer">
            <textarea name="commentSection" id="commentSection" cols="30" rows="10" v-model="com"></textarea>
            <div class="buttonContainer"><button type="button" class="button" @click="postComm()">Commenter</button></div>
        </div>
        <div class="commentContainer">
            <p>{{ this.allCom }}</p>
        </div>
    </div>
</template>

<script>

import swal from 'sweetalert'
const axios = require('axios')

export default {
  name: 'Comment',
  props: [
    'id'
  ],
  data () {
    return {
      com: '',
      idPlant: this.id,
      allCom: null
    }
  },
  methods: {
    postComm () {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }

      const bodyParameters = {
        com: this.com,
        id: this.idPlant
      }

      if (this.com.length > 10) {
        axios
          .post('http://localhost/API/view/addComment.php', bodyParameters, config)
          .then(res => {
            console.log(res.data)
            swal(res.data)
            axios
              .get(`http://localhost/API/view/getComment.php?id=${this.id}`)
              .then(res => {
                console.log(res.data)
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      } else swal('Votre message est trop court !')
    }
  },
  mounted () {
    axios
      .get(`http://localhost/API/view/getComment.php?id=${this.id}`)
      .then(res => {
        console.log(res.data)
        this.allCom = res.data[0].content
        console.log(this.allCom)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>

.comment {
  margin: 30px auto;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  width: 650px;
}

textarea {
  margin: 15px 0;
  padding: 10px;
  width: 100%;
  height: 150px;
  border-radius: 20px;
  border: 0.2px solid #FFC152;
  background-color: khaki;
  box-shadow: inset 5px 5px 7px rgba(0, 0, 0, 0.650),
          inset -5px -5px 7px rgb(0, 0, 0, 0.350);
  color: #34481F;
  font-weight: bold;
}

.buttonContainer {
  margin: 5px 0;
  width: 100%;
  display: flex;
  justify-content: end;
}

button {
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

@media screen and (max-width: 750px) {
  .inputContainer {
    width: 90%;
    margin: auto;
  }

  .comment {
    margin: 30px 5px;
  }
}

</style>
