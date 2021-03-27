import {shallowMount} from '@vue/test-utils';
import WorldMap from '@/components/charts/WorldMap.vue';

describe('WorldMap.vue', () => {
  it('should renders correctly', () => {
    const component = shallowMount(WorldMap, {
      props: {
        rows: [
          {contact: {location: {lon: -180, lat: -90}}},
          {contact: {location: {lon: -180, lat: 0}}},
          {contact: {location: {lon: -180, lat: 90}}},
          {contact: {location: {lon: 0, lat: -90}}},
          {contact: {location: {lon: 0, lat: 0}}},
          {contact: {location: {lon: 0, lat: 90}}},
          {contact: {location: {lon: 180, lat: -90}}},
          {contact: {location: {lon: 180, lat: 0}}},
          {contact: {location: {lon: 180, lat: 90}}},
        ],
      },
    });
    expect(component.html()).toMatchSnapshot();
  });
});
