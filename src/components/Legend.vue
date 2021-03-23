<template>
  <div class="legend-container">
    <div v-for="(key, index) in keys" :key="key" class="key" @click="$emit('updateFilterFromLegend', key)">
      <div class="square" :style="{'background-color': colors[index]}"></div>
      <label class="label">{{key}}</label>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Legend',
    props: {
      keys: Array,
      colors: Array,
    },
    emits: ['updateFilterFromLegend'],
  };
</script>

<style scoped>

  .legend-container {
    margin-left: 170px;
    position:absolute;
    user-select: none;
  }

  .key {
    cursor:pointer;
  }

  .square {
    width:10px;
    height:10px;
    margin-right:5px;
    display:inline-block;
  }

  .label {
    width:100px;
    display:inline-block;
    font-size:16px;
    cursor:pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

</style>
