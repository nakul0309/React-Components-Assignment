import React from 'react';
import { InputField } from './components/InputField';
import { DataTable } from './components/DataTable';

interface User { id: number; name: string; email: string; age: number; }

const sample: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 22 }
];

export default function App() {
  const [search, setSearch] = React.useState('');
  const filtered = sample.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">UI Components Demo</h1>
          <button
            className="rounded-xl border px-3 py-1 text-sm"
            onClick={() => document.documentElement.classList.toggle('dark')}
            aria-label="Toggle dark mode"
          >
            Toggle Theme
          </button>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">InputField</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="Search users"
              placeholder="Type a name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              size="md"
              helperText="Try Alice, Bob, or Charlie"
              clearable
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              type="password"
              passwordToggle
              variant="filled"
              size="md"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">DataTable</h2>
          <DataTable<User>
            data={filtered}
            columns={[
              { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
              { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
              { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
            ]}
            selectable
            onRowSelect={(rows) => console.log('Selected:', rows)}
          />
        </section>
      </div>
    </div>
  );
}
