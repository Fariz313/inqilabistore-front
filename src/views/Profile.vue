<template>
  <div class="container-fluid" style="padding-top: 93px">
    <div class="row py-5 px-4">
      <div class="col-xl-8 col-md-8 col-sm-10 mx-auto">
        <!-- Profile widget -->
        <div class="bg-white shadow rounded overflow-hidden">
          <div class="p-4 bg-prim">
            <div class="media align-items-end profile-header">
              <div class="profile mr-3">
                <div class="photoProfile" v-bind:style="pProfile"></div>
                <a
                  v-on:click="editMode = !editMode"
                  class="btn btn-dark btn-sm btn-block"
                  >Edit profile</a
                >
              </div>
              <div class="media-body mb-5 text-white">
                <h2 class="mt-0 mb-0">{{ user.name }}</h2>
                <p class="small mb-0">{{ user.uname }}</p>
                <p class="small mb-0">
                  {{ user.email }}
                  <span :class="verifStatus" class="badge">{{
                    verifStatusText
                  }}</span>
                </p>
                <router-link to="/register/store"><p class="small mb-2"><span class="badge badge-warning">Buat Toko</span></p></router-link>
              </div>
            </div>
          </div>
          <div class="px-4 d-flex flex-column bd-highlight bg-light">
            <form v-on:submit.prevent="submituser">
              <div class="form-group form-profile mb-0 pt-2">
                <div v-if="editMode">
                  <label class="mb-0">Name</label>
                  <input
                    type="text"
                    class="form-control hide-input"
                    v-model="name"
                    :disabled="!editMode"
                  />
                  <label class="mb-0">User Name</label>
                  <input
                    type="text"
                    class="form-control hide-input"
                    v-model="uname"
                    :disabled="!editMode"
                  />
                  <label class="mb-0">Birthday</label>
                  <input
                    type="date"
                    class="form-control hide-input"
                    v-model="birthdate"
                    :disabled="!editMode"
                  />
                  <label class="mb-0">Gender</label>
                  <select v-model="gender" class="form-control hide-input">
                    <option value="m" default>Laki-Laki</option>
                    <option value="f">Perempuan</option>
                  </select>
                </div>
                <label class="mb-0">Phone</label>
                <input
                  type="text"
                  class="form-control hide-input"
                  v-model="phone"
                  :disabled="!editMode"
                />
                <div v-if="editMode">
                  <button type="submit" class="btn btn-success">Sumbit</button>
                  <button
                    class="btn btn-danger ml-2"
                    v-on:click="editMode = !editMode"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
            <div class="form-group form-profile pt-2">
              <label class="mb-0">Address</label>
              <ul class="w-100 px-0 pb-0 mb-0 pt-3">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 5%">#</th>
                      <th scope="col" style="width: 20%">Daerah</th>
                      <th scope="col" style="width: 15%">Kode Pos</th>
                      <th scope="col" style="width: 30%">Almat</th>
                      <th scope="col" style="width: 20%">Catatan</th>
                      <th scope="col" style="width: 5%"></th>
                      <th scope="col" style="width: 5%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in user.address" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>
                        {{ wilayah[item.kode_provinsi]["name"] }},
                        {{
                          wilayah[item.kode_provinsi]["regencies"][
                            item.kode_kota
                          ]["name"]
                        }},
                        {{
                          wilayah[item.kode_provinsi]["regencies"][
                            item.kode_kota
                          ]["districts"][item.kode_kecamatan]["name"]
                        }},
                        {{
                          wilayah[item.kode_provinsi]["regencies"][
                            item.kode_kota
                          ]["districts"][item.kode_kecamatan]["villages"][
                            item.kode_desa
                          ]["name"]
                        }}
                      </td>
                      <td>{{ item.kode_pos }}</td>
                      <td>{{ item.alamat }}</td>
                      <td>{{ item.catatan }}</td>
                      <td><button class="btn btn-warning">EDIT</button></td>
                      <td><button class="btn btn-danger">HAPUS</button></td>
                    </tr>
                  </tbody>
                </table>
              </ul>
              <button v-on:click="AddAddress" class="btn btn-success p-1">
                Add
              </button>
              <div
                v-if="isAddAddress"
                class="d-flex flex-column mx-auto from-group p-5"
              >
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
                <button
                  class="btn btn-primary m-1 w-100 mx-auto"
                  v-on:click="submitAddress"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- End profile widget -->
      </div>
    </div>
  </div>
