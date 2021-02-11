<template>
  <div class="wrappercar py-3">
    <div
      id="caruoselBanner"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#caruoselBanner"
          :data-slide-to="index"
          :class="{ active: index === 0 }"
          v-for="(item, index) in imgs"
          :key="index"
        ></li>
      </ol>
      <div class="carousel-inner">
        <div
          v-for="(item, index) in imgs"
          v-bind:key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
          :ref="index"
        >
          <div 
            class="bg-item"
            :style="{backgroundImage: 'url('+item+')'} "></div>
          <img  height="300px" class="d-block carimg" :src="item" alt="First slide" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#caruoselBanner"
        role="button"
        data-slide="prev"
      >
        <i class="fas fa-chevron-circle-left" style="font-size:30px"></i>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#caruoselBanner"
        role="button"
        data-slide="next"
      >
        <i class="fas fa-chevron-circle-right" style="font-size:30px"></i>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgs: ["/banner/1.png", "/banner/2.png", "/banner/3.png"],
      colors: [],
    };
  },
  methods: {},
  mounted() {
  },
};
</script>
<style>
.wrappercar {
  padding: 0;
}
.carousel-item {
  padding: 0;
}
.carousel-inner .carimg {
  margin: auto;
  border-radius: 10px;
  margin-top: 50px;
  margin-bottom: 50px;
  -webkit-box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.75);
  width: 80vw;
  height: auto;
}
.bg-item{
  height: 100%;
  width: 100%;
  background-color: black;
  position: absolute;
  background-repeat: no-repeat ;
  background-size: 100% 100%;
  background-position: center;
  filter: blur(5px);
  z-index: -1;
}
.carousel-indicators li{
  width: 10px !important;
  height: 10px !important;
  border-radius: 100%;
}
</style>