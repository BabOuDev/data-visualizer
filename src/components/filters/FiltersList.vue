<template>
  <div class="filter-list" v-if="value.length">
    <span v-for="(filter, index) in value" :key="index">
      <label class="filter-label">
        {{filter.column}}: {{filter.values.join(' or ')}}
        <span class="remove-button" @click="removeFilter(index)">x</span>
      </label>
      <label v-if="index < value.length-1">and</label>
    </span>
  </div>
</template>

<script>

  export default {
    name: 'FiltersList',

    props: ['modelValue'],
    emits: ['update:modelValue'],

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
      // Remove a filter from the list
      removeFilter(index) {
        this.value.splice(index, 1);
      },
    },
  };
</script>

<style scoped>

.filter-list {
  display:block;
  user-select: none;
}

.filter-label{
  background-color: var(--color-1);
  padding: 4px 28px 4px 18px;
  margin: 2px 5px;
  position:relative;
  white-space: nowrap;
  display: inline-block;
}

label {
  font-size: 20px;
  color:white;
}

.filter-label:hover .remove-button{
  display: block;
}
.remove-button{
  position: absolute;
  display: none;
  top: 6px;
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

</style>
