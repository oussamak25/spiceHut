<template>
  <f7-page name="home">
    <div class="contenedorPrincipal">
      <div>
        <img
          class="img-gorro"
          src="/assets/img/gorroCocina.png"
        >
      </div>
      <div class="texto">
        Food for
      </div>
      <div class="texto">
        Eveyone
      </div>

      <div>
        <img
          class="imgPersonas"
          src="/assets/img/imagenInicio.png"
        >
      </div>
      <div>
        <f7-button
          class="btnInicio"
          raised
          round
          @click="pressClick"
        >
          Get Starteed
        </f7-button>
      </div>
    </div>
  </f7-page>
</template>
<script>

export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  methods: {
    pressClick() {
      this.f7router.navigate('/login/');
    },
  },
};
</script>

<style lang="scss" scoped>
.contenedorPrincipal{
  display: flex;
  flex-direction: column;
  flex-wrap:wrap ;
  width: 100%;
  height: 100%;
  background:#FF4B3A ;
  .img-gorro{
    margin-top: 5vh;
    margin-left: 5vh;
    border-radius: 50%;
  }
  .texto{
    margin-left: 5vh;
    font-size:7vh ;
    color: white;
    font-family:Wacca  ;
  }
  .imgPersonas{
    width:100%;
    height: 100%;

  }
  .btnInicio{
    width: 75%;
    height: 7vh;
    font-weight: 500;
    margin: auto;
    background: white;
    color: #FF4B3A;
  }
}

</style>
