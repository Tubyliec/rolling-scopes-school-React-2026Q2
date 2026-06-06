export function extractPersonId(url: string): string {
  if (!url) return '';
  const match = url.match(/\/(\d+)\/$/);
  return match?.[1] ?? '';
}
