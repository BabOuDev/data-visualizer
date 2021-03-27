import {shallowMount} from '@vue/test-utils';
import FiltersForm from '@/components/filters/FiltersForm.vue';

describe('FiltersForm.vue', () => {
  it('should renders correctly', () => {
    const component = shallowMount(FiltersForm, {
      props: {
        modelValue: [],
        columns: [{path: ['colName'], label: 'ColName'}],
      },
    });
    expect(component.html()).toMatchSnapshot();
  });
});
