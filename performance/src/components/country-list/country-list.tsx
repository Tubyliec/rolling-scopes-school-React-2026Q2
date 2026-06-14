import { memo, useMemo } from 'react';

import type { Country } from '../../types';

import { CountryCard } from '../country-card/country-card';

import { createYearDataMap, getPopulationForYear } from '../../utils/data-transformers';

import styles from './country-list.module.css';

import { List, type RowComponentProps } from 'react-window';

const LIST_HEIGHT = 800;
const CARD_BASE_HEIGHT = 130;
const ROW_HEIGHT_PER_COLUMN = 36;
const CARD_GAP = 16;

type RowProps = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

const Row = ({
  style,
  index,
  countries,
  selectedYear,
  selectedColumns,
}: RowComponentProps<RowProps>) => (
  <div style={{ ...style, paddingBottom: CARD_GAP }}>
    <CountryCard
      country={countries[index]}
      selectedYear={selectedYear}
      selectedColumns={selectedColumns}
    />
  </div>
);

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = memo(
  ({
    countries,
    searchQuery,
    selectedColumns,
    selectedRegion,
    selectedYear,
    sortField,
    sortOrder,
  }: CountryListProps) => {
    const populationByCountry = useMemo(() => {
      const map = new Map<string, number>();
      countries.forEach((c) => {
        const yearMap = createYearDataMap(c.data);
        map.set(c.id, getPopulationForYear(yearMap, selectedYear) ?? 0);
      });
      return map;
    }, [countries, selectedYear]);

    const filteredCountries = useMemo(() => {
      const searchLower = searchQuery.toLowerCase();

      return countries
        .filter((c) => {
          const matchesSearch = c.id.toLowerCase().includes(searchLower);
          const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
          return matchesSearch && matchesRegion;
        })
        .sort((a, b) => {
          if (sortField === 'name') {
            return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
          }
          const popA = populationByCountry.get(a.id) ?? 0;
          const popB = populationByCountry.get(b.id) ?? 0;
          return sortOrder === 'asc' ? popA - popB : popB - popA;
        });
    }, [countries, searchQuery, selectedRegion, sortField, sortOrder, populationByCountry]);

    const rowHeight = useMemo(
      () => CARD_BASE_HEIGHT + selectedColumns.length * ROW_HEIGHT_PER_COLUMN + CARD_GAP,
      [selectedColumns.length]
    );

    const rowProps = useMemo(
      () => ({ selectedYear, selectedColumns, countries: filteredCountries }),
      [selectedYear, selectedColumns, filteredCountries]
    );

    return (
      <div className={styles.countryList}>
        <List<RowProps>
          style={{ width: '100%' }}
          defaultHeight={LIST_HEIGHT}
          rowCount={filteredCountries.length}
          rowHeight={rowHeight}
          rowComponent={Row}
          rowProps={rowProps}
        >
          {null}
        </List>
      </div>
    );
  }
);
