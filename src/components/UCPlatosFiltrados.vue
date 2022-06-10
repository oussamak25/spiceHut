<template>
  <div
    v-if="!descripcionPlato"
    class="sin-scroll"
  >
    <!-- nav bar panel derecho y carrito compra -->

    <div class="navbar-fix">
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
              @click="$emit('back')"
            />
          </f7-link>
        </f7-col>
        <f7-col
          width="75"
        >
          <div class="texto-nav">
            Found {{ platos.length }} results
          </div>
        </f7-col>
      </f7-row>
    </div>
    <!-- platos -->
    <div
      v-for="(plato, i) in platos"
      :key="i"
      class="platos"
      @click="OpenPlatoDescripcion(plato)"
    >
      <UCPlato
        :img="plato.img"
        :precio="plato.precio"
        :nombre="plato.nombre"
      />
    </div>
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
</template>

<script>
/* importaciones necesarias */
import { stringify } from 'json5';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { mapActions } from 'vuex';
import UCPlato from '@/components/UCPlato.vue';
import UCPlatoDescripcion from '@/components/UCPlatoDescripcion.vue';

export default {
  /* este componente usa el componente UCPlato y el plato descripcion */
  components: {
    UCPlato,
    UCPlatoDescripcion,
  },
  /* propiedades que le debemos pasar al componente cuando lo instanciemos */
  props: {
    platos: { type: Array, default: null },
  },
  /* variables reactivas, cuando cambia su valor cambia en todos los lugares en los que las 
  llamemos */
  data() {
    return {
      descripcionPlato: false,
      platoSelected: null,
    };
  },
  created() {

  },
  methods: {
    /* metodos del store para cambiar las propiedaddes de este */
    ...mapActions(['setLoginNeeded', 'setUserData', 'setActualOrder', 'addActualOrder']),
    /* metodo para añdier el plato seleccionado al carrito */
    AddToCarPress() {
      this.addActualOrder(this.platoSelected);
      this.descripcionPlato = false;
    },
    /* metodo para abrir la descripcion del plato que pulsemos */
    OpenPlatoDescripcion(val) {
      this.platoSelected = val;
      this.descripcionPlato = true;
    },
    PressBack() {
      this.descripcionPlato = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-fix{
    position: fixed;
    padding: 2.5vh;
    top: 0;
    background: #EFEEEE;
    width: 100%;
    height: 4vh;
    .texto-nav{
        font-family:Mela Pro  ;
        font-size: 3vh;
        font-weight: 500;
    }

}
.platos{
    width: 27vh;
    height: 32vh;
    margin: auto;
    margin-top: 10vh;
}
</style>
