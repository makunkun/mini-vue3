export * from './shapeFlags';

const camelizeRE = /-(\w)/g;

/**
 * @private
 * 把烤羊肉串命名方式改为驼峰命名方式
 */
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
};

/**
 * @private
 * 首字母大写
 */
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase + str.slice(1);

/**
 * @private
 * 添加on前缀且首字母大写
 */
export const toHandlerKey = (str: string) =>
  str ? `on${capitalize(str)}` : '';
