<template>
  <div class="container" style="height: 100vh">
    <div class="row h-100">
      <div class="col-md-6 d-flex justify-content-center">
        <div class="my-auto">
          <img src="Logo3.png" height="150px" />
        </div>
      </div>
      <div class="col-md-6 d-flex justify-content-center">
        <div class="card my-auto p-5">
          <div
            class="alert alert-dismissible fade show"
            v-if="showAlert"
            role="alert"
            :class="alertType"
          >
            {{alertMesage}}
            <button
              type="button"
              class="close"
              v-on:click="showAlert = !showAlert"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="Login">
            <div class="form-group">
              <label for="exampleInputEmail1" class="login-label"
                >Email address</label
              >
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="email"
                required
              />
              <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              >
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
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1"
                >Check me out</label
              >
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.login-card {
  min-height: 25vh;
}
.form-group {
  font-size: 1.5rem;
}
</style>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isAlertSuccess: false,
      alertStatus : '',
      alertMesage : '',
      showAlert : false,
    };
  },
  computed:{
  alertType(){
    return{
      'alert-success' : this.isAlertSuccess,
      'alert-danger'  : !this.isAlertSuccess,
    }
  },
  },
  methods: {
    Login: function () {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then((response) => {
          this.alertMesage = "Login Berhasil"
          this.isAlertSuccess = true;
          this.showAlert = true;
          console.log(this.isAlertSuccess);
          location.href = "/";

        })
        .catch((err) => {
          this.alertMesage = "Login Gagal";
          this.isAlertSuccess = false;
          this.showAlert = true;
        });
    },
  },
  mounted() {
    // console.log(this.$store.state.token);
  },
};
</script>
