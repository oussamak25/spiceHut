/* import selectors from '../model/selectors.js';

fixture('SpiceHut')
  .page('http://localhost:3000/#')
  .beforeEach(async (t) => {
    await t
      .click(selectors.btnGetStarted)
      .click(selectors.inputEmailLogin)
      .typeText(selectors.inputEmailLogin, 'oussamakajjoui2001@gmail.com')
      .click(selectors.inputPassLogin)
      .typeText(selectors.inputPassLogin, 'hola222')
      .click(selectors.btnAccess);
  });

test('Si pulsamos en el carrito con 0 elementos la vista del carrito no se abre', async (tc) => {
  await tc
    .click(selectors.btnCarrito)
    .expect(selectors.viewCarrito.visible).notOk();
});

test('Si pulsamos en el menu lateral se abre dicho menu y comprobamos la existencia de todas la paginas', async (tc) => {
  await tc
    .click(selectors.btnPanelIzquierdo)
    .expect(selectors.viewPanelIzquierdo.visible).ok()
    .click(selectors.btnProfile)
    .expect(selectors.viewProfile.visible).ok()
    .click(selectors.btnBackSideMenu)
    .click(selectors.btnPanelIzquierdo)
    .click(selectors.btnOrders)
    .expect(selectors.viewOrders.visible).ok()
    .click(selectors.btnBackSideMenu)
    .click(selectors.btnPanelIzquierdo)
    .click(selectors.btnAbout)
    .expect(selectors.viewAbout.visible).ok()
    .click(selectors.btnBackSideMenu)
    .click(selectors.btnPanelIzquierdo)
    .click(selectors.btnHorario)
    .expect(selectors.viewHorario.visible).ok()
    ;
});

test('Si pulsamos en el btn de salir Sign out, nos redirige a la pagina principal de la app', async (tc) => {
  await tc
    .click(selectors.btnPanelIzquierdo)
    .expect(selectors.viewPanelIzquierdo.visible).ok()
    .click(selectors.signOut)
    .expect(selectors.btnGetStarted.visible).ok();
});

test('Comprobamos que cargan los platos de main por defecto', async (tc) => {
  await tc
    .expect(selectors.platoDefecto1.visible).ok()
    .expect(selectors.platoDefecto2.visible).ok();
});

test('Comprobamos que si cambiamos a la opcion Drinks aparecen algunos elementos de ese menu', async (tc) => {
  await tc
    .click(selectors.itemMenuDrinks)
    .expect(selectors.platoDefectoDrink1.visible).ok()
    .expect(selectors.platoDefectoDrink2.visible).ok();
});

test('Si buscamos pj cola en el buscador debe de dar como resultado la aparicion de los dos elementos que contienen esa palabra', async (tc) => {
    await tc
      .click(selectors.inputBuscar)
      .typeText(selectors.inputBuscar, 'cola')
      .click(selectors.btnBuscar)
      .expect(selectors.viewFiltro.visible).ok()
      .expect(selectors.itemFiltro1.visible).ok()
      .expect(selectors.itemFiltro2.visible).ok();
  }); */

 
