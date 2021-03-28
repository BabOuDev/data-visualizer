<template>
  <div class="filter-form">
    <label for="column">Column </label>
    <select id="column" class="column-input" v-model="filterColumn" placeholder="Column" @change="updateColumn">
      <option v-for="col in columns" :key="col.path" :value="col">{{ col.label }}</option>
    </select>
    <label for="value"> equals </label>
    <select id="value" class="column-input" v-model="filterValue" placeholder="Value" :disabled="!filterColumn.options.length">
      <option v-for="opt in filterColumn.options" :key="opt">{{ opt }}</option>
    </select>
    <button id="apply-filters" class="add-button" @click="addFilter" :disabled="!filterValue">Add Filter</button>
    <button id="reset-filters" @click="$emit('resetFilters')" :disabled="!value.length">Reset Filters</button>
  </div>
</template>

<script>

  export default {
    name: 'FiltersForm',

    props: ['modelValue', 'columns'],
    emits: ['update:modelValue', 'resetFilters'],

    data() {
      return {
        filterColumn: {options: []},
        filterValue: null,
      };
    },
    computed: {
      value: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit('update:modelValue', value);
        },
      },
    },
    methods: {
      // When a filter is added from the form
      addFilter() {
        // Check if there is already a filter for the same column
        const columnIsAlreadyFiltered = this.value.findIndex((f)=>f.column === this.filterColumn.label);
        if (columnIsAlreadyFiltered >= 0) {
          // If it is the case, check if there is already a filter with the same value
          if (!this.value[columnIsAlreadyFiltered].values.includes(this.filterValue)) {
            this.value[columnIsAlreadyFiltered].values.push(this.filterValue);
          }
        } else {
          // Else, create a new filter
          this.value.push({column: this.filterColumn.label, path: this.filterColumn.path, values: [this.filterValue]});
        }
      },
      // When a new column is selected, reset the value
      updateColumn() {
        this.filterValue = null;
      },
    },
  };
</script>

<style scoped>

.filter-form {
  display:inline-block;
  margin-left: 20px;
}

label {
  color:white;
  font-size: 20px;
}

button {
  font-size: 20px;
  margin-left:10px;
}


.add-button:not([disabled]){
  background-color: var(--color-1);
  color:white;
}

.column-input {
  width: 150px;
  font-size: 20px;
  margin-bottom:10px;
  padding: 2px 0px 1px;
  border: 1px solid var(--color-1);
  background-color:white;
}

</style>
