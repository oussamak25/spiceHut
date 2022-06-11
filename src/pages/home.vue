<!-- Home page  -->
<template>
  <f7-page name="home">
    <div
      v-if="!showPreload"
      class="contenedorPrincipal"
    >
      <div>
        <img
          class="img-gorro"
          src="/assets/img/gorroCocina.png"
        >
      </div>
      <div class="texto">
        Food for
      </div>
      <div class="texto">
        Eveyone
      </div>

      <div>
        <img
          class="imgPersonas"
          src="/assets/img/imagenInicio.png"
        >
      </div>
      <div class="btn">
        <f7-button
          id="btn-get-starteed"
          class="btnInicio"
          raised
          round
          @click="pressClick"
        >
          Get Starteed
        </f7-button>
      </div>
    </div>
    <div
      v-if="showPreload"
      class="preload"
    >
      <UCPreload />
    </div>
  </f7-page>
</template>
<script>
/* importaciones necesarias */
import { mapState, mapActions } from 'vuex';
import {
  doc, setDoc, getFirestore, getDoc,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import UCPreload from '@/components/UCPreload.vue';

export default {
  /* componentes expernos que usa esta pagina */
  components: {
    UCPreload,
  },
  /* props en este caso solo tenemos las props de f7 que nos permiten navegar entre distintos elementos de la aapp
   */
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      arrayCompletoPlatos: [], // array con todos los platos sin categrias para poder hacer el filtro
      img: null, //
      arrayImg: [], // array con todas las imagens de la app
      showPreload: false, // variable que controla si se muestra o no el preloader

    };
  },
  computed: {
    /* variables del state de nuesro store */
    ...mapState(['loginNeeded', 'userData']),
  },
  created() {

  },
  methods: {
    ...mapActions(['setAppData']),
    /* Metodo que carga los productos que tenemos en firebase estos metodos deben ser asincronos  */
    async getData() {
      /* datos necesarios para el acceso al documento correcto en firebase */
      const docRef = doc(getFirestore(), 'Productos', 'p');
      const docSnap = await getDoc(docRef);
      /* si existe el documento que consultamos metemos la info que nos devueva la consulta
      en el array de plato completo sy llamamos al metod addImages */
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        this.arrayCompletoPlatos = docSnap.data();
        await this.AddImages();
        return true;
      }
      // doc.data() will be undefined in this case
      console.log('No such document!');

      return false;
    },
    /* metodo addImages */
    async AddImages() {
      /* por cada uno de los elementos de cada opcion del arraycompletode platos
      llama al metodo get imagen */
      /* al metodo getImage le pasamos el nombre de la imagen, la referencia directa al array
      en ese momento y la posicion */
      for (let i = 0; i < this.arrayCompletoPlatos.Main.length; i++) {
        const element = this.arrayCompletoPlatos.Main[i];
        this.getImage(element.img, this.arrayCompletoPlatos.Main, i);
      }
      for (let i = 0; i < this.arrayCompletoPlatos.Desserts.length; i++) {
        const element = this.arrayCompletoPlatos.Desserts[i];
        this.getImage(element.img, this.arrayCompletoPlatos.Desserts, i);
      }
      for (let i = 0; i < this.arrayCompletoPlatos.Drinks.length; i++) {
        const element = this.arrayCompletoPlatos.Drinks[i];
        this.getImage(element.img, this.arrayCompletoPlatos.Drinks, i);
      }
      for (let i = 0; i < this.arrayCompletoPlatos.Nan.length; i++) {
        const element = this.arrayCompletoPlatos.Nan[i];
        this.getImage(element.img, this.arrayCompletoPlatos.Nan, i);
      }
      for (let i = 0; i < this.arrayCompletoPlatos.Rice.length; i++) {
        const element = this.arrayCompletoPlatos.Rice[i];
        this.getImage(element.img, this.arrayCompletoPlatos.Rice, i);
      }
      for (let i = 0; i < this.arrayCompletoPlatos.Starters.length; i++) {
        const element = this.arrayCompletoPlatos.Starters[i];
        this.getImage(element.img, this.arrayCompletoPlatos.Starters, i);
      }
      /* finalmente usamos la accion setAppData para cambiar el state de nuestro store
       y le pasamos ya el arrayCompletoPlatos con todas las imagenes cambiadas
       es decir en resumen: hemos cambiado el nombre de cada una de las imgens por su ruta directa
       al store de firebase */
      this.setAppData(this.arrayCompletoPlatos);
    },
    /* metodo geImage al que se le pasa un nombr ed eimagen , una referencia a un array , y una posicion */
    async getImage(img, arr, pos) {
      const storage = getStorage();
      /* llamamos al metod getDownloadURL  y obtenemos del store de firebase la url del img
      que pasamos por parametros, posteriormente cambiamos en el array
      que se le pasa la img por la url  */
      getDownloadURL(ref(storage, img))
        .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
          this.img = url;
          arr[pos].img = url;
        })
        .catch((error) => {
        // Handle any errors
        });
    },
    Sleep(tiempo) {
      return new Promise((resolve) => setTimeout(resolve, tiempo));
    },
    /* Metod quue se ejecuta al hacer click en iniciar */
    async pressClick() {
      /* al hacer click mostramos el preloader  */
      this.showPreload = true;
      /* lllamaos al hilo getData y esperamos que se termine de ejecutar */
      const result = await this.getData();
      /* llamo al metod sleep por un segundo mientras se cargan las imagenes */
      await this.Sleep(1000);
      /* finalmente desactivo el preloader */
      this.showPreload = false;
      /* Si se requiere login redirigimos a la pagina de login y si no a la pagina principal */
      if (result) {
        if (this.loginNeeded) {
          this.f7router.navigate('/login/');
          window.screen.orientation.lock('portrait');
        } else {
          this.f7router.navigate('/FrPrincipal/');
          window.screen.orientation.lock('portrait');
        }
      }
    },
  },

};
</script>

<style lang="scss" scoped>
.btn{
    background:#FF4B3A ;
}
::-webkit-scrollbar {
    display: none;
}
.contenedorPrincipal{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background:#FF4B3A ;
  overflow-y: hidden;
  overflow-x: hidden;
  .img-gorro{
    margin-top: 5vh;
    margin-left: 5vh;
    border-radius: 50%;
  }
  .texto{
    margin-left: 5vh;
    font-size:7vh ;
    color: white;
    font-family:Wacca  ;
  }
  .imgPersonas{
    width:48.5vh;
    height: 48vh;

  }
  .btnInicio{
    width: 75%;
    height: 7vh;
    font-weight: 500;
    margin: auto;
    background: white;
    color: #FF4B3A;
  }
}
.preload{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
