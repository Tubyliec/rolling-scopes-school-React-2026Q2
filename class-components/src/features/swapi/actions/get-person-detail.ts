'use server';

import type { Person } from '../model/types/person.type.ts';

import { getPerson } from '../swapi-service';

export async function getPersonDetailAction(
  id: string
): Promise<Person | { error: string }> {
  try {
    const result = await getPerson(id);

    if ('message' in result) {
      return { error: result.message };
    }

    return result;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: message };
  }
}
