<template>
  <div class="pie-container">
    <Legend :keys="keys" :colors="colors" @updateFilterFromLegend="$emit('updateFilter', {col:col, value:$event})"/>
    <div class="pie-background"></div>
    <template v-for="(slice, index) in aggregatedData" :key="slice.key">
      <div :style="styleForSlice(slice, index)" class="hold" @click="$emit('updateFilter', {col:col, value:slice.key})" :title="slice.key + ': ' + slice.value">
        <div class="pie" :style="styleForInnerSlice(slice, index)"></div>
      </div>
      <div v-if="over50(slice)" :style="styleForSlice(slice, index, true)" class="hold" @click="$emit('updateFilter', {col:col, value:slice.key})" :title="slice.key + ': ' + slice.value">
        <div class="pie" :style="styleForInnerSlice(slice, index, true)"></div>
      </div>
    </template>
    <div class="inner-circle"><div class="content"><b>{{col.label}}</b></div></div>
  </div>
</template>

<script>

  import Tools from '@/services/Tools';

  import ColorsMixin from '@/mixins/Colors.mixin';
  import Legend from '@/components/charts/Legend';

  export default {
    name: 'PieChart',
    components: {Legend},
    mixins: [ColorsMixin()],
    props: {
      rows: Array,
      col: Object,
    },
    emits: ['updateFilter'],
    computed: {
      // Group data by key
      aggregatedData() {
        return Object.entries(
          this.rows
            .reduce((acc, row)=>{
              const value = Tools.findValueAtPath(row, this.col.path);
              return {...acc, [value]: acc[value] ? acc[value]+1 : 1};
            }, {}),
        ).map((a)=>({key: a[0], value: a[1]}));
      },
      // List all keys
      keys() {
        return this.aggregatedData.map((d)=>d.key);
      },
      // Number of groups
      datasetsNumber() {
        return this.aggregatedData.length;
      },
    },
    methods: {
      // Generate the style object for each slice
      styleForSlice(slice, index, secondHalf) {
        const range = (slice.value / this.rows.length * 360);
        const start = this.aggregatedData.slice(0, index).reduce((acc, slice)=>acc+(slice.value / this.rows.length * 360), 0) + ( secondHalf ? range-180 : 0);
        return {
          'transform': 'rotate('+start+'deg)',
        };
      },
      // Generate the style object for each inner slice
      styleForInnerSlice(slice, index) {
        const range = Math.min(180, (slice.value / this.rows.length * 360));
        return {
          'background-color': this.colors[index],
          'transform': 'rotate('+range+'deg)',
        };
      },
      // Check if the slice is more than 50%
      over50(slice) {
        const isOver50 = (slice.value / this.rows.length ) > 0.5;
        return isOver50;
      },
    },
  };
</script>

<style scoped>
  .pie-container {
    height: 150px;
    width: 300px;
    position: relative;
    display: block;
  }

  .pie-background {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.5);
  }

  .pie {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    clip: rect(0px, 75px, 150px, 0px);
    pointer-events: auto;
    cursor:pointer;
  }

  .hold {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    clip: rect(0px, 150px, 150px, 75px);
    pointer-events: none;
  }


  .inner-circle {
    position: absolute;
    width: 80px;
    height: 80px;
    background-color: #444;
    border-radius: 100%;
    top: 35px;
    left: 35px;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.5) inset;
    color: white;
    z-index:1;
  }
  .inner-circle .content {
    position: absolute;
    display: block;
    width: 80px;
    top: 30px;
    left: 0;
    text-align: center;
    font-size: 14px;
    z-index:9;
  }
</style>
