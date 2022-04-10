import { getCurrentRenderTree, makeRender } from '@/html/makeRender';

describe('makeRender', () => {
  it('basic', () => {
    makeRender(() => {
      expect(getCurrentRenderTree() !== null).toBe(true);
    });
    expect(getCurrentRenderTree()).toBe(null);
  });

  it('nest', () => {
    let parent: any;
    makeRender(() => {
      parent = getCurrentRenderTree();
      expect(parent !== null).toBe(true);

      makeRender(() => {
        expect(getCurrentRenderTree() !== null).toBe(true);
        expect(getCurrentRenderTree() === parent).toBe(false);
        expect(getCurrentRenderTree()?.p === parent).toBe(true);
      });

      expect(getCurrentRenderTree()).toBe(parent);
    });
    expect(getCurrentRenderTree()).toBe(null);
  });
});
