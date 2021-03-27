import {shallowMount} from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('BarChart.vue', () => {
  it('renders pie chart when data passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: {msg},
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
