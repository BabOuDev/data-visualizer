export default function(color1='#42b883', color2='#35495e') {
  return {
    computed: {
      colors() {
        return this.datasetsNumber > 1 ? this.interpolateColors(this.hexToRgb(color1), this.hexToRgb(color2), this.datasetsNumber) : [this.hexToRgb(color1)];
      },
    },
    methods: {
      interpolateColor(color1, color2, factor) {
        if (arguments.length < 3) {
          factor = 0.5;
        }
        const result = color1.slice();
        for (let i = 0; i < 3; i++) {
          result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return result;
      },
      interpolateColors(color1, color2, steps) {
        const stepFactor = 1 / (steps - 1);
        const interpolatedColorArray = [];
        color1 = color1.match(/\d+/g).map(Number);
        color2 = color2.match(/\d+/g).map(Number);
        for (let i = 0; i < steps; i++) {
          interpolatedColorArray.push(this.interpolateColor(color1, color2, stepFactor * i));
        }
        return interpolatedColorArray.map((color)=>this.rgbToHex(...color));
      },
      hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 'rgb('+result.slice(1).map((r)=>parseInt(r, 16)).join(',')+')' : null;
      },
      componentToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
      },
      rgbToHex(r, g, b) {
        return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
      },
    },
    mounted() {
      document.documentElement.style.setProperty('--color-1', color1);
      document.documentElement.style.setProperty('--color-2', color2);
    },
  };
}
