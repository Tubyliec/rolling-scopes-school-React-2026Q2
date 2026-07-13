import type { Person } from '@features/swapi/model/types/person.type.ts';

export function buildDescription(person: Person): string {
  return `Height ${person.height} cm · Mass ${person.mass} kg · Born ${person.birth_year} · ${person.gender}`;
}
