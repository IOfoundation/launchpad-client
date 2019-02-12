import {viewport} from './viewPort';

let currentBreakpoint = -1;
const breakpoints = [1280, 960, 600, 0];

export const sizeCheck = callback => {
  const screenWidth = viewport().width;
  const findBreakpoint = breakpoints.find(breakpoint => {
    return screenWidth > breakpoint;
  });

  if (currentBreakpoint !== findBreakpoint) {
    currentBreakpoint = findBreakpoint;

    switch (currentBreakpoint) {
      case breakpoints[0]:
        callback('lg');
        return 'lg';
      case breakpoints[1]:
        callback('md');
        return 'md';
      case breakpoints[2]:
        callback('sm');
        return 'sm';
      default:
        callback('xs');
        return 'xs';
    }
  }
};
