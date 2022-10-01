import hasOwnProperty from 'shared/hasOwnProperty';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'

// 保留属性，为true的不会放到prop对象中
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

/**
 * @description: 判断config中的key是否合法
 * @param {*} config jsxDev方法中的config参数
 */
function hasValidKey(config) {
  return config.key !== undefined;
}

/**
 * @description: 判断config中的ref是否合法
 * @param {*} config jsxDev方法中的config参数
 */
function hasValidRef(config) {
  return config.ref !== undefined;
}

/**
 * @description: 生成reactDOM，也是虚拟DOM
 * */
function ReactElement(type, key, ref, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE, // 代表这个虚拟DOM的类型是reactDOM
    type, // dom-> h1, div, span ~~
    key, // 唯一标识
    ref, // 作用是获取真实dom元素
    props, // children, id, style
  };
}

/**
 * @description: 把jsx转换为虚拟DOM的方法， jsxDev() = createElement()
 * @param {*} type tab标签名
 * @param {*} config children, id, style 等属性
 */
export function jsxDEV(type, config) {
  let propName; // 属性名
  const props = {}; // 属性对象
  let key = null; // 每个虚拟DOM可以有一个可选的key属性，用来区分一个父节点下的不同子节点
  let ref = null; // 引入，后面可以通过这个获取真实DOM
  // 判断config.key是否合法
  if (hasValidKey(config)) {
    key = config.key;
  }
  // 判断config.ref是否合法
  if (hasValidRef(config)) {
    ref = config.ref;
  }

  // 遍历config中的属性，将config上的属性拷贝到prop中
  for (propName in config) {
    // 1、在【RESERVED_PROPS】中将不需要的剔除
    if (
      hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName];
    }
  }
  return ReactElement(type, key, ref, props);
}
