import React, { forwardRef } from "react";
import { Icond, IconProps } from "../testIcon";

const loadedSet = new Set<string>();

// 1.加在script，2把icon的content放成 <use xlinkHref='#${type}'/>>
export function createIconFont(scriptUrl:string) {
    if (
        typeof scriptUrl === 'string'
        && scriptUrl.length
        && !loadedSet.has(scriptUrl)
      ) {
        const script = document.createElement('script');
        script.setAttribute('src', scriptUrl);
        script.setAttribute('data-namespace', scriptUrl);
        document.body.appendChild(script);
    
        loadedSet.add(scriptUrl);
      }

  return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const {type,...rest} = props;
    return (
      <Icond {...rest} ref={ref}>
        {type?<use xlinkHref={`#${type}`}></use>:null}
      </Icond>
    );
  });
}
