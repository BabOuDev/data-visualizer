import {shallowMount} from '@vue/test-utils';
import Sorting from '@/mixins/Sorting.mixin';

const Component = {
  render() {},
  data() {
    return {
      rows: [
        {col1: 'B', col2: 'C', col3: 'C'},
        {col1: 'A', col2: 'A', col3: 'B'},
        {col1: 'C', col2: 'B', col3: 'A'},
      ],
      columns: [
        {
          label: 'col1',
          path: ['col1'],
          renderer: (value)=>value['col1'],
          sort: true,
        },
        {
          label: 'col2',
          path: ['col2'],
          renderer: (value)=>value['col2'],
          sort: true,
        },
        {
          label: 'col3',
          path: ['col3'],
          renderer: (value)=>value['col3'],
          sort: true,
        },
      ],
    };
  },
  mixins: [Sorting],
};
const instance = shallowMount(Component);

describe('Sorting.mixin', () => {
  it('should ensure that sorting is returning an array sorted ascending on col1', ()=>{
    instance.setData({sortingColumn: 'col1', sortingAsc: true});
    expect(instance.vm.sortedPeople.length).toBe(3);
    expect(instance.vm.sortedPeople.map((r)=>r['col1']).join(',')).toBe('A,B,C');
  });

  it('should ensure that sorting is returning an array sorted ascending on col2', ()=>{
    instance.setData({sortingColumn: 'col2', sortingAsc: true});
    expect(instance.vm.sortedPeople.length).toBe(3);
    expect(instance.vm.sortedPeople.map((r)=>r['col2']).join(',')).toBe('A,B,C');
  });

  it('should ensure that sorting is returning an array sorted ascending on col3', ()=>{
    instance.setData({sortingColumn: 'col3', sortingAsc: true});
    expect(instance.vm.sortedPeople.length).toBe(3);
    expect(instance.vm.sortedPeople.map((r)=>r['col3']).join(',')).toBe('A,B,C');
  });

  it('should ensure that sorting is returning an array sorted descending on col1', ()=>{
    instance.setData({sortingColumn: 'col1', sortingAsc: false});
    expect(instance.vm.sortedPeople.length).toBe(3);
    expect(instance.vm.sortedPeople.map((r)=>r['col1']).join(',')).toBe('C,B,A');
  });

  it('should ensure that sorting is returning an array sorted descending on col2', ()=>{
    instance.setData({sortingColumn: 'col2', sortingAsc: false});
    expect(instance.vm.sortedPeople.length).toBe(3);
    expect(instance.vm.sortedPeople.map((r)=>r['col2']).join(',')).toBe('C,B,A');
  });

  it('should ensure that sorting is returning an array sorted descending on col3', ()=>{
    instance.setData({sortingColumn: 'col3', sortingAsc: false});
    expect(instance.vm.sortedPeople.length).toBe(3);
    expect(instance.vm.sortedPeople.map((r)=>r['col3']).join(',')).toBe('C,B,A');
  });

  it('should ensure that sortBy function is returning proper result', () => {
    instance.vm.sortBy({label: 'col1'});
    expect(instance.vm.sortingColumn).toBe('col1');
    expect(instance.vm.sortingAsc).toBe(true);
    instance.vm.sortBy({label: 'col1'});
    expect(instance.vm.sortingColumn).toBe('col1');
    expect(instance.vm.sortingAsc).toBe(false);
  });
});
