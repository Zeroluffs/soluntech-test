"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/utils/formatDate";
import { getUsers } from "@/controllers/admin/admin";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 7, 20),
    to: addDays(new Date(2023, 7, 20), 20),
  });
  const [message, setMessage] = React.useState<string>("");
  async function searchUsers() {
    if (date!.from !== null && date!.to !== null) {
      // @ts-ignore
      const from = date.from.toDateString();
      const to = date!!.to!!.toDateString();
      const { fromDate, endDate } = formatDate(from, to);
      const objectDate = await getUsers(fromDate, endDate);
      if (objectDate.message) {
        setMessage(objectDate.message);
      } else {
        const str = `The best profession was ${
          objectDate.best_buyer_profession
        } with a total earned of $${objectDate.total_earned.toFixed(
          2,
        )} for the given time period`;
        setMessage(str);
      }
    }
  }
  console.log(date);
  return (
    <div className={"flex flex-col gap-6"}>
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Button
          disabled={date?.from === undefined || date?.to === undefined}
          onClick={searchUsers}
          className="w-[144px] mt-2"
        >
          Search
        </Button>
      </div>
      <p className={"text-lg font-semibold"}>{message}</p>
    </div>
  );
}
