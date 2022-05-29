<template>
  <f7-page
    name="FrPrincipal"
    class="container-page"
  >
    <div
      v-if="principal"
      class="sin-scroll"
    >
      <!-- nav bar panel derecho y carrito compra -->

      <div class="padding margin">
        <f7-row>
          <f7-col class="display-flex flex-direction-row">
            <f7-link
              @click="panelIzquierdo = true"
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

              @click="OpenCard"
            >
              <div class="carrito">
                <f7-icon
                  f7="cart"
                  size="30px"
                  color="black"
                />
                <div class="numero">
                  1
                </div>
              </div>
            </f7-link>
          </f7-col>
        </f7-row>
      </div>
      <!-- texto de la pagina principal -->
      <div class="padding margin">
        <f7-row class="text">
          Delicious
        </f7-row>
        <f7-row class="text">
          food for you
        </f7-row>
      </div>
      <!-- buscador de comida -->
      <div class="padding margin">
        <UCSearchEmpty @buscar="BuscarPlatosFiltro" />
      </div>

      <!-- menu con stroll para seleccion comida bebica entrantes ensaladas etc -->
      <div class="container-scroll-menu-seleccion">
        <div
          class="item-menu"
          @click="PressItemMenu('Starters')"
        >
          <div :class="{ 'item': Starters }">
            <P />
            Starters
          </div>
        </div>
        <div
          class="item-menu"
          @click="PressItemMenu('Main')"
        >
          <div :class="{ 'item': Main }">
            Main
          </div>
        </div>
        <div
          class="item-menu"
          @click="PressItemMenu('Drinks')"
        >
          <div :class="{ 'item': Drinks }">
            Drinks
          </div>
        </div>
        <div
          class="item-menu"
          @click="PressItemMenu('Rice')"
        >
          <div :class="{ 'item': Rice }">
            Rice
          </div>
        </div>
        <div
          class="item-menu"
          @click="PressItemMenu('Nan')"
        >
          <div :class="{ 'item': Nan }">
            Nan/Pan
          </div>
        </div>
        <div
          class="item-menu"
          @click="PressItemMenu('Desserts')"
        >
          <div :class="{ 'item': Desserts }">
            Desserts
          </div>
        </div>
      </div>
      <!-- lista de platos segun seleccion en el menu -->
      <div
        class="container-platos"
      >
        <div
          v-for="(plato, i) in arrayMostrar"
          :key="i"
          class="item-plato"
          @click="OpenPlatoDescripcion(plato)"
        >
          <UCPlato
            :img="plato.img"
            :nombre="plato.nombre"
            :precio="plato.precio"
          />
        </div>
      </div>
      <!-- menu footer -->
    </div>
    <div v-if="descripcionPlato">
      <UCPlatoDescripcion
        :img="platoSelected.img"
        :nombre="platoSelected.nombre"
        :precio="platoSelected.precio"
        :info-plato="platoSelected.descEs"
        :info-plato-en="platoSelected.descEn"
        @back="PressBack"
      />
    </div>
    <div v-if="platosFiltro">
      <UCPlatosFiltrados
        :platos="arrayFiltrado"
        @back="PressBack"
      />
    </div>
    <f7-panel
      :opened="panelIzquierdo"
      left
      reveal
      resizable
      @panel:closed="panelIzquierdo = false"
    >
      <f7-view>
        <f7-page class="container-panel">
          <div class="container-panel__options">
            <div class="container-panel__item">
              <f7-icon
                f7="person_circle"
                size="4vh"
                color="white"
                class="icono"
              />
              Profile
            </div>
            <div class="container-panel__border">
              <f7-icon
                class="icono"
                f7="cart"
                size="4vh"
                color="white"
              />
              Orders
            </div>
            <div class="container-panel__border">
              <f7-icon
                class="icono"
                f7="info_circle"
                size="4vh"
                color="white"
              />
              About us
            </div>
          </div>

          <div
            class="container-panel__sign-out"
            @click="SignOut"
          >
            Sign-out
            <f7-icon
              class="icono"
              f7="arrow_right"
              size="4vh"
              color="white"
            />
          </div>
        </f7-page>
      </f7-view>
    </f7-panel>
    <UCPreload v-if="correcto" />
  </f7-page>
</template>

<script>
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {
  doc, setDoc, getFirestore, getDoc,
} from 'firebase/firestore';
import { mapActions, mapState } from 'vuex';
import UCSearchEmpty from '@/components/UCSearchEmpty.vue';
import UCPlato from '@/components/UCPlato.vue';
import UCPlatoDescripcion from '@/components/UCPlatoDescripcion.vue';
import UCPlatosFiltrados from '@/components/UCPlatosFiltrados.vue';
import UCPreload from '@/components/UCPreload.vue';

