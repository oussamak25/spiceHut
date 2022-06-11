import { shallowMount, mount } from '@vue/test-utils';
import UCItemCarrito from '@/components/UCItemCarrito.vue';

describe('Pruebas UCItemCarrito ', () => {
  beforeEach(() => {

  });
  afterEach(() => {

  });

  /*   test('Comprobar que el snapshowt siempre sea el mismo que no hay cambios en el componente', () => {
    const wrapper = shallowMount(UCItemCarrito, {
      props: {
        plato: {
          img: 'http',
          nombre: 'Prueba',
          cantidad: 1,
          precio: 2.5,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  }); */

  test('Comprobar que se llama al metodo increment al pulsar en el botn +', () => {
    const Increment = jest.spyOn(UCItemCarrito.methods, 'Increment');

    const wrapper = shallowMount(UCItemCarrito, {
      props: {
        plato: {
          img: 'http',
          nombre: 'Prueba',
          cantidad: 1,
          precio: 2.5,
        },
      },
    });
    const btnIncrement = wrapper.find('[data-testId="btnIncrement"]');
    btnIncrement.trigger('click');
    expect(Increment).toHaveBeenCalledTimes(1);
  });

  test('Comprobar que se llama al metodo Decrement al pulsar en el botn -', () => {
    const Decrement = jest.spyOn(UCItemCarrito.methods, 'Decrement');

    const wrapper = shallowMount(UCItemCarrito, {
      props: {
        plato: {
          img: 'http',
          nombre: 'Prueba',
          cantidad: 1,
          precio: 2.5,
        },
      },
    });
    const btnIncrement = wrapper.find('[data-testId="btnDecrement"]');
    btnIncrement.trigger('click');
    expect(Decrement).toHaveBeenCalledTimes(1);
  });

  test('Comprobar que se llama al metodo Decrement y que el valor de la cantidad sigue igual por que el minimo es 1', async () => {
    const wrapper = shallowMount(UCItemCarrito, {
      props: {
        plato: {
          img: 'http',
          nombre: 'Prueba',
          cantidad: 1,
          precio: 2.5,
        },
      },
    });
    const valorCantidad = wrapper.find('[data-testId="txtCantidad"]');
    const btnIncrement = wrapper.find('[data-testId="btnDecrement"]');
    await btnIncrement.trigger('click');
    expect(valorCantidad.text()).toBe('1');
  });

  test('Comprobar que al pasarle como cantidad un 3 y decrementar pasamos a tener el valor 2', async () => {
    const wrapper = shallowMount(UCItemCarrito, {
      props: {
        plato: {
          img: 'http',
          nombre: 'Prueba',
          cantidad: 3,
          precio: 2.5,
        },
      },
    });
    const valorCantidad = wrapper.find('[data-testId="txtCantidad"]');
    const btnDecrement = wrapper.find('[data-testId="btnDecrement"]');
    await btnDecrement.trigger('click');
    expect(valorCantidad.text()).toBe('2');
  });

  test('Comprobar que se llama al metodo Increment y que el valor de la cantidad sigue igual por que el maximo es 20', async () => {
    const wrapper = shallowMount(UCItemCarrito, {
      props: {
        plato: {
          img: 'http',
          nombre: 'Prueba',
          cantidad: 20,
          precio: 2.5,
        },
      },
    });
    const valorCantidad = wrapper.find('[data-testId="txtCantidad"]');
    const btnIncrement = wrapper.find('[data-testId="btnIncrement"]');
    await btnIncrement.trigger('click');
    expect(valorCantidad.text()).toBe('20');
  });

  test('Comprobar que al pasarle como cantidad un 5 y decrementar pasamos a tener el valor 6', async () => {

    const wrapper = shallowMount(UCItemCarrito, {
      props: {
        plato: {
          img: 'http',
          nombre: 'Prueba',
          cantidad: 5,
          precio: 2.5,
        },
      },
    });
    const valorCantidad = wrapper.find('[data-testId="txtCantidad"]');
    const btnIncrement = wrapper.find('[data-testId="btnIncrement"]');
    await btnIncrement.trigger('click');
    expect(valorCantidad.text()).toBe('6');
  });
});
