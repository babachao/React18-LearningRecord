
import { createFiberRoot } from './ReactFiberRoot' // 创建一个Fiber的根节点
import { createUpdate, enqueueUpdate } from './ReactFiberClassUpdateQueue';
/**
 * @description: 创建一个容器
 * @param {*} containerInfo 容器信息
 */
export function createContainer(containerInfo){
  return createFiberRoot(containerInfo);
}

/**
 * @description: 更新容器的方法，把虚拟DOM element变成真实DOM, 插入到container容器中
 * @param {*} element 虚拟DOM
 * @param {*} container DOM容器，div#root
 */
export function updateContainer(element, container){
  // 获取当前根节点的根fiber
  const current = container.current;
  // 创建一个更新
  const update = createUpdate();
  // 要更新的虚拟DOM
  update.payload = { element };
  // 将更新对象【update】添加到current这个根Fiber的更新队列上去
  enqueueUpdate(current, update);
}