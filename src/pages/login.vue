<template>
  <f7-page class="container-page">
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
        >
      </div>

      <div class="container-i__input">
        Password
        <input
          class="passw"
          type="password"
          placeholder="Your password"
        >
      </div>
      <div class="input__forgot">
        Forgot password?
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
          placeholder="Your e-mail"
        >
      </div>
      <div class="container-i__input">
        Email address
        <input
          class="email"
          type="email"
          placeholder="Your e-mail"
        >
      </div>

      <div class="container-i__input">
        Password
        <input
          class="passw"
          type="password"
          placeholder="Your password"
        >
      </div>
      <div class="input__forgot">
        Forgot password?
      </div>
    </div>
    <div>
      <f7-button
        class="btn-comprobar"
        raised
        round
      >
        {{ btnText }}
      </f7-button>
    </div>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      loginActivo: true,
      signUpActivo: false,
      traspasos: true, // pestaña de traspasos
      reprocesados: false, // pestaña de reprocesados
      btnText: 'Login', // texto del btono segun si es login o signup
    };
  },
  methods: {
    PressLogin() {
      this.btnText = 'Login';
      this.loginActivo = true;
      this.signUpActivo = false;
    },
    PressSignUp() {
      this.btnText = 'SingUp';
      this.loginActivo = false;
      this.signUpActivo = true;
    },
  },

};
</script>

<style lang="scss" scoped>
.container-page{
    background: #F2F2F2;
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
