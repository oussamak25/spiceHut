import selectors from '../model/selectors.js';

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

test('Hacer login con datos correctos sin problemas por default', async (tc) => {
  await tc
    .click(selectors.inputEmailLogin)
    .typeText(selectors.inputEmailLogin, 'oussamakajjoui2001@gmail.com')
    .click(selectors.inputPassLogin)
    .typeText(selectors.inputPassLogin, 'hola222')
    .expect(selectors.btnAccess.textContent).eql('Login')
    .click(selectors.btnAccess)
    .expect(selectors.pagePrincipal.visible).ok();
});
