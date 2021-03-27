import {shallowMount} from '@vue/test-utils';
import Switch from '@/components/filters/Switch.vue';

describe('Switch.vue', () => {
  it('should renders correctly', () => {
    const component = shallowMount(Switch, {
      props: {
        modelValue: true,
      },
    });
    expect(component.html()).toMatchSnapshot();
  });
});
