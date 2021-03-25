<template>
  <div class="row form">
    <div class="search-container">
      <label for="search">Search: </label>
      <input id="search" class="search-input" type="text" v-model="search" placeholder="Search..."/>
    </div>
    <div class="filter-switch-container">
      <label>Filters: </label>
      <Switch class="filter-switch" v-model="enableFilter" />
    </div>
    <FiltersForm v-if="enableFilter" v-model="filters" :columns="columnsToFilterOn" @resetFilters="resetFilters"/>
    <button class="export" @click="exportData">Export to JSON</button>
    <a id="downloadAnchorElem"/>
    <FiltersList v-if="enableFilter" v-model="filters" @resetFilters="resetFilters"/>
    <br/>
  </div>

  <div class="row">
  </div>

  <div class="half-row">
    <SimpleChart v-for="col in columnsToChart" :key="col.label" :rows="filteredPeople" :col="col" @updateFilter="addFilter"/>
  </div>

  <div class="half-row right">
    <WorldMap :rows="filteredPeople" @selectRow="highlightRow" @resetRow="resetHighlighting"></WorldMap>
  </div>

  <div class="row">
    <DataTable :rows="filteredPeople" :columns="columnsToDisplay" @row-selected="openPanel($event)"/>
  </div>

  <SidePanel v-if="panelVisible" :row="rowToEdit" :columns="columnsToEdit" @save-row="saveRow($event)" @cancel="panelVisible = false"/>

</template>

<script>
  import Switch from '@/components/Switch.vue';
  import FiltersForm from '@/components/FiltersForm';
  import FiltersList from '@/components/FiltersList';
  import SimpleChart from '@/components/SimpleChart';
  import WorldMap from '@/components/WorldMap';
  import DataTable from '@/components/DataTable.vue';
  import SidePanel from '@/components/SidePanel';

  import filteringMixin from '@/mixins/Filtering.mixin';
  import schemaMixin from '@/mixins/Schema.mixin';

  export default {
    name: 'MainView',
    components: {
      FiltersList,
      FiltersForm,
      WorldMap,
      SimpleChart,
      SidePanel,
      DataTable,
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
        higlighted: false,
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
      addFilter({col, value}) {
        this.enableFilter = true;
        const columnIsAlreadyFiltered = this.filters.findIndex((f)=>f.column === col.label);
        if (columnIsAlreadyFiltered >= 0) {
          if (!this.filters[columnIsAlreadyFiltered].values.includes(value)) {
            this.filters[columnIsAlreadyFiltered].values.push(value);
          }
        } else {
          this.filters.push({column: col.label, path: col.path, values: [value]});
        }
      },
      resetFilters() {
        this.filters = [];
      },
      highlightRow(row) {
        this.search = row.firstname + ' ' + row.lastname;
      },
      resetHighlighting() {
        this.search = '';
      },
      exportData() {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.filteredPeople, 2, 2));
        const dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute('href', dataStr );
        dlAnchorElem.setAttribute('download', 'people.json');
        dlAnchorElem.click();
      },
    },
  };
</script>

<style scoped>

  .row{
    width: 100%;
    display:block;
    margin-bottom: 20px;
  }

  .half-row {
    width: 45%;
    display: inline-block;
    margin-bottom: 20px;
  }
  .half-row.right{
    float:right;
  }

  .form {
    padding: 20px;
    margin-top: -10px;
    margin-left: -10px;
    width: calc(100% - 22px);
    background-color: var(--color-2);
  }

  label {
    color:white;
    font-size: 20px;
  }

  .filter-switch-container {
    display:block;
  }

  .search-input {
    width: 300px;
    font-size: 20px;
    border: 1px solid var(--color-1);
  }

  .search-container {
    margin-top: 10px;
    float:right;
  }

  button.export {
    font-size: 20px;
    margin-left:10px;
    float:right;
  }

  #downloadAnchorElem {
    display:none;
  }

</style>
