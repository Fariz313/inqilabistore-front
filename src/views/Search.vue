<template>
  <div class="row mt-5 pt-5 mx-5 d-flex justify-content-between">
    <div class="col-2 card-filter">
      <h4>Filter</h4>
      <div class="card p-2 d-flex flex-column">
        <button
          class="btn btn-secondary"
          data-toggle="collapse"
          href="#collapseKategori"
          role="button"
          aria-expanded="false"
          aria-controls="collapseKategori"
        >
          Kategori
        </button>
        <div class="collapse" id="collapseKategori">
          <span v-for="item in genre" :key="item.id" >
            <button class="btn w-100" v-on:click="(addCategory(item.id))">
              {{item.genre}}
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="col-10">
      <div class="row m-0">
    <div v-for="(book,index) in book" :key="index" class="col-2 p-2">
      <div v-on:click="detail(book.id)">
        <img
          v-if="book.photo !== null"
          class="card-img-top"
          :src="book.photo"
          alt="Card image cap"
        />
        <img
          v-else
          class="card-img-top"
          src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
          alt="Card image cap"
        />
        <div class="card-body p-0">
          <p class="card-title judul-buku">{{book.name}}</p>
          <p><span class="badge badge-info mr-1" v-for="(it,indx) in book.genre_book" :key="indx">{{it.genre.genre}}</span> </p>
          <p class="card-text">
             <b>Rp {{commafy(book.price)}}</b>
          </p>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Search",
  components: {
    HelloWorld,
  },
  data() {
    return {
      book: [],
      genre: [],
      genreGet: null,
    };
  },
  methods:{
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
    getBook() {
      if(this.genreGet !== null){
        this.axios
          .get("book/s/book?g="+this.genreGet)
          .then((response) => {
            this.book = response.data.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }else{
        this.axios
          .get("book/s/book")
          .then((response) => {
            this.book = response.data.data.data;
          })
          .catch((err) => {

          });
      }
    },
    getGenre() {
      this.axios
        .get("book/a/genre")
        .then((response) => {
          this.genre = response.data.genre;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCategory(id){
      this.genreGet=id;
      this.getBook();
    },
    detail(id){
      this.$router.push('/detail/'+id)
    },
  },
  mounted(){
    this.getBook();
    this.getGenre();
  }
};
</script>

<style scoped>
.card-title {
  font-size: 16px;
}
.card-text {
  font-size: 12px;
}
.card-filter h4 {
  font-size: 1.2rem;
}
.card-filter h5 {
  font-size: 1rem;
}
.checked {
  color: orange;
}
</style>