<template>
  <div class="fixed-top bg-white shadow-sm">
    <nav class="navbar navbar-light bg-prim py-0 navcon align-items-center">
      <div>
        <a href="#" class="text-red">Ikuti Kami</a>
        <a href="#" class="iconmedsos"> <i class="fab fa-instagram"> </i> </a>
        <a href="#" class="iconmedsos"> <i class="fab fa-facebook"> </i> </a>
        <a href="#" class="iconmedsos"> <i class="fab fa-twitter"> </i> </a>
      </div>
      <div>
        <a href="#"> Jual </a>
        <a href="#"> Promo </a>
        <a href="#"> Tentang </a>
      </div>
    </nav>
    <nav class="bottomnav">
      <div class="row d-flex justify-content-center">
        <div class="col-md-2 col-sm-2 p-2">
          <router-link to="/">
            <img class="logoimg" src="Logo3.png" />
          </router-link>
        </div>
        <div class="col-md-8 col-sm-10 d-flex align-items-center">
          <a href="#">Kategori</a>
          <div class="d-flex flex-column bd-highlight mx-3 searchnavwrap">
            <div class="d-flex align-items-center searchnav">
              <input
                type="search"
                placeholder="Cari Kitab Komik Filsuf Muslim"
                v-model="search"
              />
              <button v-on:click="tosearch"><img src="/icon/search.png" /></button>
            </div>
          </div>
          <router-link class="mx-3" to="/cart"> <img src="/icon/cart.png" /></router-link>
          <a class="mx-3" href="#"> <img src="/icon/notify.png" /></a>
        </div>
        <div
          v-if="!isLoggedIn"
          class="col-2 align-items-center justify-content-center btnlog d-sm-none d-md-flex"
        >
          <div class="p-2">
            <router-link to="/login">
              <button class="masuk">MASUK</button></router-link
            >
          </div>
          <div class="p-2 borderdaf">
            <router-link to="/register">
              <button class="daftar">DAFTAR</button>
            </router-link>
          </div>
        </div>
        <div
          v-if="isLoggedIn"
          class="col-2 p-0 align-items-center justify-content-left d-flex"
        >
          <div class="col-2 p-0">
            <img
              src="https://github.githubassets.com/images/modules/octocats/supportcat.jpg"
              height="25px"
              alt=""
            />
          </div>
          <div class="col-10 p-0">
            <div class="dropdown">
              <router-link to="/profile">
              <p
                class="my-auto"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{this.$store.state.user.name}}
              </p>
              </router-link>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" :click="logout" type="button">Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
.navcon {
  height: 32px;
  padding-left: 32px;
  padding-right: 32px;
}
.navcon a {
  font-size: 12px;
  color: white;
}
.iconmedsos {
  margin-left: 5px;
}
.bottomnav {
  padding-right: 80px;
  padding-left: 80px;
  color: #9b9b9b;
}

.bottomnav a {
  color: #9b9b9b;
}
.logoimg {
  height: 45px;
}
.footnav {
  padding-left: 250px !important;
  padding-right: 250px !important;
  font-size: 12px;
}
.searchnavwrap {
  width: 80%;
}
.searchnav {
  background-color: #4d9894;
  width: 100%;
  height: 30px;
  border-radius: 15px;
  border: solid 1px #4d9894;
  overflow: hidden;
}
.searchnav input[type="search"] {
  background: transparent;
  border: none;
  padding-left: 15px;
  width: 92%;
  color: #ffffff;
}
.searchnav input[type="search"]::placeholder {
  color: #ffffffc0;
}
input:focus,
textarea:focus,
select:focus {
  outline: none;
}
.searchnav button {
  width: 10%;
  height: 100%;
  background-color: #ffffff;
  border: none;
  border-radius: 0 15px 15px 0;
  padding-right: 20px;
  overflow: hidden;
}
.searchnav button img {
  height: 80%;
}
.borderdaf {
  border-left: #f16538 solid;
}
.btnlog button {
  border-radius: 15px;
  width: 66px;
  height: 29px;
  box-sizing: border-box;
}
.btnlog button.masuk {
  border: 1px solid #4d9894;
  color: #4d9894;
  background-color: white;
  font-size: 13px;
  font-weight: bold;
}
.btnlog button.daftar {
  border: 1px solid #4d9894;
  background-color: #4d9894;
  color: white;
  font-size: 13px;
  font-weight: bold;
}
@media (max-width: 992px) {
  .logoimg {
    height: 35px;
  }
  .bottomnav {
    padding-right: 40px;
    padding-left: 40px;
  }
}
@media (max-width: 768px) {
  .bottomnav {
    padding-right: 20px;
    padding-left: 20px;
  }
  .logoimg {
    height: 25px;
  }
  .btnlog {
    display: none;
  }
}
</style>
<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      name: "name",
      search:"",
    };
  },
  methods: {
    logout(){
      this.$store.dispatch('logout').then((response) => {
          location.href = "/"
        })
        .catch((err) => {
          location.href = "/"});
      
    },
    tosearch(){
    if(this.search !== undefined || this.search !== null || this.search !== ""){
      if(this.$router.currentRoute.path !== '/search'){
        this.$router.push({ path: 'search', query: { search: this.search } });
      }
      else if(this.$router.query.search !== this.search){
        window.href="/search?search="+this.search;
      }
    }
  }
  },
  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.isLoggedIn = true;
      if(this.$store.state.user){
        this.name = this.$store.state.user.name;
      }
    }
  },
  
};
</script>