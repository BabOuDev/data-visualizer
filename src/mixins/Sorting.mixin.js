import Tools from '@/services/Tools';

export default {
  data() {
    return {
      // Column to sort
      sortingColumn: null,
      // Sorting order
      sortingAsc: false,
    };
  },
  computed: {
    // List of sorted data
    sortedPeople() {
      if (!this.sortingColumn) {
        return this.rows;
      } else {
        const column = this.columns.find((col)=>col.label === this.sortingColumn);
        return this.rows.sort((rowA, rowB)=>{
          const valueA = column.renderer(rowA, column.path.map((p) => Tools.findValueAtPath(rowA, p)));
          const valueB = column.renderer(rowB, column.path.map((p) => Tools.findValueAtPath(rowB, p)));
          if (valueA > valueB) {
            return this.sortingAsc ? 1 : -1;
          } else if (valueA < valueB) {
            return this.sortingAsc ? -1 : 1;
          } else {
            return 0;
          }
        });
      }
    },
  },
  methods: {
    // Change the sorting direction when clicking twice on the same column
    sortBy(col) {
      if (this.sortingColumn === col.label) {
        this.sortingAsc = !this.sortingAsc;
      } else {
        this.sortingAsc = true;
      }
      this.sortingColumn = col.label;
      this.pageOffset = 0;
    },
  },
};
