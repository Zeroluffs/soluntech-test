import { BASE_URL } from "@/controllers/consts";

type SubProp = {
  price: number;
};
export async function getUnpaidSubmissions(): Promise<Submission[]> {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  try {
    const response = await fetch(`${BASE_URL}/submissions/unpaid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function paySubmission(price: SubProp, id: number) {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  try {
    const response = await fetch(`${BASE_URL}/submissions/${id}/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(price),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
