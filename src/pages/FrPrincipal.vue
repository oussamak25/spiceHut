<template>
  <f7-page
    name="FrPrincipal"
    class="container-page"
  >
    <!-- nav bar panel derecho y carrito compra -->

    <div class="padding margin">
      <f7-row>
        <f7-col class="display-flex flex-direction-row">
          <f7-link
            panel-open="right"
          >
            <f7-icon
              f7="list_bullet"
              size="30px"
              color="black"
            />
          </f7-link>
        </f7-col>
        <f7-col class="display-flex flex-direction-row-reverse">
          <f7-link

            panel-open="right"
          >
            <f7-icon
              f7="cart"
              size="30px"
              color="black"
            />
          </f7-link>
        </f7-col>
      </f7-row>
    </div>

    <div class="padding margin">
      <f7-row class="text">
        Delicious
      </f7-row>
      <f7-row class="text">
        food for you
      </f7-row>
    </div>
  </f7-page>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>

.container-page{
    background: #F2F2F2;

}

.text{
    margin-top: -1vh;
    font-family:Mela Pro  ;
    font-weight: 600;
    font-size: 4vh;
    
}

</style>
