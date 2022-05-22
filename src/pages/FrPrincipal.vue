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
              panel-open="right"
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
              <f7-icon
                f7="cart"
                size="30px"
                color="black"
              />
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
        :img="`../assets/img/prod/${platoSelected.img}`"
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
  </f7-page>
</template>

<script>
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {
  doc, setDoc, getFirestore, getDoc,
} from 'firebase/firestore';
import UCSearchEmpty from '@/components/UCSearchEmpty.vue';
import UCPlato from '@/components/UCPlato.vue';
import UCPlatoDescripcion from '@/components/UCPlatoDescripcion.vue';
import UCPlatosFiltrados from '@/components/UCPlatosFiltrados.vue';

export default {
  components: {
    UCSearchEmpty,
    UCPlato,
    UCPlatoDescripcion,
    UCPlatosFiltrados,
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
      arrayTotalDePlatos: [],
      arrayMostrar: [],
      arrayParaFiltrar: [],
      arrayFiltrado: [],

    };
  },
  created() {
    this.prueba();
  },
  methods: {
    async prueba() {
      /* await setDoc(doc(getFirestore(), 'cities', 'LA'), {
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
      }); */
      const docRef = doc(getFirestore(), 'Productos', 'p');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        this.arrayTotalDePlatos = docSnap.data();
        this.arrayMostrar = this.arrayTotalDePlatos.Main;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }

      this.arrayParaFiltrar.push(...this.arrayTotalDePlatos.Main);
      this.arrayParaFiltrar.push(...this.arrayTotalDePlatos.Starters);
      this.arrayParaFiltrar.push(...this.arrayTotalDePlatos.Drinks);
      this.arrayParaFiltrar.push(...this.arrayTotalDePlatos.Rice);
      this.arrayParaFiltrar.push(...this.arrayTotalDePlatos.Nan);
      this.arrayParaFiltrar.push(...this.arrayTotalDePlatos.Desserts);

      // filtro
    },
    PressItemMenu(val) {
      if (val === 'Starters') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.arrayTotalDePlatos.Starters;
        this.Starters = true;
        this.Main = false;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = false;
      }
      if (val === 'Main') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.arrayTotalDePlatos.Main;
        this.Starters = false;
        this.Main = true;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = false;
      }
      if (val === 'Drinks') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.arrayTotalDePlatos.Drinks;
        this.Starters = false;
        this.Main = false;
        this.Drinks = true;
        this.Rice = false;
        this.Nan = false;
        this.Desserts = false;
      }
      if (val === 'Rice') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.arrayTotalDePlatos.Rice;
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Rice = true;
        this.Nan = false;
        this.Desserts = false;
      }
      if (val === 'Nan') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.arrayTotalDePlatos.Nan;
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Rice = false;
        this.Nan = true;
        this.Desserts = false;
      }
      if (val === 'Desserts') {
        this.arrayMostrar = [];
        this.arrayMostrar = this.arrayTotalDePlatos.Desserts;
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
</style>
