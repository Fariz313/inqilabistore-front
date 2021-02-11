<template>
  <div class="row w-100 p-5" style="margin-top: 80px">
    <div class="col-md-4 d-flex flex-column justify-content-center">
      <div class="main-image-panel mx-auto">
        <img
          class="main-image mx-auto"
          src="https://www.backscatter.com/ITEM_IMAGES/cn-9520b002_1.jpg?resizeid=6&resizeh=600&resizew=600"
          alt=""
          srcset=""
        />
      </div>
      <div class="image-list-panel d-flex justify-content-around">
        <img
          class="image-list"
          src="https://www.backscatter.com/ITEM_IMAGES/cn-9520b002_1.jpg?resizeid=6&resizeh=600&resizew=600"
          alt=""
        />
        <img
          class="image-list"
          src="https://www.backscatter.com/ITEM_IMAGES/cn-9520b002_1.jpg?resizeid=6&resizeh=600&resizew=600"
          alt=""
        />
        <img
          class="image-list"
          src="https://www.backscatter.com/ITEM_IMAGES/cn-9520b002_1.jpg?resizeid=6&resizeh=600&resizew=600"
          alt=""
        />
      </div>
    </div>
    <div class="col-md-4">
      <h3 class="mb-0">{{book.name}}</h3>
      <p class="m-0">{{book.publisher}} <small>( {{book.publication_year}} )</small></p>
      <hr class="mt-1" />
      <h2>Rp. {{commafy(book.price)}}</h2>
      <div class="d-flex bdetails">
        <p> {{book.page}} Halaman  </p><p> ISBN : {{book.isbn}}  </p>
      </div>
      <p> {{book.description}} </p>
    </div>
    <div class="col-md-4">
        <div class="card p-3">
                <h5>Beli atau Masukan ke Keranjang</h5>
            <div class="row mx-0 my-3">
                <div class="col-6 p-0 d-flex">
                <button v-on:click="count-=1" class="btn p-0" style="font-size:25px;color:grey"><i class="fas fa-minus-circle"></i></button>
                <input type="number" v-model="count" class="form-control mx-2"/>
                <button v-on:click="count+=1" class="btn p-0" style="font-size:25px;color:grey"><i class="fas fa-plus-circle"></i></button>
                </div>
                <div class="col-6 p-0 d-flex">
                    <p class=" w-100 m-0 text-center align-self-center"> Stock : {{book.stock}}  </p>
                </div>
            </div>
            <hr/>
            <table>

            <tr>
                <td> Harga</td>
                <td> : </td>
                <td> Rp {{commafy(book.price)}} </td>
            </tr>
            <tr>
                <td> Discount </td>
                <td> : </td>
                <td> {{book.discount}}% </td>
            </tr>
            <tr>
                <td> Harga Satuan </td>
                <td> : </td>
                <td> Rp {{commafy(book.price-((book.price*book.discount)/100))}} </td>
            </tr>
            <hr/>
            <tr>
                <td> Total </td>
                <td> : </td>
                <td> Rp {{commafy(count*(book.price-((book.price*book.discount)/100)))}} <s v-if="book.discount>0 && count>0">Rp {{commafy(count*book.price)}}</s></td>
            </tr>
            </table>
            <div class="d-flex">
            <button class="btn btn-success">Beli</button>
            <button class="ml-3 btn btn-warning" v-on:click="cart(book.id)">Keranjang</button>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
          key:'',
            book:[],
            count:0,
        }
    },
  methods: {
     getData(){
      this.axios.get("/book/"+this.$route.params.id)
      .then(response => {
        this.book = response.data
      })
      .catch(error => {
        console.log(error);
      });
    },
    cart(id){
        let conf = { headers: { Authorization: "Bearer " + this.key } };
      let form = new FormData();
      form.append("count", this.count);
      this.axios.post("/cart/"+id,form,conf)
      .then(response => {
        console.log("berhasil");
      })
      .catch(error => {
        console.log(error);
      });

    },
    commafy( num ) {
      var str = Number(num).toLocaleString().split('.');
      if (str[0].length >= 5) {
          str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (str[1] && str[1].length >= 5) {
          str[1] = str[1].replace(/(\d{3})/g, '$1 ');
      }
      return str.join('.');
    },
  },
  mounted() {
      this.key =     this.key = localStorage.getItem("Authorization"); 
      this.getData();
  },
};
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  text-align: center;
}
.main-image-panel {
  border-radius: 20px 20px 0px 0px;
  width: 100%;
  height: 380px;
  background: rgb(245, 245, 245);
}
.main-image {
  display: block;
  padding: 10px;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.image-list-panel {
  background: rgb(245, 245, 245);
  border-radius: 0px 0px 20px 20px;
}
.image-list {
  width: 75px;
  height: 75px;
  padding: 10px;
  object-fit: cover;
}
.bdetails p{
    border-left: rgba(0, 0, 0, 0.5) solid 1px ;
    padding-left: 10px ;
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.75);
}
</style>