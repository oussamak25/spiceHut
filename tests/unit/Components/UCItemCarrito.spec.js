import { shallowMount, mount } from '@vue/test-utils';
import UCItemCarrito from '@/components/UCItemCarrito.vue';

describe('Pruebas UCItemCarrito ', () => {
  beforeEach(() => {

  });
  afterEach(() => {

  });

  test('Comprobar que el snapshowt siempre sea el mismo que no hay cambios en el componente', () => {
    const wrapper = shallowMount(UCItemCarrito);

    expect(wrapper.html()).toMatchSnapshot();
  });


});
