export const breakpoints = [
  [1280, "xl"],
  [1024, "lg"],
  [768, "md"],
  [640, "sm"],
];

export const getScreenWidth = () => {
  let widthInfo = {
    width: window.innerWidth,
    size: null,
    breakpoint: null,
  };

  for (const [key, value] of breakpoints) {
    if (widthInfo.width >= key) {
      widthInfo.size = value;
      widthInfo.breakpoint = parseInt(key);
      return widthInfo;
    }
    return widthInfo;
  }
};
