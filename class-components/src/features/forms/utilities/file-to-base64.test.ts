import { fileToBase64 } from '@/features/forms/utilities/file-to-base64.ts';

import { describe, expect, it } from 'vitest';

describe('fileToBase64', () => {
  it('converts a File to a base64 data URL string', async () => {
    const content = 'hello world';
    const file = new File([content], 'test.txt', { type: 'text/plain' });

    const result = await fileToBase64(file);

    expect(typeof result).toBe('string');
    expect(result.startsWith('data:text/plain;base64,')).toBe(true);
  });

  it('returns a non-empty string for non-empty file', async () => {
    const file = new File(['content'], 'image.png', { type: 'image/png' });
    const result = await fileToBase64(file);
    expect(result.length).toBeGreaterThan(0);
  });
});
