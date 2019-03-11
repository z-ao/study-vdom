/* [创建vdom json]
** @props type / dom标签
** @props props / dom属性
** @props children / 子dom
*/
const h = function (type, props=null, ...children) {
  return { type, props, children }
};
