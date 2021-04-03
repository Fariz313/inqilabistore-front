<template>
  <div class="container-fluid mt-5 pt-5">
    <p
      class="mx-auto text-center py-2 my-2 font-weight-light text-muted"
      style="display: block"
    >
      <span class="font-weight-bold text-muted">Data Diri</span> -
      <span class="font-weight-bold text-dark">Alamat</span>
      - Selesai
    </p>
    <div class="card d-flex flex-column justify-content-center mx-auto">
      <div class="d-flex flex-column mx-auto w-75 mb-5">
        <h3>Alamat Saya</h3>
        <div v-for="(item, index) in address" :key="item.id" class="card py-3">
          <div class="row m-0">
            <div class="col-1">
              {{ index + 1 }}
            </div>
            <div class="col-11">
              <small
                >{{
                  wilayah[item.kode_provinsi].regencies[item.kode_kota].name
                }},
                {{ wilayah[item.kode_provinsi].name }}
              </small>
              <p>
                {{ item.alamat }}
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <form v-on:submit.prevent="submitAddress">
        <div class="d-flex flex-column mx-auto w-75">
          <h3>Tambah Alamat</h3>
          <div class="form-group">
            <label for="selprov">Pilih Provinsi</label>
            <select
              class="form-control"
              id="selprov"
              v-model="prov"
              v-on:change="selectProv"
            >
              <option id="defprov" value="" disabled selected>Provinsi</option>
              <option
                v-for="(item, index) in wilayah"
                v-bind:key="item.id"
                v-bind:value="index"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="selkot">Pilih Kota</label>
            <select
              class="form-control"
              id="selkot"
              v-model="kota"
              v-on:change="selectKot"
            >
              <option id="defkot" value="" disabled selected>Kota</option>
              <option
                v-for="(item, index) in kotaArr"
                v-bind:key="item.id"
                v-bind:value="index"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="selkec">Pilih Kecaamatan</label>
            <select
              class="form-control"
              id="selkec"
              v-model="kec"
              v-on:change="selectKec"
            >
              <option id="defkec" value="" disabled selected>Kecamatan</option>
              <option
                v-for="(item, index) in kecArr"
                v-bind:key="item.id"
                v-bind:value="index"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="seldes">Pilih Kelurahan/Desa</label>
            <select class="form-control" id="seldes" v-model="desa">
              <option id="defdes" value="" disabled selected>Desa</option>
              <option
                v-for="(item, index) in DesArr"
                v-bind:key="item.id"
                v-bind:value="index"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Kode Pos</label>
            <input
              required
              class="form-control"
              type="number"
              v-model="kodepos"
              placeholder="KodePos"
            />
          </div>
          <div class="form-group">
            <label>Tuliskan Alamat</label>
            <textarea
              required
              class="form-control"
              cols="30"
              rows="5"
              v-model="alamat"
              placeholder="Alamat"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="">Tuliskan Catatan</label>
            <textarea
              class="form-control"
              cols="30"
              rows="5"
              v-model="catatan"
              placeholder="Catatan"
            ></textarea>
          </div>
          <b-alert dismissible v-model="messageShow" variant="warning">
            {{ messageText }}
          </b-alert>
          <div class="form-group">
            <button
              type="submit"
              :disabled="isDisabled"
              class="btn btn-success mr-3"
            >
              Tambahkan
            </button>
            <a class="btn btn-warning mx-auto" v-on:click="verifyEmail">
              Selesai
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import region from "./../../indonesia-region.min.json";

export default {
  data() {
    return {
      wilayah: region,
      kotaArr: [],
      kecArr: [],
      DesArr: [],
      jatim: [],
      address: [],
      prov: 0,
      kota: 0,
      kec: 0,
      desa: 0,
      kodepos: 0,
      alamat: "",
      catatan: "",
      key: "",
      response: [],
      isDisabled: false,
      messageShow: 0,
      messageText: "",
    };
  },
  methods: {
    getAddress() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("/address", conf)
        .then((response) => {
          this.address = response.data.data;
        })
        .catch((error) => {});
    },
    submitAddress() {
      this.isDisabled = true;
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      let form = new FormData();
      form.append("kode_provinsi", this.prov);
      form.append("kode_kota", this.kota);
      form.append("kode_kecamatan", this.kec);
      form.append("kode_desa", this.desa);
      form.append("kode_pos", this.kodepos);
      form.append("alamat", this.alamat);
      form.append("catatan", this.catatan);
      this.axios
        .post("/register/address", form, conf)
        .then((response) => {
          this.getAddress();
          this.isDisabled = false;
          this.response = response.data;
        })
        .catch((error) => {
          this.isDisabled = false;
          this.messageText = error.response.data.message;
          this.messageShow = 5;
        });
    },
    selectProv() {
      $("#selkot").prop("selectedIndex", 0);
      this.kotaArr = this.wilayah[this.prov].regencies;
      this.selectKot();
    },
    selectKot() {
      $("#selkec").prop("selectedIndex", 0);
      this.kecArr = this.wilayah[this.prov].regencies[this.kota].districts;
      this.selectKec();
    },
    selectKec() {
      $("#seldes").prop("selectedIndex", 0);
      this.DesArr = this.wilayah[this.prov].regencies[this.kota].districts[
        this.kec
      ].villages;
    },
    verifyEmail() {
      location.href = "/";
    },
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    // console.log(localStorage.getItem("User"));
    // this.axios
    //     .get("/register/address/user", form, conf)
    //     .then((response) => {
    //       this.response = response.data;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    this.getAddress();
    this.selectProv();
  },
};
</script>