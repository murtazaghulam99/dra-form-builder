export const formattedDateTime = (date) => {
  const dateTime = new Date(date);
  const formattedDate = dateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const formattedTime = dateTime.toLocaleTimeString(
    undefined,
    timeFormatOptions
  );

  const formatted = `${formattedDate} ${formattedTime}`;
  return formatted;
};
