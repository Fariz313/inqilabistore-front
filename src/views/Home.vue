<template>
  <div class="home">
    <div class="container-fluid p-0" style="margin-top:100px">
      <Banner/>
      <div class="container-fluid container-item">
        <div class="row">
        <h2>KATEGORI</h2>
        </div>
        <div class="row">
          <div v-for="(item,index) in genre" :key="index" class="col-2  p-2 ">
            <div class="card text-white kat">
              <div class="bg-itemkat" :style="{backgroundImage: 'url(https://nusantaranews.co/assets/uploads/2019/09/Menghapus-Materi-Perang-dari-Sejarah-Islam-Absurd-dan-Ahistoris.jpg)'} "></div>
              <div class="card-body d-flex align-items-center h-100 w-100">
                <h2 class="mx-auto cap">{{item.genre}}</h2>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <!-- <div class="row">
          <h2>Terlaris</h2>
        </div>
        <Tseller/>
        <hr/> -->
        <h2>Buku Baru</h2>
        <Newbook
        v-bind:book="book"
        />
        <div class="row w-100">
          <button class="btn-primary m-5 mx-auto">
            Tampilkan Lebih Banyak
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Banner from "@/components/Banner.vue";
import Tseller from "@/components/Tseller.vue";
import Newbook from "@/components/Newbook.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,Banner,Tseller,Newbook
  },
  data(){
    return{
      book:[],
      genre:[]
    }
  },
  methods:{
    getData(){
      this.axios.get("/book")
      .then(response => {
        this.book  = response.data.data.data;
        console.log(response.data);
        this.genre = response.data.genre.data;
      })
      .catch(error => {
        
      });
    },
  },
  mounted(){
    this.getData(); 
  }
};
</script>

<style>
.container-item{
  padding-left: 100px !important;
  padding-right: 100px !important;
}
.kat{
  height: 10vw;
}
.bg-itemkat{
  height: 100%;
  width: 100%;
  background-color: black;
  position: absolute;
  background-repeat: no-repeat ;
  background-size: 100% 100%;
  background-position: center;
  filter: brightness(50%);
  z-index: 1;
}
.cap{
  z-index: 2;
}
.card-body p{
  margin: 0;
}
@media (max-width: 992px) {
.container-item{
  padding-left: 20px !important;
  padding-right: 20px !important;
}
}
</style>