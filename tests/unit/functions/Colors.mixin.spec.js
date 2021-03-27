import {shallowMount} from '@vue/test-utils';
import Colors from '@/mixins/Colors.mixin';

const Component = {
  render() {},
  data() {
    return {
      datasetsNumber: 4,
    };
  },
  mixins: [Colors()],
};
const instance = shallowMount(Component);

describe('Colors.mixin', () => {
  it('should ensure that colors computed is returning proper result', ()=>{
    expect(JSON.stringify(instance.vm.colors))
      .toBe(JSON.stringify(['#42b883', '#3e9377', '#396e6a', '#35495e']));
  });

  it('should ensure that interpolateColor function is returning proper result', () => {
    const result = Colors().methods.interpolateColor([66, 184, 131], [53, 73, 94], 1/4);
    expect(JSON.stringify(result))
      .toBe(JSON.stringify([63, 156, 122]));
  });

  it('should ensure that interpolateColors function is returning proper result', () => {
    const result = Colors().methods.interpolateColors('rgb(66,184,131)', 'rgb(53,73,94)', 4);
    expect(JSON.stringify(result))
      .toContain(JSON.stringify(['#42b883', '#3e9377', '#396e6a', '#35495e']));
  });

  it('should ensure that hexToRgb function is returning proper result', () => {
    const result = Colors().methods.hexToRgb('#42b883');
    expect(result).toContain('rgb(66,184,131)');
  });

  it('should ensure that componentToHex function is returning proper result', () => {
    const result = Colors().methods.componentToHex(53);
    expect(result).toContain(35);
  });

  it('should ensure that rgbToHex function is returning proper result', () => {
    const result = Colors().methods.rgbToHex(66, 184, 131);
    expect(result).toContain('#42b883');
  });
});
