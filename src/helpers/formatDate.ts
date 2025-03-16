export const formatDate = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("default", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  
  const parts = formatter.formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {} as Record<string, string>); 

  return `${parts.day}.${parts.month}.${parts.year} ${parts.hour}:${parts.minute}`;
};
