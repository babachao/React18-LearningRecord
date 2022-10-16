import * as ReactWorkTags from 'react-reconciler/src/ReactWorkTags'
const ReactWorkTagsMap = new Map();

 for (const tag in ReactWorkTags) {
  if (Object.hasOwnProperty.call(ReactWorkTags, tag)) {
    ReactWorkTagsMap.set(ReactWorkTags[tag], tag)
  }
 }
/**
 * @description: 打印日志使用
 * @param {*} prefix 传进来的方法名
 * @param {*} workInProgress 当前使用的firber
 * @author: huchao
 */
export default function (prefix, workInProgress) {
  const {tag: tagValue, type, pendingProps} = workInProgress;
  let tagName = ReactWorkTagsMap.get(tagValue)
  let str = `${tagName}`;
  if ( tagName === 'HostComponent') {
    str += `${type}`
  }else if (tagName === 'HostText') {
    str += `${pendingProps}`
  }
  console.log(`方法：${prefix} 节点名称：${str}`);
  // return `${prefix}-${str}`;
}