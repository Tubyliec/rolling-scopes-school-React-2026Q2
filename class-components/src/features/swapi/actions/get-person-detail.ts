'use server';

import type { Person } from '@entities/person/model/types/person.type';

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
