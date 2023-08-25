type Submission = {
  id: number;
  description: string;
  price: number;
  paid: boolean;
  paymentDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  AgreementId: number;
};
