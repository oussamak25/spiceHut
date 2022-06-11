<!-- FrPrincipal  -->
<template>
  <f7-page
    name="FrPrincipal"
    class="container-page"
  >
    <div
      v-if="principal"
      id="page-principal"
      class="sin-scroll"
    >
      <!-- nav bar panel derecho y carrito compra -->

      <div class="padding margin">
        <f7-row>
          <f7-col class="display-flex flex-direction-row">
            <f7-link
              id="btn-panel-izquierdo"
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
              id="btn-carrito"
              @click="OpenCard"
            >
              <div class="carrito">
                <f7-icon
                  f7="cart"
                  size="30px"
                  color="black"
                />
                <div class="numero">
                  {{ actualOrder.length }}
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
          id="item-menu-drinks"
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
        v-show="!spinnerOpen"
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
        @addToCar="AddToCarPress"
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
        <f7-page
          id="view-panel-izquierdo"
          class="container-panel"
        >
          <div class="container-panel__options">
            <div
              id="btn-profile"
              class="container-panel__item"
              @click="OpenProfile"
            >
              <f7-icon
                f7="person_circle"
                size="4vh"
                color="white"
                class="icono"
              />
              Profile
            </div>
            <div
              id="btn-orders"
              class="container-panel__border"
              @click="OpenOrders"
            >
              <f7-icon
                class="icono"
                f7="cart"
                size="4vh"
                color="white"
              />
              Orders
            </div>
            <div
              id="btn-about"
              class="container-panel__border"
              @click="OpenAbout"
            >
              <f7-icon
                class="icono"
                f7="person_3"
                size="4vh"
                color="white"
              />
              About us
            </div>
            <div
              id="btn-horario"
              class="container-panel__border"
              @click="OpenHorario"
            >
              <f7-icon
                class="icono"
                f7="info_circle"
                size="4vh"
                color="white"
              />
              Info
            </div>
          </div>

          <div
            id="btn-sign-out"
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
    <!--  <UCPreload v-if="correcto" /> -->
    <UCSpinner v-if="spinnerOpen" />
  </f7-page>
</template>

<script>
/* importaciones necesarias */
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {
  doc, setDoc, getFirestore, getDoc,
} from 'firebase/firestore';
import { mapActions, mapState } from 'vuex';
import { getAuth, signOut } from 'firebase/auth';
import UCSearchEmpty from '@/components/UCSearchEmpty.vue';
import UCPlato from '@/components/UCPlato.vue';
import UCPlatoDescripcion from '@/components/UCPlatoDescripcion.vue';
import UCPlatosFiltrados from '@/components/UCPlatosFiltrados.vue';
import UCPreload from '@/components/UCPreload.vue';
import UCSpinner from '@/components/UCSpinner.vue';

