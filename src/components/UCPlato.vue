<template>
  <div class="container">
    <div class="plato">
      <img
        :src="img"
      >
    </div>
    <div class="info">
      <div class="item-precio">
        {{ precio }}
      </div>
      <div class="item">
        {{ nombre }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: { type: String, default: null },
    nombre: { type: String, default: '' },
    precio: { type: String, default: '' },

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
