<template>
  <f7-page
    name="delivery"
    class="container-page"
  >
    <!-- nav  -->
    <div class="margin padding">
      <f7-row>
        <f7-col
          width="20"
          class="display-flex flex-direction-row"
        >
          <f7-link>
            <f7-icon
              f7="chevron_left"
              size="30px"
              color="black"
              @click="$emit('back')"
            />
          </f7-link>
        </f7-col>
        <f7-col
          width="65"
        >
          <div class="texto-nav">
            Checkout
          </div>
        </f7-col>
      </f7-row>
    </div>
    <!-- texto principal -->
    <div class="text-principal">
      Payment
    </div>

    <!-- container patment method -->

    <div class="container-pay">
      Payment method
      <div class="container-pay_items">
        <div class="item">
          <f7-radio
            class="radio"
            disabled="true"
          />

          <img
            class="img"
            src="@/assets/img/tarjeta.png"
          >
          Card
        </div>
        <div class="item">
          <f7-radio
            class="radio"
            disabled="true"
          />

          <img
            class="img"
            src="@/assets/img/billete.png"
          >
          Bank account
        </div>
      </div>
    </div>

    <!-- container delivery method -->
    <div class="container-delivery">
      Payment method
      <div class="container-delivery_items">
        <f7-row class="item">
          <f7-col>
            <f7-radio
              disabled="true"
            />
          </f7-col>
          <f7-col>
            Door delivey
          </f7-col>
        </f7-row>
        <f7-row class="item">
          <f7-col>
            <f7-radio
              disabled="true"
            />
          </f7-col>
          <f7-col>
            Pick up
          </f7-col>
        </f7-row>
      </div>
    </div>

    <div class="container-total margin">
      <f7-row>
        <f7-col>
          Total
        </f7-col>
        <f7-col class="text-align-right">
          56,30€
        </f7-col>
      </f7-row>
    </div>
    <!-- btn procedd -->
    <div>
      <f7-button
        class="btn-proceed"
        raised
        round
        @click="VerificacionIdentidad"
      >
        Proceed
      </f7-button>
    </div>
  </f7-page>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.container-page{
    background: #F6F6F9;
    width: 100%;
    height: 100%;
}

.texto-nav{
    font-family:Mela Pro  ;
    font-size: 2.5vh;
}

.text-principal{
    font-family:Mela Pro;
    font-size: 4vh;
    margin-left: 6vh;

}

.btn-proceed{
    width: 75%;
    height: 7vh;
    font-weight: 500;
    margin-top: 5vh;
    margin-left: 5vh;
    background: #FF4B3A;
    color: white;
}

.container-pay{
    margin-left: 6vh;
    margin-top: 5vh;

    &_items{
        width: 36vh;
        height: 22vh;
        margin-top: 1vh;
        border-radius: 5vh;
        background: white;
        display: flex;
        flex-direction: column;
        .item{
            border-top: 1px solid grey;
            margin-left: 2vh;
            display: flex;
            flex-direction: row;
            align-content: center;
            

            .img{
                width: 7vh;
                vertical-align:middle;
                margin-top: 4vh;

            }

            .radio{
                margin-left: 2vh;
                margin-top: 2vh;
            }

        }

    }
}

.container-delivery{
    margin-left: 6vh;
    margin-top: 5vh;

    &_items{
        width: 36vh;
        height: 22vh;
        margin-top: 1vh;
        border-radius: 5vh;
        background: white;
        .item{

        }

    }
}
</style>
