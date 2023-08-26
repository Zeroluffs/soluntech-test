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
