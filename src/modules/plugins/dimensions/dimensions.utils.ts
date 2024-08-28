export type ObserverSubscription = {
  remove: () => void;
};

export const resizeObserver = (
  el: HTMLElement,
  callback: ResizeObserverCallback,
): ObserverSubscription => {
  const resize = new ResizeObserver(callback);
  resize.observe(el);
  return { remove: () => resize.unobserve(el) };
};
