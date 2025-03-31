import {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface LazyloadProp extends PropsWithChildren {
  height?: number;
  width?: number;
  offset?: number | number[];
  style?: CSSProperties;
  className?: string;
  playholder?: ReactNode;
  onVisibeCb?: () => void;
}
export function Lazyload(props: LazyloadProp) {
  const [isVisible, setVisible] = useState(false);
  const {
    playholder,
    children,
    width,
    height,
    style,
    className,
    onVisibeCb,
    offset,
  } = props;
  const imRef = useRef(null);
  const node = useRef(null);
  useEffect(() => {
    imRef.current = new IntersectionObserver(
      (en) => {
        const [e] = en;
        if (e.isIntersecting) {
          console.log("isIntersecting");
          setVisible(true);
          onVisibeCb?.();
          if (node.current && node instanceof HTMLElement) {
            imRef.current?.unobserve(node.current);
          }
        }
      },
      {
        rootMargin: `${offset?offset:0}px`,
        threshold: 0,
      }
    );
    imRef.current.observe(node.current);
    return () => {
      imRef.current?.unobserve(node.current);
      setVisible(false);
    };
  }, []);

  return (
    <>
      <div className={className} style={{ width, height, ...style }} ref={node}>
        {isVisible ? children : playholder}
      </div>
    </>
  );
}
