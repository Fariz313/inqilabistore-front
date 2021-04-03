<template>
  <div class="row">
    <div v-for="(book,index) in book" :key="index" class="col-2 p-2">
      <div v-on:click="detail(book.id)">
        <img
          v-if="book.photo !== null"
          class="card-img-top"
          :src="baseImg+book.photo"
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
</template>
<script>
export default {
  name: 'Newbook',
  props: {
    book:{
      type:Array
    }
  },
  data(){
    return{
      urls:'hae',
      baseImg:process.env.VUE_APP_ROOT_IMAGE
    }
  },
  computed:{
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
    replaceByDefault(e) {
      e.target.src = 'https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg'
    },
    detail(id){
      this.$router.push('/detail/'+id)
    }
  },
  mounted(){
  }
}
</script>
<style scoped>
.card-img-top {
    width: 100%;
    height: 210px;
    object-fit: cover;
}
</style>