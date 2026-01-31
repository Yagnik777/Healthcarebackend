// export const generateSlots = (from: string, to: string, duration: number): string[] => {
//   const slots: string[] = [];
//   let start = new Date(`2000-01-01T${from}:00`);
//   const end = new Date(`2000-01-01T${to}:00`);

//   while (start < end) {
//     slots.push(start.toTimeString().substring(0, 5));
//     start.setMinutes(start.getMinutes() + duration);
//   }
//   return slots;
// };
/**
 * @param from - Start time (e.g., "09:00")
 * @param to - End time (e.g., "17:00")
 * @param duration - Slot duration in minutes (e.g., 30)
 * @returns Array of time slots ["09:00", "09:30", ...]
 */
export const generateSlots = (from: string, to: string, duration: number): string[] => {
  const slots: string[] = [];
  
  // Date ઓબ્જેક્ટ બનાવતી વખતે પ્રોડક્શનમાં ISO format વાપરવું વધુ સેફ છે
  let start = new Date(`2000-01-01T${from}:00`);
  let end = new Date(`2000-01-01T${to}:00`);

  // Production Logic: જો 'to' સમય 'from' કરતા ઓછો હોય, તો તેનો અર્થ એ કે તે બીજા દિવસે જાય છે
  if (end <= start) {
    end.setDate(end.getDate() + 1);
  }

  // લોકલ અને પ્રોડક્શનમાં ડ્યુરેશન 0 કે નેગેટિવ ન હોય તે ચેક કરવું જરૂરી
  const slotDuration = duration > 0 ? duration : 30;

  while (start < end) {
    // HH:mm ફોર્મેટમાં સ્લોટ પુશ કરો
    slots.push(start.toTimeString().substring(0, 5));
    
    // મિનિટ્સ ઉમેરો
    start.setMinutes(start.getMinutes() + slotDuration);
  }

  return slots;
};