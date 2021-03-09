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
        },
        {
          label: 'Firstname',
          path: 'firstname',
          type: 'text',
        },
        {
          label: 'Lastname',
          path: 'lastname',
          type: 'text',
        },
        {
          label: 'Gender',
          path: 'gender',
          type: 'select',
          renderer: (row, values)=>(values[0] === 'Female' ? '♀ ' : '♂ ') + values[0],
          options: ['Male', 'Female'],
          display: true,
          filter: true,
        },
        {
          label: 'Email',
          path: 'contact.email',
          type: 'text',
          display: true,
        },
        {
          label: 'Phone Number',
          path: 'contact.phone',
          type: 'text',
          pattern: '[0-9]{5}[-][0-9]{7}[-][0-9]{1}',
          display: true,
        },
        {
          label: 'Country',
          path: 'contact.country',
          type: 'text',
          display: true,
        },
        {
          label: 'Fav. Color',
          path: 'preferences.favorite_color',
          type: 'select',
          renderer: (row, values)=>'<span class="color-square" style="'+this.getColorStyle(values[0])+'"></span>' + values[0],
          options: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'],
          display: true,
          filter: true,
        },
        {
          label: 'Fav. Fruit',
          path: 'preferences.favorite_fruit',
          type: 'select',
          options: ['Apple', 'Pineapple', 'Pear', 'Strawberry', 'Orange', 'Mango'],
          display: true,
          filter: true,
        },
        {
          label: 'Fav. Movie',
          path: 'preferences.favorite_movie',
          type: 'text',
          display: true,
        },
        {
          label: 'Fav. Pet',
          path: 'preferences.favorite_pet',
          type: 'select',
          options: ['Cat', 'Dog', 'Bird', 'Rat'],
          display: true,
          filter: true,
        },
        {
          label: 'Address',
          path: 'contact.address',
          type: 'text',
        },
        {
          label: 'City',
          path: 'contact.city',
          type: 'text',
        },
        {
          label: 'Longitude',
          path: 'contact.location.lon',
          type: 'number',
          min: -180,
          max: 180,
        },
        {
          label: 'Latitude',
          path: 'contact.location.lat',
          type: 'number',
          min: -180,
          max: 180,
        },

      ],
    };
  },
  computed: {
    columnsToFilterOn() {
      return this.schema.filter((c)=>c.filter);
    },
    columnsToDisplay() {
      return this.schema.filter((c)=>c.display).map((c)=>({
        ...c,
        renderer: c.renderer || ((r)=>Tools.findValueAtPath(r, c.path)),
        path: c.path instanceof Array ? c.path : [c.path],
      }));
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
