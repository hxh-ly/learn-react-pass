import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from "react";
import "./index.css";
import { useControllableValue } from "ahooks";
interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

export interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

const InnerCalendar: ForwardRefRenderFunction<CalendarRef, CalendarProps> = (
  props,
  ref
) => {
  // const [date, setDate] = useState(defaultValue??new Date());
  const { onChange } = props;
  const [date, setDate] = useControllableValue(props, {
    defaultValue: new Date(),
  });
  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date);
      },
    };
  });
  function caculate() {
    const dateList = [];
    let monthDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate(); //获取上一个月最后一天
    let thisMonthFirstDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay(); // 这个月第一天是周几
    for (let i = 0; i < thisMonthFirstDay; i++) {
      dateList.push(<div key={`empty-` + i} className="empty"></div>);
    } // 空的
    for (let i = 1; i <= monthDay; i++) {
      function changeDate(index: number) {
        let curDate = new Date(date.getFullYear(), date.getMonth(), index);
        setDate(curDate);
        onChange?.(curDate);
      }
      if (date.getDate() === i) {
        dateList.push(
          <div key={i} className="day selected" onClick={() => changeDate(i)}>
            {i}
          </div>
        );
      } else {
        dateList.push(
          <div key={i} className="day" onClick={() => changeDate(i)}>
            {i}
          </div>
        );
      }
    } // 还没过去的
    return dateList;
  }

  function prevMonth() {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  }
  function nextMonth() {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  }

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth}>&lt;</button>
        <div>{date.toLocaleDateString()}</div>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {caculate()}
      </div>
    </div>
  );
};
const Calendar = forwardRef(InnerCalendar);
export default Calendar;
