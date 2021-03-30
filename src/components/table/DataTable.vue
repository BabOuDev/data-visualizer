<template>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.label" :style="{'max-width':col.width + 'px'}">
            {{ col.label }}
            <div class="sorting-caret" @click="sortBy(col)">
              <span class="caret sort-by-asc" :class="{active: sortingColumn === col.label && sortingAsc}"></span>
              <span class="caret sort-by-desc" :class="{active: sortingColumn === col.label && !sortingAsc}"></span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rowsForCurrentPage" v-bind:key="row.id" @click="$emit('row-selected', row)">
          <td v-for="col in columns" :key="col.label" v-html="col.renderer(row, col.path.map((p) => findValueAtPath(row, p)))" :style="{'max-width':col.width + 'px'}"></td>
        </tr>
      </tbody>
    </table>
  </div>

  <label class="info-label" v-if="rowsForCurrentPage.length === 0">No data for current filters</label>

  <Pagination v-else :total="totalNumberOfRows" v-model:limit="pageLimit" :offset="pageOffset" @pageChanged="changePage"/>

</template>

<script>
  import Pagination from '@/components/table/Pagination.vue';

  import Tools from '@/services/Tools';
  import SortingMixin from '@/mixins/Sorting.mixin';

  export default {
    name: 'DataTable',
    components: {
      Pagination,
    },
    mixins: [
      SortingMixin,
    ],
    props: {
      rows: Array,
      columns: Array,
    },
    emits: [
      'row-selected',
    ],
    data() {
      return {
        pageLimit: 10,
        pageOffset: 0,
      };
    },
    computed: {
      // Total number of items in the list
      totalNumberOfRows() {
        return this.rows.length;
      },
      // The rows to display on the current page
      rowsForCurrentPage() {
        return this.sortedPeople.slice(this.pageOffset, this.pageOffset + this.pageLimit);
      },
    },
    methods: {
      // The current page is changed
      changePage(page) {
        this.pageOffset = page*this.pageLimit;
      },
      // The tool function to access value using dotted path
      findValueAtPath: Tools.findValueAtPath,
    },
    watch: {
      // Watching the rows, and every time it's updated, go back to the first page.
      rows: {
        handler() {
          this.pageOffset = 0;
        },
        deep: true,
      },
    },
  };
</script>

<style scoped>

  .table-container {
    min-width: 760px;
    overflow-x: auto;
  }

  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  table td, table th {
    border: 1px solid lightgray;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  table tr:nth-child(odd){
    background-color: lightslategray;
  }

  table tr:nth-child(even){
    background-color: lightgray;
  }

  table tbody tr {
    cursor: pointer;
  }

  table tr:hover {
    background-color: var(--color-1);
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: var(--color-2);
    color: white;
  }

  .info-label {
    display:block;
    margin: 10px;
    width: 100%;
    font-size:20px;
    text-align:center;
  }

  table th {
    position:relative;
  }

  .sorting-caret{
    position:absolute;
    right: 3px;
    top:0;
    height: 34px;
    width: 15px;
    line-height: 0;
    padding-top: 7px;
    cursor: pointer;
  }

  .sort-by-asc {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid 5px transparent;
    margin: 4px 4px 0 3px;
    background: transparent;
    border-bottom: solid 7px var(--color-1);
    border-top-width: 0;
  }

  .caret:not(.active){
    opacity:0.5;
  }

  .caret.active{
    opacity:1;
  }

  .sort-by-desc {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid 5px transparent;
    margin: 4px 4px 0 3px;
    background: transparent;
    border-top: solid 7px var(--color-1);
    border-bottom-width: 0;
    float: left;
  }
</style>
