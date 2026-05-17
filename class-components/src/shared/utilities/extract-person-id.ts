export function extractPersonId(url: string): string {
  const match = url.match(/\/(\d+)\/$/);
  return match?.[1] ?? '';
}
