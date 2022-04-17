import { getCurrentRenderTree, makeRenderTree } from '@/html/makeRenderTree';

describe('makeRender', () => {
  it('basic', () => {
    makeRenderTree(() => {
      expect(getCurrentRenderTree() !== null).toBe(true);
    });
    expect(getCurrentRenderTree()).toBe(null);
  });

  it('nest', () => {
    let parent: any;
    makeRenderTree(() => {
      parent = getCurrentRenderTree();
      expect(parent !== null).toBe(true);

      makeRenderTree(() => {
        expect(getCurrentRenderTree() !== null).toBe(true);
        expect(getCurrentRenderTree() === parent).toBe(false);
        expect(getCurrentRenderTree()?.p === parent).toBe(true);
      });

      expect(getCurrentRenderTree()).toBe(parent);
    });
    expect(getCurrentRenderTree()).toBe(null);
  });
});
