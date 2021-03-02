export default {
  findValueAtPath(obj, path, defaultValue = '') {
    const value = path.split('.')
      .reduce(function(acc, part) {
        return acc && acc[part];
      }, obj);
    return value !== null && value !== undefined ? value : defaultValue;
  },
};
