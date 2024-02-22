const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getFormattedTime = () => {
  const date = new Date();
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  const formattedDate = `${weekday}, ${day} ${month}`;
  return formattedDate;
};

export const getWeekDay = (dt: number) => {
  const date = new Date(dt * 1000);
  console.log('Unix timestamp:', dt);
  console.log('Day of the week index:', date.getDay());
  return weekdays[date.getDay()];
};
