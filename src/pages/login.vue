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
          id="btn-login"
          :class="{ 'btn-active': loginActivo, 'btn-off': signUpActivo }"
          @click="PressLogin"
        >
          Login
        </f7-button>
        <f7-button
          id="btn-sign"
          :class="{ 'btn-active': signUpActivo, 'btn-off': loginActivo }"
          @click="PressSignUp"
        >
          Sign-up
        </f7-button>
      </div>
    </div>
    <div
      v-if="loginActivo"
      id="login-view"
      class="container-i"
    >
      <div class="container-i__input">
        Email address
        <input
          id="input-email-login"
          class="email"
          type="email"
          placeholder="Your e-mail"
          @change="EmailChange($event.target.value)"
        >
      </div>

      <div class="container-i__input">
        Password
        <input
          id="input-passw-login"
          class="passw"
          type="password"
          placeholder="Your password"
          @change="PasswChange($event.target.value)"
        >
      </div>
      <div
        id="forgot-passw"
        class="input__forgot"
        @click="ForgotPassw"
      >
        Forgot password?
      </div>
      <div
        v-if="mostrarErrorLogin"
        id="error-login"
        class="input__forgot"
      >
        {{ errorSalidaLogin }}
      </div>
    </div>

    <div
      v-if="resetPass"
      id="reset-pass-view"
      class="container-i"
    >
      <div class="container-i__input">
        Email address
        <input
          id="input-reset-pass"
          class="email"
          type="email"
          placeholder="Your e-mail"
          @change="EmailChangeReset($event.target.value)"
        >
      </div>

      <div
        v-if="mostrarErrorReset"
        id="error-reset"
        class="input__forgot"
      >
        {{ errorSalidaReset }}
      </div>
    </div>

    <div
      v-if="signUpActivo"
      id="sign-view"
      class="container-i"
    >
      <div class="container-i__input">
        Nombre
        <input
          id="input-name-Sign-up"
          class="email"
          type="email"
          placeholder="Your name"
          @change="NameChange($event.target.value)"
        >
      </div>
      <div class="container-i__input">
        Email address
        <input
          id="input-email-Sign-up"
          class="email"
          type="email"
          placeholder="Your e-mail"
          @change="EmailChange($event.target.value)"
        >
      </div>

      <div class="container-i__input">
        Password
        <input
          id="input-passw-Sign-up"
          class="passw"
          type="password"
          placeholder="Your password"
          @change="PasswChange($event.target.value)"
        >
      </div>
      <div
        v-if="mostrarErrorSign"
        id="error-sign"
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
        id="btn-access"
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
/* Importaciones necesarias */
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
  /* variables reactivas */
  data() {
    return {
      loginActivo: true, // por defecto el login esta activo pero una vez que te logueas no vuelves a loguearte hasta que pulses el boton de salir
      signUpActivo: false, // control de pantalla a mostrar
      resetPass: false, // mostrar pantalla resetpassw
      btnText: 'Login', // texto del btono segun si es login o signup
      emaiValue: '', // valor del email
      emailValueReset: '', // valor del email al recuperar la contraseña
      passwValue: '', // valor de la contraseña
      nameValue: '', // valor del nombre del usuario
      mostrarErrorLogin: false, // control de la muestra del error del login
      errorSalidaLogin: '', // mensajeLogin
      mostrarErrorSign: false, // control de la muestra del error del sign up
      errorSalidaSign: '', // mensajeSign
      mostrarErrorReset: false, // control de la muestra del error del reset passw
      errorSalidaReset: '', // mensajeReset
      showSpiner: false, // control de la muestra del spinner

    };
  },
  computed: {
    /* variables del state de nuestro store */
    ...mapState(['loginNeeded', 'userData']),

  },
  methods: {
    /* acciones para cambiar el state de nuesto store */
    ...mapActions(['setLoginNeeded', 'setUserData']),
    /* metodo que se ejecuta al pulsar el btn de login cambia las
    varibles necesarias para mostrar solo la parte de login y se ocultan las demas partes */
    PressLogin() {
      this.btnText = 'Login';
      this.loginActivo = true;
      this.signUpActivo = false;
      this.resetPass = false;
      this.errorSalidaSign = '';
      this.errorSalidaReset = '';
    },
    /* metodo que se ejecuta al pulsar el btn de SignUp cambia las
    varibles necesarias para mostrar solo la parte de login y se ocultan las demas partes */
    PressSignUp() {
      this.btnText = 'SingUp';
      this.loginActivo = false;
      this.signUpActivo = true;
      this.resetPass = false;
      this.errorSalidaLogin = '';
      this.errorSalidaReset = '';
    },
    /* metodo que se ejecuta al pulsar el btn de forgotPassw cambia las
    varibles necesarias para mostrar solo la parte de login y se ocultan las demas partes */
    ForgotPassw() {
      this.loginActivo = false;
      this.signUpActivo = false;
      this.resetPass = true;
      this.errorSalidaLogin = '';
      this.errorSalidaSign = '';
      this.btnText = 'Reset Password';
    },
    /* metodo que se ejecuta cuando se nos olvida la contraseña y enviamos un email para recuperar */
    SendEmail() {
      /* cuando se ejecuta mostramos el spinner mientras se ejecuta la operacion
      establecemos las varibales necesarias para mostrar solo el spinner */
      const auth = getAuth();
      this.showSpiner = true;
      this.loginActivo = false;
      this.signUpActivo = false;
      this.resetPass = false;
      /* usamos el metod sendPasswordResetEmail de firebase para enviar un correo de recuperacion
      al correo que indica el usuario  */
      sendPasswordResetEmail(auth, this.emailValueReset)
        .then(() => {
          /* si la accion se ejecuta con exito quitamos el spinner mostramos la pantalla normal
           con el mensaje diciendo que se ha enviado correctamente  */
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
          /* si pulsamo el boton sin un email salta este error */
          if (errorCode === 'auth/missing-email') {
            this.showSpiner = false;
            this.loginActivo = false;
            this.signUpActivo = false;
            this.resetPass = true;
            this.mostrarErrorReset = true;
            this.errorSalidaReset = 'Invalid email error';
          }
          this.mostrarErrorReset = true;
          this.errorSalidaReset = 'Invalid email error';
          this.showSpiner = false;
          this.loginActivo = false;
          this.signUpActivo = false;
          this.resetPass = true;
        });
    },
    /* metodos que controlan los cambios en los input de la pagina si cambia un input
    cambiamoso una varibale local reactiva  */
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
    /* metodo getUserData obtiene la informacion personal del usuario de la base de datos
    firebase  y la guarda en el store */
    async getUserData() {
      const docRef = doc(getFirestore(), 'users', this.emaiValue);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        this.setUserData(docSnap.data().userData);
      }
      console.log('No such document!');
    },
    /* metodo VerificacionIdentidad   */
    async VerificacionIdentidad() {
      /* si el boton principal tiene la palabra login se ejecuta la funcionalidad del login */
      if (this.btnText === 'Login') {
        this.showSpiner = true;
        this.loginActivo = false;
        this.signUpActivo = false;
        this.resetPass = false;
        /* metodo login de firebase al que le pasamos un email y una contraseña  */
        signInWithEmailAndPassword(getAuth(), this.emaiValue, this.passwValue)
          .then((userCredential) => {
            /* si el login es correcto metemos los datos del usuario en el store  */
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
            /* navegamos a la pagina principal */
            this.f7router.navigate('/frPrincipal/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            /* si el error code es alguno de los siguientes aparece el error Invalida
             email or passw */
            if (errorCode === 'auth/invalid-email' || errorCode === 'auth/internal-error' || errorCode === 'auth/user-not-found') {
              this.mostrarErrorLogin = true;
              this.errorSalidaLogin = 'Invalid email or password';
              this.showSpiner = false;
              this.loginActivo = true;
              this.signUpActivo = false;
              this.resetPass = false;
            }
            /* si es el siguiente  es que la contraseña es incorrecta */
            if (errorCode === 'auth/wrong-password') {
              this.mostrarErrorLogin = true;
              this.errorSalidaLogin = 'Invalid password';
              this.showSpiner = false;
              this.loginActivo = true;
              this.signUpActivo = false;
              this.resetPass = false;
            }
            /* en cualquier caso de error se desactiva el spinner se activa el login y se desactivan
            las opciones que no necesitamos */
            this.showSpiner = false;
            this.loginActivo = true;
            this.signUpActivo = false;
            this.resetPass = false;
            console.log(errorCode);
            console.log(errorMessage);
          });
      }
      /* si el texto del btn es SignUp ejecutamos el siguiente codigo  */
      if (this.btnText === 'SingUp') {
        /* el campo nombre es obligatorio por lo que si esta vacio saltara un error */
        if (this.nameValue !== '') {
          this.showSpiner = true;
          this.loginActivo = false;
          this.signUpActivo = false;
          this.resetPass = false;
          /* llamamos al metodo correcto de firebase para crear un usuario  */
          createUserWithEmailAndPassword(getAuth(), this.emaiValue, this.passwValue)
            .then((userCredential) => {
              const { user } = userCredential;
              console.log(user);
              /* si se crea correctamente creamos la siguiente estructura  */
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
              /* segun el codigo de error mostrarmos un mensaje u otro y en todo caso
              controlamos el cambio de ventanas es decir lo que se muestra en cada momento */
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
      /* si el btn tiene el siguiente texto se llama al metodo send email */
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
