<!-- formulario para la direccion y el envio  -->
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
            {{ userData.nombre }}   {{ userData.apellido }}
          </div>
        </div>
        <div class="item-direccion border-top">
          <div>
            <textarea
              class="textarea"
              placeholder="Dirección del pedido"
              :value="adress"
              @change="AdressChange($event.target.value)"
            />
          </div>
        </div>
        <div class="item-tel border-top">
          <div>
            <input
              class="input"
              type="number"
              :value="phone"
              placeholder="Número de contacto"
              @change="PhoneChange($event.target.value)"
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
              src="@/assets/img/billete.png"
            >
            Cash on delivery
          </div>
        </div>
        <!-- <div class="item border-top">
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
        </div>-->
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
        {{ total }}€
      </div>
    </div>
    <div
      v-if="mostrarError"
      class="btn"
    >
      Complete the fields address and phone number
    </div>
    <f7-button
      class="btn-proceed"
      :class="{'disabled': select}"
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
        <div
          v-if="doorDelivery"
          class="direccion"
        >
          <div class="titulo">
            Address
          </div>
          <div

            class="valor"
          >
            {{ adress }}
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
import {
  doc, setDoc, getFirestore, getDoc, updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      mostrarMetodosPago: true, // mostrar pago o de lo contrariomostrar direcchio y telefono
      pagoSelected: true, // controla si se ha selecionado un metodo de pago
      cardSelected: null, // tarjeta
      bankSelected: null, // cuenta bancaria
      doorDelivery: null, // envia a domicilio
      pickUp: null, // recogida en el restaurante
      popupOpened: false, //
      select: true,
      total: 0,
      adress: '',
      phone: 0,
      mostrarError: false,

    };
  },
  computed: {
    ...mapState(['loginNeeded', 'userData', 'appData', 'userOrders', 'actualOrder', 'fecha', 'hora']),

  },
  created() {
    /* en el metodo created obtenemos del store la direcchion del cliente si es que la tuviera */
    this.adress = this.userData.direccion;
    /* el telefono si lo tiene configurado  */
    this.phone = this.userData.tel;
    /* calculamos el total del pedido actual que tiene */
    let totalPedido = 0;
    for (let i = 0; i < this.actualOrder.length; i++) {
      const element = this.actualOrder[i];
      totalPedido += element.precio * element.cantidad;
    }
    this.total = totalPedido;
  },
  methods: {
    ...mapActions(['setLoginNeeded', 'setUserData', 'setActualOrder', 'setUserOrders']),
    /* boton de confirmacion pagina delivery si todos los campos y datos son correcto s
    se procede a mostrar al usuario el total y a confirmar el pedido */
    ProceedDelivery() {
      if (this.doorDelivery === true && (this.adress === '' || this.adress === undefined || this.phone === 0 || this.phone === undefined)) {
        this.mostrarError = true;
      } else {
        this.popupOpened = true;
        this.mostrarError = false;
      }
    },
    /* control de selecciones en el formulario */
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
      this.select = false;
      this.mostrarMetodosPago = false;
      this.doorDelivery = true;
      this.pickUp = false;
    },
    /* control de cambios en los inputs */
    AdressChange(val) {
      this.adress = val;
    },
    PhoneChange(val) {
      this.phone = val;
    },
    PressPickUp() {
      this.mostrarMetodosPago = true;
      this.doorDelivery = false;
      this.pickUp = true;
      this.select = false;
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

      this.setOrder();
      this.UpdateUserData();
    },
    /* metodo que carga el pedido una vez confirmado  */
    async setOrder() {
      let totalPedido = 0;
      for (let i = 0; i < this.actualOrder.length; i++) {
        const element = this.actualOrder[i];
        totalPedido += element.precio * element.cantidad;
      }
      this.total = totalPedido;
      /* en este objeto insertamos todos los datos necesarios para subir el pedido a firebase */
      const obj = {
        ...this.actualOrder,
        id: this.userOrders,
        fecha: this.printDate(),
        total: totalPedido,
        fechaSolicitada: this.fecha,
        horaSolicitada: this.hora,
        direccion: this.adress,
        usuario: this.userData.correo,
      };
      const docs = doc(getFirestore(), 'users', this.userData.correo);
      const pedidosNegocio = doc(getFirestore(), 'pedidosnegocio', 'totalpedidos');

      /* actualizarmos el array orders de cada usuario en firebase y le concatenamos el objeto que se ha
      creado anteriormente de esta manera cada usuario tiene su propia estructura de pedidos */
      await updateDoc(docs, {
        orders: arrayUnion(obj),
      });
      await updateDoc(pedidosNegocio, {
        pedidos: arrayUnion(obj),
      });

      /* reseteamos el pedido del store */
      this.setActualOrder([]);
      const id = this.userOrders + 1;
      this.setUserOrders(id);
    },
    /* con este metodo obtenemos los datos que tiene el usuario en firebase */
    async getUserData() {
      const docRef = doc(getFirestore(), 'users', this.userData.correo);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        this.setUserData(docSnap.data().userData);
      }
      console.log('No such document!');
    },
    /* metodo que utilizamos para actualizar el telfono o direccion si no existe
    previantemente */
    async UpdateUserData() {
      const docs = doc(getFirestore(), 'users', this.userData.correo);
      let apellido2 = '';
      let tel2 = '';
      let genero2 = '';
      if (this.userData.apellido !== undefined) {
        apellido2 = this.userData.apellido;
      }
      if (!this.userData.tel !== undefined) {
        tel2 = this.userData.tel;
      }
      if (!this.userData.genero !== undefined) {
        genero2 = this.userData.genero;
      }
      await updateDoc(docs, {
        userData: {
          nombre: this.userData.nombre,
          correo: this.userData.correo,
          contraseña: this.userData.contraseña,
          apellido: apellido2,
          tel: tel2,
          genero: genero2,
          direccion: this.adress,
        },
      });

      this.getUserData();
    },
    /* metodo para obtener la fecha actual del pedido */
    printDate() {
      return new Date().toLocaleDateString();
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
.disabled{
  opacity: 0.1;
  pointer-events: none;
}
.btn{
        width: 100%;
        text-align: center;
        margin-bottom: -2vh;
        color:red;
      }
</style>
