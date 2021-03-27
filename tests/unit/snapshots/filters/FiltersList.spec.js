import {shallowMount} from '@vue/test-utils';
import FiltersList from '@/components/filters/FiltersList.vue';

describe('FiltersList.vue', () => {
  it('should renders correctly', () => {
    const component = shallowMount(FiltersList, {
      props: {
        modelValue: [{column: 'ColName', values: ['A', 'B']}],
      },
    });
    expect(component.html()).toMatchSnapshot();
  });
});
