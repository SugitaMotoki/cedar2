import type { CalendarDate } from "@internationalized/date";
import { now, getLocalTimeZone, toCalendarDate } from "@internationalized/date";

/**
 * 日付を利用するためのコンポーザブル
 * @returns
 */
export const useDate = () => {
  /**
   * 現在時刻
   */
  const nowZonedDateTime = now(getLocalTimeZone());

  /**
   * 今日の年月日
   */
  const todayCalendarDate = toCalendarDate(nowZonedDateTime);

  /**
   * CalendarDateを日付文字列に変換するメソッド
   * @param date
   * @param delimiter
   * @returns
   */
  const convertCalendarDateToDateString = (
    date: CalendarDate,
    delimiter: string = "-",
  ) => convertDateNumbersToString(date.year, date.month, date.day, delimiter);

  /**
   * 年月日の数字から文字列を作成するメソッド
   * @param year 年
   * @param month 月
   * @param day 日
   * @param delimiter 区切り文字
   */
  const convertDateNumbersToString = (
    year: number,
    month: number,
    day: number,
    delimiter: string = "-",
  ) =>
    `${convertYearToYyyy(year)}${delimiter}${convertMonthToMm(month)}${delimiter}${convertDayToDd(day)}`;

  /**
   * 年の数字をYYYYに変換するメソッド
   * @param year
   */
  const convertYearToYyyy = (year: number): string => {
    return year.toString().padStart(4, "0");
  };

  /**
   * 月の数字をMMに変換するメソッド
   * @param month
   */
  const convertMonthToMm = (month: number): string => {
    return month.toString().padStart(2, "0");
  };

  /**
   * 日の数字をDDに変換するメソッド
   * @param day
   */
  const convertDayToDd = (day: number): string => {
    return day.toString().padStart(2, "0");
  };

  return {
    now: nowZonedDateTime,
    today: todayCalendarDate,
    convertCalendarDateToDateString,
    convertDateNumbersToString,
    convertYearToYyyy,
    convertMonthToMm,
    convertDayToDd,
  };
};
