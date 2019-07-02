import greet from './greet';

describe('greet', () => {
  it('should provide salutations', () => {
    expect(greet('test')).toBe('hello test');
  });
});
