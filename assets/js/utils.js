function handleImgLoad(elemParent) {
  return ({ target }) => {
    elemParent.append(target);
  };
}

/**
 *
 * @param {string} tag
 * @param {object} options {classNames[], attributes{}, styles{}, events{}}
 * @param  {...nodes} children
 * @returns {element}
 */
function createElement(
  tag = 'div',
  { classNames, attributes, styles, events } = {},
  ...children
) {
  const elem = document.createElement(tag);
  if (classNames) {
    elem.classList.add(...classNames);
  }
  if (attributes) {
    for (const [nameAttr, valueAttr] of Object.entries(attributes)) {
      elem.setAttribute(nameAttr, valueAttr);
    }
  }
  if (styles) {
    for (const [nameStyle, valueStyle] of Object.entries(styles)) {
      elem.style[nameStyle] = valueStyle;
    }
  }
  if (events) {
    for (const [nameEvent, valueEvent] of Object.entries(events)) {
      elem.addEventListener(nameEvent, valueEvent);
    }
  }
  if (children) {
    elem.append(...children);
  } 
  return elem;
}