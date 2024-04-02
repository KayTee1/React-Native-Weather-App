import { t } from "i18next";

const weekdays = [t("sun"), t("mon"), t("tue"), t("wed"), t("thu"), t("fri"), t("sat")];
const months = [
  t("jan"),
  t("feb"),
  t("mar"),
  t("apr"),
  t("may"),
  t("jun"),
  t("jul"),
  t("aug"),
  t("oct"),
  t("nov"),
  t("dec"),
];

//returns formatted time e.g thu, 26 feb
export const getFormattedTime = (dt: number) => {
  const date = new Date(dt * 1000);
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  const formattedDate = `${weekday}, ${day}. ${month}`;
  return formattedDate;
};

//returns the day of the week e.g Mon
export const getWeekDay = (dt: number) => {
  const date = new Date(dt * 1000);
  return weekdays[date.getDay()];
};

//returns todays date e.g 2024-02-26 string
export const getRawDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

//returns todays date e.g 26 int
export const getToday = () => {
  const date = new Date();
  return date.getDate();
};

//returns the time e.g 12:00
export const getTime = (dt: number) => {
  const date = new Date(dt * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
