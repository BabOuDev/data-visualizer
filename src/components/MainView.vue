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

  <SidePanel v-if="panelVisible" :row="rowToEdit" :columns="columnsToEdit" @save-row="saveRow($event)" @cancel="panelVisible = false"/>

</template>

<script>
  import Switch from '@/components/Switch.vue';
  import Filters from '@/components/Filters.vue';
  import DataTable from '@/components/DataTable.vue';
  import SidePanel from '@/components/SidePanel';

  import filteringMixin from '@/mixins/Filtering.mixin';
  import schemaMixin from '@/mixins/Schema.mixin';

  export default {
    name: 'MainView',
    components: {
      SidePanel,
      DataTable,
      Filters,
      Switch,
    },
    mixins: [
      filteringMixin('modelValue', 'search', 'filters'),
      schemaMixin,
    ],
    data() {
      return {
        enableFilter: false,
        panelVisible: false,
        rowToEdit: {},
      };
    },

    props: {
      modelValue: Array,
    },

    emits: ['update:modelValue'],

    methods: {
      openPanel(row) {
        this.panelVisible = true;
        this.rowToEdit = row;
      },
      saveRow(rowItem) {
        const list = this.modelValue;
        list[list.findIndex((i)=>i.id === rowItem.id)] = rowItem;
        this.$emit('update:modelValue', list);
        this.panelVisible = false;
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
