"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noDataEntry: React.ReactNode;
  pageSize?: number;
}

export function PaginatedDataTable<TData, TValue>({
  columns,
  data,
  noDataEntry = "Pas de résultats",
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
  });

  const pages = Array.from({ length: table.getPageCount() }, (_, i) => i);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-bold bg-slate-700"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => {
                    const isAction = cell.column.columnDef.id === "actions";
                    return (
                      <TableCell
                        key={cell.id}
                        className={clsx(
                          isAction &&
                            "opacity-0 group-hover:opacity-100 transition-opacity"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noDataEntry}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pages.length > 1 && (
        <Pagination className="mt-3">
          <PaginationContent>
            <PaginationItem
              className={cn(
                table.getCanPreviousPage()
                  ? "hover:cursor-pointer"
                  : "pointer-events-none opacity-50"
              )}
            >
              <PaginationPrevious
                onClick={() => table.previousPage()}
                isActive={table.getCanPreviousPage()}
              />
            </PaginationItem>
            {pages.map((num) => {
              return (
                <PaginationItem key={num}>
                  <PaginationLink
                    className={cn(
                      "hover:cursor-pointer",
                      num === table.getState().pagination.pageIndex &&
                        "bg-zinc-200 text-zinc-900"
                    )}
                    onClick={() => table.setPageIndex(num)}
                  >
                    {num}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
            <PaginationItem
              className={cn(
                table.getCanNextPage()
                  ? "hover:cursor-pointer"
                  : "pointer-events-none opacity-50"
              )}
            >
              <PaginationNext
                onClick={() => table.nextPage()}
                isActive={table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
