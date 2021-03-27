import {shallowMount} from '@vue/test-utils';
import ChartWrapper from '@/components/charts/ChartWrapper.vue';

describe('ChartWrapper.vue', () => {
  it('should renders correctly', () => {
    const component = shallowMount(ChartWrapper, {
      props: {
        rows: [
          {colName: 'A'},
          {colName: 'B'},
          {colName: 'B'},
          {colName: 'C'},
          {colName: 'C'},
          {colName: 'C'},
        ],
        col: {path: 'colName'},
      },
    });
    expect(component.html()).toMatchSnapshot();
  });
});
