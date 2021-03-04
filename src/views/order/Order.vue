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
                <li class="list-group-item" v-for="(item,index) in order.data" :key="index">
                    <div class="row m-0 mb-3 d-flex justify-content-between">
                      <p>{{item.created_at}}</p>
                      <p class="text-warning"> <span class="badge badge-info">{{item.status | capitalize}}</span> </p>
                    </div> 
                    <div class="row m-0 d-flex justify-content-between">
                        <p class="text-muted invoice">INVOICE : <span class="text-dark">{{item.invoice}}</span></p>
                    </div>
                    <div class="row m-0 mb-3 d-flex justify-content-between">
                        <p> <span class="text-scon">{{item.store.store_name}}</span> ({{wilayah[item.store.kode_provinsi].regencies[item.store.kode_kota].name}}) | <span class="text-secondary">{{item.store.contact}}</span></p>
                    </div>
                    <div class="row m-0 d-flex justify-content-between">
                      <div class="col-6 pl-0 d-flex flex-column">
                        <div class="mb-1"> <p class="m-0 text-muted invoice">Alamat Pengirim</p> </div>
                        <div>
                          {{wilayah[item.store.kode_provinsi].regencies[item.store.kode_kota].districts[item.store.kode_kecamatan].villages[item.store.kode_desa].name}}, {{wilayah[item.store.kode_provinsi].regencies[item.store.kode_kota].districts[item.store.kode_kecamatan].name}}, {{wilayah[item.store.kode_provinsi].regencies[item.store.kode_kota].name}}
                        </div>
                        <div class="small">
                          {{item.store.address}}
                        </div>
                        <div></div>
                      </div>
                      <div class="col-6 pl-0 mb-3 d-flex flex-column">
                        <div class="mb-1"> <p class="m-0 text-muted invoice ">Alamat Penerima</p> </div>
                        <div>
                          {{wilayah[item.address.kode_provinsi].regencies[item.address.kode_kota].districts[item.address.kode_kecamatan].villages[item.address.kode_desa].name}}, {{wilayah[item.address.kode_provinsi].regencies[item.address.kode_kota].districts[item.address.kode_kecamatan].name}}, {{wilayah[item.address.kode_provinsi].regencies[item.address.kode_kota].name}}
                        </div>
                        <div class="small">
                          {{item.address.alamat}}
                        </div>
                        <div></div>
                      </div>
                      <div class="row m-0 d-flex flex-column">
                        <div class="mb-1"> <p class="m-0 text-muted invoice">Resi</p> </div>
                        <div v-if="resi">{{item.resi}}</div>
                        <div v-else>-</div>
                      </div>
                    </div>
                    <div class="row m-0 d-flex justify-content-end">
                        <button class="mx-1 btn btn-success">Bayar</button>
                        <button class="mx-1 btn btn-info">Detail</button>
                    </div>
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
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  data(){
    return{
      key:"",
      order:[],
      wilayah:region,
    }
  },
  methods:{
    formateDate(date){
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
    },
    getData(){
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("order", conf)
        .then((response) => {
          this.order = response.data.order;
          console.log(this.order.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.key;
    this.getData();
    snap.pay('81b98994-0b6f-4bc8-95ac-4d45224e1d2a');
  }
}
</script>
<style scoped>
.invoice{
    border-bottom: 1px solid rgb(228, 228, 228) ;
}
</style>