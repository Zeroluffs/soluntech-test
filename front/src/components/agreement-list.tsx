import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getUserAgreements } from "@/controllers/agreement/agreement";
import { DataTable } from "@/components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSWR from "swr";

export const columns: ColumnDef<Agreement>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "terms",
    header: "Terms",
  },
];

export default function AgreementList() {
  const { data, error, isLoading } = useSWR(
    "/api/agreements",
    getUserAgreements,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        enableSorting={true}
        data={data!!}
        filterValue={"status"}
      />
    </div>
  );
}
