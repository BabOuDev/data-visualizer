import {shallowMount} from '@vue/test-utils';
import DataTable from '@/components/table/DataTable.vue';

describe('DataTable.vue', () => {
  it('should renders correctly', () => {
    const component = shallowMount(DataTable, {
      props: {
        rows: [
          {colName: 'A'},
          {colName: 'B'},
          {colName: 'C'},
        ],
        columns: [{path: ['colName'], label: 'ColName', renderer: (row, paths)=>row[paths[0]]}],
      },
    });
    expect(component.html()).toMatchSnapshot();
  });
});
