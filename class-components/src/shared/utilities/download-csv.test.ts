import type { Person } from '@entities/person/model/types/person.type.ts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { downloadSelectedAsCsv } from './download-csv';

describe('downloadSelectedAsCsv', () => {
  const mockCreateObjectURL = vi.fn();
  const mockRevokeObjectURL = vi.fn();
  const mockClick = vi.fn();
  const originalCreateElement = document.createElement.bind(document);

  const sampleItems: Person[] = [
    {
      name: 'Luke, "Skywalker"',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      name: 'Leia\nOrgana',
      height: '150',
      mass: '49',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '19BBY',
      gender: 'female',
      url: 'https://example.com/no-id',
    },
  ];

  beforeEach(() => {
    mockCreateObjectURL.mockReturnValue('blob:mock-url');
    mockRevokeObjectURL.mockClear();
    mockClick.mockClear();

    vi.spyOn(URL, 'createObjectURL').mockImplementation(mockCreateObjectURL);
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(mockRevokeObjectURL);

    vi.spyOn(document, 'createElement').mockImplementation(
      (tagName: string) => {
        if (tagName.toLowerCase() === 'a') {
          return {
            href: '',
            download: '',
            click: mockClick,
          } as unknown as HTMLAnchorElement;
        }
        return originalCreateElement(tagName);
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates object URL, clicks anchor and revokes URL', () => {
    downloadSelectedAsCsv(sampleItems);

    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('sets download filename based on selected items count', () => {
    const createdAnchor: {
      download: string;
      href: string;
      click: () => void;
    } = {
      href: '',
      download: '',
      click: mockClick,
    };

    vi.spyOn(document, 'createElement').mockImplementation(
      (tagName: string) => {
        if (tagName.toLowerCase() === 'a') {
          return createdAnchor as unknown as HTMLAnchorElement;
        }
        return originalCreateElement(tagName);
      }
    );

    downloadSelectedAsCsv(sampleItems);
    expect(createdAnchor.download).toBe('2_items.csv');
    expect(createdAnchor.href).toBe('blob:mock-url');
  });

  it('builds CSV with escaped cells and transformed details URL for valid SWAPI id', async () => {
    downloadSelectedAsCsv(sampleItems);

    const blob = mockCreateObjectURL.mock.calls[0][0] as Blob;
    const csv = await blob.text();

    expect(csv).toContain('Name,Height (cm),Mass (kg)');
    expect(csv).toContain('"Luke, ""Skywalker"""');
    expect(csv).toContain('"Leia\nOrgana"');
    expect(csv).toContain('/main/1/1');
    expect(csv).toContain('https://example.com/no-id');
  });
});
