﻿"use strict"; !function (e, t) { "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ResizeSensor = t() }("undefined" != typeof window ? window : this, function () { if ("undefined" == typeof window) return null; var e = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (e) { return window.setTimeout(e, 20) }; function t(e, t) { var i = Object.prototype.toString.call(e), n = "[object Array]" === i || "[object NodeList]" === i || "[object HTMLCollection]" === i || "[object Object]" === i || "undefined" != typeof jQuery && e instanceof jQuery || "undefined" != typeof Elements && e instanceof Elements, o = 0, s = e.length; if (n) for (; o < s; o++)t(e[o]); else t(e) } function i(e) { if (!e.getBoundingClientRect) return { width: e.offsetWidth, height: e.offsetHeight }; var t = e.getBoundingClientRect(); return { width: Math.round(t.width), height: Math.round(t.height) } } var n = function (o, s) { function r(t, n) { if (t) if (t.resizedAttached) t.resizedAttached.add(n); else { t.resizedAttached = new function () { var e, t, i = []; this.add = function (e) { i.push(e) }, this.call = function (n) { for (e = 0, t = i.length; e < t; e++)i[e].call(this, n) }, this.remove = function (n) { var o = []; for (e = 0, t = i.length; e < t; e++)i[e] !== n && o.push(i[e]); i = o }, this.length = function () { return i.length } }, t.resizedAttached.add(n), t.resizeSensor = document.createElement("div"), t.resizeSensor.dir = "ltr", t.resizeSensor.className = "resize-sensor"; var o = "pointer-events: none; position: absolute; left: 0px; top: 0px; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden; max-width: 100%;", s = "position: absolute; left: 0; top: 0; transition: 0s;"; t.resizeSensor.style.cssText = o, t.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + o + '"><div style="' + s + '"></div></div><div class="resize-sensor-shrink" style="' + o + '"><div style="' + s + ' width: 200%; height: 200%"></div></div>', t.appendChild(t.resizeSensor); var r = window.getComputedStyle(t), d = r ? r.getPropertyValue("position") : null; "absolute" !== d && "relative" !== d && "fixed" !== d && (t.style.position = "relative"); var c, f, h = t.resizeSensor.childNodes[0], a = h.childNodes[0], l = t.resizeSensor.childNodes[1], u = i(t), v = u.width, p = u.height, z = !0, w = 0, g = function () { if (z) { if (0 === t.offsetWidth && 0 === t.offsetHeight) return void (w || (w = e(function () { w = 0, g() }))); z = !1 } var i, n; i = t.offsetWidth, n = t.offsetHeight, a.style.width = i + 10 + "px", a.style.height = n + 10 + "px", h.scrollLeft = i + 10, h.scrollTop = n + 10, l.scrollLeft = i + 10, l.scrollTop = n + 10 }; t.resizeSensor.resetSensor = g; var y = function () { f = 0, c && (v = u.width, p = u.height, t.resizedAttached && t.resizedAttached.call(u)) }, m = function () { u = i(t), (c = u.width !== v || u.height !== p) && !f && (f = e(y)), g() }, S = function (e, t, i) { e.attachEvent ? e.attachEvent("on" + t, i) : e.addEventListener(t, i) }; S(h, "scroll", m), S(l, "scroll", m), e(g) } } t(o, function (e) { r(e, s) }), this.detach = function (e) { n.detach(o, e) }, this.reset = function () { o.resizeSensor.resetSensor() } }; if (n.reset = function (e) { t(e, function (e) { e.resizeSensor.resetSensor() }) }, n.detach = function (e, i) { t(e, function (e) { e && (e.resizedAttached && "function" == typeof i && (e.resizedAttached.remove(i), e.resizedAttached.length()) || e.resizeSensor && (e.contains(e.resizeSensor) && e.removeChild(e.resizeSensor), delete e.resizeSensor, delete e.resizedAttached)) }) }, "undefined" != typeof MutationObserver) { var o = new MutationObserver(function (e) { for (var t in e) if (e.hasOwnProperty(t)) for (var i = e[t].addedNodes, o = 0; o < i.length; o++)i[o].resizeSensor && n.reset(i[o]) }); document.addEventListener("DOMContentLoaded", function (e) { o.observe(document.body, { childList: !0, subtree: !0 }) }) } return n });