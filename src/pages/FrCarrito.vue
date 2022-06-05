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
              @click="ComeBack"
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
      <div
        v-for="(plato, i) in actualOrder"
        :key="i"
        class="container-pedido_item"
      >
        <UCItemCarritoVue
          :plato="plato"
          @principal="ComeBack"
        />
      </div>
    </div>
    <div>
      <f7-button
        class="btn-order"
        raised
        round
        @click="CompleteOrder"
      >
        Complete Order
      </f7-button>
    </div>
    <f7-popup
      class="pop-up-confirm"
      close-by-backdrop-click="true"
      :opened="popupOpened"
      @popup:closed="popupOpened = false"
    >
      <f7-page>
        <div class="head-popup">
          <f7-row>
            <f7-col width="80">
              <div class="head-text">
                To confirm order
              </div>
            </f7-col>
          </f7-row>
        </div>
        <div class="direccion">
          <div class="titulo">
            Address
          </div>
          <div class="valor">
            Valor de la direccion cuando la tengamos
          </div>
        </div>

        <div class="total-pedido">
          <div class="titulo">
            Total to pay
          </div>
          <div class="precio">
            {{ total }}€
          </div>
        </div>

        <div class="footer-popup">
          <div>
            <f7-button
              class="btn-cancel"
              round
              @click="popupOpened = false"
            >
              Cancel
            </f7-button>
          </div>
          <div>
            <f7-button
              class="btn-confirmar"
              raised
              round
              @click="ConfirmarPopup"
            >
              Proceed
            </f7-button>
          </div>
        </div>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UCItemCarritoVue from '@/components/UCItemCarrito.vue';

export default {
  components: {
    UCItemCarritoVue,
  },
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      popupOpened: false,

    };
  },
  computed: {
    ...mapState(['actualOrder']),

  },
  methods: {
    ...mapActions(['delActualOrder', 'addCantidadOrder']),
    ComeBack() {
      this.f7router.navigate('/frPrincipal/');
    },
    CompleteOrder() {
      this.f7router.navigate('/frDelivery/');
      this.popupOpened = true;
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

.head-text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #42526E;
  margin-top: 15px;
  margin-left: 15px;
}
.head-btn {
  width: 50px;
  height: 50px;
  float: right;
}
.pop-up-confirm{
  width:40vh;
  height:42vh;
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-18vh;
  margin-left:-20vh;
  border-radius: 5vh;

  .direccion{
    margin-top: 2vh;
    margin-left: 4vh;
    height: 13vh;
    .titulo{
      color: #b0b0b7;
      font-size: 2.5vh;
    }
    .valor{
      font-size: 2.2vh;

    }
  }

  .total-pedido{
    display: flex;
    flex-direction: row;
    height: 6vh;
    margin-top: 1vh;
    margin-left: 4vh;
    .titulo{
      color: #b0b0b7;
      font-size: 2.5vh;
    }
    .precio{
      font-size: 2.5vh;
      margin-left: 12vh;
      font-weight: 500;
      color: #FF4B3A;
    }
  }
}
.footer-popup{
  display: flex;
  flex-direction: row;
  margin-top: 2vh;

  .btn-cancel{
    width: 14vh;
    height: 7vh;
    border:1px solid white;
    font-weight: 500;
    background: white;
    color: #808080;
    margin-left: 1vh;
  }
  .btn-confirmar{
    width: 22vh;
    height: 7vh;
    font-weight: 500;
    background: #FF4B3A;
    color: white;
  }
}
</style>
