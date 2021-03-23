<template>
  <div class="filter-container">
    <div class="filter-form">
      <label for="column">Column </label>
      <select id="column" class="column-input" v-model="filterColumn" placeholder="Column" @change="updateColumn">
        <option v-for="col in columns" :key="col.path" :value="col">{{ col.label }}</option>
      </select>
      <label for="value"> equals </label>
      <select id="value" class="column-input" v-model="filterValue" placeholder="Value" :disabled="!filterColumn.options.length">
        <option v-for="opt in filterColumn.options" :key="opt">{{ opt }}</option>
      </select>
      <button class="add-button" @click="addFilter" :disabled="!filterValue">Add Filter</button>
      <button @click="$emit('resetFilters')" :disabled="!value.length">Reset Filters</button>
    </div>

    <button class="export" @click="$emit('export')">Export to JSON</button>

    <div class="filter-list" v-if="value.length">
      <span v-for="(filter, index) in value" :key="index">
        <label class="filter-label">
          {{filter.column}}: {{filter.values.join(' or ')}}
          <span class="remove-button" @click="removeFilter(index)">x</span>
        </label>
        <span v-if="index < value.length-1">and</span>
      </span>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'FilterItem',

    props: ['modelValue', 'columns'],
    emits: ['update:modelValue', 'export'],

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
      addFilter() {
        const columnIsAlreadyFiltered = this.value.findIndex((f)=>f.column === this.filterColumn.label);
        if (columnIsAlreadyFiltered >= 0) {
          if (!this.value[columnIsAlreadyFiltered].values.includes(this.filterValue)) {
            this.value[columnIsAlreadyFiltered].values.push(this.filterValue);
          }
        } else {
          this.value.push({column: this.filterColumn.label, path: this.filterColumn.path, values: [this.filterValue]});
        }
      },
      removeFilter(index) {
        this.value.splice(index, 1);
      },
      updateColumn() {
        this.filterValue = null;
      },
    },
  };
</script>

<style scoped>

.filter-form {
  display:inline-block;
  margin-right: 20px;
}
.filter-list {
  display:inline-block;
  user-select: none;
}

.filter-label{
  background-color: var(--color-2);
  color:white;
  padding: 2px 28px 2px 18px;
  margin: 2px 5px;
  position:relative;
  white-space: nowrap;
  display: inline-block;
}
.filter-label:hover .remove-button{
  display: block;
}
.remove-button{
  position: absolute;
  display: none;
  top: 4px;
  right: 5px;
  height: 18px;
  width: 18px;
  font-size: 15px;
  font-family: monospace;
  text-align: center;
  color: white;
  background-color: red;
  border-radius: 12px;
  cursor: pointer;
}

button {
  font-size: 20px;
  margin-left:10px;
}

.export {
  float:right;
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
