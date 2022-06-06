<template>
  <f7-page
    name="login"
    class="container-page"
  >
    <div class="container-img">
      <div class="div-img">
        <img
          class="div-img__gorro"
          src="/assets/img/gorroCocina.png"
        >
      </div>
      <div class="display-flex flex-direction-row justify-content-center">
        <f7-button
          :class="{ 'btn-active': loginActivo, 'btn-off': signUpActivo }"
          @click="PressLogin"
        >
          Login
        </f7-button>
        <f7-button
          :class="{ 'btn-active': signUpActivo, 'btn-off': loginActivo }"
          @click="PressSignUp"
        >
          Sign-up
        </f7-button>
      </div>
    </div>
    <div
      v-if="loginActivo"
      class="container-i"
    >
      <div class="container-i__input">
        Email address
        <input
          class="email"
          type="email"
          placeholder="Your e-mail"
          @change="EmailChange($event.target.value)"
        >
      </div>

      <div class="container-i__input">
        Password
        <input
          class="passw"
          type="password"
          placeholder="Your password"
          @change="PasswChange($event.target.value)"
        >
      </div>
      <div
        class="input__forgot"
        @click="ForgotPassw"
      >
        Forgot password?
      </div>
      <div
        v-if="mostrarErrorLogin"
        class="input__forgot"
      >
        {{ errorSalidaLogin }}
      </div>
    </div>

    <div
      v-if="resetPass"
      class="container-i"
    >
      <div class="container-i__input">
        Email address
        <input
          class="email"
          type="email"
          placeholder="Your e-mail"
          @change="EmailChangeReset($event.target.value)"
        >
      </div>

      <div
        v-if="mostrarErrorReset"
        class="input__forgot"
      >
        {{ errorSalidaReset }}
      </div>
    </div>

    <div
      v-if="signUpActivo"
      class="container-i"
    >
      <div class="container-i__input">
        Nombre
        <input
          class="email"
          type="email"
          placeholder="Your name"
          @change="NameChange($event.target.value)"
        >
      </div>
      <div class="container-i__input">
        Email address
        <input
          class="email"
          type="email"
          placeholder="Your e-mail"
          @change="EmailChange($event.target.value)"
        >
      </div>

      <div class="container-i__input">
        Password
        <input
          class="passw"
          type="password"
          placeholder="Your password"
          @change="PasswChange($event.target.value)"
        >
      </div>
      <div
        v-if="mostrarErrorSign"
        class="input__forgot"
      >
        {{ errorSalidaSign }}
      </div>
    </div>
    <div>
      <UCSpinner v-if="showSpiner" />
    </div>
    <div>
      <f7-button
        class="btn-comprobar"
        raised
        round
        @click="VerificacionIdentidad"
      >
        {{ btnText }}
      </f7-button>
    </div>
  </f7-page>
</template>

<script>

import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail,
} from 'firebase/auth';
import { mapActions, mapState } from 'vuex';
import {
  doc, setDoc, getFirestore, getDoc,
} from 'firebase/firestore';
import UCSpinner from '@/components/UCSpinner.vue';

