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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { paySubmission } from "@/controllers/submissions/submissions";
import { PAYMENT_SUCCESSFULL } from "@/controllers/consts";

interface SubmissionType {
  submissions: Submission;
}
export function PaySubmissionModal({ submissions }: SubmissionType) {
  const [paymentStatus, setPaymentStatus] = useState<string>("unpaid");
  const [message, setMessage] = useState<string>("");
  const paymentLoading = paymentStatus === "loading";
  const paymentSuccess = paymentStatus === "success";

  async function handlePay(agreement: Submission) {
    setPaymentStatus("loading");
    const price = {
      price: agreement.price,
    };
    const res = await paySubmission(price, agreement.id);
    console.log(res);
    setMessage(res.message);
    if (res.message !== PAYMENT_SUCCESSFULL) {
      setPaymentStatus("unpaid");
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Pay</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pay Submission</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>
              You will pay{" "}
              <span className={"font-bold"}> ${submissions.price} </span> for{" "}
              {submissions.description}
            </p>
          </div>
          <DialogFooter className="">
            {message ? (
              <DialogDescription className="text-red-500">
                {message}
              </DialogDescription>
            ) : null}
            <Button
              disabled={paymentLoading || paymentSuccess}
              onClick={() => handlePay(submissions)}
            >
              {paymentLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Pay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
