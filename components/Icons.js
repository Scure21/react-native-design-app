import React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const NotificationIcon = (props) => (
  <Svg height={23.997} width={22} {...props}>
    <G fillRule="evenodd">
      <Path
        d="M19 10V8A8 8 0 0 0 3 8v2a4.441 4.441 0 0 1-1.547 3.193A4.183 4.183 0 0 0 0 16c0 2.5 4.112 4 11 4s11-1.5 11-4a4.183 4.183 0 0 0-1.453-2.807A4.44 4.44 0 0 1 19 10z"
        fill="#4775f2"
      />
      <Path
        d="M8.145 21.9a2.992 2.992 0 0 0 5.71 0c-.894.066-1.844.1-2.855.1s-1.961-.032-2.855-.1z"
        fill="#a5bbf9"
      />
    </G>
  </Svg>
);

export const PlayIcon = (props) => (
  <Svg height={38.15} width={38.15} {...props}>
    <Path
      opacity={1}
      d="M8.153 14.585c-1.73-1.703-.825-4.649 1.563-5.087l19.148-3.516c2.072-.38 3.88 1.436 3.49 3.506L28.8 28.364c-.444 2.36-3.343 3.267-5.053 1.582L8.153 14.586z"
      fill="#33CEFF"
      transform="rotate(45 19.075 19.075)"
    />
  </Svg>
);
