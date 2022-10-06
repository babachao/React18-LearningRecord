
// 创建一个更新队列
  export function initialUpdateQueue(fiber) {
    // pending是一个循环链表
    const queue = {
      shared: {
        pending: null
      }
    };
    fiber.updateQueue = queue;
  }

  // 创建一个队列中的更新
  export function createUpdate(){
    const update = {};
    return update;
  }

  /**
   * @description: 将更新插入到更新队列中
   * @param {*} fiber 插入到的根Fiber
   * @param {*} update 需要更新的虚拟DOM
   */
  export function enqueueUpdate(fiber, update){
    const updateQueue = fiber.updateQueue;
    const pending = updateQueue.pending;
    // pending: 指向最后一个更新
    // pending.next: 指向第一个更新
    if (pending) {
      update.next = update;
    }else{
      // 当没有pending没有时
      update.next = pending.next; // update的next -> 指向第一个更新（自己）
      pending.next = update; // 这是pending指向第一个更新（自己），所以pengind.next要指向下一个更新
    }
    // pending要指向最后一个更新
    // 最后一个更新，next指向第一个更新
    updateQueue.shared.pending = update;
  }
