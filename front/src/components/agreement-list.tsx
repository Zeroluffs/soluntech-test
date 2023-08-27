import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAgreements } from "@/utils/fetchers";
import { Loader2 } from "lucide-react";
import { LoaderSpin } from "@/components/loader-spin";

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
  const { data, error, isLoading } = useAgreements();

  if (isLoading) {
    return <LoaderSpin />;
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
