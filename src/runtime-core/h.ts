import { createVNode } from "./vnode";
export const h = (type: string, prop: any, children: string | Array<any>) => {
  createVNode(type, prop, children);
}