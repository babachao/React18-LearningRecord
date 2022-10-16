import { HostRoot } from "./ReactWorkTags"
import { NoFlags } from "./ReactFiberFlags"

/**
 * @description: 创建Fiber节点类
 * @param {*} tag  fiber类型： 函数组件0，类组件1，原生组件5，根元素3
 * @param {*} pendingProps 新属性，等待处理或者说生效的属性
 * @param {*} key 虚拟DOM的KEY
 */
export function FiberNode(tag, pendingProps, key) {
  this.tag = tag; // fiber的类型
  this.key = key; // fiber的唯一标识
  this.type = null; // 具体的元素类型，来自虚拟DOM节点的type，span,div,p等标签名

  // 每个虚拟DOM => Fiber节点 => 真实DOM 
  this.stateNode = null; // 次fiber对应的真实DOM节点 h1 =》 真实的h1 DOM节点
  
  this.return = null; // 指向父节点
  this.child = null; // 指向第一个子节点
  this.sibling = null; // 指向弟弟节点

  // fiber哪来的?
  // 通过虚拟DOM节点创建，虚拟DOM会提供pendingProps用来创建fiber节点的属性
  this.pendingProps = pendingProps; // 等待生效的属性
  this.memoizedProps = null; // 已经生效的属性

  // 每个fiber还会有自己的状态，每一种fiber状态存的类型是不一样的
  // 类组件对应的fiber存的就是类的实例的状态， HostRoot -> 根fiber存的就是要渲染的元素
  this.memoizedState = null; // 已经生效的属性
  // 每个fiber身上可能还有更新队列
  this.updateQueue = null;
  // 自己的副作用标识， 标示要针对此fiber节点进行任何操作 -> 为了性能优化
  // React执行分两个阶段-> 1、render 计算副作用 2、commit修改真实DOM, 或者说提交副作用
  this.flags = NoFlags;
  // 子节点对应的副作用标识
  this.subtreeFlags = NoFlags;
  // 替身，轮替-> 双缓冲池的技术，最大只有两个Fiber数，在缓存池缓存了另一个节点，双缓冲使用。
  // 比如出租车，白晚班轮替
  this.alternate = null;
}

/**
 * @description: 创建Fiber的方法
 * @param {*} tag  fiber类型： 函数组件0，类组件1，原生组件5，根元素3
 * @param {*} pendingProps 新属性，等待处理或者说生效的属性
 * @param {*} key 虚拟DOM的KEY
 */
export function createFiber(tag, pendingProps, key){
  return new FiberNode(tag, pendingProps, key)
}

/**
 * @description: 创建【根Fiber】的方法
 */
export function createHostRootFiber() {
  return createFiber(HostRoot, null, null)
}

/**
 * @description:  基于老的fiber和新的属性创建新的fiber
 * 参考图：https://static.zhufengpeixun.com/di_gui_gou_jian_fiber_shu_1664076989593.jpg
 * @param {*} current 老的fiber
 * @param {*} pendingProps 新的属性
 * @author: huchao
 */
export function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate; // 拿到老Fiber的轮替，第一次为null
  // 如果没有正在执行的任务，current的alternate指向没有fiber
  // 则创建一个新的Fiber
  if (workInProgress === null) {
    workInProgress = createFiber(current.tag, pendingProps, current.key);
    workInProgress.type = current.type; // 拷贝老Fiber的类型
    workInProgress.stateNode = current.stateNode; // 拷贝老Fiber的静态节点
    // 双向指向
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  }
  // else 说明是有Fiber，则更新Fiber
  else{
    workInProgress.pendingProps = pendingProps;
    workInProgress.type = current.type;
    workInProgress.flags = NoFlags;
    workInProgress.subtreeFlags = NoFlags;
  }
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;

  return workInProgress
}