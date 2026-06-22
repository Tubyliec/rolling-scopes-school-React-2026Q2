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
] as const;

function escapeCell(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
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
  ];

  return cells.map(escapeCell).join(',');
}

export function generateCsvBlob(items: readonly Person[]): Blob {
  const rows = [CSV_HEADERS.join(','), ...items.map(personToRow)];
  const csv = rows.join('\n');

  return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
}
