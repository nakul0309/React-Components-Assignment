import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from './DataTable';

type Row = { id: number; name: string };

const rows: Row[] = [
  { id: 1, name: 'B' },
  { id: 2, name: 'A' }
];

it('sorts by column when header clicked', () => {
  render(
    <DataTable<Row>
      data={rows}
      columns={[{ key: 'name', title: 'Name', dataIndex: 'name', sortable: true }]}
    />
  );
  const header = screen.getByRole('button', { name: /name/i });
  fireEvent.click(header); // asc
  const cells = screen.getAllByRole('cell');
  // first cell after sort should contain 'A'
  expect(cells[0]).toHaveTextContent('A');
});

it('selects rows when selectable', () => {
  const onRowSelect = vi.fn();
  render(
    <DataTable<Row>
      data={rows}
      columns={[{ key: 'name', title: 'Name', dataIndex: 'name' }]}
      selectable
      onRowSelect={onRowSelect}
    />
  );
  const checkbox = screen.getByRole('checkbox', { name: /select row 1/i });
  fireEvent.click(checkbox);
  expect(onRowSelect).toHaveBeenCalled();
});
