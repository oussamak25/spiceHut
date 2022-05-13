<template>
  <div
    class="container"
    @click="$emit('focus', presed)"
  >
    <input
      type="text"
      :placeholder="placeholder"
    >
    <div class="container__img">
      <img class="imagen" src="/assets/img/ic_search.png">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: { type: String, default: 'Search' },
  },
  data() {
    return {
      presed: true,
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
    height: 55px;
    width: 47px;
    background: #EFEEEE;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    border-bottom-right-radius: 50%;
    border-top-right-radius: 50%;
}
.container img{
    width:35px;
    height:35px;
    background: white;
    margin-right: 2vh;
}
.container input{
    height: 55px;
    width: 100%;
    background: #EFEEEE;
    margin-right: 0px;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
    padding-left: 3vh;
    

}

</style>
