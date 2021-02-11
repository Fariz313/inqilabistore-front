<template>
  <div>
    <h4 class="card-title">Detail</h4>
    <div class="m-0">
      <h5>Deskripsi Toko</h5>
      <p>{{ store.description }}</p>
      <hr />
      <h5>Alamat Toko</h5>
      <div class="alamat">
        <h6 class="mb-0">{{wilayah[store.kode_provinsi].regencies[store.kode_kota].name}}, {{wilayah[store.kode_provinsi].name}}</h6>
        <p><span class="font-weight-light">Desa/Kelurahan :</span> {{wilayah[store.kode_provinsi].regencies[store.kode_kota].districts[store.kode_desa].villages[store.kode_desa].name}} ,<span class="font-weight-light">Kecamatan :</span>{{wilayah[store.kode_provinsi].regencies[store.kode_kota].districts[store.kode_desa].name}}</p>
        <p class="mb-3">{{store.address}}</p>
        <p class="font-weight-light" >Kontak</p>
        <p>{{store.contact}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import region from "./../../../../indonesia-region.min.json";
export default {
  props: {
    store: Object, // or any other constructor
  },
  data() {
    return {
      wilayah: region
    };
  },
  mounted() {
    console.log(this.store);
  },
};
</script>
<style scoped>
</style>