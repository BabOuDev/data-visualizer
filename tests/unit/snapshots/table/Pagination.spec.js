import {shallowMount} from '@vue/test-utils';
import Pagination from '@/components/table/Pagination.vue';

describe('Pagination.vue', () => {
  it('should renders correctly', () => {
    const component = shallowMount(Pagination, {
      props: {
        total: 100,
        offset: 20,
        limit: 10,
      },
    });
    expect(component.html()).toMatchSnapshot();
  });
});
