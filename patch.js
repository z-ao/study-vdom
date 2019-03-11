/* [创建真实dom]
** @props node / vdom json
*/
const createElement = function (node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  } else {
    const $el = document.createElement(node.type)
    node.children
      .map(createElement)
      .forEach($cel => $el.appendChild($cel));
    return $el;
  }
}

/* [对比旧新vdom是不是改变]
** @props oldNode / 旧vdom
** @props newNode / 新vdom
** @return isChange
*/
const isChange = function (oldNode, newNode) {
  return (
    (typeof oldNode !== typeof newNode) ||
    (typeof oldNode === 'string' && oldNode !== newNode) ||
    (oldNode.type !== newNode.type)
  );
}

/* [更新node改变]
** @props $parent / 父dom
** @props newNode / 新vdom
** @props oldNode / 旧vdom
** @props index / 对比索引
*/
const patch = function ($parent, newNode, oldNode, index=0) {
  if (!oldNode) { //没有旧node
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) { //没有新node
    $parent.removeChild($parent.childNodes[index]);
  } else if (isChange(oldNode, newNode)) { //旧新node存在, 但节点类型改变
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else {
    const newLen = Math.max(newNode.children.length, oldNode.children.length);

    for (let i = 0; i <= newLen - 1; i++) {
      patch(
        $parent.childNodes[index], 
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }
};
