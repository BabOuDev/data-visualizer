import Tools from '@/services/Tools';

export default {
  data() {
    return {
      schema: [
        {
          label: 'Name',
          path: ['firstname', 'lastname'],
          renderer: (row, values)=>values[0] + ' ' + values[1],
          types: ['text', 'text'],
          computed: true,
          display: true,
          width: 200,
        },
        {
          label: 'Firstname',
          path: 'firstname',
          type: 'text',
          edit: true,
        },
        {
          label: 'Lastname',
          path: 'lastname',
          type: 'text',
          edit: true,
        },
        {
          label: 'Gender',
          path: 'gender',
          type: 'select',
          renderer: (row, values)=>(values[0] === 'Female' ? '♀ ' : '♂ ') + values[0],
          options: ['Male', 'Female'],
          display: true,
          width: 100,
          filter: true,
          edit: true,
          chart: true,
          defaultChartType: 'pie',
        },
        {
          label: 'Email',
          path: 'contact.email',
          type: 'text',
          display: true,
          width: 250,
          edit: true,
        },
        {
          label: 'Phone Number',
          path: 'contact.phone',
          type: 'text',
          pattern: '[0-9]{5}[-][0-9]{7}[-][0-9]{1}',
          display: true,
          width: 160,
          edit: true,
        },
        {
          label: 'Country',
          path: 'contact.country',
          type: 'text',
          display: true,
          width: 160,
          edit: true,
        },
        {
          label: 'Fav. Color',
          path: 'preferences.favorite_color',
          type: 'select',
          renderer: (row, values)=>'<span class="color-square" style="'+this.getColorStyle(values[0])+'"></span>' + values[0],
          options: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'],
          display: true,
          width: 100,
          filter: true,
          edit: true,
          chart: true,
          defaultChartType: 'bar',
        },
        {
          label: 'Fav. Fruit',
          path: 'preferences.favorite_fruit',
          type: 'select',
          options: ['Apple', 'Pineapple', 'Pear', 'Strawberry', 'Orange', 'Mango'],
          display: true,
          width: 100,
          filter: true,
          edit: true,
          chart: true,
          defaultChartType: 'bar',
        },
        {
          label: 'Fav. Movie',
          path: 'preferences.favorite_movie',
          type: 'text',
          display: true,
          edit: true,
        },
        {
          label: 'Fav. Pet',
          path: 'preferences.favorite_pet',
          type: 'select',
          options: ['Cat', 'Dog', 'Bird', 'Rat'],
          display: true,
          width: 115,
          filter: true,
          edit: true,
          chart: true,
          defaultChartType: 'pie',
        },
        {
          label: 'Address',
          path: 'contact.address',
          type: 'text',
          edit: true,
        },
        {
          label: 'City',
          path: 'contact.city',
          type: 'text',
          edit: true,
        },
        {
          label: 'Longitude',
          path: 'contact.location.lon',
          type: 'number',
          min: -180,
          max: 180,
          edit: true,
        },
        {
          label: 'Latitude',
          path: 'contact.location.lat',
          type: 'number',
          min: -180,
          max: 180,
          edit: true,
        },

      ],
    };
  },
  computed: {
    columnsToFilterOn() {
      return this.schema.filter((c)=>c.filter);
    },
    columnsToEdit() {
      return this.schema.filter((c)=>c.edit);
    },
    columnsToDisplay() {
      return this.schema.filter((c)=>c.display).map((c)=>({
        ...c,
        renderer: c.renderer || ((r)=>Tools.findValueAtPath(r, c.path)),
        path: c.path instanceof Array ? c.path : [c.path],
      }));
    },
    columnsToChart() {
      return this.schema.filter((c)=>c.chart);
    },
  },
  methods: {
    getColorStyle(color) {
      return ''+
        'background-color:'+ color +'; ' +
        'width: 10px; ' +
        'height: 10px; ' +
        'display: inline-block; ' +
        'margin: 0 10px 0 0; ';
    },
  },
};
