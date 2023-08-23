const liItem = createElement(
  "li",
  {
    classNames: ["list-item"],
    events: {
      click: ({ target }) => {
        const selArray = [...sel.children];
        console.log(selArray.includes(target))
        console.log(selArray);
        console.log(target);
        const clone = target.cloneNode();
        sel.append(clone);
      },
    },
  },
  article
);
console.log(sel);
console.log(sel.children);


// const liItem = createElement(
//   "li",
//   {
//     classNames: ["list-item"],
//     events: {
//       click: ({ target }) => {
//         target.parentNode === root
//           ? sel.append(target)
//           : root.prepend(target);
//           console.log(target);
//           console.log(target.parentNode);
//       },
//     },
//   },
//   article
// );