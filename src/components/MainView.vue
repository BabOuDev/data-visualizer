<template>
  <h1>Data Vizualizer</h1>

  <div class="search-filter-bar">

    <div>
      <label>Filters: </label>
      <Switch id="filters" v-model="enableFilter" />
      <br/>
      <Filters v-if="enableFilter" v-model="filters" :columns="columnsToFilterOn" />
    </div>

    <br/>

    <div>
      <label for="search">Search: </label>
      <input id="search" class="search-input" type="text" v-model="search" placeholder="Search..."/>
    </div>

    <br/>

  </div>

  <DataTable :rows="filteredPeople" :columns="columnsToDisplay" @row-selected="openPanel($event)"/>

</template>

<script>
  import DataTable from '@/components/DataTable.vue';
  import Filters from '@/components/Filters.vue';
  import Switch from '@/components/Switch.vue';

  import filteringMixin from '@/mixins/Filtering.mixin';
  import schemaMixin from '@/mixins/Schema.mixin';

  export default {
    name: 'MainView',
    components: {
      DataTable,
      Filters,
      Switch,
    },
    mixins: [
      filteringMixin('people', 'search', 'filters'),
      schemaMixin,
    ],
    data() {
      return {
        enableFilter: false,
      };
    },

    props: {
      people: Array,
    },

    methods: {
      openPanel(row) {
        console.log('openPanel', row);
      },
    },
  };
</script>

<style scoped>

.search-filter-bar{
  font-size: 20px;
}

.search-input {
  width: 300px;
  font-size: 20px;
  margin-right:20px;
  border: 1px solid #42b883;
}

</style>
