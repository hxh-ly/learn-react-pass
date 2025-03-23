import dayjs, { Dayjs } from "dayjs";
import "./index.scss";
export interface CalendarProps {
  value: Dayjs;
}
interface MonthCalendarProps extends CalendarProps {}
function Header() {
  return (
    <>
      <div className="calendar-header">
        <div className="calendar-header-left">
          <div className="calendar-header-icon">&lt;</div>
          <div className="calendar-header-value">2023-07-01</div>
          <div className="calendar-header-icon">&gt;</div>
          <button className="calendar-header-btn">今天</button>
        </div>
      </div>
    </>
  );
}

function MonthCalendar(props: MonthCalendarProps) {
  const weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const { value } = props;
  function getMonthAllDay(date: Dayjs) {
    let dayInMonth = value.daysInMonth(); //总天数拿来渲染
    let startDate = value.startOf("month"); //
    let week = startDate.day(); // 星期几 之前的渲染为空
    const daysInfo = new Array(6 * 7);
    for (let i = 0; i < week; i++) {
      daysInfo[i] = {
        date: startDate.subtract(week - i, "day"),
        currentMonth: false,
      };
    }
    for (let i = week; i < daysInfo.length; i++) {
      let curDate = startDate.add(i - week, "day");
      daysInfo[i] = {
        date: curDate,
        currentMonth: curDate.month() === startDate.month(),
      };
    }
    return daysInfo;
  }
 const allDays =  getMonthAllDay(value);
  const rednerFn = (date:{date:Dayjs,currentMonth:boolean}[]) => {
    // 月份的总天数
    // 开始的时间

    const rows = [];
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        const item = date[i * 7 + j];
        row[j]=(<div className={ "calendar-month-body-cell " + (item.currentMonth ? 'calendar-month-body-cell-current' : '')} key={item.date.date()} >{item.date.date()}</div>);
      }
      rows.push(row);
    }
    return rows.map(v=>{
        return <div className="calendar-month-body-row">{v}</div>
    });
  };
  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((v) => (
          <div className="calendar-month-week-list-item" key={v}>
            {v}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">
        {rednerFn(allDays)}
      </div>
    </div>
  );
}

export function Calendar(props: CalendarProps) {
  return (
    <div className="calendar">
      <Header />
      <MonthCalendar {...props} />
    </div>
  );
}
