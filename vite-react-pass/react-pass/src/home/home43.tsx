import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import KeepAliveContext from "../course/43_keepAlive/KeepAliveContext";
import { KeepLayout } from "../course/43_keepAlive/KeepAliveOutLet";
import { KeepAliveOutLet } from "../course/43_keepAlive/KeepAliveOutLet";
import { useState } from "react";
const Layout = () => {
  const ur = useNavigate();
  const { pathname } = useLocation();
  return (
    <>
      <p>layout {pathname}</p>
      <KeepAliveOutLet />
    </>
  );
};
const Aaa = () => {
  const ur = useNavigate();
  const { pathname } = useLocation();
  const [count, setCount] = useState(0);
  return (
    <div style={{ border: "1px solid red" }}>
      <p>
        A {pathname} {count}
      </p>
      <button onClick={(e) => setCount(count + 1)}>++</button>
      <br></br>
      <button
        onClick={(e) => {
          ur("/b");
        }}
      >
        b
      </button>
      <br></br>
      <button
        onClick={(e) => {
          ur("/c");
        }}
      >
        c
      </button>
    </div>
  );
};
const Bbb = () => {
  const ur = useNavigate();
  const { pathname } = useLocation();
  const [count, setCount] = useState(0);
  return (
    <div style={{ border: "1px solid red" }}>
      <p>
        B {pathname} {count}
      </p>
      <button onClick={(e) => setCount(count + 1)}>++</button>
      <br></br>
      <button
        onClick={(e) => {
          ur("/");
        }}
      >
        back
      </button>
    </div>
  );
};
const Ccc = () => {
  const ur = useNavigate();
  const { pathname } = useLocation();
  const [count, setCount] = useState(0);
  return (
    <div style={{ border: "1px solid red" }}>
      <p>
        C {pathname} {count}
      </p>
      <button onClick={(e) => setCount(count + 1)}>++</button>
      <button
        onClick={(e) => {
          ur("/");
        }}
      >
        back
      </button>
    </div>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Aaa></Aaa> },
      { path: "/b", element: <Bbb></Bbb> },
      { path: "/c", element: <Ccc></Ccc> },
    ],
  },
];

const router = createBrowserRouter(routes);
export function Home41() {
  return (
    <>
      <KeepLayout alivePath={["/b", "/c"]}>
        <RouterProvider router={router}></RouterProvider>
      </KeepLayout>
    </>
  );
}
