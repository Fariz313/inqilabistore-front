import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
 
Vue.component('vue-phone-number-input', VuePhoneNumberInput);

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API   
Vue.use(BootstrapVue);


new Vue({
  router,
  store,
  methods: {
    isAuthenticate : function(){
        if(this.$store.getters.isLoggedIn){
        axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.state.token
        this.axios.get("/login/check")
        .then(response => {
        if(response.data.auth == false || response.data.status == 0){
        this.$store.dispatch('logout')
        } else {
        this.$store.commit('userDetail', response.data.user);
        }
        })
        .catch(error => {
        this.$store.dispatch('logout')
        });
        } else {
        this.$store.dispatch('logout')
        }
      },
  },
  mounted(){
    this.isAuthenticate();
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  },
  render: h => h(App)
}).$mount('#app')