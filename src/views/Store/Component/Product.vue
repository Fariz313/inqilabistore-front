<template>
  <div>
    <h4 class="card-title">Produk</h4>
    <button
      v-on:click="addProduct"
      data-target=".bd-example-modal-lg"
      class="btn btn-primary"
    >
      Tambahkan Produk
    </button>
    <div class="row">
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
    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Produk Baru</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="addBook" v-on:submit.prevent="submitBook">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Judul Buku"  
                  required
                />
              </div>
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-success mr-3"
                  data-toggle="collapse"
                  data-target="#collapseGenre"
                  aria-expanded="false"
                  aria-controls="collapseGenre"
                  v-on:click="getGenre"
                >
                  Tambah Kategori
                </button>
                <a v-for="(item, index) in selgenre" :key="item.id"
                  ><span class="badge badge-pill badge-info"
                    >{{ genre.find((x) => x.id === item).genre }}
                    <a href="#" v-on:click="deleteGenre(index)"
                      ><span class="badge badge-danger">X</span></a
                    >
                  </span></a
                >
              </div>
              <div class="form-group">
                <div class="collapse" id="collapseGenre">
                  <div class="border card-body selgen">
                    <a
                      v-for="item in genre"
                      :key="item.id"
                      v-on:click="addGenre(item.id)"
                      ><span class="badge badge-pill badge-info">{{
                        item.genre
                      }}</span></a
                    >
                  </div>
                </div>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Penulis Buku"
                  v-model="writter"
                  required
                />
              </div>
              <div class="form-group">
                <textarea
                  class="form-control"
                  placeholder="Deskripsi Buku"
                  v-model="description"
                  cols="30"
                  rows="10"
                  required
                ></textarea>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="publisher"
                  placeholder="Nama Penerbit Buku"
                  required
                />
              </div>
              <div class="form-group d-flex">
                <input
                  type="number"
                  class="form-control w-40 mx-1"
                  v-model="isbn"
                  placeholder="ISBN Buku"
                  required
                />
                <input
                  class="form-control w-30"
                  type="number"
                  v-model="page"
                  placeholder="Jumlah Halaman Buku"
                  required
                />
                <input
                  type="number"
                  class="form-control w-30 mx-1"
                  id="py"
                  minlength="4"
                  maxlength="4"
                  v-model="publication_year"
                  placeholder="Tahun Terbit Buku"
                  required
                />
              </div>
              <div class="form-group d-flex">
                <div class="input-group w-50">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Rp.</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    required
                    min="0"
                    v-model="price"
                  />
                </div>
                <div class="input-group w-25">
                  <input
                    type="number"
                    class="form-control h-100 ml-1"
                    v-model="discount"
                    min="0"
                    max="100"
                    placeholder="Diskon Buku"
                    required
                  />
                  <div class="input-group-append">
                    <span class="input-group-text">%</span>
                  </div>
                </div>
                <input
                  type="number"
                  class="form-control w-25 ml-1"
                  v-model="stock"
                  min="0"
                  placeholder="Stok Buku"
                  required
                />
              </div>
              <div class="d-flex flex-row-reverse">
                <button
                  class="btn btn-danger mx-1"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Cancel
                </button>
                <button class="btn btn-success mx-1" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      book: [],
      name: "",
      writter: "",
      publisher: "",
      description: "",
      page: "",
      isbn: "",
      price: "",
      stock: "",
      discount: "",
      publication_year: "",
      genre: [],
      selgenre: [],
      s: "",
    };
  },
  methods: {
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
    },
    addProduct() {
      $(".bd-example-modal-lg").modal("show");
    },
    getBook() {
      this.axios
        .get("book/store/" + this.$route.params.id)
        .then((response) => {
          this.book = response.data.data.data;
          console.log(this.book);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGenre() {
      this.axios
        .get("book/g/genre", { params: { s: this.s } })
        .then((response) => {
          this.genre = response.data.genre.data;
        })
        .catch((err) => {});
    },
    addGenre(id) {
      if (this.selgenre.length < 4) {
        this.selgenre.push(id);
      }
    },
    deleteGenre(index) {
      this.selgenre.splice(index, 1);
    },
    submitBook() {
      $("#addBook :input").prop("disabled", true);
      let form = new FormData();
      form.append("name", this.name);
      form.append("description", this.description);
      form.append("writter", this.writter);
      form.append("publisher", this.publisher);
      form.append("publication_year", this.publication_year);
      form.append("isbn", this.isbn);
      form.append("page", this.page);
      form.append("stock", this.stock);
      form.append("price", this.price);
      if (this.discount === null || this.discount === "") {
        this.discount = 0;
      }
      form.append("discount", this.discount);
      for (let index = 0; index < this.selgenre.length; index++) {
        form.append("genre[" + index + "]", this.selgenre[index]);
      }
      this.axios
        .post("/book", form)
        .then((response) => {
          $(".bd-example-modal-lg").modal("hide");
          $("#addBook :input").prop("disabled", false);
        })
        .catch((err) => {
          $("#addBook :input").prop("disabled", false);
        });
    },
  },
  mounted() {
    this.getBook();
  },
};
</script>
<style scoped>
.price-group {
  overflow: hidden;
  padding-top: 1px;
  padding-bottom: 1px;
}
.input-price {
  width: 85%;
  border: none;
}
.span-price {
  width: 10%;
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
.selgen a {
  cursor: pointer;
  margin-right: 5px;
}
</style>