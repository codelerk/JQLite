"use strict";
// JQLite Verison 1.2.1
// Author: Phantom0
var JQL;
(function (JQL) {
    // auto convert node and html collections
    JQL.convert = (collection) => [...collection];
    JQL.select = (selector) => {
        let e = JQL.convert(document.querySelectorAll(selector));
        return e.length == 1 ? e[0] : e;
    };
    JQL.listen = (selector, event, callback, config) => {
        if (Array.isArray(selector)) {
            selector.forEach((e) => e.addEventListener(event, callback, config));
        }
        else if (typeof selector == "string") {
            JQL.listen(JQL.select(selector), event, callback, config);
        }
        else {
            selector.addEventListener(event, callback, config);
        }
    };
    JQL.create = (element, parent, count) => {
        let classList;
        let id = null;
        if (element.includes("#")) {
            let elementSplit = element.split("#");
            element = elementSplit[0];
            let splitID = elementSplit[1].split(".");
            id = splitID[0];
            splitID.shift();
            classList = splitID;
        }
        else {
            let elementSplit = element.split(".");
            element = elementSplit[0];
            elementSplit.shift();
            classList = elementSplit;
        }
        let wrapper = parent ? JQL.create(parent) : document.createElement("div");
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
        }
        else {
            let children = JQL.convert(wrapper.children);
            return children.length == 1 ? children[0] : children;
        }
    };
    JQL.uniqueArray = (array) => [...new Set(array)];
    JQL.log = (log) => console.log(log);
    JQL.hasClass = (element, containedClass) => element.classList.contains(containedClass);
    JQL.hasID = (element, containedID) => element.id.includes(containedID);
    JQL.attr = (element, attribute, value) => {
        element = typeof element === "string" ? JQL.select(element) : element;
        if (value) {
            element.setAttribute(attribute, value);
        }
        else {
            return element.getAttribute(attribute);
        }
    };
    JQL.jinx = async (url, data, method, config) => {
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
        }
        else {
            config = config ? config : {};
            config.method = config.method ? config.method : method;
            if (typeof data == "string") {
                config.body = data;
            }
            else {
                let formData = new FormData();
                Object.keys(data).forEach((key) => formData.append(key, data[key]));
                config.body = formData;
            }
        }
        const res = config ? await fetch(url, config) : await fetch(url);
        if (!res.ok)
            throw new Error(`There is an error with your config. Please check your config. Error Code: ${res.status}`);
        const rdata = await res.text();
        return rdata;
    };
})(JQL || (JQL = {}));
const $ = JQL;
