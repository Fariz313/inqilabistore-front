<template>
  <div id="app">
    <router-view name="nav"/>
    <button id="element" class="btn btn-primary" type="button" style="position: absolute; top: 0; right: 0;" disabled>
      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      Loading...
    </button>
    <div class="container-fluid p-0">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
    $('#element').toast('show')
  }
}
</script>
<style lang="scss">
html {
  font-size: 0.5rem;
}
body{
  font-family: 'Poppins', sans-serif !important;
}
// @media (min-width: 576px) {
//   html {
//     font-size: 0.5rem;
//   }
// }

// @media (min-width: 768px) {
//   html {
//     font-size: 0.75rem;
//   }
// }

@media (min-width: 992px) {
  html {
    font-size: 1rem;
  }
}
.bg-prim{
  background-color: #4D9894 !important;
}
.bg-scon{
  background-color: #FF5904 !important;
}
.text-prim{
  color: #4D9894 !important;
}
.text-scon{
  color: #FF5904 !important;
}
.border-none{
  border: none !important;
}

.card-img-top{
  display: block;
  max-width:100%;
  max-height:130px;
  width: auto;
  height: auto;

}
</style>
