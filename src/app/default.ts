// @ts-nocheck
const changesValueMap = {};

const keyMap = {
  btnPrimaryColor: '@btn-primary-color',
  btnPrimaryBg: '@btn-primary-bg',
  heightBase: '@height-base',
  btnHeightBase: '@btn-height-base',
  btnHeightLg: '@btn-height-lg',
  btnHeightSm: '@btn-height-sm',
};

const setSymbol = (value) => {
  return value && value[value.length - 1] !== ';' ? ';' : '';
};

export let changesValue = () => {
  return Object.entries(changesValueMap).filter(([key, value]) => {
    return keyMap[key] !== undefined;
  }).reduce((pre, [key, value]) => {
    return `${pre}${setSymbol(pre)} ${keyMap[key]}: ${value};`;
  }, '');
};

// tslint:disable-next-line:typedef
export function add(key, value) {
  changesValueMap[key] = value;
}
