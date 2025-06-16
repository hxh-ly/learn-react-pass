import logSvg from "../../../../../assets/react.svg";
import styles from '../../index.module.scss'
console.log(styles)
export function Header() {
  return (
    <div className={styles.header} style={{ borderBottom: "1px solid #000" }}>
      <div className={styles.logo}>
        <img alt="logo" src={logSvg}></img>
        <span>React Playground</span>
      </div>
    </div>
  );
}
