export const aspectRatio = (width: number, height?: number) => {
  const initialWidth = 2550;
  const initialHeight = 3300;

  const asRatio = initialWidth / initialHeight;

  const newHeight = width / asRatio;

  return {
    height: newHeight,
    width: newHeight * asRatio,
  };
};