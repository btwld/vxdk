export namespace ConversionUtils {
  export const bpsToRoundedMbps = (bps: number, roundedTo = 2): number => {
    const mbps = bps / Math.pow(10, 6);
    return Math.round(mbps * Math.pow(10, roundedTo)) / Math.pow(10, roundedTo);
  };

  export const convertRemToPixels = (rem: number): number => {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  };

  export function timeDurationToPercent(
    currentTime: number,
    duration: number,
  ): number {
    if (duration !== 0) {
      return (currentTime / duration) * 100;
    } else {
      return 0;
    }
  }

  export function secondsToHMS(seconds: number): string {
    const pad = (num: number) =>
      (10 ** 2 + Math.floor(num)).toString().substring(1);

    seconds = Math.round(seconds);

    let display = '';

    const h = Math.trunc(seconds / 3600) % 24;
    if (h) {
      display += `${pad(h)}:`;
    }

    const m = Math.trunc(seconds / 60) % 60;
    display += `${pad(m)}:`;

    const s = Math.trunc(seconds % 60);
    display += `${pad(s)}`;

    return display;
  }
}
