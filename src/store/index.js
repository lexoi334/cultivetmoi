import axios from 'axios'
import { createStore } from 'vuex'

// voir vidéo youtube sur la création de compte 18.10

export default createStore({
  state: {
    isConnected: false,
    searchPlant: '',
    token: ''
  },
  mutations: {
  },
  actions: {
    createAccount: ({ commit }, userInfo) => {
      commit.userInfo = userInfo
      axios.post('/user', {

      })
    }
  },
  modules: {
  }
})
