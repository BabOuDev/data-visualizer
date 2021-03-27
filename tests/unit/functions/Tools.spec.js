import Tools from '@/services/Tools';

describe('Tools.js', () => {
  it('should ensure that function findValueAtPath is working properly', ()=>{
    expect(Tools.findValueAtPath({a: 1}, 'a')).toBe(1);
    expect(Tools.findValueAtPath({a: {b: 2}}, 'a.b')).toBe(2);
    expect(Tools.findValueAtPath({a: {b: {c: 3}}}, 'a.b.c')).toBe(3);
  });

  it('should ensure that function findValueAtPath is working properly', ()=>{
    /* eslint-disable prefer-const */
    let object = {};
    Tools.updateValueAtPath(object, 'a.b.c', 1);
    expect(object.a.b.c).toBe(1);
    Tools.updateValueAtPath(object, 'a.b', 2);
    expect(object.a.b).toBe(2);
    Tools.updateValueAtPath(object, 'a', 3);
    expect(object.a).toBe(3);
  });
});
