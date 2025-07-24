import autoprefixer from "autoprefixer";
import pxtorem from "postcss-pxtorem";
export default {
  plugins: [
    autoprefixer(),
    pxtorem({
      rootValue: 75,
      propList: ["*"],
      unitPrecision: 5,
      selectorBlackList: ["ignore-rem"],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1,
      exclude: /node_modules/i,
    }),
  ],
};
