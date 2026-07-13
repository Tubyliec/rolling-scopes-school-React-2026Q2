import type { Person } from '@/entities/person/model/types/person.type.ts';

import { useSelectionStore } from './selection-store';

import { beforeEach, describe, expect, it } from 'vitest';

const makePerson = (id: number): Person => ({
  name: `Person ${id}`,
  height: '170',
  mass: '70',
  hair_color: 'brown',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  url: `https://swapi.dev/api/people/${id}/`,
});

describe('useSelectionStore', () => {
  beforeEach(() => {
    useSelectionStore.setState({ selectedItems: new Map() });
  });

  it('starts with an empty selection', () => {
    const { selectedItems } = useSelectionStore.getState();
    expect(selectedItems.size).toBe(0);
  });

  it('toggleItem adds a person when not yet selected', () => {
    const person = makePerson(1);
    useSelectionStore.getState().toggleItem(person);
    expect(useSelectionStore.getState().selectedItems.size).toBe(1);
    expect(
      useSelectionStore.getState().selectedItems.get(person.url)?.url
    ).toBe(person.url);
  });

  it('toggleItem removes a person when already selected', () => {
    const person = makePerson(1);
    useSelectionStore.getState().toggleItem(person);
    useSelectionStore.getState().toggleItem(person);
    expect(useSelectionStore.getState().selectedItems.size).toBe(0);
  });

  it('toggleItem can hold multiple distinct items', () => {
    useSelectionStore.getState().toggleItem(makePerson(1));
    useSelectionStore.getState().toggleItem(makePerson(2));
    expect(useSelectionStore.getState().selectedItems.size).toBe(2);
  });

  it('unselectAll clears all selected items', () => {
    useSelectionStore.getState().toggleItem(makePerson(1));
    useSelectionStore.getState().toggleItem(makePerson(2));
    useSelectionStore.getState().unselectAll();
    expect(useSelectionStore.getState().selectedItems.size).toBe(0);
  });

  it('isSelected returns true for a selected person', () => {
    const person = makePerson(3);
    useSelectionStore.getState().toggleItem(person);
    expect(useSelectionStore.getState().isSelected(person.url)).toBe(true);
  });

  it('isSelected returns false for a non-selected person', () => {
    expect(
      useSelectionStore
        .getState()
        .isSelected('https://swapi.dev/api/people/99/')
    ).toBe(false);
  });

  it('removing one item does not affect others', () => {
    const p1 = makePerson(1);
    const p2 = makePerson(2);
    useSelectionStore.getState().toggleItem(p1);
    useSelectionStore.getState().toggleItem(p2);
    useSelectionStore.getState().toggleItem(p1);
    const { selectedItems } = useSelectionStore.getState();
    expect(selectedItems.size).toBe(1);
    expect(selectedItems.get(p2.url)?.url).toBe(p2.url);
  });
});
