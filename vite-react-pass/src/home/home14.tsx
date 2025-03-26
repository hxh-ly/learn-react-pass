import { UseSpace } from "../course/14_space";
import { MySpace } from "../course/14_space";
import { ConfigProvider } from "../course/14_space/ConfigProvider";
export default function Home14() {
  return (
    <>
      <div>
        <UseSpace />
        <ConfigProvider space={{ size: 20 }}>
          <MySpace
          className="myContainer"
            direction="horizontal"
            align="end"
            split={<h1>aaa</h1>}
          >
            <div className="container">1</div>
            <div className="container">2</div>
          </MySpace>
        </ConfigProvider>
      </div>
    </>
  );
}
