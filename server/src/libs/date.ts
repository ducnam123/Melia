export const currentDateTime = () => {
  const date = new Date();
  const currentDataTime = date.toLocaleString([], { hour12: true });

  return currentDataTime;
};

export const getDateAfterDuration = (duration: string) => {
  const currentDate = new Date();
  const parts = duration.match(/(\d+)([dhms])/);

  if (!parts) return null;

  const amount = parseInt(parts[1], 10);
  const unit = parts[2];

  let multiplier: number;

  switch (unit) {
    case "d":
      multiplier = 24 * 60 * 60 * 1000; // 1 ngày tính bằng mili giây
      break;
    case "h":
      multiplier = 60 * 60 * 1000; // 1 giờ tính bằng mili giây
      break;
    case "m":
      multiplier = 60 * 1000; // 1 phút tính bằng mili giây
      break;
    case "s":
      multiplier = 1000; // 1 giây tính bằng mili giây
      break;
    default:
      return null;
  }

  const futureDate = new Date(currentDate.getTime() + amount * multiplier);
  return futureDate;
};
