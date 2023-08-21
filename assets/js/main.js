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
      attributes: { src: socials.get(hostname) },
    });
    return createElement("a", { attributes: { href: contact } }, img);
  });
  const avatar = createElement("img", {
    attributes: { src: profilePicture },
    styles: {
      border: "4px double #ff676c",
      borderRadius: "50%",
    },
  });
  const h3 = createElement("h3", {}, firstName + " " + lastName);
  const article = createElement(
    "article",
    {
      styles: {
        textAlign: "center",
        margin: "0 20px",
        border: "3px solid #EAEAEA90",
        boxShadow: "5px 10px 5px gray",
        backgroundColor: "white",
      },
    },
    avatar,
    h3,
    ...links
  );
  const liItem = createElement(
    "li",
    {
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
