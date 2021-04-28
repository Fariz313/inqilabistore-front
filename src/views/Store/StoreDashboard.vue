<template>
  <div class="container-fluid" style="padding-top: 93px">
    <div class="row py-5 px-4">
      <div class="col-xl-11 col-md-11 col-sm-12 mx-auto">
        <!-- Profile widget -->
        <div class="bg-white shadow rounded overflow-hidden">
          <div class="p-4 bg-prim">
            <div class="media align-items-end profile-header">
              <div class="profile mr-3">
                <div class="photoProfile" v-bind:style="pProfile"></div>
                <a
                  v-on:click="editMode = !editMode"
                  class="btn btn-dark btn-sm btn-block"
                  >Edit profile</a
                >
              </div>
              <div class="media-body mb-5 text-white">
                <h2 class="mt-0 mb-0">{{ store.store_name }}</h2>
                <h3 class="small-h3 mb-0">
                  {{kota}}
                </h3>
                <a class="small mb-0 d-block"><strong>@{{ uname }}</strong> {{name}}</a>
                <a class="small mb-0 d-block">{{store.contact}}</a>
              </div>
            </div>
          </div>
          <div class="p-4 d-flex flex-column bd-highlight bg-light">
            <div class="card">
              <div class="card-header bg-prim link-head py-2">
                <a class="p-3" v-on:click="nav='product'" v-bind:class="{active : nav === 'product'}" >Produk</a>
                <a class="p-3" v-on:click="nav='detail'"  v-bind:class="{active : nav === 'detail'}" >Detail Toko</a>
                <a class="p-3" v-on:click="nav='order'"  v-bind:class="{active : nav === 'order'}" >Order Toko</a>
              </div>
              <div class="card-body">
                <Product v-if="nav==='product'"/>
                <Detail :store="store" v-if="nav==='detail'"/>
                <Order v-if="nav==='order'"/>
              </div>
            </div>
          </div>
        </div>
        <!-- End profile widget -->
      </div>
    </div>
  </div>
</template>
<script>
import region from "./../../../indonesia-region.min.json";
import Product from "./Component/Product.vue";
import Detail from "./Component/Detail.vue";
import Order from "../order/OrderStore.vue";

export default {
  components:{
    Product,Detail,Order
  },
  data() {
    return {
      key: "",
      store: [],
      wilayah: region,
      nav:"product",
      photoProfile:
        "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop",
      kota:'',
      uname:'',
      name:'',
    };
  },
  computed: {
    pProfile() {
      return {
        "background-image": "url(" + this.photoProfile + ")",
      };
    },
    navCom(val){
      if(val===this.nav){
        return 'active'
      }
    }
  },
  methods: {
    getData() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("store/show/" + this.$route.params.id, conf)
        .then((response) => {
            this.store = response.data.store;
            console.log(response.data);
            this.kota = this.wilayah[this.store.kode_provinsi].regencies[this.store.kode_kota].name;
            this.name = this.store.user.name;
            this.uname = this.store.user.uname;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tes() {
      var elmnt = document.getElementById("selprov");
      elmnt.scrollIntoView();
    },
    AddAddress() {
      if (this.isAddAddress == false) {
        this.selectProv();
        this.isAddAddress = true;
      } else {
        this.isAddAddress = false;
      }
    },
    submitstore() {
      let key = localStorage.getItem("Authorization");
      let conf = { headers: { Authorization: "Bearer " + key } };
      let form = new FormData();
      if (this.name !== this.store.name) {
        form.append("name", this.name);
      }
      if (this.uname !== this.store.uname) {
        form.append("uname", this.uname);
      }
      if (this.birthdate !== this.store.birthdate) {
        form.append("birthdate", this.birthdate);
      }
      if (this.phone_number !== this.store.phone) {
        form.append("phone_number", this.phone_number);
      }
      if (this.gender !== this.store.gender) {
        form.append("gender", this.gender);
      }
      //   form.append("kode_provinsi", this.prov);
      //   form.append("kode_kota", this.kota);
      //   form.append("kode_kecamatan", this.kec);
      //   form.append("kode_desa", this.desa);
      //   form.append("kode_pos", this.kodepos);
      //   form.append("alamat", this.alamat);
      //   form.append("catatan", this.catatan);
      this.axios
        .post("/store/edit", form, conf)
        .then((response) => {
          this.getData();
          this.editMode = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitAddress() {
      // let key = localStorage("Authorization");
      // let conf = { headers: { Authorization: "Bearer " + key } };
      let form = new FormData();
      form.append("kode_provinsi", this.prov);
      form.append("kode_kota", this.kota);
      form.append("kode_kecamatan", this.kec);
      form.append("kode_desa", this.desa);
      form.append("kode_pos", this.kodepos);
      form.append("alamat", this.alamat);
      form.append("catatan", this.catatan);
      this.axios
        .post("/register/address", form)
        .then((response) => {
          this.response = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectProv() {
      $("#selkot").prop("selectedIndex", 0);
      this.kotaArr = this.wilayah[this.prov].regencies;
      this.selectKot();
    },
    selectKot() {
      $("#selkec").prop("selectedIndex", 0);
      this.kecArr = this.wilayah[this.prov].regencies[this.kota].districts;
      this.selectKec();
    },
    selectKec() {
      $("#seldes").prop("selectedIndex", 0);
      this.DesArr = this.wilayah[this.prov].regencies[this.kota].districts[
        this.kec
      ].villages;
    },
    verifyEmail() {},
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.key;
    this.getData();
  },
};
</script>
<style scoped>
a{ cursor: pointer; }
a .small{
  color: white;
}
.hide-input {
  -webkit-appearance: none;
  border: none;
  padding: 0;
}
.hide-input:disabled {
  background: transparent;
}
.form-profile {
  font-size: 1rem;
}
.table {
  font-size: 0.9rem;
}
.photoProfile {
  margin: 2px;
  border-radius: 5px;
  height: 130px;
  width: 130px;
  background-color: gray;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
table {
  min-width: none;
}
.small-h3{
  font-size: 110%;
  font-weight: 200;
}
a.small{
  color: white;
}
.link-head a{
  color: white;
  border-radius: 5px;
}
.link-head a.active{
  color: #4D9894;
  background: white;
}
.bg-prim{
  background-color: #4D9894;
}
</style>