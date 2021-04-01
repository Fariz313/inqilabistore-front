<template>
  <div class="w-100 mt-5 pt-5 mx-0 px-5">
    <div class="row mx-0 pt-4">
      <div class="col-8">
        <div class="card rounded border-white shadow-sm">
          <div class="card-header bg-prim">
            <h3 class="text-light">Cart</h3>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(item, index) in cart"
                :key="item.id"
              >
                <div class="row mx-0">
                  <h5 class="text-secondary">
                    {{ item.store_name }}
                    <input
                      type="radio"
                      name="radio-store"
                      :value="index"
                      v-model="selectedStore"
                    />
                  </h5>
                </div>
                <div class="row mx-0">
                  <ul class="list-group w-100">
                    <li
                      class="list-group-item border-none border-bottom"
                      v-for="(citem, cindex) in item.cart"
                      :key="citem.id"
                    >
                      <div class="row mx-0 mb-3">
                        <div class="col-1 d-flex align-items-center">
                          <input
                            type="checkbox"
                            class="form-control h-25"
                            v-if="selectedStore == index"
                            v-on:change="check"
                            v-model="selected[cindex]"
                          />
                        </div>
                        <div class="col-2">
                          <img
                            class="card-img-top h-100 cart-img"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                            alt="Card image cap"
                          />
                        </div>
                        <div class="col-6">
                          <h6>{{ citem.name }}</h6>
                          <h5 v-if="citem.discount == 0" class="text-info">
                            Rp {{ commafy(citem.price) }}
                          </h5>
                          <h5 v-if="citem.discount > 0" class="text-secondary">
                            <small
                              >Rp
                              <strike>{{ commafy(citem.price) }}</strike></small
                            >
                            <strong class="text-warning"
                              >({{ citem.discount }}%)</strong
                            >
                          </h5>
                          <h5 v-if="citem.discount > 0" class="text-info">
                            Rp
                            {{
                              commafy(
                                Math.round(
                                  citem.price -
                                    (citem.price * citem.discount) / 100
                                )
                              )
                            }}
                          </h5>
                        </div>
                        <div class="col-3">
                          <h4>
                            Rp{{
                              commafy(
                                Math.round(
                                  citem.count *
                                    (citem.price -
                                      (citem.price * citem.discount) / 100)
                                )
                              )
                            }}
                          </h4>
                        </div>
                      </div>
                      <div class="row mx-0 d-flex justify-content-between">
                        <div class="col-6">
                          <button class="btn btn-outline-success p-1">
                            <small>Tambah Catatan</small>
                          </button>
                        </div>
                        <div class="col-6 d-flex flex-row-reverse">
                          <input
                            class="form-control d-inline w-25"
                            type="number"
                            v-model="citem.count"
                          />
                          <button
                            v-on:click="deleteCart(citem.id)"
                            class="btn btn-outline-danger mr-3"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card rounded border-white shadow-sm">
          <div class="card-header bg-scon">
            <h3 class="text-light">Checkout</h3>
          </div>
          <div class="card-body">
            <h3>
              {{ getStore(selectedStore) }}
            </h3>
            <!-- <h3>{{wilayah[cart[selectedStore].kode_provinsi].regencies[cart[selectedStore].kode_kota].name}}{{wilayah[cart[selectedStore].kode_provinsi].name}}</h3> -->
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(item, index) in selectedCheck"
                :key="index"
              >
                <div class="row mx-0 d-flex justify-content-between">
                  <h6>{{ cart[selectedStore].cart[item].name }} <span class="text-secondary">x {{ cart[selectedStore].cart[item].count}} </span></h6>
                  <div>
                    <h5>
                      Rp.
                      {{
                        commafy(
                          Math.round(
                            cart[selectedStore].cart[item].price *
                              cart[selectedStore].cart[item].count
                          )
                        )
                      }}
                    </h5>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="row mx-0 d-flex justify-content-between align-items-center">
                  <button class="btn btn-info" v-on:click="getongkir">Check Ongkir</button>
                  <pre class="m-0">{{ongkir}}</pre>
                </div>
              </li> 
              <li class="list-group-item bg-success">
                <div class="row mx-0 d-flex justify-content-between">
                  <h6 class="text-white">TOTAL</h6>
                  <div>
                    <h5 v-if="disprice !== price" class="text-white">
                      <strike class="text-secondary"
                        >Rp.{{ commafy(price) }}</strike
                      >
                    </h5>
                    <h5 class="text-white">Rp.{{ commafy(disprice) }}</h5>
                  </div>
                </div>
              </li>
            </ul>
            <p>Pilih Alamat</p>
            <ul class="list-group">
              <li
                class="list-group-item px-1"
                v-for="(item, index) in address"
                :key="item.id"
              >
                <div class="row mx-0">
                  <div class="col-2 d-flex">
                    <span class="my-auto mr-2">{{ index + 1 }}</span>
                    <input class="my-auto mr-2" name="idaddress" type="radio" :value="item.id" v-model="address_id" />
                  </div>
                  <div class="col-8 d-flex flex-column">
                    <small>{{wilayah[item.kode_provinsi].regencies[item.kode_kota].name}},
                      {{wilayah[item.kode_provinsi].name}}
                    </small>
                    <p>
                      {{item.alamat}}
                    </p>
                  </div>
                </div>
              </li>
              <li class="list-group-item">

              </li>
              <li class="list-group-item">
                <button class="btn btn-outline-success w-100">CHECKOUT</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import region from "./../../../indonesia-region.min.json";
