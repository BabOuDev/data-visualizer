<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Country</th>
        <th>Fav. Color</th>
        <th>Fav. Fruit</th>
        <th>Fav. Movie</th>
        <th>Fav. Pet</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in rowsForCurrentPage" v-bind:key="p.id">
        <td>{{p.firstname}} {{p.lastname}}</td>
        <td>{{p.gender}}</td>
        <td>{{p.contact.email}}</td>
        <td>{{p.contact.phone}}</td>
        <td>{{p.contact.country}}</td>
        <td>{{p.preferences.favorite_color}}</td>
        <td>{{p.preferences.favorite_fruit}}</td>
        <td>{{p.preferences.favorite_movie}}</td>
        <td>{{p.preferences.favorite_pet}}</td>
      </tr>
    </tbody>
  </table>


  <label class="info-label" v-if="rowsForCurrentPage.length === 0">No data for current filters</label>
  <Pagination v-else-if="totalNumberOfRows > pageLimit" :total="totalNumberOfRows" :limit="pageLimit" :offset="pageOffset" @pageChanged="changePage"/>
</template>

<script>
  import Pagination from '@/components/Pagination.vue';


  export default {
    name: 'DataTable',
    components: {
      Pagination,
    },
    props: {
      data: Array,
    },
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
        return this.data.length;
      },
      // Les données de la page courante
      rowsForCurrentPage() {
        return this.data.slice(this.pageOffset, this.pageOffset + this.pageLimit);
      },
    },
    methods: {
      changePage(page) {
        this.pageOffset = page*this.pageLimit;
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

  table tr:nth-child(even){background-color: lightgray;}

  table tr:hover {background-color:  #42b883;}

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
