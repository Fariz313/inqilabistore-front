<template>
  <div class="container-fluid" style="padding-top: 93px">
    <div class="row py-5 px-4">
      <div class="col-xl-8 col-md-8 col-sm-10 mx-auto">
        <!-- Profile widget -->
        <div class="bg-white shadow rounded overflow-hidden">
          <div class="p-4 bg-prim">
            <div class="media align-items-end profile-header">
              <h1 class="text-white">Buat Toko</h1>
            </div>
          </div>
          <div class="px-4 pb-4 d-flex flex-column bd-highlight bg-light">
            <div>
              <form @submit.prevent="Submit">
                <div class="form-group">
                  <label for="storeName">Nama Toko</label>
                  <input
                    type="storeName"
                    class="form-control"
                    id="storeName"
                    v-model="storeName"
                    placeholder="Contoh: Tokoku"
                  />
                </div>
                <div class="form-group">
                  <label for="description">Deskripsi Toko</label>
                  <textarea
                    class="form-control"
                    id="description"
                    v-model="description"
                    rows="4"
                    placeholder="Masukan Deskripsi Toko Anda"
                  />
                </div>
                <div class="form-group">
                  <label for="description">Kontak</label>
                  <vue-phone-number-input
                    required
                    v-model="contact"
                    color="red"
                    v-on:update="onUpdate"
                  />
                </div>
                <div class="d-flex flex-column mx-auto form-group">
                  <label for="description">Alamat Toko</label>
                  <select
                    class="form-control"
                    id="selprov"
                    v-model="prov"
                    v-on:change="selectProv"
                  >
                    <option id="defprov" value="" disabled selected>
                      Provinsi
                    </option>
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
                    <option id="defkec" value="" disabled selected>
                      Kecamatan
                    </option>
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
                  <small>Kode Pos</small>
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
                  <!-- <textarea
                    class="form-control"
                    cols="30"
                    rows="5"
                    v-model="catatan"
                    placeholder="Catatan"
                  ></textarea> -->
                </div>
                <div class="d-flex">
                  <button
                    type="submit"
                    :disabled="isDisabled"
                    class="btn btn-success"
                  >
                    Submit
                  </button>
                  <a class="btn btn-danger ml-3">Cancel</a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- End profile widget -->
      </div>
    </div>
  </div>
</template>
<script>
import region from "./../../../indonesia-region.min.json";

export default {
  data() {
    return {
      storeName: "",
      description: "",
      key: "",
      // ----------------------
      wilayah: region,
      kotaArr: [],
      kecArr: [],
      DesArr: [],
      prov: 0,
      kota: 0,
      kec: 0,
      desa: 0,
      kodepos: 0,
      rawPhone: [],
      alamat: "",
      catatan: "",
      contact: "",
      isDisabled: false,
    };
  },
  computed: {},
  methods: {
    check() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.key = localStorage.getItem("Authorization");
      this.axios
        .get("/store/ishavestore", conf)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            console.log(err.response.data.id);
            this.$router.push("/store/" + err.response.data.id);
          } else {
            this.$router.push("/");
          }
        });
    },
    onUpdate(payload) {
      this.rawPhone = payload;
    },
    Submit() {
      this.isDisabled = true;
      let form = new FormData();
      form.append("store_name", this.storeName);
      form.append("kode_provinsi", this.prov);
      form.append("kode_kota", this.kota);
      form.append("kode_kecamatan", this.kec);
      form.append("kode_desa", this.desa);
      form.append("kode_pos", this.kodepos);
      form.append("address", this.address);
      form.append("description", this.description);
      form.append("contact", this.rawPhone.formattedNumber);
      this.axios
        .post("/store", form)
        .then((response) => {
          this.check();
          this.$router.push("/profile");
        })
        .catch((err) => {
          this.isDisabled = false;
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
  },
  mounted() {
    this.key = this.key = localStorage.getItem("Authorization");
    this.check();
    this.selectProv();
  },
};
</script>
<style scoped>
.form-group label {
  color: rgba(0, 0, 0, 0.425);
}
</style>