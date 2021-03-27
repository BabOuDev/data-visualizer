import {shallowMount} from '@vue/test-utils';
import PieChart from '@/components/charts/PieChart.vue';

describe('PieChart.vue', () => {
  it('should renders correctly', () => {
    const component = shallowMount(PieChart, {
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
    expect(component.html()).toMatch('A');
    expect(component.html()).toMatch('B');
    expect(component.html()).toMatch('C');
    expect(component.html()).toMatchSnapshot();
  });
});
