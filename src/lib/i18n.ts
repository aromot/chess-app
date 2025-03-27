export function formatDate(d: string | Date): string {
  const date = d instanceof Date ? d : new Date(d);
  return new Intl.DateTimeFormat("en-US").format(date);
}

export function formatDateTime(d: string | Date): string {
  const date = d instanceof Date ? d : new Date(d);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Africa/Casablanca",
  }).format(date);
}
