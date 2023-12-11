/** 사용법
const getDateInstance = new GetDate('2023.11.14 13:04:08');
console.log (getDateInstance.getDateYearMonthDay()) // 2023.11.14
*/

class GetDate {
  dateTime: Date | null;

  date = { year: "", month: "", day: "", hours: "", minutes: "", seconds: "" };

  constructor(datetimeString: string) {
    const [datePart, timePart] = datetimeString.split(" ");
    const [year, month, day] = datePart.split(".").map((time: string) => parseInt(time, 10));
    const [hours, minutes, seconds] = timePart.split(":").map((time: string) => parseInt(time, 10));
    toString();
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
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

  getDateYearMonthDay(): string {
    return `${this.date.year}.${this.date.month.padStart(2, "0")}.${this.date.day.padStart(2, "0")}`;
  }
}

export default GetDate;