</template>
<script>
import region from "./../../indonesia-region.min.json";

export default {
  data() {
    return {
      key: "",
      user: [],
      photoProfile:
        "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop",
      isEmailVerified: false,
      userAddress: [],
      isAddAddress: false,
      editMode: false,
      //------------------------
      name: "",
      uname: "",
      birthdate: "",
      gender: "",
      phone: "",
      //------------------------
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
      //---------------
    };
  },
  computed: {
    verifStatus() {
      return {
        "btn-success": this.isEmailVerified,
        "btn-danger": !this.isEmailVerified,
      };
    },
    verifStatusText() {
      if (this.isEmailVerified) {
        return "Verified";
      } else {
        return "Unverified";
      }
    },
    pProfile() {
      return {
        "background-image": "url(" + this.photoProfile + ")",
      };
    },
  },
  methods: {
    getData() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("login/checkfull", conf)
        .then((response) => {
          this.user = response.data.user;
          this.userAddress = this.user.address;
          this.name = this.user.name;
          this.uname = this.user.uname;
          this.birthdate = this.user.birthdate;
          this.gender = this.user.gender;
          this.phone = this.user.phone_number;
          console.log(this.userAddress);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tes() {
      var elmnt = document.getElementById("selprov");
      elmnt.scrollIntoView();
    },
    AddAddress() {
      if (this.isAddAddress == false) {
        this.selectProv();
        this.isAddAddress = true;
      } else {
        this.isAddAddress = false;
      }
    },
    submituser() {
      let key = localStorage.getItem("Authorization");
      let conf = { headers: { Authorization: "Bearer " + key } };
      let form = new FormData();
      if (this.name !== this.user.name) {
        form.append("name", this.name);
      }
      if (this.uname !== this.user.uname) {
        form.append("uname", this.uname);
      }
      if (this.birthdate !== this.user.birthdate) {
        form.append("birthdate", this.birthdate);
      }
      if (this.phone_number !== this.user.phone) {
        form.append("phone_number", this.phone_number);
      }
      if (this.gender !== this.user.gender) {
        form.append("gender", this.gender);
      }
      //   form.append("kode_provinsi", this.prov);
      //   form.append("kode_kota", this.kota);
      //   form.append("kode_kecamatan", this.kec);
      //   form.append("kode_desa", this.desa);
      //   form.append("kode_pos", this.kodepos);
      //   form.append("alamat", this.alamat);
      //   form.append("catatan", this.catatan);
      this.axios
        .post("/user/edit", form, conf)
        .then((response) => {
          this.getData();
          this.editMode=false
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitAddress() {
      // let key = localStorage("Authorization");
      // let conf = { headers: { Authorization: "Bearer " + key } };
      let form = new FormData();
      form.append("kode_provinsi", this.prov);
      form.append("kode_kota", this.kota);
      form.append("kode_kecamatan", this.kec);
      form.append("kode_desa", this.desa);
      form.append("kode_pos", this.kodepos);
      form.append("alamat", this.alamat);
      form.append("catatan", this.catatan);
      this.axios
        .post("/register/address", form)
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
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.key;
    this.getData();
  },
};
</script>
<style scoped>
.hide-input {
  -webkit-appearance: none;
  border: none;
  padding: 0;
}
.hide-input:disabled {
  background: transparent;
}
.form-profile {
  font-size: 1rem;
}
.table {
  font-size: 0.9rem;
}
.photoProfile {
  margin: 2px;
  border-radius: 5px;
  height: 130px;
  width: 130px;
  background-color: gray;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
table{
    min-width: none;
}
</style>