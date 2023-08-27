import { useAuthentication } from "@/hooks/checkAuthentication";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { PaySubmissionModal } from "@/components/pay-submission-modal";
import { useUnpaidSubmissions } from "@/utils/fetchers";
import { LoaderSpin } from "@/components/loader-spin";

export const columns: ColumnDef<Submission>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const submission = row.original;
      return <PaySubmissionModal submissions={submission} />;
    },
  },
];

export default function UnpaidSubmissions() {
  const { data, error, isLoading } = useUnpaidSubmissions();
  useAuthentication();
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
        data={data!!}
        filterValue={"description"}
        enableSorting={true}
      />
    </div>
  );
}
