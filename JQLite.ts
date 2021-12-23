// JQLite Verison 1.0.0
// Author: Phantom0

namespace JQL {
  // auto convert node and html collections
  export const convert = (
    collection: NodeListOf<Element> | HTMLCollectionOf<Element>
  ): any[] => [...collection];

  export const querySelector = (selector: string): any | any[] => {
    let e = convert(document.querySelectorAll(selector));

    return e.length == 1 ? e[0] : e;
  };

  export const listener = (
    selector: any | any[],
    event: string,
    callback: object
  ): void => {
    if (Array.isArray(selector)) {
      selector.forEach((e) => e.addEventListener(event, callback));
    } else if (typeof selector == "string") {
      querySelector(selector).addEventListener(event, callback);
    } else {
      selector.addEventListener(event, callback);
    }
  };

  export const element = (options: {
    elementToCreate: string;
    classList?: string[];
    id?: string;
    count?: number;
    parent?: string;
  }): object | any => {
    let { elementToCreate, classList, id, count, parent } = options;
    let wrapper = parent
      ? document.createElement(parent)
      : document.createElement("div");

    count = count ? count : 1;

    let iter = 0;

    do {
      let e = document.createElement(elementToCreate);

      classList ? classList.forEach((cn) => e.classList.add(cn)) : null;
      id ? (e.id = id) : null;

      wrapper.append(e);

      iter++;
    } while (iter < count);

    return parent ? wrapper : convert(wrapper.children);
  };

  export const text = (element: any, text?: string): void | string =>
    text ? (element.innerText = text) : element.innerText;
  export const val = (element: any, value?: string): void | string =>
    value ? (element.value = value) : element.value;

  export const unique_array = (array: any[]): any[] => [...new Set(array)];

  export const clog = (log: any | any[]): void => console.log(log);

  export const hasClass = (element: any, containedClass: string): boolean =>
    element.classList.contains(containedClass);

  export const hasID = (element: any, containedID: string): boolean =>
    element.id.includes(containedID);

  export const attr = (
    element: any,
    attribute: string,
    value?: string
  ): void | string => {
    element = typeof element === "string" ? querySelector(element) : element;
    if (value) {
      element.setAttribute(attribute, value);
    } else {
      return element.getAttribute(attribute);
    }
  };

  export const jinx = (
    options: { url: string, type?: string; data?: FormData }
  ) => {
    const { url, type, data } = options;

    if (!type) {

    }

    fetch(url, {
      method: type,
      body: data,
    })
      .then((res) => res.json())
      .then((data) => clog(data));
  };
}

// instance an object for this object and few functions
// you may change these if you like! or remove them and just call the library from j or JQL
const j = JQL;
const jq = JQL.querySelector;
const el = JQL.listener;
const clog = JQL.clog;
const create = JQL.element;
const attr = JQL.attr;
const hasClass = JQL.hasClass;
const hasID = JQL.hasID;
const jinx = JQL.jinx;