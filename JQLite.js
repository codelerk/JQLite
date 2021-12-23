"use strict";
// JQLite Verison 1.0.0
// Author: Phantom0
var JQL;
(function (JQL) {
    // auto convert node and html collections
    JQL.convert = (collection) => [...collection];
    JQL.querySelector = (selector) => {
        let e = JQL.convert(document.querySelectorAll(selector));
        return e.length == 1 ? e[0] : e;
    };
    JQL.listener = (selector, event, callback) => {
        if (Array.isArray(selector)) {
            selector.forEach((e) => e.addEventListener(event, callback));
        }
        else if (typeof selector == "string") {
            JQL.querySelector(selector).addEventListener(event, callback);
        }
        else {
            selector.addEventListener(event, callback);
        }
    };
    JQL.element = (options) => {
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
        return parent ? wrapper : JQL.convert(wrapper.children);
    };
    JQL.text = (element, text) => text ? (element.innerText = text) : element.innerText;
    JQL.val = (element, value) => value ? (element.value = value) : element.value;
    JQL.unique_array = (array) => [...new Set(array)];
    JQL.clog = (log) => console.log(log);
    JQL.hasClass = (element, containedClass) => element.classList.contains(containedClass);
    JQL.hasID = (element, containedID) => element.id.includes(containedID);
    JQL.attr = (element, attribute, value) => {
        element = typeof element === "string" ? JQL.querySelector(element) : element;
        if (value) {
            element.setAttribute(attribute, value);
        }
        else {
            return element.getAttribute(attribute);
        }
    };
    JQL.jinx = (options) => {
        const { url, type, data } = options;
        if (!type) {
        }
        fetch(url, {
            method: type,
            body: data,
        })
            .then((res) => res.json())
            .then((data) => JQL.clog(data));
    };
})(JQL || (JQL = {}));
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
