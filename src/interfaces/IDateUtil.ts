export interface IDateUtil {
  getFormattedDate(date: Date): string;
  addDays(date: Date, days: number): Date;
}
