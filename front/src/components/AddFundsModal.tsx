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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { addFunds } from "@/controllers/balance/funds";
import useAuth from "@/context/auth";
import { DEPOSIT_SUCCESSFULL } from "@/controllers/consts";
import classNames from "classnames";

export function AddFundsModal() {
  const { setIsModalOpen, isModalOpen } = useSubmission();
  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState("unpaid");
  const isLoading = isProcessing === "loading";
  const isSuccess = isProcessing === "success";
  const isFailure = isProcessing === "failure";
  const [amount, setAmount] = useState<number>(0);
  const { user } = useAuth();
  async function handleSubmit() {
    setIsProcessing("loading");
    const res = await addFunds(amount, user?.userId);
    if (res.message !== DEPOSIT_SUCCESSFULL) {
      setIsProcessing("failure");
    } else {
      setIsProcessing("success");
    }
    setMessage(res.message);
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Funds</DialogTitle>
            <DialogDescription>
              Input the amount you want to add
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                value={amount}
                onChange={handleInputChange}
                type={"number"}
                id="amount"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isLoading || amount === 0}
              onClick={() => handleSubmit()}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4  animate-spin" />
              ) : null}{" "}
              Add Funds
            </Button>
            {message ? (
              <DialogDescription
                className={classNames(
                  isSuccess ? "text-green-500" : "text-red-500",
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
