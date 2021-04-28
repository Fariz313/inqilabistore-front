<template>
  <div class="w-100 mt-5 pt-5 mx-0 px-5">
    <div class="row mx-0 pt-4">
      <div class="col-12">
        <div class="card rounded border-white shadow-sm">
          <div class="card-header bg-prim">
            <h3 class="text-light">Order</h3>
          </div>
          <div class="card-body">
            <ul class="list-group mb-2">
              <li
                class="list-group-item my-3 shadow"
                v-for="(item, index) in order.data"
                :key="index"
              >
                <div class="row m-0 mb-3 d-flex justify-content-between">
                  <p>{{ item.created_at }}</p>
                  <p class="text-warning">
                    <span
                      class="badge shadow"
                      v-bind:class="{
                        'badge-warning': item.status == 'pending',
                        'badge-info': item.status == 'process',
                        'badge-success': item.status == 'success',
                        'badge-danger': item.status == 'failed',
                        'badge-warning': item.status == 'sending',
                         }"
                      >{{ item.status | capitalize }}</span
                    >
                  </p>
                </div>
                <div class="row m-0 d-flex justify-content-between">
                  <p class="text-muted invoice">
                    INVOICE : <span class="text-dark">{{ item.invoice }}</span>
                  </p>
                </div>
                <div class="row m-0 mb-3 d-flex justify-content-between">
                  <p>
                    <span class="text-scon">{{ item.store.store_name }}</span>
                    ({{
                      wilayah[item.store.kode_provinsi].regencies[
                        item.store.kode_kota
                      ].name
                    }}) |
                    <span class="text-secondary">{{ item.store.contact }}</span>
                  </p>
                </div>
                <div class="row m-0 d-flex justify-content-between">
                  <div class="col-6 pl-0 d-flex flex-column">
                    <div class="mb-1">
                      <p class="m-0 text-muted invoice">Alamat Pengirim</p>
                    </div>
                    <div>
                      {{
                        wilayah[item.store.kode_provinsi].regencies[
                          item.store.kode_kota
                        ].districts[item.store.kode_kecamatan].villages[
                          item.store.kode_desa
                        ].name
                      }},
                      {{
                        wilayah[item.store.kode_provinsi].regencies[
                          item.store.kode_kota
                        ].districts[item.store.kode_kecamatan].name
                      }},
                      {{
                        wilayah[item.store.kode_provinsi].regencies[
                          item.store.kode_kota
                        ].name
                      }}
                    </div>
                    <div class="small">
                      {{ item.store.address }}
                    </div>
                    <div></div>
                  </div>
                  <div class="col-6 pl-0 mb-3 d-flex flex-column">
                    <div class="mb-1">
                      <p class="m-0 text-muted invoice">Alamat Penerima</p>
                    </div>
                    <div>
                      {{
                        wilayah[item.address.kode_provinsi].regencies[
                          item.address.kode_kota
                        ].districts[item.address.kode_kecamatan].villages[
                          item.address.kode_desa
                        ].name
                      }},
                      {{
                        wilayah[item.address.kode_provinsi].regencies[
                          item.address.kode_kota
                        ].districts[item.address.kode_kecamatan].name
                      }},
                      {{
                        wilayah[item.address.kode_provinsi].regencies[
                          item.address.kode_kota
                        ].name
                      }}
                    </div>
                    <div class="small">
                      {{ item.address.alamat }}
                    </div>
                    <div></div>
                  </div>
                  <div class="row m-0 d-flex flex-column">
                    <div class="mb-1">
                      <p class="m-0 text-muted invoice">Resi</p>
                    </div>
                    <div v-if="item.resi">{{ item.resi }}</div>
                    <div v-else>-</div>
                  </div>
                </div>
                <div class="row m-0 d-flex justify-content-end">
                  <button class="btn btn-primary" v-on:click="detailOrder(item.order_detail,item.invoice)">detail</button>
                  <button
                    v-if="item.status == 'pending'"
                    v-on:click="bayar(item.payment_method)"
                    class="mx-1 btn btn-success"
                  >
                    Bayar
                  </button>
                  <button
                    v-if="item.status == 'pending'"
                    v-on:click="batal(item.id)"
                    class="mx-1 btn btn-danger"
                  >
                    Batalkan
                  </button>
                  <button
                    v-if="item.status == 'process' || item.status == 'sending'"
                    v-on:click="terima(item.id)"
                    class="mx-1 btn btn-success"
                  >
                    Terima
                  </button>
                  <button
                    v-if="item.status == 'success' || item.status == 'success'"
                    v-on:click="batal()"
                    class="mx-1 btn btn-warning"
                  >
                    Laporkan Kesalahan
                  </button>
                  <!-- <button class="mx-1 btn btn-info">Detail</button> -->
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="showDetail" id="modal-lg" size="lg" :title="invoice">
        <div class="container-fluid w-100 m-0" style="min-height:50px">
          <ul class="list-group">
            <li class="list-group-item my-3 p-1 shadow" v-for="(item,index) in orderDetail" :key="index">
              <div class="row m-0">
                <div class="col-6 p-1">
                  <h6 class="mb-0">{{item.book.name}} X {{item.count}}</h6> 
                  <p> <small>Rp.{{commafy(item.book.price)}}</small> </p>
                </div>
                <div class="col-6 p-1 d-flex justify-content-end">
                  <h6>{{commafy(item.book.price*item.book.price)}}</h6>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="showDetail=false"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import region from "./../../../indonesia-region.min.json";

export default {
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  data() {
    return {
      key: "",
      order: [],
      wilayah: region,
      showDetail:false,
      orderDetail:[],
      invoice:"",
    };
  },
  methods: {
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
    detailOrder(detail,invoice){
      this.orderDetail = detail;
      this.invoice = invoice;
      this.showDetail = true;
    },
    formateDate(date) {
      return moment(String(value)).format("MM/DD/YYYY hh:mm");
    },
    bayar(kode) {
      snap.pay(kode);
    },
    batal(id) {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .delete("/order/" + id, conf)
        .then((response) => {
          this.getData();
          alert(response.data.message);
        })
        .catch((error) => {
          this.getData();
          alert(error.response.data.message);
        });
    },
    terima(id) {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      let form = new FormData();
      form.append('status','success');
      this.axios
        .post("order/" +id, form ,conf)
        .then((response) => {
          this.getData();
          alert('Transaksi Telah Selesai');
        })
        .catch((error) => {
          console.log(error);
          alert('gagal menerima');
        });
    },
    getData() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("order", conf)
        .then((response) => {
          this.order = response.data.order;
        })
        .catch((error) => {});
    },
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.key;
    this.getData();
  },
};
</script>
<style scoped>
.invoice {
  border-bottom: 1px solid rgb(228, 228, 228);
}
</style>