<template>
  <h1>Data Vizualizer</h1>

  <DataTable :data="people" />

</template>

<script>
  import DataTable from './DataTable.vue';

  export default {
    name: 'MainView',
    components: {
      DataTable,
    // Filters,
    // Switch
    },
    props: {
      people: Array,
    },
  };
</script>

<style scoped>

</style>
