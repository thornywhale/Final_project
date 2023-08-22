"use strict";

const socials = new Map();
socials.set("www.facebook.com", "./assets/icons/fb.svg");
socials.set("twitter.com", "./assets/icons/X.svg");
socials.set("www.instagram.com", "./assets/icons/inst.svg");

const root = document.getElementById("root");
const sel = document.getElementById("selected");

fetch("./assets/json/data.json")
  .then((response) => response.json())
  .then((actors) => {
    actors.forEach((actor) => {
      if (actor.firstName === "" || actor.firstName === null) {
        actor.firstName = "no_name";
      }
      if (actor.lastName === "" || actor.lastName === null) {
        actor.lastName = "no_surname";
      }
    });
    const actorItems = actors.map((actor) => createActorItem(actor));
    root.append(...actorItems);
  })
  .catch((error) => {
    console.log(error);
    sel.append("Service is temporary unavailable.");
  });

function createActorItem({ firstName, lastName, profilePicture, contacts }) {
  const links = contacts.map((contact) => {
    const hostname = new URL(contact).hostname;
    const img = createElement("img", {
      classNames: ["soc-logo"],
      attributes: { src: socials.get(hostname) },
    });
    return createElement("a", { attributes: { href: contact } }, img);
  });
  const inits = createElement(
    "h4",
    { classNames: ["inits"] },
    `${firstName.charAt(0)}${lastName.charAt(0)}`
  );
  const avatarDiv = createElement(
    "div",
    { classNames: ["avatar-wrapper"] },
    inits
  );
  const avatar = createElement("img", {
    classNames: ["avatar"],
    attributes: {
      src: profilePicture,
    },
    events: { load: handleImgLoad(avatarDiv) },
  });
  const h3 = createElement(
    "h3",
    { classNames: ["name-surname"] },
    firstName + " " + lastName
  );
  const article = createElement(
    "article",
    {
      classNames: ["actor-wrapper"],
    },
    avatarDiv,
    h3,
    ...links
  );
  const liItem = createElement(
    "li",
    {
      classNames: ["list-item"],
      events: {
        click: () => {
          sel.append(article);
        },
      },
    },
    article
  );
  return liItem;
}
