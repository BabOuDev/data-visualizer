<template>
  <div class="row form">
    <div class="search-container">
      <label for="search">Search: </label>
      <input id="search" class="search-input" type="text" v-model="search" placeholder="Search..."/>
      <button id="export" @click="exportData">Export to JSON</button>
    </div>
    <div class="filter-switch-container">
      <label>Filters: </label>
      <Switch class="filter-switch" v-model="enableFilter" />
      <FiltersForm v-if="enableFilter" v-model="filters" :columns="columnsToFilterOn" @resetFilters="resetFilters"/>
    </div>
    <a id="downloadAnchorElem"/>
    <FiltersList v-if="enableFilter" v-model="filters" @resetFilters="resetFilters"/>
    <br/>
  </div>

  <div class="half-row left">
    <ChartWrapper v-for="col in columnsToChart" :key="col.label" :rows="filteredPeople" :col="col" @updateFilter="addFilter"/>
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
  import Switch from '@/components/filters/Switch.vue';
  import FiltersForm from '@/components/filters/FiltersForm';
  import FiltersList from '@/components/filters/FiltersList';
  import ChartWrapper from '@/components/charts/ChartWrapper';
  import WorldMap from '@/components/charts/WorldMap';
  import DataTable from '@/components/table/DataTable.vue';
  import SidePanel from '@/components/panel/SidePanel';

  import filteringMixin from '@/mixins/Filtering.mixin';
  import schemaMixin from '@/mixins/Schema.mixin';

  export default {
    name: 'MainView',
    components: {
      FiltersList,
      FiltersForm,
      WorldMap,
      ChartWrapper,
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
      // Open the side panel to edit data
      openPanel(row) {
        this.panelVisible = true;
        this.rowToEdit = row;
      },
      // Save the edited value into the list
      saveRow(rowItem) {
        const list = this.modelValue;
        list[list.findIndex((i)=>i.id === rowItem.id)] = rowItem;
        this.$emit('update:modelValue', list);
        this.panelVisible = false;
      },
      // Register new filters
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
      // Reset all filters
      resetFilters() {
        this.filters = [];
      },
      // Highlight one row only
      highlightRow(row) {
        this.search = row.firstname + ' ' + row.lastname;
      },
      // Reset row highlighting
      resetHighlighting() {
        this.search = '';
      },
      // Export edited data with applied filters
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
    clear: both;
  }

  .half-row.left {
    max-width: 740px;
    display: inline-block;
    margin-bottom: 10px;
    float:left;
  }

  .half-row.right {
    min-width:800px;
    float:right;
  }

  @media (max-width: 1590px) {
    .half-row.right{
      float:left;
    }
  }

  .form {
    padding: 15px 20px 0px;
    margin-top: -10px;
    margin-left: -10px;
    min-height: 63px;
    width: calc(100% - 22px);
    background-color: var(--color-2);
    box-shadow: 1px 0px 5px black;
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

  button#export {
    font-size: 20px;
    margin-left:10px;
    float:right;
  }

  #downloadAnchorElem {
    display:none;
  }

</style>
