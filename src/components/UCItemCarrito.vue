<template>
  <div
    class="container-pedido"
    :class="{'disabled': desactivar}"
  >
    <div
      class="container-pedido_item"
    >
      <div class="container-pedido_item-img">
        <img :src="plato.img">
      </div>
      <div class="container-pedido_item-info">
        <div class="nombre">
          {{ plato.nombre }}
        </div>
        <div class="precio">
          {{ plato.precio }}€
        </div>
      </div>
      <div class="container-pedido_item-increment">
        <div class="icon">
          <f7-icon
            f7="xmark"
            size="30px"
            color="black"
            @click="DeleteItem(plato)"
          />
        </div>
        <div class="container-increment">
          <div
            class="restar"
            @click="Decrement(plato)"
          >
            -
          </div>
          <div class="valor">
            {{ plato.cantidad }}
          </div>
          <div
            class="sumar"
            @click="Increment(plato)"
          >
            +
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    plato: Object,
    desactivar: { type: Boolean, default: false },
    f7route: Object,
    f7router: Object,

  },
  computed: {
    ...mapState(['actualOrder']),

  },
  methods: {
    ...mapActions(['delActualOrder', 'addCantidadOrder']),
    DeleteItem(plato) {
      this.delActualOrder(plato);
      if (this.actualOrder.length === 0) {
        this.$emit('principal');
      }
    },
    CompleteOrder() {
      this.f7router.navigate('/frDelivery/');
    },
    Increment(plato) {
      if (plato.cantidad < 20) {
        plato.cantidad += 1;
      }
    },
    Decrement(plato) {
      if (plato.cantidad > 1) {
        plato.cantidad -= 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
                margin-left: 2vh;
                margin-top: 3vh;
                margin-right: 5vh;
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
.disabled{
  opacity: 0.1;
  pointer-events: none;
}
</style>
