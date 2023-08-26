import { BASE_URL } from "@/controllers/consts";

export async function getUsers(from: string, to: string) {
  const start = from;
  const end = to;
  const response = await fetch(
    `${BASE_URL}/admin/best-supplier-profession/${start}/${end}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": token,
      },
    },
  );
}
