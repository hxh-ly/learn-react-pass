import dayjs, { Dayjs } from "dayjs";
import "./index.scss";
import { CSSProperties, ReactNode, useState } from "react";
import cs from "classnames";
import { useControllableValue } from "ahooks";
export interface CalendarProps {
  className?: string;
  style?: CSSProperties;
  dateRender?: (date: Dayjs) => ReactNode;
  dateInnerRender?: (date: Dayjs) => ReactNode;
  value: Dayjs;
  onChange?: (date: Dayjs) => void;
}
interface HeaderProps {
  curMonth: Dayjs;
  prevClick: () => void;
  nextClick: () => void;
  toDayClick: () => void;
}
interface MonthCalendarProps extends CalendarProps {
  selectHandler:(date:Dayjs)=>void;
  curMonth:Dayjs;
}
function Header(props: HeaderProps) {
  const { prevClick, nextClick, toDayClick, curMonth } = props;
  return (
    <>
      <div className="calendar-header">
        <div className="calendar-header-left">
          <div className="calendar-header-icon" onClick={prevClick}>
            &lt;
          </div>
          <div className="calendar-header-value">
            {curMonth.format("YYYY/MM")}
          </div>
          <div className="calendar-header-icon" onClick={nextClick}>
            &gt;
          </div>
          <button className="calendar-header-btn" onClick={toDayClick}>
            今天
          </button>
        </div>
      </div>
    </>
  );
}

function MonthCalendar(props: MonthCalendarProps) {
  const weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const { value, dateRender, dateInnerRender, selectHandler,curMonth} =
    props;
    console.log('MonthCalendar');
  function getMonthAllDay(date: Dayjs) {
    let startDate = date.startOf("month"); //
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
  const allDays = getMonthAllDay(curMonth);
  const renderDays = (date: { date: Dayjs; currentMonth: boolean }[],value:Dayjs,dateRender?:MonthCalendarProps['dateRender'],dateInnerRender?:MonthCalendarProps['dateInnerRender'],selectHandler?:(date:Dayjs)=>void) => {
    // 月份的总天数
    // 开始的时间
    console.log('renderDays')
    const rows = [];
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        const item = date[i * 7 + j];
        row[j] = (
          <div
            className={
              "calendar-month-body-cell " +
              ( item.currentMonth ? "calendar-month-body-cell-current" : "")
              
            }
            onClick={(e)=>(selectHandler?.(item.date))}
            key={item.date.date()}
          >
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className="calendar-month-body-cell-date">
                <div className={cs("calendar-month-body-cell-date-value",
                                    value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                                        ? "calendar-month-body-cell-date-selected"
                                        : ""
                                )}>
                  {item.date.date()}
                </div>
                <div className="calendar-month-body-cell-date-content">
                  {dateInnerRender?.(item.date)}
                </div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }
    return rows.map((v,i) => {
      return <div className="calendar-month-body-row" key={i}>{v}</div>;
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
      <div className="calendar-month-body">{renderDays(allDays,value,dateRender,dateInnerRender,selectHandler)}</div>
    </div>
  );
}

export function Calendar(props: CalendarProps) {
  const { className, style, dateRender, dateInnerRender, onChange } =
    props;
  const classNameProp = cs("calendar", className);
  const [curValue,setCurValue] = useControllableValue(props, {
    defaultValue: dayjs(),
  }); // 会回调onChange
  const [curMonth, setCurMonth] = useState<Dayjs>(curValue);
  const prevClick = () => {
    setCurMonth(curMonth.subtract(1, "month"));
  };
  const nextClick = () => {
    setCurMonth(curMonth.add(1, "month"));
  };
  const toDayClick = () => {
    const date = dayjs(Date.now());
    setCurValue(date);
    setCurMonth(date);
    //onChange?.(date);
  };
  const selectHandler = (date: Dayjs) => {
    // console.log('selectHandler'+date.date())
    setCurValue(date);
    setCurMonth(date);
    // onChange?.(date);
  };
  return (
    <div className={classNameProp} style={style}>
      <Header
        prevClick={prevClick}
        nextClick={nextClick}
        toDayClick={toDayClick}
        curMonth={curMonth}
      />
      <MonthCalendar
        {...props}
        value={curValue}
        selectHandler={selectHandler}
        curMonth={curMonth}
      />
    </div>
  );
}
