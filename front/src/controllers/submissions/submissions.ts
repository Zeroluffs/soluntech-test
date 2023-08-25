import { BASE_URL } from "@/controllers/consts";

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
    console.log(response);
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
