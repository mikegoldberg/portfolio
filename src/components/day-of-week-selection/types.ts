type OnDaySelected = {
  (date: string): void;
};

export interface DayOfWeekSelectionProps {
  dates: Array<string>;
  activeDayOfWeek: string;
  onDaySelected: OnDaySelected;
}
