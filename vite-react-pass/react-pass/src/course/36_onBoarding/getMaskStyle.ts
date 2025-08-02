export default function getMaskStyle(
  element: HTMLElement,
  container: HTMLElement
) {
  if (!element) {
    return {};
  }
  const { left, top, width, height } = element.getBoundingClientRect();
  const elementTopWithScroll = container.scrollTop + top;
  const elementLeftWidthScroll = container.scrollLeft + left;

  return {
    width: container.scrollWidth,
    height: container.scrollHeight,
    borderLeftWidth: Math.max(elementLeftWidthScroll, 0),
    borderTopWidth: Math.max(elementTopWithScroll, 0),
    borderBottomWidth: Math.max(
      container.scrollHeight - elementTopWithScroll - height,
      0
    ),
    borderRightWidth: Math.max(
      container.scrollWidth - elementLeftWidthScroll - width,
      0
    ),
  };
}
