import { Selector } from 'testcafe';

class Page {
  constructor() {
    // selectores pagina login
    this.btnGetStarted = Selector('#btn-get-starteed');
    this.btnAccess = Selector('#btn-access');
    this.inputEmailLogin = Selector('#input-email-login');
    this.inputPassLogin = Selector('#input-passw-login');
    this.btnForgotPassw = Selector('#forgot-passw');
    this.textErrorLogin = Selector('#error-login');
    this.pagePrincipal = Selector('#page-principal');
    this.inputNameSign = Selector('#input-name-Sign-up');
    this.inputEmailSign = Selector('#input-email-Sign-up');
    this.inputPassSign = Selector('#input-passw-Sign-up');
    this.btnLogin = Selector('#btn-login');
    this.btnSign = Selector('#btn-sign');
    this.textErrorSign = Selector('#error-sign');
    this.viewReset = Selector('#reset-pass-view');
    this.viewLogin = Selector('#login-view');
    this.viewReset = Selector('#sign-view');
    this.inputResetPass = Selector('#input-reset-pass');
    this.textErrorReset = Selector('#error-reset');

    // selectores pagina principal
  }
}

export default new Page();
