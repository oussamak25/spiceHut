<template>
  <div
    class="container"
    @click="$emit('focus', presed)"
  >
    <input
      id="input-busqueda"
      type="text"
      :placeholder="placeholder"
      @input="valorCampo = $event.target.value"
    >
    <div
      id="btn-buscar"
      class="container__img"
      @click="$emit('buscar', valorCampo )"
    >
      <img
        class="imagen"
        src="/assets/img/ic_search.png"
      >
    </div>
  </div>
</template>

<script>
/* barra de busqueda para buscar los platos que nosotros pongamos */
export default {
  props: {
    placeholder: { type: String, default: 'Search' },
  },
  data() {
    return {
      presed: true,
      valorCampo: 'sinBusqueda',
    };
  },

};
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: -2vh;

}
.container__img{
    height: 8vh;
    width: 7vh;
    background: #EFEEEE;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    border-bottom-right-radius: 5vh;
    border-top-right-radius: 5vh;
}
.container img{
    width:5vh;
    height:5vh;
    background: white;
    margin-right: 2vh;
}
.container input{
    height: 8vh;
    width: 100%;
    background: #EFEEEE;
    margin-right: 0px;
    border-bottom-left-radius: 5vh;
    border-top-left-radius: 5vh;
    padding-left: 3vh;
    font-size: 2.2vh;

}

</style>
