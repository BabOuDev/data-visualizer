import {shallowMount} from '@vue/test-utils';
import SidePanel from '@/components/panel/SidePanel.vue';

describe('SidePanel.vue', () => {
  it('should renders correctly', () => {
    const component = shallowMount(SidePanel, {
      props: {
        row: {col1: 'A', col2: 'B', col3: 3},
        columns: [
          {path: 'col1', label: 'Col1', type: 'text'},
          {path: 'col2', label: 'Col2', type: 'select', options: ['B1', 'B2', 'B3']},
          {path: 'col3', label: 'Col3', type: 'number'},
        ],
      },
    });
    expect(component.html()).toMatchSnapshot();
  });
});
