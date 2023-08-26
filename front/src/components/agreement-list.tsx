import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAgreements } from "@/utils/fetchers";

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
