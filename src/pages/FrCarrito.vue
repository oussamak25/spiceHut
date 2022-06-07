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
                Pick up day and time
              </div>
            </f7-col>
          </f7-row>
        </div>
        <div class="input-dia-hora">
          <f7-list no-hairlines-md>
            <f7-list-input
              label="Date"
              type="date"
              placeholder="Please choose..."
              @change="DateChange($event.target.value)"
            />
            <f7-list-input
              label="Time"
              type="time"
              placeholder="Please choose..."
              @change="TimeChange($event.target.value)"
            />
          </f7-list>
        </div>
        <div class="error">
          {{ errorValue }}
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
      fechaValue: '',
      horaValue: '',
      errorValue: 'Tue-Sun  12:00-23:30',
    };
  },
  computed: {
    ...mapState(['actualOrder']),

  },
  methods: {
    ...mapActions(['delActualOrder', 'addCantidadOrder', 'setFecha', 'setHora']),
    ComeBack() {
      this.f7router.navigate('/frPrincipal/');
    },
    ConfirmarPopup() {
      if (this.horaValue === '' || this.fechaValue === '') {
        this.errorValue = 'Select a date and time';
      } else {
        this.popupOpened = false;
        this.setFecha(this.fechaValue);
        this.setHora(this.horaValue);
        this.f7router.navigate('/frDelivery/');
      }
    },
    CompleteOrder() {
      this.popupOpened = true;
    },
    DateChange(val) {
      this.fechaValue = val;
      console.log(this.fechaValue);
    },
    TimeChange(val) {
      this.horaValue = val;
      console.log(this.horaValue);
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
  .input-dia-hora{
    margin-top: -3vh;
  }
  .error{
    margin-left: -2vh;
    text-align: center;
    margin-top: -2vh;
  }

}
.head-popup{
  height: 7vh;
  background: #F6F6F9;

  .head-text{
    margin-top: 3vh;
    margin-left: 5vh;
    font-family:Mela Pro;
    font-size: 2.5vh;
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
