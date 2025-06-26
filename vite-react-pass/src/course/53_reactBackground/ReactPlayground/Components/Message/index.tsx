import classNames from "classnames";
import { useEffect, useState } from "react";
import style from "../../index.module.scss";
export type MessageData = {
  data: {
    type: string;
    message: string;
  };
};
interface MessageProps {
  type: "error" | "warning";
  content: string;
}
export const Message = (props: MessageProps) => {
  const { type, content } = props;
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(!!content);
  }, [content]);
  return (
    <>
      {isVisible ? (
        <div className={classNames(style.msg, style[type])}>
          <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
          <button
            className={classNames(style.dismiss)}
            onClick={() => setIsVisible(false)}
          >
            x
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
