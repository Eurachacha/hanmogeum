/** 사용법
const getDateInstance = new GetDate('2023.11.14 13:04:08');
console.log (getDateInstance.getDateYearMonthDay()) // 2023.11.14
*/

// 입력받은 날짜를 기준으로 원하는 값을 리턴하는 클래스
class GetDateNow {
  dateTime: Date;

  date = { year: "", month: "", day: "", hours: "", minutes: "", seconds: "" };

  constructor(date: Date) {
    this.dateTime = date;
    this.#setDate();
  }

  #setDate() {
    if (this.dateTime !== null) {
      this.date.year = `${this.dateTime.getFullYear()}`;
      this.date.month = `${this.dateTime.getMonth() + 1}`;
      this.date.day = `${this.dateTime.getDate()}`;
      this.date.hours = `${this.dateTime.getHours()}`;
      this.date.minutes = `${this.dateTime.getMinutes()}`;
      this.date.seconds = `${this.dateTime.getSeconds()}`;
    }
  }

  static formatDate(date: Date): string {
    const year = `${date.getFullYear()}`;
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  getDateYearMonthDay(): string {
    return `${this.date.year}.${this.date.month.padStart(2, "0")}.${this.date.day.padStart(2, "0")}`;
  }

  getDateMonth(month: number): string {
    const newDate = new Date(this.dateTime);
    newDate.setMonth(newDate.getMonth() + month);
    return GetDateNow.formatDate(newDate);
  }

  getDateYear(year: number): string {
    const newDate = new Date(this.dateTime);
    newDate.setFullYear(newDate.getFullYear() + year);
    return GetDateNow.formatDate(newDate);
  }

  getDateDay(day: number): string {
    const newDate = new Date(this.dateTime);
    newDate.setDate(newDate.getDate() + day);
    return GetDateNow.formatDate(newDate);
  }
}

export default GetDateNow;
