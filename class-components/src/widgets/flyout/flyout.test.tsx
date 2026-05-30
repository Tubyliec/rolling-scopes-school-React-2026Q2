import type { Person } from '@entities/person/model/types/person.type.ts';
import { fireEvent,render, screen } from '@testing-library/react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { useSelectionStore } from '@/core/store/selection-store.ts';
import * as downloadUtils from '@/shared/utilities/download-csv.ts';

import Flyout from './flyout';

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

describe('Flyout', () => {
  beforeEach(() => {
    useSelectionStore.setState({ selectedItems: [] });
  });

  it('renders nothing when no items are selected', () => {
    const { container } = render(<Flyout />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when at least one item is selected', () => {
    useSelectionStore.setState({ selectedItems: [makePerson(1)] });
    render(<Flyout />);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('displays the correct item count', () => {
    useSelectionStore.setState({
      selectedItems: [makePerson(1), makePerson(2), makePerson(3)],
    });
    render(<Flyout />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('displays singular label for 1 item', () => {
    useSelectionStore.setState({ selectedItems: [makePerson(1)] });
    const { container } = render(<Flyout />);
    expect(container.querySelector('.flyout__count')?.textContent).toContain(
      '1'
    );
    expect(container.querySelector('.flyout__count')?.textContent).toContain(
      'item selected'
    );
  });

  it('displays plural label for multiple items', () => {
    useSelectionStore.setState({
      selectedItems: [makePerson(1), makePerson(2)],
    });
    const { container } = render(<Flyout />);
    expect(container.querySelector('.flyout__count')?.textContent).toContain(
      '2'
    );
    expect(container.querySelector('.flyout__count')?.textContent).toContain(
      'items selected'
    );
  });

  it('renders Unselect all button', () => {
    useSelectionStore.setState({ selectedItems: [makePerson(1)] });
    render(<Flyout />);
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
  });

  it('renders Download button', () => {
    useSelectionStore.setState({ selectedItems: [makePerson(1)] });
    render(<Flyout />);
    expect(screen.getByText('↓ Download')).toBeInTheDocument();
  });

  it('clicking Unselect all clears the selection store', () => {
    useSelectionStore.setState({
      selectedItems: [makePerson(1), makePerson(2)],
    });
    render(<Flyout />);
    fireEvent.click(screen.getByText('Unselect all'));
    expect(useSelectionStore.getState().selectedItems).toHaveLength(0);
  });

  it('flyout disappears after Unselect all is clicked', () => {
    useSelectionStore.setState({ selectedItems: [makePerson(1)] });
    render(<Flyout />);
    fireEvent.click(screen.getByText('Unselect all'));
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });

  it('clicking Download calls downloadSelectedAsCsv with selected items', () => {
    const items = [makePerson(1), makePerson(2)];
    useSelectionStore.setState({ selectedItems: items });
    const spy = vi
      .spyOn(downloadUtils, 'downloadSelectedAsCsv')
      .mockImplementation(() => {});
    render(<Flyout />);
    fireEvent.click(screen.getByText('↓ Download'));
    expect(spy).toHaveBeenCalledWith(items);
    spy.mockRestore();
  });
});
