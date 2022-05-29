<template>
  <div class="sin-scroll">
    <!-- nav bar panel derecho y carrito compra -->

    <div class="padding margin">
      <f7-row>
        <f7-col class="display-flex flex-direction-row">
          <f7-link>
            <f7-icon
              f7="chevron_left"
              size="30px"
              color="black"
              @click="$emit('back')"
            />
          </f7-link>
        </f7-col>
      </f7-row>
    </div>
    <!-- plato fotos -->
    <div class="container-imagen">
      <img
        class="imagen"
        :src="imagen"
      >
    </div>

    <div class="nombre ">
      {{ nombre }}
    </div>
    <div class="precio">
      {{ precio }}€
    </div>

    <div class="container-info">
      Dish info
      <div class="info">
        {{ infoPlato }}
      </div>
      <div class="info">
        {{ infoPlatoEn }}
      </div>
    </div>

    <div>
      <f7-button
        class="btn-add"
        raised
        round
        @click="AddToCar"
      >
        Add to cart
      </f7-button>
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
    infoPlato: { type: String, default: '' },
    infoPlatoEn: { type: String, default: '' },
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
.sin-scroll{
    display: flex;
    flex-direction: column;
    overflow-x:hidden;
    overflow-y:hidden;
    background: #F6F6F9;
    width: 100%;
    height: 100%;
}
.container-imagen{
    width: 100%;
    text-align: center;
    margin-top: -3vh;

    .imagen{
        width: 40vh;
        height: 40vh;
    }
}

.nombre{
    text-align: center;
    font-family:Mela Pro  ;
    font-size: 4vh;
    font-weight: 700;
    margin-left: 4vh;
    margin-right: 4vh;
}
.precio{
    text-align: center;
    font-family:Mela Pro  ;
    font-size: 3.5vh;
    color:#FF4B3A ;
    font-weight: 600;
    margin-bottom: 4vh;
}
.container-info{
    font-family:Mela Pro  ;
    font-size: 3vh;
    margin-left: 4vh;
    margin-right: 4vh;
    font-weight: 400;
    text-align: center;
    .info{
        color: #7B7B7D;
        font-size: 2.3vh;
    }
}

.btn-add{
    position: fixed;
    bottom: 5vh;
    left: 0;
    right: 0;
    width: 75%;
    height: 7vh;
    margin: auto;
    background: #FF4B3A;
    color: white;
}

</style>