export default {
  components: {
    UCSpinner,
  },
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      loginActivo: true,
      signUpActivo: false,
      resetPass: false,
      btnText: 'Login', // texto del btono segun si es login o signup
      emaiValue: '',
      emailValueReset: '',
      passwValue: '',
      nameValue: '',
      mostrarErrorLogin: false,
      errorSalidaLogin: '',
      mostrarErrorSign: false,
      errorSalidaSign: '',
      mostrarErrorReset: false,
      errorSalidaReset: '',
      showSpiner: false,

    };
  },
  computed: {
    ...mapState(['loginNeeded', 'userData']),

  },
  methods: {
    ...mapActions(['setLoginNeeded', 'setUserData']),
    PressLogin() {
      this.btnText = 'Login';
      this.loginActivo = true;
      this.signUpActivo = false;
      this.resetPass = false;
      this.errorSalidaSign = '';
      this.errorSalidaReset = '';
    },
    PressSignUp() {
      this.btnText = 'SingUp';
      this.loginActivo = false;
      this.signUpActivo = true;
      this.resetPass = false;
      this.errorSalidaLogin = '';
      this.errorSalidaReset = '';
    },
    ForgotPassw() {
      this.loginActivo = false;
      this.signUpActivo = false;
      this.resetPass = true;
      this.errorSalidaLogin = '';
      this.errorSalidaSign = '';
      this.btnText = 'Reset Password';
    },
    SendEmail() {
      const auth = getAuth();
      this.showSpiner = true;
      this.loginActivo = false;
      this.signUpActivo = false;
      this.resetPass = false;
      sendPasswordResetEmail(auth, this.emailValueReset)
        .then(() => {
          this.showSpiner = false;
          this.loginActivo = false;
          this.signUpActivo = false;
          this.resetPass = true;
          this.mostrarErrorReset = true;
          this.errorSalidaReset = 'The email was sent correctly, check your spam tray';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/missing-email') {
            this.showSpiner = false;
            this.loginActivo = false;
            this.signUpActivo = false;
            this.resetPass = true;
            this.mostrarErrorReset = true;
            this.errorSalidaReset = 'Invalid email error';
          }
          this.showSpiner = false;
          this.loginActivo = false;
          this.signUpActivo = false;
          this.resetPass = true;
        });
    },
    EmailChange(val) {
      this.emaiValue = val;
    },
    EmailChangeReset(val) {
      this.emailValueReset = val;
    },
    PasswChange(val) {
      this.passwValue = val;
    },
    NameChange(val) {
      this.nameValue = val;
    },
    async getUserData() {
      const docRef = doc(getFirestore(), 'users', this.emaiValue);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        this.setUserData(docSnap.data().userData);
      }
      console.log('No such document!');
    },
    async VerificacionIdentidad() {
      if (this.btnText === 'Login') {
        this.showSpiner = true;
        this.loginActivo = false;
        this.signUpActivo = false;
        this.resetPass = false;
        signInWithEmailAndPassword(getAuth(), this.emaiValue, this.passwValue)
          .then((userCredential) => {
            const { user } = userCredential;
            console.log('Acceso correcto');
            console.log(user);
            this.setUserData({
              nombre: this.nameValue,
              correo: this.emaiValue,
              contraseña: this.passwValue,
            });
            this.getUserData();
            this.setLoginNeeded(false);
            this.f7router.navigate('/frPrincipal/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/invalid-email' || errorCode === 'auth/internal-error' || errorCode === 'auth/user-not-found') {
              this.mostrarErrorLogin = true;
              this.errorSalidaLogin = 'Invalid email or password';
              this.showSpiner = false;
              this.loginActivo = true;
              this.signUpActivo = false;
              this.resetPass = false;
            }
            if (errorCode === 'auth/wrong-password') {
              this.mostrarErrorLogin = true;
              this.errorSalidaLogin = 'Invalid password';
              this.showSpiner = false;
              this.loginActivo = true;
              this.signUpActivo = false;
              this.resetPass = false;
            }
            this.showSpiner = false;
            this.loginActivo = true;
            this.signUpActivo = false;
            this.resetPass = false;
            console.log(errorCode);
            console.log(errorMessage);
          });
      }
      if (this.btnText === 'SingUp') {
        if (this.nameValue !== '') {
          this.showSpiner = true;
          this.loginActivo = false;
          this.signUpActivo = false;
          this.resetPass = false;
          createUserWithEmailAndPassword(getAuth(), this.emaiValue, this.passwValue)
            .then((userCredential) => {
              const { user } = userCredential;
              console.log(user);
              setDoc(doc(getFirestore(), 'users', this.emaiValue), {
                userData: {
                  nombre: this.nameValue,
                  correo: this.emaiValue,
                  contraseña: this.passwValue,
                  apellido: '',
                  tel: 0,
                  genero: '',
                  direccion: '',
                },
                orders: [],

              });
              this.setUserData({
                nombre: this.nameValue,
                correo: this.emaiValue,
                contraseña: this.passwValue,
              });
              this.setLoginNeeded(false);
              this.f7router.navigate('/frPrincipal/');
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if (errorCode === 'auth/invalid-email') {
                this.mostrarErrorSign = true,
                this.errorSalidaSign = 'Invalid email';
                this.showSpiner = false;
                this.loginActivo = false;
                this.signUpActivo = true;
                this.resetPass = false;
              }
              if (errorCode === 'auth/weak-password') {
                this.mostrarErrorSign = true,
                this.errorSalidaSign = 'Minimum 6 characters for the password';
                this.showSpiner = false;
                this.loginActivo = false;
                this.signUpActivo = true;
                this.resetPass = false;
              }

              if (errorCode === 'auth/email-already-in-use') {
                this.mostrarErrorSign = true,
                this.errorSalidaSign = 'This email is already registered';
                this.showSpiner = false;
                this.loginActivo = false;
                this.signUpActivo = true;
                this.resetPass = false;
              }
              this.showSpiner = false;
              this.loginActivo = false;
              this.signUpActivo = true;
              this.resetPass = false;
              console.log(errorCode);
              console.log(errorMessage);
            });
        } else {
          this.mostrarErrorSign = true,
          this.errorSalidaSign = 'Complete all the fields to continue';
        }
      }

      if (this.btnText === 'Reset Password') {
        this.SendEmail();
      }
    },
  },

};
</script>

<style lang="scss" scoped>
.container-page{
    background: #F2F2F2;
    overflow-y: hidden;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    display: none;
}
.container-img{
    background: #FFFFFF;
    border-bottom-right-radius: 5vh ;
    border-bottom-left-radius: 5vh ;
}
.div-img{
    width: 100%;
    height: 35vh ;
    text-align: center;

    &__gorro{
        margin-top: 10vh;
        width: 20vh;
        height: 20vh;

    }
}
.img-gorro{
    width: 50%;
    height: 50%;
}
.btn-active{
    width: 50%;
    color: #000;
    border-bottom: 5px solid red;
}

.btn-off{
    background: white;
    color: #000;
}

//contenedor inputs email y passw
.container-i{
    width: 100%;
    height: 40vh ;
    margin-top: 3vh;

    &__input{
        margin-top: 5vh;
        margin-left: 7vh;

        width: 70%;
        color: #919191;
        font-weight:100 ;
        font-size: 18px;
        border-bottom: 2px solid black;
    }

    .email{
        width: 100%;
        color: black;
        font-weight:400 ;
        font-size: 20px;

    }
    .passw{
        width: 100%;
        color: black;
        font-weight:400 ;
        font-size: 20px;
    }
    .input__forgot{
        margin: 7vh;
        margin-top: 2vh;
        color: #F78962;
        font-size: 14px;
    }
}
.btn-comprobar{
    width: 75%;
    height: 7vh;
    font-weight: 500;
    margin-top: 5vh;
    margin-left: 5vh;
    background: #FF4B3A;
    color: white;
}
</style>
