<template>
  <div class="container-fluid pt-5 mt-5">
    <p class="mx-auto text-center py-2 my-2 font-weight-light text-muted" style="display:block"><span class="font-weight-bold text-dark">Data Diri</span> - Alamat - Verifikasi Email - Selesai</p>
    <div class="row px-4">
      <div class="card p-5   mx-auto my-auto">
        <div class=" from-group">
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
        <button class="btn-primary m-3" v-on:click="Register">ok</button>
        <div class="alert text-center" :class="alertType" role="alert">
         {{alertText}}
        </div>
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
    };
  },
  methods: {
    Register: function () {
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
            this.alert=true;
            this.alertType="alert-success";
            this.alertText="Register Berhasil"
            console.log(this.alertText);
            this.$router.push("/register/address");
        })
        .catch((err) => {
            if(err.response.status == 400){
                this.alert=true;
                this.alertType="alert-danger";
                let vald = err.response.data;
                this.alertText=vald[0];
            }else{
                this.alert=true;
                this.alertType="alert-danger";
                this.alertText="Register Gagal"
            }
            });
    },
  },
};
</script>