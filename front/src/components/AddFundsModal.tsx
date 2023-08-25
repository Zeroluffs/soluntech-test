import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useSubmission from "@/context/submission";

export function AddFundsModal() {
  const { setIsModalOpen, isModalOpen } = useSubmission();

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {/*<DialogTrigger asChild>*/}
        {/*  <Button variant="outline">Pay</Button>*/}
        {/*</DialogTrigger>*/}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Funds</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p></p>
          </div>
          {/*<DialogFooter className="">*/}
          {/*  {message ? (*/}
          {/*    <DialogDescription className="text-red-500">*/}
          {/*      {message}*/}
          {/*    </DialogDescription>*/}
          {/*  ) : null}*/}
          {/*  <Button*/}
          {/*    disabled={paymentLoading || paymentSuccess}*/}
          {/*    onClick={() => handlePay(submissions)}*/}
          {/*  >*/}
          {/*    {paymentLoading ? (*/}
          {/*      <Loader2 className="mr-2 h-4 w-4 animate-spin" />*/}
          {/*    ) : null}*/}
          {/*    Pay*/}
          {/*  </Button>*/}
          {/*</DialogFooter>*/}
        </DialogContent>
      </Dialog>
    </>
  );
}
