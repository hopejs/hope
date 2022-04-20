import { getCurrentRender, makeRenderTree } from '@/html/makeRenderTree';

describe('makeRender', () => {
  it('basic', () => {
    makeRenderTree(() => {
      expect(getCurrentRender() !== null).toBe(true);
    });
    expect(getCurrentRender()).toBe(null);
  });

  it('nest', () => {
    let parent: any;
    makeRenderTree(() => {
      parent = getCurrentRender();
      expect(parent !== null).toBe(true);

      makeRenderTree(() => {
        expect(getCurrentRender() !== null).toBe(true);
        expect(getCurrentRender() === parent).toBe(false);
        expect(getCurrentRender()?.p === parent).toBe(true);
      });

      expect(getCurrentRender()).toBe(parent);
    });
    expect(getCurrentRender()).toBe(null);
  });
});
