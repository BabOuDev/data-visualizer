export default {
  findValueAtPath(obj, path, defaultValue = '') {
    const value = path.split('.')
      .reduce(function(acc, part) {
        return acc && acc[part];
      }, obj);
    return value !== null && value !== undefined ? value : defaultValue;
  },
  updateValueAtPath(obj, path, value) {
    const pathArr = path.split('.');
    for (let i = 0; i < pathArr.length; i++) {
      const p = pathArr[i];
      if (!obj[p]) {
        obj[p] = {};
      }
      if (i === pathArr.length - 1) {
        obj[p] = value;
      }
      obj = obj[p];
    }
  },
};
