import React from 'react';
import { cn } from '../../utils/cn';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T extends { [key: string]: any }> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyText?: string;
}

type SortState<T> = { key: keyof T | null; order: 'asc' | 'desc' | null };

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  emptyText = 'No data available'
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState<T>>({ key: null, order: null });
  const [selectedKeys, setSelectedKeys] = React.useState<Set<number | string>>(new Set());

  const sorted = React.useMemo(() => {
    if (!sort.key || !sort.order) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const va = a[sort.key!];
      const vb = b[sort.key!];
      if (va == null) return -1;
      if (vb == null) return 1;
      if (va < vb) return sort.order === 'asc' ? -1 : 1;
      if (va > vb) return sort.order === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sort]);

  const toggleSort = (key: keyof T) => {
    setSort((s) => {
      if (s.key !== key) return { key, order: 'asc' };
      if (s.order === 'asc') return { key, order: 'desc' };
      return { key: null, order: null };
    });
  };

  const allSelected = selectable && data.length > 0 && selectedKeys.size === data.length;

  const onToggleRow = (rowKey: number | string, row: T) => {
    if (!selectable) return;
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(rowKey)) next.delete(rowKey); else next.add(rowKey);
      return next;
    });
  };

  React.useEffect(() => {
    if (!selectable || !onRowSelect) return;
    const selectedRows = sorted.filter((_, idx) => selectedKeys.has(idx));
    onRowSelect(selectedRows);
  }, [selectedKeys, selectable, onRowSelect, sorted]);

  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800')}
      role="table" aria-busy={loading || undefined}>
      <table className="min-w-full text-left">
        <thead className="bg-gray-50 text-sm dark:bg-gray-800/50">
          <tr>
            {selectable && (
              <th className="w-10 px-3 py-2">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={!!allSelected}
                  onChange={(e) => {
                    if (!selectable) return;
                    if (e.target.checked) {
                      setSelectedKeys(new Set(data.map((_, i) => i)));
                    } else {
                      setSelectedKeys(new Set());
                    }
                  }}
                />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold">
                <button
                  className={cn('inline-flex items-center gap-1', col.sortable && 'hover:underline')}
                  onClick={() => col.sortable && toggleSort(col.dataIndex)}
                  aria-sort={sort.key === col.dataIndex ? (sort.order === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  {col.title}
                  {col.sortable && (
                    <span aria-hidden>
                      {sort.key !== col.dataIndex && '↕'}
                      {sort.key === col.dataIndex && sort.order === 'asc' && '↑'}
                      {sort.key === col.dataIndex && sort.order === 'desc' && '↓'}
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-sm">
                Loading…
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-sm text-gray-500">
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, idx) => (
              <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50">
                {selectable && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${idx + 1}`}
                      checked={selectedKeys.has(idx)}
                      onChange={() => onToggleRow(idx, row)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm">
                    {String(row[col.dataIndex] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
