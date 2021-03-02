export default {
  data() {
    return {
      schema: [
        {
          label: 'Name',
          paths: ['firstname', 'lastname'],
          value: (firstname, lastname)=>firstname + ' ' + lastname,
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
          label: 'Favorite Color',
          path: 'preferences.favorite_color',
          type: 'select',
          options: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'],
          display: true,
          filter: true,
        },
        {
          label: 'Favorite Fruit',
          path: 'preferences.favorite_fruit',
          type: 'select',
          options: ['Apple', 'Pineapple', 'Pear', 'Strawberry', 'Orange', 'Mango'],
          display: true,
          filter: true,
        },
        {
          label: 'Favorite Movie',
          path: 'preferences.favorite_movie',
          type: 'text',
          display: true,
        },
        {
          label: 'Favorite Pet',
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
  },
};
