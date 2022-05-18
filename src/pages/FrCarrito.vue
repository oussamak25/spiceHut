<template>
  <f7-page
    name="carrito"
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
          width="60"
        >
          <div class="texto-nav">
            Cart
          </div>
        </f7-col>
      </f7-row>
    </div>

    <!-- container para contener los platos pedidos -->
    <div class="container-pedido">
      <div class="container-pedido_item">
        <div class="container-pedido_item-img">
          <img src="@/assets/img/ic_plato.png">
        </div>
        <div class="container-pedido_item-info">
          <div class="nombre">
            Veggie tomato mix
          </div>
          <div class="precio">
            35,00€
          </div>
        </div>
        <div class="container-pedido_item-increment">
          <div class="icon">
            <f7-icon
              f7="xmark"
              size="30px"
              color="black"
            />
          </div>
          <div class="container-increment">
            <div class="restar">
              -
            </div>
            <div class="valor">
              0
            </div>
            <div class="sumar">
              +
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
        <f7-button
        class="btn-order"
        raised
        round
        @click="VerificacionIdentidad"
      >
        Complete Order
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
    font-weight: 500;
    margin-left: 2vh;
}

.container-pedido{
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 70%;
    .container-pedido_item{
         width: 45vh;
        margin-top: 5vh;
        margin-left: 2vh;
        border-radius: 15vh;
        background: white;
        display: flex;
        flex-direction: row;

        &-img img{
            width: 15vh;
            height: 15vh;
        }

        &-info{
            display: flex;
            flex-direction: column;
            margin-top: 3vh;
            .nombre{
                font-family:Mela Pro  ;
                font-size: 2.5vh;
                font-weight: 500;
            }
            .precio{
                font-family:Mela Pro  ;
                font-size: 2.5vh;
                color:#FF4B3A ;
            }

        }

        &-increment{

            display: flex;
            flex-direction: column;

            .icon{
                text-align: right;
                margin-right: 3vh;
                margin-top: 1vh;
            }
            .container-increment{
                display: flex;
                flex-direction: row;
                border-radius: 15vh;
                font-size: 3vh;
                background: red;
                color: white;
                width: 13vh;
                height: 4vh;
                margin-top: 3vh;
                margin-right: 3vh;
                .restar{
                    text-align: center;
                    border-right: 1px solid black;
                    width: 13vh;
                    height: 4vh;
                    border-top-left-radius: 15vh;
                    border-bottom-left-radius: 15vh ;

                }
                .valor{
                    text-align: center;
                    width: 13vh;
                    height: 4vh;
                }
                .sumar{
                    text-align: center;
                    border-left: 1px solid black;
                    width: 13vh;
                    height: 4vh;
                    border-top-right-radius: 15vh;
                    border-bottom-right-radius: 15vh ;
                }

            }

        }
    }

}
    .btn-order{
        width: 75%;
        height: 7vh;
        font-weight: 500;
        margin-top: 5vh;
        margin-left: 5vh;
        background: #FF4B3A;
        color: white;
    }

</style>
