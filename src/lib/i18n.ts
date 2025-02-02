export function formatDate(d: string | Date): string {
  const date = d instanceof Date ? d : new Date(d);
  return new Intl.DateTimeFormat("fr-FR").format(date);
}

export function formatDateTime(d: string | Date): string {
  const date = d instanceof Date ? d : new Date(d);
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Africa/Casablanca",
  }).format(date);
}
