import { ShapeFlags } from '../shared';

function getShapeFlag(type: any) {
  return typeof type === 'string'
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT;
};

export function createVNode(
  type: any,
  props: any = {},
  children?: string | Array<any>
) {
  // 注意: type有可能是string或对象
  // 如果是对象的话，那么就是用户设置的options
  // type 为 string的时候
  // createVNode('div')
  // type 为组件对象的时候
  // createVNode(App)
  const vnode = {
    el: null,
    component: null,
    key: props.key || null,
    type,
    props,
    children,
    // 设置 vnode 是 element 或 自定义组件
    shapeFlag: getShapeFlag(type),
  }

  // 基于 children 再次设置 shapeFlag
  if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  } else if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  }

  normalizeChildren(vnode, children);

  return vnode;
}

export function normalizeChildren(vnode: any, children: any) {
  if (typeof children === "object") {
    // 暂时主要是为了标识出 slots_children 这个类型来
    // 暂时我们只有 element 类型和 component 类型的组件
    // 所以我们这里除了 element ，那么只要是 component 的话，那么children 肯定就是 slots 了
    if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
      // 如果是 element 类型的话，那么 children 肯定不是 slots
    } else {
      // 这里就必然是 component 了,
      vnode.shapeFlag |= ShapeFlags.SLOTS_CHILDREN;
    }
  }
}

// 用 symbol 作为唯一标识
export const Text = Symbol("Text");

/**
 * @private
 */
export function createTextVNode(text: string = " ") {
  return createVNode(Text, {}, text);
}