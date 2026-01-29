export const generateSlots = (from: string, to: string, duration: number): string[] => {
  const slots: string[] = [];
  let start = new Date(`2000-01-01T${from}:00`);
  const end = new Date(`2000-01-01T${to}:00`);

  while (start < end) {
    slots.push(start.toTimeString().substring(0, 5));
    start.setMinutes(start.getMinutes() + duration);
  }
  return slots;
};