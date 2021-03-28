<template>
  <div class="pagination-container">

    <span class="items-by-page">
      <select v-model="itemsByPage">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </span>

    <ul class="pagination" v-if="total > itemsByPage">
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

    <span class="pagination-summary">
      Rows {{ offset+1 }} to {{ offset+limit}} of <span id="total-results">{{total}}</span>
    </span>

  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      total: Number,
      offset: Number,
      limit: Number,
    },
    emits: ['pageChanged', 'update:limit'],
    data() {
      return {
        // Number of visible pages
        totalNumberOfVisiblePages: 7,
      };
    },
    computed: {
      // Model for page size
      itemsByPage: {
        get() {
          return this.limit;
        },
        set(value) {
          this.$emit('pageChanged', 0);
          this.$emit('update:limit', parseInt(value));
        },
      },
      // Total number of pages
      numberOfPages() {
        return Math.ceil(this.total / this.limit);
      },
      // Current page
      currentPage() {
        return this.offset / this.limit;
      },
      // The list pages visible in pagination
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
    },
  };
</script>

<style scoped>
.pagination-container {
  width: 100%;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}
ul {
  display: block;
  text-align: center;
  width: calc(100% - 420px);
  float:left;
  margin-top: 0;
  margin-bottom: 0;
}
li {
  display: inline-block;
  list-style: none;
  margin: 2px;
  width: 30px;
  cursor: pointer;
  border-radius:var(--border-radius);
  padding: 1px;
  user-select: none;
  text-align: center;
}
li:hover {
  background-color: var(--color-1);
}
.current {
  font-weight: bold;
  pointer-events: none;
  background-color: var(--color-2);
}
.hidden {
  visibility: hidden;
}
.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.items-by-page {
  float:left;
  width: 190px;
}
select{
  width: 60px;
  font-size: 20px;
  margin-bottom:10px;
  padding: 2px 0px 1px;
  border: 1px solid var(--color-1);
  background-color:white;
}
.pagination-summary {
  width: 190px;
  float:right;
}
</style>
