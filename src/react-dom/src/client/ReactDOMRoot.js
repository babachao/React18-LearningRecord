
import { createContainer, updateContainer} from 'react-reconciler/src/ReactFiberReconciler' // 创建容器的方法

// 
function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot;
  // 更新容器的方法
  updateContainer(children, root);
}

// 创建一个根，div#root。
// 简单来说FiberRootNode = containerInfo, 它的本质就是一个真是的容器DOM节点 -->指向div#root
// 正常是：现有虚拟DOM -> fiber节点 -> 真实DOM
// 根节点比较特殊, 一开始就已经创建好了document.getElementById('root')
// 但是存在fiber节点
export function createRoot(container) {
  const root = createContainer(container); // 创建容器
  return new ReactDOMRoot(root);
}