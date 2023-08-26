import { useAuthentication } from "@/hooks/checkAuthentication";
import { useEffect, useState } from "react";
import { getUnpaidSubmissions } from "@/controllers/submissions/submissions";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PaySubmissionModal } from "@/components/PaySubmissonModal";
import { SubmissionProvider } from "@/context/submission";

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
function handlePay(agreement: Submission) {
  console.log(agreement);
  console.log("pay");
}
export default function UnpaidSubmissions() {
  const [unpaidSubmissions, setUnpaidSubmissions] = useState<Submission[]>([]);
  useEffect(() => {
    const getAgreements = async () => {
      const res = await getUnpaidSubmissions();
      setUnpaidSubmissions(res);
    };
    getAgreements();
  }, []);

  useAuthentication();

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={unpaidSubmissions}
        filterValue={"description"}
        enableSorting={true}
      />
    </div>
  );
}