export default {
  components: {
    UCSearchEmpty,
    UCPlato,
    UCPlatoDescripcion,
    UCPlatosFiltrados,
    UCPreload,
  },
  props: {
    f7route: Object,
    f7router: Object,
  },

  data() {
    return {
      Starters: false,
      Main: true,
      Drinks: false,
      Rice: false,
      Nan: false,
      Desserts: false,
      url: null, // url imagen
      // pantallas de carga
      descripcionPlato: false,
      principal: true,
      platosFiltro: false,
      platoSelected: null, // plato seleccionado en el scroll
      arrayMostrar: [],
      arrayParaFiltrar: [],
      arrayFiltrado: [],
      mostrarLoader: true,
      panelIzquierdo: false,

    };
  },
  computed: {
    ...mapState(['loginNeeded', 'userData', 'appData', 'userOrders']),

  },
  created() {
    this.Filtro();
  },

  methods: {
    ...mapActions(['setLoginNeeded', 'setUserData']),
    Filtro() {
      /* await setDoc(doc(getFirestore(), 'cities', 'LA'), {
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
      }); */

      this.arrayMostrar = this.appData.Main;

      this.arrayParaFiltrar.push(...this.appData.Main);
      this.arrayParaFiltrar.push(...this.appData.Starters);
      this.arrayParaFiltrar.push(...this.appData.Drinks);
      this.arrayParaFiltrar.push(...this.appData.Rice);
      this.arrayParaFiltrar.push(...this.appData.Nan);
      this.arrayParaFiltrar.push(...this.appData.Desserts);

      // filtro
    },
    PressItemMenu(val) {
      if (val === 'Starters') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Starters;
        this.Starters = true;
        this.Main = false;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = false;
      }
      if (val === 'Main') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Main;
        this.Starters = false;
        this.Main = true;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = false;
      }
      if (val === 'Drinks') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Drinks;
        this.Starters = false;
        this.Main = false;
        this.Drinks = true;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = false;
      }
      if (val === 'Rice') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Rice;
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Rice = true;
        this.Nan = false;
        this.Desserts = false;
      }
      if (val === 'Nan') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Nan;
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = true;
        this.Desserts = false;
      }
      if (val === 'Desserts') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Desserts;
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = true;
      }
    },
    OpenPlatoDescripcion(val) {
      this.platoSelected = val;
      this.descripcionPlato = true;
      this.principal = false;
      this.platosFiltro = false;
    },
    PressBack() {
      this.descripcionPlato = false;
      this.principal = true;
      this.platosFiltro = false;
    },
    BuscarPlatosFiltro(val) {
      this.arrayFiltrado = this.arrayParaFiltrar.filter((e) => e.nombre.toLowerCase().includes(val.toLocaleLowerCase()));

      this.descripcionPlato = false;
      this.principal = false;
      this.platosFiltro = true;
    },
    OpenCard() {
      this.f7router.navigate('/frCarrito/');
    },
    SignOut() {
      this.panelIzquierdo = false;
      this.setLoginNeeded(true);
      this.f7router.navigate('/');
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
.sin-scroll{
    overflow-x:hidden;
    overflow-y:hidden;
}

.text{
    margin-top: -1vh;
    font-family:Mela Pro  ;
    font-weight: 600;
    font-size: 4vh;
}
//estilos del menu de tipos de comidas
.container-scroll-menu-seleccion{
    scroll-snap-type: x mandatory;
    width: 90%;
    height: 5vh;
    padding: 2vh;
    white-space: nowrap;
    overflow-y: hidden;
    margin-left: 2vh;
    margin-right: 2vh;
    margin-top: -3vh;
    margin-bottom: 2vh;

}
.container-scroll-menu-seleccion::-webkit-scrollbar {
display: none;
}
.item-menu{
    scroll-snap-align: start;
    width: 12vh;
    height: 5vh;
    padding: 0;
    font-family:Mela Pro  ;
    color: #9A9A9D;
    display: inline-block;
    font-size: 2.2vh;
    text-align: center;
    .item{
        border-bottom: 0.5vh solid red;
        color: #FF4B3A;
        box-shadow: rgba(0.25, 0.25, 0.25, 0.25) 0px 54px 55px,;

    }

}

//estilos contenedor platos
.container-platos{
   scroll-snap-type: x mandatory;
   white-space: nowrap;
    width: 100%;
    height: 50vh;
    overflow-y: hidden;
    margin-left: 2vh;
    margin-right: 2vh;
    .item-plato{
      scroll-snap-align: start;
      width: 30vh;
      height: 5vh;
      padding: 0;
      font-family:Mela Pro  ;
      color: #9A9A9D;
      display: inline-block;
      text-align: center;
    }
}
.container-platos::-webkit-scrollbar {
display: none;
}

.icon{
  color: #BBBBBD;
}

//estilos panel izquierdo

.container-panel{
  overflow-y: hidden;
  overflow-x: hidden;
  background:#FF4B3A ;
  width: 100%;
  height: 100%;
  &__options{
    width: 75%;
    margin-top: 16vh;
  }
  &__item{
    padding-left: 8vh;
    font-size: 3vh;
    margin-top: 2vh;
    font-weight: 600;
    color: white;
    height: 2vh;
    .icono{
      color: white;
    }
  }
  &__border{
    padding-left: 8vh;
    padding-top: 2vh;
    font-size: 3vh;
    font-weight: 600;
    color: white;
    margin-top: 5vh;
    margin-bottom: -2vh;
    border-top: 1px solid white;
    width: 100%;
    .icono{
      color: white;
    }
  }

  &__sign-out{
    font-size: 3vh;
    font-weight: 600;
    color: white;
    position:absolute;
    bottom: 5vh;
    left: 10vh;

  }
}

.numero{
 background:#ee594b ;
 border-radius: 50%;
 width: 3vh;
 height: 3vh;
 text-align: center;
 font-size: 2vh;
 font-weight: 700;
 margin-top: -6vh;
 margin-left: 2vh;
}

</style>
