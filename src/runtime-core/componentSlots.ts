import { ShapeFlags } from "../shared";
export function initSlots(instance: any, children: any) {
  const { vnode } = instance;

  console.log('初始化 slots');

  if (vnode.ShapeFlag & ShapeFlags.SLOTS_CHILDREN) {
    normalizeObjectSlots(children, (instance.slots = {}));
  }
}
const normalizeObjectSlots = (rawSlots: any, slots:any = {}) => {
  for (const key in rawSlots) {
    const value = rawSlots[key];
    if (typeof value === "function") {
      // 把这个函数给到slots 对象上存起来
      // 后续在 renderSlots 中调用
      // TODO 这里没有对 value 做 normalize，
      // 默认 slots 返回的就是一个 vnode 对象
      slots[key] = value;
    }
  }  
}