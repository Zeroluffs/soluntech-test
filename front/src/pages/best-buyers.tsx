import { DatePickerRange } from "@/components/date-picker-with-range";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/utils/formatDate";
import { getBestBuyers, getUsers } from "@/controllers/admin/admin";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { BestBuyer } from "@/types/bestbuyer";
import { DataTable } from "@/components/data-table";

export const columns: ColumnDef<BestBuyer>[] = [
  {
    accessorKey: "BuyerId",
    header: "ID",
  },
  {
    accessorKey: "BuyerName",
    header: "Name",
  },
  {
    accessorKey: "BuyerProfession",
    header: "Profession",
  },
  {
    accessorKey: "total_earned",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Earned
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
export default function BestBuyers() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 7, 20),
    to: addDays(new Date(2023, 7, 20), 20),
  });
  const [bestBuyers, setBestBuyers] = React.useState<BestBuyer[]>([]);
  const [message, setMessage] = React.useState<string>("");
  async function searchBestBuyers(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (date!.from !== null && date!.to !== null) {
      // @ts-ignore
      const from = date.from.toDateString();
      const to = date!!.to!!.toDateString();
      const { fromDate, endDate } = formatDate(from, to);
      const objectDate = await getBestBuyers(fromDate, endDate);
      setBestBuyers(objectDate);
    }
  }
  return (
    <div className="container mx-auto  py-0 sm:py-10">
      <form onSubmit={searchBestBuyers}>
        <DatePickerRange setDate={setDate} date={date} />
        <Input className="w-[144px]" type={"number"} placeholder="Limit" />
        <Button
          disabled={date?.from === undefined || date?.to === undefined}
          type={"submit"}
          className="w-[212px] my-6"
        >
          Search Best Buyers
        </Button>
      </form>
      <DataTable
        columns={columns}
        data={bestBuyers}
        filterValue={"total_earned"}
        enableSorting={false}
      />
    </div>
  );
}
