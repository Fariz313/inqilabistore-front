<template>
  <div class="card m-0 p-0 border-none">
    <h3>Order</h3>
    <div class="card-body">
      <ul class="list-group mb-2">
        <li
          class="list-group-item my-3 shadow"
          v-for="(item, index) in order.data"
          :key="index"
        >
          <div class="row m-0 mb-3 d-flex justify-content-between">
            <p>
              {{
                moment(item.created_at).format(
                  "ddd dddd DD MMMM YYYY, H HH:mm:ss a"
                )
              }}
            </p>
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
            <button
              v-if="item.status == 'pending'"
              v-on:click="batal(item.id)"
              class="mx-1 btn btn-danger"
            >
              Batalkan
            </button>
            <button
              v-if="item.status == 'success' || item.status == 'success'"
              v-on:click="batal()"
              class="mx-1 btn btn-warning"
            >
              Laporkan Kesalahan
            </button>
            <!-- <button class="mx-1 btn btn-info">Detail</button> -->
            <form
              v-if="item.status == 'process'"
              v-on:submit.prevent=""
              class="border glowing-border"
            >
              <input
                type="text"
                placeholder="RESI"
                class="form-control d-inline w-auto border-none uneditable-input"
                v-model="resi"
              />
              <a v-on:click="confirm(item.id)" class="btn btn-light" >KIRIM</a>
            </form>
          </div>
        </li>
      </ul>
    </div>
    <b-modal v-model="showDetail" id="modal-lg" size="lg" :title="invoice">
      <div class="container-fluid w-100 m-0" style="min-height: 50px">
        <ul class="list-group">
          <li
            class="list-group-item my-3 p-1 shadow"
            v-for="(item, index) in orderDetail"
            :key="index"
          >
            <div class="row m-0">
              <div class="col-6 p-1">
                <h6 class="mb-0">{{ item.book.name }} X {{ item.count }}</h6>
                <p>
                  <small>Rp.{{ commafy(item.book.price) }}</small>
                </p>
              </div>
              <div class="col-6 p-1 d-flex justify-content-end">
                <h6>{{ commafy(item.book.price * item.book.price) }}</h6>
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
            @click="showDetail = false"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal v-model="showConfirm" id="modal-sm" size="sm" title="konfirmasi">
      <div class="container-fluid w-100 m-0" style="min-height: 50px">
        <h6>Apkah Anda Yakin Resi Benar?</h6>
        <p>{{resi}}</p>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="showConfirm = false"
          >
            Batal
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right mx-2"
            @click="sendBook(id)"
          >
            Benar
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
      moment: this.$moment,
      orderDetail:[],
      invoice:'',
      showDetail:false,
      showConfirm:false,
      resi:'',
      id:'',
    };
  },
  methods: {
    detailOrder(detail,invoice){
      this.orderDetail = detail;
      this.invoice = invoice;
      this.showDetail = true;
    },
    confirm(id){
      console.log('id: '+id);
      this.id=id;
      this.showConfirm=true;
    },
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
    getData() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("order/store/" + this.$route.params.id, conf)
        .then((response) => {
          this.order = response.data.order;
          this.order = response.data.order;
        })
        .catch((error) => {});
    },
    sendBook(id) {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      let form = new FormData();
      form.append('resi',this.resi);
      form.append('status','sending');
      this.axios
        .post("order/" +id, form ,conf)
        .then((response) => {
          this.getData();
          this.showConfirm=false;
        })
        .catch((error) => {
          console.log(error);
          alert('gagal memasukan resi');
        });
    },
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.key;
    this.getData();
  },
};
</script>
<style >
.invoice {
  border-bottom: 1px solid rgb(228, 228, 228);
}
.form-control {
  width: 100px;
  -webkit-transition: width 0.35s ease-in-out;
  transition: width 0.35s ease-in-out;
}
textarea:focus,
input[type="text"]:focus,
input[type="password"]:focus,
input[type="datetime"]:focus,
input[type="datetime-local"]:focus,
input[type="date"]:focus,
input[type="month"]:focus,
input[type="time"]:focus,
input[type="week"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="url"]:focus,
input[type="search"]:focus,
input[type="tel"]:focus,
input[type="color"]:focus,
.uneditable-input:focus {
  border-color: rgba(126, 239, 104, 0.8);
  box-shadow: none;
  outline: 0 none;
}
.glowing-border {
    border: 2px solid rgba(104, 219, 239, 0.8);
    border-radius: 7px;
    box-shadow: 0 0 10px rgba(104, 219, 239, 0.8);
}
</style>