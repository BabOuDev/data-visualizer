<template>
  <h1>Data Vizualizer</h1>

  <label for="search">Search: </label>
  <input id="search" class="search-input" type="text" v-model="search" placeholder="Search..."/>

  <DataTable :data="filteredPeople" />

</template>

<script>
  import DataTable from '@/components/DataTable.vue';

  import searchMixin from '@/mixins/Search.mixin';

  export default {
    name: 'MainView',
    components: {
      DataTable,
    // Filters,
    // Switch
    },
    mixins: [searchMixin('people', 'search')],

    props: {
      people: Array,
    },
  };
</script>

<style scoped>

</style>
