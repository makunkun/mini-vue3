import { initProps } from './componentProps';
import { initSlots } from './componentSlots';
import { emit } from './componentEmits';
import { PublicInstanceProxyHandlers } from './componentPublicInstance';
import { proxyRefs } from '@vue/reactivity';

export function createComponentInstance(vnode: any, parent: any) {
  const instance = {
    type: vnode.type,
    vnode,
    props: {},
    parent,
    // 获取 parent 的 provides 作为当前组件的初始化值，这样就可以继承
    provides: parent ? parent.provides : {},
    proxy: null,
    isMounted: false,
    // 存放 attrs的数据
    attrs: {},
    // 存放插槽的数据
    slots: {},
    // context 对象
    ctx: {},
    // 存储setup的返回值
    setupState: {},
    emit: () => {},
  };

  // 在 prod 环境下的ctx 只是下面简单的结构
  // 在 dev环境下慧更复杂
  instance.ctx = {
    _: instance,
  };
}