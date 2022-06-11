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
      .click(selectors.btnAccess)
      .click(selectors.platoDefecto1)
      .click(selectors.btnAddCard)
      .click(selectors.platoDefecto2)
      .click(selectors.btnAddCard)
      .click(selectors.btnCarrito);
  });

test('Comprobamos que se abre la pagina del carrito cuando tenemos elementos en el y que los elementos son los correctos', async (tc) => {
  await tc
    .expect(selectors.viewCarrito.visible).ok()
    .expect(selectors.itemCarrito1.visible).ok()
    .expect(selectors.itemCarrito2.visible)
    .ok();
});

test('Comprobamos que se abre el pop up de hora y fecha al pulsar complete order', async (tc) => {
  await tc
    .expect(selectors.viewCarrito.visible).ok()
    .click(selectors.btnCompleteOrder)
    .expect(selectors.popUpConfirmar.visible).ok();
}); */
