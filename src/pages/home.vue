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
import { mapState, mapActions } from 'vuex';
import {
  doc, setDoc, getFirestore, getDoc,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import UCPreload from '@/components/UCPreload.vue';

export default {
  components: {
    UCPreload,
  },
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      arrayCompletoPlatos: [],
      img: null,
      arrayImg: [],
      showPreload: false,

    };
  },
  computed: {
    ...mapState(['loginNeeded', 'userData']),
  },
  created() {
    
  },
  methods: {
    ...mapActions(['setAppData']),
    async getData() {
      const docRef = doc(getFirestore(), 'Productos', 'p');
      const docSnap = await getDoc(docRef);

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
    async AddImages() {
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

      this.setAppData(this.arrayCompletoPlatos);
    },
    async getImage(img, arr, pos) {
      const storage = getStorage();
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
    async pressClick() {
      this.showPreload = true;
      const result = await this.getData();
      await this.Sleep(1000);
      this.showPreload = false;
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
