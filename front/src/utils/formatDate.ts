export function formatDate(from: string | null, to: string | null) {
  const fromDate = formatting(from);
  const endDate = formatting(to);

  return { fromDate, endDate };
}

function formatting(originalDateString: string | null) {
  // const originalDateString =
  //   "Tue Jan 17 2023 00:00:00 GMT-0500 (Colombia Standard Time)";
  const originalDate = new Date(originalDateString!!);

  const year = originalDate.getUTCFullYear();
  const month = String(originalDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getUTCDate()).padStart(2, "0");
  const hours = String(originalDate.getUTCHours()).padStart(2, "0");
  const minutes = String(originalDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(originalDate.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(originalDate.getUTCMilliseconds()).padStart(
    3,
    "0",
  );

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} +00:00`;
}
