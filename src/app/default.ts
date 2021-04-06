const changesValueMap = {};

const keyMap = {
  btnPrimaryColor: '@btn-primary-color',
  btnPrimaryBg: '@btn-primary-bg',
  heightBase: '@height-base',
};

const setSymbol = (value) => {
  return value && value[value.length - 1] !== ';' ? ';' : '';
};

export let changesValue = () => {
  return Object.entries(changesValueMap).reduce((pre, [key, value]) => {
    return `${pre}${setSymbol(pre)} ${keyMap[key]}: ${value};`;
  }, '');
};

export function add(key, value) {
  changesValueMap[key] = value;
}

export function remove() {
}
