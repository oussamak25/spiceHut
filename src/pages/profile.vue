<template>
  <f7-page
    name="profile"
    class="container-page"
  >
    <f7-navbar
      title="Profile"
      back-link="Back"
    />
    <div class="container-profile">
      <div class="img-profile">
        <img
          class="img"
          src="@/assets/img/ic_perfilM.png"
        >
      </div>
      <div class="nombre">
        {{ userData.nombre }}  {{ userData.apellido }}
      </div>
      <div class="correo">
        {{ userData.correo }}
      </div>
      <f7-list class="list">
        <f7-list-input
          class="item"
          type="text"
          :value="name"
          placeholder="What's your first name?"
          clear-button
          @change="NameChange($event.target.value)"
        />
        <f7-list-input
          class="item"
          :value="lastName"
          type="text"
          placeholder="And your last name?"
          clear-button
          @change="LastNameChange($event.target.value)"
        />
        <f7-list-input
          class="item"
          type="number"
          :value="phone"
          placeholder="Phone number"
          clear-button
          @change="PhoneChange($event.target.value)"
        />

        <f7-list-input
          class="item"
          :value="gender"
          type="select"
          @change="GenderChange($event.target.value)"
        >
          <option
            value=""
            disabled
            selected
          >
            Select your gender
          </option>
          <option value="Male">
            Male
          </option>
          <option value="Female">
            Female
          </option>
        </f7-list-input>
      </f7-list>
      <div
        v-if="mostrarError"
        class="btn"
      >
        Complete all the fields to continue
      </div>
      <div class="btn">
        <f7-button
          class="btn-comprobar"
          raised
          round
          @click="UpdateInfo"
        >
          Update profile
        </f7-button>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
  doc, setDoc, getFirestore, getDoc, updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';

export default {
  data() {
    return {
      name: '',
      lastName: '',
      phone: 0,
      gender: '',
      mostrarError: false,
    };
  },
  computed: {
    ...mapState(['loginNeeded', 'userData']),

  },
  created() {
    this.name = this.userData.nombre;
    this.lastName = this.userData.apellido;
    this.phone = this.userData.tel;
    this.gender = this.userData.genero;
  },
  methods: {
    ...mapActions(['setLoginNeeded', 'setUserData']),
    async getUserData() {
      const docRef = doc(getFirestore(), 'users', this.userData.correo);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        this.setUserData(docSnap.data().userData);
      }
      console.log('No such document!');
    },
    async UpdateUserData() {
      const docs = doc(getFirestore(), 'users', this.userData.correo);

      await updateDoc(docs, {
        userData: {
          nombre: this.name,
          correo: this.userData.correo,
          contraseña: this.userData.contraseña,
          apellido: this.lastName,
          tel: this.phone,
          genero: this.gender,
          direccion: this.userData.direccion,
        },
      });

      this.getUserData();
      console.log(this.userData);
    },
    UpdateInfo() {
      if (this.name === '' || this.lastName === '' || this.phone === '' || this.gender === '') {
        this.mostrarError = true;
      } else {
        this.mostrarError = false;
        this.UpdateUserData();
      }
    },
    NameChange(val) {
      this.name = val;
    },
    LastNameChange(val) {
      this.lastName = val;
    },
    PhoneChange(val) {
      this.phone = val;
    },
    GenderChange(val) {
      this.gender = val;
    },

  },
};
</script>

<style lang="scss" scoped>
.container-page{
    width: 100%;
    height: 100%;
    background: #F6F6F9;
    .container-profile{
      display: flex;
      flex-direction: column;
      align-items: center;
      .img{
          width: 20vh;
          height: 20vh;
      }

      .nombre{
        font-family: Robboto;
        font-size: 4.5vh;
        margin-top: -4vh;
        font-weight: 600;
      }
      .list{
        margin: 5vh;
        margin-left: 5vh;
        width: 90%;
        border: 1px solid white;
        .item{
          background: #F6F6F9;
        }

      }
      .btn{
        width: 100%;
        text-align: center;
        margin-bottom: 5vh;
        color:red;
      }

    }

}
.btn-comprobar{
    width: 75%;
    height: 7vh;
    font-weight: 500;
    margin-top: 5vh;
    margin-left: 5vh;
    margin: auto;
    background: #FF4B3A;
    color: white;
}

</style>
