import { extractPersonId } from './extract-person-id.ts';

import type { Person } from '@entities/person/model/types/person.type.ts';

const CSV_HEADERS = [
  'Name',
  'Height (cm)',
  'Mass (kg)',
  'Hair Color',
  'Skin Color',
  'Eye Color',
  'Birth Year',
  'Gender',
  'Details URL',
];

function escapeCell(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function buildDetailsUrl(url: string): string {
  const id = extractPersonId(url);
  return id ? `${window.location.origin}/main/1/${id}` : url;
}

function personToRow(person: Person): string {
  const cells = [
    person.name,
    person.height,
    person.mass,
    person.hair_color,
    person.skin_color,
    person.eye_color,
    person.birth_year,
    person.gender,
    buildDetailsUrl(person.url),
  ];

  return cells.map(escapeCell).join(',');
}

export function downloadSelectedAsCsv(items: Person[]): void {
  const rows = [CSV_HEADERS.join(','), ...items.map(personToRow)];
  const csv = rows.join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const objectUrl = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = `${items.length}_items.csv`;
  anchor.click();

  URL.revokeObjectURL(objectUrl);
}