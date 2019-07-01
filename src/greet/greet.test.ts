import greet from './greet';

describe('greet', (): void => {
  it('should provide salutations', (): void => {
    expect(greet('test')).toBe('hello test');
  });
});
