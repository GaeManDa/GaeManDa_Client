export const isIOS = () =>
  window.navigator.userAgent.indexOf("iPhone") > -1
  || window.navigator.userAgent.indexOf("iPad") > -1;
