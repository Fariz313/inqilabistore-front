<template>
  <div class="container-fluid mt-5 pt-5">
    <p
      class="mx-auto text-center py-2 my-2 font-weight-light text-muted"
      style="display: block"
    >
      <span class="font-weight-bold text-muted">Data Diri</span> -
      <span class="font-weight-bold text-dark">Alamat</span> - Verifikasi Email
      - Selesai
    </p>
    <div class="card d-flex flex-column justify-content-center w-50 mx-auto">
        
    </div>
    <div class="card d-flex flex-column justify-content-center w-50 mx-auto">
      {{ prov }}-{{ kota }}-{{ kec }}-{{ desa }}
      {{ response }}
      <div class="d-flex flex-column mx-auto from-group w-75">
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
        <label>Kode Pos</label>
        <input
          class="form-control"
          type="number"
          v-model="kodepos"
          placeholder="KodePos"
        />
        <textarea
          class="form-control"
          cols="30"
          rows="5"
          v-model="alamat"
          placeholder="Alamat"
        ></textarea>
        <textarea
          class="form-control"
          cols="30"
          rows="5"
          v-model="catatan"
          placeholder="Catatan"
        ></textarea>
      </div>
      <button
        class="btn btn-primary m-1 w-75 mx-auto"
        v-on:click="submitAddress"
      >
        Submit
      </button>
      <button class="btn btn-primary m-1 w-75 mx-auto" v-on:click="verifyEmail">
        Selesai
      </button>
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
      prov: 0,
      kota: 0,
      kec: 0,
      desa: 0,
      kodepos: 0,
      alamat: "",
      catatan: "",
      key: "",
      response: [],
    };
  },
  methods: {
    submitAddress() {
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
          this.response = response.data;
        })
        .catch((error) => {
          console.log(error);
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
    verifyEmail() {},
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
    this.selectProv();
  },
};
</script>