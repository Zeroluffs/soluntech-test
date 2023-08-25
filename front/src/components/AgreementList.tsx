import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getUserAgreements } from "@/controllers/agreement/agreement";
import { DataTable } from "@/components/data-table";

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
  const [agreements, setAgreements] = useState<Agreement[]>([]);

  useEffect(() => {
    const getAgreements = async () => {
      const response = await getUserAgreements();
      setAgreements(response);
    };
    getAgreements();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={agreements} />
    </div>
  );
}
