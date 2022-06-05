<template>
  <f7-page
    name="orders"
    class="container-page"
  >
    <div v-if="mostrarTotalPedidos">
      <f7-navbar
        title="Orders"
        back-link="Back"
      />
      <div
        v-for="(order, i) in orders"
        :key="i"
      >
        <div class="container-pedido">
          <div
            class="container-pedido_item"
            @click="OpenOrderDescription(order)"
          >
            <div class="item">
              Order Id: {{ order.id }}
            </div>
            <div class="item">
              Date: {{ order.fecha }}
            </div>
            <div class="item">
              Total: {{ order.total }}€
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!mostrarTotalPedidos">
      <f7-navbar
        @click="mostrarTotalPedidos = true"
      >
        <f7-nav-left>
          <f7-icon
            f7="arrow_left"
            size="30px"
            color="black"
            @click="ComeBack"
          />
        </f7-nav-left>
        <f7-nav-title>Order {{ orderSelected.id }}</f7-nav-title>
      </f7-navbar>
      <div
        class="container-pedido"
      >
        <div
          v-for="(order, i) in orderSelected"
          :key="i"
        >
          <div v-if="order.nombre !== undefined">
            <UCItemCarritoVue
              :plato="order"
              desactivar="true"
            />
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
import {
  doc, setDoc, getFirestore, getDoc, updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { mapActions, mapState } from 'vuex';
import UCItemCarritoVue from '@/components/UCItemCarrito.vue';

export default {
  components: {
    UCItemCarritoVue,
  },
  data() {
    return {
      mostrarTotalPedidos: true,
      orderSelected: null,
    };
  },
  computed: {
    ...mapState(['loginNeeded', 'userData', 'appData', 'userOrders', 'actualOrder', 'orders']),

  },
  created() {
    this.getOrders();
  },
  methods: {
    ...mapActions(['setLoginNeeded', 'setUserData', 'setActualOrder', 'setUserOrders', 'setOrders']),
    async getOrders() {
      const docRef = doc(getFirestore(), 'users', this.userData.correo);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        this.setOrders(docSnap.data().orders);
      } else {
        console.log('No such document!');
      }
    },
    OpenOrderDescription(val) {
      this.mostrarTotalPedidos = false;
      this.orderSelected = val;
      console.log(this.orderSelected);
    },
  },

};
</script>

<style lang="scss" scoped>
.container-page{
    width: 100%;
    height: 100%;
    background: #F6F6F9;
}

.container-pedido{
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 70%;
    .container-pedido_item{
        width: 90%;
        height: 12vh;
        margin-top: 5vh;
        margin-left: 5%;
        margin-right: 5%;
        border-radius: 15vh;
        background: white;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-around;
        .item{
          font-family: robotto;
          font-size: 2.2vh;
          color: black;
          font-weight: 400;
        }
    }

}

</style>
