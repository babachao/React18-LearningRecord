// 将原型上的hasOwnProperty方法，结构出来使用
const { hasOwnProperty } = Object.prototype;
export default hasOwnProperty;