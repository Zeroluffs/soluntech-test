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
import { PAYMENT_SUCCESSFUL } from "@/controllers/consts";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import useSubmission from "@/context/submission";
import useAuth from "@/context/auth";
import classNames from "classnames";
import { mutate } from "swr";

interface SubmissionType {
  submissions: Submission;
}
export function PaySubmissionModal({ submissions }: SubmissionType) {
  const [paymentStatus, setPaymentStatus] = useState<string>("unpaid");
  const [message, setMessage] = useState<string>("");
  const paymentLoading = paymentStatus === "loading";
  const paymentSuccess = paymentStatus === "success";
  const { toast } = useToast();
  const { setIsModalOpen } = useSubmission();
  const { setBalance, balance } = useAuth();
  const [open, setOpen] = useState(false);
  async function handlePay(agreement: Submission) {
    setPaymentStatus("loading");
    const price = {
      price: agreement.price,
    };
    const res = await paySubmission(price, agreement.id);
    console.log(res);
    setMessage(res.message);
    if (res.message !== PAYMENT_SUCCESSFUL) {
      setPaymentStatus("unpaid");
      toast({
        variant: "destructive",
        title: "Error",
        description: res.message,
        action: (
          <ToastAction
            onClick={() => {
              setOpen(false);
              setIsModalOpen(true);
            }}
            altText={"Deposit Money"}
          >
            Deposit Money
          </ToastAction>
        ),
      });
    } else {
      await mutate("/api/unpaidSubmissions");
      setPaymentStatus("success");
      setBalance(balance - agreement.price);
      toast({
        title: "Success",
        description: res.message,
      });
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Pay</Button>
        </DialogTrigger>
        <DialogContent className="w-[300px] sm:max-w-[425px]">
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
            <Button
              disabled={paymentLoading || paymentSuccess}
              onClick={() => handlePay(submissions)}
            >
              {paymentLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Pay
            </Button>
            {message ? (
              <DialogDescription
                className={classNames(
                  !paymentSuccess ? "text-red-500" : "text-green-500",
                  "",
                )}
              >
                {message}
              </DialogDescription>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
