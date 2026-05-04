import type { Person } from '../../entities/person/model/interfaces/person.interface.ts';

export function buildDescription(person: Person): string {
  return `Height ${person.height} cm · Mass ${person.mass} kg · Born ${person.birth_year} · ${person.gender}`;
}
