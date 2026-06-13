export function filterSuggestions(
  query: string,
  items: string[],
  maxResults = 8
): string[] {
  if (!query.trim()) return [];
  const lower = query.toLowerCase();
  return items
    .filter((item) => item.toLowerCase().startsWith(lower))
    .slice(0, maxResults);
}
