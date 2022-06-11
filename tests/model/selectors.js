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
    this.viewCarrito = Selector('#view-carrito');
    this.viewPanelIzquierdo = Selector('#view-panel-izquierdo');
    this.btnCarrito = Selector('#btn-carrito');
    this.btnPanelIzquierdo = Selector('#btn-panel-izquierdo');

    this.btnProfile = Selector('#btn-profile');
    this.btnOrders = Selector('#btn-orders');
    this.btnAbout = Selector('#btn-about');
    this.btnHorario = Selector('#btn-horario');
    this.signOut = Selector('#btn-sign-out');

    this.btnBackSideMenu = Selector('.icon-back');
    // vistar menu lateral
    this.viewProfile = Selector('#view-profile');
    this.viewOrders = Selector('#view-orders');
    this.viewAbout = Selector('#view-about');
    this.viewHorario = Selector('#view-horario');

    // platos por defecto
    this.platoDefecto1 = Selector('.item').withExactText('Chicken Tikka');
    this.platoDefecto2 = Selector('.item').withExactText('Lamb Tikka');

    // platos al pulsar un item de menu en seste caso drinks
    this.itemMenuDrinks = Selector('#item-menu-drinks');
    this.platoDefectoDrink1 = Selector('.item').withExactText('Coca Cola');
    this.platoDefectoDrink2 = Selector('.item').withExactText('Lemon Fanta');

    // buscador
    this.inputBuscar = Selector('#input-busqueda');
    this.btnBuscar = Selector('#btn-buscar');
    this.viewFiltro = Selector('#view-filtro');
    this.itemFiltro1 = Selector('.item').withExactText('Coca Cola');
    this.itemFiltro2 = Selector('.item').withExactText('Coca Cola 0%');

    // add card btn

    this.btnAddCard = Selector('.btn-add');

    // carrito items a comprobar
    this.itemCarrito1 = Selector('.nombre').withExactText('Chicken Tikka');
    this.itemCarrito2 = Selector('.nombre').withExactText('Lamb Tikka');

    this.btnCompleteOrder = Selector('.btn-order');
    this.popUpConfirmar = Selector('.pop-up-confirm');
  }
}

export default new Page();
