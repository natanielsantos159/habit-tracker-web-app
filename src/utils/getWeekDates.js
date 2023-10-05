
export function getWeekDates() {
  const currentDate = new Date();

  const currentDayOfWeek = currentDate.getDay();
  
  const daysOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);
  
  const weekDates = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];
    const dayOfWeek = daysOfWeekNames[i];
    weekDates.push({ day: dayOfWeek, date: formattedDate });
  }

  return weekDates;
}