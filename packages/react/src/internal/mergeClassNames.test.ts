import { describe, expect, it } from 'vitest';
import { mergeClassNames } from './mergeClassNames';

describe('mergeClassNames', () => {
  it('joins present class names without exposing false values', () => {
    expect(mergeClassNames('root', false, undefined, 'consumer', null)).toBe(
      'root consumer',
    );
  });
});
