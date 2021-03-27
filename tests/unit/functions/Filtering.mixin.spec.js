import {shallowMount} from '@vue/test-utils';
import Filtering from '@/mixins/Filtering.mixin';

const Component = {
  render() {},
  data() {
    return {
      modelValue: [
        {col1: 'A', col2: 'A', col3: 'A'},
        {col1: 'B', col2: 'B', col3: 'B'},
        {col1: 'C', col2: 'C', col3: 'C'},
      ],
      search: '',
      filters: [],
      enableFilter: true,
    };
  },
  mixins: [Filtering()],
};
const instance = shallowMount(Component);

describe('Filtering.mixin', () => {
  it('should ensure that filtering is returning a full array when no filter or search are applied', ()=>{
    expect(instance.vm.filteredPeople.length).toBe(3);
  });

  it('should ensure that filtering is returning a filtered array when search applied', ()=>{
    instance.setData({search: 'A', filters: []});
    expect(instance.vm.filteredPeople.length).toBe(1);
  });

  it('should ensure that filtering is returning a filtered array when filters applied', ()=>{
    instance.setData({search: '', filters: [{path: 'col1', values: ['A', 'B']}]});
    expect(instance.vm.filteredPeople.length).toBe(2);
  });

  it('should ensure that filtering is returning a filtered array when search and filters applied', ()=>{
    instance.setData({search: 'B', filters: [{path: 'col1', values: ['A', 'B']}]});
    expect(instance.vm.filteredPeople.length).toBe(1);
  });

  it('should ensure that objectToString function is returning proper result', () => {
    const result = Filtering().methods.objectToString({col1: 'A', col2: 'B', nested: {col3: 'C'}});
    expect(result).toBe('A B C');
  });
});
