<template>

  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.label">{{ col.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rowsForCurrentPage" v-bind:key="row.id" @click="$emit('row-selected', row)">
        <td v-for="col in columns" :key="col.label" v-html="col.renderer(row, col.path.map((p) => findValueAtPath(row, p)))"></td>
      </tr>
    </tbody>
  </table>

  <label class="info-label" v-if="rowsForCurrentPage.length === 0">No data for current filters</label>

  <Pagination v-else-if="totalNumberOfRows > pageLimit" :total="totalNumberOfRows" :limit="pageLimit" :offset="pageOffset" @pageChanged="changePage"/>

</template>

<script>
  import Pagination from '@/components/Pagination.vue';

  import Tools from '@/services/Tools';

  export default {
    name: 'DataTable',
    components: {
      Pagination,
    },
    props: {
      rows: Array,
      columns: Array,
    },
    emits: [
      'row-selected',
    ],
    data() {
      return {
        // Nombre d'éléments dans une page
        pageLimit: 10,
        // Indicateur de début de page
        pageOffset: 0,
      };
    },
    computed: {
      // Nombre total d'éléments
      totalNumberOfRows() {
        return this.rows.length;
      },
      // Les données de la page courante
      rowsForCurrentPage() {
        return this.rows.slice(this.pageOffset, this.pageOffset + this.pageLimit);
      },
    },
    methods: {
      changePage(page) {
        this.pageOffset = page*this.pageLimit;
      },
      findValueAtPath: Tools.findValueAtPath,
    },
    watch: {
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

  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  table td, table th {
    border: 1px solid lightgray;
    padding: 8px;
  }

  table tr:nth-child(even){
    background-color: lightgray;
  }

  table tr {
    cursor: pointer;
  }

  table tr:hover {
    background-color:  #42b883;
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #35495e;
    color: white;
  }

  .info-label {
    display:block;
    margin: 10px;
    width: 100%;
    font-size:20px;
    text-align:center;
  }

</style>
