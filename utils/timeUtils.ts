import { StudySpace, OpeningHours } from "@/types/study-space";

export function isSpaceOpen(space: StudySpace, currentTime: Date): boolean {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = daysOfWeek[currentTime.getDay()];
  const currentHours = space.openingHours[currentDay];

  if (!currentHours) return false;

  const now = currentTime.getHours() * 60 + currentTime.getMinutes();
  const [openHour, openMinute] = currentHours.open.split(":").map(Number);
  const [closeHour, closeMinute] = currentHours.close.split(":").map(Number);
  const openTime = openHour * 60 + openMinute;
  const closeTime = closeHour * 60 + closeMinute;

  return now >= openTime && now < closeTime;
}

export function getOpenUntil(space: StudySpace, currentTime: Date): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = daysOfWeek[currentTime.getDay()];
  const currentHours = space.openingHours[currentDay];

  if (!currentHours) return "Closed";

  return currentHours.close;
}
