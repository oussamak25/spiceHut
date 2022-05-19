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
              @click="ComeBack"
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

    <!-- container para la direccion de envio -->
    <div
      v-if="doorDelivery"
      class="container-direccion"
    >
      Payment method
      <div class="container-direccion_items">
        <div class="item-nombre">
          <div>
            Nombre Cliente
          </div>
        </div>
        <div class="item-direccion border-top">
          <div>
            <textarea
              class="textarea"
              placeholder="Dirección del pedido"
            />
          </div>
        </div>
        <div class="item-tel border-top">
          <div>
            <input
              class="input"
              type="number"
              placeholder="Número de contacto"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- container patment method -->

    <div
      v-if="mostrarMetodosPago"
      class="container-pay"
    >
      Payment method
      <div class="container-pay_items">
        <div class="item">
          <div>
            <f7-radio
              color="red"
              class="radio"
              :checked="cardSelected"
              @change="PressCard"
            />
          </div>
          <div>
            <img
              class="img"
              src="@/assets/img/tarjeta.png"
            >
            Bank account
          </div>
        </div>
        <div class="item border-top">
          <div>
            <f7-radio
              color="red"
              class="radio"
              :checked="bankSelected"

              @change="PressBank"
            />
          </div>
          <div>
            <img
              class="img"
              src="@/assets/img/billete.png"
            >
            Cash on delivery
          </div>
        </div>
      </div>
    </div>

    <!-- container delivery method -->
    <div class="container-delivery">
      Delivery method
      <div
        class="container-delivery_items"
        :class="{'disabled': pagoSelected}"
      >
        <div class="item">
          <div>
            <f7-radio
              color="red"
              class="radio"
              :checked="doorDelivery"
              @click="PressDoorDelivery"
            />
          </div>
          <div class="text">
            Door delivery
          </div>
        </div>
        <div class="item border-top">
          <div>
            <f7-radio
              color="red"
              class="radio"
              :checked="pickUp"
              @click="PressPickUp"
            />
          </div>
          <div class="text">
            Pick up
          </div>
        </div>
      </div>
    </div>

    <div class="fila-total">
      <div class="col-iz">
        Total
      </div>

      <div class="col-de">
        35,50€
      </div>
    </div>

    <f7-button
      class="btn-proceed"
      raised
      round
      @click="ProceedDelivery"
    >
      Proceed
    </f7-button>

    <!-- popup confirmacion -->

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
            35,00€
          </div>
        </div>

        <div class="footer-popup">
          <div>
            <f7-button
              class="btn-cancel"
              round
              @click="CancelPopup"
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
export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      mostrarMetodosPago: true,
      pagoSelected: true,
      cardSelected: null,
      bankSelected: null,
      doorDelivery: null,
      pickUp: null,
      popupOpened: false,
    };
  },
  methods: {
    ProceedDelivery() {
      this.popupOpened = true;
    },
    PressCard() {
      this.pagoSelected = false;
      this.cardSelected = true;
      this.bankSelected = false;
    },
    PressBank() {
      this.pagoSelected = false;
      this.cardSelected = false;
      this.bankSelected = true;
    },
    PressDoorDelivery() {
      this.mostrarMetodosPago = false;
      this.doorDelivery = true;
      this.pickUp = false;
    },
    PressPickUp() {
      this.mostrarMetodosPago = true;
      this.doorDelivery = false;
      this.pickUp = true;
    },
    ComeBack() {
      this.f7router.navigate('/frCarrito/');
    },
    CancelPopup() {
      this.popupOpened = false;
    },
    ConfirmarPopup() {
      this.popupOpened = false;
      this.f7router.navigate('/frPrincipal/');
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
    margin-top: 6vh;
    margin-left: 5vh;
    background: #FF4B3A;
    color: white;
}

.container-direccion{
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
        .border-top{
          border-top: 0.2vh solid #B3B3B3;
          margin-right: 3vh;
        }
        .item-nombre{
          margin-left: 4vh;
          margin-top: 3vh;
          font-family:Mela Pro;
          font-weight: 500;
          font-size: 2.2vh;
        }
        .item-direccion{
          margin-left: 4vh;
          margin-top: 1.5vh;
        }
        .item-tel{
          margin-left: 4vh;
          margin-top: 2vh;
        }

    }
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
        .border-top{
          border-top: 0.2vh solid #B3B3B3;
          margin-right: 2vh;
        }
        .item{
            margin-left: 2vh;
            display: flex;
            flex-direction: row;
            align-content: center;

            .img{
                width: 7vh;
                margin-top: 2vh;
                vertical-align: middle;
                margin-bottom: 2vh;
            }

            .radio{
                margin-left: 2vh;
                margin-right: 2vh;
                margin-top: 4vh;
            }

        }

    }
}

.container-delivery{
    margin-left: 6vh;
    margin-top: 5vh;

    &_items{
        width: 36vh;
        height: 18vh;
        margin-top: 1vh;
        border-radius: 5vh;
        background: white;
        display: flex;
        flex-direction: column;
        .border-top{
          border-top: 0.2vh solid #B3B3B3;
          margin-right: 2vh;
        }
        .item{
            margin-left: 2vh;
            display: flex;
            flex-direction: row;
            align-content: center;
            .text{
              margin-top: 3.8vh;
              margin-bottom: 2.5vh;
            }

            .radio{
                margin-left: 2vh;
                margin-right: 2vh;
                margin-top: 4vh;
            }

        }

    }
}

.fila-total{
  display: flex;
  flex-direction: row;
  margin-top: 4vh;

}
.col-iz{
  margin-left: 6vh;
  font-family:Mela Pro;
  font-size: 2.7vh;
}

.col-de{
  margin-left: 23vh;
  font-family:Mela Pro;
  font-size: 2.7vh;
}
.textarea{
  width: 29vh;
  height: 7vh;
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
.disabled{
  opacity: 0.6;
  pointer-events: none;
}

//popup
.head-popup{
  height: 10vh;
  background: #F6F6F9;
  .head-text{
    margin-top: 3vh;
    margin-left: 5vh;
    font-family:Mela Pro;
    font-size: 3vh;
    font-weight: 600;
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
