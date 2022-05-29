<template>
  <div class="container">
    <div class="plato">
      <img
        :src="imagen"
      >
    </div>
    <div class="info">
      <div class="item-precio">
        {{ precio }}€
      </div>
      <div class="item">
        {{ nombre }}
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default {
  props: {
    img: { type: String, default: null },
    nombre: { type: String, default: '' },
    precio: { type: String, default: '' },

  },
  data() {
    return {
      imagen: null,
    };
  },
  watch: {

    img(val) {
      const storage = getStorage();
      getDownloadURL(ref(storage, `${this.img}`))
        .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
          console.log(url);
          this.imagen = url;
        })
        .catch((error) => {
        // Handle any errors
        });
    },
  },

  created() {
    const storage = getStorage();
    getDownloadURL(ref(storage, `${this.img}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log(url);
        this.imagen = url;
      })
      .catch((error) => {
        // Handle any errors
      });
  },

};
</script>

<style lang="scss" scoped>
.container{
    background: #F6F6F9;
    width: 27vh;
    text-align: center;

    .plato{
        margin-bottom: -17vh;
        img{
            width: 26vh;

        }
    }

    .info{
        display: flex;
        flex-direction: column-reverse;
        background: white;
        width: 27vh;
        height: 32vh;
        font-family:Mela Pro  ;
        font-size: 3.8vh;
        border-radius: 4vh;

        .item{
            font-size: 3vh;
            position: relative;
            bottom: 0;
        }
        .item-precio{
            font-family:Mela Pro  ;
            font-size: 2.5vh;
            color:#FF4B3A ;
            padding-bottom: 6vh;

        }
    }

}

</style>
