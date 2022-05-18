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

              panel-open="right"
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
          @click="PressItemMenu('Salads')"
        >
          <div :class="{ 'item': Salads }">
            Salads
          </div>
        </div>
        <div
          class="item-menu"
          @click="PressItemMenu('Soups')"
        >
          <div :class="{ 'item': Soups }">
            Soups
          </div>
        </div>
        <div
          class="item-menu"
          @click="PressItemMenu('Kids')"
        >
          <div :class="{ 'item': Kids }">
            Kids
          </div>
        </div>
      </div>
      <!-- lista de platos segun seleccion en el menu -->
      <div
        class="container-platos"
      >
        <div
          v-for="(plato, i) in arrayTotalDePlatos"
          :key="i"
          class="item-plato"
          @click="OpenPlatoDescripcion"
        >
          <UCPlato
            :img="url"
            :nombre="plato.nombre"
            :precio="plato.precio"
          />
        </div>
      </div>
      <!-- menu footer -->
      <div class="menu-footer">
        <f7-row>
          <f7-col class="text-align-center">
            <f7-link>
              <f7-icon
                f7="house"
                size="30px"
                class="icon"
              />
            </f7-link>
          </f7-col>
          <f7-col class="text-align-center">
            <f7-link>
              <f7-icon
                f7="heart"
                size="30px"
                class="icon"
              />
            </f7-link>
          </f7-col>
          <f7-col class="text-align-center">
            <f7-link>
              <f7-icon
                f7="person"
                size="30px"
                class="icon"
                @click="prueba"
              />
            </f7-link>
          </f7-col>
          <f7-col class="text-align-center">
            <f7-link>
              <f7-icon
                f7="gobackward"
                size="30px"
                class="icon"
              />
            </f7-link>
          </f7-col>
        </f7-row>
      </div>
    </div>
    <div v-if="descripcionPlato">
      <UCPlatoDescripcion
        :img="url"
        nombre="aaaaaaaaaaaaaaaa"
        precio="30€"
        info-plato="plato tipico con ajo cebolla y mantequilla"
        @back="PressBack"
      />
    </div>
    <div v-if="platosFiltro">
      <UCPlatosFiltrados
        :platos="arrayTotalDePlatos"
        :img="url"
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
  data() {
    return {
      Starters: false,
      Main: true,
      Drinks: false,
      Salads: false,
      Soups: false,
      Kids: false,
      url: null, // url imagen
      // pantallas de carga
      descripcionPlato: false,
      principal: true,
      platosFiltro: false,
      arrayTotalDePlatos: [
        {
          img: this.url,
          nombre: 'Veggie tomato mix',
          precio: '35€',
        },
        {
          img: this.url,
          nombre: 'Veggie tomato mix',
          precio: '35€',
        },
        {
          img: this.url,
          nombre: 'Veggie tomato mix',
          precio: '35€',
        },
        {
          img: this.url,
          nombre: 'Veggie tomato mix',
          precio: '35€',
        },
        {
          img: this.url,
          nombre: 'Veggie tomato mix',
          precio: '35€',
        },
        {
          img: this.url,
          nombre: 'Veggie tomato mix',
          precio: '35€',
        },
      ],

    };
  },
  created() {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'images/ic_plato.png'))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log(url);
        this.url = url;
      })
      .catch((error) => {
        // Handle any errors
      });
  },
  methods: {
    async prueba() {
      /* await setDoc(doc(getFirestore(), 'cities', 'LA'), {
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
      }); */
      const docRef = doc(getFirestore(), 'Imagenes', 'img');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    },
    PressItemMenu(val) {
      if (val === 'Starters') {
        this.Starters = true;
        this.Main = false;
        this.Drinks = false;
        this.Salads = false;
        this.Soups = false;
        this.Kids = false;
      }
      if (val === 'Main') {
        this.Starters = false;
        this.Main = true;
        this.Drinks = false;
        this.Salads = false;
        this.Soups = false;
        this.Kids = false;
      }
      if (val === 'Drinks') {
        this.Starters = false;
        this.Main = false;
        this.Drinks = true;
        this.Salads = false;
        this.Soups = false;
        this.Kids = false;
      }
      if (val === 'Salads') {
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Salads = true;
        this.Soups = false;
        this.Kids = false;
      }
      if (val === 'Soups') {
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Salads = false;
        this.Soups = true;
        this.Kids = false;
      }
      if (val === 'Kids') {
        this.Starters = false;
        this.Main = false;
        this.Drinks = false;
        this.Salads = false;
        this.Soups = false;
        this.Kids = true;
      }
    },
    OpenPlatoDescripcion() {
      this.descripcionPlato = true;
      this.principal = false;
      this.platosFiltro = false;
    },
    PressBack() {
      this.descripcionPlato = false;
      this.principal = true;
      this.platosFiltro = false;
    },
    BuscarPlatosFiltro() {
      this.descripcionPlato = false;
      this.principal = false;
      this.platosFiltro = true;
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
    margin-top: -4vh;
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
    height: 45vh;
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

.menu-footer{
  margin-top: 3vh;
  background: #F6F6F9;
  width: 100%;
  height: 100%;
}

.icon{
  color: #BBBBBD;
}
</style>
