<template>
  <div class="pagination-container">
    <ul class="pagination">
      <li
        :class="{ disabled: currentPage === 0 }"
        @click="() => $emit('pageChanged', 0)"
      >
        &lt;&lt;
      </li>
      <li
        :class="{ disabled: currentPage === 0 }"
        @click="() => $emit('pageChanged', currentPage - 1)"
      >
        &lt;
      </li>

      <li
        v-for="page in visiblePages"
        v-bind:key="page.index"
        :class="{ hidden: !page.visible, current: page.current }"
        @click="() => $emit('pageChanged', page.index)"
      >
        {{ page.label }}
      </li>

      <li
        :class="{ disabled: currentPage === numberOfPages - 1 }"
        @click="() => $emit('pageChanged', currentPage + 1)"
      >
        &gt;
      </li>
      <li
        :class="{ disabled: currentPage === numberOfPages - 1 }"
        @click="() => $emit('pageChanged', numberOfPages - 1)"
      >
        &gt;&gt;
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      total: Number,
      limit: Number,
      offset: Number,
    },
    emits: ['pageChanged'],
    data() {
      return {
        totalNumberOfVisiblePages: 7,
      };
    },
    computed: {
      // Nombre total de pages
      numberOfPages() {
        return Math.ceil(this.total / this.limit);
      },
      // Nombre total de pages
      currentPage() {
        return this.offset / this.limit;
      },
      // La liste des pages visibles
      visiblePages() {
        const visiblePages = [];
        const start = parseInt(-(this.totalNumberOfVisiblePages - 1) / 2);
        const end = parseInt(this.totalNumberOfVisiblePages / 2);
        for (let i = start; i <= end; i++) {
          visiblePages.push({
            index: this.currentPage + i,
            label: this.currentPage + i + 1,
            visible:
              this.currentPage + i >= 0 &&
              this.currentPage + i < this.numberOfPages,
            current: i === 0,
          });
        }
        return visiblePages;
      },
      // Les données de la page courante
      peopleForCurrentPage() {
        return this.people.slice(
          this.pageOffset,
          this.pageOffset + this.pageSize,
        );
      },
    },
  };
</script>

<style scoped>
.pagination-container {
  width: 100%;
}
ul {
  display: block;
  text-align: center;
}
li {
  display: inline-block;
  list-style: none;
  margin: 2px;
  width: 30px;
  cursor: pointer;
  border-radius: 3px;
  padding: 1px;
  user-select: none;
  text-align: center;
}
li:hover {
  background-color: lightgray;
}
.current {
  font-weight: bold;
  pointer-events: none;
  background-color: lightgray;
}
.hidden {
  visibility: hidden;
}
.disabled {
  opacity: 0.3;
  pointer-events: none;
}
</style>
