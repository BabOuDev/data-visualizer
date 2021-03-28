<template>
  <div class="bar-container">
    <Legend :keys="keys" :colors="colors" @updateFilterFromLegend="$emit('updateFilter', {col:col, value:$event})"/>
    <div class="bar-background"></div>
    <div class="bar-origin"></div>
    <div class="content"><b>{{col.label}}</b></div>
    <template v-for="(part, index) in aggregatedData" :key="part.key">
      <div :style="styleForBar(part, index)" class="bar" @click="$emit('updateFilter', {col:col, value:part.key})" :title="part.key + ': ' + part.value"></div>
    </template>
  </div>
</template>

<script>

  import Tools from '@/services/Tools';

  import ColorsMixin from '@/mixins/Colors.mixin';
  import Legend from '@/components/charts/Legend';

  export default {
    name: 'BarChart',
    components: {Legend},
    mixins: [ColorsMixin()],
    props: {
      rows: Array,
      col: Object,
    },
    emits: ['updateFilter'],
    data() {
      return {
        chartWidth: 150,
        chartHeight: 120,
        chartMargin: 5,
      };
    },
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
      // Extract the maximum value in the data
      maxValue() {
        return this.aggregatedData.reduce((acc, part)=>Math.max(acc, part.value), 0);
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
      // Generate the style object for each bar
      styleForBar(part, index) {
        const barWidth = (this.chartWidth / this.aggregatedData.length) - this.chartMargin;
        const left = (barWidth + this.chartMargin) * index;
        const height = (part.value / this.maxValue * this.chartHeight);
        return {
          'width': barWidth + 'px',
          'left': left + 'px',
          'height': height + 'px',
          'bottom': '0',
          'background-color': this.colors[index],
        };
      },
    },
  };
</script>

<style scoped>
  .bar-container {
    height: 150px;
    width: 300px;
    position: relative;
    display: block;
  }

  .bar-origin {
    height: 150px;
    width: 151px;
    margin-left: -3px;
    border-bottom: 2px solid black;
  }

  .content {
    width: 150px;
    text-align: center;
  }

  .bar {
    position:absolute;
    cursor: pointer;
  }

</style>