export default {
  /* componentes que usa esta pagina */
  components: {
    UCSearchEmpty,
    UCPlato,
    UCPlatoDescripcion,
    UCPlatosFiltrados,
    UCPreload,
    UCSpinner,
  },
  props: {
    f7route: Object,
    f7router: Object,
  },

  data() {
    /* variables reactivas */
    return {
      Starters: false, // se ha seleccionado esta opcion
      Main: false, // se ha seleccionado esta opcion
      Drinks: false, // se ha seleccionado esta opcion
      Rice: false, // se ha seleccionado esta opcion
      Nan: false, // se ha seleccionado esta opcion
      Desserts: false, // se ha seleccionado esta opcion
      descripcionPlato: false, // se ha pulsado un plato y se ha abierto la descripcion de un plato
      principal: true, // mostrar pagina principa
      platosFiltro: false, // mostrar platos filtrados
      platoSelected: null, // plato seleccionado en el scroll
      arrayMostrar: [], // array con las opciones que hay que mostrar en cada caso
      arrayParaFiltrar: [], // array con todos los plato sin categorias
      arrayFiltrado: [], // array con los platos filtrados
      panelIzquierdo: false, // control apertura side menu
      spinnerOpen: false, // control spinner

    };
  },
  computed: {
    /* strore state */
    ...mapState(['loginNeeded', 'userData', 'appData', 'userOrders', 'actualOrder']),

  },
  created() {
    /* metodo created  */
    this.Filtro();
    this.PressItemMenu('Main');
  },

  methods: {
    ...mapActions(['setLoginNeeded', 'setUserData', 'setActualOrder', 'addActualOrder']),
    /* metod Filtro que nos desmonta el array que tenemos en el store con todos los datos
    de la app, y los inserta en un solo array sin categorias para poder aplicar el filtro de forma
    mas facil al pulsar en la barra de busqueda */
    Filtro() {
      this.arrayMostrar = this.appData.Main;

      this.arrayParaFiltrar.push(...this.appData.Main);
      this.arrayParaFiltrar.push(...this.appData.Starters);
      this.arrayParaFiltrar.push(...this.appData.Drinks);
      this.arrayParaFiltrar.push(...this.appData.Rice);
      this.arrayParaFiltrar.push(...this.appData.Nan);
      this.arrayParaFiltrar.push(...this.appData.Desserts);

      // filtro
    },
    /* metodo que uso para indicarle al programa que este un tiempo parado pj mientras
    se realiza alguna operacions */
    Sleep(tiempo) {
      return new Promise((resolve) => setTimeout(resolve, tiempo));
    },
    /* metodos que controlas la apertura de distintas pestañas o paginas */
    OpenHorario() {
      this.f7router.navigate('/horario/');
      this.panelIzquierdo = false;
    },
    OpenAbout() {
      this.f7router.navigate('/about/');
      this.panelIzquierdo = false;
    },
    OpenProfile() {
      this.f7router.navigate('/profile/');
      this.panelIzquierdo = false;
    },
    OpenOrders() {
      this.f7router.navigate('/orders/');
      this.panelIzquierdo = false;
    },
    /* metodo para añadir el palto seleccionado al carrito recordemso que el carrito lo controlamos
    con la varibale del state de nuestro store  */
    AddToCarPress() {
      this.addActualOrder(this.platoSelected);
      this.descripcionPlato = false;
      this.principal = true;
      this.platosFiltro = false;
    },
    /* Metodo que nos sirve para cargar los distintos platos
     dependiendo de la seleccion quu hagamos en el menu */
    async PressItemMenu(val) {
      if (val === 'Starters') {
        this.spinnerOpen = true;
        await this.Sleep(1000);
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Starters;
        this.Starters = true;
        this.Main = false;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = false;
        this.spinnerOpen = false;
      }
      if (val === 'Main') {
        this.spinnerOpen = true;
        await this.Sleep(1000);
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Main;
        this.Starters = false;
        this.Main = true;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = false;
        this.spinnerOpen = false;
      }
      if (val === 'Drinks') {
        this.spinnerOpen = true;
        await this.Sleep(1000);
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Drinks;
        this.Starters = false;
        this.Main = false;
        this.Drinks = true;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = false;
        this.spinnerOpen = false;
      }
      if (val === 'Rice') {
        this.spinnerOpen = true;
        await this.Sleep(1000);
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Rice;
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Rice = true;
        this.Nan = false;
        this.Desserts = false;
        this.spinnerOpen = false;
      }
      if (val === 'Nan') {
        this.spinnerOpen = true;
        await this.Sleep(1000);
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Nan;
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = true;
        this.Desserts = false;
        this.spinnerOpen = false;
      }
      if (val === 'Desserts') {
        this.spinnerOpen = true;
        await this.Sleep(1000);
        this.arrayMostrar = [];
        this.arrayMostrar = this.appData.Desserts;
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = true;
        this.spinnerOpen = false;
      }
    },
    /* metodo que controla la apertura de la descripcion de un plato al pulsar sobre el  */
    OpenPlatoDescripcion(val) {
      this.platoSelected = val;
      this.descripcionPlato = true;
      this.principal = false;
      this.platosFiltro = false;
    },
    /* control del evento back de los distintos componentes
    paara volver a mostrar la pagina principal  */
    PressBack() {
      this.descripcionPlato = false;
      this.principal = true;
      this.platosFiltro = false;
    },
    /* Metodo que se encarga de realizar el filtro al pulsar en la barra de busqueda */
    BuscarPlatosFiltro(val) {
      this.arrayFiltrado = this.arrayParaFiltrar.filter((e) => e.nombre.toLowerCase().includes(val.toLocaleLowerCase()));
      this.descripcionPlato = false;
      this.principal = false;
      this.platosFiltro = true;
    },
    /* control de apertura del carrito el carrito solo se abre si tenemos mas de 1 elemento en el carrito
     */
    OpenCard() {
      if (this.actualOrder.length !== 0) { this.f7router.navigate('/frCarrito/'); }
    },
    /* metodo para desuscribirse de la app y salir de la misma y establece el login a false por
    lo que a la proxima que se entre en la app  */
    SignOut() {
      this.panelIzquierdo = false;
      this.setLoginNeeded(true);
      this.setActualOrder([]);
      const auth = getAuth();
      signOut(auth).then(() => {
        this.f7router.navigate('/');
      }).catch((error) => {

      });
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
