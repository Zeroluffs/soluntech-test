import { BASE_URL } from "@/controllers/consts";

export async function getUserAgreements(): Promise<Agreement[]> {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  try {
    const response = await fetch(`${BASE_URL}/agreements`, {
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
