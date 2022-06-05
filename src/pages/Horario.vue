<template>
  <f7-page
    name="horario"
    class="container"
  >
    <f7-navbar
      title="Schedule"
      back-link="Back"
    />
    <div class="container-horario">
      <div class="title">
        Spice Hut
      </div>
      <div class="text">
        TEL: 602198970
      </div>
      <div class="text">
        Spicehut97@gmail.com
      </div>
      <div class="text">
        Adress:  Avda, Playa serena,230 Roquetas de mar
      </div>
      <div class="title2">
        HOURS
      </div>
      <div class="text">
        TUE-SUN--------12AM-11PM
      </div>
      <div class="text">
        MON------------CLOSED
      </div>
      <div />
    </div>
  </f7-page>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
    .container{
        background: #F6F6F9;
    }
    .container-horario{
        font-family: Jonesy;
        margin-top: 25%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;

    }
    .title{
        font-size: 6vh;
        margin-bottom: 5vh;
        font-weight: 600;
    }
    .title2{
        font-size: 5vh;
        font-weight: 600;
        margin-top: 3vh;
    }

    .text{
        text-align: center;
        font-size: 2.8vh;
        margin-top: 1vh;
        font-weight: 600;
    }

</style>
