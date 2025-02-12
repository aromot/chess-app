# Reset the auto-incrementing `id` column for your `Directory` table in Supabase (PostgreSQL)

To reset the auto-incrementing `id` column for your `Directory` table in Supabase (PostgreSQL), follow these steps:

## Method 1: Reset and Delete All Data

Use this if you want to delete all existing rows and reset the id counter to `1`.

```sql
TRUNCATE "Directory" RESTART IDENTITY;
```

- `TRUNCATE` removes all rows.

- `RESTART IDENTITY` resets the auto-increment sequence to `1`.

## Method 2: Reset Without Deleting Data

Use this if you want to keep existing data but reset the sequence to start after the current maximum `id`.

1. Find the sequence name linked to the id column:

```sql
SELECT pg_get_serial_sequence('"Directory"', 'id');
```

2. Reset the sequence to the next available value:

```sql
SELECT setval(
  pg_get_serial_sequence('"Directory"', 'id'),
  COALESCE((SELECT MAX(id) FROM "Directory"), 0) + 1
);
```

- `COALESCE` handles cases where the table is empty (starts at `1`).

## Notes

- Primary Key Conflicts: If you manually reset the sequence to a value lower than existing `id`s, new inserts will fail due to duplicate keys.

- Case Sensitivity: Use double quotes (`"Directory"`) if your table name is case-sensitive.

- Run these commands in Supabase SQL Editor or via a PostgreSQL client.
