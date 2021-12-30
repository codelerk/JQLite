// JQLite Verison 1.1.6
// Author: Phantom0

namespace JQL {
  // auto convert node and html collections
  export const convert = (
    collection: NodeListOf<Element> | HTMLCollectionOf<Element>
  ): any[] => [...collection];

  export const querySelect = (selector: string): any | any[] => {
    let e = convert(document.querySelectorAll(selector));

    return e.length == 1 ? e[0] : e;
  };

  export const listen = (
    selector: any | any[],
    event: string,
    callback: object
  ): void => {
    if (Array.isArray(selector)) {
      selector.forEach((e: any) => e.addEventListener(event, callback));
    } else if (typeof selector == "string") {
      listen(querySelect(selector), event, callback);
    } else {
      selector.addEventListener(event, callback);
    }
  };

  export const element = (element: string, parent?: string, count?: number): object | any => {
    let classList: string[];
    let id = null;

    if (element.includes('#')) {
      let elementSplit: string[] = element.split('#');

      element = elementSplit[0];

      let splitID: string[] = elementSplit[1].split('.');

      id = splitID[0];

      splitID.shift();

      classList = splitID;
    } else {
      let elementSplit: string[] = element.split('.');

      element = elementSplit[0];
      elementSplit.shift();

      classList = elementSplit;
    }

    let wrapper = parent
      ? create(parent)
      : document.createElement("div");

    count = count ? count : 1;

    let iter = 0;

    do {
      let e = document.createElement(element);

      classList ? classList.forEach((cn) => e.classList.add(cn)) : null;
      id ? (e.id = id) : null;

      wrapper.append(e);

      iter++;
    } while (iter < count);

    if (parent) {
      return wrapper;
    } else {
      let children = convert(wrapper.children);

      return children.length == 1 ? children[0] : children;
    }
  };

  export const uniqueArray = (array: any[]): any[] => [...new Set(array)];

  export const log = (log: any | any[]): void => console.log(log);

  export const hasClass = (element: any, containedClass: string): boolean =>
    element.classList.contains(containedClass);

  export const hasID = (element: any, containedID: string): boolean =>
    element.id.includes(containedID);

  export const attr = (
    element: any,
    attribute: string,
    value?: string
  ): void | string => {
    element = typeof element === "string" ? querySelect(element) : element;
    if (value) {
      element.setAttribute(attribute, value);
    } else {
      return element.getAttribute(attribute);
    }
  };

  export const jinx = async (
    url: string,
    data?: any,
    method?: string,
    config?: any
  ): Promise<any> => {
    method = method ? method : "GET";

    if (method == "GET") {
      if (data) {
        url = `${url}?`;

        Object.keys(data).forEach((key) => {
          let value = String(data[key]);
          url += `${key}=${value}&`;
        });

        url = encodeURI(url.slice(0, -1));
      }
    } else {
      config = config ? config : {};
      config.method = config.method ? config.method : method;

      if (typeof data == "string") {
        config.body = data;
      } else {
        let formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        config.body = formData;
      }
    }

    const res = config ? await fetch(url, config) : await fetch(url);

    if (!res.ok)
      throw new Error(
        `There is an error with your config. Please check your config. Error Code: ${res.status}`
      );

      const rdata = await res.text();

    return rdata;
  };
}

// instance an object for this object and few functions
// you may change these if you like! or remove them and just call the library from j or JQL
const j = JQL;
const jq = JQL.querySelect;
const el = JQL.listen;
const convert = JQL.convert;
const create = JQL.element;
const attr = JQL.attr;
const hasClass = JQL.hasClass;
const hasID = JQL.hasID;
const jinx = JQL.jinx;