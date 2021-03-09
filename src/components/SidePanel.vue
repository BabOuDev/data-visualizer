<template>

  <div class="side-panel">
    <div class="input-row" v-for="field in columns" :key="field.label">
      <label class="input-label" :for="field.label">{{field.label}}</label>
      <template v-if="field.type === 'text'">
        <input class="input-content" :name="field.label" type="text" v-model="serializedRow[field.label]" />
      </template>
      <template v-else-if="field.type === 'number'">
        <input class="input-content" type="number" v-model="serializedRow[field.label]" :min="field.min" :max="field.max"/>
      </template>
      <template v-else-if="field.type === 'select'">
        <select class="input-content" v-model="serializedRow[field.label]">
          <option v-for="opt in field.options" :key="opt" :value="opt">{{opt}}</option>
        </select>
      </template>
    </div>
    <button class="save-button" @click="save">Save</button>
    <a class="cancel-button" @click="$emit('cancel')">Cancel</a>
  </div>

</template>

<script>
  import Tools from '@/services/Tools';

  export default {
    name: 'SidePanel',
    props: {
      row: Object,
      columns: Array,
    },
    emits: [
      'save-row',
      'cancel',
    ],
    data() {
      return {
        serializedRow: {},
      };
    },
    computed: {

    },
    methods: {
      save() {
        this.$emit('save-row', this.deserializeRow(this.serializedRow));
      },
      serializeRow(row) {
        const serializedRow = {};
        for (const i in this.columns) {
          serializedRow[this.columns[i].label]= Tools.findValueAtPath(row, this.columns[i].path);
        }
        return serializedRow;
      },
      deserializeRow(serializedRow) {
        const row = {...this.row};
        for (const i in this.columns) {
          Tools.updateValueAtPath(row, this.columns[i].path, serializedRow[this.columns[i].label]);
        }
        return row;
      },
    },
    created() {
      this.serializedRow = this.serializeRow(this.row);
    },
  };
</script>

<style scoped>

  .side-panel{
    position:fixed;
    overflow-y:auto;
    right: 0;
    top: 0;
    height: 100%;
    width: 530px;
    background-color:white;
    box-shadow: 1px 0px 10px black;
    padding: 60px 20px;
  }

  .input-row{
    margin: 10px;
  }

  .input-label{
    width: 200px;
    display:inline-block;
    font-size: 20px;
  }

  .input-content{
    display:inline-block;
    font-size: 20px;
    border: 1px solid #42b883;
    background-color:white;
  }

  input.input-content{
    width: 292px;
    padding: 2px 0px 1px 4px;
  }

  select.input-content{
    width: 298px;
  }

  .save-button{
    float: right;
    margin-right: 22px;
    font-size: 20px;
    background-color: #42b883;
    color:white;
    cursor:pointer;
  }

  .cancel-button{
    float: right;
    margin: 3px 20px;
    font-size: 20px;
    cursor:pointer;
  }
  .cancel-button:hover{
    text-decoration: underline;
  }


</style>
