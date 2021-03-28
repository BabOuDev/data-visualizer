import Tools from '@/services/Tools';

export default function(list='modelValue', search='search', filters='filters') {
  return {
    data() {
      return {
        [search]: '',
        [filters]: [],
      };
    },
    computed: {
      // The list of people filtered with both search string and column filters
      filteredPeople() {
        return this[list]
          // Apply column filters
          .filter((p)=>!this.enableFilter || this[filters]
            .every((f)=>f.values.includes(Tools.findValueAtPath(p, f.path)))) // Only return the rows matching every filter
          // Apply search string filter
          .filter((p)=>!this[search] || // If search string is empty, return all
              this.objectToString(p) // Else, extract the object values as text
                .toLowerCase() // Convert all in lowercase to match all case
                .includes(this[search].toLowerCase())); // Check if rows includes the search string in lowercase
      },
    },
    methods: {
      // Flatten the object as a string of value separated by spaces
      objectToString(obj) {
        return Object.values(obj)
          .map((v)=>typeof v === 'object' ? this.objectToString(v) : v) // Extract nested values using recursion
          .join(' '); // Join all values into a big space separated string
      },
    },
  };
}
