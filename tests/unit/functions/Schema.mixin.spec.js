import {shallowMount} from '@vue/test-utils';
import Schema from '@/mixins/Schema.mixin';

const Component = {
  render() {},
  mixins: [Schema],
};
const instance = shallowMount(Component);

describe('Schema.mixin', () => {
  it('should ensure that the list of columns to filter on is correct', ()=>{
    expect(instance.vm.columnsToFilterOn.length).toBe(4);
  });

  it('should ensure that the list of columns to edit is correct', ()=>{
    expect(instance.vm.columnsToEdit.length).toBe(14);
  });

  it('should ensure that the list of columns to display is correct', ()=>{
    expect(instance.vm.columnsToDisplay.length).toBe(9);
  });

  it('should ensure that the list of columns to draw chart for is correct', ()=>{
    expect(instance.vm.columnsToChart.length).toBe(4);
  });

  it('should ensure that getColorStyle function is returning proper result', () => {
    expect(instance.vm.getColorStyle('color'));
    instance.vm.sortingColumn = 'col1';
    instance.vm.sortingAsc = true;
    instance.vm.getColorStyle({label: 'col1'});
    instance.vm.sortingColumn = 'col1';
    instance.vm.sortingAsc = false;
  });
});
