<template>

  <div class="container">
    <div class="buttons">
      <button class="pie" :class="{active: type === 'pie'}" @click="type = 'pie'" title="Pie"><i/></button>
      <button class="bar" :class="{active: type === 'bar'}" @click="type = 'bar'" title="Bar"><i/></button>
    </div>
    <div class="chart-container">
      <PieChart v-if="type === 'pie'" :rows="rows" :col="col" @updateFilter="$emit('updateFilter', $event)"/>
      <BarChart v-else-if="type === 'bar'" :rows="rows" :col="col" @updateFilter="$emit('updateFilter', $event)"/>
    </div>
  </div>

</template>

<script>

  /* eslint-disable max-len */

  import BarChart from '@/components/charts/BarChart';
  import PieChart from '@/components/charts/PieChart';

  export default {
    name: 'ChartWrapper',
    components: {
      BarChart,
      PieChart,
    },
    props: {
      rows: Array,
      col: Object,
    },
    emits: ['updateFilter'],
    data() {
      return {
        type: 'pie',
      };
    },
    mounted() {
      this.type = this.col.defaultChartType || 'pie';
    },
  };
</script>

<style scoped>

  .container {
    position: relative;
    display: inline-block;
    width: 300px;
    height: 150px;
    padding-left:50px;
    margin: 5px 10px;
    border-radius: 20px;
    padding: 20px 0 30px 50px;
    background-color: rgba(0,0,0,0.05);
  }

  .chart-container {
    float: left;
  }

  .buttons {
    position: absolute;
    left:0;
    z-index:1;
  }

  .buttons button {
    position:relative;
    height:24px;
    width: 24px;
    border: 0px solid black;
    background-color: var(--color-2);
    outline: none;
    transition:0.3s all;
  }

  button.active {
    background-color: var(--color-1);
  }

  button i {
    position:absolute;
    height:24px;
    width: 24px;
    background-size: 16px;
    background-repeat: no-repeat;
    filter: invert(1);
    display: block;
    top: 4px;
    left: 5px;
    transition:0.3s all;
  }
  button:hover {
    background-color: var(--color-1);
  }
  button:hover i {
    filter: invert(0);
  }

  button.pie i {
    background-image: url("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHRpdGxlPjwvdGl0bGU+CjxnIGlkPSJpY29tb29uLWlnbm9yZSI+CjwvZz4KPHBhdGggZD0iTTIyNCAyODh2LTIyNGMtMTIzLjcxMiAwLTIyNCAxMDAuMjg4LTIyNCAyMjRzMTAwLjI4OCAyMjQgMjI0IDIyNCAyMjQtMTAwLjI4OCAyMjQtMjI0YzAtMzYuMDE3LTguNTE0LTcwLjA0Mi0yMy42MTgtMTAwLjE5MWwtMjAwLjM4MiAxMDAuMTkxek00NTYuMzgyIDEyMy44MDljLTM2Ljc3Ni03My40MDgtMTEyLjY4Ny0xMjMuODA5LTIwMC4zODItMTIzLjgwOXYyMjRsMjAwLjM4Mi0xMDAuMTkxeiI+PC9wYXRoPgo8L3N2Zz4K");
  }

  button.bar i {
    background-image: url("data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHRpdGxlPjwvdGl0bGU+CjxnIGlkPSJpY29tb29uLWlnbm9yZSI+CjwvZz4KPHBhdGggZD0iTTAgNDE2aDUxMnY2NGgtNTEyek02NCAyODhoNjR2OTZoLTY0ek0xNjAgMTYwaDY0djIyNGgtNjR6TTI1NiAyNTZoNjR2MTI4aC02NHpNMzUyIDY0aDY0djMyMGgtNjR6Ij48L3BhdGg+Cjwvc3ZnPgo=");
  }

</style>
