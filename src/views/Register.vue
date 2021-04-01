<template>
  <div class="container-fluid pt-5 mt-5">
    <p
      class="mx-auto text-center py-2 my-2 font-weight-light text-muted"
      style="display: block"
    >
      <span class="font-weight-bold text-dark">Data Diri</span> - Alamat -
      Verifikasi Email - Selesai
    </p>
    <div class="row px-4">
      <div class="card p-3 w-75 mx-auto my-auto">
        <!-- <div class=" from-group">
            <table>
          <tr>
            <td><label>Nama Lengkap</label></td>
            <td><input class="form-control" type="text" v-model="name" /></td>
          </tr>
          <tr>
            <td><label>Username</label></td>
            <td><input class="form-control" type="text" v-model="uname" /></td>
          </tr>
          <tr>
            <td><label>Email</label></td>
            <td><input class="form-control" type="email" v-model="email" /></td>
          </tr>
          <tr>
            <td><label>Password</label></td>
            <td><input class="form-control" type="password" v-model="password" /></td>
          </tr>
          <tr>
            <td><label>Ulangi Password</label></td>
            <td><input class="form-control" type="password" v-model="password_confirmation" /></td>
          </tr>
          <tr>
            <td><label>Tanggal Lahir</label></td>
            <td>
              <input type="date" v-model="birth_date" name="" id="">
            </td>
          </tr>
          <tr>
            <td><label>Jenis Kelamin</label></td>
            <td>
              <select v-model="gender">
                <option value="m" default>Laki-Laki</option>
                <option value="f">Perempuan</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label>Nomor Telepon</label></td>
            <td><input class="form-control" type="text" v-model="phone" /></td>
          </tr>
            </table>
        </div>
        <button class="btn btn-primary m-3" v-on:click="Register">ok</button>
        <div class="alert text-center" :class="alertType" role="alert">
         {{alertText}}
        </div> -->
        <form v-on:submit.prevent="Register">
          <div class="form-group">
            <label for="inputingName">Nama Lengkap</label>
            <input
              type="text"
              class="form-control"
              id="inputingName"
              placeholder="Masukan Nama Lengkap Anda"
              v-model="name"
              required
            />
          </div>
          <div class="form-group">
            <label for="inputingUsername">Username</label>
            <input
              type="text"
              class="form-control"
              id="inputingUsername"
              placeholder="Masukan Username Anda"
              v-model="uname"
              required

            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Alamat Email</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Masukan Alamat Email Anda !"
              v-model="email"
              required

            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              v-model="password"
              required

            />
          </div>
          <div class="form-group">
            <label for="exampleInputPasswordCon">Ulangi Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPasswordCon"
              placeholder="Ulangi Password"
              v-model="password_confirmation"
              required


            />
          </div>
          <div class="form-group">
            <label for="birthDate">Tanggal Lahir</label>
            <input
              type="date"
              class="form-control"
              id="birthDate"
              v-model="birth_date"
              required

            />
          </div>
          <div class="form-group">
            <label for="birthDate">Jenis Kelamin</label>
            <select class="form-control" required v-model="gender">
                <option value="m" default>Laki-Laki</option>
                <option value="f">Perempuan</option>
              </select>
          </div>
          <div class="form-group">
              <label for="">Nomor Telepon</label>
              <VuePhoneNumberInput v-model="yourValue" />
          </div>
          <button type="submit" :disabled="disabledSubmit" class="btn btn-primary">Daftar Sekarang</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      uname: "",
      email: "",
      password: "",
      password_confirmation: "",
      gender: "",
      phone: "",
      alert: false,
      alertType: "",
      birth_date:"",
      disabledSubmit:false,
    };
  },
  methods: {
    Register: function () {
      this.disabledSubmit = true;
      let name = this.name;
      let uname = this.uname;
      let email = this.email;
      let password = this.password;
      let password_confirmation = this.password_confirmation;
      let gender = this.gender;
      let phone_number = this.phone;
      let birthdate = this.birth_date;
      this.$store
        .dispatch("register", {
          name,
          uname,
          email,
          password,
          password_confirmation,
          birthdate,
          gender,
          phone_number,
        })
        .then((response) => {
          this.alert = true;
          this.alertType = "alert-success";
          this.alertText = "Register Berhasil";
          console.log(this.alertText);
          this.$router.push("/register/address");
        })
        .catch((err) => {
          this.disabledSubmit = false;
          if (err.response.status == 400) {
            this.alert = true;
            this.alertType = "alert-danger";
            let vald = err.response.data;
            this.alertText = vald[0];
            this.disabledSubmit = false;
          } else {
            this.alert = true;
            this.alertType = "alert-danger";
            this.alertText = "Register Gagal";
            this.disabledSubmit = false;
          }
        });
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    }
  },
    mounted(){
      this.disabledSubmit = false;
    }
};
</script>