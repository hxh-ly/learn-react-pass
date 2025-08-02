import { useContext } from "react";
import logSvg from "../../../../../assets/react.svg";
import styles from "../../index.module.scss";
import { PlaygroundContext } from "../../PlaygroundContext";
import { downFiles } from "../../utils";
import {
  DownOutlined,
  MoonOutlined,
  ShareAltOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import copy from "copy-to-clipboard";
export function Header() {
  const { theme, setTheme, files } = useContext(PlaygroundContext);
  return (
    <div className={styles.header} style={{ borderBottom: "1px solid #000" }}>
      <div className={styles.logo}>
        <img alt="logo" src={logSvg}></img>
        <span>React Playground</span>
      </div>
      <div>
        {theme === "light" && (
          <MoonOutlined
            className={styles[theme]}
            title="切换暗示主题"
            onClick={() => setTheme("dark")}
          ></MoonOutlined>
        )}
        {theme === "dark" && (
          <SunOutlined
            title="切换亮色主题"
            className={styles[theme]}
            onClick={() => setTheme("light")}
          ></SunOutlined>
        )}
        <ShareAltOutlined
          style={{ marginLeft: "10px" }}
          onClick={() => {
            copy(window.location.href);
            message.success("复制成功");
          }}
        ></ShareAltOutlined>
        <DownOutlined
          style={{ marginLeft: "10px" }}
          onClick={async () => {
            await downFiles(files);
            message.success("下载成功");
          }}
        ></DownOutlined>
      </div>
    </div>
  );
}
