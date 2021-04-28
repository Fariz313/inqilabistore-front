<template>
  <div class="container-fluid">
    <div class="container">
      <h1 class="text-center">Ganti Foto Profile</h1>
    </div>
    <div class="row m-0 d-flex justify-content-center my-2">
      <form v-on:submit.prevent="submitPhoto">
        <label class="file">
          <input
            required
            ref="input"
            type="file"
            name="image"
            accept="image/*"
            @change="setImage"
            style="display: none"
          />
          <span class="file-custom"></span>
        </label>
        <a v-on:click="showFileChooser" class="btn btn-primary mx-2">Upload</a>
        <input
          type="submit"
          :disabled="!readedImage"
          class="btn btn-primary mx-2"
        />
      </form>
    </div>
    <div class="row m-0">
      <vue-cropper
        :minContainerHeight="50"
        :minContainerWidth="50"
        :zoomOnWheel="false"
        :minCropBoxWidth="50"
        ref="cropper"
        :aspect-ratio="1 / 1"
        :src="imgSrc"
        preview=".preview"
        class="crh mx-auto"
      />
    </div>
    <div class="row m-0">
      <div class="container">
        <div class="row m-0 pt-5">
          <div class="col-6 d-flex justify-content-end">
            <div class="preview rounded" />
          </div>
          <div class="col-6 d-flex justify-content-start">
            <div class="preview rounded-circle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  components: { VueCropper },
  props:{
    photo:String
  },
  data() {
    return {
      imgSrc: "" || this.photo,
      cropImg: "",
      data: null,
      readedImage: false,
      photoLink:process.env.VUE_APP_ROOT_STORAGE+'photo_image/',
    };
  },
  methods: {
    submitPhoto() {
      this.cropImage();
      let form = new FormData();
      form.append("photo", this.cropImg);
      this.axios
        .post("/photo", form)
        .then((response) => {
          alert("Photo Berhasil Diupdate");
        })
        .catch((err) => {
          alert("Photo Gagal Diupdate");
        });
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      console.log(this.cropImg);
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute("data-scale", scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute("data-scale", scale);
    },
    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setCropBoxData() {
      if (!this.data) return;
      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
      if (!this.data) return;
      this.$refs.cropper.setData(JSON.parse(this.data));
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
        this.readedImage = true;
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
  },
};
</script>
<style lang="scss">
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.crh {
  max-height: 500px;
  max-width: 100%;
}
.cropper-area {
  width: 614px;
}
.actions {
  margin-top: 1rem;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062cc;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
.preview-area {
  width: 307px;
}
.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}
.preview-area p:last-of-type {
  margin-top: 1rem;
}
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image img {
  max-width: 100%;
}
</style>