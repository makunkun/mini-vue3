import { createVNode } from "./vnode";
export const h = (type: string, props: any, children: string | Array<any>) => {
  createVNode(type, props, children);
}