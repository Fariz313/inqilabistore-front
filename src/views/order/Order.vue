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
                      <p class="text-warning"> <span class="badge badge-warning">PENDING</span> </p>
                    </div> 
                    <div class="row m-0 d-flex justify-content-between">
                        <p class="text-muted invoice">INVOICE : <span class="text-dark">142102531152-kv</span></p>
                    </div>
                    <div class="row m-0 mb-3 d-flex justify-content-between">
                        <p> <span class="text-scon">TOKO KEREN</span> (Kota Malang) | <span class="text-secondary">085707234923</span></p>
                    </div>
                    <div class="row m-0 d-flex justify-content-between">
                      <div class="col-6 pl-0 d-flex flex-column">
                        <div class="mb-1"> <p class="m-0 text-muted invoice">Alamat Pengirim</p> </div>
                        <div>
                          Desa Ased, Kec Lowokwaru, Kota Malang
                        </div>
                        <div class="small">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi tenetur velit molestias blanditiis sit neque, adipisci sed voluptas voluptatibus consectetur eos vel reiciendis eius vitae tempore tempora vero nostrum saepe!
                        </div>
                        <div></div>
                      </div>
                      <div class="col-6 pl-0 mb-3 d-flex flex-column">
                        <div class="mb-1"> <p class="m-0 text-muted invoice ">Alamat Penerima</p> </div>
                        <div>
                          Desa Ased, Kec Lowokwaru, Kota Malang
                        </div>
                        <div class="small">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi tenetur velit molestias blanditiis sit neque, adipisci sed voluptas voluptatibus consectetur eos vel reiciendis eius vitae tempore tempora vero nostrum saepe!
                        </div>
                        <div></div>
                      </div>
                      <div class="row m-0 d-flex flex-column">
                        <div class="mb-1"> <p class="m-0 text-muted invoice">Resi</p> </div>
                        <div>213213123123124213213124</div>
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

export default {
  data(){
    return{
      key:"",
      order:[],
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
    }
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.key;
    this.getData();
  }
}
</script>
<style scoped>
.invoice{
    border-bottom: 1px solid rgb(228, 228, 228) ;
}
</style>