import { DatePickerRange } from "@/components/date-picker-with-range";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/utils/formatDate";
import { getBestBuyers, getUsers } from "@/controllers/admin/admin";

export default function BestBuyers() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 7, 20),
    to: addDays(new Date(2023, 7, 20), 20),
  });
  const [message, setMessage] = React.useState<string>("");
  async function searchBestBuyers(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (date!.from !== null && date!.to !== null) {
      // @ts-ignore
      const from = date.from.toDateString();
      const to = date!!.to!!.toDateString();
      const { fromDate, endDate } = formatDate(from, to);
      const objectDate = await getBestBuyers(fromDate, endDate);
      console.log(objectDate);
      // if (objectDate.message) {
      //   setMessage(objectDate.message);
      // } else {
      //   const str = `The best profession was ${
      //     objectDate.best_buyer_profession
      //   } with a total earned of $${objectDate.total_earned.toFixed(
      //     2,
      //   )} for the given time period`;
      //   setMessage(str);
      // }
    }
  }
  return (
    <div className="container mx-auto py-10">
      <form onSubmit={searchBestBuyers}>
        <DatePickerRange setDate={setDate} date={date} />
        <Input className="w-[144px]" type={"number"} placeholder="Limit" />
        <Button
          disabled={date?.from === undefined || date?.to === undefined}
          type={"submit"}
          className="w-[212px] mt-6"
        >
          Search Best Buyers
        </Button>
      </form>
    </div>
  );
}
