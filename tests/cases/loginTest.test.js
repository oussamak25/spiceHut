/* import selectors from '../model/selectors.js';

 fixture('SpiceHut')
  .page('http://localhost:3000/#')
  .beforeEach(async (t) => {
    await t
      .click(selectors.btnGetStarted);
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

 test('Hacer login con un email incorrecto', async (tc) => {
  await tc
    .click(selectors.inputEmailLogin)
    .typeText(selectors.inputEmailLogin, 'oussamakajjoui2001111@gmail.com')
    .click(selectors.inputPassLogin)
    .typeText(selectors.inputPassLogin, 'hola222')
    .expect(selectors.btnAccess.textContent).eql('Login')
    .click(selectors.btnAccess)
    .expect(selectors.pagePrincipal.visible).notOk()
    .expect(selectors.textErrorLogin.visible).ok()
    .expect(selectors.textErrorLogin.textContent).eql('Invalid email or password');
});

test('Hacer login con un email correcto y una contraseña invalida', async (tc) => {
  await tc
    .click(selectors.inputEmailLogin)
    .typeText(selectors.inputEmailLogin, 'oussamakajjoui2001@gmail.com')
    .click(selectors.inputPassLogin)
    .typeText(selectors.inputPassLogin, 'hola22ssss2')
    .expect(selectors.btnAccess.textContent).eql('Login')
    .click(selectors.btnAccess)
    .expect(selectors.pagePrincipal.visible).notOk()
    .expect(selectors.textErrorLogin.visible).ok()
    .expect(selectors.textErrorLogin.textContent).eql('Invalid password');
});

test('Pulsar Sign UP y registrarse con email invalido ', async (tc) => {
  await tc
    .click(selectors.btnSign)
    .click(selectors.inputNameSign)
    .typeText(selectors.inputNameSign, 'oussama')
    .click(selectors.inputEmailSign)
    .typeText(selectors.inputEmailSign, 'oussamaaaaaaaaaaaaaaaaaaagmaaaail.com')
    .click(selectors.inputPassSign)
    .typeText(selectors.inputPassSign, 'hola222')
    .expect(selectors.btnAccess.textContent).eql('SingUp')
    .click(selectors.btnAccess)
    .expect(selectors.pagePrincipal.visible).notOk()
    .expect(selectors.textErrorSign.visible).ok()
    .expect(selectors.textErrorSign.textContent).eql('Invalid email');
});

test('Pulsar Sign UP y registrarse con pasww de menos de 6 digitos', async (tc) => {
  await tc
    .click(selectors.btnSign)
    .click(selectors.inputNameSign)
    .typeText(selectors.inputNameSign, 'oussama')
    .click(selectors.inputEmailSign)
    .typeText(selectors.inputEmailSign, 'oussamakajjoui@gmail.com')
    .click(selectors.inputPassSign)
    .typeText(selectors.inputPassSign, '123')
    .expect(selectors.btnAccess.textContent).eql('SingUp')
    .click(selectors.btnAccess)
    .expect(selectors.pagePrincipal.visible).notOk()
    .expect(selectors.textErrorSign.visible).ok()
    .expect(selectors.textErrorSign.textContent).eql('Minimum 6 characters for the password');
});

test('Pulsar Sign UP y registrarse con email ya existente', async (tc) => {
  await tc
    .click(selectors.btnSign)
    .click(selectors.inputNameSign)
    .typeText(selectors.inputNameSign, 'oussama')
    .click(selectors.inputEmailSign)
    .typeText(selectors.inputEmailSign, 'oussamakajjoui2001@gmail.com')
    .click(selectors.inputPassSign)
    .typeText(selectors.inputPassSign, 'hola222')
    .expect(selectors.btnAccess.textContent).eql('SingUp')
    .click(selectors.btnAccess)
    .expect(selectors.pagePrincipal.visible).notOk()
    .expect(selectors.textErrorSign.visible).ok()
    .expect(selectors.textErrorSign.textContent).eql('This email is already registered');
});

test('Pulsar Forgot password y enviar un email recuperacion correcto', async (tc) => {
  await tc
    .click(selectors.btnForgotPassw)
    .click(selectors.inputResetPass)
    .typeText(selectors.inputResetPass, 'oussamakajjoui2001@gmail.com')
    .expect(selectors.btnAccess.textContent).eql('Reset Password')
    .click(selectors.btnAccess)
    .expect(selectors.textErrorReset.visible).ok()
    .expect(selectors.textErrorReset.textContent).eql('The email was sent correctly, check your spam tray');
});

test('Pulsar Forgot password y enviar un email recuperacion incorrecto', async (tc) => {
  await tc
    .click(selectors.btnForgotPassw)
    .click(selectors.inputResetPass)
    .typeText(selectors.inputResetPass, 'oussamakajjoui2001111111111gmail.com')
    .expect(selectors.btnAccess.textContent).eql('Reset Password')
    .click(selectors.btnAccess)
    .expect(selectors.textErrorReset.visible).ok()
    .expect(selectors.textErrorReset.textContent).eql('Invalid email error');
}); */
