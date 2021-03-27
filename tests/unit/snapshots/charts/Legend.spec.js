import {shallowMount} from '@vue/test-utils';
import Legend from '@/components/charts/Legend.vue';

describe('Legend.vue', () => {
  it('should renders correctly', () => {
    const component = shallowMount(Legend, {
      props: {
        keys: ['A', 'B', 'C'],
        colors: ['#f00', '#0f0', '#00f'],
      },
    });
    expect(component.html()).toMatch('A');
    expect(component.html()).toMatch('B');
    expect(component.html()).toMatch('C');
    expect(component.html()).toMatchSnapshot();
  });
});
