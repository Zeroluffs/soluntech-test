import { BASE_URL } from "@/controllers/consts";

export async function addFunds(amount: number, id: string | undefined) {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  const body = {
    amount: amount,
  };
  try {
    const response = await fetch(`${BASE_URL}/balances/deposit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
