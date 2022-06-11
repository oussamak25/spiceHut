import { shallowMount, mount } from '@vue/test-utils';
import UCSearchEntityERP from '@/components/UCSearchEntityERP.vue';


describe('Pruebas PCOussama ', () => {
  beforeEach(() => {

  });
  afterEach(() => {

  });
  test('Comprobar que si no le pasamos la prop placeholder el texto del input esta vacio', () => {
    const wrapper = shallowMount(UCSearchEntityERP);
    // console.log(typeof placeholder);
    expect(wrapper.find('[data-testId="inputBusqueda"]').attributes().placeholder).toBe('');
  });

  test('Si le pasamos el placeholder lo coloca donde corresponde', () => {
    const wrapper = shallowMount(UCSearchEntityERP, {
      propsData: {
        placeholder: 'Nuevo Placeholder',
      },
    });
    expect(wrapper.find('[data-testId="inputBusqueda"]').attributes().placeholder).toBe('Nuevo Placeholder');
  });

  test('Si le pasamos el titulo lo coloca donde corresponde', () => {
    const wrapper = shallowMount(UCSearchEntityERP, {
      propsData: {
        title: 'Hola Mundo',
      },
    });
    expect(wrapper.find('[data-testId="titulo"]').text()).toBe('Hola Mundo');
  });

  test('comprobamos el funcionamiento del metodo mounted con las propiedades por defecto ', () => {
    jest.clearAllMocks();
    const SelectEntity = jest.spyOn(UCSearchEntityERP.methods, 'SelectEntity');
    const SearchMode = jest.spyOn(UCSearchEntityERP.methods, 'SearchMode');
    const wrapper = shallowMount(UCSearchEntityERP);

    /* comporobamos que la propiedad popupSearchEntities esta a falso
    el metodo SearchMode se ejecuta una sola vez
    y que el metodo SelectEntity no se ejecuta ninguna vez porque
    la propiedad defaultValue
    esta en null */
    expect(wrapper.vm.popupSearchEntities).toBe(false);
    expect(SearchMode).toHaveBeenCalledTimes(1);
    expect(SelectEntity).toHaveBeenCalledTimes(0);
  });

  test('comprobamos el funcionamiento del metodo mounted con las propiedades (defaultValue) con valor distinto a null', () => {
    jest.clearAllMocks();
    const SelectEntity = jest.spyOn(UCSearchEntityERP.methods, 'SelectEntity');
    const SearchMode = jest.spyOn(UCSearchEntityERP.methods, 'SearchMode');
    const testValue = { nombre: 'prueba' };
    const wrapper = shallowMount(UCSearchEntityERP, {
      propsData: {
        defaultValue: testValue,
      },
    });
    expect(wrapper.vm.popupSearchEntities).toBe(false);
    expect(SearchMode).toHaveBeenCalledTimes(1);
    expect(SelectEntity).toHaveBeenCalledTimes(1);
    expect(SelectEntity).toHaveBeenLastCalledWith(testValue, false);
  });

  test('Si cambiamos la prop (defaultValue) se ejecuta su respectivo watch', async () => {
    jest.clearAllMocks();
    const defaultValueWatch = jest.spyOn(UCSearchEntityERP.watch, 'defaultValue');
    const SelectEntity = jest.spyOn(UCSearchEntityERP.methods, 'SelectEntity');
    const Clear = jest.spyOn(UCSearchEntityERP.methods, 'Clear');

    const wrapper = shallowMount(UCSearchEntityERP, {
      propsData: {
        defaultValue: { nombre: 'a' },
      },
    });
    /* Si el valor nuevo es distinto de  null se debe de ejecutar el metodo selectEntity con los valores correctos
    */
    const testValue = { nombre: 'prueba' };
    await wrapper.setProps({ defaultValue: testValue });
    expect(defaultValueWatch).toHaveBeenCalledTimes(1);
    // esperamos que el metodo selectEntity se haya ejecutado 2 veces una vez en el mounted
    // y otra al ejecutar el watch de defaultValue
    expect(SelectEntity).toHaveBeenCalledTimes(2);
    expect(SelectEntity).toHaveBeenLastCalledWith(testValue, false);

    /* Si el nuevo valor de defaultValue es nulo llama al metodo clear Y no se llama
    a  */
    jest.clearAllMocks();
    await wrapper.setProps({ defaultValue: null });
    expect(Clear).toHaveBeenCalledTimes(1);
    expect(SelectEntity).toHaveBeenCalledTimes(0);
  });

  test('prueba pulsacion btn', async () => {
    jest.clearAllMocks();
    const SearchInputSelection = jest.spyOn(UCSearchEntityERP.methods, 'SearchInputSelection');
    const wrapper = shallowMount(UCSearchEntityERP, {
      propsData: {
        defaultValue: { nombre: 'a' },
      },
    });
    console.log(UCSearchEntityERP.methods);
    const btnLupa = wrapper.find('[data-testId="btnLupa"]');
    await btnLupa.trigger('click');
    expect(SearchInputSelection).toHaveBeenCalledTimes(1);
  });


  test('CPA001-Comprobar búsquedas por código que retorna resultado nulo', async () => {
    jest.clearAllMocks();
    const GenerarNotificacion = jest.spyOn(UCSearchEntityERP.methods, 'GenerarNotificacion');
    const ValidateEntity = jest.spyOn(UCSearchEntityERP.methods, 'ValidateEntity');
    const funcionPrueba = () => new Promise((resolve, reject) => {
      resolve({ data: {} }, { statusText: 'OK' });
    });


    const wrapper = shallowMount(UCSearchEntityERP, {
      propsData: {
        endPointForCodeSearch: funcionPrueba,
      },
    });
    await wrapper.setProps({ searchByCode: '00' });


    expect(ValidateEntity).toHaveBeenCalledTimes(1);
    //expect(GenerarNotificacion).toHaveBeenCalledTimes(1);
  });
});
