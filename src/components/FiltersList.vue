<template>
  <div class="filter-list" v-if="value.length">
    <span v-for="(filter, index) in value" :key="index">
      <label class="filter-label">
        {{filter.column}}: {{filter.values.join(' or ')}}
        <span class="remove-button" @click="removeFilter(index)">x</span>
      </label>
      <span v-if="index < value.length-1">and</span>
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

</style>
