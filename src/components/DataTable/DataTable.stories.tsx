import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';

type User = { id: number; name: string; email: string; age: number };
const data: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 22 }
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  parameters: { layout: 'padded' }
};
export default meta;

export type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data,
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
      { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
    ]
  }
};

export const Selectable: Story = {
  args: { ...Default.args, selectable: true }
};

export const Loading: Story = {
  args: { ...Default.args, loading: true }
};

export const Empty: Story = {
  args: { data: [], columns: Default.args!.columns! }
};
