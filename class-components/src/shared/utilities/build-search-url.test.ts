import { describe, expect,it } from 'vitest';

import { buildSearchUrl } from './build-search-url';

describe('buildSearchUrl', () => {
  it('should return base URL when no term and page is 1', () => {
    const result = buildSearchUrl('', 1);
    expect(result).toBe('/api/people/');
  });

  it('should include search param when term is provided', () => {
    const result = buildSearchUrl('Luke', 1);
    expect(result).toBe('/api/people/?search=Luke');
  });

  it('should include page param when page is greater than 1', () => {
    const result = buildSearchUrl('', 2);
    expect(result).toBe('/api/people/?page=2');
  });

  it('should include both search and page params', () => {
    const result = buildSearchUrl('Darth Vader', 3);
    expect(result).toBe('/api/people/?search=Darth+Vader&page=3');
  });

  it('should use default page of 1 when page is not provided', () => {
    const result = buildSearchUrl('Luke');
    expect(result).toBe('/api/people/?search=Luke');
  });

  it('should handle special characters in search term', () => {
    const result = buildSearchUrl('R2-D2', 1);
    expect(result).toContain('search=');
  });
});
