import { BASE_URL } from "@/controllers/consts";

export async function getUsers(from: string, to: string) {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  try {
    const response = await fetch(
      `${BASE_URL}/admin/best-supplier-profession/${from}/${to}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      },
    );
    return response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getBestBuyers(from: string, to: string, limit?: number) {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  const staticLimit = limit || 3;
  try {
    const response = await fetch(
      `${BASE_URL}/admin/best-buyers/${from}/${to}/${staticLimit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      },
    );
    console.log(response);
    return response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}
