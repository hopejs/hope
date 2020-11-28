import { addScopeForSelector } from '../src';

describe('addScopeForSelector', () => {
  it('basic', () => {
    const id = 'scopeId';
    expect(addScopeForSelector('.class-name', id)).toBe('.class-name[scopeId]');
    expect(addScopeForSelector('.class-name:after', id)).toBe(
      '.class-name[scopeId]:after'
    );
    expect(addScopeForSelector('.class-name, .class-name:after', id)).toBe(
      '.class-name[scopeId],.class-name[scopeId]:after'
    );
    // animation
    expect(addScopeForSelector('to, from, 10%', id)).toBe('to,from,10%');
    expect(addScopeForSelector('.class-name, ', id)).toBe(
      '.class-name[scopeId]'
    );
  });
});