export default {
  data() {
    return {
      wilayah:region,
      key: "",
      cart: [],
      address: [],
      address_id: null,
      count: [],
      price: 0,
      disprice: 0,
      selectedStore: 0,
      ongkir: "Cek Ongkir ... ",
      selected: [],
      selectedCount: [],
      selectedCheck: [],
    };
  },
  computed: {
    //   getStore(index){
    //      if(this.cart.length>0){
    //          return "owa"+index;
    //      } else{
    //          return "awo";
    //      }
    //   }
  },
  methods: {
    getAddress() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("/login/checkfull", conf)
        .then((response) => {
          this.address = response.data.user.address;
        })
        .catch((error) => {});
    },
    getCart() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("/cart", conf)
        .then((response) => {
          this.cart = response.data.data.data;
        })
        .catch((error) => {});
    },
    getStore(index) {
      if (this.cart.length > 0) {
        return this.cart[this.selectedStore].store_name;
      } else {
        return "Select Store";
      }
    },
    pay() {},
    commafy(num) {
      var str = Number(num).toLocaleString().split(".");
      if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
      if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, "$1 ");
      }
      return str.join(".");
    },
    check() {
      this.selectedCheck = [];
      this.price = 0;
      this.disprice = 0;
      for (let index = 0; index < this.selected.length; index++) {
        if (this.selected[index] == true) {
          this.selectedCheck.push(index);
          this.price += this.cart[this.selectedStore].cart[index].price;
          var discount = 0;
          discount = this.cart[this.selectedStore].cart[index].discount;
          this.disprice = Math.round(
            this.price - (this.price * discount) / 100
          );
          this.price =
            this.price * this.cart[this.selectedStore].cart[index].count;
          this.disprice =
            this.disprice * this.cart[this.selectedStore].cart[index].count;
        }
      }
    },
    deleteCart(id) {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .delete("/cart/" + id, conf)
        .then((response) => {
          this.getCart();
        })
        .catch((error) => {});
    },
    getongkir(){
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      let form = new FormData();
      form.append('origin_prov',this.cart[this.selectedStore].kode_provinsi);
      form.append('origin_kot',this.cart[this.selectedStore].kode_kota);
      form.append('destination_kot',this.cart[this.selectedStore].kode_kota);
      form.append('destination_prov',this.cart[this.selectedStore].kode_kota);
      form.append('courier',"jne");
      let weight = 0;
      for (let index = 0; index < this.cart[this.selectedStore].cart.length; index++) {
        weight += this.cart[this.selectedStore].cart[index].weight;
      }
      form.append('weight',weight);
      this.axios
        .post("/getongkir", form)
        .then((response) => {
          console.log(response.data.ongkir.rajaongkir.results);
          this.ongkir = response.data.ongkir.rajaongkir.results.costs[1].cost[0].value;
          console.log(this.ongkir);
        })
        .catch((error) => {});
    },
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.getCart();
    this.getAddress();
  },
};
</script>
<style scoped>
.card {
  border: none;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.cart-img {
  object-fit: cover;
  height: 100px !important;
}
</style>