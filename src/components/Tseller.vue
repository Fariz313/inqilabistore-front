<template>
  <div class="row">
    <div v-for="index in 4" :key="index" class="col-3 p-2">
      <div>
        <img
          class="card-img-top"
          src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
          alt="Card image cap"
        />
        <div class="card-body">
          <p class="card-title judul-buku">Buku Sejarah Islam</p>
          <p class="card-text">
            <b>Rp. 50 000</b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>