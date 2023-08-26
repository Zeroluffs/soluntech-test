import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { useAuthentication } from "@/hooks/checkAuthentication";

export default function BestProfessions() {
  useAuthentication();

  return (
    <div className="container mx-auto py-10">
      <DatePickerWithRange />
    </div>
  );
}
