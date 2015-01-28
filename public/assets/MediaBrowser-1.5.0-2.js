/**
 * MediaBrowser - v1.5.0-2 - 2015-01-12
 * http://www.serviio.org
 *
 * Copyright (c) 2015 Petr Nejedly
 */
if (function () {
    "use strict";
    function a(a, b) {
      a && (this.el = a, this.container = b && b.container, this.reRender = b && b.reRender)
    }

    function b(b) {
      b.style.display = "none", a.r = b.offsetTop, b.style.display = ""
    }

    function c(a, b) {
      if (a)for (var c = b && b.display, d = a.parentNode.children, e = l.call(d, a), f = e + 1, g = d.length; g > f; f++)d[f].style.display = c
    }

    function d(a, b) {
      var c = a.getClientRects(), d = 0;
      return k(c, function (a) {
        d += e(a.height, b)
      }), d
    }

    function e(a, b) {
      return Math.floor(a / b)
    }

    function f() {
      var a = document.createElement("test"), b = {}, c = {
        Webkit: ["WebkitColumnCount", "WebkitColumnGap"],
        Moz: ["MozColumnCount", "MozColumnGap"],
        ms: ["msColumnCount", "msColumnGap"],
        "": ["columnCount", "columnGap"]
      };
      for (var d in c)c[d][0]in a.style && (b.columnCount = c[d][0], b.columnGap = c[d][1], b[d.toLowerCase()] = !0);
      return b
    }

    function g(a) {
      return parseInt(a[q.columnCount], 10) || 1
    }

    function h(a) {
      return parseInt(a[q.columnGap], 10) || 0
    }

    function i(a) {
      var b = parseInt(a.lineHeight, 10);
      if (!b)throw Error(p[0]);
      return b
    }

    function j(a) {
      return [a.offsetWidth, a.offsetHeight]
    }

    function k(a, b) {
      for (var c = 0, d = a.length; d > c && !b(a[c]); c++);
    }

    var l = Array.prototype.indexOf, m = window.getComputedStyle, n = "ellipsis-overflowing-child", o = "ellipsis-set", p = ["The ellipsis container must have line-height set on it"], q = f();
    a.prototype.calc = function () {
      if (!this.el)return this;
      var a = m(this.el), b = j(this.el);
      return this.columnHeight = b[1], this.columnCount = g(a), this.columnGap = h(a), this.columnWidth = b[0] / this.columnCount, this.lineHeight = i(a), this.deltaHeight = b[1] % this.lineHeight, this.linesPerColumn = Math.floor(this.columnHeight / this.lineHeight), this.totalLines = this.linesPerColumn * this.columnCount, !this.deltaHeight && this.columnCount > 1 && (this.el.style.height = this.columnHeight + "px"), this.child = this.getOverflowingChild(), this
    }, a.prototype.set = function () {
      return this.el && this.child ? (this.clampChild(), c(this.child.el, {display: "none"}), this.markContainer(), this) : this
    }, a.prototype.unset = function () {
      return this.el && this.child ? (this.el.style.height = "", this.unclampChild(this.child), c(this.child.el, {display: ""}), this.unmarkContainer(), this.child = null, this) : this
    }, a.prototype.destroy = function () {
      return this.el = this.child = this.container = null, this
    }, a.prototype.getOverflowingChild = function () {
      var a = this, b = {}, c = 0;
      return k(this.el.children, function (d) {
        var e, f, g, h = Math.floor(c / a.linesPerColumn) || 0;
        return c += e = a.getLineCount(d), c >= a.totalLines ? (f = c - a.totalLines, g = e - f, b.el = d, b.clampedLines = g, b.clampedHeight = b.clampedLines * a.lineHeight, b.visibleColumnSpan = a.columnCount - h, b.gutterSpan = b.visibleColumnSpan - 1, b.applyTopMargin = a.shouldApplyTopMargin(b), q.webkit && b.clampedLines > 1 && (b.clampedHeight += b.gutterSpan * a.deltaHeight), b) : void 0
      }), b
    }, a.prototype.getLineCount = function (a) {
      return a.offsetWidth > this.columnWidth ? d(a, this.lineHeight) : e(a.clientHeight, this.lineHeight)
    }, a.prototype.markContainer = function () {
      this.container && (this.container.classList.add(o), this.reRender && b(this.container))
    }, a.prototype.unmarkContainer = function () {
      this.container && (this.container.classList.remove(o), this.reRender && b(this.container))
    }, a.prototype.shouldApplyTopMargin = function (a) {
      var b = a.el;
      return !q.webkit || 1 === this.columnCount || 3 >= this.deltaHeight || !b.previousElementSibling ? void 0 : 0 === b.offsetTop || b.offsetTop === this.columnHeight
    }, a.prototype.clampChild = function () {
      var a = this.child;
      a && a.el && (a.el.style.height = a.clampedHeight + "px", q.webkit && (a.el.style.webkitLineClamp = a.clampedLines, a.el.style.display = "-webkit-box", a.el.style.webkitBoxOrient = "vertical"), this.shouldHideOverflow() && (a.el.style.overflow = "hidden"), a.applyTopMargin && (a.el.style.marginTop = "2em"), a.el.classList.add(n), q.webkit || (a.el.style.position = "relative", a.helper = a.el.appendChild(this.helperElement())))
    }, a.prototype.unclampChild = function (a) {
      a && a.el && (a.el.style.display = "", a.el.style.height = "", a.el.style.webkitLineClamp = "", a.el.style.webkitBoxOrient = "", a.el.style.marginTop = "", a.el.style.overflow = "", a.el.classList.remove(n), a.helper && a.helper.parentNode.removeChild(a.helper))
    }, a.prototype.helperElement = function () {
      var a, b, c = document.createElement("span"), d = this.child.visibleColumnSpan - 1;
      return c.className = "ellipsis-helper", c.style.display = "block", c.style.height = this.lineHeight + "px", c.style.width = "5em", c.style.position = "absolute", c.style.bottom = 0, c.style.right = 0, q.moz && d && (a = -(100 * d), b = -(d * this.columnGap), c.style.right = a + "%", c.style.marginRight = b + "px", c.style.marginBottom = this.deltaHeight + "px"), c
    }, a.prototype.shouldHideOverflow = function () {
      var a = this.columnCount > 1;
      return this.columnHeight < this.lineHeight ? !0 : !a
    }, "object" == typeof exports ? (module.exports = function (b, c) {
      return new a(b, c)
    }, module.exports.Ellipsis = a) : "function" == typeof define && define.amd ? define(function () {
      return a
    }) : window.Ellipsis = a
  }(), function (a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
      if (!a.document)throw new Error("jQuery requires a window with a document");
      return b(a)
    } : b(a)
  }("undefined" != typeof window ? window : this, function (a, b) {
    function c(a) {
      var b = a.length, c = eb.type(a);
      return "function" === c || eb.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    function d(a, b, c) {
      if (eb.isFunction(b))return eb.grep(a, function (a, d) {
        return !!b.call(a, d, a) !== c
      });
      if (b.nodeType)return eb.grep(a, function (a) {
        return a === b !== c
      });
      if ("string" == typeof b) {
        if (mb.test(b))return eb.filter(b, a, c);
        b = eb.filter(b, a)
      }
      return eb.grep(a, function (a) {
        return eb.inArray(a, b) >= 0 !== c
      })
    }

    function e(a, b) {
      do a = a[b]; while (a && 1 !== a.nodeType);
      return a
    }

    function f(a) {
      var b = ub[a] = {};
      return eb.each(a.match(tb) || [], function (a, c) {
        b[c] = !0
      }), b
    }

    function g() {
      ob.addEventListener ? (ob.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (ob.detachEvent("onreadystatechange", h), a.detachEvent("onload", h))
    }

    function h() {
      (ob.addEventListener || "load" === event.type || "complete" === ob.readyState) && (g(), eb.ready())
    }

    function i(a, b, c) {
      if (void 0 === c && 1 === a.nodeType) {
        var d = "data-" + b.replace(zb, "-$1").toLowerCase();
        if (c = a.getAttribute(d), "string" == typeof c) {
          try {
            c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : yb.test(c) ? eb.parseJSON(c) : c
          } catch (e) {
          }
          eb.data(a, b, c)
        } else c = void 0
      }
      return c
    }

    function j(a) {
      var b;
      for (b in a)if (("data" !== b || !eb.isEmptyObject(a[b])) && "toJSON" !== b)return !1;
      return !0
    }

    function k(a, b, c, d) {
      if (eb.acceptData(a)) {
        var e, f, g = eb.expando, h = a.nodeType, i = h ? eb.cache : a, j = h ? a[g] : a[g] && g;
        if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b)return j || (j = h ? a[g] = W.pop() || eb.guid++ : g), i[j] || (i[j] = h ? {} : {toJSON: eb.noop}), ("object" == typeof b || "function" == typeof b) && (d ? i[j] = eb.extend(i[j], b) : i[j].data = eb.extend(i[j].data, b)), f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[eb.camelCase(b)] = c), "string" == typeof b ? (e = f[b], null == e && (e = f[eb.camelCase(b)])) : e = f, e
      }
    }

    function l(a, b, c) {
      if (eb.acceptData(a)) {
        var d, e, f = a.nodeType, g = f ? eb.cache : a, h = f ? a[eb.expando] : eb.expando;
        if (g[h]) {
          if (b && (d = c ? g[h] : g[h].data)) {
            eb.isArray(b) ? b = b.concat(eb.map(b, eb.camelCase)) : b in d ? b = [b] : (b = eb.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
            for (; e--;)delete d[b[e]];
            if (c ? !j(d) : !eb.isEmptyObject(d))return
          }
          (c || (delete g[h].data, j(g[h]))) && (f ? eb.cleanData([a], !0) : cb.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
        }
      }
    }

    function m() {
      return !0
    }

    function n() {
      return !1
    }

    function o() {
      try {
        return ob.activeElement
      } catch (a) {
      }
    }

    function p(a) {
      var b = Kb.split("|"), c = a.createDocumentFragment();
      if (c.createElement)for (; b.length;)c.createElement(b.pop());
      return c
    }

    function q(a, b) {
      var c, d, e = 0, f = typeof a.getElementsByTagName !== xb ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== xb ? a.querySelectorAll(b || "*") : void 0;
      if (!f)for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)!b || eb.nodeName(d, b) ? f.push(d) : eb.merge(f, q(d, b));
      return void 0 === b || b && eb.nodeName(a, b) ? eb.merge([a], f) : f
    }

    function r(a) {
      Eb.test(a.type) && (a.defaultChecked = a.checked)
    }

    function s(a, b) {
      return eb.nodeName(a, "table") && eb.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function t(a) {
      return a.type = (null !== eb.find.attr(a, "type")) + "/" + a.type, a
    }

    function u(a) {
      var b = Vb.exec(a.type);
      return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function v(a, b) {
      for (var c, d = 0; null != (c = a[d]); d++)eb._data(c, "globalEval", !b || eb._data(b[d], "globalEval"))
    }

    function w(a, b) {
      if (1 === b.nodeType && eb.hasData(a)) {
        var c, d, e, f = eb._data(a), g = eb._data(b, f), h = f.events;
        if (h) {
          delete g.handle, g.events = {};
          for (c in h)for (d = 0, e = h[c].length; e > d; d++)eb.event.add(b, c, h[c][d])
        }
        g.data && (g.data = eb.extend({}, g.data))
      }
    }

    function x(a, b) {
      var c, d, e;
      if (1 === b.nodeType) {
        if (c = b.nodeName.toLowerCase(), !cb.noCloneEvent && b[eb.expando]) {
          e = eb._data(b);
          for (d in e.events)eb.removeEvent(b, d, e.handle);
          b.removeAttribute(eb.expando)
        }
        "script" === c && b.text !== a.text ? (t(b).text = a.text, u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), cb.html5Clone && a.innerHTML && !eb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Eb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
      }
    }

    function y(b, c) {
      var d, e = eb(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : eb.css(e[0], "display");
      return e.detach(), f
    }

    function z(a) {
      var b = ob, c = _b[a];
      return c || (c = y(a, b), "none" !== c && c || ($b = ($b || eb("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = ($b[0].contentWindow || $b[0].contentDocument).document, b.write(), b.close(), c = y(a, b), $b.detach()), _b[a] = c), c
    }

    function A(a, b) {
      return {
        get: function () {
          var c = a();
          if (null != c)return c ? void delete this.get : (this.get = b).apply(this, arguments)
        }
      }
    }

    function B(a, b) {
      if (b in a)return b;
      for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = mc.length; e--;)if (b = mc[e] + c, b in a)return b;
      return d
    }

    function C(a, b) {
      for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)d = a[g], d.style && (f[g] = eb._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Cb(d) && (f[g] = eb._data(d, "olddisplay", z(d.nodeName)))) : (e = Cb(d), (c && "none" !== c || !e) && eb._data(d, "olddisplay", e ? c : eb.css(d, "display"))));
      for (g = 0; h > g; g++)d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
      return a
    }

    function D(a, b, c) {
      var d = ic.exec(b);
      return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function E(a, b, c, d, e) {
      for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)"margin" === c && (g += eb.css(a, c + Bb[f], !0, e)), d ? ("content" === c && (g -= eb.css(a, "padding" + Bb[f], !0, e)), "margin" !== c && (g -= eb.css(a, "border" + Bb[f] + "Width", !0, e))) : (g += eb.css(a, "padding" + Bb[f], !0, e), "padding" !== c && (g += eb.css(a, "border" + Bb[f] + "Width", !0, e)));
      return g
    }

    function F(a, b, c) {
      var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = ac(a), g = cb.boxSizing && "border-box" === eb.css(a, "boxSizing", !1, f);
      if (0 >= e || null == e) {
        if (e = bc(a, b, f), (0 > e || null == e) && (e = a.style[b]), dc.test(e))return e;
        d = g && (cb.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
      }
      return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function G(a, b, c, d, e) {
      return new G.prototype.init(a, b, c, d, e)
    }

    function H() {
      return setTimeout(function () {
        nc = void 0
      }), nc = eb.now()
    }

    function I(a, b) {
      var c, d = {height: a}, e = 0;
      for (b = b ? 1 : 0; 4 > e; e += 2 - b)c = Bb[e], d["margin" + c] = d["padding" + c] = a;
      return b && (d.opacity = d.width = a), d
    }

    function J(a, b, c) {
      for (var d, e = (tc[b] || []).concat(tc["*"]), f = 0, g = e.length; g > f; f++)if (d = e[f].call(c, b, a))return d
    }

    function K(a, b, c) {
      var d, e, f, g, h, i, j, k, l = this, m = {}, n = a.style, o = a.nodeType && Cb(a), p = eb._data(a, "fxshow");
      c.queue || (h = eb._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
        h.unqueued || i()
      }), h.unqueued++, l.always(function () {
        l.always(function () {
          h.unqueued--, eb.queue(a, "fx").length || h.empty.fire()
        })
      })), 1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = eb.css(a, "display"), k = "none" === j ? eb._data(a, "olddisplay") || z(a.nodeName) : j, "inline" === k && "none" === eb.css(a, "float") && (cb.inlineBlockNeedsLayout && "inline" !== z(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", cb.shrinkWrapBlocks() || l.always(function () {
        n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
      }));
      for (d in b)if (e = b[d], pc.exec(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
          if ("show" !== e || !p || void 0 === p[d])continue;
          o = !0
        }
        m[d] = p && p[d] || eb.style(a, d)
      } else j = void 0;
      if (eb.isEmptyObject(m))"inline" === ("none" === j ? z(a.nodeName) : j) && (n.display = j); else {
        p ? "hidden"in p && (o = p.hidden) : p = eb._data(a, "fxshow", {}), f && (p.hidden = !o), o ? eb(a).show() : l.done(function () {
          eb(a).hide()
        }), l.done(function () {
          var b;
          eb._removeData(a, "fxshow");
          for (b in m)eb.style(a, b, m[b])
        });
        for (d in m)g = J(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
      }
    }

    function L(a, b) {
      var c, d, e, f, g;
      for (c in a)if (d = eb.camelCase(c), e = b[d], f = a[c], eb.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = eb.cssHooks[d], g && "expand"in g) {
        f = g.expand(f), delete a[d];
        for (c in f)c in a || (a[c] = f[c], b[c] = e)
      } else b[d] = e
    }

    function M(a, b, c) {
      var d, e, f = 0, g = sc.length, h = eb.Deferred().always(function () {
        delete i.elem
      }), i = function () {
        if (e)return !1;
        for (var b = nc || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)j.tweens[g].run(f);
        return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
      }, j = h.promise({
        elem: a,
        props: eb.extend({}, b),
        opts: eb.extend(!0, {specialEasing: {}}, c),
        originalProperties: b,
        originalOptions: c,
        startTime: nc || H(),
        duration: c.duration,
        tweens: [],
        createTween: function (b, c) {
          var d = eb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
          return j.tweens.push(d), d
        },
        stop: function (b) {
          var c = 0, d = b ? j.tweens.length : 0;
          if (e)return this;
          for (e = !0; d > c; c++)j.tweens[c].run(1);
          return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
        }
      }), k = j.props;
      for (L(k, j.opts.specialEasing); g > f; f++)if (d = sc[f].call(j, a, k, j.opts))return d;
      return eb.map(k, J, j), eb.isFunction(j.opts.start) && j.opts.start.call(a, j), eb.fx.timer(eb.extend(i, {
        elem: a,
        anim: j,
        queue: j.opts.queue
      })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function N(a) {
      return function (b, c) {
        "string" != typeof b && (c = b, b = "*");
        var d, e = 0, f = b.toLowerCase().match(tb) || [];
        if (eb.isFunction(c))for (; d = f[e++];)"+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
      }
    }

    function O(a, b, c, d) {
      function e(h) {
        var i;
        return f[h] = !0, eb.each(a[h] || [], function (a, h) {
          var j = h(b, c, d);
          return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
        }), i
      }

      var f = {}, g = a === Rc;
      return e(b.dataTypes[0]) || !f["*"] && e("*")
    }

    function P(a, b) {
      var c, d, e = eb.ajaxSettings.flatOptions || {};
      for (d in b)void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
      return c && eb.extend(!0, a, c), a
    }

    function Q(a, b, c) {
      for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0];)i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
      if (e)for (g in h)if (h[g] && h[g].test(e)) {
        i.unshift(g);
        break
      }
      if (i[0]in c)f = i[0]; else {
        for (g in c) {
          if (!i[0] || a.converters[g + " " + i[0]]) {
            f = g;
            break
          }
          d || (d = g)
        }
        f = f || d
      }
      return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function R(a, b, c, d) {
      var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
      if (k[1])for (g in a.converters)j[g.toLowerCase()] = a.converters[g];
      for (f = k.shift(); f;)if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())if ("*" === f)f = i; else if ("*" !== i && i !== f) {
        if (g = j[i + " " + f] || j["* " + f], !g)for (e in j)if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
          g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
          break
        }
        if (g !== !0)if (g && a["throws"])b = g(b); else try {
          b = g(b)
        } catch (l) {
          return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
        }
      }
      return {state: "success", data: b}
    }

    function S(a, b, c, d) {
      var e;
      if (eb.isArray(b))eb.each(b, function (b, e) {
        c || Vc.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
      }); else if (c || "object" !== eb.type(b))d(a, b); else for (e in b)S(a + "[" + e + "]", b[e], c, d)
    }

    function T() {
      try {
        return new a.XMLHttpRequest
      } catch (b) {
      }
    }

    function U() {
      try {
        return new a.ActiveXObject("Microsoft.XMLHTTP")
      } catch (b) {
      }
    }

    function V(a) {
      return eb.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    var W = [], X = W.slice, Y = W.concat, Z = W.push, $ = W.indexOf, _ = {}, ab = _.toString, bb = _.hasOwnProperty, cb = {}, db = "1.11.1", eb = function (a, b) {
      return new eb.fn.init(a, b)
    }, fb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, gb = /^-ms-/, hb = /-([\da-z])/gi, ib = function (a, b) {
      return b.toUpperCase()
    };
    eb.fn = eb.prototype = {
      jquery: db, constructor: eb, selector: "", length: 0, toArray: function () {
        return X.call(this)
      }, get: function (a) {
        return null != a ? 0 > a ? this[a + this.length] : this[a] : X.call(this)
      }, pushStack: function (a) {
        var b = eb.merge(this.constructor(), a);
        return b.prevObject = this, b.context = this.context, b
      }, each: function (a, b) {
        return eb.each(this, a, b)
      }, map: function (a) {
        return this.pushStack(eb.map(this, function (b, c) {
          return a.call(b, c, b)
        }))
      }, slice: function () {
        return this.pushStack(X.apply(this, arguments))
      }, first: function () {
        return this.eq(0)
      }, last: function () {
        return this.eq(-1)
      }, eq: function (a) {
        var b = this.length, c = +a + (0 > a ? b : 0);
        return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
      }, end: function () {
        return this.prevObject || this.constructor(null)
      }, push: Z, sort: W.sort, splice: W.splice
    }, eb.extend = eb.fn.extend = function () {
      var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
      for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || eb.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)if (null != (e = arguments[h]))for (d in e)a = g[d], c = e[d], g !== c && (j && c && (eb.isPlainObject(c) || (b = eb.isArray(c))) ? (b ? (b = !1, f = a && eb.isArray(a) ? a : []) : f = a && eb.isPlainObject(a) ? a : {}, g[d] = eb.extend(j, f, c)) : void 0 !== c && (g[d] = c));
      return g
    }, eb.extend({
      expando: "jQuery" + (db + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
        throw new Error(a)
      }, noop: function () {
      }, isFunction: function (a) {
        return "function" === eb.type(a)
      }, isArray: Array.isArray || function (a) {
        return "array" === eb.type(a)
      }, isWindow: function (a) {
        return null != a && a == a.window
      }, isNumeric: function (a) {
        return !eb.isArray(a) && a - parseFloat(a) >= 0
      }, isEmptyObject: function (a) {
        var b;
        for (b in a)return !1;
        return !0
      }, isPlainObject: function (a) {
        var b;
        if (!a || "object" !== eb.type(a) || a.nodeType || eb.isWindow(a))return !1;
        try {
          if (a.constructor && !bb.call(a, "constructor") && !bb.call(a.constructor.prototype, "isPrototypeOf"))return !1
        } catch (c) {
          return !1
        }
        if (cb.ownLast)for (b in a)return bb.call(a, b);
        for (b in a);
        return void 0 === b || bb.call(a, b)
      }, type: function (a) {
        return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[ab.call(a)] || "object" : typeof a
      }, globalEval: function (b) {
        b && eb.trim(b) && (a.execScript || function (b) {
          a.eval.call(a, b)
        })(b)
      }, camelCase: function (a) {
        return a.replace(gb, "ms-").replace(hb, ib)
      }, nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
      }, each: function (a, b, d) {
        var e, f = 0, g = a.length, h = c(a);
        if (d) {
          if (h)for (; g > f && (e = b.apply(a[f], d), e !== !1); f++); else for (f in a)if (e = b.apply(a[f], d), e === !1)break
        } else if (h)for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++); else for (f in a)if (e = b.call(a[f], f, a[f]), e === !1)break;
        return a
      }, trim: function (a) {
        return null == a ? "" : (a + "").replace(fb, "")
      }, makeArray: function (a, b) {
        var d = b || [];
        return null != a && (c(Object(a)) ? eb.merge(d, "string" == typeof a ? [a] : a) : Z.call(d, a)), d
      }, inArray: function (a, b, c) {
        var d;
        if (b) {
          if ($)return $.call(b, a, c);
          for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)if (c in b && b[c] === a)return c
        }
        return -1
      }, merge: function (a, b) {
        for (var c = +b.length, d = 0, e = a.length; c > d;)a[e++] = b[d++];
        if (c !== c)for (; void 0 !== b[d];)a[e++] = b[d++];
        return a.length = e, a
      }, grep: function (a, b, c) {
        for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)d = !b(a[f], f), d !== h && e.push(a[f]);
        return e
      }, map: function (a, b, d) {
        var e, f = 0, g = a.length, h = c(a), i = [];
        if (h)for (; g > f; f++)e = b(a[f], f, d), null != e && i.push(e); else for (f in a)e = b(a[f], f, d), null != e && i.push(e);
        return Y.apply([], i)
      }, guid: 1, proxy: function (a, b) {
        var c, d, e;
        return "string" == typeof b && (e = a[b], b = a, a = e), eb.isFunction(a) ? (c = X.call(arguments, 2), d = function () {
          return a.apply(b || this, c.concat(X.call(arguments)))
        }, d.guid = a.guid = a.guid || eb.guid++, d) : void 0
      }, now: function () {
        return +new Date
      }, support: cb
    }), eb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
      _["[object " + b + "]"] = b.toLowerCase()
    });
    var jb = function (a) {
      function b(a, b, c, d) {
        var e, f, g, h, i, j, l, n, o, p;
        if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a)return c;
        if (1 !== (h = b.nodeType) && 9 !== h)return [];
        if (I && !d) {
          if (e = sb.exec(a))if (g = e[1]) {
            if (9 === h) {
              if (f = b.getElementById(g), !f || !f.parentNode)return c;
              if (f.id === g)return c.push(f), c
            } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g)return c.push(f), c
          } else {
            if (e[2])return _.apply(c, b.getElementsByTagName(a)), c;
            if ((g = e[3]) && v.getElementsByClassName && b.getElementsByClassName)return _.apply(c, b.getElementsByClassName(g)), c
          }
          if (v.qsa && (!J || !J.test(a))) {
            if (n = l = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
              for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ub, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;)j[i] = n + m(j[i]);
              o = tb.test(a) && k(b.parentNode) || b, p = j.join(",")
            }
            if (p)try {
              return _.apply(c, o.querySelectorAll(p)), c
            } catch (q) {
            } finally {
              l || b.removeAttribute("id")
            }
          }
        }
        return B(a.replace(ib, "$1"), b, c, d)
      }

      function c() {
        function a(c, d) {
          return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
        }

        var b = [];
        return a
      }

      function d(a) {
        return a[N] = !0, a
      }

      function e(a) {
        var b = G.createElement("div");
        try {
          return !!a(b)
        } catch (c) {
          return !1
        } finally {
          b.parentNode && b.parentNode.removeChild(b), b = null
        }
      }

      function f(a, b) {
        for (var c = a.split("|"), d = a.length; d--;)w.attrHandle[c[d]] = b
      }

      function g(a, b) {
        var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
        if (d)return d;
        if (c)for (; c = c.nextSibling;)if (c === b)return -1;
        return a ? 1 : -1
      }

      function h(a) {
        return function (b) {
          var c = b.nodeName.toLowerCase();
          return "input" === c && b.type === a
        }
      }

      function i(a) {
        return function (b) {
          var c = b.nodeName.toLowerCase();
          return ("input" === c || "button" === c) && b.type === a
        }
      }

      function j(a) {
        return d(function (b) {
          return b = +b, d(function (c, d) {
            for (var e, f = a([], c.length, b), g = f.length; g--;)c[e = f[g]] && (c[e] = !(d[e] = c[e]))
          })
        })
      }

      function k(a) {
        return a && typeof a.getElementsByTagName !== V && a
      }

      function l() {
      }

      function m(a) {
        for (var b = 0, c = a.length, d = ""; c > b; b++)d += a[b].value;
        return d
      }

      function n(a, b, c) {
        var d = b.dir, e = c && "parentNode" === d, f = Q++;
        return b.first ? function (b, c, f) {
          for (; b = b[d];)if (1 === b.nodeType || e)return a(b, c, f)
        } : function (b, c, g) {
          var h, i, j = [P, f];
          if (g) {
            for (; b = b[d];)if ((1 === b.nodeType || e) && a(b, c, g))return !0
          } else for (; b = b[d];)if (1 === b.nodeType || e) {
            if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f)return j[2] = h[2];
            if (i[d] = j, j[2] = a(b, c, g))return !0
          }
        }
      }

      function o(a) {
        return a.length > 1 ? function (b, c, d) {
          for (var e = a.length; e--;)if (!a[e](b, c, d))return !1;
          return !0
        } : a[0]
      }

      function p(a, c, d) {
        for (var e = 0, f = c.length; f > e; e++)b(a, c[e], d);
        return d
      }

      function q(a, b, c, d, e) {
        for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
        return g
      }

      function r(a, b, c, e, f, g) {
        return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function (d, g, h, i) {
          var j, k, l, m = [], n = [], o = g.length, r = d || p(b || "*", h.nodeType ? [h] : h, []), s = !a || !d && b ? r : q(r, m, a, h, i), t = c ? f || (d ? a : o || e) ? [] : g : s;
          if (c && c(s, t, h, i), e)for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
          if (d) {
            if (f || a) {
              if (f) {
                for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                f(null, t = [], j, i)
              }
              for (k = t.length; k--;)(l = t[k]) && (j = f ? bb.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
            }
          } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : _.apply(g, t)
        })
      }

      function s(a) {
        for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function (a) {
          return a === b
        }, g, !0), j = n(function (a) {
          return bb.call(b, a) > -1
        }, g, !0), k = [function (a, c, d) {
          return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
        }]; e > h; h++)if (c = w.relative[a[h].type])k = [n(o(k), c)]; else {
          if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
            for (d = ++h; e > d && !w.relative[a[d].type]; d++);
            return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({value: " " === a[h - 2].type ? "*" : ""})).replace(ib, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
          }
          k.push(c)
        }
        return o(k)
      }

      function t(a, c) {
        var e = c.length > 0, f = a.length > 0, g = function (d, g, h, i, j) {
          var k, l, m, n = 0, o = "0", p = d && [], r = [], s = C, t = d || f && w.find.TAG("*", j), u = P += null == s ? 1 : Math.random() || .1, v = t.length;
          for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
            if (f && k) {
              for (l = 0; m = a[l++];)if (m(k, g, h)) {
                i.push(k);
                break
              }
              j && (P = u)
            }
            e && ((k = !m && k) && n--, d && p.push(k))
          }
          if (n += o, e && o !== n) {
            for (l = 0; m = c[l++];)m(p, r, g, h);
            if (d) {
              if (n > 0)for (; o--;)p[o] || r[o] || (r[o] = Z.call(i));
              r = q(r)
            }
            _.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
          }
          return j && (P = u, C = s), p
        };
        return e ? d(g) : g
      }

      var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date, O = a.document, P = 0, Q = 0, R = c(), S = c(), T = c(), U = function (a, b) {
        return a === b && (E = !0), 0
      }, V = "undefined", W = 1 << 31, X = {}.hasOwnProperty, Y = [], Z = Y.pop, $ = Y.push, _ = Y.push, ab = Y.slice, bb = Y.indexOf || function (a) {
          for (var b = 0, c = this.length; c > b; b++)if (this[b] === a)return b;
          return -1
        }, cb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", db = "[\\x20\\t\\r\\n\\f]", eb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", fb = eb.replace("w", "w#"), gb = "\\[" + db + "*(" + eb + ")(?:" + db + "*([*^$|!~]?=)" + db + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + fb + "))|)" + db + "*\\]", hb = ":(" + eb + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + gb + ")*)|.*)\\)|)", ib = new RegExp("^" + db + "+|((?:^|[^\\\\])(?:\\\\.)*)" + db + "+$", "g"), jb = new RegExp("^" + db + "*," + db + "*"), kb = new RegExp("^" + db + "*([>+~]|" + db + ")" + db + "*"), lb = new RegExp("=" + db + "*([^\\]'\"]*?)" + db + "*\\]", "g"), mb = new RegExp(hb), nb = new RegExp("^" + fb + "$"), ob = {
        ID: new RegExp("^#(" + eb + ")"),
        CLASS: new RegExp("^\\.(" + eb + ")"),
        TAG: new RegExp("^(" + eb.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + gb),
        PSEUDO: new RegExp("^" + hb),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + db + "*(even|odd|(([+-]|)(\\d*)n|)" + db + "*(?:([+-]|)" + db + "*(\\d+)|))" + db + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + cb + ")$", "i"),
        needsContext: new RegExp("^" + db + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + db + "*((?:-\\d)?\\d*)" + db + "*\\)|)(?=[^-]|$)", "i")
      }, pb = /^(?:input|select|textarea|button)$/i, qb = /^h\d$/i, rb = /^[^{]+\{\s*\[native \w/, sb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, tb = /[+~]/, ub = /'|\\/g, vb = new RegExp("\\\\([\\da-f]{1,6}" + db + "?|(" + db + ")|.)", "ig"), wb = function (a, b, c) {
        var d = "0x" + b - 65536;
        return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
      };
      try {
        _.apply(Y = ab.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType
      } catch (xb) {
        _ = {
          apply: Y.length ? function (a, b) {
            $.apply(a, ab.call(b))
          } : function (a, b) {
            for (var c = a.length, d = 0; a[c++] = b[d++];);
            a.length = c - 1
          }
        }
      }
      v = b.support = {}, y = b.isXML = function (a) {
        var b = a && (a.ownerDocument || a).documentElement;
        return b ? "HTML" !== b.nodeName : !1
      }, F = b.setDocument = function (a) {
        var b, c = a ? a.ownerDocument || a : O, d = c.defaultView;
        return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !y(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function () {
          F()
        }, !1) : d.attachEvent && d.attachEvent("onunload", function () {
          F()
        })), v.attributes = e(function (a) {
          return a.className = "i", !a.getAttribute("className")
        }), v.getElementsByTagName = e(function (a) {
          return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
        }), v.getElementsByClassName = rb.test(c.getElementsByClassName) && e(function (a) {
          return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
        }), v.getById = e(function (a) {
          return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length
        }), v.getById ? (w.find.ID = function (a, b) {
          if (typeof b.getElementById !== V && I) {
            var c = b.getElementById(a);
            return c && c.parentNode ? [c] : []
          }
        }, w.filter.ID = function (a) {
          var b = a.replace(vb, wb);
          return function (a) {
            return a.getAttribute("id") === b
          }
        }) : (delete w.find.ID, w.filter.ID = function (a) {
          var b = a.replace(vb, wb);
          return function (a) {
            var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
            return c && c.value === b
          }
        }), w.find.TAG = v.getElementsByTagName ? function (a, b) {
          return typeof b.getElementsByTagName !== V ? b.getElementsByTagName(a) : void 0
        } : function (a, b) {
          var c, d = [], e = 0, f = b.getElementsByTagName(a);
          if ("*" === a) {
            for (; c = f[e++];)1 === c.nodeType && d.push(c);
            return d
          }
          return f
        }, w.find.CLASS = v.getElementsByClassName && function (a, b) {
          return typeof b.getElementsByClassName !== V && I ? b.getElementsByClassName(a) : void 0
        }, K = [], J = [], (v.qsa = rb.test(c.querySelectorAll)) && (e(function (a) {
          a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && J.push("[*^$]=" + db + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + db + "*(?:value|" + cb + ")"), a.querySelectorAll(":checked").length || J.push(":checked")
        }), e(function (a) {
          var b = c.createElement("input");
          b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + db + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
        })), (v.matchesSelector = rb.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function (a) {
          v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", hb)
        }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = rb.test(H.compareDocumentPosition), M = b || rb.test(H.contains) ? function (a, b) {
          var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
          return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
        } : function (a, b) {
          if (b)for (; b = b.parentNode;)if (b === a)return !0;
          return !1
        }, U = b ? function (a, b) {
          if (a === b)return E = !0, 0;
          var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
          return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !v.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0 : 4 & d ? -1 : 1)
        } : function (a, b) {
          if (a === b)return E = !0, 0;
          var d, e = 0, f = a.parentNode, h = b.parentNode, i = [a], j = [b];
          if (!f || !h)return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0;
          if (f === h)return g(a, b);
          for (d = a; d = d.parentNode;)i.unshift(d);
          for (d = b; d = d.parentNode;)j.unshift(d);
          for (; i[e] === j[e];)e++;
          return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
        }, c) : G
      }, b.matches = function (a, c) {
        return b(a, null, null, c)
      }, b.matchesSelector = function (a, c) {
        if ((a.ownerDocument || a) !== G && F(a), c = c.replace(lb, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c)))try {
          var d = L.call(a, c);
          if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType)return d
        } catch (e) {
        }
        return b(c, G, null, [a]).length > 0
      }, b.contains = function (a, b) {
        return (a.ownerDocument || a) !== G && F(a), M(a, b)
      }, b.attr = function (a, b) {
        (a.ownerDocument || a) !== G && F(a);
        var c = w.attrHandle[b.toLowerCase()], d = c && X.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
        return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
      }, b.error = function (a) {
        throw new Error("Syntax error, unrecognized expression: " + a)
      }, b.uniqueSort = function (a) {
        var b, c = [], d = 0, e = 0;
        if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
          for (; b = a[e++];)b === a[e] && (d = c.push(e));
          for (; d--;)a.splice(c[d], 1)
        }
        return D = null, a
      }, x = b.getText = function (a) {
        var b, c = "", d = 0, e = a.nodeType;
        if (e) {
          if (1 === e || 9 === e || 11 === e) {
            if ("string" == typeof a.textContent)return a.textContent;
            for (a = a.firstChild; a; a = a.nextSibling)c += x(a)
          } else if (3 === e || 4 === e)return a.nodeValue
        } else for (; b = a[d++];)c += x(b);
        return c
      }, w = b.selectors = {
        cacheLength: 50,
        createPseudo: d,
        match: ob,
        attrHandle: {},
        find: {},
        relative: {
          ">": {dir: "parentNode", first: !0},
          " ": {dir: "parentNode"},
          "+": {dir: "previousSibling", first: !0},
          "~": {dir: "previousSibling"}
        },
        preFilter: {
          ATTR: function (a) {
            return a[1] = a[1].replace(vb, wb), a[3] = (a[3] || a[4] || a[5] || "").replace(vb, wb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
          }, CHILD: function (a) {
            return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
          }, PSEUDO: function (a) {
            var b, c = !a[6] && a[2];
            return ob.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && mb.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
          }
        },
        filter: {
          TAG: function (a) {
            var b = a.replace(vb, wb).toLowerCase();
            return "*" === a ? function () {
              return !0
            } : function (a) {
              return a.nodeName && a.nodeName.toLowerCase() === b
            }
          }, CLASS: function (a) {
            var b = R[a + " "];
            return b || (b = new RegExp("(^|" + db + ")" + a + "(" + db + "|$)")) && R(a, function (a) {
                return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
              })
          }, ATTR: function (a, c, d) {
            return function (e) {
              var f = b.attr(e, a);
              return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
            }
          }, CHILD: function (a, b, c, d, e) {
            var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
            return 1 === d && 0 === e ? function (a) {
              return !!a.parentNode
            } : function (b, c, i) {
              var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
              if (q) {
                if (f) {
                  for (; p;) {
                    for (l = b; l = l[p];)if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)return !1;
                    o = p = "only" === a && !o && "nextSibling"
                  }
                  return !0
                }
                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                  for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)if (1 === l.nodeType && ++m && l === b) {
                    k[a] = [P, n, m];
                    break
                  }
                } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P)m = j[1]; else for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                return m -= e, m === d || m % d === 0 && m / d >= 0
              }
            }
          }, PSEUDO: function (a, c) {
            var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
            return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
              for (var d, e = f(a, c), g = e.length; g--;)d = bb.call(a, e[g]), a[d] = !(b[d] = e[g])
            }) : function (a) {
              return f(a, 0, e)
            }) : f
          }
        },
        pseudos: {
          not: d(function (a) {
            var b = [], c = [], e = A(a.replace(ib, "$1"));
            return e[N] ? d(function (a, b, c, d) {
              for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
            }) : function (a, d, f) {
              return b[0] = a, e(b, null, f, c), !c.pop()
            }
          }), has: d(function (a) {
            return function (c) {
              return b(a, c).length > 0
            }
          }), contains: d(function (a) {
            return function (b) {
              return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
            }
          }), lang: d(function (a) {
            return nb.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(vb, wb).toLowerCase(), function (b) {
              var c;
              do if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
              return !1
            }
          }), target: function (b) {
            var c = a.location && a.location.hash;
            return c && c.slice(1) === b.id
          }, root: function (a) {
            return a === H
          }, focus: function (a) {
            return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
          }, enabled: function (a) {
            return a.disabled === !1
          }, disabled: function (a) {
            return a.disabled === !0
          }, checked: function (a) {
            var b = a.nodeName.toLowerCase();
            return "input" === b && !!a.checked || "option" === b && !!a.selected
          }, selected: function (a) {
            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
          }, empty: function (a) {
            for (a = a.firstChild; a; a = a.nextSibling)if (a.nodeType < 6)return !1;
            return !0
          }, parent: function (a) {
            return !w.pseudos.empty(a)
          }, header: function (a) {
            return qb.test(a.nodeName)
          }, input: function (a) {
            return pb.test(a.nodeName)
          }, button: function (a) {
            var b = a.nodeName.toLowerCase();
            return "input" === b && "button" === a.type || "button" === b
          }, text: function (a) {
            var b;
            return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
          }, first: j(function () {
            return [0]
          }), last: j(function (a, b) {
            return [b - 1]
          }), eq: j(function (a, b, c) {
            return [0 > c ? c + b : c]
          }), even: j(function (a, b) {
            for (var c = 0; b > c; c += 2)a.push(c);
            return a
          }), odd: j(function (a, b) {
            for (var c = 1; b > c; c += 2)a.push(c);
            return a
          }), lt: j(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; --d >= 0;)a.push(d);
            return a
          }), gt: j(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; ++d < b;)a.push(d);
            return a
          })
        }
      }, w.pseudos.nth = w.pseudos.eq;
      for (u in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})w.pseudos[u] = h(u);
      for (u in{submit: !0, reset: !0})w.pseudos[u] = i(u);
      return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function (a, c) {
        var d, e, f, g, h, i, j, k = S[a + " "];
        if (k)return c ? 0 : k.slice(0);
        for (h = a, i = [], j = w.preFilter; h;) {
          (!d || (e = jb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = kb.exec(h)) && (d = e.shift(), f.push({
            value: d,
            type: e[0].replace(ib, " ")
          }), h = h.slice(d.length));
          for (g in w.filter)!(e = ob[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
            value: d,
            type: g,
            matches: e
          }), h = h.slice(d.length));
          if (!d)break
        }
        return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
      }, A = b.compile = function (a, b) {
        var c, d = [], e = [], f = T[a + " "];
        if (!f) {
          for (b || (b = z(a)), c = b.length; c--;)f = s(b[c]), f[N] ? d.push(f) : e.push(f);
          f = T(a, t(e, d)), f.selector = a
        }
        return f
      }, B = b.select = function (a, b, c, d) {
        var e, f, g, h, i, j = "function" == typeof a && a, l = !d && z(a = j.selector || a);
        if (c = c || [], 1 === l.length) {
          if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
            if (b = (w.find.ID(g.matches[0].replace(vb, wb), b) || [])[0], !b)return c;
            j && (b = b.parentNode), a = a.slice(f.shift().value.length)
          }
          for (e = ob.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)if ((i = w.find[h]) && (d = i(g.matches[0].replace(vb, wb), tb.test(f[0].type) && k(b.parentNode) || b))) {
            if (f.splice(e, 1), a = d.length && m(f), !a)return _.apply(c, d), c;
            break
          }
        }
        return (j || A(a, l))(d, b, !I, c, tb.test(a) && k(b.parentNode) || b), c
      }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function (a) {
        return 1 & a.compareDocumentPosition(G.createElement("div"))
      }), e(function (a) {
        return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
      }) || f("type|href|height|width", function (a, b, c) {
        return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
      }), v.attributes && e(function (a) {
        return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
      }) || f("value", function (a, b, c) {
        return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
      }), e(function (a) {
        return null == a.getAttribute("disabled")
      }) || f(cb, function (a, b, c) {
        var d;
        return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
      }), b
    }(a);
    eb.find = jb, eb.expr = jb.selectors, eb.expr[":"] = eb.expr.pseudos, eb.unique = jb.uniqueSort, eb.text = jb.getText, eb.isXMLDoc = jb.isXML, eb.contains = jb.contains;
    var kb = eb.expr.match.needsContext, lb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, mb = /^.[^:#\[\.,]*$/;
    eb.filter = function (a, b, c) {
      var d = b[0];
      return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? eb.find.matchesSelector(d, a) ? [d] : [] : eb.find.matches(a, eb.grep(b, function (a) {
        return 1 === a.nodeType
      }))
    }, eb.fn.extend({
      find: function (a) {
        var b, c = [], d = this, e = d.length;
        if ("string" != typeof a)return this.pushStack(eb(a).filter(function () {
          for (b = 0; e > b; b++)if (eb.contains(d[b], this))return !0
        }));
        for (b = 0; e > b; b++)eb.find(a, d[b], c);
        return c = this.pushStack(e > 1 ? eb.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
      }, filter: function (a) {
        return this.pushStack(d(this, a || [], !1))
      }, not: function (a) {
        return this.pushStack(d(this, a || [], !0))
      }, is: function (a) {
        return !!d(this, "string" == typeof a && kb.test(a) ? eb(a) : a || [], !1).length
      }
    });
    var nb, ob = a.document, pb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, qb = eb.fn.init = function (a, b) {
      var c, d;
      if (!a)return this;
      if ("string" == typeof a) {
        if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : pb.exec(a), !c || !c[1] && b)return !b || b.jquery ? (b || nb).find(a) : this.constructor(b).find(a);
        if (c[1]) {
          if (b = b instanceof eb ? b[0] : b, eb.merge(this, eb.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : ob, !0)), lb.test(c[1]) && eb.isPlainObject(b))for (c in b)eb.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
          return this
        }
        if (d = ob.getElementById(c[2]), d && d.parentNode) {
          if (d.id !== c[2])return nb.find(a);
          this.length = 1, this[0] = d
        }
        return this.context = ob, this.selector = a, this
      }
      return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : eb.isFunction(a) ? "undefined" != typeof nb.ready ? nb.ready(a) : a(eb) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), eb.makeArray(a, this))
    };
    qb.prototype = eb.fn, nb = eb(ob);
    var rb = /^(?:parents|prev(?:Until|All))/, sb = {children: !0, contents: !0, next: !0, prev: !0};
    eb.extend({
      dir: function (a, b, c) {
        for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !eb(e).is(c));)1 === e.nodeType && d.push(e), e = e[b];
        return d
      }, sibling: function (a, b) {
        for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a);
        return c
      }
    }), eb.fn.extend({
      has: function (a) {
        var b, c = eb(a, this), d = c.length;
        return this.filter(function () {
          for (b = 0; d > b; b++)if (eb.contains(this, c[b]))return !0
        })
      }, closest: function (a, b) {
        for (var c, d = 0, e = this.length, f = [], g = kb.test(a) || "string" != typeof a ? eb(a, b || this.context) : 0; e > d; d++)for (c = this[d]; c && c !== b; c = c.parentNode)if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && eb.find.matchesSelector(c, a))) {
          f.push(c);
          break
        }
        return this.pushStack(f.length > 1 ? eb.unique(f) : f)
      }, index: function (a) {
        return a ? "string" == typeof a ? eb.inArray(this[0], eb(a)) : eb.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
      }, add: function (a, b) {
        return this.pushStack(eb.unique(eb.merge(this.get(), eb(a, b))))
      }, addBack: function (a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
      }
    }), eb.each({
      parent: function (a) {
        var b = a.parentNode;
        return b && 11 !== b.nodeType ? b : null
      }, parents: function (a) {
        return eb.dir(a, "parentNode")
      }, parentsUntil: function (a, b, c) {
        return eb.dir(a, "parentNode", c)
      }, next: function (a) {
        return e(a, "nextSibling")
      }, prev: function (a) {
        return e(a, "previousSibling")
      }, nextAll: function (a) {
        return eb.dir(a, "nextSibling")
      }, prevAll: function (a) {
        return eb.dir(a, "previousSibling")
      }, nextUntil: function (a, b, c) {
        return eb.dir(a, "nextSibling", c)
      }, prevUntil: function (a, b, c) {
        return eb.dir(a, "previousSibling", c)
      }, siblings: function (a) {
        return eb.sibling((a.parentNode || {}).firstChild, a)
      }, children: function (a) {
        return eb.sibling(a.firstChild)
      }, contents: function (a) {
        return eb.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : eb.merge([], a.childNodes)
      }
    }, function (a, b) {
      eb.fn[a] = function (c, d) {
        var e = eb.map(this, b, c);
        return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = eb.filter(d, e)), this.length > 1 && (sb[a] || (e = eb.unique(e)), rb.test(a) && (e = e.reverse())), this.pushStack(e)
      }
    });
    var tb = /\S+/g, ub = {};
    eb.Callbacks = function (a) {
      a = "string" == typeof a ? ub[a] || f(a) : eb.extend({}, a);
      var b, c, d, e, g, h, i = [], j = !a.once && [], k = function (f) {
        for (c = a.memory && f, d = !0, g = h || 0, h = 0, e = i.length, b = !0; i && e > g; g++)if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
          c = !1;
          break
        }
        b = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable())
      }, l = {
        add: function () {
          if (i) {
            var d = i.length;
            !function f(b) {
              eb.each(b, function (b, c) {
                var d = eb.type(c);
                "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
              })
            }(arguments), b ? e = i.length : c && (h = d, k(c))
          }
          return this
        }, remove: function () {
          return i && eb.each(arguments, function (a, c) {
            for (var d; (d = eb.inArray(c, i, d)) > -1;)i.splice(d, 1), b && (e >= d && e--, g >= d && g--)
          }), this
        }, has: function (a) {
          return a ? eb.inArray(a, i) > -1 : !(!i || !i.length)
        }, empty: function () {
          return i = [], e = 0, this
        }, disable: function () {
          return i = j = c = void 0, this
        }, disabled: function () {
          return !i
        }, lock: function () {
          return j = void 0, c || l.disable(), this
        }, locked: function () {
          return !j
        }, fireWith: function (a, c) {
          return !i || d && !j || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? j.push(c) : k(c)), this
        }, fire: function () {
          return l.fireWith(this, arguments), this
        }, fired: function () {
          return !!d
        }
      };
      return l
    }, eb.extend({
      Deferred: function (a) {
        var b = [["resolve", "done", eb.Callbacks("once memory"), "resolved"], ["reject", "fail", eb.Callbacks("once memory"), "rejected"], ["notify", "progress", eb.Callbacks("memory")]], c = "pending", d = {
          state: function () {
            return c
          }, always: function () {
            return e.done(arguments).fail(arguments), this
          }, then: function () {
            var a = arguments;
            return eb.Deferred(function (c) {
              eb.each(b, function (b, f) {
                var g = eb.isFunction(a[b]) && a[b];
                e[f[1]](function () {
                  var a = g && g.apply(this, arguments);
                  a && eb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                })
              }), a = null
            }).promise()
          }, promise: function (a) {
            return null != a ? eb.extend(a, d) : d
          }
        }, e = {};
        return d.pipe = d.then, eb.each(b, function (a, f) {
          var g = f[2], h = f[3];
          d[f[1]] = g.add, h && g.add(function () {
            c = h
          }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
            return e[f[0] + "With"](this === e ? d : this, arguments), this
          }, e[f[0] + "With"] = g.fireWith
        }), d.promise(e), a && a.call(e, e), e
      }, when: function (a) {
        var b, c, d, e = 0, f = X.call(arguments), g = f.length, h = 1 !== g || a && eb.isFunction(a.promise) ? g : 0, i = 1 === h ? a : eb.Deferred(), j = function (a, c, d) {
          return function (e) {
            c[a] = this, d[a] = arguments.length > 1 ? X.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
          }
        };
        if (g > 1)for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++)f[e] && eb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
        return h || i.resolveWith(d, f), i.promise()
      }
    });
    var vb;
    eb.fn.ready = function (a) {
      return eb.ready.promise().done(a), this
    }, eb.extend({
      isReady: !1, readyWait: 1, holdReady: function (a) {
        a ? eb.readyWait++ : eb.ready(!0)
      }, ready: function (a) {
        if (a === !0 ? !--eb.readyWait : !eb.isReady) {
          if (!ob.body)return setTimeout(eb.ready);
          eb.isReady = !0, a !== !0 && --eb.readyWait > 0 || (vb.resolveWith(ob, [eb]), eb.fn.triggerHandler && (eb(ob).triggerHandler("ready"), eb(ob).off("ready")))
        }
      }
    }), eb.ready.promise = function (b) {
      if (!vb)if (vb = eb.Deferred(), "complete" === ob.readyState)setTimeout(eb.ready); else if (ob.addEventListener)ob.addEventListener("DOMContentLoaded", h, !1), a.addEventListener("load", h, !1); else {
        ob.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
        var c = !1;
        try {
          c = null == a.frameElement && ob.documentElement
        } catch (d) {
        }
        c && c.doScroll && !function e() {
          if (!eb.isReady) {
            try {
              c.doScroll("left")
            } catch (a) {
              return setTimeout(e, 50)
            }
            g(), eb.ready()
          }
        }()
      }
      return vb.promise(b)
    };
    var wb, xb = "undefined";
    for (wb in eb(cb))break;
    cb.ownLast = "0" !== wb, cb.inlineBlockNeedsLayout = !1, eb(function () {
      var a, b, c, d;
      c = ob.getElementsByTagName("body")[0], c && c.style && (b = ob.createElement("div"), d = ob.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== xb && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", cb.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
    }), function () {
      var a = ob.createElement("div");
      if (null == cb.deleteExpando) {
        cb.deleteExpando = !0;
        try {
          delete a.test
        } catch (b) {
          cb.deleteExpando = !1
        }
      }
      a = null
    }(), eb.acceptData = function (a) {
      var b = eb.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1;
      return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    };
    var yb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, zb = /([A-Z])/g;
    eb.extend({
      cache: {},
      noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
      hasData: function (a) {
        return a = a.nodeType ? eb.cache[a[eb.expando]] : a[eb.expando], !!a && !j(a)
      },
      data: function (a, b, c) {
        return k(a, b, c)
      },
      removeData: function (a, b) {
        return l(a, b)
      },
      _data: function (a, b, c) {
        return k(a, b, c, !0)
      },
      _removeData: function (a, b) {
        return l(a, b, !0)
      }
    }), eb.fn.extend({
      data: function (a, b) {
        var c, d, e, f = this[0], g = f && f.attributes;
        if (void 0 === a) {
          if (this.length && (e = eb.data(f), 1 === f.nodeType && !eb._data(f, "parsedAttrs"))) {
            for (c = g.length; c--;)g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = eb.camelCase(d.slice(5)), i(f, d, e[d])));
            eb._data(f, "parsedAttrs", !0)
          }
          return e
        }
        return "object" == typeof a ? this.each(function () {
          eb.data(this, a)
        }) : arguments.length > 1 ? this.each(function () {
          eb.data(this, a, b)
        }) : f ? i(f, a, eb.data(f, a)) : void 0
      }, removeData: function (a) {
        return this.each(function () {
          eb.removeData(this, a)
        })
      }
    }), eb.extend({
      queue: function (a, b, c) {
        var d;
        return a ? (b = (b || "fx") + "queue", d = eb._data(a, b), c && (!d || eb.isArray(c) ? d = eb._data(a, b, eb.makeArray(c)) : d.push(c)), d || []) : void 0
      }, dequeue: function (a, b) {
        b = b || "fx";
        var c = eb.queue(a, b), d = c.length, e = c.shift(), f = eb._queueHooks(a, b), g = function () {
          eb.dequeue(a, b)
        };
        "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
      }, _queueHooks: function (a, b) {
        var c = b + "queueHooks";
        return eb._data(a, c) || eb._data(a, c, {
            empty: eb.Callbacks("once memory").add(function () {
              eb._removeData(a, b + "queue"), eb._removeData(a, c)
            })
          })
      }
    }), eb.fn.extend({
      queue: function (a, b) {
        var c = 2;
        return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? eb.queue(this[0], a) : void 0 === b ? this : this.each(function () {
          var c = eb.queue(this, a, b);
          eb._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && eb.dequeue(this, a)
        })
      }, dequeue: function (a) {
        return this.each(function () {
          eb.dequeue(this, a)
        })
      }, clearQueue: function (a) {
        return this.queue(a || "fx", [])
      }, promise: function (a, b) {
        var c, d = 1, e = eb.Deferred(), f = this, g = this.length, h = function () {
          --d || e.resolveWith(f, [f])
        };
        for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;)c = eb._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
        return h(), e.promise(b)
      }
    });
    var Ab = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Bb = ["Top", "Right", "Bottom", "Left"], Cb = function (a, b) {
      return a = b || a, "none" === eb.css(a, "display") || !eb.contains(a.ownerDocument, a)
    }, Db = eb.access = function (a, b, c, d, e, f, g) {
      var h = 0, i = a.length, j = null == c;
      if ("object" === eb.type(c)) {
        e = !0;
        for (h in c)eb.access(a, b, h, c[h], !0, f, g)
      } else if (void 0 !== d && (e = !0, eb.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
          return j.call(eb(a), c)
        })), b))for (; i > h; h++)b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    }, Eb = /^(?:checkbox|radio)$/i;
    !function () {
      var a = ob.createElement("input"), b = ob.createElement("div"), c = ob.createDocumentFragment();
      if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", cb.leadingWhitespace = 3 === b.firstChild.nodeType, cb.tbody = !b.getElementsByTagName("tbody").length, cb.htmlSerialize = !!b.getElementsByTagName("link").length, cb.html5Clone = "<:nav></:nav>" !== ob.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), cb.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", cb.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", cb.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, cb.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function () {
          cb.noCloneEvent = !1
        }), b.cloneNode(!0).click()), null == cb.deleteExpando) {
        cb.deleteExpando = !0;
        try {
          delete b.test
        } catch (d) {
          cb.deleteExpando = !1
        }
      }
    }(), function () {
      var b, c, d = ob.createElement("div");
      for (b in{
        submit: !0,
        change: !0,
        focusin: !0
      })c = "on" + b, (cb[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), cb[b + "Bubbles"] = d.attributes[c].expando === !1);
      d = null
    }();
    var Fb = /^(?:input|select|textarea)$/i, Gb = /^key/, Hb = /^(?:mouse|pointer|contextmenu)|click/, Ib = /^(?:focusinfocus|focusoutblur)$/, Jb = /^([^.]*)(?:\.(.+)|)$/;
    eb.event = {
      global: {},
      add: function (a, b, c, d, e) {
        var f, g, h, i, j, k, l, m, n, o, p, q = eb._data(a);
        if (q) {
          for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = eb.guid++), (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function (a) {
            return typeof eb === xb || a && eb.event.triggered === a.type ? void 0 : eb.event.dispatch.apply(k.elem, arguments)
          }, k.elem = a), b = (b || "").match(tb) || [""], h = b.length; h--;)f = Jb.exec(b[h]) || [], n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = eb.event.special[n] || {}, n = (e ? j.delegateType : j.bindType) || n, j = eb.event.special[n] || {}, l = eb.extend({
            type: n,
            origType: p,
            data: d,
            handler: c,
            guid: c.guid,
            selector: e,
            needsContext: e && eb.expr.match.needsContext.test(e),
            namespace: o.join(".")
          }, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), eb.event.global[n] = !0);
          a = null
        }
      },
      remove: function (a, b, c, d, e) {
        var f, g, h, i, j, k, l, m, n, o, p, q = eb.hasData(a) && eb._data(a);
        if (q && (k = q.events)) {
          for (b = (b || "").match(tb) || [""], j = b.length; j--;)if (h = Jb.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
            for (l = eb.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;)g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
            i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || eb.removeEvent(a, n, q.handle), delete k[n])
          } else for (n in k)eb.event.remove(a, n + b[j], c, d, !0);
          eb.isEmptyObject(k) && (delete q.handle, eb._removeData(a, "events"))
        }
      },
      trigger: function (b, c, d, e) {
        var f, g, h, i, j, k, l, m = [d || ob], n = bb.call(b, "type") ? b.type : b, o = bb.call(b, "namespace") ? b.namespace.split(".") : [];
        if (h = k = d = d || ob, 3 !== d.nodeType && 8 !== d.nodeType && !Ib.test(n + eb.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, b = b[eb.expando] ? b : new eb.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : eb.makeArray(c, [b]), j = eb.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
          if (!e && !j.noBubble && !eb.isWindow(d)) {
            for (i = j.delegateType || n, Ib.test(i + n) || (h = h.parentNode); h; h = h.parentNode)m.push(h), k = h;
            k === (d.ownerDocument || ob) && m.push(k.defaultView || k.parentWindow || a)
          }
          for (l = 0; (h = m[l++]) && !b.isPropagationStopped();)b.type = l > 1 ? i : j.bindType || n, f = (eb._data(h, "events") || {})[b.type] && eb._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && eb.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
          if (b.type = n, !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && eb.acceptData(d) && g && d[n] && !eb.isWindow(d)) {
            k = d[g], k && (d[g] = null), eb.event.triggered = n;
            try {
              d[n]()
            } catch (p) {
            }
            eb.event.triggered = void 0, k && (d[g] = k)
          }
          return b.result
        }
      },
      dispatch: function (a) {
        a = eb.event.fix(a);
        var b, c, d, e, f, g = [], h = X.call(arguments), i = (eb._data(this, "events") || {})[a.type] || [], j = eb.event.special[a.type] || {};
        if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
          for (g = eb.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped();)for (a.currentTarget = e.elem, f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(d.namespace)) && (a.handleObj = d, a.data = d.data, c = ((eb.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
          return j.postDispatch && j.postDispatch.call(this, a), a.result
        }
      },
      handlers: function (a, b) {
        var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
        if (h && i.nodeType && (!a.button || "click" !== a.type))for (; i != this; i = i.parentNode || this)if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
          for (e = [], f = 0; h > f; f++)d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? eb(c, this).index(i) >= 0 : eb.find(c, this, null, [i]).length), e[c] && e.push(d);
          e.length && g.push({elem: i, handlers: e})
        }
        return h < b.length && g.push({elem: this, handlers: b.slice(h)}), g
      },
      fix: function (a) {
        if (a[eb.expando])return a;
        var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
        for (g || (this.fixHooks[e] = g = Hb.test(e) ? this.mouseHooks : Gb.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new eb.Event(f), b = d.length; b--;)c = d[b], a[c] = f[c];
        return a.target || (a.target = f.srcElement || ob), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
      },
      props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split(" "), filter: function (a, b) {
          return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
        }
      },
      mouseHooks: {
        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
        filter: function (a, b) {
          var c, d, e, f = b.button, g = b.fromElement;
          return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || ob, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
        }
      },
      special: {
        load: {noBubble: !0}, focus: {
          trigger: function () {
            if (this !== o() && this.focus)try {
              return this.focus(), !1
            } catch (a) {
            }
          }, delegateType: "focusin"
        }, blur: {
          trigger: function () {
            return this === o() && this.blur ? (this.blur(), !1) : void 0
          }, delegateType: "focusout"
        }, click: {
          trigger: function () {
            return eb.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
          }, _default: function (a) {
            return eb.nodeName(a.target, "a")
          }
        }, beforeunload: {
          postDispatch: function (a) {
            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
          }
        }
      },
      simulate: function (a, b, c, d) {
        var e = eb.extend(new eb.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
        d ? eb.event.trigger(e, null, b) : eb.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
      }
    }, eb.removeEvent = ob.removeEventListener ? function (a, b, c) {
      a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
      var d = "on" + b;
      a.detachEvent && (typeof a[d] === xb && (a[d] = null), a.detachEvent(d, c))
    }, eb.Event = function (a, b) {
      return this instanceof eb.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? m : n) : this.type = a, b && eb.extend(this, b), this.timeStamp = a && a.timeStamp || eb.now(), void(this[eb.expando] = !0)) : new eb.Event(a, b)
    }, eb.Event.prototype = {
      isDefaultPrevented: n,
      isPropagationStopped: n,
      isImmediatePropagationStopped: n,
      preventDefault: function () {
        var a = this.originalEvent;
        this.isDefaultPrevented = m, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
      },
      stopPropagation: function () {
        var a = this.originalEvent;
        this.isPropagationStopped = m, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
      },
      stopImmediatePropagation: function () {
        var a = this.originalEvent;
        this.isImmediatePropagationStopped = m, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
      }
    }, eb.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    }, function (a, b) {
      eb.event.special[a] = {
        delegateType: b, bindType: b, handle: function (a) {
          var c, d = this, e = a.relatedTarget, f = a.handleObj;
          return (!e || e !== d && !eb.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
        }
      }
    }), cb.submitBubbles || (eb.event.special.submit = {
      setup: function () {
        return eb.nodeName(this, "form") ? !1 : void eb.event.add(this, "click._submit keypress._submit", function (a) {
          var b = a.target, c = eb.nodeName(b, "input") || eb.nodeName(b, "button") ? b.form : void 0;
          c && !eb._data(c, "submitBubbles") && (eb.event.add(c, "submit._submit", function (a) {
            a._submit_bubble = !0
          }), eb._data(c, "submitBubbles", !0))
        })
      }, postDispatch: function (a) {
        a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && eb.event.simulate("submit", this.parentNode, a, !0))
      }, teardown: function () {
        return eb.nodeName(this, "form") ? !1 : void eb.event.remove(this, "._submit")
      }
    }), cb.changeBubbles || (eb.event.special.change = {
      setup: function () {
        return Fb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (eb.event.add(this, "propertychange._change", function (a) {
          "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
        }), eb.event.add(this, "click._change", function (a) {
          this._just_changed && !a.isTrigger && (this._just_changed = !1), eb.event.simulate("change", this, a, !0)
        })), !1) : void eb.event.add(this, "beforeactivate._change", function (a) {
          var b = a.target;
          Fb.test(b.nodeName) && !eb._data(b, "changeBubbles") && (eb.event.add(b, "change._change", function (a) {
            !this.parentNode || a.isSimulated || a.isTrigger || eb.event.simulate("change", this.parentNode, a, !0)
          }), eb._data(b, "changeBubbles", !0))
        })
      }, handle: function (a) {
        var b = a.target;
        return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
      }, teardown: function () {
        return eb.event.remove(this, "._change"), !Fb.test(this.nodeName)
      }
    }), cb.focusinBubbles || eb.each({focus: "focusin", blur: "focusout"}, function (a, b) {
      var c = function (a) {
        eb.event.simulate(b, a.target, eb.event.fix(a), !0)
      };
      eb.event.special[b] = {
        setup: function () {
          var d = this.ownerDocument || this, e = eb._data(d, b);
          e || d.addEventListener(a, c, !0), eb._data(d, b, (e || 0) + 1)
        }, teardown: function () {
          var d = this.ownerDocument || this, e = eb._data(d, b) - 1;
          e ? eb._data(d, b, e) : (d.removeEventListener(a, c, !0), eb._removeData(d, b))
        }
      }
    }), eb.fn.extend({
      on: function (a, b, c, d, e) {
        var f, g;
        if ("object" == typeof a) {
          "string" != typeof b && (c = c || b, b = void 0);
          for (f in a)this.on(f, b, c, a[f], e);
          return this
        }
        if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)d = n; else if (!d)return this;
        return 1 === e && (g = d, d = function (a) {
          return eb().off(a), g.apply(this, arguments)
        }, d.guid = g.guid || (g.guid = eb.guid++)), this.each(function () {
          eb.event.add(this, a, d, c, b)
        })
      }, one: function (a, b, c, d) {
        return this.on(a, b, c, d, 1)
      }, off: function (a, b, c) {
        var d, e;
        if (a && a.preventDefault && a.handleObj)return d = a.handleObj, eb(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
        if ("object" == typeof a) {
          for (e in a)this.off(e, b, a[e]);
          return this
        }
        return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = n), this.each(function () {
          eb.event.remove(this, a, c, b)
        })
      }, trigger: function (a, b) {
        return this.each(function () {
          eb.event.trigger(a, b, this)
        })
      }, triggerHandler: function (a, b) {
        var c = this[0];
        return c ? eb.event.trigger(a, b, c, !0) : void 0
      }
    });
    var Kb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Lb = / jQuery\d+="(?:null|\d+)"/g, Mb = new RegExp("<(?:" + Kb + ")[\\s/>]", "i"), Nb = /^\s+/, Ob = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Pb = /<([\w:]+)/, Qb = /<tbody/i, Rb = /<|&#?\w+;/, Sb = /<(?:script|style|link)/i, Tb = /checked\s*(?:[^=]|=\s*.checked.)/i, Ub = /^$|\/(?:java|ecma)script/i, Vb = /^true\/(.*)/, Wb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Xb = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: cb.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }, Yb = p(ob), Zb = Yb.appendChild(ob.createElement("div"));
    Xb.optgroup = Xb.option, Xb.tbody = Xb.tfoot = Xb.colgroup = Xb.caption = Xb.thead, Xb.th = Xb.td, eb.extend({
      clone: function (a, b, c) {
        var d, e, f, g, h, i = eb.contains(a.ownerDocument, a);
        if (cb.html5Clone || eb.isXMLDoc(a) || !Mb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Zb.innerHTML = a.outerHTML, Zb.removeChild(f = Zb.firstChild)), !(cb.noCloneEvent && cb.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || eb.isXMLDoc(a)))for (d = q(f), h = q(a), g = 0; null != (e = h[g]); ++g)d[g] && x(e, d[g]);
        if (b)if (c)for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++)w(e, d[g]); else w(a, f);
        return d = q(f, "script"), d.length > 0 && v(d, !i && q(a, "script")), d = h = e = null, f
      }, buildFragment: function (a, b, c, d) {
        for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++)if (f = a[o], f || 0 === f)if ("object" === eb.type(f))eb.merge(n, f.nodeType ? [f] : f); else if (Rb.test(f)) {
          for (h = h || m.appendChild(b.createElement("div")), i = (Pb.exec(f) || ["", ""])[1].toLowerCase(), k = Xb[i] || Xb._default, h.innerHTML = k[1] + f.replace(Ob, "<$1></$2>") + k[2], e = k[0]; e--;)h = h.lastChild;
          if (!cb.leadingWhitespace && Nb.test(f) && n.push(b.createTextNode(Nb.exec(f)[0])), !cb.tbody)for (f = "table" !== i || Qb.test(f) ? "<table>" !== k[1] || Qb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;)eb.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
          for (eb.merge(n, h.childNodes), h.textContent = ""; h.firstChild;)h.removeChild(h.firstChild);
          h = m.lastChild
        } else n.push(b.createTextNode(f));
        for (h && m.removeChild(h), cb.appendChecked || eb.grep(q(n, "input"), r), o = 0; f = n[o++];)if ((!d || -1 === eb.inArray(f, d)) && (g = eb.contains(f.ownerDocument, f), h = q(m.appendChild(f), "script"), g && v(h), c))for (e = 0; f = h[e++];)Ub.test(f.type || "") && c.push(f);
        return h = null, m
      }, cleanData: function (a, b) {
        for (var c, d, e, f, g = 0, h = eb.expando, i = eb.cache, j = cb.deleteExpando, k = eb.event.special; null != (c = a[g]); g++)if ((b || eb.acceptData(c)) && (e = c[h], f = e && i[e])) {
          if (f.events)for (d in f.events)k[d] ? eb.event.remove(c, d) : eb.removeEvent(c, d, f.handle);
          i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== xb ? c.removeAttribute(h) : c[h] = null, W.push(e))
        }
      }
    }), eb.fn.extend({
      text: function (a) {
        return Db(this, function (a) {
          return void 0 === a ? eb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ob).createTextNode(a))
        }, null, a, arguments.length)
      }, append: function () {
        return this.domManip(arguments, function (a) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var b = s(this, a);
            b.appendChild(a)
          }
        })
      }, prepend: function () {
        return this.domManip(arguments, function (a) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var b = s(this, a);
            b.insertBefore(a, b.firstChild)
          }
        })
      }, before: function () {
        return this.domManip(arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this)
        })
      }, after: function () {
        return this.domManip(arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
        })
      }, remove: function (a, b) {
        for (var c, d = a ? eb.filter(a, this) : this, e = 0; null != (c = d[e]); e++)b || 1 !== c.nodeType || eb.cleanData(q(c)), c.parentNode && (b && eb.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c));
        return this
      }, empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++) {
          for (1 === a.nodeType && eb.cleanData(q(a, !1)); a.firstChild;)a.removeChild(a.firstChild);
          a.options && eb.nodeName(a, "select") && (a.options.length = 0)
        }
        return this
      }, clone: function (a, b) {
        return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
          return eb.clone(this, a, b)
        })
      }, html: function (a) {
        return Db(this, function (a) {
          var b = this[0] || {}, c = 0, d = this.length;
          if (void 0 === a)return 1 === b.nodeType ? b.innerHTML.replace(Lb, "") : void 0;
          if (!("string" != typeof a || Sb.test(a) || !cb.htmlSerialize && Mb.test(a) || !cb.leadingWhitespace && Nb.test(a) || Xb[(Pb.exec(a) || ["", ""])[1].toLowerCase()])) {
            a = a.replace(Ob, "<$1></$2>");
            try {
              for (; d > c; c++)b = this[c] || {}, 1 === b.nodeType && (eb.cleanData(q(b, !1)), b.innerHTML = a);
              b = 0
            } catch (e) {
            }
          }
          b && this.empty().append(a)
        }, null, a, arguments.length)
      }, replaceWith: function () {
        var a = arguments[0];
        return this.domManip(arguments, function (b) {
          a = this.parentNode, eb.cleanData(q(this)), a && a.replaceChild(b, this)
        }), a && (a.length || a.nodeType) ? this : this.remove()
      }, detach: function (a) {
        return this.remove(a, !0)
      }, domManip: function (a, b) {
        a = Y.apply([], a);
        var c, d, e, f, g, h, i = 0, j = this.length, k = this, l = j - 1, m = a[0], n = eb.isFunction(m);
        if (n || j > 1 && "string" == typeof m && !cb.checkClone && Tb.test(m))return this.each(function (c) {
          var d = k.eq(c);
          n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
        });
        if (j && (h = eb.buildFragment(a, this[0].ownerDocument, !1, this), c = h.firstChild, 1 === h.childNodes.length && (h = c), c)) {
          for (f = eb.map(q(h, "script"), t), e = f.length; j > i; i++)d = h, i !== l && (d = eb.clone(d, !0, !0), e && eb.merge(f, q(d, "script"))), b.call(this[i], d, i);
          if (e)for (g = f[f.length - 1].ownerDocument, eb.map(f, u), i = 0; e > i; i++)d = f[i], Ub.test(d.type || "") && !eb._data(d, "globalEval") && eb.contains(g, d) && (d.src ? eb._evalUrl && eb._evalUrl(d.src) : eb.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Wb, "")));
          h = c = null
        }
        return this
      }
    }), eb.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function (a, b) {
      eb.fn[a] = function (a) {
        for (var c, d = 0, e = [], f = eb(a), g = f.length - 1; g >= d; d++)c = d === g ? this : this.clone(!0), eb(f[d])[b](c), Z.apply(e, c.get());
        return this.pushStack(e)
      }
    });
    var $b, _b = {};
    !function () {
      var a;
      cb.shrinkWrapBlocks = function () {
        if (null != a)return a;
        a = !1;
        var b, c, d;
        return c = ob.getElementsByTagName("body")[0], c && c.style ? (b = ob.createElement("div"), d = ob.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== xb && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(ob.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
      }
    }();
    var ac, bc, cc = /^margin/, dc = new RegExp("^(" + Ab + ")(?!px)[a-z%]+$", "i"), ec = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (ac = function (a) {
      return a.ownerDocument.defaultView.getComputedStyle(a, null)
    }, bc = function (a, b, c) {
      var d, e, f, g, h = a.style;
      return c = c || ac(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || eb.contains(a.ownerDocument, a) || (g = eb.style(a, b)), dc.test(g) && cc.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
    }) : ob.documentElement.currentStyle && (ac = function (a) {
      return a.currentStyle
    }, bc = function (a, b, c) {
      var d, e, f, g, h = a.style;
      return c = c || ac(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), dc.test(g) && !ec.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
    }), function () {
      function b() {
        var b, c, d, e;
        c = ob.getElementsByTagName("body")[0], c && c.style && (b = ob.createElement("div"), d = ob.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f = g = !1, i = !0, a.getComputedStyle && (f = "1%" !== (a.getComputedStyle(b, null) || {}).top, g = "4px" === (a.getComputedStyle(b, null) || {width: "4px"}).width, e = b.appendChild(ob.createElement("div")), e.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", b.style.width = "1px", i = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = b.getElementsByTagName("td"), e[0].style.cssText = "margin:0;border:0;padding:0;display:none", h = 0 === e[0].offsetHeight, h && (e[0].style.display = "", e[1].style.display = "none", h = 0 === e[0].offsetHeight), c.removeChild(d))
      }

      var c, d, e, f, g, h, i;
      c = ob.createElement("div"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = c.getElementsByTagName("a")[0], d = e && e.style, d && (d.cssText = "float:left;opacity:.5", cb.opacity = "0.5" === d.opacity, cb.cssFloat = !!d.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", cb.clearCloneStyle = "content-box" === c.style.backgroundClip, cb.boxSizing = "" === d.boxSizing || "" === d.MozBoxSizing || "" === d.WebkitBoxSizing, eb.extend(cb, {
        reliableHiddenOffsets: function () {
          return null == h && b(), h
        }, boxSizingReliable: function () {
          return null == g && b(), g
        }, pixelPosition: function () {
          return null == f && b(), f
        }, reliableMarginRight: function () {
          return null == i && b(), i
        }
      }))
    }(), eb.swap = function (a, b, c, d) {
      var e, f, g = {};
      for (f in b)g[f] = a.style[f], a.style[f] = b[f];
      e = c.apply(a, d || []);
      for (f in b)a.style[f] = g[f];
      return e
    };
    var fc = /alpha\([^)]*\)/i, gc = /opacity\s*=\s*([^)]*)/, hc = /^(none|table(?!-c[ea]).+)/, ic = new RegExp("^(" + Ab + ")(.*)$", "i"), jc = new RegExp("^([+-])=(" + Ab + ")", "i"), kc = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    }, lc = {letterSpacing: "0", fontWeight: "400"}, mc = ["Webkit", "O", "Moz", "ms"];
    eb.extend({
      cssHooks: {
        opacity: {
          get: function (a, b) {
            if (b) {
              var c = bc(a, "opacity");
              return "" === c ? "1" : c
            }
          }
        }
      },
      cssNumber: {
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
      },
      cssProps: {"float": cb.cssFloat ? "cssFloat" : "styleFloat"},
      style: function (a, b, c, d) {
        if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
          var e, f, g, h = eb.camelCase(b), i = a.style;
          if (b = eb.cssProps[h] || (eb.cssProps[h] = B(i, h)), g = eb.cssHooks[b] || eb.cssHooks[h], void 0 === c)return g && "get"in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
          if (f = typeof c, "string" === f && (e = jc.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(eb.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || eb.cssNumber[h] || (c += "px"), cb.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set"in g && void 0 === (c = g.set(a, c, d)))))try {
            i[b] = c
          } catch (j) {
          }
        }
      },
      css: function (a, b, c, d) {
        var e, f, g, h = eb.camelCase(b);
        return b = eb.cssProps[h] || (eb.cssProps[h] = B(a.style, h)), g = eb.cssHooks[b] || eb.cssHooks[h], g && "get"in g && (f = g.get(a, !0, c)), void 0 === f && (f = bc(a, b, d)), "normal" === f && b in lc && (f = lc[b]), "" === c || c ? (e = parseFloat(f), c === !0 || eb.isNumeric(e) ? e || 0 : f) : f
      }
    }), eb.each(["height", "width"], function (a, b) {
      eb.cssHooks[b] = {
        get: function (a, c, d) {
          return c ? hc.test(eb.css(a, "display")) && 0 === a.offsetWidth ? eb.swap(a, kc, function () {
            return F(a, b, d)
          }) : F(a, b, d) : void 0
        }, set: function (a, c, d) {
          var e = d && ac(a);
          return D(a, c, d ? E(a, b, d, cb.boxSizing && "border-box" === eb.css(a, "boxSizing", !1, e), e) : 0)
        }
      }
    }), cb.opacity || (eb.cssHooks.opacity = {
      get: function (a, b) {
        return gc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
      }, set: function (a, b) {
        var c = a.style, d = a.currentStyle, e = eb.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
        c.zoom = 1, (b >= 1 || "" === b) && "" === eb.trim(f.replace(fc, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = fc.test(f) ? f.replace(fc, e) : f + " " + e)
      }
    }), eb.cssHooks.marginRight = A(cb.reliableMarginRight, function (a, b) {
      return b ? eb.swap(a, {display: "inline-block"}, bc, [a, "marginRight"]) : void 0
    }), eb.each({margin: "", padding: "", border: "Width"}, function (a, b) {
      eb.cssHooks[a + b] = {
        expand: function (c) {
          for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)e[a + Bb[d] + b] = f[d] || f[d - 2] || f[0];
          return e
        }
      }, cc.test(a) || (eb.cssHooks[a + b].set = D)
    }), eb.fn.extend({
      css: function (a, b) {
        return Db(this, function (a, b, c) {
          var d, e, f = {}, g = 0;
          if (eb.isArray(b)) {
            for (d = ac(a), e = b.length; e > g; g++)f[b[g]] = eb.css(a, b[g], !1, d);
            return f
          }
          return void 0 !== c ? eb.style(a, b, c) : eb.css(a, b)
        }, a, b, arguments.length > 1)
      }, show: function () {
        return C(this, !0)
      }, hide: function () {
        return C(this)
      }, toggle: function (a) {
        return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
          Cb(this) ? eb(this).show() : eb(this).hide()
        })
      }
    }), eb.Tween = G, G.prototype = {
      constructor: G, init: function (a, b, c, d, e, f) {
        this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (eb.cssNumber[c] ? "" : "px")
      }, cur: function () {
        var a = G.propHooks[this.prop];
        return a && a.get ? a.get(this) : G.propHooks._default.get(this)
      }, run: function (a) {
        var b, c = G.propHooks[this.prop];
        return this.pos = b = this.options.duration ? eb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : G.propHooks._default.set(this), this
      }
    }, G.prototype.init.prototype = G.prototype, G.propHooks = {
      _default: {
        get: function (a) {
          var b;
          return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = eb.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
        }, set: function (a) {
          eb.fx.step[a.prop] ? eb.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[eb.cssProps[a.prop]] || eb.cssHooks[a.prop]) ? eb.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
        }
      }
    }, G.propHooks.scrollTop = G.propHooks.scrollLeft = {
      set: function (a) {
        a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
      }
    }, eb.easing = {
      linear: function (a) {
        return a
      }, swing: function (a) {
        return .5 - Math.cos(a * Math.PI) / 2
      }
    }, eb.fx = G.prototype.init, eb.fx.step = {};
    var nc, oc, pc = /^(?:toggle|show|hide)$/, qc = new RegExp("^(?:([+-])=|)(" + Ab + ")([a-z%]*)$", "i"), rc = /queueHooks$/, sc = [K], tc = {
      "*": [function (a, b) {
        var c = this.createTween(a, b), d = c.cur(), e = qc.exec(b), f = e && e[3] || (eb.cssNumber[a] ? "" : "px"), g = (eb.cssNumber[a] || "px" !== f && +d) && qc.exec(eb.css(c.elem, a)), h = 1, i = 20;
        if (g && g[3] !== f) {
          f = f || g[3], e = e || [], g = +d || 1;
          do h = h || ".5", g /= h, eb.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
        }
        return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
      }]
    };
    eb.Animation = eb.extend(M, {
      tweener: function (a, b) {
        eb.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
        for (var c, d = 0, e = a.length; e > d; d++)c = a[d], tc[c] = tc[c] || [], tc[c].unshift(b)
      }, prefilter: function (a, b) {
        b ? sc.unshift(a) : sc.push(a)
      }
    }), eb.speed = function (a, b, c) {
      var d = a && "object" == typeof a ? eb.extend({}, a) : {
        complete: c || !c && b || eb.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !eb.isFunction(b) && b
      };
      return d.duration = eb.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in eb.fx.speeds ? eb.fx.speeds[d.duration] : eb.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
        eb.isFunction(d.old) && d.old.call(this), d.queue && eb.dequeue(this, d.queue)
      }, d
    }, eb.fn.extend({
      fadeTo: function (a, b, c, d) {
        return this.filter(Cb).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
      }, animate: function (a, b, c, d) {
        var e = eb.isEmptyObject(a), f = eb.speed(b, c, d), g = function () {
          var b = M(this, eb.extend({}, a), f);
          (e || eb._data(this, "finish")) && b.stop(!0)
        };
        return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
      }, stop: function (a, b, c) {
        var d = function (a) {
          var b = a.stop;
          delete a.stop, b(c)
        };
        return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
          var b = !0, e = null != a && a + "queueHooks", f = eb.timers, g = eb._data(this);
          if (e)g[e] && g[e].stop && d(g[e]); else for (e in g)g[e] && g[e].stop && rc.test(e) && d(g[e]);
          for (e = f.length; e--;)f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
          (b || !c) && eb.dequeue(this, a)
        })
      }, finish: function (a) {
        return a !== !1 && (a = a || "fx"), this.each(function () {
          var b, c = eb._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = eb.timers, g = d ? d.length : 0;
          for (c.finish = !0, eb.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
          for (b = 0; g > b; b++)d[b] && d[b].finish && d[b].finish.call(this);
          delete c.finish
        })
      }
    }), eb.each(["toggle", "show", "hide"], function (a, b) {
      var c = eb.fn[b];
      eb.fn[b] = function (a, d, e) {
        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e)
      }
    }), eb.each({
      slideDown: I("show"),
      slideUp: I("hide"),
      slideToggle: I("toggle"),
      fadeIn: {opacity: "show"},
      fadeOut: {opacity: "hide"},
      fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
      eb.fn[a] = function (a, c, d) {
        return this.animate(b, a, c, d)
      }
    }), eb.timers = [], eb.fx.tick = function () {
      var a, b = eb.timers, c = 0;
      for (nc = eb.now(); c < b.length; c++)a = b[c], a() || b[c] !== a || b.splice(c--, 1);
      b.length || eb.fx.stop(), nc = void 0
    }, eb.fx.timer = function (a) {
      eb.timers.push(a), a() ? eb.fx.start() : eb.timers.pop()
    }, eb.fx.interval = 13, eb.fx.start = function () {
      oc || (oc = setInterval(eb.fx.tick, eb.fx.interval))
    }, eb.fx.stop = function () {
      clearInterval(oc), oc = null
    }, eb.fx.speeds = {slow: 600, fast: 200, _default: 400}, eb.fn.delay = function (a, b) {
      return a = eb.fx ? eb.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
        var d = setTimeout(b, a);
        c.stop = function () {
          clearTimeout(d)
        }
      })
    }, function () {
      var a, b, c, d, e;
      b = ob.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = ob.createElement("select"), e = c.appendChild(ob.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", cb.getSetAttribute = "t" !== b.className, cb.style = /top/.test(d.getAttribute("style")), cb.hrefNormalized = "/a" === d.getAttribute("href"), cb.checkOn = !!a.value, cb.optSelected = e.selected, cb.enctype = !!ob.createElement("form").enctype, c.disabled = !0, cb.optDisabled = !e.disabled, a = ob.createElement("input"), a.setAttribute("value", ""), cb.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), cb.radioValue = "t" === a.value
    }();
    var uc = /\r/g;
    eb.fn.extend({
      val: function (a) {
        var b, c, d, e = this[0];
        {
          if (arguments.length)return d = eb.isFunction(a), this.each(function (c) {
            var e;
            1 === this.nodeType && (e = d ? a.call(this, c, eb(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : eb.isArray(e) && (e = eb.map(e, function (a) {
              return null == a ? "" : a + ""
            })), b = eb.valHooks[this.type] || eb.valHooks[this.nodeName.toLowerCase()], b && "set"in b && void 0 !== b.set(this, e, "value") || (this.value = e))
          });
          if (e)return b = eb.valHooks[e.type] || eb.valHooks[e.nodeName.toLowerCase()], b && "get"in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(uc, "") : null == c ? "" : c)
        }
      }
    }), eb.extend({
      valHooks: {
        option: {
          get: function (a) {
            var b = eb.find.attr(a, "value");
            return null != b ? b : eb.trim(eb.text(a))
          }
        }, select: {
          get: function (a) {
            for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)if (c = d[i], !(!c.selected && i !== e || (cb.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && eb.nodeName(c.parentNode, "optgroup"))) {
              if (b = eb(c).val(), f)return b;
              g.push(b)
            }
            return g
          }, set: function (a, b) {
            for (var c, d, e = a.options, f = eb.makeArray(b), g = e.length; g--;)if (d = e[g], eb.inArray(eb.valHooks.option.get(d), f) >= 0)try {
              d.selected = c = !0
            } catch (h) {
              d.scrollHeight
            } else d.selected = !1;
            return c || (a.selectedIndex = -1), e
          }
        }
      }
    }), eb.each(["radio", "checkbox"], function () {
      eb.valHooks[this] = {
        set: function (a, b) {
          return eb.isArray(b) ? a.checked = eb.inArray(eb(a).val(), b) >= 0 : void 0
        }
      }, cb.checkOn || (eb.valHooks[this].get = function (a) {
        return null === a.getAttribute("value") ? "on" : a.value
      })
    });
    var vc, wc, xc = eb.expr.attrHandle, yc = /^(?:checked|selected)$/i, zc = cb.getSetAttribute, Ac = cb.input;
    eb.fn.extend({
      attr: function (a, b) {
        return Db(this, eb.attr, a, b, arguments.length > 1)
      }, removeAttr: function (a) {
        return this.each(function () {
          eb.removeAttr(this, a)
        })
      }
    }), eb.extend({
      attr: function (a, b, c) {
        var d, e, f = a.nodeType;
        if (a && 3 !== f && 8 !== f && 2 !== f)return typeof a.getAttribute === xb ? eb.prop(a, b, c) : (1 === f && eb.isXMLDoc(a) || (b = b.toLowerCase(), d = eb.attrHooks[b] || (eb.expr.match.bool.test(b) ? wc : vc)), void 0 === c ? d && "get"in d && null !== (e = d.get(a, b)) ? e : (e = eb.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set"in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void eb.removeAttr(a, b))
      }, removeAttr: function (a, b) {
        var c, d, e = 0, f = b && b.match(tb);
        if (f && 1 === a.nodeType)for (; c = f[e++];)d = eb.propFix[c] || c, eb.expr.match.bool.test(c) ? Ac && zc || !yc.test(c) ? a[d] = !1 : a[eb.camelCase("default-" + c)] = a[d] = !1 : eb.attr(a, c, ""), a.removeAttribute(zc ? c : d)
      }, attrHooks: {
        type: {
          set: function (a, b) {
            if (!cb.radioValue && "radio" === b && eb.nodeName(a, "input")) {
              var c = a.value;
              return a.setAttribute("type", b), c && (a.value = c), b
            }
          }
        }
      }
    }), wc = {
      set: function (a, b, c) {
        return b === !1 ? eb.removeAttr(a, c) : Ac && zc || !yc.test(c) ? a.setAttribute(!zc && eb.propFix[c] || c, c) : a[eb.camelCase("default-" + c)] = a[c] = !0, c
      }
    }, eb.each(eb.expr.match.bool.source.match(/\w+/g), function (a, b) {
      var c = xc[b] || eb.find.attr;
      xc[b] = Ac && zc || !yc.test(b) ? function (a, b, d) {
        var e, f;
        return d || (f = xc[b], xc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, xc[b] = f), e
      } : function (a, b, c) {
        return c ? void 0 : a[eb.camelCase("default-" + b)] ? b.toLowerCase() : null
      }
    }), Ac && zc || (eb.attrHooks.value = {
      set: function (a, b, c) {
        return eb.nodeName(a, "input") ? void(a.defaultValue = b) : vc && vc.set(a, b, c)
      }
    }), zc || (vc = {
      set: function (a, b, c) {
        var d = a.getAttributeNode(c);
        return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
      }
    }, xc.id = xc.name = xc.coords = function (a, b, c) {
      var d;
      return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
    }, eb.valHooks.button = {
      get: function (a, b) {
        var c = a.getAttributeNode(b);
        return c && c.specified ? c.value : void 0
      }, set: vc.set
    }, eb.attrHooks.contenteditable = {
      set: function (a, b, c) {
        vc.set(a, "" === b ? !1 : b, c)
      }
    }, eb.each(["width", "height"], function (a, b) {
      eb.attrHooks[b] = {
        set: function (a, c) {
          return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
        }
      }
    })), cb.style || (eb.attrHooks.style = {
      get: function (a) {
        return a.style.cssText || void 0
      }, set: function (a, b) {
        return a.style.cssText = b + ""
      }
    });
    var Bc = /^(?:input|select|textarea|button|object)$/i, Cc = /^(?:a|area)$/i;
    eb.fn.extend({
      prop: function (a, b) {
        return Db(this, eb.prop, a, b, arguments.length > 1)
      }, removeProp: function (a) {
        return a = eb.propFix[a] || a, this.each(function () {
          try {
            this[a] = void 0, delete this[a]
          } catch (b) {
          }
        })
      }
    }), eb.extend({
      propFix: {"for": "htmlFor", "class": "className"}, prop: function (a, b, c) {
        var d, e, f, g = a.nodeType;
        if (a && 3 !== g && 8 !== g && 2 !== g)return f = 1 !== g || !eb.isXMLDoc(a), f && (b = eb.propFix[b] || b, e = eb.propHooks[b]), void 0 !== c ? e && "set"in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get"in e && null !== (d = e.get(a, b)) ? d : a[b]
      }, propHooks: {
        tabIndex: {
          get: function (a) {
            var b = eb.find.attr(a, "tabindex");
            return b ? parseInt(b, 10) : Bc.test(a.nodeName) || Cc.test(a.nodeName) && a.href ? 0 : -1
          }
        }
      }
    }), cb.hrefNormalized || eb.each(["href", "src"], function (a, b) {
      eb.propHooks[b] = {
        get: function (a) {
          return a.getAttribute(b, 4)
        }
      }
    }), cb.optSelected || (eb.propHooks.selected = {
      get: function (a) {
        var b = a.parentNode;
        return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
      }
    }), eb.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
      eb.propFix[this.toLowerCase()] = this
    }), cb.enctype || (eb.propFix.enctype = "encoding");
    var Dc = /[\t\r\n\f]/g;
    eb.fn.extend({
      addClass: function (a) {
        var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a;
        if (eb.isFunction(a))return this.each(function (b) {
          eb(this).addClass(a.call(this, b, this.className))
        });
        if (j)for (b = (a || "").match(tb) || []; i > h; h++)if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Dc, " ") : " ")) {
          for (f = 0; e = b[f++];)d.indexOf(" " + e + " ") < 0 && (d += e + " ");
          g = eb.trim(d), c.className !== g && (c.className = g)
        }
        return this
      }, removeClass: function (a) {
        var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || "string" == typeof a && a;
        if (eb.isFunction(a))return this.each(function (b) {
          eb(this).removeClass(a.call(this, b, this.className))
        });
        if (j)for (b = (a || "").match(tb) || []; i > h; h++)if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Dc, " ") : "")) {
          for (f = 0; e = b[f++];)for (; d.indexOf(" " + e + " ") >= 0;)d = d.replace(" " + e + " ", " ");
          g = a ? eb.trim(d) : "", c.className !== g && (c.className = g)
        }
        return this
      }, toggleClass: function (a, b) {
        var c = typeof a;
        return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(eb.isFunction(a) ? function (c) {
          eb(this).toggleClass(a.call(this, c, this.className, b), b)
        } : function () {
          if ("string" === c)for (var b, d = 0, e = eb(this), f = a.match(tb) || []; b = f[d++];)e.hasClass(b) ? e.removeClass(b) : e.addClass(b); else(c === xb || "boolean" === c) && (this.className && eb._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : eb._data(this, "__className__") || "")
        })
      }, hasClass: function (a) {
        for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Dc, " ").indexOf(b) >= 0)return !0;
        return !1
      }
    }), eb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
      eb.fn[b] = function (a, c) {
        return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
      }
    }), eb.fn.extend({
      hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a)
      }, bind: function (a, b, c) {
        return this.on(a, null, b, c)
      }, unbind: function (a, b) {
        return this.off(a, null, b)
      }, delegate: function (a, b, c, d) {
        return this.on(b, a, c, d)
      }, undelegate: function (a, b, c) {
        return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
      }
    });
    var Ec = eb.now(), Fc = /\?/, Gc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    eb.parseJSON = function (b) {
      if (a.JSON && a.JSON.parse)return a.JSON.parse(b + "");
      var c, d = null, e = eb.trim(b + "");
      return e && !eb.trim(e.replace(Gc, function (a, b, e, f) {
        return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
      })) ? Function("return " + e)() : eb.error("Invalid JSON: " + b)
    }, eb.parseXML = function (b) {
      var c, d;
      if (!b || "string" != typeof b)return null;
      try {
        a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
      } catch (e) {
        c = void 0
      }
      return c && c.documentElement && !c.getElementsByTagName("parsererror").length || eb.error("Invalid XML: " + b), c
    };
    var Hc, Ic, Jc = /#.*$/, Kc = /([?&])_=[^&]*/, Lc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Mc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Nc = /^(?:GET|HEAD)$/, Oc = /^\/\//, Pc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Qc = {}, Rc = {}, Sc = "*/".concat("*");
    try {
      Ic = location.href
    } catch (Tc) {
      Ic = ob.createElement("a"), Ic.href = "", Ic = Ic.href
    }
    Hc = Pc.exec(Ic.toLowerCase()) || [], eb.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: Ic,
        type: "GET",
        isLocal: Mc.test(Hc[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": Sc,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript"
        },
        contents: {xml: /xml/, html: /html/, json: /json/},
        responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
        converters: {"* text": String, "text html": !0, "text json": eb.parseJSON, "text xml": eb.parseXML},
        flatOptions: {url: !0, context: !0}
      },
      ajaxSetup: function (a, b) {
        return b ? P(P(a, eb.ajaxSettings), b) : P(eb.ajaxSettings, a)
      },
      ajaxPrefilter: N(Qc),
      ajaxTransport: N(Rc),
      ajax: function (a, b) {
        function c(a, b, c, d) {
          var e, k, r, s, u, w = b;
          2 !== t && (t = 2, h && clearTimeout(h), j = void 0, g = d || "", v.readyState = a > 0 ? 4 : 0, e = a >= 200 && 300 > a || 304 === a, c && (s = Q(l, v, c)), s = R(l, s, v, e), e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (eb.lastModified[f] = u), u = v.getResponseHeader("etag"), u && (eb.etag[f] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, e = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", e ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [v, l, e ? k : r]), p.fireWith(m, [v, w]), i && (n.trigger("ajaxComplete", [v, l]), --eb.active || eb.event.trigger("ajaxStop")))
        }

        "object" == typeof a && (b = a, a = void 0), b = b || {};
        var d, e, f, g, h, i, j, k, l = eb.ajaxSetup({}, b), m = l.context || l, n = l.context && (m.nodeType || m.jquery) ? eb(m) : eb.event, o = eb.Deferred(), p = eb.Callbacks("once memory"), q = l.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === t) {
              if (!k)for (k = {}; b = Lc.exec(g);)k[b[1].toLowerCase()] = b[2];
              b = k[a.toLowerCase()]
            }
            return null == b ? null : b
          },
          getAllResponseHeaders: function () {
            return 2 === t ? g : null
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            return t || (a = s[c] = s[c] || a, r[a] = b), this
          },
          overrideMimeType: function (a) {
            return t || (l.mimeType = a), this
          },
          statusCode: function (a) {
            var b;
            if (a)if (2 > t)for (b in a)q[b] = [q[b], a[b]]; else v.always(a[v.status]);
            return this
          },
          abort: function (a) {
            var b = a || u;
            return j && j.abort(b), c(0, b), this
          }
        };
        if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || Ic) + "").replace(Jc, "").replace(Oc, Hc[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = eb.trim(l.dataType || "*").toLowerCase().match(tb) || [""], null == l.crossDomain && (d = Pc.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Hc[1] && d[2] === Hc[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Hc[3] || ("http:" === Hc[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = eb.param(l.data, l.traditional)), O(Qc, l, b, v), 2 === t)return v;
        i = l.global, i && 0 === eb.active++ && eb.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Nc.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fc.test(f) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Kc.test(f) ? f.replace(Kc, "$1_=" + Ec++) : f + (Fc.test(f) ? "&" : "?") + "_=" + Ec++)), l.ifModified && (eb.lastModified[f] && v.setRequestHeader("If-Modified-Since", eb.lastModified[f]), eb.etag[f] && v.setRequestHeader("If-None-Match", eb.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Sc + "; q=0.01" : "") : l.accepts["*"]);
        for (e in l.headers)v.setRequestHeader(e, l.headers[e]);
        if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t))return v.abort();
        u = "abort";
        for (e in{success: 1, error: 1, complete: 1})v[e](l[e]);
        if (j = O(Rc, l, b, v)) {
          v.readyState = 1, i && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function () {
            v.abort("timeout")
          }, l.timeout));
          try {
            t = 1, j.send(r, c)
          } catch (w) {
            if (!(2 > t))throw w;
            c(-1, w)
          }
        } else c(-1, "No Transport");
        return v
      },
      getJSON: function (a, b, c) {
        return eb.get(a, b, c, "json")
      },
      getScript: function (a, b) {
        return eb.get(a, void 0, b, "script")
      }
    }), eb.each(["get", "post"], function (a, b) {
      eb[b] = function (a, c, d, e) {
        return eb.isFunction(c) && (e = e || d, d = c, c = void 0), eb.ajax({
          url: a,
          type: b,
          dataType: e,
          data: c,
          success: d
        })
      }
    }), eb.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
      eb.fn[b] = function (a) {
        return this.on(b, a)
      }
    }), eb._evalUrl = function (a) {
      return eb.ajax({url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, eb.fn.extend({
      wrapAll: function (a) {
        if (eb.isFunction(a))return this.each(function (b) {
          eb(this).wrapAll(a.call(this, b))
        });
        if (this[0]) {
          var b = eb(a, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
            for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)a = a.firstChild;
            return a
          }).append(this)
        }
        return this
      }, wrapInner: function (a) {
        return this.each(eb.isFunction(a) ? function (b) {
          eb(this).wrapInner(a.call(this, b))
        } : function () {
          var b = eb(this), c = b.contents();
          c.length ? c.wrapAll(a) : b.append(a)
        })
      }, wrap: function (a) {
        var b = eb.isFunction(a);
        return this.each(function (c) {
          eb(this).wrapAll(b ? a.call(this, c) : a)
        })
      }, unwrap: function () {
        return this.parent().each(function () {
          eb.nodeName(this, "body") || eb(this).replaceWith(this.childNodes)
        }).end()
      }
    }), eb.expr.filters.hidden = function (a) {
      return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !cb.reliableHiddenOffsets() && "none" === (a.style && a.style.display || eb.css(a, "display"))
    }, eb.expr.filters.visible = function (a) {
      return !eb.expr.filters.hidden(a)
    };
    var Uc = /%20/g, Vc = /\[\]$/, Wc = /\r?\n/g, Xc = /^(?:submit|button|image|reset|file)$/i, Yc = /^(?:input|select|textarea|keygen)/i;
    eb.param = function (a, b) {
      var c, d = [], e = function (a, b) {
        b = eb.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
      };
      if (void 0 === b && (b = eb.ajaxSettings && eb.ajaxSettings.traditional), eb.isArray(a) || a.jquery && !eb.isPlainObject(a))eb.each(a, function () {
        e(this.name, this.value)
      }); else for (c in a)S(c, a[c], b, e);
      return d.join("&").replace(Uc, "+")
    }, eb.fn.extend({
      serialize: function () {
        return eb.param(this.serializeArray())
      }, serializeArray: function () {
        return this.map(function () {
          var a = eb.prop(this, "elements");
          return a ? eb.makeArray(a) : this
        }).filter(function () {
          var a = this.type;
          return this.name && !eb(this).is(":disabled") && Yc.test(this.nodeName) && !Xc.test(a) && (this.checked || !Eb.test(a))
        }).map(function (a, b) {
          var c = eb(this).val();
          return null == c ? null : eb.isArray(c) ? eb.map(c, function (a) {
            return {name: b.name, value: a.replace(Wc, "\r\n")}
          }) : {name: b.name, value: c.replace(Wc, "\r\n")}
        }).get()
      }
    }), eb.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
      return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T() || U()
    } : T;
    var Zc = 0, $c = {}, _c = eb.ajaxSettings.xhr();
    a.ActiveXObject && eb(a).on("unload", function () {
      for (var a in $c)$c[a](void 0, !0)
    }), cb.cors = !!_c && "withCredentials"in _c, _c = cb.ajax = !!_c, _c && eb.ajaxTransport(function (a) {
      if (!a.crossDomain || cb.cors) {
        var b;
        return {
          send: function (c, d) {
            var e, f = a.xhr(), g = ++Zc;
            if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)for (e in a.xhrFields)f[e] = a.xhrFields[e];
            a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
            for (e in c)void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
            f.send(a.hasContent && a.data || null), b = function (c, e) {
              var h, i, j;
              if (b && (e || 4 === f.readyState))if (delete $c[g], b = void 0, f.onreadystatechange = eb.noop, e)4 !== f.readyState && f.abort(); else {
                j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                try {
                  i = f.statusText
                } catch (k) {
                  i = ""
                }
                h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
              }
              j && d(h, i, j, f.getAllResponseHeaders())
            }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = $c[g] = b : b()
          }, abort: function () {
            b && b(void 0, !0)
          }
        }
      }
    }), eb.ajaxSetup({
      accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
      contents: {script: /(?:java|ecma)script/},
      converters: {
        "text script": function (a) {
          return eb.globalEval(a), a
        }
      }
    }), eb.ajaxPrefilter("script", function (a) {
      void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), eb.ajaxTransport("script", function (a) {
      if (a.crossDomain) {
        var b, c = ob.head || eb("head")[0] || ob.documentElement;
        return {
          send: function (d, e) {
            b = ob.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
              (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
            }, c.insertBefore(b, c.firstChild)
          }, abort: function () {
            b && b.onload(void 0, !0)
          }
        }
      }
    });
    var ad = [], bd = /(=)\?(?=&|$)|\?\?/;
    eb.ajaxSetup({
      jsonp: "callback", jsonpCallback: function () {
        var a = ad.pop() || eb.expando + "_" + Ec++;
        return this[a] = !0, a
      }
    }), eb.ajaxPrefilter("json jsonp", function (b, c, d) {
      var e, f, g, h = b.jsonp !== !1 && (bd.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && bd.test(b.data) && "data");
      return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = eb.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(bd, "$1" + e) : b.jsonp !== !1 && (b.url += (Fc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
        return g || eb.error(e + " was not called"), g[0]
      }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
        g = arguments
      }, d.always(function () {
        a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, ad.push(e)), g && eb.isFunction(f) && f(g[0]), g = f = void 0
      }), "script") : void 0
    }), eb.parseHTML = function (a, b, c) {
      if (!a || "string" != typeof a)return null;
      "boolean" == typeof b && (c = b, b = !1), b = b || ob;
      var d = lb.exec(a), e = !c && [];
      return d ? [b.createElement(d[1])] : (d = eb.buildFragment([a], b, e), e && e.length && eb(e).remove(), eb.merge([], d.childNodes))
    };
    var cd = eb.fn.load;
    eb.fn.load = function (a, b, c) {
      if ("string" != typeof a && cd)return cd.apply(this, arguments);
      var d, e, f, g = this, h = a.indexOf(" ");
      return h >= 0 && (d = eb.trim(a.slice(h, a.length)), a = a.slice(0, h)), eb.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && eb.ajax({
        url: a,
        type: f,
        dataType: "html",
        data: b
      }).done(function (a) {
        e = arguments, g.html(d ? eb("<div>").append(eb.parseHTML(a)).find(d) : a)
      }).complete(c && function (a, b) {
        g.each(c, e || [a.responseText, b, a])
      }), this
    }, eb.expr.filters.animated = function (a) {
      return eb.grep(eb.timers, function (b) {
        return a === b.elem
      }).length
    };
    var dd = a.document.documentElement;
    eb.offset = {
      setOffset: function (a, b, c) {
        var d, e, f, g, h, i, j, k = eb.css(a, "position"), l = eb(a), m = {};
        "static" === k && (a.style.position = "relative"), h = l.offset(), f = eb.css(a, "top"), i = eb.css(a, "left"), j = ("absolute" === k || "fixed" === k) && eb.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), eb.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using"in b ? b.using.call(a, m) : l.css(m)
      }
    }, eb.fn.extend({
      offset: function (a) {
        if (arguments.length)return void 0 === a ? this : this.each(function (b) {
          eb.offset.setOffset(this, a, b)
        });
        var b, c, d = {top: 0, left: 0}, e = this[0], f = e && e.ownerDocument;
        if (f)return b = f.documentElement, eb.contains(b, e) ? (typeof e.getBoundingClientRect !== xb && (d = e.getBoundingClientRect()), c = V(f), {
          top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
          left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
        }) : d
      }, position: function () {
        if (this[0]) {
          var a, b, c = {top: 0, left: 0}, d = this[0];
          return "fixed" === eb.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), eb.nodeName(a[0], "html") || (c = a.offset()), c.top += eb.css(a[0], "borderTopWidth", !0), c.left += eb.css(a[0], "borderLeftWidth", !0)), {
            top: b.top - c.top - eb.css(d, "marginTop", !0),
            left: b.left - c.left - eb.css(d, "marginLeft", !0)
          }
        }
      }, offsetParent: function () {
        return this.map(function () {
          for (var a = this.offsetParent || dd; a && !eb.nodeName(a, "html") && "static" === eb.css(a, "position");)a = a.offsetParent;
          return a || dd
        })
      }
    }), eb.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
      var c = /Y/.test(b);
      eb.fn[a] = function (d) {
        return Db(this, function (a, d, e) {
          var f = V(a);
          return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? eb(f).scrollLeft() : e, c ? e : eb(f).scrollTop()) : a[d] = e)
        }, a, d, arguments.length, null)
      }
    }), eb.each(["top", "left"], function (a, b) {
      eb.cssHooks[b] = A(cb.pixelPosition, function (a, c) {
        return c ? (c = bc(a, b), dc.test(c) ? eb(a).position()[b] + "px" : c) : void 0
      })
    }), eb.each({Height: "height", Width: "width"}, function (a, b) {
      eb.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, d) {
        eb.fn[d] = function (d, e) {
          var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
          return Db(this, function (b, c, d) {
            var e;
            return eb.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? eb.css(b, c, g) : eb.style(b, c, d, g)
          }, b, f ? d : void 0, f, null)
        }
      })
    }), eb.fn.size = function () {
      return this.length
    }, eb.fn.andSelf = eb.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
      return eb
    });
    var ed = a.jQuery, fd = a.$;
    return eb.noConflict = function (b) {
      return a.$ === eb && (a.$ = fd), b && a.jQuery === eb && (a.jQuery = ed), eb
    }, typeof b === xb && (a.jQuery = a.$ = eb), eb
  }), !jQuery)throw new Error("Bootstrap requires jQuery");
+function (a) {
  "use strict";
  function b() {
    var a = document.createElement("bootstrap"), b = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };
    for (var c in b)if (void 0 !== a.style[c])return {end: b[c]}
  }

  a.fn.emulateTransitionEnd = function (b) {
    var c = !1, d = this;
    a(this).one(a.support.transition.end, function () {
      c = !0
    });
    var e = function () {
      c || a(d).trigger(a.support.transition.end)
    };
    return setTimeout(e, b), this
  }, a(function () {
    a.support.transition = b()
  })
}(window.jQuery), +function (a) {
  "use strict";
  var b = '[data-dismiss="alert"]', c = function (c) {
    a(c).on("click", b, this.close)
  };
  c.prototype.close = function (b) {
    function c() {
      f.trigger("closed.bs.alert").remove()
    }

    var d = a(this), e = d.attr("data-target");
    e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
    var f = a(e);
    b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
  };
  var d = a.fn.alert;
  a.fn.alert = function (b) {
    return this.each(function () {
      var d = a(this), e = d.data("bs.alert");
      e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d)
    })
  }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () {
    return a.fn.alert = d, this
  }, a(document).on("click.bs.alert.data-api", b, c.prototype.close)
}(window.jQuery), +function (a) {
  "use strict";
  var b = function (c, d) {
    this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d)
  };
  b.DEFAULTS = {loadingText: "loading..."}, b.prototype.setState = function (a) {
    var b = "disabled", c = this.$element, d = c.is("input") ? "val" : "html", e = c.data();
    a += "Text", e.resetText || c.data("resetText", c[d]()), c[d](e[a] || this.options[a]), setTimeout(function () {
      "loadingText" == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
    }, 0)
  }, b.prototype.toggle = function () {
    var a = this.$element.closest('[data-toggle="buttons"]');
    if (a.length) {
      var b = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
      "radio" === b.prop("type") && a.find(".active").removeClass("active")
    }
    this.$element.toggleClass("active")
  };
  var c = a.fn.button;
  a.fn.button = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data("bs.button"), f = "object" == typeof c && c;
      e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
    })
  }, a.fn.button.Constructor = b, a.fn.button.noConflict = function () {
    return a.fn.button = c, this
  }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (b) {
    var c = a(b.target);
    c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault()
  })
}(window.jQuery), +function (a) {
  "use strict";
  var b = function (b, c) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
  };
  b.DEFAULTS = {interval: 5e3, pause: "hover", wrap: !0}, b.prototype.cycle = function (b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
  }, b.prototype.getActiveIndex = function () {
    return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
  }, b.prototype.to = function (b) {
    var c = this, d = this.getActiveIndex();
    return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid", function () {
      c.to(b)
    }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
  }, b.prototype.pause = function (b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
  }, b.prototype.next = function () {
    return this.sliding ? void 0 : this.slide("next")
  }, b.prototype.prev = function () {
    return this.sliding ? void 0 : this.slide("prev")
  }, b.prototype.slide = function (b, c) {
    var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval, g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this;
    if (!e.length) {
      if (!this.options.wrap)return;
      e = this.$element.find(".item")[h]()
    }
    this.sliding = !0, f && this.pause();
    var j = a.Event("slide.bs.carousel", {relatedTarget: e[0], direction: g});
    if (!e.hasClass("active")) {
      if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
          var b = a(i.$indicators.children()[i.getActiveIndex()]);
          b && b.addClass("active")
        })), a.support.transition && this.$element.hasClass("slide")) {
        if (this.$element.trigger(j), j.isDefaultPrevented())return;
        e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function () {
          e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () {
            i.$element.trigger("slid")
          }, 0)
        }).emulateTransitionEnd(600)
      } else {
        if (this.$element.trigger(j), j.isDefaultPrevented())return;
        d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
      }
      return f && this.cycle(), this
    }
  };
  var c = a.fn.carousel;
  a.fn.carousel = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c), g = "string" == typeof c ? c : f.slide;
      e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
    })
  }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () {
    return a.fn.carousel = c, this
  }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (b) {
    var c, d = a(this), e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), d.data()), g = d.attr("data-slide-to");
    g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
  }), a(window).on("load", function () {
    a('[data-ride="carousel"]').each(function () {
      var b = a(this);
      b.carousel(b.data())
    })
  })
}(window.jQuery), +function (a) {
  "use strict";
  var b = function (c, d) {
    this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
  };
  b.DEFAULTS = {toggle: !0}, b.prototype.dimension = function () {
    var a = this.$element.hasClass("width");
    return a ? "width" : "height"
  }, b.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b = a.Event("show.bs.collapse");
      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.$parent && this.$parent.find("> .panel > .in");
        if (c && c.length) {
          var d = c.data("bs.collapse");
          if (d && d.transitioning)return;
          c.collapse("hide"), d || c.data("bs.collapse", null)
        }
        var e = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
        var f = function () {
          this.$element.removeClass("collapsing").addClass("in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
        };
        if (!a.support.transition)return f.call(this);
        var g = a.camelCase(["scroll", e].join("-"));
        this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
      }
    }
  }, b.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");
      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
        var d = function () {
          this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
        };
        return a.support.transition ? void this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
      }
    }
  }, b.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]()
  };
  var c = a.fn.collapse;
  a.fn.collapse = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
      e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () {
    return a.fn.collapse = c, this
  }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (b) {
    var c, d = a(this), e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""), f = a(e), g = f.data("bs.collapse"), h = g ? "toggle" : d.data(), i = d.attr("data-parent"), j = i && a(i);
    g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h)
  })
}(window.jQuery), +function (a) {
  "use strict";
  function b() {
    a(d).remove(), a(e).each(function (b) {
      var d = c(a(this));
      d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown")), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown"))
    })
  }

  function c(b) {
    var c = b.attr("data-target");
    c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
    var d = c && a(c);
    return d && d.length ? d : b.parent()
  }

  var d = ".dropdown-backdrop", e = "[data-toggle=dropdown]", f = function (b) {
    a(b).on("click.bs.dropdown", this.toggle)
  };
  f.prototype.toggle = function (d) {
    var e = a(this);
    if (!e.is(".disabled, :disabled")) {
      var f = c(e), g = f.hasClass("open");
      if (b(), !g) {
        if ("ontouchstart"in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b), f.trigger(d = a.Event("show.bs.dropdown")), d.isDefaultPrevented())return;
        f.toggleClass("open").trigger("shown.bs.dropdown"), e.focus()
      }
      return !1
    }
  }, f.prototype.keydown = function (b) {
    if (/(38|40|27)/.test(b.keyCode)) {
      var d = a(this);
      if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
        var f = c(d), g = f.hasClass("open");
        if (!g || g && 27 == b.keyCode)return 27 == b.which && f.find(e).focus(), d.click();
        var h = a("[role=menu] li:not(.divider):visible a", f);
        if (h.length) {
          var i = h.index(h.filter(":focus"));
          38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < h.length - 1 && i++, ~i || (i = 0), h.eq(i).focus()
        }
      }
    }
  };
  var g = a.fn.dropdown;
  a.fn.dropdown = function (b) {
    return this.each(function () {
      var c = a(this), d = c.data("dropdown");
      d || c.data("dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
    })
  }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function () {
    return a.fn.dropdown = g, this
  }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
    a.stopPropagation()
  }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown)
}(window.jQuery), +function (a) {
  "use strict";
  var b = function (b, c) {
    this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
  };
  b.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0}, b.prototype.toggle = function (a) {
    return this[this.isShown ? "hide" : "show"](a)
  }, b.prototype.show = function (b) {
    var c = this, d = a.Event("show.bs.modal", {relatedTarget: b});
    this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
      var d = a.support.transition && c.$element.hasClass("fade");
      c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
      var e = a.Event("shown.bs.modal", {relatedTarget: b});
      d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function () {
        c.$element.focus().trigger(e)
      }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
    }))
  }, b.prototype.hide = function (b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
  }, b.prototype.enforceFocus = function () {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
      this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
    }, this))
  }, b.prototype.escape = function () {
    this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
      27 == a.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
  }, b.prototype.hideModal = function () {
    var a = this;
    this.$element.hide(), this.backdrop(function () {
      a.removeBackdrop(), a.$element.trigger("hidden.bs.modal")
    })
  }, b.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
  }, b.prototype.backdrop = function (b) {
    var c = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var d = a.support.transition && c;
      if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", a.proxy(function (a) {
          a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
        }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b)return;
      d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
    } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
  };
  var c = a.fn.modal;
  a.fn.modal = function (c, d) {
    return this.each(function () {
      var e = a(this), f = e.data("bs.modal"), g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
      f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d)
    })
  }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () {
    return a.fn.modal = c, this
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) {
    var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({remote: !/#/.test(d) && d}, e.data(), c.data());
    b.preventDefault(), e.modal(f, this).one("hide", function () {
      c.is(":visible") && c.focus()
    })
  }), a(document).on("show.bs.modal", ".modal", function () {
    a(document.body).addClass("modal-open")
  }).on("hidden.bs.modal", ".modal", function () {
    a(document.body).removeClass("modal-open")
  })
}(window.jQuery), +function (a) {
  "use strict";
  var b = function (a, b) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
  };
  b.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1
  }, b.prototype.init = function (b, c, d) {
    this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
    for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];
      if ("click" == g)this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focus", i = "hover" == g ? "mouseleave" : "blur";
        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
      }
    }
    this.options.selector ? this._options = a.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle()
  }, b.prototype.getDefaults = function () {
    return b.DEFAULTS
  }, b.prototype.getOptions = function (b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
      show: b.delay,
      hide: b.delay
    }), b
  }, b.prototype.getDelegateOptions = function () {
    var b = {}, c = this.getDefaults();
    return this._options && a.each(this._options, function (a, d) {
      c[a] != d && (b[a] = d)
    }), b
  }, b.prototype.enter = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
    return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
      "in" == c.hoverState && c.show()
    }, c.options.delay.show)) : c.show()
  }, b.prototype.leave = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
    return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
      "out" == c.hoverState && c.hide()
    }, c.options.delay.hide)) : c.hide()
  }, b.prototype.show = function () {
    var b = a.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      if (this.$element.trigger(b), b.isDefaultPrevented())return;
      var c = this.tip();
      this.setContent(), this.options.animation && c.addClass("fade");
      var d = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement, e = /\s?auto?\s?/i, f = e.test(d);
      f && (d = d.replace(e, "") || "top"), c.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(d), this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element);
      var g = this.getPosition(), h = c[0].offsetWidth, i = c[0].offsetHeight;
      if (f) {
        var j = this.$element.parent(), k = d, l = document.documentElement.scrollTop || document.body.scrollTop, m = "body" == this.options.container ? window.innerWidth : j.outerWidth(), n = "body" == this.options.container ? window.innerHeight : j.outerHeight(), o = "body" == this.options.container ? 0 : j.offset().left;
        d = "bottom" == d && g.top + g.height + i - l > n ? "top" : "top" == d && g.top - l - i < 0 ? "bottom" : "right" == d && g.right + h > m ? "left" : "left" == d && g.left - h < o ? "right" : d, c.removeClass(k).addClass(d)
      }
      var p = this.getCalculatedOffset(d, g, h, i);
      this.applyPlacement(p, d), this.$element.trigger("shown.bs." + this.type)
    }
  }, b.prototype.applyPlacement = function (a, b) {
    var c, d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
    isNaN(g) && (g = 0), isNaN(h) && (h = 0), a.top = a.top + g, a.left = a.left + h, d.offset(a).addClass("in");
    var i = d[0].offsetWidth, j = d[0].offsetHeight;
    if ("top" == b && j != f && (c = !0, a.top = a.top + f - j), /bottom|top/.test(b)) {
      var k = 0;
      a.left < 0 && (k = -2 * a.left, a.left = 0, d.offset(a), i = d[0].offsetWidth, j = d[0].offsetHeight), this.replaceArrow(k - e + i, i, "left")
    } else this.replaceArrow(j - f, j, "top");
    c && d.offset(a)
  }, b.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
  }, b.prototype.setContent = function () {
    var a = this.tip(), b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
  }, b.prototype.hide = function () {
    function b() {
      "in" != c.hoverState && d.detach()
    }

    var c = this, d = this.tip(), e = a.Event("hide.bs." + this.type);
    return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.$element.trigger("hidden.bs." + this.type), this)
  }, b.prototype.fixTitle = function () {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
  }, b.prototype.hasContent = function () {
    return this.getTitle()
  }, b.prototype.getPosition = function () {
    var b = this.$element[0];
    return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
      width: b.offsetWidth,
      height: b.offsetHeight
    }, this.$element.offset())
  }, b.prototype.getCalculatedOffset = function (a, b, c, d) {
    return "bottom" == a ? {top: b.top + b.height, left: b.left + b.width / 2 - c / 2} : "top" == a ? {
      top: b.top - d,
      left: b.left + b.width / 2 - c / 2
    } : "left" == a ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {
      top: b.top + b.height / 2 - d / 2,
      left: b.left + b.width
    }
  }, b.prototype.getTitle = function () {
    var a, b = this.$element, c = this.options;
    return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
  }, b.prototype.tip = function () {
    return this.$tip = this.$tip || a(this.options.template)
  }, b.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  }, b.prototype.validate = function () {
    this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
  }, b.prototype.enable = function () {
    this.enabled = !0
  }, b.prototype.disable = function () {
    this.enabled = !1
  }, b.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }, b.prototype.toggle = function (b) {
    var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
    c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
  }, b.prototype.destroy = function () {
    this.hide().$element.off("." + this.type).removeData("bs." + this.type)
  };
  var c = a.fn.tooltip;
  a.fn.tooltip = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof c && c;
      e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = c, this
  }
}(window.jQuery), +function (a) {
  "use strict";
  var b = function (a, b) {
    this.init("popover", a, b)
  };
  if (!a.fn.tooltip)throw new Error("Popover requires tooltip.js");
  b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function () {
    return b.DEFAULTS
  }, b.prototype.setContent = function () {
    var a = this.tip(), b = this.getTitle(), c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
  }, b.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }, b.prototype.getContent = function () {
    var a = this.$element, b = this.options;
    return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
  }, b.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
  }, b.prototype.tip = function () {
    return this.$tip || (this.$tip = a(this.options.template)), this.$tip
  };
  var c = a.fn.popover;
  a.fn.popover = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data("bs.popover"), f = "object" == typeof c && c;
      e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function () {
    return a.fn.popover = c, this
  }
}(window.jQuery), +function (a) {
  "use strict";
  function b(c, d) {
    var e, f = a.proxy(this.process, this);
    this.$element = a(a(c).is("body") ? window : c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
  }

  b.DEFAULTS = {offset: 10}, b.prototype.refresh = function () {
    var b = this.$element[0] == window ? "offset" : "position";
    this.offsets = a([]), this.targets = a([]);
    {
      var c = this;
      this.$body.find(this.selector).map(function () {
        var d = a(this), e = d.data("target") || d.attr("href"), f = /^#\w/.test(e) && a(e);
        return f && f.length && [[f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]] || null
      }).sort(function (a, b) {
        return a[0] - b[0]
      }).each(function () {
        c.offsets.push(this[0]), c.targets.push(this[1])
      })
    }
  }, b.prototype.process = function () {
    var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
    if (b >= d)return g != (a = f.last()[0]) && this.activate(a);
    for (a = e.length; a--;)g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
  }, b.prototype.activate = function (b) {
    this.activeTarget = b, a(this.selector).parents(".active").removeClass("active");
    var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
    d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate")
  };
  var c = a.fn.scrollspy;
  a.fn.scrollspy = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
      e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
    return a.fn.scrollspy = c, this
  }, a(window).on("load", function () {
    a('[data-spy="scroll"]').each(function () {
      var b = a(this);
      b.scrollspy(b.data())
    })
  })
}(window.jQuery), +function (a) {
  "use strict";
  var b = function (b) {
    this.element = a(b)
  };
  b.prototype.show = function () {
    var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.attr("data-target");
    if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", {relatedTarget: e});
      if (b.trigger(f), !f.isDefaultPrevented()) {
        var g = a(d);
        this.activate(b.parent("li"), c), this.activate(g, g.parent(), function () {
          b.trigger({type: "shown.bs.tab", relatedTarget: e})
        })
      }
    }
  }, b.prototype.activate = function (b, c, d) {
    function e() {
      f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
    }

    var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
    g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in")
  };
  var c = a.fn.tab;
  a.fn.tab = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data("bs.tab");
      e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]()
    })
  }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () {
    return a.fn.tab = c, this
  }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
    b.preventDefault(), a(this).tab("show")
  })
}(window.jQuery), +function (a) {
  "use strict";
  var b = function (c, d) {
    this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = null, this.checkPosition()
  };
  b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {offset: 0}, b.prototype.checkPositionWithEventLoop = function () {
    setTimeout(a.proxy(this.checkPosition, this), 1)
  }, b.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom;
      "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top()), "function" == typeof h && (h = f.bottom());
      var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
      this.affixed !== i && (this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = "bottom" == i ? e.top - d : null, this.$element.removeClass(b.RESET).addClass("affix" + (i ? "-" + i : "")), "bottom" == i && this.$element.offset({top: document.body.offsetHeight - h - this.$element.height()}))
    }
  };
  var c = a.fn.affix;
  a.fn.affix = function (c) {
    return this.each(function () {
      var d = a(this), e = d.data("bs.affix"), f = "object" == typeof c && c;
      e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function () {
    return a.fn.affix = c, this
  }, a(window).on("load", function () {
    a('[data-spy="affix"]').each(function () {
      var b = a(this), c = b.data();
      c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
    })
  })
}(window.jQuery), function (a, b, c) {
  "use strict";
  function d(a) {
    return function () {
      var b, c, d = arguments[0], e = "[" + (a ? a + ":" : "") + d + "] ", f = arguments[1], g = arguments, h = function (a) {
        return "function" == typeof a ? a.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof a ? "undefined" : "string" != typeof a ? JSON.stringify(a) : a
      };
      for (b = e + f.replace(/\{\d+\}/g, function (a) {
        var b, c = +a.slice(1, -1);
        return c + 2 < g.length ? (b = g[c + 2], "function" == typeof b ? b.toString().replace(/ ?\{[\s\S]*$/, "") : "undefined" == typeof b ? "undefined" : "string" != typeof b ? R(b) : b) : a
      }), b = b + "\nhttp://errors.angularjs.org/1.2.16/" + (a ? a + "/" : "") + d, c = 2; c < arguments.length; c++)b = b + (2 == c ? "?" : "&") + "p" + (c - 2) + "=" + encodeURIComponent(h(arguments[c]));
      return new Error(b)
    }
  }

  function e(a) {
    if (null == a || A(a))return !1;
    var b = a.length;
    return 1 === a.nodeType && b ? !0 : u(a) || x(a) || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
  }

  function f(a, b, c) {
    var d;
    if (a)if (y(a))for (d in a)"prototype" == d || "length" == d || "name" == d || a.hasOwnProperty && !a.hasOwnProperty(d) || b.call(c, a[d], d); else if (a.forEach && a.forEach !== f)a.forEach(b, c); else if (e(a))for (d = 0; d < a.length; d++)b.call(c, a[d], d); else for (d in a)a.hasOwnProperty(d) && b.call(c, a[d], d);
    return a
  }

  function g(a) {
    var b = [];
    for (var c in a)a.hasOwnProperty(c) && b.push(c);
    return b.sort()
  }

  function h(a, b, c) {
    for (var d = g(a), e = 0; e < d.length; e++)b.call(c, a[d[e]], d[e]);
    return d
  }

  function i(a) {
    return function (b, c) {
      a(c, b)
    }
  }

  function j() {
    for (var a, b = Bd.length; b;) {
      if (b--, a = Bd[b].charCodeAt(0), 57 == a)return Bd[b] = "A", Bd.join("");
      if (90 != a)return Bd[b] = String.fromCharCode(a + 1), Bd.join("");
      Bd[b] = "0"
    }
    return Bd.unshift("0"), Bd.join("")
  }

  function k(a, b) {
    b ? a.$$hashKey = b : delete a.$$hashKey
  }

  function l(a) {
    var b = a.$$hashKey;
    return f(arguments, function (b) {
      b !== a && f(b, function (b, c) {
        a[c] = b
      })
    }), k(a, b), a
  }

  function m(a) {
    return parseInt(a, 10)
  }

  function n(a, b) {
    return l(new (l(function () {
    }, {prototype: a})), b)
  }

  function o() {
  }

  function p(a) {
    return a
  }

  function q(a) {
    return function () {
      return a
    }
  }

  function r(a) {
    return "undefined" == typeof a
  }

  function s(a) {
    return "undefined" != typeof a
  }

  function t(a) {
    return null != a && "object" == typeof a
  }

  function u(a) {
    return "string" == typeof a
  }

  function v(a) {
    return "number" == typeof a
  }

  function w(a) {
    return "[object Date]" === yd.call(a)
  }

  function x(a) {
    return "[object Array]" === yd.call(a)
  }

  function y(a) {
    return "function" == typeof a
  }

  function z(a) {
    return "[object RegExp]" === yd.call(a)
  }

  function A(a) {
    return a && a.document && a.location && a.alert && a.setInterval
  }

  function B(a) {
    return a && a.$evalAsync && a.$watch
  }

  function C(a) {
    return "[object File]" === yd.call(a)
  }

  function D(a) {
    return "[object Blob]" === yd.call(a)
  }

  function E(a) {
    return !(!a || !(a.nodeName || a.prop && a.attr && a.find))
  }

  function F(a, b, c) {
    var d = [];
    return f(a, function (a, e, f) {
      d.push(b.call(c, a, e, f))
    }), d
  }

  function G(a, b) {
    return -1 != H(a, b)
  }

  function H(a, b) {
    if (a.indexOf)return a.indexOf(b);
    for (var c = 0; c < a.length; c++)if (b === a[c])return c;
    return -1
  }

  function I(a, b) {
    var c = H(a, b);
    return c >= 0 && a.splice(c, 1), b
  }

  function J(a, b) {
    if (A(a) || B(a))throw zd("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
    if (b) {
      if (a === b)throw zd("cpi", "Can't copy! Source and destination are identical.");
      if (x(a)) {
        b.length = 0;
        for (var c = 0; c < a.length; c++)b.push(J(a[c]))
      } else {
        var d = b.$$hashKey;
        f(b, function (a, c) {
          delete b[c]
        });
        for (var e in a)b[e] = J(a[e]);
        k(b, d)
      }
    } else b = a, a && (x(a) ? b = J(a, []) : w(a) ? b = new Date(a.getTime()) : z(a) ? b = new RegExp(a.source) : t(a) && (b = J(a, {})));
    return b
  }

  function K(a, b) {
    b = b || {};
    for (var c in a)!a.hasOwnProperty(c) || "$" === c.charAt(0) && "$" === c.charAt(1) || (b[c] = a[c]);
    return b
  }

  function L(a, b) {
    if (a === b)return !0;
    if (null === a || null === b)return !1;
    if (a !== a && b !== b)return !0;
    var d, e, f, g = typeof a, h = typeof b;
    if (g == h && "object" == g) {
      if (!x(a)) {
        if (w(a))return w(b) && a.getTime() == b.getTime();
        if (z(a) && z(b))return a.toString() == b.toString();
        if (B(a) || B(b) || A(a) || A(b) || x(b))return !1;
        f = {};
        for (e in a)if ("$" !== e.charAt(0) && !y(a[e])) {
          if (!L(a[e], b[e]))return !1;
          f[e] = !0
        }
        for (e in b)if (!f.hasOwnProperty(e) && "$" !== e.charAt(0) && b[e] !== c && !y(b[e]))return !1;
        return !0
      }
      if (!x(b))return !1;
      if ((d = a.length) == b.length) {
        for (e = 0; d > e; e++)if (!L(a[e], b[e]))return !1;
        return !0
      }
    }
    return !1
  }

  function M() {
    return b.securityPolicy && b.securityPolicy.isActive || b.querySelector && !(!b.querySelector("[ng-csp]") && !b.querySelector("[data-ng-csp]"))
  }

  function N(a, b, c) {
    return a.concat(wd.call(b, c))
  }

  function O(a, b) {
    return wd.call(a, b || 0)
  }

  function P(a, b) {
    var c = arguments.length > 2 ? O(arguments, 2) : [];
    return !y(b) || b instanceof RegExp ? b : c.length ? function () {
      return arguments.length ? b.apply(a, c.concat(wd.call(arguments, 0))) : b.apply(a, c)
    } : function () {
      return arguments.length ? b.apply(a, arguments) : b.call(a)
    }
  }

  function Q(a, d) {
    var e = d;
    return "string" == typeof a && "$" === a.charAt(0) ? e = c : A(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : B(d) && (e = "$SCOPE"), e
  }

  function R(a, b) {
    return "undefined" == typeof a ? c : JSON.stringify(a, Q, b ? "  " : null)
  }

  function S(a) {
    return u(a) ? JSON.parse(a) : a
  }

  function T(a) {
    if ("function" == typeof a)a = !0; else if (a && 0 !== a.length) {
      var b = md("" + a);
      a = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)
    } else a = !1;
    return a
  }

  function U(a) {
    a = sd(a).clone();
    try {
      a.empty()
    } catch (b) {
    }
    var c = 3, d = sd("<div>").append(a).html();
    try {
      return a[0].nodeType === c ? md(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) {
        return "<" + md(b)
      })
    } catch (b) {
      return md(d)
    }
  }

  function V(a) {
    try {
      return decodeURIComponent(a)
    } catch (b) {
    }
  }

  function W(a) {
    var b, c, d = {};
    return f((a || "").split("&"), function (a) {
      if (a && (b = a.split("="), c = V(b[0]), s(c))) {
        var e = s(b[1]) ? V(b[1]) : !0;
        d[c] ? x(d[c]) ? d[c].push(e) : d[c] = [d[c], e] : d[c] = e
      }
    }), d
  }

  function X(a) {
    var b = [];
    return f(a, function (a, c) {
      x(a) ? f(a, function (a) {
        b.push(Z(c, !0) + (a === !0 ? "" : "=" + Z(a, !0)))
      }) : b.push(Z(c, !0) + (a === !0 ? "" : "=" + Z(a, !0)))
    }), b.length ? b.join("&") : ""
  }

  function Y(a) {
    return Z(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
  }

  function Z(a, b) {
    return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20" : "+")
  }

  function $(a, c) {
    function d(a) {
      a && h.push(a)
    }

    var e, g, h = [a], i = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"], j = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    f(i, function (c) {
      i[c] = !0, d(b.getElementById(c)), c = c.replace(":", "\\:"), a.querySelectorAll && (f(a.querySelectorAll("." + c), d), f(a.querySelectorAll("." + c + "\\:"), d), f(a.querySelectorAll("[" + c + "]"), d))
    }), f(h, function (a) {
      if (!e) {
        var b = " " + a.className + " ", c = j.exec(b);
        c ? (e = a, g = (c[2] || "").replace(/\s+/g, ",")) : f(a.attributes, function (b) {
          !e && i[b.name] && (e = a, g = b.value)
        })
      }
    }), e && c(e, g ? [g] : [])
  }

  function _(c, d) {
    var e = function () {
      if (c = sd(c), c.injector()) {
        var a = c[0] === b ? "document" : U(c);
        throw zd("btstrpd", "App Already Bootstrapped with this Element '{0}'", a)
      }
      d = d || [], d.unshift(["$provide", function (a) {
        a.value("$rootElement", c)
      }]), d.unshift("ng");
      var e = Ib(d);
      return e.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function (a, b, c, d) {
        a.$apply(function () {
          b.data("$injector", d), c(b)(a)
        })
      }]), e
    }, g = /^NG_DEFER_BOOTSTRAP!/;
    return a && !g.test(a.name) ? e() : (a.name = a.name.replace(g, ""), void(Ad.resumeBootstrap = function (a) {
      f(a, function (a) {
        d.push(a)
      }), e()
    }))
  }

  function ab(a, b) {
    return b = b || "_", a.replace(Dd, function (a, c) {
      return (c ? b : "") + a.toLowerCase()
    })
  }

  function bb() {
    td = a.jQuery, td ? (sd = td, l(td.fn, {
      scope: Sd.scope,
      isolateScope: Sd.isolateScope,
      controller: Sd.controller,
      injector: Sd.injector,
      inheritedData: Sd.inheritedData
    }), lb("remove", !0, !0, !1), lb("empty", !1, !1, !1), lb("html", !1, !1, !0)) : sd = pb, Ad.element = sd
  }

  function cb(a, b, c) {
    if (!a)throw zd("areq", "Argument '{0}' is {1}", b || "?", c || "required");
    return a
  }

  function db(a, b, c) {
    return c && x(a) && (a = a[a.length - 1]), cb(y(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), a
  }

  function eb(a, b) {
    if ("hasOwnProperty" === a)throw zd("badname", "hasOwnProperty is not a valid {0} name", b)
  }

  function fb(a, b, c) {
    if (!b)return a;
    for (var d, e = b.split("."), f = a, g = e.length, h = 0; g > h; h++)d = e[h], a && (a = (f = a)[d]);
    return !c && y(a) ? P(f, a) : a
  }

  function gb(a) {
    var b = a[0], c = a[a.length - 1];
    if (b === c)return sd(b);
    var d = b, e = [d];
    do {
      if (d = d.nextSibling, !d)break;
      e.push(d)
    } while (d !== c);
    return sd(e)
  }

  function hb(a) {
    function b(a, b, c) {
      return a[b] || (a[b] = c())
    }

    var c = d("$injector"), e = d("ng"), f = b(a, "angular", Object);
    return f.$$minErr = f.$$minErr || d, b(f, "module", function () {
      var a = {};
      return function (d, f, g) {
        var h = function (a, b) {
          if ("hasOwnProperty" === a)throw e("badname", "hasOwnProperty is not a valid {0} name", b)
        };
        return h(d, "module"), f && a.hasOwnProperty(d) && (a[d] = null), b(a, d, function () {
          function a(a, c, d) {
            return function () {
              return b[d || "push"]([a, c, arguments]), i
            }
          }

          if (!f)throw c("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", d);
          var b = [], e = [], h = a("$injector", "invoke"), i = {
            _invokeQueue: b,
            _runBlocks: e,
            requires: f,
            name: d,
            provider: a("$provide", "provider"),
            factory: a("$provide", "factory"),
            service: a("$provide", "service"),
            value: a("$provide", "value"),
            constant: a("$provide", "constant", "unshift"),
            animation: a("$animateProvider", "register"),
            filter: a("$filterProvider", "register"),
            controller: a("$controllerProvider", "register"),
            directive: a("$compileProvider", "directive"),
            config: h,
            run: function (a) {
              return e.push(a), this
            }
          };
          return g && h(g), i
        })
      }
    })
  }

  function ib(b) {
    l(b, {
      bootstrap: _,
      copy: J,
      extend: l,
      equals: L,
      element: sd,
      forEach: f,
      injector: Ib,
      noop: o,
      bind: P,
      toJson: R,
      fromJson: S,
      identity: p,
      isUndefined: r,
      isDefined: s,
      isString: u,
      isFunction: y,
      isObject: t,
      isNumber: v,
      isElement: E,
      isArray: x,
      version: Ed,
      isDate: w,
      lowercase: md,
      uppercase: od,
      callbacks: {counter: 0},
      $$minErr: d,
      $$csp: M
    }), ud = hb(a);
    try {
      ud("ngLocale")
    } catch (c) {
      ud("ngLocale", []).provider("$locale", dc)
    }
    ud("ng", ["ngLocale"], ["$provide", function (a) {
      a.provider({$$sanitizeUri: Ec}), a.provider("$compile", Pb).directive({
        a: ye,
        input: Ie,
        textarea: Ie,
        form: Ce,
        script: qf,
        select: tf,
        style: vf,
        option: uf,
        ngBind: Ue,
        ngBindHtml: We,
        ngBindTemplate: Ve,
        ngClass: Xe,
        ngClassEven: Ze,
        ngClassOdd: Ye,
        ngCloak: $e,
        ngController: _e,
        ngForm: De,
        ngHide: kf,
        ngIf: bf,
        ngInclude: cf,
        ngInit: ef,
        ngNonBindable: ff,
        ngPluralize: gf,
        ngRepeat: hf,
        ngShow: jf,
        ngStyle: lf,
        ngSwitch: mf,
        ngSwitchWhen: nf,
        ngSwitchDefault: of,
        ngOptions: sf,
        ngTransclude: pf,
        ngModel: Oe,
        ngList: Re,
        ngChange: Pe,
        required: Qe,
        ngRequired: Qe,
        ngValue: Te
      }).directive({ngInclude: df}).directive(ze).directive(af), a.provider({
        $anchorScroll: Jb,
        $animate: _d,
        $browser: Mb,
        $cacheFactory: Nb,
        $controller: Sb,
        $document: Tb,
        $exceptionHandler: Ub,
        $filter: Pc,
        $interpolate: bc,
        $interval: cc,
        $http: Zb,
        $httpBackend: _b,
        $location: qc,
        $log: rc,
        $parse: zc,
        $rootScope: Dc,
        $q: Ac,
        $sce: Jc,
        $sceDelegate: Ic,
        $sniffer: Kc,
        $templateCache: Ob,
        $timeout: Lc,
        $window: Oc,
        $$rAF: Cc,
        $$asyncCallback: Kb
      })
    }])
  }

  function jb() {
    return ++Hd
  }

  function kb(a) {
    return a.replace(Kd, function (a, b, c, d) {
      return d ? c.toUpperCase() : c
    }).replace(Ld, "Moz$1")
  }

  function lb(a, b, c, d) {
    function e(a) {
      var e, g, h, i, j, k, l, m = c && a ? [this.filter(a)] : [this], n = b;
      if (!d || null != a)for (; m.length;)for (e = m.shift(), g = 0, h = e.length; h > g; g++)for (i = sd(e[g]), n ? i.triggerHandler("$destroy") : n = !n, j = 0, k = (l = i.children()).length; k > j; j++)m.push(td(l[j]));
      return f.apply(this, arguments)
    }

    var f = td.fn[a];
    f = f.$original || f, e.$original = f, td.fn[a] = e
  }

  function mb(a) {
    return !Od.test(a)
  }

  function nb(a, b) {
    var c, d, e, f, g, h, i = b.createDocumentFragment(), j = [];
    if (mb(a))j.push(b.createTextNode(a)); else {
      for (c = i.appendChild(b.createElement("div")), d = (Pd.exec(a) || ["", ""])[1].toLowerCase(), e = Rd[d] || Rd._default, c.innerHTML = "<div>&#160;</div>" + e[1] + a.replace(Qd, "<$1></$2>") + e[2], c.removeChild(c.firstChild), f = e[0]; f--;)c = c.lastChild;
      for (g = 0, h = c.childNodes.length; h > g; ++g)j.push(c.childNodes[g]);
      c = i.firstChild, c.textContent = ""
    }
    return i.textContent = "", i.innerHTML = "", j
  }

  function ob(a, c) {
    c = c || b;
    var d;
    return (d = Nd.exec(a)) ? [c.createElement(d[1])] : nb(a, c)
  }

  function pb(a) {
    if (a instanceof pb)return a;
    if (u(a) && (a = Cd(a)), !(this instanceof pb)) {
      if (u(a) && "<" != a.charAt(0))throw Md("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
      return new pb(a)
    }
    if (u(a)) {
      zb(this, ob(a));
      var c = sd(b.createDocumentFragment());
      c.append(this)
    } else zb(this, a)
  }

  function qb(a) {
    return a.cloneNode(!0)
  }

  function rb(a) {
    tb(a);
    for (var b = 0, c = a.childNodes || []; b < c.length; b++)rb(c[b])
  }

  function sb(a, b, c, d) {
    if (s(d))throw Md("offargs", "jqLite#off() does not support the `selector` argument");
    var e = ub(a, "events"), g = ub(a, "handle");
    g && (r(b) ? f(e, function (b, c) {
      Jd(a, c, b), delete e[c]
    }) : f(b.split(" "), function (b) {
      r(c) ? (Jd(a, b, e[b]), delete e[b]) : I(e[b] || [], c)
    }))
  }

  function tb(a, b) {
    var d = a[Gd], e = Fd[d];
    if (e) {
      if (b)return void delete Fd[d].data[b];
      e.handle && (e.events.$destroy && e.handle({}, "$destroy"), sb(a)), delete Fd[d], a[Gd] = c
    }
  }

  function ub(a, b, c) {
    var d = a[Gd], e = Fd[d || -1];
    return s(c) ? (e || (a[Gd] = d = jb(), e = Fd[d] = {}), void(e[b] = c)) : e && e[b]
  }

  function vb(a, b, c) {
    var d = ub(a, "data"), e = s(c), f = !e && s(b), g = f && !t(b);
    if (d || g || ub(a, "data", d = {}), e)d[b] = c; else {
      if (!f)return d;
      if (g)return d && d[b];
      l(d, b)
    }
  }

  function wb(a, b) {
    return a.getAttribute ? (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") > -1 : !1
  }

  function xb(a, b) {
    b && a.setAttribute && f(b.split(" "), function (b) {
      a.setAttribute("class", Cd((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Cd(b) + " ", " ")))
    })
  }

  function yb(a, b) {
    if (b && a.setAttribute) {
      var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
      f(b.split(" "), function (a) {
        a = Cd(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ")
      }), a.setAttribute("class", Cd(c))
    }
  }

  function zb(a, b) {
    if (b) {
      b = b.nodeName || !s(b.length) || A(b) ? [b] : b;
      for (var c = 0; c < b.length; c++)a.push(b[c])
    }
  }

  function Ab(a, b) {
    return Bb(a, "$" + (b || "ngController") + "Controller")
  }

  function Bb(a, b, d) {
    a = sd(a), 9 == a[0].nodeType && (a = a.find("html"));
    for (var e = x(b) ? b : [b]; a.length;) {
      for (var f = a[0], g = 0, h = e.length; h > g; g++)if ((d = a.data(e[g])) !== c)return d;
      a = sd(f.parentNode || 11 === f.nodeType && f.host)
    }
  }

  function Cb(a) {
    for (var b = 0, c = a.childNodes; b < c.length; b++)rb(c[b]);
    for (; a.firstChild;)a.removeChild(a.firstChild)
  }

  function Db(a, b) {
    var c = Td[b.toLowerCase()];
    return c && Ud[a.nodeName] && c
  }

  function Eb(a, c) {
    var d = function (d, e) {
      if (d.preventDefault || (d.preventDefault = function () {
          d.returnValue = !1
        }), d.stopPropagation || (d.stopPropagation = function () {
          d.cancelBubble = !0
        }), d.target || (d.target = d.srcElement || b), r(d.defaultPrevented)) {
        var g = d.preventDefault;
        d.preventDefault = function () {
          d.defaultPrevented = !0, g.call(d)
        }, d.defaultPrevented = !1
      }
      d.isDefaultPrevented = function () {
        return d.defaultPrevented || d.returnValue === !1
      };
      var h = K(c[e || d.type] || []);
      f(h, function (b) {
        b.call(a, d)
      }), 8 >= rd ? (d.preventDefault = null, d.stopPropagation = null, d.isDefaultPrevented = null) : (delete d.preventDefault, delete d.stopPropagation, delete d.isDefaultPrevented)
    };
    return d.elem = a, d
  }

  function Fb(a) {
    var b, d = typeof a;
    return "object" == d && null !== a ? "function" == typeof(b = a.$$hashKey) ? b = a.$$hashKey() : b === c && (b = a.$$hashKey = j()) : b = a, d + ":" + b
  }

  function Gb(a) {
    f(a, this.put, this)
  }

  function Hb(a) {
    var b, c, d, e;
    return "function" == typeof a ? (b = a.$inject) || (b = [], a.length && (c = a.toString().replace(Yd, ""), d = c.match(Vd), f(d[1].split(Wd), function (a) {
      a.replace(Xd, function (a, c, d) {
        b.push(d)
      })
    })), a.$inject = b) : x(a) ? (e = a.length - 1, db(a[e], "fn"), b = a.slice(0, e)) : db(a, "fn", !0), b
  }

  function Ib(a) {
    function b(a) {
      return function (b, c) {
        return t(b) ? void f(b, i(a)) : a(b, c)
      }
    }

    function c(a, b) {
      if (eb(a, "service"), (y(b) || x(b)) && (b = v.instantiate(b)), !b.$get)throw Zd("pget", "Provider '{0}' must define $get factory method.", a);
      return s[a + n] = b
    }

    function d(a, b) {
      return c(a, {$get: b})
    }

    function e(a, b) {
      return d(a, ["$injector", function (a) {
        return a.instantiate(b)
      }])
    }

    function g(a, b) {
      return d(a, q(b))
    }

    function h(a, b) {
      eb(a, "constant"), s[a] = b, w[a] = b
    }

    function j(a, b) {
      var c = v.get(a + n), d = c.$get;
      c.$get = function () {
        var a = z.invoke(d, c);
        return z.invoke(b, null, {$delegate: a})
      }
    }

    function k(a) {
      var b, c, d, e, g = [];
      return f(a, function (a) {
        if (!r.get(a)) {
          r.put(a, !0);
          try {
            if (u(a))for (b = ud(a), g = g.concat(k(b.requires)).concat(b._runBlocks), c = b._invokeQueue, d = 0, e = c.length; e > d; d++) {
              var f = c[d], h = v.get(f[0]);
              h[f[1]].apply(h, f[2])
            } else y(a) ? g.push(v.invoke(a)) : x(a) ? g.push(v.invoke(a)) : db(a, "module")
          } catch (i) {
            throw x(a) && (a = a[a.length - 1]), i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack), Zd("modulerr", "Failed to instantiate module {0} due to:\n{1}", a, i.stack || i.message || i)
          }
        }
      }), g
    }

    function l(a, b) {
      function c(c) {
        if (a.hasOwnProperty(c)) {
          if (a[c] === m)throw Zd("cdep", "Circular dependency found: {0}", p.join(" <- "));
          return a[c]
        }
        try {
          return p.unshift(c), a[c] = m, a[c] = b(c)
        } catch (d) {
          throw a[c] === m && delete a[c], d
        } finally {
          p.shift()
        }
      }

      function d(a, b, d) {
        var e, f, g, h = [], i = Hb(a);
        for (f = 0, e = i.length; e > f; f++) {
          if (g = i[f], "string" != typeof g)throw Zd("itkn", "Incorrect injection token! Expected service name as string, got {0}", g);
          h.push(d && d.hasOwnProperty(g) ? d[g] : c(g))
        }
        return a.$inject || (a = a[e]), a.apply(b, h)
      }

      function e(a, b) {
        var c, e, f = function () {
        };
        return f.prototype = (x(a) ? a[a.length - 1] : a).prototype, c = new f, e = d(a, c, b), t(e) || y(e) ? e : c
      }

      return {
        invoke: d, instantiate: e, get: c, annotate: Hb, has: function (b) {
          return s.hasOwnProperty(b + n) || a.hasOwnProperty(b)
        }
      }
    }

    var m = {}, n = "Provider", p = [], r = new Gb, s = {
      $provide: {
        provider: b(c),
        factory: b(d),
        service: b(e),
        value: b(g),
        constant: b(h),
        decorator: j
      }
    }, v = s.$injector = l(s, function () {
      throw Zd("unpr", "Unknown provider: {0}", p.join(" <- "))
    }), w = {}, z = w.$injector = l(w, function (a) {
      var b = v.get(a + n);
      return z.invoke(b.$get, b)
    });
    return f(k(a), function (a) {
      z.invoke(a || o)
    }), z
  }

  function Jb() {
    var a = !0;
    this.disableAutoScrolling = function () {
      a = !1
    }, this.$get = ["$window", "$location", "$rootScope", function (b, c, d) {
      function e(a) {
        var b = null;
        return f(a, function (a) {
          b || "a" !== md(a.nodeName) || (b = a)
        }), b
      }

      function g() {
        var a, d = c.hash();
        d ? (a = h.getElementById(d)) ? a.scrollIntoView() : (a = e(h.getElementsByName(d))) ? a.scrollIntoView() : "top" === d && b.scrollTo(0, 0) : b.scrollTo(0, 0)
      }

      var h = b.document;
      return a && d.$watch(function () {
        return c.hash()
      }, function () {
        d.$evalAsync(g)
      }), g
    }]
  }

  function Kb() {
    this.$get = ["$$rAF", "$timeout", function (a, b) {
      return a.supported ? function (b) {
        return a(b)
      } : function (a) {
        return b(a, 0, !1)
      }
    }]
  }

  function Lb(a, b, d, e) {
    function g(a) {
      try {
        a.apply(null, O(arguments, 1))
      } finally {
        if (s--, 0 === s)for (; t.length;)try {
          t.pop()()
        } catch (b) {
          d.error(b)
        }
      }
    }

    function h(a, b) {
      !function c() {
        f(w, function (a) {
          a()
        }), v = b(c, a)
      }()
    }

    function i() {
      z = null, x != j.url() && (x = j.url(), f(A, function (a) {
        a(j.url())
      }))
    }

    var j = this, k = b[0], l = a.location, m = a.history, n = a.setTimeout, p = a.clearTimeout, q = {};
    j.isMock = !1;
    var s = 0, t = [];
    j.$$completeOutstandingRequest = g, j.$$incOutstandingRequestCount = function () {
      s++
    }, j.notifyWhenNoOutstandingRequests = function (a) {
      f(w, function (a) {
        a()
      }), 0 === s ? a() : t.push(a)
    };
    var v, w = [];
    j.addPollFn = function (a) {
      return r(v) && h(100, n), w.push(a), a
    };
    var x = l.href, y = b.find("base"), z = null;
    j.url = function (b, c) {
      if (l !== a.location && (l = a.location), m !== a.history && (m = a.history), b) {
        if (x == b)return;
        return x = b, e.history ? c ? m.replaceState(null, "", b) : (m.pushState(null, "", b), y.attr("href", y.attr("href"))) : (z = b, c ? l.replace(b) : l.href = b), j
      }
      return z || l.href.replace(/%27/g, "'")
    };
    var A = [], B = !1;
    j.onUrlChange = function (b) {
      return B || (e.history && sd(a).on("popstate", i), e.hashchange ? sd(a).on("hashchange", i) : j.addPollFn(i), B = !0), A.push(b), b
    }, j.baseHref = function () {
      var a = y.attr("href");
      return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
    };
    var C = {}, D = "", E = j.baseHref();
    j.cookies = function (a, b) {
      var e, f, g, h, i;
      if (!a) {
        if (k.cookie !== D)for (D = k.cookie, f = D.split("; "), C = {}, h = 0; h < f.length; h++)g = f[h], i = g.indexOf("="), i > 0 && (a = unescape(g.substring(0, i)), C[a] === c && (C[a] = unescape(g.substring(i + 1))));
        return C
      }
      b === c ? k.cookie = escape(a) + "=;path=" + E + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : u(b) && (e = (k.cookie = escape(a) + "=" + escape(b) + ";path=" + E).length + 1, e > 4096 && d.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + e + " > 4096 bytes)!"))
    }, j.defer = function (a, b) {
      var c;
      return s++, c = n(function () {
        delete q[c], g(a)
      }, b || 0), q[c] = !0, c
    }, j.defer.cancel = function (a) {
      return q[a] ? (delete q[a], p(a), g(o), !0) : !1
    }
  }

  function Mb() {
    this.$get = ["$window", "$log", "$sniffer", "$document", function (a, b, c, d) {
      return new Lb(a, d, b, c)
    }]
  }

  function Nb() {
    this.$get = function () {
      function a(a, c) {
        function e(a) {
          a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null)
        }

        function f(a, b) {
          a != b && (a && (a.p = b), b && (b.n = a))
        }

        if (a in b)throw d("$cacheFactory")("iid", "CacheId '{0}' is already taken!", a);
        var g = 0, h = l({}, c, {id: a}), i = {}, j = c && c.capacity || Number.MAX_VALUE, k = {}, m = null, n = null;
        return b[a] = {
          put: function (a, b) {
            if (j < Number.MAX_VALUE) {
              var c = k[a] || (k[a] = {key: a});
              e(c)
            }
            if (!r(b))return a in i || g++, i[a] = b, g > j && this.remove(n.key), b
          }, get: function (a) {
            if (j < Number.MAX_VALUE) {
              var b = k[a];
              if (!b)return;
              e(b)
            }
            return i[a]
          }, remove: function (a) {
            if (j < Number.MAX_VALUE) {
              var b = k[a];
              if (!b)return;
              b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p), delete k[a]
            }
            delete i[a], g--
          }, removeAll: function () {
            i = {}, g = 0, k = {}, m = n = null
          }, destroy: function () {
            i = null, h = null, k = null, delete b[a]
          }, info: function () {
            return l({}, h, {size: g})
          }
        }
      }

      var b = {};
      return a.info = function () {
        var a = {};
        return f(b, function (b, c) {
          a[c] = b.info()
        }), a
      }, a.get = function (a) {
        return b[a]
      }, a
    }
  }

  function Ob() {
    this.$get = ["$cacheFactory", function (a) {
      return a("templates")
    }]
  }

  function Pb(a, d) {
    var e = {}, g = "Directive", h = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, j = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, k = /^(on[a-z]+|formaction)$/;
    this.directive = function m(b, c) {
      return eb(b, "directive"), u(b) ? (cb(c, "directiveFactory"), e.hasOwnProperty(b) || (e[b] = [], a.factory(b + g, ["$injector", "$exceptionHandler", function (a, c) {
        var d = [];
        return f(e[b], function (e, f) {
          try {
            var g = a.invoke(e);
            y(g) ? g = {compile: q(g)} : !g.compile && g.link && (g.compile = q(g.link)), g.priority = g.priority || 0, g.index = f, g.name = g.name || b, g.require = g.require || g.controller && g.name, g.restrict = g.restrict || "A", d.push(g)
          } catch (h) {
            c(h)
          }
        }), d
      }])), e[b].push(c)) : f(b, i(m)), this
    }, this.aHrefSanitizationWhitelist = function (a) {
      return s(a) ? (d.aHrefSanitizationWhitelist(a), this) : d.aHrefSanitizationWhitelist()
    }, this.imgSrcSanitizationWhitelist = function (a) {
      return s(a) ? (d.imgSrcSanitizationWhitelist(a), this) : d.imgSrcSanitizationWhitelist()
    }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function (a, d, i, m, o, r, s, v, w, z, A, B) {
      function C(a, b, c, d, e) {
        a instanceof sd || (a = sd(a)), f(a, function (b, c) {
          3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = b = sd(b).wrap("<span></span>").parent()[0])
        });
        var g = E(a, b, a, c, d, e);
        return D(a, "ng-scope"), function (b, c, d) {
          cb(b, "scope");
          var e = c ? Sd.clone.call(a) : a;
          f(d, function (a, b) {
            e.data("$" + b + "Controller", a)
          });
          for (var h = 0, i = e.length; i > h; h++) {
            var j = e[h], k = j.nodeType;
            (1 === k || 9 === k) && e.eq(h).data("$scope", b)
          }
          return c && c(e, b), g && g(b, e, e), e
        }
      }

      function D(a, b) {
        try {
          a.addClass(b)
        } catch (c) {
        }
      }

      function E(a, b, d, e, f, g) {
        function h(a, d, e, f) {
          var g, h, i, j, k, l, m, n, p, q = d.length, r = new Array(q);
          for (m = 0; q > m; m++)r[m] = d[m];
          for (m = 0, p = 0, n = o.length; n > m; p++)i = r[p], g = o[m++], h = o[m++], j = sd(i), g ? (g.scope ? (k = a.$new(), j.data("$scope", k)) : k = a, l = g.transclude, l || !f && b ? g(h, k, i, e, F(a, l || b)) : g(h, k, i, e, f)) : h && h(a, i.childNodes, c, f)
        }

        for (var i, j, k, l, m, n, o = [], p = 0; p < a.length; p++)i = new $, j = G(a[p], [], i, 0 === p ? e : c, f), k = j.length ? J(j, a[p], i, b, d, null, [], [], g) : null, k && k.scope && D(sd(a[p]), "ng-scope"), m = k && k.terminal || !(l = a[p].childNodes) || !l.length ? null : E(l, k ? k.transclude : b), o.push(k, m), n = n || k || m, g = null;
        return n ? h : null
      }

      function F(a, b) {
        return function (c, d, e) {
          var f = !1;
          c || (c = a.$new(), c.$$transcluded = !0, f = !0);
          var g = b(c, d, e);
          return f && g.on("$destroy", P(c, c.$destroy)), g
        }
      }

      function G(a, b, c, d, e) {
        var f, g, i = a.nodeType, k = c.$attr;
        switch (i) {
          case 1:
            N(b, Qb(vd(a).toLowerCase()), "E", d, e);
            for (var l, m, n, o, p, q = a.attributes, r = 0, s = q && q.length; s > r; r++) {
              var t = !1, v = !1;
              if (l = q[r], !rd || rd >= 8 || l.specified) {
                m = l.name, o = Qb(m), eb.test(o) && (m = ab(o.substr(6), "-"));
                var w = o.replace(/(Start|End)$/, "");
                o === w + "Start" && (t = m, v = m.substr(0, m.length - 5) + "end", m = m.substr(0, m.length - 6)), n = Qb(m.toLowerCase()), k[n] = m, c[n] = p = Cd(l.value), Db(a, n) && (c[n] = !0), X(a, b, p, n), N(b, n, "A", d, e, t, v)
              }
            }
            if (g = a.className, u(g) && "" !== g)for (; f = j.exec(g);)n = Qb(f[2]), N(b, n, "C", d, e) && (c[n] = Cd(f[3])), g = g.substr(f.index + f[0].length);
            break;
          case 3:
            V(b, a.nodeValue);
            break;
          case 8:
            try {
              f = h.exec(a.nodeValue), f && (n = Qb(f[1]), N(b, n, "M", d, e) && (c[n] = Cd(f[2])))
            } catch (x) {
            }
        }
        return b.sort(S), b
      }

      function H(a, b, c) {
        var d = [], e = 0;
        if (b && a.hasAttribute && a.hasAttribute(b)) {
          do {
            if (!a)throw ae("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", b, c);
            1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), a = a.nextSibling
          } while (e > 0)
        } else d.push(a);
        return sd(d)
      }

      function I(a, b, c) {
        return function (d, e, f, g, h) {
          return e = H(e[0], b, c), a(d, e, f, g, h)
        }
      }

      function J(a, e, g, h, j, k, l, m, n) {
        function o(a, b, c, d) {
          a && (c && (a = I(a, c, d)), a.require = w.require, (N === w || w.$$isolateScope) && (a = Z(a, {isolateScope: !0})), l.push(a)), b && (c && (b = I(b, c, d)), b.require = w.require, (N === w || w.$$isolateScope) && (b = Z(b, {isolateScope: !0})), m.push(b))
        }

        function p(a, b, c) {
          var d, e = "data", g = !1;
          if (u(a)) {
            for (; "^" == (d = a.charAt(0)) || "?" == d;)a = a.substr(1), "^" == d && (e = "inheritedData"), g = g || "?" == d;
            if (d = null, c && "data" === e && (d = c[a]), d = d || b[e]("$" + a + "Controller"), !d && !g)throw ae("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", a, z);
            return d
          }
          return x(a) && (d = [], f(a, function (a) {
            d.push(p(a, b, c))
          })), d
        }

        function q(a, b, h, j, k) {
          function n(a, b) {
            var d;
            return arguments.length < 2 && (b = a, a = c), W && (d = z), k(a, b, d)
          }

          var o, q, t, u, v, w, x, y, z = {};
          if (o = e === h ? g : K(g, new $(sd(h), g.$attr)), q = o.$$element, N) {
            var A = /^\s*([@=&])(\??)\s*(\w*)\s*$/, B = sd(h);
            x = b.$new(!0), P && P === N.$$originalDirective ? B.data("$isolateScope", x) : B.data("$isolateScopeNoTemplate", x), D(B, "ng-isolate-scope"), f(N.scope, function (a, c) {
              var e, f, g, h, i = a.match(A) || [], j = i[3] || c, k = "?" == i[2], l = i[1];
              switch (x.$$isolateBindings[c] = l + j, l) {
                case"@":
                  o.$observe(j, function (a) {
                    x[c] = a
                  }), o.$$observers[j].$$scope = b, o[j] && (x[c] = d(o[j])(b));
                  break;
                case"=":
                  if (k && !o[j])return;
                  f = r(o[j]), h = f.literal ? L : function (a, b) {
                    return a === b
                  }, g = f.assign || function () {
                    throw e = x[c] = f(b), ae("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", o[j], N.name)
                  }, e = x[c] = f(b), x.$watch(function () {
                    var a = f(b);
                    return h(a, x[c]) || (h(a, e) ? g(b, a = x[c]) : x[c] = a), e = a
                  }, null, f.literal);
                  break;
                case"&":
                  f = r(o[j]), x[c] = function (a) {
                    return f(b, a)
                  };
                  break;
                default:
                  throw ae("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", N.name, c, a)
              }
            })
          }
          for (y = k && n, J && f(J, function (a) {
            var c, d = {$scope: a === N || a.$$isolateScope ? x : b, $element: q, $attrs: o, $transclude: y};
            w = a.controller, "@" == w && (w = o[a.name]), c = s(w, d), z[a.name] = c, W || q.data("$" + a.name + "Controller", c), a.controllerAs && (d.$scope[a.controllerAs] = c)
          }), t = 0, u = l.length; u > t; t++)try {
            v = l[t], v(v.isolateScope ? x : b, q, o, v.require && p(v.require, q, z), y)
          } catch (C) {
            i(C, U(q))
          }
          var E = b;
          for (N && (N.template || null === N.templateUrl) && (E = x), a && a(E, h.childNodes, c, k), t = m.length - 1; t >= 0; t--)try {
            v = m[t], v(v.isolateScope ? x : b, q, o, v.require && p(v.require, q, z), y)
          } catch (C) {
            i(C, U(q))
          }
        }

        n = n || {};
        for (var v, w, z, A, B, E, F = -Number.MAX_VALUE, J = n.controllerDirectives, N = n.newIsolateScopeDirective, P = n.templateDirective, S = n.nonTlbTranscludeDirective, V = !1, W = n.hasElementTranscludeDirective, X = g.$$element = sd(e), _ = k, ab = h, bb = 0, cb = a.length; cb > bb; bb++) {
          w = a[bb];
          var eb = w.$$start, fb = w.$$end;
          if (eb && (X = H(e, eb, fb)), A = c, F > w.priority)break;
          if ((E = w.scope) && (v = v || w, w.templateUrl || (T("new/isolated scope", N, w, X), t(E) && (N = w))), z = w.name, !w.templateUrl && w.controller && (E = w.controller, J = J || {}, T("'" + z + "' controller", J[z], w, X), J[z] = w), (E = w.transclude) && (V = !0, w.$$tlb || (T("transclusion", S, w, X), S = w), "element" == E ? (W = !0, F = w.priority, A = H(e, eb, fb), X = g.$$element = sd(b.createComment(" " + z + ": " + g[z] + " ")), e = X[0], Y(j, sd(O(A)), e), ab = C(A, h, F, _ && _.name, {nonTlbTranscludeDirective: S})) : (A = sd(qb(e)).contents(), X.empty(), ab = C(A, h))), w.template)if (T("template", P, w, X), P = w, E = y(w.template) ? w.template(X, g) : w.template, E = db(E), w.replace) {
            if (_ = w, A = mb(E) ? [] : sd(E), e = A[0], 1 != A.length || 1 !== e.nodeType)throw ae("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", z, "");
            Y(j, X, e);
            var gb = {$attr: {}}, hb = G(e, [], gb), ib = a.splice(bb + 1, a.length - (bb + 1));
            N && M(hb), a = a.concat(hb).concat(ib), Q(g, gb), cb = a.length
          } else X.html(E);
          if (w.templateUrl)T("template", P, w, X), P = w, w.replace && (_ = w), q = R(a.splice(bb, a.length - bb), X, g, j, ab, l, m, {
            controllerDirectives: J,
            newIsolateScopeDirective: N,
            templateDirective: P,
            nonTlbTranscludeDirective: S
          }), cb = a.length; else if (w.compile)try {
            B = w.compile(X, g, ab), y(B) ? o(null, B, eb, fb) : B && o(B.pre, B.post, eb, fb)
          } catch (jb) {
            i(jb, U(X))
          }
          w.terminal && (q.terminal = !0, F = Math.max(F, w.priority))
        }
        return q.scope = v && v.scope === !0, q.transclude = V && ab, n.hasElementTranscludeDirective = W, q
      }

      function M(a) {
        for (var b = 0, c = a.length; c > b; b++)a[b] = n(a[b], {$$isolateScope: !0})
      }

      function N(b, d, f, h, j, k, l) {
        if (d === j)return null;
        var m = null;
        if (e.hasOwnProperty(d))for (var o, p = a.get(d + g), q = 0, r = p.length; r > q; q++)try {
          o = p[q], (h === c || h > o.priority) && -1 != o.restrict.indexOf(f) && (k && (o = n(o, {
            $$start: k,
            $$end: l
          })), b.push(o), m = o)
        } catch (s) {
          i(s)
        }
        return m
      }

      function Q(a, b) {
        var c = b.$attr, d = a.$attr, e = a.$$element;
        f(a, function (d, e) {
          "$" != e.charAt(0) && (b[e] && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
        }), f(b, function (b, f) {
          "class" == f ? (D(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
        })
      }

      function R(a, b, c, d, e, g, h, i) {
        var j, k, n = [], p = b[0], q = a.shift(), r = l({}, q, {
          templateUrl: null,
          transclude: null,
          replace: null,
          $$originalDirective: q
        }), s = y(q.templateUrl) ? q.templateUrl(b, c) : q.templateUrl;
        return b.empty(), m.get(z.getTrustedResourceUrl(s), {cache: o}).success(function (l) {
          var m, o, u, v;
          if (l = db(l), q.replace) {
            if (u = mb(l) ? [] : sd(l), m = u[0], 1 != u.length || 1 !== m.nodeType)throw ae("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", q.name, s);
            o = {$attr: {}}, Y(d, b, m);
            var w = G(m, [], o);
            t(q.scope) && M(w), a = w.concat(a), Q(c, o)
          } else m = p, b.html(l);
          for (a.unshift(r), j = J(a, m, c, e, b, q, g, h, i), f(d, function (a, c) {
            a == m && (d[c] = b[0])
          }), k = E(b[0].childNodes, e); n.length;) {
            var x = n.shift(), y = n.shift(), z = n.shift(), A = n.shift(), B = b[0];
            if (y !== p) {
              var C = y.className;
              i.hasElementTranscludeDirective && q.replace || (B = qb(m)), Y(z, sd(y), B), D(sd(B), C)
            }
            v = j.transclude ? F(x, j.transclude) : A, j(k, x, B, d, v)
          }
          n = null
        }).error(function (a, b, c, d) {
          throw ae("tpload", "Failed to load template: {0}", d.url)
        }), function (a, b, c, d, e) {
          n ? (n.push(b), n.push(c), n.push(d), n.push(e)) : j(k, b, c, d, e)
        }
      }

      function S(a, b) {
        var c = b.priority - a.priority;
        return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
      }

      function T(a, b, c, d) {
        if (b)throw ae("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", b.name, c.name, a, U(d))
      }

      function V(a, b) {
        var c = d(b, !0);
        c && a.push({
          priority: 0, compile: q(function (a, b) {
            var d = b.parent(), e = d.data("$binding") || [];
            e.push(c), D(d.data("$binding", e), "ng-binding"), a.$watch(c, function (a) {
              b[0].nodeValue = a
            })
          })
        })
      }

      function W(a, b) {
        if ("srcdoc" == b)return z.HTML;
        var c = vd(a);
        return "xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b) ? z.RESOURCE_URL : void 0
      }

      function X(a, b, c, e) {
        var f = d(c, !0);
        if (f) {
          if ("multiple" === e && "SELECT" === vd(a))throw ae("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", U(a));
          b.push({
            priority: 100, compile: function () {
              return {
                pre: function (b, c, g) {
                  var h = g.$$observers || (g.$$observers = {});
                  if (k.test(e))throw ae("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                  f = d(g[e], !0, W(a, e)), f && (g[e] = f(b), (h[e] || (h[e] = [])).$$inter = !0, (g.$$observers && g.$$observers[e].$$scope || b).$watch(f, function (a, b) {
                    "class" === e && a != b ? g.$updateClass(a, b) : g.$set(e, a)
                  }))
                }
              }
            }
          })
        }
      }

      function Y(a, c, d) {
        var e, f, g = c[0], h = c.length, i = g.parentNode;
        if (a)for (e = 0, f = a.length; f > e; e++)if (a[e] == g) {
          a[e++] = d;
          for (var j = e, k = j + h - 1, l = a.length; l > j; j++, k++)l > k ? a[j] = a[k] : delete a[j];
          a.length -= h - 1;
          break
        }
        i && i.replaceChild(d, g);
        var m = b.createDocumentFragment();
        m.appendChild(g), d[sd.expando] = g[sd.expando];
        for (var n = 1, o = c.length; o > n; n++) {
          var p = c[n];
          sd(p).remove(), m.appendChild(p), delete c[n]
        }
        c[0] = d, c.length = 1
      }

      function Z(a, b) {
        return l(function () {
          return a.apply(null, arguments)
        }, a, b)
      }

      var $ = function (a, b) {
        this.$$element = a, this.$attr = b || {}
      };
      $.prototype = {
        $normalize: Qb, $addClass: function (a) {
          a && a.length > 0 && A.addClass(this.$$element, a)
        }, $removeClass: function (a) {
          a && a.length > 0 && A.removeClass(this.$$element, a)
        }, $updateClass: function (a, b) {
          var c = Rb(a, b), d = Rb(b, a);
          0 === c.length ? A.removeClass(this.$$element, d) : 0 === d.length ? A.addClass(this.$$element, c) : A.setClass(this.$$element, c, d)
        }, $set: function (a, b, d, e) {
          var g, h = Db(this.$$element[0], a);
          h && (this.$$element.prop(a, b), e = h), this[a] = b, e ? this.$attr[a] = e : (e = this.$attr[a], e || (this.$attr[a] = e = ab(a, "-"))), g = vd(this.$$element), ("A" === g && "href" === a || "IMG" === g && "src" === a) && (this[a] = b = B(b, "src" === a)), d !== !1 && (null === b || b === c ? this.$$element.removeAttr(e) : this.$$element.attr(e, b));
          var j = this.$$observers;
          j && f(j[a], function (a) {
            try {
              a(b)
            } catch (c) {
              i(c)
            }
          })
        }, $observe: function (a, b) {
          var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
          return e.push(b), v.$evalAsync(function () {
            e.$$inter || b(c[a])
          }), b
        }
      };
      var _ = d.startSymbol(), bb = d.endSymbol(), db = "{{" == _ || "}}" == bb ? p : function (a) {
        return a.replace(/\{\{/g, _).replace(/}}/g, bb)
      }, eb = /^ngAttr[A-Z]/;
      return C
    }]
  }

  function Qb(a) {
    return kb(a.replace(be, ""))
  }

  function Rb(a, b) {
    var c = "", d = a.split(/\s+/), e = b.split(/\s+/);
    a:for (var f = 0; f < d.length; f++) {
      for (var g = d[f], h = 0; h < e.length; h++)if (g == e[h])continue a;
      c += (c.length > 0 ? " " : "") + g
    }
    return c
  }

  function Sb() {
    var a = {}, b = /^(\S+)(\s+as\s+(\w+))?$/;
    this.register = function (b, c) {
      eb(b, "controller"), t(b) ? l(a, b) : a[b] = c
    }, this.$get = ["$injector", "$window", function (c, e) {
      return function (f, g) {
        var h, i, j, k;
        if (u(f) && (i = f.match(b), j = i[1], k = i[3], f = a.hasOwnProperty(j) ? a[j] : fb(g.$scope, j, !0) || fb(e, j, !0), db(f, j, !0)), h = c.instantiate(f, g), k) {
          if (!g || "object" != typeof g.$scope)throw d("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", j || f.name, k);
          g.$scope[k] = h
        }
        return h
      }
    }]
  }

  function Tb() {
    this.$get = ["$window", function (a) {
      return sd(a.document)
    }]
  }

  function Ub() {
    this.$get = ["$log", function (a) {
      return function () {
        a.error.apply(a, arguments)
      }
    }]
  }

  function Vb(a) {
    var b, c, d, e = {};
    return a ? (f(a.split("\n"), function (a) {
      d = a.indexOf(":"), b = md(Cd(a.substr(0, d))), c = Cd(a.substr(d + 1)), b && (e[b] ? e[b] += ", " + c : e[b] = c)
    }), e) : e
  }

  function Wb(a) {
    var b = t(a) ? a : c;
    return function (c) {
      return b || (b = Vb(a)), c ? b[md(c)] || null : b
    }
  }

  function Xb(a, b, c) {
    return y(c) ? c(a, b) : (f(c, function (c) {
      a = c(a, b)
    }), a)
  }

  function Yb(a) {
    return a >= 200 && 300 > a
  }

  function Zb() {
    var a = /^\s*(\[|\{[^\{])/, b = /[\}\]]\s*$/, d = /^\)\]\}',?\n/, e = {"Content-Type": "application/json;charset=utf-8"}, g = this.defaults = {
      transformResponse: [function (c) {
        return u(c) && (c = c.replace(d, ""), a.test(c) && b.test(c) && (c = S(c))), c
      }],
      transformRequest: [function (a) {
        return !t(a) || C(a) || D(a) ? a : R(a)
      }],
      headers: {common: {Accept: "application/json, text/plain, */*"}, post: J(e), put: J(e), patch: J(e)},
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN"
    }, i = this.interceptors = [], j = this.responseInterceptors = [];
    this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function (a, b, d, e, k, m) {
      function n(a) {
        function d(a) {
          var b = l({}, a, {data: Xb(a.data, a.headers, h.transformResponse)});
          return Yb(a.status) ? b : k.reject(b)
        }

        function e(a) {
          function b(a) {
            var b;
            f(a, function (c, d) {
              y(c) && (b = c(), null != b ? a[d] = b : delete a[d])
            })
          }

          var c, d, e, h = g.headers, i = l({}, a.headers);
          h = l({}, h.common, h[md(a.method)]), b(h), b(i);
          a:for (c in h) {
            d = md(c);
            for (e in i)if (md(e) === d)continue a;
            i[c] = h[c]
          }
          return i
        }

        var h = {method: "get", transformRequest: g.transformRequest, transformResponse: g.transformResponse}, i = e(a);
        l(h, a), h.headers = i, h.method = od(h.method);
        var j = Nc(h.url) ? b.cookies()[h.xsrfCookieName || g.xsrfCookieName] : c;
        j && (i[h.xsrfHeaderName || g.xsrfHeaderName] = j);
        var m = function (a) {
          i = a.headers;
          var b = Xb(a.data, Wb(i), a.transformRequest);
          return r(a.data) && f(i, function (a, b) {
            "content-type" === md(b) && delete i[b]
          }), r(a.withCredentials) && !r(g.withCredentials) && (a.withCredentials = g.withCredentials), q(a, b, i).then(d, d)
        }, n = [m, c], o = k.when(h);
        for (f(z, function (a) {
          (a.request || a.requestError) && n.unshift(a.request, a.requestError), (a.response || a.responseError) && n.push(a.response, a.responseError)
        }); n.length;) {
          var p = n.shift(), s = n.shift();
          o = o.then(p, s)
        }
        return o.success = function (a) {
          return o.then(function (b) {
            a(b.data, b.status, b.headers, h)
          }), o
        }, o.error = function (a) {
          return o.then(null, function (b) {
            a(b.data, b.status, b.headers, h)
          }), o
        }, o
      }

      function o() {
        f(arguments, function (a) {
          n[a] = function (b, c) {
            return n(l(c || {}, {method: a, url: b}))
          }
        })
      }

      function p() {
        f(arguments, function (a) {
          n[a] = function (b, c, d) {
            return n(l(d || {}, {method: a, url: b, data: c}))
          }
        })
      }

      function q(b, c, d) {
        function f(a, b, c, d) {
          j && (Yb(a) ? j.put(p, [a, b, Vb(c), d]) : j.remove(p)), h(b, a, c, d), e.$$phase || e.$apply()
        }

        function h(a, c, d, e) {
          c = Math.max(c, 0), (Yb(c) ? m.resolve : m.reject)({
            data: a,
            status: c,
            headers: Wb(d),
            config: b,
            statusText: e
          })
        }

        function i() {
          var a = H(n.pendingRequests, b);
          -1 !== a && n.pendingRequests.splice(a, 1)
        }

        var j, l, m = k.defer(), o = m.promise, p = v(b.url, b.params);
        if (n.pendingRequests.push(b), o.then(i, i), (b.cache || g.cache) && b.cache !== !1 && "GET" == b.method && (j = t(b.cache) ? b.cache : t(g.cache) ? g.cache : w), j)if (l = j.get(p), s(l)) {
          if (l.then)return l.then(i, i), l;
          x(l) ? h(l[1], l[0], J(l[2]), l[3]) : h(l, 200, {}, "OK")
        } else j.put(p, o);
        return r(l) && a(b.method, p, c, f, d, b.timeout, b.withCredentials, b.responseType), o
      }

      function v(a, b) {
        if (!b)return a;
        var c = [];
        return h(b, function (a, b) {
          null === a || r(a) || (x(a) || (a = [a]), f(a, function (a) {
            t(a) && (a = R(a)), c.push(Z(b) + "=" + Z(a))
          }))
        }), c.length > 0 && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")), a
      }

      var w = d("$http"), z = [];
      return f(i, function (a) {
        z.unshift(u(a) ? m.get(a) : m.invoke(a))
      }), f(j, function (a, b) {
        var c = u(a) ? m.get(a) : m.invoke(a);
        z.splice(b, 0, {
          response: function (a) {
            return c(k.when(a))
          }, responseError: function (a) {
            return c(k.reject(a))
          }
        })
      }), n.pendingRequests = [], o("get", "delete", "head", "jsonp"), p("post", "put"), n.defaults = g, n
    }]
  }

  function $b(b) {
    if (8 >= rd && (!b.match(/^(get|post|head|put|delete|options)$/i) || !a.XMLHttpRequest))return new a.ActiveXObject("Microsoft.XMLHTTP");
    if (a.XMLHttpRequest)return new a.XMLHttpRequest;
    throw d("$httpBackend")("noxhr", "This browser does not support XMLHttpRequest.")
  }

  function _b() {
    this.$get = ["$browser", "$window", "$document", function (a, b, c) {
      return ac(a, $b, a.defer, b.angular.callbacks, c[0])
    }]
  }

  function ac(a, b, c, d, e) {
    function g(a, b) {
      var c = e.createElement("script"), d = function () {
        c.onreadystatechange = c.onload = c.onerror = null, e.body.removeChild(c), b && b()
      };
      return c.type = "text/javascript", c.src = a, rd && 8 >= rd ? c.onreadystatechange = function () {
        /loaded|complete/.test(c.readyState) && d()
      } : c.onload = c.onerror = function () {
        d()
      }, e.body.appendChild(c), d
    }

    var h = -1;
    return function (e, i, j, k, l, m, n, p) {
      function q() {
        t = h, v && v(), w && w.abort()
      }

      function r(b, d, e, f, g) {
        y && c.cancel(y), v = w = null, 0 === d && (d = e ? 200 : "file" == Mc(i).protocol ? 404 : 0), d = 1223 === d ? 204 : d, g = g || "", b(d, e, f, g), a.$$completeOutstandingRequest(o)
      }

      var t;
      if (a.$$incOutstandingRequestCount(), i = i || a.url(), "jsonp" == md(e)) {
        var u = "_" + (d.counter++).toString(36);
        d[u] = function (a) {
          d[u].data = a
        };
        var v = g(i.replace("JSON_CALLBACK", "angular.callbacks." + u), function () {
          d[u].data ? r(k, 200, d[u].data) : r(k, t || -2), d[u] = Ad.noop
        })
      } else {
        var w = b(e);
        if (w.open(e, i, !0), f(l, function (a, b) {
            s(a) && w.setRequestHeader(b, a)
          }), w.onreadystatechange = function () {
            if (w && 4 == w.readyState) {
              var a = null, b = null;
              t !== h && (a = w.getAllResponseHeaders(), b = "response"in w ? w.response : w.responseText), r(k, t || w.status, b, a, w.statusText || "")
            }
          }, n && (w.withCredentials = !0), p)try {
          w.responseType = p
        } catch (x) {
          if ("json" !== p)throw x
        }
        w.send(j || null)
      }
      if (m > 0)var y = c(q, m); else m && m.then && m.then(q)
    }
  }

  function bc() {
    var a = "{{", b = "}}";
    this.startSymbol = function (b) {
      return b ? (a = b, this) : a
    }, this.endSymbol = function (a) {
      return a ? (b = a, this) : b
    }, this.$get = ["$parse", "$exceptionHandler", "$sce", function (c, d, e) {
      function f(f, i, j) {
        for (var k, l, m, n, o = 0, p = [], q = f.length, s = !1, t = []; q > o;)-1 != (k = f.indexOf(a, o)) && -1 != (l = f.indexOf(b, k + g)) ? (o != k && p.push(f.substring(o, k)), p.push(m = c(n = f.substring(k + g, l))), m.exp = n, o = l + h, s = !0) : (o != q && p.push(f.substring(o)), o = q);
        if ((q = p.length) || (p.push(""), q = 1), j && p.length > 1)throw ce("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", f);
        return !i || s ? (t.length = q, m = function (a) {
          try {
            for (var b, c = 0, g = q; g > c; c++)"function" == typeof(b = p[c]) && (b = b(a), b = j ? e.getTrusted(j, b) : e.valueOf(b), null === b || r(b) ? b = "" : "string" != typeof b && (b = R(b))), t[c] = b;
            return t.join("")
          } catch (h) {
            var i = ce("interr", "Can't interpolate: {0}\n{1}", f, h.toString());
            d(i)
          }
        }, m.exp = f, m.parts = p, m) : void 0
      }

      var g = a.length, h = b.length;
      return f.startSymbol = function () {
        return a
      }, f.endSymbol = function () {
        return b
      }, f
    }]
  }

  function cc() {
    this.$get = ["$rootScope", "$window", "$q", function (a, b, c) {
      function d(d, f, g, h) {
        var i = b.setInterval, j = b.clearInterval, k = c.defer(), l = k.promise, m = 0, n = s(h) && !h;
        return g = s(g) ? g : 0, l.then(null, null, d), l.$$intervalId = i(function () {
          k.notify(m++), g > 0 && m >= g && (k.resolve(m), j(l.$$intervalId), delete e[l.$$intervalId]), n || a.$apply()
        }, f), e[l.$$intervalId] = k, l
      }

      var e = {};
      return d.cancel = function (a) {
        return a && a.$$intervalId in e ? (e[a.$$intervalId].reject("canceled"), clearInterval(a.$$intervalId), delete e[a.$$intervalId], !0) : !1
      }, d
    }]
  }

  function dc() {
    this.$get = function () {
      return {
        id: "en-us",
        NUMBER_FORMATS: {
          DECIMAL_SEP: ".",
          GROUP_SEP: ",",
          PATTERNS: [{
            minInt: 1,
            minFrac: 0,
            maxFrac: 3,
            posPre: "",
            posSuf: "",
            negPre: "-",
            negSuf: "",
            gSize: 3,
            lgSize: 3
          }, {
            minInt: 1,
            minFrac: 2,
            maxFrac: 2,
            posPre: "¤",
            posSuf: "",
            negPre: "(¤",
            negSuf: ")",
            gSize: 3,
            lgSize: 3
          }],
          CURRENCY_SYM: "$"
        },
        DATETIME_FORMATS: {
          MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
          SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
          DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
          SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
          AMPMS: ["AM", "PM"],
          medium: "MMM d, y h:mm:ss a",
          "short": "M/d/yy h:mm a",
          fullDate: "EEEE, MMMM d, y",
          longDate: "MMMM d, y",
          mediumDate: "MMM d, y",
          shortDate: "M/d/yy",
          mediumTime: "h:mm:ss a",
          shortTime: "h:mm a"
        },
        pluralCat: function (a) {
          return 1 === a ? "one" : "other"
        }
      }
    }
  }

  function ec(a) {
    for (var b = a.split("/"), c = b.length; c--;)b[c] = Y(b[c]);
    return b.join("/")
  }

  function fc(a, b, c) {
    var d = Mc(a, c);
    b.$$protocol = d.protocol, b.$$host = d.hostname, b.$$port = m(d.port) || ee[d.protocol] || null
  }

  function gc(a, b, c) {
    var d = "/" !== a.charAt(0);
    d && (a = "/" + a);
    var e = Mc(a, c);
    b.$$path = decodeURIComponent(d && "/" === e.pathname.charAt(0) ? e.pathname.substring(1) : e.pathname), b.$$search = W(e.search), b.$$hash = decodeURIComponent(e.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
  }

  function hc(a, b) {
    return 0 === b.indexOf(a) ? b.substr(a.length) : void 0
  }

  function ic(a) {
    var b = a.indexOf("#");
    return -1 == b ? a : a.substr(0, b)
  }

  function jc(a) {
    return a.substr(0, ic(a).lastIndexOf("/") + 1)
  }

  function kc(a) {
    return a.substring(0, a.indexOf("/", a.indexOf("//") + 2))
  }

  function lc(a, b) {
    this.$$html5 = !0, b = b || "";
    var d = jc(a);
    fc(a, this, a), this.$$parse = function (b) {
      var c = hc(d, b);
      if (!u(c))throw fe("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', b, d);
      gc(c, this, a), this.$$path || (this.$$path = "/"), this.$$compose()
    }, this.$$compose = function () {
      var a = X(this.$$search), b = this.$$hash ? "#" + Y(this.$$hash) : "";
      this.$$url = ec(this.$$path) + (a ? "?" + a : "") + b, this.$$absUrl = d + this.$$url.substr(1)
    }, this.$$rewrite = function (e) {
      var f, g;
      return (f = hc(a, e)) !== c ? (g = f, (f = hc(b, f)) !== c ? d + (hc("/", f) || f) : a + g) : (f = hc(d, e)) !== c ? d + f : d == e + "/" ? d : void 0
    }
  }

  function mc(a, b) {
    var c = jc(a);
    fc(a, this, a), this.$$parse = function (d) {
      function e(a, b, c) {
        var d, e = /^\/?.*?:(\/.*)/;
        return 0 === b.indexOf(c) && (b = b.replace(c, "")), e.exec(b) ? a : (d = e.exec(a), d ? d[1] : a)
      }

      var f = hc(a, d) || hc(c, d), g = "#" == f.charAt(0) ? hc(b, f) : this.$$html5 ? f : "";
      if (!u(g))throw fe("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', d, b);
      gc(g, this, a), this.$$path = e(this.$$path, g, a), this.$$compose()
    }, this.$$compose = function () {
      var c = X(this.$$search), d = this.$$hash ? "#" + Y(this.$$hash) : "";
      this.$$url = ec(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + (this.$$url ? b + this.$$url : "")
    }, this.$$rewrite = function (b) {
      return ic(a) == ic(b) ? b : void 0
    }
  }

  function nc(a, b) {
    this.$$html5 = !0, mc.apply(this, arguments);
    var c = jc(a);
    this.$$rewrite = function (d) {
      var e;
      return a == ic(d) ? d : (e = hc(c, d)) ? a + b + e : c === d + "/" ? c : void 0
    }
  }

  function oc(a) {
    return function () {
      return this[a]
    }
  }

  function pc(a, b) {
    return function (c) {
      return r(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
    }
  }

  function qc() {
    var b = "", c = !1;
    this.hashPrefix = function (a) {
      return s(a) ? (b = a, this) : b
    }, this.html5Mode = function (a) {
      return s(a) ? (c = a, this) : c
    }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function (d, e, f, g) {
      function h(a) {
        d.$broadcast("$locationChangeSuccess", i.absUrl(), a)
      }

      var i, j, k, l = e.baseHref(), m = e.url();
      c ? (k = kc(m) + (l || "/"), j = f.history ? lc : nc) : (k = ic(m), j = mc), i = new j(k, "#" + b), i.$$parse(i.$$rewrite(m)), g.on("click", function (b) {
        if (!b.ctrlKey && !b.metaKey && 2 != b.which) {
          for (var c = sd(b.target); "a" !== md(c[0].nodeName);)if (c[0] === g[0] || !(c = c.parent())[0])return;
          var f = c.prop("href");
          t(f) && "[object SVGAnimatedString]" === f.toString() && (f = Mc(f.animVal).href);
          var h = i.$$rewrite(f);
          f && !c.attr("target") && h && !b.isDefaultPrevented() && (b.preventDefault(), h != e.url() && (i.$$parse(h), d.$apply(), a.angular["ff-684208-preventDefault"] = !0))
        }
      }), i.absUrl() != m && e.url(i.absUrl(), !0), e.onUrlChange(function (a) {
        i.absUrl() != a && (d.$evalAsync(function () {
          var b = i.absUrl();
          i.$$parse(a), d.$broadcast("$locationChangeStart", a, b).defaultPrevented ? (i.$$parse(b), e.url(b)) : h(b)
        }), d.$$phase || d.$digest())
      });
      var n = 0;
      return d.$watch(function () {
        var a = e.url(), b = i.$$replace;
        return n && a == i.absUrl() || (n++, d.$evalAsync(function () {
          d.$broadcast("$locationChangeStart", i.absUrl(), a).defaultPrevented ? i.$$parse(a) : (e.url(i.absUrl(), b), h(a))
        })), i.$$replace = !1, n
      }), i
    }]
  }

  function rc() {
    var a = !0, b = this;
    this.debugEnabled = function (b) {
      return s(b) ? (a = b, this) : a
    }, this.$get = ["$window", function (c) {
      function d(a) {
        return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
      }

      function e(a) {
        var b = c.console || {}, e = b[a] || b.log || o, g = !1;
        try {
          g = !!e.apply
        } catch (h) {
        }
        return g ? function () {
          var a = [];
          return f(arguments, function (b) {
            a.push(d(b))
          }), e.apply(b, a)
        } : function (a, b) {
          e(a, null == b ? "" : b)
        }
      }

      return {
        log: e("log"), info: e("info"), warn: e("warn"), error: e("error"), debug: function () {
          var c = e("debug");
          return function () {
            a && c.apply(b, arguments)
          }
        }()
      }
    }]
  }

  function sc(a, b) {
    if ("constructor" === a)throw he("isecfld", 'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}', b);
    return a
  }

  function tc(a, b) {
    if (a) {
      if (a.constructor === a)throw he("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
      if (a.document && a.location && a.alert && a.setInterval)throw he("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", b);
      if (a.children && (a.nodeName || a.prop && a.attr && a.find))throw he("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", b)
    }
    return a
  }

  function uc(a, b, d, e, f) {
    f = f || {};
    for (var g, h = b.split("."), i = 0; h.length > 1; i++) {
      g = sc(h.shift(), e);
      var j = a[g];
      j || (j = {}, a[g] = j), a = j, a.then && f.unwrapPromises && (ge(e), "$$v"in a || !function (a) {
        a.then(function (b) {
          a.$$v = b
        })
      }(a), a.$$v === c && (a.$$v = {}), a = a.$$v)
    }
    return g = sc(h.shift(), e), a[g] = d, d
  }

  function vc(a, b, d, e, f, g, h) {
    return sc(a, g), sc(b, g), sc(d, g), sc(e, g), sc(f, g), h.unwrapPromises ? function (h, i) {
      var j, k = i && i.hasOwnProperty(a) ? i : h;
      return null == k ? k : (k = k[a], k && k.then && (ge(g), "$$v"in k || (j = k, j.$$v = c, j.then(function (a) {
        j.$$v = a
      })), k = k.$$v), b ? null == k ? c : (k = k[b], k && k.then && (ge(g), "$$v"in k || (j = k, j.$$v = c, j.then(function (a) {
        j.$$v = a
      })), k = k.$$v), d ? null == k ? c : (k = k[d], k && k.then && (ge(g), "$$v"in k || (j = k, j.$$v = c, j.then(function (a) {
        j.$$v = a
      })), k = k.$$v), e ? null == k ? c : (k = k[e], k && k.then && (ge(g), "$$v"in k || (j = k, j.$$v = c, j.then(function (a) {
        j.$$v = a
      })), k = k.$$v), f ? null == k ? c : (k = k[f], k && k.then && (ge(g), "$$v"in k || (j = k, j.$$v = c, j.then(function (a) {
        j.$$v = a
      })), k = k.$$v), k) : k) : k) : k) : k)
    } : function (g, h) {
      var i = h && h.hasOwnProperty(a) ? h : g;
      return null == i ? i : (i = i[a], b ? null == i ? c : (i = i[b], d ? null == i ? c : (i = i[d], e ? null == i ? c : (i = i[e], f ? null == i ? c : i = i[f] : i) : i) : i) : i)
    }
  }

  function wc(a, b) {
    return sc(a, b), function (b, d) {
      return null == b ? c : (d && d.hasOwnProperty(a) ? d : b)[a]
    }
  }

  function xc(a, b, d) {
    return sc(a, d), sc(b, d), function (d, e) {
      return null == d ? c : (d = (e && e.hasOwnProperty(a) ? e : d)[a], null == d ? c : d[b])
    }
  }

  function yc(a, b, d) {
    if (ne.hasOwnProperty(a))return ne[a];
    var e, g = a.split("."), h = g.length;
    if (b.unwrapPromises || 1 !== h)if (b.unwrapPromises || 2 !== h)if (b.csp)e = 6 > h ? vc(g[0], g[1], g[2], g[3], g[4], d, b) : function (a, e) {
      var f, i = 0;
      do f = vc(g[i++], g[i++], g[i++], g[i++], g[i++], d, b)(a, e), e = c, a = f; while (h > i);
      return f
    }; else {
      var i = "var p;\n";
      f(g, function (a, c) {
        sc(a, d), i += "if(s == null) return undefined;\ns=" + (c ? "s" : '((k&&k.hasOwnProperty("' + a + '"))?k:s)') + '["' + a + '"];\n' + (b.unwrapPromises ? 'if (s && s.then) {\n pw("' + d.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "")
      }), i += "return s;";
      var j = new Function("s", "k", "pw", i);
      j.toString = q(i), e = b.unwrapPromises ? function (a, b) {
        return j(a, b, ge)
      } : j
    } else e = xc(g[0], g[1], d); else e = wc(g[0], d);
    return "hasOwnProperty" !== a && (ne[a] = e), e
  }

  function zc() {
    var a = {}, b = {csp: !1, unwrapPromises: !1, logPromiseWarnings: !0};
    this.unwrapPromises = function (a) {
      return s(a) ? (b.unwrapPromises = !!a, this) : b.unwrapPromises
    }, this.logPromiseWarnings = function (a) {
      return s(a) ? (b.logPromiseWarnings = a, this) : b.logPromiseWarnings
    }, this.$get = ["$filter", "$sniffer", "$log", function (c, d, e) {
      return b.csp = d.csp, ge = function (a) {
        b.logPromiseWarnings && !ie.hasOwnProperty(a) && (ie[a] = !0, e.warn("[$parse] Promise found in the expression `" + a + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
      }, function (d) {
        var e;
        switch (typeof d) {
          case"string":
            if (a.hasOwnProperty(d))return a[d];
            var f = new le(b), g = new me(f, c, b);
            return e = g.parse(d, !1), "hasOwnProperty" !== d && (a[d] = e), e;
          case"function":
            return d;
          default:
            return o
        }
      }
    }]
  }

  function Ac() {
    this.$get = ["$rootScope", "$exceptionHandler", function (a, b) {
      return Bc(function (b) {
        a.$evalAsync(b)
      }, b)
    }]
  }

  function Bc(a, b) {
    function d(a) {
      return a
    }

    function e(a) {
      return j(a)
    }

    function g(a) {
      var b = h(), c = 0, d = x(a) ? [] : {};
      return f(a, function (a, e) {
        c++, i(a).then(function (a) {
          d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
        }, function (a) {
          d.hasOwnProperty(e) || b.reject(a)
        })
      }), 0 === c && b.resolve(d), b.promise
    }

    var h = function () {
      var f, g, j = [];
      return g = {
        resolve: function (b) {
          if (j) {
            var d = j;
            j = c, f = i(b), d.length && a(function () {
              for (var a, b = 0, c = d.length; c > b; b++)a = d[b], f.then(a[0], a[1], a[2])
            })
          }
        }, reject: function (a) {
          g.resolve(k(a))
        }, notify: function (b) {
          if (j) {
            var c = j;
            j.length && a(function () {
              for (var a, d = 0, e = c.length; e > d; d++)a = c[d], a[2](b)
            })
          }
        }, promise: {
          then: function (a, c, g) {
            var i = h(), k = function (c) {
              try {
                i.resolve((y(a) ? a : d)(c))
              } catch (e) {
                i.reject(e), b(e)
              }
            }, l = function (a) {
              try {
                i.resolve((y(c) ? c : e)(a))
              } catch (d) {
                i.reject(d), b(d)
              }
            }, m = function (a) {
              try {
                i.notify((y(g) ? g : d)(a))
              } catch (c) {
                b(c)
              }
            };
            return j ? j.push([k, l, m]) : f.then(k, l, m), i.promise
          }, "catch": function (a) {
            return this.then(null, a)
          }, "finally": function (a) {
            function b(a, b) {
              var c = h();
              return b ? c.resolve(a) : c.reject(a), c.promise
            }

            function c(c, e) {
              var f = null;
              try {
                f = (a || d)()
              } catch (g) {
                return b(g, !1)
              }
              return f && y(f.then) ? f.then(function () {
                return b(c, e)
              }, function (a) {
                return b(a, !1)
              }) : b(c, e)
            }

            return this.then(function (a) {
              return c(a, !0)
            }, function (a) {
              return c(a, !1)
            })
          }
        }
      }
    }, i = function (b) {
      return b && y(b.then) ? b : {
        then: function (c) {
          var d = h();
          return a(function () {
            d.resolve(c(b))
          }), d.promise
        }
      }
    }, j = function (a) {
      var b = h();
      return b.reject(a), b.promise
    }, k = function (c) {
      return {
        then: function (d, f) {
          var g = h();
          return a(function () {
            try {
              g.resolve((y(f) ? f : e)(c))
            } catch (a) {
              g.reject(a), b(a)
            }
          }), g.promise
        }
      }
    }, l = function (c, f, g, k) {
      var l, m = h(), n = function (a) {
        try {
          return (y(f) ? f : d)(a)
        } catch (c) {
          return b(c), j(c)
        }
      }, o = function (a) {
        try {
          return (y(g) ? g : e)(a)
        } catch (c) {
          return b(c), j(c)
        }
      }, p = function (a) {
        try {
          return (y(k) ? k : d)(a)
        } catch (c) {
          b(c)
        }
      };
      return a(function () {
        i(c).then(function (a) {
          l || (l = !0, m.resolve(i(a).then(n, o, p)))
        }, function (a) {
          l || (l = !0, m.resolve(o(a)))
        }, function (a) {
          l || m.notify(p(a))
        })
      }), m.promise
    };
    return {defer: h, reject: j, when: l, all: g}
  }

  function Cc() {
    this.$get = ["$window", "$timeout", function (a, b) {
      var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame, d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.webkitCancelRequestAnimationFrame, e = !!c, f = e ? function (a) {
        var b = c(a);
        return function () {
          d(b)
        }
      } : function (a) {
        var c = b(a, 16.66, !1);
        return function () {
          b.cancel(c)
        }
      };
      return f.supported = e, f
    }]
  }

  function Dc() {
    var a = 10, b = d("$rootScope"), c = null;
    this.digestTtl = function (b) {
      return arguments.length && (a = b), a
    }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function (d, g, h, i) {
      function k() {
        this.$id = j(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [], this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = {}
      }

      function l(a) {
        if (r.$$phase)throw b("inprog", "{0} already in progress", r.$$phase);
        r.$$phase = a
      }

      function m() {
        r.$$phase = null
      }

      function n(a, b) {
        var c = h(a);
        return db(c, b), c
      }

      function p(a, b, c) {
        do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent)
      }

      function q() {
      }

      k.prototype = {
        constructor: k, $new: function (a) {
          var b, c;
          return a ? (c = new k, c.$root = this.$root, c.$$asyncQueue = this.$$asyncQueue, c.$$postDigestQueue = this.$$postDigestQueue) : (b = function () {
          }, b.prototype = this, c = new b, c.$id = j()), c["this"] = c, c.$$listeners = {}, c.$$listenerCount = {}, c.$parent = this, c.$$watchers = c.$$nextSibling = c.$$childHead = c.$$childTail = null, c.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = c, this.$$childTail = c) : this.$$childHead = this.$$childTail = c, c
        }, $watch: function (a, b, d) {
          var e = this, f = n(a, "watch"), g = e.$$watchers, h = {fn: b, last: q, get: f, exp: a, eq: !!d};
          if (c = null, !y(b)) {
            var i = n(b || o, "listener");
            h.fn = function (a, b, c) {
              i(c)
            }
          }
          if ("string" == typeof a && f.constant) {
            var j = h.fn;
            h.fn = function (a, b, c) {
              j.call(this, a, b, c), I(g, h)
            }
          }
          return g || (g = e.$$watchers = []), g.unshift(h), function () {
            I(g, h), c = null
          }
        }, $watchCollection: function (a, b) {
          function c() {
            f = m(j);
            var a, b;
            if (t(f))if (e(f)) {
              g !== n && (g = n, q = g.length = 0, l++), a = f.length, q !== a && (l++, g.length = q = a);
              for (var c = 0; a > c; c++) {
                var d = g[c] !== g[c] && f[c] !== f[c];
                d || g[c] === f[c] || (l++, g[c] = f[c])
              }
            } else {
              g !== o && (g = o = {}, q = 0, l++), a = 0;
              for (b in f)f.hasOwnProperty(b) && (a++, g.hasOwnProperty(b) ? g[b] !== f[b] && (l++, g[b] = f[b]) : (q++, g[b] = f[b], l++));
              if (q > a) {
                l++;
                for (b in g)g.hasOwnProperty(b) && !f.hasOwnProperty(b) && (q--, delete g[b])
              }
            } else g !== f && (g = f, l++);
            return l
          }

          function d() {
            if (p ? (p = !1, b(f, f, j)) : b(f, i, j), k)if (t(f))if (e(f)) {
              i = new Array(f.length);
              for (var a = 0; a < f.length; a++)i[a] = f[a]
            } else {
              i = {};
              for (var c in f)nd.call(f, c) && (i[c] = f[c])
            } else i = f
          }

          var f, g, i, j = this, k = b.length > 1, l = 0, m = h(a), n = [], o = {}, p = !0, q = 0;
          return this.$watch(c, d)
        }, $digest: function () {
          var d, e, f, h, i, j, k, n, o, p, r, s = this.$$asyncQueue, t = this.$$postDigestQueue, u = a, v = this, w = [];
          l("$digest"), c = null;
          do {
            for (j = !1, n = v; s.length;) {
              try {
                r = s.shift(), r.scope.$eval(r.expression)
              } catch (x) {
                m(), g(x)
              }
              c = null
            }
            a:do {
              if (h = n.$$watchers)for (i = h.length; i--;)try {
                if (d = h[i])if ((e = d.get(n)) === (f = d.last) || (d.eq ? L(e, f) : "number" == typeof e && "number" == typeof f && isNaN(e) && isNaN(f))) {
                  if (d === c) {
                    j = !1;
                    break a
                  }
                } else j = !0, c = d, d.last = d.eq ? J(e) : e, d.fn(e, f === q ? e : f, n), 5 > u && (o = 4 - u, w[o] || (w[o] = []), p = y(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, p += "; newVal: " + R(e) + "; oldVal: " + R(f), w[o].push(p))
              } catch (x) {
                m(), g(x)
              }
              if (!(k = n.$$childHead || n !== v && n.$$nextSibling))for (; n !== v && !(k = n.$$nextSibling);)n = n.$parent
            } while (n = k);
            if ((j || s.length) && !u--)throw m(), b("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", a, R(w))
          } while (j || s.length);
          for (m(); t.length;)try {
            t.shift()()
          } catch (x) {
            g(x)
          }
        }, $destroy: function () {
          if (!this.$$destroyed) {
            var a = this.$parent;
            this.$broadcast("$destroy"), this.$$destroyed = !0, this !== r && (f(this.$$listenerCount, P(null, p, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy = this.$digest = this.$apply = o, this.$on = this.$watch = function () {
              return o
            })
          }
        }, $eval: function (a, b) {
          return h(a)(this, b)
        }, $evalAsync: function (a) {
          r.$$phase || r.$$asyncQueue.length || i.defer(function () {
            r.$$asyncQueue.length && r.$digest()
          }), this.$$asyncQueue.push({scope: this, expression: a})
        }, $$postDigest: function (a) {
          this.$$postDigestQueue.push(a)
        }, $apply: function (a) {
          try {
            return l("$apply"), this.$eval(a)
          } catch (b) {
            g(b)
          } finally {
            m();
            try {
              r.$digest()
            } catch (b) {
              throw g(b), b
            }
          }
        }, $on: function (a, b) {
          var c = this.$$listeners[a];
          c || (this.$$listeners[a] = c = []), c.push(b);
          var d = this;
          do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
          var e = this;
          return function () {
            c[H(c, b)] = null, p(e, 1, a)
          }
        }, $emit: function (a) {
          var b, c, d, e = [], f = this, h = !1, i = {
            name: a, targetScope: f, stopPropagation: function () {
              h = !0
            }, preventDefault: function () {
              i.defaultPrevented = !0
            }, defaultPrevented: !1
          }, j = N([i], arguments, 1);
          do {
            for (b = f.$$listeners[a] || e, i.currentScope = f, c = 0, d = b.length; d > c; c++)if (b[c])try {
              b[c].apply(null, j)
            } catch (k) {
              g(k)
            } else b.splice(c, 1), c--, d--;
            if (h)return i;
            f = f.$parent
          } while (f);
          return i
        }, $broadcast: function (a) {
          for (var b, c, d, e = this, f = e, h = e, i = {
            name: a, targetScope: e, preventDefault: function () {
              i.defaultPrevented = !0
            }, defaultPrevented: !1
          }, j = N([i], arguments, 1); f = h;) {
            for (i.currentScope = f, b = f.$$listeners[a] || [], c = 0, d = b.length; d > c; c++)if (b[c])try {
              b[c].apply(null, j)
            } catch (k) {
              g(k)
            } else b.splice(c, 1), c--, d--;
            if (!(h = f.$$listenerCount[a] && f.$$childHead || f !== e && f.$$nextSibling))for (; f !== e && !(h = f.$$nextSibling);)f = f.$parent
          }
          return i
        }
      };
      var r = new k;
      return r
    }]
  }

  function Ec() {
    var a = /^\s*(https?|ftp|mailto|tel|file):/, b = /^\s*(https?|ftp|file):|data:image\//;
    this.aHrefSanitizationWhitelist = function (b) {
      return s(b) ? (a = b, this) : a
    }, this.imgSrcSanitizationWhitelist = function (a) {
      return s(a) ? (b = a, this) : b
    }, this.$get = function () {
      return function (c, d) {
        var e, f = d ? b : a;
        return rd && !(rd >= 8) || (e = Mc(c).href, "" === e || e.match(f)) ? c : "unsafe:" + e
      }
    }
  }

  function Fc(a) {
    return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
  }

  function Gc(a) {
    if ("self" === a)return a;
    if (u(a)) {
      if (a.indexOf("***") > -1)throw oe("iwcard", "Illegal sequence *** in string matcher.  String: {0}", a);
      return a = Fc(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + a + "$")
    }
    if (z(a))return new RegExp("^" + a.source + "$");
    throw oe("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
  }

  function Hc(a) {
    var b = [];
    return s(a) && f(a, function (a) {
      b.push(Gc(a))
    }), b
  }

  function Ic() {
    this.SCE_CONTEXTS = pe;
    var a = ["self"], b = [];
    this.resourceUrlWhitelist = function (b) {
      return arguments.length && (a = Hc(b)), a
    }, this.resourceUrlBlacklist = function (a) {
      return arguments.length && (b = Hc(a)), b
    }, this.$get = ["$injector", function (d) {
      function e(a, b) {
        return "self" === a ? Nc(b) : !!a.exec(b.href)
      }

      function f(c) {
        var d, f, g = Mc(c.toString()), h = !1;
        for (d = 0, f = a.length; f > d; d++)if (e(a[d], g)) {
          h = !0;
          break
        }
        if (h)for (d = 0, f = b.length; f > d; d++)if (e(b[d], g)) {
          h = !1;
          break
        }
        return h
      }

      function g(a) {
        var b = function (a) {
          this.$$unwrapTrustedValue = function () {
            return a
          }
        };
        return a && (b.prototype = new a), b.prototype.valueOf = function () {
          return this.$$unwrapTrustedValue()
        }, b.prototype.toString = function () {
          return this.$$unwrapTrustedValue().toString()
        }, b
      }

      function h(a, b) {
        var d = m.hasOwnProperty(a) ? m[a] : null;
        if (!d)throw oe("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", a, b);
        if (null === b || b === c || "" === b)return b;
        if ("string" != typeof b)throw oe("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", a);
        return new d(b)
      }

      function i(a) {
        return a instanceof l ? a.$$unwrapTrustedValue() : a
      }

      function j(a, b) {
        if (null === b || b === c || "" === b)return b;
        var d = m.hasOwnProperty(a) ? m[a] : null;
        if (d && b instanceof d)return b.$$unwrapTrustedValue();
        if (a === pe.RESOURCE_URL) {
          if (f(b))return b;
          throw oe("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", b.toString())
        }
        if (a === pe.HTML)return k(b);
        throw oe("unsafe", "Attempting to use an unsafe value in a safe context.")
      }

      var k = function () {
        throw oe("unsafe", "Attempting to use an unsafe value in a safe context.")
      };
      d.has("$sanitize") && (k = d.get("$sanitize"));
      var l = g(), m = {};
      return m[pe.HTML] = g(l), m[pe.CSS] = g(l), m[pe.URL] = g(l), m[pe.JS] = g(l), m[pe.RESOURCE_URL] = g(m[pe.URL]), {
        trustAs: h,
        getTrusted: j,
        valueOf: i
      }
    }]
  }

  function Jc() {
    var a = !0;
    this.enabled = function (b) {
      return arguments.length && (a = !!b), a
    }, this.$get = ["$parse", "$sniffer", "$sceDelegate", function (b, c, d) {
      if (a && c.msie && c.msieDocumentMode < 8)throw oe("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
      var e = J(pe);
      e.isEnabled = function () {
        return a
      }, e.trustAs = d.trustAs, e.getTrusted = d.getTrusted, e.valueOf = d.valueOf, a || (e.trustAs = e.getTrusted = function (a, b) {
        return b
      }, e.valueOf = p), e.parseAs = function (a, c) {
        var d = b(c);
        return d.literal && d.constant ? d : function (b, c) {
          return e.getTrusted(a, d(b, c))
        }
      };
      var g = e.parseAs, h = e.getTrusted, i = e.trustAs;
      return f(pe, function (a, b) {
        var c = md(b);
        e[kb("parse_as_" + c)] = function (b) {
          return g(a, b)
        }, e[kb("get_trusted_" + c)] = function (b) {
          return h(a, b)
        }, e[kb("trust_as_" + c)] = function (b) {
          return i(a, b)
        }
      }), e
    }]
  }

  function Kc() {
    this.$get = ["$window", "$document", function (a, b) {
      var c, d, e = {}, f = m((/android (\d+)/.exec(md((a.navigator || {}).userAgent)) || [])[1]), g = /Boxee/i.test((a.navigator || {}).userAgent), h = b[0] || {}, i = h.documentMode, j = /^(Moz|webkit|O|ms)(?=[A-Z])/, k = h.body && h.body.style, l = !1, n = !1;
      if (k) {
        for (var o in k)if (d = j.exec(o)) {
          c = d[0], c = c.substr(0, 1).toUpperCase() + c.substr(1);
          break
        }
        c || (c = "WebkitOpacity"in k && "webkit"), l = !!("transition"in k || c + "Transition"in k), n = !!("animation"in k || c + "Animation"in k), !f || l && n || (l = u(h.body.style.webkitTransition), n = u(h.body.style.webkitAnimation))
      }
      return {
        history: !(!a.history || !a.history.pushState || 4 > f || g),
        hashchange: "onhashchange"in a && (!i || i > 7),
        hasEvent: function (a) {
          if ("input" == a && 9 == rd)return !1;
          if (r(e[a])) {
            var b = h.createElement("div");
            e[a] = "on" + a in b
          }
          return e[a]
        },
        csp: M(),
        vendorPrefix: c,
        transitions: l,
        animations: n,
        android: f,
        msie: rd,
        msieDocumentMode: i
      }
    }]
  }

  function Lc() {
    this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function (a, b, c, d) {
      function e(e, g, h) {
        var i, j = c.defer(), k = j.promise, l = s(h) && !h;
        return i = b.defer(function () {
          try {
            j.resolve(e())
          } catch (b) {
            j.reject(b), d(b)
          } finally {
            delete f[k.$$timeoutId]
          }
          l || a.$apply()
        }, g), k.$$timeoutId = i, f[i] = j, k
      }

      var f = {};
      return e.cancel = function (a) {
        return a && a.$$timeoutId in f ? (f[a.$$timeoutId].reject("canceled"), delete f[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1
      }, e
    }]
  }

  function Mc(a) {
    var b = a;
    return rd && (qe.setAttribute("href", b), b = qe.href), qe.setAttribute("href", b), {
      href: qe.href,
      protocol: qe.protocol ? qe.protocol.replace(/:$/, "") : "",
      host: qe.host,
      search: qe.search ? qe.search.replace(/^\?/, "") : "",
      hash: qe.hash ? qe.hash.replace(/^#/, "") : "",
      hostname: qe.hostname,
      port: qe.port,
      pathname: "/" === qe.pathname.charAt(0) ? qe.pathname : "/" + qe.pathname
    }
  }

  function Nc(a) {
    var b = u(a) ? Mc(a) : a;
    return b.protocol === re.protocol && b.host === re.host
  }

  function Oc() {
    this.$get = q(a)
  }

  function Pc(a) {
    function b(d, e) {
      if (t(d)) {
        var g = {};
        return f(d, function (a, c) {
          g[c] = b(c, a)
        }), g
      }
      return a.factory(d + c, e)
    }

    var c = "Filter";
    this.register = b, this.$get = ["$injector", function (a) {
      return function (b) {
        return a.get(b + c)
      }
    }], b("currency", Rc), b("date", Zc), b("filter", Qc), b("json", $c), b("limitTo", _c), b("lowercase", we), b("number", Sc), b("orderBy", ad), b("uppercase", xe)
  }

  function Qc() {
    return function (a, b, c) {
      if (!x(a))return a;
      var d = typeof c, e = [];
      e.check = function (a) {
        for (var b = 0; b < e.length; b++)if (!e[b](a))return !1;
        return !0
      }, "function" !== d && (c = "boolean" === d && c ? function (a, b) {
        return Ad.equals(a, b)
      } : function (a, b) {
        if (a && b && "object" == typeof a && "object" == typeof b) {
          for (var d in a)if ("$" !== d.charAt(0) && nd.call(a, d) && c(a[d], b[d]))return !0;
          return !1
        }
        return b = ("" + b).toLowerCase(), ("" + a).toLowerCase().indexOf(b) > -1
      });
      var f = function (a, b) {
        if ("string" == typeof b && "!" === b.charAt(0))return !f(a, b.substr(1));
        switch (typeof a) {
          case"boolean":
          case"number":
          case"string":
            return c(a, b);
          case"object":
            switch (typeof b) {
              case"object":
                return c(a, b);
              default:
                for (var d in a)if ("$" !== d.charAt(0) && f(a[d], b))return !0
            }
            return !1;
          case"array":
            for (var e = 0; e < a.length; e++)if (f(a[e], b))return !0;
            return !1;
          default:
            return !1
        }
      };
      switch (typeof b) {
        case"boolean":
        case"number":
        case"string":
          b = {$: b};
        case"object":
          for (var g in b)!function (a) {
            "undefined" != typeof b[a] && e.push(function (c) {
              return f("$" == a ? c : c && c[a], b[a])
            })
          }(g);
          break;
        case"function":
          e.push(b);
          break;
        default:
          return a
      }
      for (var h = [], i = 0; i < a.length; i++) {
        var j = a[i];
        e.check(j) && h.push(j)
      }
      return h
    }
  }

  function Rc(a) {
    var b = a.NUMBER_FORMATS;
    return function (a, c) {
      return r(c) && (c = b.CURRENCY_SYM), Tc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, 2).replace(/\u00A4/g, c)
    }
  }

  function Sc(a) {
    var b = a.NUMBER_FORMATS;
    return function (a, c) {
      return Tc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
    }
  }

  function Tc(a, b, c, d, e) {
    if (null == a || !isFinite(a) || t(a))return "";
    var f = 0 > a;
    a = Math.abs(a);
    var g = a + "", h = "", i = [], j = !1;
    if (-1 !== g.indexOf("e")) {
      var k = g.match(/([\d\.]+)e(-?)(\d+)/);
      k && "-" == k[2] && k[3] > e + 1 ? g = "0" : (h = g, j = !0)
    }
    if (j)e > 0 && a > -1 && 1 > a && (h = a.toFixed(e)); else {
      var l = (g.split(se)[1] || "").length;
      r(e) && (e = Math.min(Math.max(b.minFrac, l), b.maxFrac));
      var m = Math.pow(10, e);
      a = Math.round(a * m) / m;
      var n = ("" + a).split(se), o = n[0];
      n = n[1] || "";
      var p, q = 0, s = b.lgSize, u = b.gSize;
      if (o.length >= s + u)for (q = o.length - s, p = 0; q > p; p++)(q - p) % u === 0 && 0 !== p && (h += c), h += o.charAt(p);
      for (p = q; p < o.length; p++)(o.length - p) % s === 0 && 0 !== p && (h += c), h += o.charAt(p);
      for (; n.length < e;)n += "0";
      e && "0" !== e && (h += d + n.substr(0, e))
    }
    return i.push(f ? b.negPre : b.posPre), i.push(h), i.push(f ? b.negSuf : b.posSuf), i.join("")
  }

  function Uc(a, b, c) {
    var d = "";
    for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;)a = "0" + a;
    return c && (a = a.substr(a.length - b)), d + a
  }

  function Vc(a, b, c, d) {
    return c = c || 0, function (e) {
      var f = e["get" + a]();
      return (c > 0 || f > -c) && (f += c), 0 === f && -12 == c && (f = 12), Uc(f, b, d)
    }
  }

  function Wc(a, b) {
    return function (c, d) {
      var e = c["get" + a](), f = od(b ? "SHORT" + a : a);
      return d[f][e]
    }
  }

  function Xc(a) {
    var b = -1 * a.getTimezoneOffset(), c = b >= 0 ? "+" : "";
    return c += Uc(Math[b > 0 ? "floor" : "ceil"](b / 60), 2) + Uc(Math.abs(b % 60), 2)
  }

  function Yc(a, b) {
    return a.getHours() < 12 ? b.AMPMS[0] : b.AMPMS[1]
  }

  function Zc(a) {
    function b(a) {
      var b;
      if (b = a.match(c)) {
        var d = new Date(0), e = 0, f = 0, g = b[8] ? d.setUTCFullYear : d.setFullYear, h = b[8] ? d.setUTCHours : d.setHours;
        b[9] && (e = m(b[9] + b[10]), f = m(b[9] + b[11])), g.call(d, m(b[1]), m(b[2]) - 1, m(b[3]));
        var i = m(b[4] || 0) - e, j = m(b[5] || 0) - f, k = m(b[6] || 0), l = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
        return h.call(d, i, j, k, l), d
      }
      return a
    }

    var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function (c, d) {
      var e, g, h = "", i = [];
      if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, u(c) && (c = ve.test(c) ? m(c) : b(c)), v(c) && (c = new Date(c)), !w(c))return c;
      for (; d;)g = ue.exec(d), g ? (i = N(i, g, 1), d = i.pop()) : (i.push(d), d = null);
      return f(i, function (b) {
        e = te[b], h += e ? e(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
      }), h
    }
  }

  function $c() {
    return function (a) {
      return R(a, !0)
    }
  }

  function _c() {
    return function (a, b) {
      if (!x(a) && !u(a))return a;
      if (b = m(b), u(a))return b ? b >= 0 ? a.slice(0, b) : a.slice(b, a.length) : "";
      var c, d, e = [];
      for (b > a.length ? b = a.length : b < -a.length && (b = -a.length), b > 0 ? (c = 0, d = b) : (c = a.length + b, d = a.length); d > c; c++)e.push(a[c]);
      return e
    }
  }

  function ad(a) {
    return function (b, c, d) {
      function e(a, b) {
        for (var d = 0; d < c.length; d++) {
          var e = c[d](a, b);
          if (0 !== e)return e
        }
        return 0
      }

      function f(a, b) {
        return T(b) ? function (b, c) {
          return a(c, b)
        } : a
      }

      function g(a, b) {
        var c = typeof a, d = typeof b;
        return c == d ? ("string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1
      }

      if (!x(b))return b;
      if (!c)return b;
      c = x(c) ? c : [c], c = F(c, function (b) {
        var c = !1, d = b || p;
        if (u(b) && (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0), b = b.substring(1)), d = a(b), d.constant)) {
          var e = d();
          return f(function (a, b) {
            return g(a[e], b[e])
          }, c)
        }
        return f(function (a, b) {
          return g(d(a), d(b))
        }, c)
      });
      for (var h = [], i = 0; i < b.length; i++)h.push(b[i]);
      return h.sort(f(e, d))
    }
  }

  function bd(a) {
    return y(a) && (a = {link: a}), a.restrict = a.restrict || "AC", q(a)
  }

  function cd(a, b, c, d) {
    function e(b, c) {
      c = c ? "-" + ab(c, "-") : "", d.removeClass(a, (b ? Ke : Je) + c), d.addClass(a, (b ? Je : Ke) + c)
    }

    var g = this, h = a.parent().controller("form") || Ae, i = 0, j = g.$error = {}, k = [];
    g.$name = b.name || b.ngForm, g.$dirty = !1, g.$pristine = !0, g.$valid = !0, g.$invalid = !1, h.$addControl(g), a.addClass(Le), e(!0), g.$addControl = function (a) {
      eb(a.$name, "input"), k.push(a), a.$name && (g[a.$name] = a)
    }, g.$removeControl = function (a) {
      a.$name && g[a.$name] === a && delete g[a.$name], f(j, function (b, c) {
        g.$setValidity(c, !0, a)
      }), I(k, a)
    }, g.$setValidity = function (a, b, c) {
      var d = j[a];
      if (b)d && (I(d, c), d.length || (i--, i || (e(b), g.$valid = !0, g.$invalid = !1), j[a] = !1, e(!0, a), h.$setValidity(a, !0, g))); else {
        if (i || e(b), d) {
          if (G(d, c))return
        } else j[a] = d = [], i++, e(!1, a), h.$setValidity(a, !1, g);
        d.push(c), g.$valid = !1, g.$invalid = !0
      }
    }, g.$setDirty = function () {
      d.removeClass(a, Le), d.addClass(a, Me), g.$dirty = !0, g.$pristine = !1, h.$setDirty()
    }, g.$setPristine = function () {
      d.removeClass(a, Me), d.addClass(a, Le), g.$dirty = !1, g.$pristine = !0, f(k, function (a) {
        a.$setPristine()
      })
    }
  }

  function dd(a, b, d, e) {
    return a.$setValidity(b, d), d ? e : c
  }

  function ed(a, b, c) {
    var d = c.prop("validity");
    if (t(d)) {
      var e = function (c) {
        return a.$error[b] || !(d.badInput || d.customError || d.typeMismatch) || d.valueMissing ? c : void a.$setValidity(b, !1)
      };
      a.$parsers.push(e)
    }
  }

  function fd(a, b, c, e, f, g) {
    var h = b.prop("validity");
    if (!f.android) {
      var i = !1;
      b.on("compositionstart", function () {
        i = !0
      }), b.on("compositionend", function () {
        i = !1, j()
      })
    }
    var j = function () {
      if (!i) {
        var d = b.val();
        T(c.ngTrim || "T") && (d = Cd(d)), (e.$viewValue !== d || h && "" === d && !h.valueMissing) && (a.$$phase ? e.$setViewValue(d) : a.$apply(function () {
          e.$setViewValue(d)
        }))
      }
    };
    if (f.hasEvent("input"))b.on("input", j); else {
      var k, l = function () {
        k || (k = g.defer(function () {
          j(), k = null
        }))
      };
      b.on("keydown", function (a) {
        var b = a.keyCode;
        91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || l()
      }), f.hasEvent("paste") && b.on("paste cut", l)
    }
    b.on("change", j), e.$render = function () {
      b.val(e.$isEmpty(e.$viewValue) ? "" : e.$viewValue)
    };
    var n, o, p = c.ngPattern;
    if (p) {
      var q = function (a, b) {
        return dd(e, "pattern", e.$isEmpty(b) || a.test(b), b)
      };
      o = p.match(/^\/(.*)\/([gim]*)$/), o ? (p = new RegExp(o[1], o[2]), n = function (a) {
        return q(p, a)
      }) : n = function (c) {
        var e = a.$eval(p);
        if (!e || !e.test)throw d("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", p, e, U(b));
        return q(e, c)
      }, e.$formatters.push(n), e.$parsers.push(n)
    }
    if (c.ngMinlength) {
      var r = m(c.ngMinlength), s = function (a) {
        return dd(e, "minlength", e.$isEmpty(a) || a.length >= r, a)
      };
      e.$parsers.push(s), e.$formatters.push(s)
    }
    if (c.ngMaxlength) {
      var t = m(c.ngMaxlength), u = function (a) {
        return dd(e, "maxlength", e.$isEmpty(a) || a.length <= t, a)
      };
      e.$parsers.push(u), e.$formatters.push(u)
    }
  }

  function gd(a, b, d, e, f, g) {
    if (fd(a, b, d, e, f, g), e.$parsers.push(function (a) {
        var b = e.$isEmpty(a);
        return b || Ge.test(a) ? (e.$setValidity("number", !0), "" === a ? null : b ? a : parseFloat(a)) : (e.$setValidity("number", !1), c)
      }), ed(e, "number", b), e.$formatters.push(function (a) {
        return e.$isEmpty(a) ? "" : "" + a
      }), d.min) {
      var h = function (a) {
        var b = parseFloat(d.min);
        return dd(e, "min", e.$isEmpty(a) || a >= b, a)
      };
      e.$parsers.push(h), e.$formatters.push(h)
    }
    if (d.max) {
      var i = function (a) {
        var b = parseFloat(d.max);
        return dd(e, "max", e.$isEmpty(a) || b >= a, a)
      };
      e.$parsers.push(i), e.$formatters.push(i)
    }
    e.$formatters.push(function (a) {
      return dd(e, "number", e.$isEmpty(a) || v(a), a)
    })
  }

  function hd(a, b, c, d, e, f) {
    fd(a, b, c, d, e, f);
    var g = function (a) {
      return dd(d, "url", d.$isEmpty(a) || Ee.test(a), a)
    };
    d.$formatters.push(g), d.$parsers.push(g)
  }

  function id(a, b, c, d, e, f) {
    fd(a, b, c, d, e, f);
    var g = function (a) {
      return dd(d, "email", d.$isEmpty(a) || Fe.test(a), a)
    };
    d.$formatters.push(g), d.$parsers.push(g)
  }

  function jd(a, b, c, d) {
    r(c.name) && b.attr("name", j()), b.on("click", function () {
      b[0].checked && a.$apply(function () {
        d.$setViewValue(c.value)
      })
    }), d.$render = function () {
      var a = c.value;
      b[0].checked = a == d.$viewValue
    }, c.$observe("value", d.$render)
  }

  function kd(a, b, c, d) {
    var e = c.ngTrueValue, f = c.ngFalseValue;
    u(e) || (e = !0), u(f) || (f = !1), b.on("click", function () {
      a.$apply(function () {
        d.$setViewValue(b[0].checked)
      })
    }), d.$render = function () {
      b[0].checked = d.$viewValue
    }, d.$isEmpty = function (a) {
      return a !== e
    }, d.$formatters.push(function (a) {
      return a === e
    }), d.$parsers.push(function (a) {
      return a ? e : f
    })
  }

  function ld(a, b) {
    return a = "ngClass" + a, ["$animate", function (c) {
      function d(a, b) {
        var c = [];
        a:for (var d = 0; d < a.length; d++) {
          for (var e = a[d], f = 0; f < b.length; f++)if (e == b[f])continue a;
          c.push(e)
        }
        return c
      }

      function e(a) {
        if (x(a))return a;
        if (u(a))return a.split(" ");
        if (t(a)) {
          var b = [];
          return f(a, function (a, c) {
            a && b.push(c)
          }), b
        }
        return a
      }

      return {
        restrict: "AC", link: function (g, h, i) {
          function j(a) {
            var b = l(a, 1);
            i.$addClass(b)
          }

          function k(a) {
            var b = l(a, -1);
            i.$removeClass(b)
          }

          function l(a, b) {
            var c = h.data("$classCounts") || {}, d = [];
            return f(a, function (a) {
              (b > 0 || c[a]) && (c[a] = (c[a] || 0) + b, c[a] === +(b > 0) && d.push(a))
            }), h.data("$classCounts", c), d.join(" ")
          }

          function m(a, b) {
            var e = d(b, a), f = d(a, b);
            f = l(f, -1), e = l(e, 1), 0 === e.length ? c.removeClass(h, f) : 0 === f.length ? c.addClass(h, e) : c.setClass(h, e, f)
          }

          function n(a) {
            if (b === !0 || g.$index % 2 === b) {
              var c = e(a || []);
              if (o) {
                if (!L(a, o)) {
                  var d = e(o);
                  m(d, c)
                }
              } else j(c)
            }
            o = J(a)
          }

          var o;
          g.$watch(i[a], n, !0), i.$observe("class", function () {
            n(g.$eval(i[a]))
          }), "ngClass" !== a && g.$watch("$index", function (c, d) {
            var f = 1 & c;
            if (f !== d & 1) {
              var h = e(g.$eval(i[a]));
              f === b ? j(h) : k(h)
            }
          })
        }
      }
    }]
  }

  var md = function (a) {
    return u(a) ? a.toLowerCase() : a
  }, nd = Object.prototype.hasOwnProperty, od = function (a) {
    return u(a) ? a.toUpperCase() : a
  }, pd = function (a) {
    return u(a) ? a.replace(/[A-Z]/g, function (a) {
      return String.fromCharCode(32 | a.charCodeAt(0))
    }) : a
  }, qd = function (a) {
    return u(a) ? a.replace(/[a-z]/g, function (a) {
      return String.fromCharCode(-33 & a.charCodeAt(0))
    }) : a
  };
  "i" !== "I".toLowerCase() && (md = pd, od = qd);
  var rd, sd, td, ud, vd, wd = [].slice, xd = [].push, yd = Object.prototype.toString, zd = d("ng"), Ad = (a.angular, a.angular || (a.angular = {})), Bd = ["0", "0", "0"];
  rd = m((/msie (\d+)/.exec(md(navigator.userAgent)) || [])[1]), isNaN(rd) && (rd = m((/trident\/.*; rv:(\d+)/.exec(md(navigator.userAgent)) || [])[1])), o.$inject = [], p.$inject = [];
  var Cd = function () {
    return String.prototype.trim ? function (a) {
      return u(a) ? a.trim() : a
    } : function (a) {
      return u(a) ? a.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : a
    }
  }();
  vd = 9 > rd ? function (a) {
    return a = a.nodeName ? a : a[0], a.scopeName && "HTML" != a.scopeName ? od(a.scopeName + ":" + a.nodeName) : a.nodeName
  } : function (a) {
    return a.nodeName ? a.nodeName : a[0].nodeName
  };
  var Dd = /[A-Z]/g, Ed = {
    full: "1.2.16",
    major: 1,
    minor: 2,
    dot: 16,
    codeName: "badger-enumeration"
  }, Fd = pb.cache = {}, Gd = pb.expando = "ng-" + (new Date).getTime(), Hd = 1, Id = a.document.addEventListener ? function (a, b, c) {
    a.addEventListener(b, c, !1)
  } : function (a, b, c) {
    a.attachEvent("on" + b, c)
  }, Jd = a.document.removeEventListener ? function (a, b, c) {
    a.removeEventListener(b, c, !1)
  } : function (a, b, c) {
    a.detachEvent("on" + b, c)
  }, Kd = (pb._data = function (a) {
    return this.cache[a[this.expando]] || {}
  }, /([\:\-\_]+(.))/g), Ld = /^moz([A-Z])/, Md = d("jqLite"), Nd = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Od = /<|&#?\w+;/, Pd = /<([\w:]+)/, Qd = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Rd = {
    option: [1, '<select multiple="multiple">', "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  Rd.optgroup = Rd.option, Rd.tbody = Rd.tfoot = Rd.colgroup = Rd.caption = Rd.thead, Rd.th = Rd.td;
  var Sd = pb.prototype = {
    ready: function (c) {
      function d() {
        e || (e = !0, c())
      }

      var e = !1;
      "complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d), pb(a).on("load", d))
    }, toString: function () {
      var a = [];
      return f(this, function (b) {
        a.push("" + b)
      }), "[" + a.join(", ") + "]"
    }, eq: function (a) {
      return sd(a >= 0 ? this[a] : this[this.length + a])
    }, length: 0, push: xd, sort: [].sort, splice: [].splice
  }, Td = {};
  f("multiple,selected,checked,disabled,readOnly,required,open".split(","), function (a) {
    Td[md(a)] = a
  });
  var Ud = {};
  f("input,select,option,textarea,button,form,details".split(","), function (a) {
    Ud[od(a)] = !0
  }), f({
    data: vb, inheritedData: Bb, scope: function (a) {
      return sd(a).data("$scope") || Bb(a.parentNode || a, ["$isolateScope", "$scope"])
    }, isolateScope: function (a) {
      return sd(a).data("$isolateScope") || sd(a).data("$isolateScopeNoTemplate")
    }, controller: Ab, injector: function (a) {
      return Bb(a, "$injector")
    }, removeAttr: function (a, b) {
      a.removeAttribute(b)
    }, hasClass: wb, css: function (a, b, d) {
      if (b = kb(b), !s(d)) {
        var e;
        return 8 >= rd && (e = a.currentStyle && a.currentStyle[b], "" === e && (e = "auto")), e = e || a.style[b], 8 >= rd && (e = "" === e ? c : e), e
      }
      a.style[b] = d
    }, attr: function (a, b, d) {
      var e = md(b);
      if (Td[e]) {
        if (!s(d))return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e : c;
        d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e))
      } else if (s(d))a.setAttribute(b, d); else if (a.getAttribute) {
        var f = a.getAttribute(b, 2);
        return null === f ? c : f
      }
    }, prop: function (a, b, c) {
      return s(c) ? void(a[b] = c) : a[b]
    }, text: function () {
      function a(a, c) {
        var d = b[a.nodeType];
        return r(c) ? d ? a[d] : "" : void(a[d] = c)
      }

      var b = [];
      return 9 > rd ? (b[1] = "innerText", b[3] = "nodeValue") : b[1] = b[3] = "textContent", a.$dv = "", a
    }(), val: function (a, b) {
      if (r(b)) {
        if ("SELECT" === vd(a) && a.multiple) {
          var c = [];
          return f(a.options, function (a) {
            a.selected && c.push(a.value || a.text)
          }), 0 === c.length ? null : c
        }
        return a.value
      }
      a.value = b
    }, html: function (a, b) {
      if (r(b))return a.innerHTML;
      for (var c = 0, d = a.childNodes; c < d.length; c++)rb(d[c]);
      a.innerHTML = b
    }, empty: Cb
  }, function (a, b) {
    pb.prototype[b] = function (b, d) {
      var e, f;
      if (a !== Cb && (2 == a.length && a !== wb && a !== Ab ? b : d) === c) {
        if (t(b)) {
          for (e = 0; e < this.length; e++)if (a === vb)a(this[e], b); else for (f in b)a(this[e], f, b[f]);
          return this
        }
        for (var g = a.$dv, h = g === c ? Math.min(this.length, 1) : this.length, i = 0; h > i; i++) {
          var j = a(this[i], b, d);
          g = g ? g + j : j
        }
        return g
      }
      for (e = 0; e < this.length; e++)a(this[e], b, d);
      return this
    }
  }), f({
    removeData: tb, dealoc: rb, on: function wf(a, c, d, e) {
      if (s(e))throw Md("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
      var g = ub(a, "events"), h = ub(a, "handle");
      g || ub(a, "events", g = {}), h || ub(a, "handle", h = Eb(a, g)), f(c.split(" "), function (c) {
        var e = g[c];
        if (!e) {
          if ("mouseenter" == c || "mouseleave" == c) {
            var f = b.body.contains || b.body.compareDocumentPosition ? function (a, b) {
              var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
              return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function (a, b) {
              if (b)for (; b = b.parentNode;)if (b === a)return !0;
              return !1
            };
            g[c] = [];
            var i = {mouseleave: "mouseout", mouseenter: "mouseover"};
            wf(a, i[c], function (a) {
              var b = this, d = a.relatedTarget;
              (!d || d !== b && !f(b, d)) && h(a, c)
            })
          } else Id(a, c, h), g[c] = [];
          e = g[c]
        }
        e.push(d)
      })
    }, off: sb, one: function (a, b, c) {
      a = sd(a), a.on(b, function d() {
        a.off(b, c), a.off(b, d)
      }), a.on(b, c)
    }, replaceWith: function (a, b) {
      var c, d = a.parentNode;
      rb(a), f(new pb(b), function (b) {
        c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b
      })
    }, children: function (a) {
      var b = [];
      return f(a.childNodes, function (a) {
        1 === a.nodeType && b.push(a)
      }), b
    }, contents: function (a) {
      return a.contentDocument || a.childNodes || []
    }, append: function (a, b) {
      f(new pb(b), function (b) {
        (1 === a.nodeType || 11 === a.nodeType) && a.appendChild(b)
      })
    }, prepend: function (a, b) {
      if (1 === a.nodeType) {
        var c = a.firstChild;
        f(new pb(b), function (b) {
          a.insertBefore(b, c)
        })
      }
    }, wrap: function (a, b) {
      b = sd(b)[0];
      var c = a.parentNode;
      c && c.replaceChild(b, a), b.appendChild(a)
    }, remove: function (a) {
      rb(a);
      var b = a.parentNode;
      b && b.removeChild(a)
    }, after: function (a, b) {
      var c = a, d = a.parentNode;
      f(new pb(b), function (a) {
        d.insertBefore(a, c.nextSibling), c = a
      })
    }, addClass: yb, removeClass: xb, toggleClass: function (a, b, c) {
      b && f(b.split(" "), function (b) {
        var d = c;
        r(d) && (d = !wb(a, b)), (d ? yb : xb)(a, b)
      })
    }, parent: function (a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null
    }, next: function (a) {
      if (a.nextElementSibling)return a.nextElementSibling;
      for (var b = a.nextSibling; null != b && 1 !== b.nodeType;)b = b.nextSibling;
      return b
    }, find: function (a, b) {
      return a.getElementsByTagName ? a.getElementsByTagName(b) : []
    }, clone: qb, triggerHandler: function (a, b, c) {
      var d = (ub(a, "events") || {})[b];
      c = c || [];
      var e = [{preventDefault: o, stopPropagation: o}];
      f(d, function (b) {
        b.apply(a, e.concat(c))
      })
    }
  }, function (a, b) {
    pb.prototype[b] = function (b, c, d) {
      for (var e, f = 0; f < this.length; f++)r(e) ? (e = a(this[f], b, c, d), s(e) && (e = sd(e))) : zb(e, a(this[f], b, c, d));
      return s(e) ? e : this
    }, pb.prototype.bind = pb.prototype.on, pb.prototype.unbind = pb.prototype.off
  }), Gb.prototype = {
    put: function (a, b) {
      this[Fb(a)] = b
    }, get: function (a) {
      return this[Fb(a)]
    }, remove: function (a) {
      var b = this[a = Fb(a)];
      return delete this[a], b
    }
  };
  var Vd = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, Wd = /,/, Xd = /^\s*(_?)(\S+?)\1\s*$/, Yd = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Zd = d("$injector"), $d = d("$animate"), _d = ["$provide", function (a) {
    this.$$selectors = {}, this.register = function (b, c) {
      var d = b + "-animation";
      if (b && "." != b.charAt(0))throw $d("notcsel", "Expecting class selector starting with '.' got '{0}'.", b);
      this.$$selectors[b.substr(1)] = d, a.factory(d, c)
    }, this.classNameFilter = function (a) {
      return 1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null), this.$$classNameFilter
    }, this.$get = ["$timeout", "$$asyncCallback", function (a, b) {
      function c(a) {
        a && b(a)
      }

      return {
        enter: function (a, b, d, e) {
          d ? d.after(a) : (b && b[0] || (b = d.parent()), b.append(a)), c(e)
        }, leave: function (a, b) {
          a.remove(), c(b)
        }, move: function (a, b, c, d) {
          this.enter(a, b, c, d)
        }, addClass: function (a, b, d) {
          b = u(b) ? b : x(b) ? b.join(" ") : "", f(a, function (a) {
            yb(a, b)
          }), c(d)
        }, removeClass: function (a, b, d) {
          b = u(b) ? b : x(b) ? b.join(" ") : "", f(a, function (a) {
            xb(a, b)
          }), c(d)
        }, setClass: function (a, b, d, e) {
          f(a, function (a) {
            yb(a, b), xb(a, d)
          }), c(e)
        }, enabled: o
      }
    }]
  }], ae = d("$compile");
  Pb.$inject = ["$provide", "$$sanitizeUriProvider"];
  var be = /^(x[\:\-_]|data[\:\-_])/i, ce = d("$interpolate"), de = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, ee = {
    http: 80,
    https: 443,
    ftp: 21
  }, fe = d("$location");
  nc.prototype = mc.prototype = lc.prototype = {
    $$html5: !1,
    $$replace: !1,
    absUrl: oc("$$absUrl"),
    url: function (a, b) {
      if (r(a))return this.$$url;
      var c = de.exec(a);
      return c[1] && this.path(decodeURIComponent(c[1])), (c[2] || c[1]) && this.search(c[3] || ""), this.hash(c[5] || "", b), this
    },
    protocol: oc("$$protocol"),
    host: oc("$$host"),
    port: oc("$$port"),
    path: pc("$$path", function (a) {
      return "/" == a.charAt(0) ? a : "/" + a
    }),
    search: function (a, b) {
      switch (arguments.length) {
        case 0:
          return this.$$search;
        case 1:
          if (u(a))this.$$search = W(a); else {
            if (!t(a))throw fe("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
            this.$$search = a
          }
          break;
        default:
          r(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b
      }
      return this.$$compose(), this
    },
    hash: pc("$$hash", p),
    replace: function () {
      return this.$$replace = !0, this
    }
  };
  var ge, he = d("$parse"), ie = {}, je = {
    "null": function () {
      return null
    }, "true": function () {
      return !0
    }, "false": function () {
      return !1
    }, undefined: o, "+": function (a, b, d, e) {
      return d = d(a, b), e = e(a, b), s(d) ? s(e) ? d + e : d : s(e) ? e : c
    }, "-": function (a, b, c, d) {
      return c = c(a, b), d = d(a, b), (s(c) ? c : 0) - (s(d) ? d : 0)
    }, "*": function (a, b, c, d) {
      return c(a, b) * d(a, b)
    }, "/": function (a, b, c, d) {
      return c(a, b) / d(a, b)
    }, "%": function (a, b, c, d) {
      return c(a, b) % d(a, b)
    }, "^": function (a, b, c, d) {
      return c(a, b) ^ d(a, b)
    }, "=": o, "===": function (a, b, c, d) {
      return c(a, b) === d(a, b)
    }, "!==": function (a, b, c, d) {
      return c(a, b) !== d(a, b)
    }, "==": function (a, b, c, d) {
      return c(a, b) == d(a, b)
    }, "!=": function (a, b, c, d) {
      return c(a, b) != d(a, b)
    }, "<": function (a, b, c, d) {
      return c(a, b) < d(a, b)
    }, ">": function (a, b, c, d) {
      return c(a, b) > d(a, b)
    }, "<=": function (a, b, c, d) {
      return c(a, b) <= d(a, b)
    }, ">=": function (a, b, c, d) {
      return c(a, b) >= d(a, b)
    }, "&&": function (a, b, c, d) {
      return c(a, b) && d(a, b)
    }, "||": function (a, b, c, d) {
      return c(a, b) || d(a, b)
    }, "&": function (a, b, c, d) {
      return c(a, b) & d(a, b)
    }, "|": function (a, b, c, d) {
      return d(a, b)(a, b, c(a, b))
    }, "!": function (a, b, c) {
      return !c(a, b)
    }
  }, ke = {n: "\n", f: "\f", r: "\r", t: "	", v: "", "'": "'", '"': '"'}, le = function (a) {
    this.options = a
  };
  le.prototype = {
    constructor: le, lex: function (a) {
      this.text = a, this.index = 0, this.ch = c, this.lastCh = ":", this.tokens = [];
      for (var b, d = []; this.index < this.text.length;) {
        if (this.ch = this.text.charAt(this.index), this.is("\"'"))this.readString(this.ch); else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek()))this.readNumber(); else if (this.isIdent(this.ch))this.readIdent(), this.was("{,") && "{" === d[0] && (b = this.tokens[this.tokens.length - 1]) && (b.json = -1 === b.text.indexOf(".")); else if (this.is("(){}[].,;:?"))this.tokens.push({
          index: this.index,
          text: this.ch,
          json: this.was(":[,") && this.is("{[") || this.is("}]:,")
        }), this.is("{[") && d.unshift(this.ch), this.is("}]") && d.shift(), this.index++; else {
          if (this.isWhitespace(this.ch)) {
            this.index++;
            continue
          }
          var e = this.ch + this.peek(), f = e + this.peek(2), g = je[this.ch], h = je[e], i = je[f];
          i ? (this.tokens.push({
            index: this.index,
            text: f,
            fn: i
          }), this.index += 3) : h ? (this.tokens.push({
            index: this.index,
            text: e,
            fn: h
          }), this.index += 2) : g ? (this.tokens.push({
            index: this.index,
            text: this.ch,
            fn: g,
            json: this.was("[,:") && this.is("+-")
          }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
        }
        this.lastCh = this.ch
      }
      return this.tokens
    }, is: function (a) {
      return -1 !== a.indexOf(this.ch)
    }, was: function (a) {
      return -1 !== a.indexOf(this.lastCh)
    }, peek: function (a) {
      var b = a || 1;
      return this.index + b < this.text.length ? this.text.charAt(this.index + b) : !1
    }, isNumber: function (a) {
      return a >= "0" && "9" >= a
    }, isWhitespace: function (a) {
      return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a
    }, isIdent: function (a) {
      return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
    }, isExpOperator: function (a) {
      return "-" === a || "+" === a || this.isNumber(a)
    }, throwError: function (a, b, c) {
      c = c || this.index;
      var d = s(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c;
      throw he("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", a, d, this.text)
    }, readNumber: function () {
      for (var a = "", b = this.index; this.index < this.text.length;) {
        var c = md(this.text.charAt(this.index));
        if ("." == c || this.isNumber(c))a += c; else {
          var d = this.peek();
          if ("e" == c && this.isExpOperator(d))a += c; else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1))a += c; else {
            if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1))break;
            this.throwError("Invalid exponent")
          }
        }
        this.index++
      }
      a = 1 * a, this.tokens.push({
        index: b, text: a, json: !0, fn: function () {
          return a
        }
      })
    }, readIdent: function () {
      for (var a, b, c, d, e = this, f = "", g = this.index; this.index < this.text.length && (d = this.text.charAt(this.index), "." === d || this.isIdent(d) || this.isNumber(d));)"." === d && (a = this.index), f += d, this.index++;
      if (a)for (b = this.index; b < this.text.length;) {
        if (d = this.text.charAt(b), "(" === d) {
          c = f.substr(a - g + 1), f = f.substr(0, a - g), this.index = b;
          break
        }
        if (!this.isWhitespace(d))break;
        b++
      }
      var h = {index: g, text: f};
      if (je.hasOwnProperty(f))h.fn = je[f], h.json = je[f]; else {
        var i = yc(f, this.options, this.text);
        h.fn = l(function (a, b) {
          return i(a, b)
        }, {
          assign: function (a, b) {
            return uc(a, f, b, e.text, e.options)
          }
        })
      }
      this.tokens.push(h), c && (this.tokens.push({index: a, text: ".", json: !1}), this.tokens.push({
        index: a + 1,
        text: c,
        json: !1
      }))
    }, readString: function (a) {
      var b = this.index;
      this.index++;
      for (var c = "", d = a, e = !1; this.index < this.text.length;) {
        var f = this.text.charAt(this.index);
        if (d += f, e) {
          if ("u" === f) {
            var g = this.text.substring(this.index + 1, this.index + 5);
            g.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + g + "]"), this.index += 4, c += String.fromCharCode(parseInt(g, 16))
          } else {
            var h = ke[f];
            c += h ? h : f
          }
          e = !1
        } else if ("\\" === f)e = !0; else {
          if (f === a)return this.index++, void this.tokens.push({
            index: b,
            text: d,
            string: c,
            json: !0,
            fn: function () {
              return c
            }
          });
          c += f
        }
        this.index++
      }
      this.throwError("Unterminated quote", b)
    }
  };
  var me = function (a, b, c) {
    this.lexer = a, this.$filter = b, this.options = c
  };
  me.ZERO = l(function () {
    return 0
  }, {constant: !0}), me.prototype = {
    constructor: me, parse: function (a, b) {
      this.text = a, this.json = b, this.tokens = this.lexer.lex(a), b && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function () {
        this.throwError("is not valid json", {text: a, index: 0})
      });
      var c = b ? this.primary() : this.statements();
      return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), c.literal = !!c.literal, c.constant = !!c.constant, c
    }, primary: function () {
      var a;
      if (this.expect("("))a = this.filterChain(), this.consume(")"); else if (this.expect("["))a = this.arrayDeclaration(); else if (this.expect("{"))a = this.object(); else {
        var b = this.expect();
        a = b.fn, a || this.throwError("not a primary expression", b), b.json && (a.constant = !0, a.literal = !0)
      }
      for (var c, d; c = this.expect("(", "[", ".");)"(" === c.text ? (a = this.functionCall(a, d), d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
      return a
    }, throwError: function (a, b) {
      throw he("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
    }, peekToken: function () {
      if (0 === this.tokens.length)throw he("ueoe", "Unexpected end of expression: {0}", this.text);
      return this.tokens[0]
    }, peek: function (a, b, c, d) {
      if (this.tokens.length > 0) {
        var e = this.tokens[0], f = e.text;
        if (f === a || f === b || f === c || f === d || !a && !b && !c && !d)return e
      }
      return !1
    }, expect: function (a, b, c, d) {
      var e = this.peek(a, b, c, d);
      return e ? (this.json && !e.json && this.throwError("is not valid json", e), this.tokens.shift(), e) : !1
    }, consume: function (a) {
      this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek())
    }, unaryFn: function (a, b) {
      return l(function (c, d) {
        return a(c, d, b)
      }, {constant: b.constant})
    }, ternaryFn: function (a, b, c) {
      return l(function (d, e) {
        return a(d, e) ? b(d, e) : c(d, e)
      }, {constant: a.constant && b.constant && c.constant})
    }, binaryFn: function (a, b, c) {
      return l(function (d, e) {
        return b(d, e, a, c)
      }, {constant: a.constant && c.constant})
    }, statements: function () {
      for (var a = []; ;)if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";"))return 1 === a.length ? a[0] : function (b, c) {
        for (var d, e = 0; e < a.length; e++) {
          var f = a[e];
          f && (d = f(b, c))
        }
        return d
      }
    }, filterChain: function () {
      for (var a, b = this.expression(); ;) {
        if (!(a = this.expect("|")))return b;
        b = this.binaryFn(b, a.fn, this.filter())
      }
    }, filter: function () {
      for (var a = this.expect(), b = this.$filter(a.text), c = []; ;) {
        if (!(a = this.expect(":"))) {
          var d = function (a, d, e) {
            for (var f = [e], g = 0; g < c.length; g++)f.push(c[g](a, d));
            return b.apply(a, f)
          };
          return function () {
            return d
          }
        }
        c.push(this.expression())
      }
    }, expression: function () {
      return this.assignment()
    }, assignment: function () {
      var a, b, c = this.ternary();
      return (b = this.expect("=")) ? (c.assign || this.throwError("implies assignment but [" + this.text.substring(0, b.index) + "] can not be assigned to", b), a = this.ternary(), function (b, d) {
        return c.assign(b, a(b, d), d)
      }) : c
    }, ternary: function () {
      var a, b, c = this.logicalOR();
      return (b = this.expect("?")) ? (a = this.ternary(), (b = this.expect(":")) ? this.ternaryFn(c, a, this.ternary()) : void this.throwError("expected :", b)) : c
    }, logicalOR: function () {
      for (var a, b = this.logicalAND(); ;) {
        if (!(a = this.expect("||")))return b;
        b = this.binaryFn(b, a.fn, this.logicalAND())
      }
    }, logicalAND: function () {
      var a, b = this.equality();
      return (a = this.expect("&&")) && (b = this.binaryFn(b, a.fn, this.logicalAND())), b
    }, equality: function () {
      var a, b = this.relational();
      return (a = this.expect("==", "!=", "===", "!==")) && (b = this.binaryFn(b, a.fn, this.equality())), b
    }, relational: function () {
      var a, b = this.additive();
      return (a = this.expect("<", ">", "<=", ">=")) && (b = this.binaryFn(b, a.fn, this.relational())), b
    }, additive: function () {
      for (var a, b = this.multiplicative(); a = this.expect("+", "-");)b = this.binaryFn(b, a.fn, this.multiplicative());
      return b
    }, multiplicative: function () {
      for (var a, b = this.unary(); a = this.expect("*", "/", "%");)b = this.binaryFn(b, a.fn, this.unary());
      return b
    }, unary: function () {
      var a;
      return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(me.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()
    }, fieldAccess: function (a) {
      var b = this, c = this.expect().text, d = yc(c, this.options, this.text);
      return l(function (b, c, e) {
        return d(e || a(b, c))
      }, {
        assign: function (d, e, f) {
          return uc(a(d, f), c, e, b.text, b.options)
        }
      })
    }, objectIndex: function (a) {
      var b = this, d = this.expression();
      return this.consume("]"), l(function (e, f) {
        var g, h, i = a(e, f), j = d(e, f);
        return i ? (g = tc(i[j], b.text), g && g.then && b.options.unwrapPromises && (h = g, "$$v"in g || (h.$$v = c, h.then(function (a) {
          h.$$v = a
        })), g = g.$$v), g) : c
      }, {
        assign: function (c, e, f) {
          var g = d(c, f), h = tc(a(c, f), b.text);
          return h[g] = e
        }
      })
    }, functionCall: function (a, b) {
      var c = [];
      if (")" !== this.peekToken().text)do c.push(this.expression()); while (this.expect(","));
      this.consume(")");
      var d = this;
      return function (e, f) {
        for (var g = [], h = b ? b(e, f) : e, i = 0; i < c.length; i++)g.push(c[i](e, f));
        var j = a(e, f, h) || o;
        tc(h, d.text), tc(j, d.text);
        var k = j.apply ? j.apply(h, g) : j(g[0], g[1], g[2], g[3], g[4]);
        return tc(k, d.text)
      }
    }, arrayDeclaration: function () {
      var a = [], b = !0;
      if ("]" !== this.peekToken().text)do {
        if (this.peek("]"))break;
        var c = this.expression();
        a.push(c), c.constant || (b = !1)
      } while (this.expect(","));
      return this.consume("]"), l(function (b, c) {
        for (var d = [], e = 0; e < a.length; e++)d.push(a[e](b, c));
        return d
      }, {literal: !0, constant: b})
    }, object: function () {
      var a = [], b = !0;
      if ("}" !== this.peekToken().text)do {
        if (this.peek("}"))break;
        var c = this.expect(), d = c.string || c.text;
        this.consume(":");
        var e = this.expression();
        a.push({key: d, value: e}), e.constant || (b = !1)
      } while (this.expect(","));
      return this.consume("}"), l(function (b, c) {
        for (var d = {}, e = 0; e < a.length; e++) {
          var f = a[e];
          d[f.key] = f.value(b, c)
        }
        return d
      }, {literal: !0, constant: b})
    }
  };
  var ne = {}, oe = d("$sce"), pe = {
    HTML: "html",
    CSS: "css",
    URL: "url",
    RESOURCE_URL: "resourceUrl",
    JS: "js"
  }, qe = b.createElement("a"), re = Mc(a.location.href, !0);
  Pc.$inject = ["$provide"], Rc.$inject = ["$locale"], Sc.$inject = ["$locale"];
  var se = ".", te = {
    yyyy: Vc("FullYear", 4),
    yy: Vc("FullYear", 2, 0, !0),
    y: Vc("FullYear", 1),
    MMMM: Wc("Month"),
    MMM: Wc("Month", !0),
    MM: Vc("Month", 2, 1),
    M: Vc("Month", 1, 1),
    dd: Vc("Date", 2),
    d: Vc("Date", 1),
    HH: Vc("Hours", 2),
    H: Vc("Hours", 1),
    hh: Vc("Hours", 2, -12),
    h: Vc("Hours", 1, -12),
    mm: Vc("Minutes", 2),
    m: Vc("Minutes", 1),
    ss: Vc("Seconds", 2),
    s: Vc("Seconds", 1),
    sss: Vc("Milliseconds", 3),
    EEEE: Wc("Day"),
    EEE: Wc("Day", !0),
    a: Yc,
    Z: Xc
  }, ue = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, ve = /^\-?\d+$/;
  Zc.$inject = ["$locale"];
  var we = q(md), xe = q(od);
  ad.$inject = ["$parse"];
  var ye = q({
    restrict: "E", compile: function (a, c) {
      return 8 >= rd && (c.href || c.name || c.$set("href", ""), a.append(b.createComment("IE fix"))), c.href || c.xlinkHref || c.name ? void 0 : function (a, b) {
        var c = "[object SVGAnimatedString]" === yd.call(b.prop("href")) ? "xlink:href" : "href";
        b.on("click", function (a) {
          b.attr(c) || a.preventDefault()
        })
      }
    }
  }), ze = {};
  f(Td, function (a, b) {
    if ("multiple" != a) {
      var c = Qb("ng-" + b);
      ze[c] = function () {
        return {
          priority: 100, link: function (a, d, e) {
            a.$watch(e[c], function (a) {
              e.$set(b, !!a)
            })
          }
        }
      }
    }
  }), f(["src", "srcset", "href"], function (a) {
    var b = Qb("ng-" + a);
    ze[b] = function () {
      return {
        priority: 99, link: function (c, d, e) {
          var f = a, g = a;
          "href" === a && "[object SVGAnimatedString]" === yd.call(d.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null), e.$observe(b, function (a) {
            a && (e.$set(g, a), rd && f && d.prop(f, e[g]))
          })
        }
      }
    }
  });
  var Ae = {$addControl: o, $removeControl: o, $setValidity: o, $setDirty: o, $setPristine: o};
  cd.$inject = ["$element", "$attrs", "$scope", "$animate"];
  var Be = function (a) {
    return ["$timeout", function (b) {
      var d = {
        name: "form", restrict: a ? "EAC" : "E", controller: cd, compile: function () {
          return {
            pre: function (a, d, e, f) {
              if (!e.action) {
                var g = function (a) {
                  a.preventDefault ? a.preventDefault() : a.returnValue = !1
                };
                Id(d[0], "submit", g), d.on("$destroy", function () {
                  b(function () {
                    Jd(d[0], "submit", g)
                  }, 0, !1)
                })
              }
              var h = d.parent().controller("form"), i = e.name || e.ngForm;
              i && uc(a, i, f, i), h && d.on("$destroy", function () {
                h.$removeControl(f), i && uc(a, i, c, i), l(f, Ae)
              })
            }
          }
        }
      };
      return d
    }]
  }, Ce = Be(), De = Be(!0), Ee = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Fe = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i, Ge = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, He = {
    text: fd,
    number: gd,
    url: hd,
    email: id,
    radio: jd,
    checkbox: kd,
    hidden: o,
    button: o,
    submit: o,
    reset: o,
    file: o
  }, Ie = ["$browser", "$sniffer", function (a, b) {
    return {
      restrict: "E", require: "?ngModel", link: function (c, d, e, f) {
        f && (He[md(e.type)] || He.text)(c, d, e, f, b, a)
      }
    }
  }], Je = "ng-valid", Ke = "ng-invalid", Le = "ng-pristine", Me = "ng-dirty", Ne = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function (a, b, c, e, g, h) {
    function i(a, b) {
      b = b ? "-" + ab(b, "-") : "", h.removeClass(e, (a ? Ke : Je) + b), h.addClass(e, (a ? Je : Ke) + b)
    }

    this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = c.name;
    var j = g(c.ngModel), k = j.assign;
    if (!k)throw d("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", c.ngModel, U(e));
    this.$render = o, this.$isEmpty = function (a) {
      return r(a) || "" === a || null === a || a !== a
    };
    var l = e.inheritedData("$formController") || Ae, m = 0, n = this.$error = {};
    e.addClass(Le), i(!0), this.$setValidity = function (a, b) {
      n[a] !== !b && (b ? (n[a] && m--, m || (i(!0), this.$valid = !0, this.$invalid = !1)) : (i(!1), this.$invalid = !0, this.$valid = !1, m++), n[a] = !b, i(b, a), l.$setValidity(a, b, this))
    }, this.$setPristine = function () {
      this.$dirty = !1, this.$pristine = !0, h.removeClass(e, Me), h.addClass(e, Le)
    }, this.$setViewValue = function (c) {
      this.$viewValue = c, this.$pristine && (this.$dirty = !0, this.$pristine = !1, h.removeClass(e, Le), h.addClass(e, Me), l.$setDirty()), f(this.$parsers, function (a) {
        c = a(c)
      }), this.$modelValue !== c && (this.$modelValue = c, k(a, c), f(this.$viewChangeListeners, function (a) {
        try {
          a()
        } catch (c) {
          b(c)
        }
      }))
    };
    var p = this;
    a.$watch(function () {
      var b = j(a);
      if (p.$modelValue !== b) {
        var c = p.$formatters, d = c.length;
        for (p.$modelValue = b; d--;)b = c[d](b);
        p.$viewValue !== b && (p.$viewValue = b, p.$render())
      }
      return b
    })
  }], Oe = function () {
    return {
      require: ["ngModel", "^?form"], controller: Ne, link: function (a, b, c, d) {
        var e = d[0], f = d[1] || Ae;
        f.$addControl(e), a.$on("$destroy", function () {
          f.$removeControl(e)
        })
      }
    }
  }, Pe = q({
    require: "ngModel", link: function (a, b, c, d) {
      d.$viewChangeListeners.push(function () {
        a.$eval(c.ngChange)
      })
    }
  }), Qe = function () {
    return {
      require: "?ngModel", link: function (a, b, c, d) {
        if (d) {
          c.required = !0;
          var e = function (a) {
            return c.required && d.$isEmpty(a) ? void d.$setValidity("required", !1) : (d.$setValidity("required", !0), a)
          };
          d.$formatters.push(e), d.$parsers.unshift(e), c.$observe("required", function () {
            e(d.$viewValue)
          })
        }
      }
    }
  }, Re = function () {
    return {
      require: "ngModel", link: function (a, b, d, e) {
        var g = /\/(.*)\//.exec(d.ngList), h = g && new RegExp(g[1]) || d.ngList || ",", i = function (a) {
          if (!r(a)) {
            var b = [];
            return a && f(a.split(h), function (a) {
              a && b.push(Cd(a))
            }), b
          }
        };
        e.$parsers.push(i), e.$formatters.push(function (a) {
          return x(a) ? a.join(", ") : c
        }), e.$isEmpty = function (a) {
          return !a || !a.length
        }
      }
    }
  }, Se = /^(true|false|\d+)$/, Te = function () {
    return {
      priority: 100, compile: function (a, b) {
        return Se.test(b.ngValue) ? function (a, b, c) {
          c.$set("value", a.$eval(c.ngValue))
        } : function (a, b, c) {
          a.$watch(c.ngValue, function (a) {
            c.$set("value", a)
          })
        }
      }
    }
  }, Ue = bd(function (a, b, d) {
    b.addClass("ng-binding").data("$binding", d.ngBind), a.$watch(d.ngBind, function (a) {
      b.text(a == c ? "" : a)
    })
  }), Ve = ["$interpolate", function (a) {
    return function (b, c, d) {
      var e = a(c.attr(d.$attr.ngBindTemplate));
      c.addClass("ng-binding").data("$binding", e), d.$observe("ngBindTemplate", function (a) {
        c.text(a)
      })
    }
  }], We = ["$sce", "$parse", function (a, b) {
    return function (c, d, e) {
      function f() {
        return (g(c) || "").toString()
      }

      d.addClass("ng-binding").data("$binding", e.ngBindHtml);
      var g = b(e.ngBindHtml);
      c.$watch(f, function () {
        d.html(a.getTrustedHtml(g(c)) || "")
      })
    }
  }], Xe = ld("", !0), Ye = ld("Odd", 0), Ze = ld("Even", 1), $e = bd({
    compile: function (a, b) {
      b.$set("ngCloak", c), a.removeClass("ng-cloak")
    }
  }), _e = [function () {
    return {scope: !0, controller: "@", priority: 500}
  }], af = {};
  f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (a) {
    var b = Qb("ng-" + a);
    af[b] = ["$parse", function (c) {
      return {
        compile: function (d, e) {
          var f = c(e[b]);
          return function (b, c) {
            c.on(md(a), function (a) {
              b.$apply(function () {
                f(b, {$event: a})
              })
            })
          }
        }
      }
    }]
  });
  var bf = ["$animate", function (a) {
    return {
      transclude: "element",
      priority: 600,
      terminal: !0,
      restrict: "A",
      $$tlb: !0,
      link: function (c, d, e, f, g) {
        var h, i, j;
        c.$watch(e.ngIf, function (f) {
          T(f) ? i || (i = c.$new(), g(i, function (c) {
            c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "), h = {clone: c}, a.enter(c, d.parent(), d)
          })) : (j && (j.remove(), j = null), i && (i.$destroy(), i = null), h && (j = gb(h.clone), a.leave(j, function () {
            j = null
          }), h = null))
        })
      }
    }
  }], cf = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function (a, b, c, d, e) {
    return {
      restrict: "ECA",
      priority: 400,
      terminal: !0,
      transclude: "element",
      controller: Ad.noop,
      compile: function (f, g) {
        var h = g.ngInclude || g.src, i = g.onload || "", j = g.autoscroll;
        return function (f, g, k, l, m) {
          var n, o, p, q = 0, r = function () {
            o && (o.remove(), o = null), n && (n.$destroy(), n = null), p && (d.leave(p, function () {
              o = null
            }), o = p, p = null)
          };
          f.$watch(e.parseAsResourceUrl(h), function (e) {
            var h = function () {
              !s(j) || j && !f.$eval(j) || c()
            }, k = ++q;
            e ? (a.get(e, {cache: b}).success(function (a) {
              if (k === q) {
                var b = f.$new();
                l.template = a;
                var c = m(b, function (a) {
                  r(), d.enter(a, null, g, h)
                });
                n = b, p = c, n.$emit("$includeContentLoaded"), f.$eval(i)
              }
            }).error(function () {
              k === q && r()
            }), f.$emit("$includeContentRequested")) : (r(), l.template = null)
          })
        }
      }
    }
  }], df = ["$compile", function (a) {
    return {
      restrict: "ECA", priority: -400, require: "ngInclude", link: function (b, c, d, e) {
        c.html(e.template), a(c.contents())(b)
      }
    }
  }], ef = bd({
    priority: 450, compile: function () {
      return {
        pre: function (a, b, c) {
          a.$eval(c.ngInit)
        }
      }
    }
  }), ff = bd({terminal: !0, priority: 1e3}), gf = ["$locale", "$interpolate", function (a, b) {
    var c = /{}/g;
    return {
      restrict: "EA", link: function (d, e, g) {
        var h = g.count, i = g.$attr.when && e.attr(g.$attr.when), j = g.offset || 0, k = d.$eval(i) || {}, l = {}, m = b.startSymbol(), n = b.endSymbol(), o = /^when(Minus)?(.+)$/;
        f(g, function (a, b) {
          o.test(b) && (k[md(b.replace("when", "").replace("Minus", "-"))] = e.attr(g.$attr[b]))
        }), f(k, function (a, d) {
          l[d] = b(a.replace(c, m + h + "-" + j + n))
        }), d.$watch(function () {
          var b = parseFloat(d.$eval(h));
          return isNaN(b) ? "" : (b in k || (b = a.pluralCat(b - j)), l[b](d, e, !0))
        }, function (a) {
          e.text(a)
        })
      }
    }
  }], hf = ["$parse", "$animate", function (a, c) {
    function g(a) {
      return a.clone[0]
    }

    function h(a) {
      return a.clone[a.clone.length - 1]
    }

    var i = "$$NG_REMOVED", j = d("ngRepeat");
    return {
      transclude: "element", priority: 1e3, terminal: !0, $$tlb: !0, link: function (d, k, l, m, n) {
        var o, p, q, r, s, t, u, v, w, x = l.ngRepeat, y = x.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), z = {$id: Fb};
        if (!y)throw j("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", x);
        if (t = y[1], u = y[2], o = y[3], o ? (p = a(o), q = function (a, b, c) {
            return w && (z[w] = a), z[v] = b, z.$index = c, p(d, z)
          }) : (r = function (a, b) {
            return Fb(b)
          }, s = function (a) {
            return a
          }), y = t.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !y)throw j("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", t);
        v = y[3] || y[1], w = y[2];
        var A = {};
        d.$watchCollection(u, function (a) {
          var l, m, o, p, t, u, y, z, B, C, D, E, F = k[0], G = {}, H = [];
          if (e(a))C = a, B = q || r; else {
            B = q || s, C = [];
            for (u in a)a.hasOwnProperty(u) && "$" != u.charAt(0) && C.push(u);
            C.sort()
          }
          for (p = C.length, m = H.length = C.length, l = 0; m > l; l++)if (u = a === C ? l : C[l], y = a[u], z = B(u, y, l), eb(z, "`track by` id"), A.hasOwnProperty(z))D = A[z], delete A[z], G[z] = D, H[l] = D; else {
            if (G.hasOwnProperty(z))throw f(H, function (a) {
              a && a.scope && (A[a.id] = a)
            }), j("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}", x, z);
            H[l] = {id: z}, G[z] = !1
          }
          for (u in A)A.hasOwnProperty(u) && (D = A[u], E = gb(D.clone), c.leave(E), f(E, function (a) {
            a[i] = !0
          }), D.scope.$destroy());
          for (l = 0, m = C.length; m > l; l++) {
            if (u = a === C ? l : C[l], y = a[u], D = H[l], H[l - 1] && (F = h(H[l - 1])), D.scope) {
              t = D.scope, o = F;
              do o = o.nextSibling; while (o && o[i]);
              g(D) != o && c.move(gb(D.clone), null, sd(F)), F = h(D)
            } else t = d.$new();
            t[v] = y, w && (t[w] = u), t.$index = l, t.$first = 0 === l, t.$last = l === p - 1, t.$middle = !(t.$first || t.$last), t.$odd = !(t.$even = 0 === (1 & l)), D.scope || n(t, function (a) {
              a[a.length++] = b.createComment(" end ngRepeat: " + x + " "), c.enter(a, null, sd(F)), F = a, D.scope = t, D.clone = a, G[D.id] = D
            })
          }
          A = G
        })
      }
    }
  }], jf = ["$animate", function (a) {
    return function (b, c, d) {
      b.$watch(d.ngShow, function (b) {
        a[T(b) ? "removeClass" : "addClass"](c, "ng-hide")
      })
    }
  }], kf = ["$animate", function (a) {
    return function (b, c, d) {
      b.$watch(d.ngHide, function (b) {
        a[T(b) ? "addClass" : "removeClass"](c, "ng-hide")
      })
    }
  }], lf = bd(function (a, b, c) {
    a.$watch(c.ngStyle, function (a, c) {
      c && a !== c && f(c, function (a, c) {
        b.css(c, "")
      }), a && b.css(a)
    }, !0)
  }), mf = ["$animate", function (a) {
    return {
      restrict: "EA", require: "ngSwitch", controller: ["$scope", function () {
        this.cases = {}
      }], link: function (b, c, d, e) {
        var g, h, i, j = d.ngSwitch || d.on, k = [];
        b.$watch(j, function (c) {
          var j, l = k.length;
          if (l > 0) {
            if (i) {
              for (j = 0; l > j; j++)i[j].remove();
              i = null
            }
            for (i = [], j = 0; l > j; j++) {
              var m = h[j];
              k[j].$destroy(), i[j] = m, a.leave(m, function () {
                i.splice(j, 1), 0 === i.length && (i = null)
              })
            }
          }
          h = [], k = [], (g = e.cases["!" + c] || e.cases["?"]) && (b.$eval(d.change), f(g, function (c) {
            var d = b.$new();
            k.push(d), c.transclude(d, function (b) {
              var d = c.element;
              h.push(b), a.enter(b, d.parent(), d)
            })
          }))
        })
      }
    }
  }], nf = bd({
    transclude: "element", priority: 800, require: "^ngSwitch", link: function (a, b, c, d, e) {
      d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [], d.cases["!" + c.ngSwitchWhen].push({
        transclude: e,
        element: b
      })
    }
  }), of = bd({
    transclude: "element", priority: 800, require: "^ngSwitch", link: function (a, b, c, d, e) {
      d.cases["?"] = d.cases["?"] || [], d.cases["?"].push({transclude: e, element: b})
    }
  }), pf = bd({
    link: function (a, b, c, e, f) {
      if (!f)throw d("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", U(b));
      f(function (a) {
        b.empty(), b.append(a)
      })
    }
  }), qf = ["$templateCache", function (a) {
    return {
      restrict: "E", terminal: !0, compile: function (b, c) {
        if ("text/ng-template" == c.type) {
          var d = c.id, e = b[0].text;
          a.put(d, e)
        }
      }
    }
  }], rf = d("ngOptions"), sf = q({terminal: !0}), tf = ["$compile", "$parse", function (a, d) {
    var e = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, h = {$setViewValue: o};
    return {
      restrict: "E",
      require: ["select", "?ngModel"],
      controller: ["$element", "$scope", "$attrs", function (a, b, c) {
        var d, e, f = this, g = {}, i = h;
        f.databound = c.ngModel, f.init = function (a, b, c) {
          i = a, d = b, e = c
        }, f.addOption = function (b) {
          eb(b, '"option value"'), g[b] = !0, i.$viewValue == b && (a.val(b), e.parent() && e.remove())
        }, f.removeOption = function (a) {
          this.hasOption(a) && (delete g[a], i.$viewValue == a && this.renderUnknownOption(a))
        }, f.renderUnknownOption = function (b) {
          var c = "? " + Fb(b) + " ?";
          e.val(c), a.prepend(e), a.val(c), e.prop("selected", !0)
        }, f.hasOption = function (a) {
          return g.hasOwnProperty(a)
        }, b.$on("$destroy", function () {
          f.renderUnknownOption = o
        })
      }],
      link: function (h, i, j, k) {
        function l(a, b, c, d) {
          c.$render = function () {
            var a = c.$viewValue;
            d.hasOption(a) ? (z.parent() && z.remove(), b.val(a), "" === a && o.prop("selected", !0)) : r(a) && o ? b.val("") : d.renderUnknownOption(a)
          }, b.on("change", function () {
            a.$apply(function () {
              z.parent() && z.remove(), c.$setViewValue(b.val())
            })
          })
        }

        function m(a, b, c) {
          var d;
          c.$render = function () {
            var a = new Gb(c.$viewValue);
            f(b.find("option"), function (b) {
              b.selected = s(a.get(b.value))
            })
          }, a.$watch(function () {
            L(d, c.$viewValue) || (d = J(c.$viewValue), c.$render())
          }), b.on("change", function () {
            a.$apply(function () {
              var a = [];
              f(b.find("option"), function (b) {
                b.selected && a.push(b.value)
              }), c.$setViewValue(a)
            })
          })
        }

        function n(b, f, h) {
          function i() {
            var a, c, d, e, i, j, q, u, A, B, C, D, E, F, G, H = {"": []}, I = [""], J = h.$modelValue, K = p(b) || [], L = m ? g(K) : K, M = {}, N = !1;
            if (t)if (r && x(J)) {
              N = new Gb([]);
              for (var O = 0; O < J.length; O++)M[l] = J[O], N.put(r(b, M), J[O])
            } else N = new Gb(J);
            for (C = 0; A = L.length, A > C; C++) {
              if (q = C, m) {
                if (q = L[C], "$" === q.charAt(0))continue;
                M[m] = q
              }
              if (M[l] = K[q], a = n(b, M) || "", (c = H[a]) || (c = H[a] = [], I.push(a)), t)D = s(N.remove(r ? r(b, M) : o(b, M))); else {
                if (r) {
                  var P = {};
                  P[l] = J, D = r(b, P) === r(b, M)
                } else D = J === o(b, M);
                N = N || D
              }
              G = k(b, M), G = s(G) ? G : "", c.push({id: r ? r(b, M) : m ? L[C] : C, label: G, selected: D})
            }
            for (t || (v || null === J ? H[""].unshift({id: "", label: "", selected: !N}) : N || H[""].unshift({
              id: "?",
              label: "",
              selected: !0
            })), B = 0, u = I.length; u > B; B++) {
              for (a = I[B], c = H[a], z.length <= B ? (e = {
                element: y.clone().attr("label", a),
                label: c.label
              }, i = [e], z.push(i), f.append(e.element)) : (i = z[B], e = i[0], e.label != a && e.element.attr("label", e.label = a)), E = null, C = 0, A = c.length; A > C; C++)d = c[C], (j = i[C + 1]) ? (E = j.element, j.label !== d.label && E.text(j.label = d.label), j.id !== d.id && E.val(j.id = d.id), j.selected !== d.selected && E.prop("selected", j.selected = d.selected)) : ("" === d.id && v ? F = v : (F = w.clone()).val(d.id).attr("selected", d.selected).text(d.label), i.push(j = {
                element: F,
                label: d.label,
                id: d.id,
                selected: d.selected
              }), E ? E.after(F) : e.element.append(F), E = F);
              for (C++; i.length > C;)i.pop().element.remove()
            }
            for (; z.length > B;)z.pop()[0].element.remove()
          }

          var j;
          if (!(j = u.match(e)))throw rf("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", u, U(f));
          var k = d(j[2] || j[1]), l = j[4] || j[6], m = j[5], n = d(j[3] || ""), o = d(j[2] ? j[1] : l), p = d(j[7]), q = j[8], r = q ? d(j[8]) : null, z = [[{
            element: f,
            label: ""
          }]];
          v && (a(v)(b), v.removeClass("ng-scope"), v.remove()), f.empty(), f.on("change", function () {
            b.$apply(function () {
              var a, d, e, g, i, j, k, n, q, s = p(b) || [], u = {};
              if (t) {
                for (e = [], j = 0, n = z.length; n > j; j++)for (a = z[j], i = 1, k = a.length; k > i; i++)if ((g = a[i].element)[0].selected) {
                  if (d = g.val(), m && (u[m] = d), r)for (q = 0; q < s.length && (u[l] = s[q], r(b, u) != d); q++); else u[l] = s[d];
                  e.push(o(b, u))
                }
              } else {
                if (d = f.val(), "?" == d)e = c; else if ("" === d)e = null; else if (r) {
                  for (q = 0; q < s.length; q++)if (u[l] = s[q], r(b, u) == d) {
                    e = o(b, u);
                    break
                  }
                } else u[l] = s[d], m && (u[m] = d), e = o(b, u);
                z[0].length > 1 && z[0][1].id !== d && (z[0][1].selected = !1)
              }
              h.$setViewValue(e)
            })
          }), h.$render = i, b.$watch(i)
        }

        if (k[1]) {
          for (var o, p = k[0], q = k[1], t = j.multiple, u = j.ngOptions, v = !1, w = sd(b.createElement("option")), y = sd(b.createElement("optgroup")), z = w.clone(), A = 0, B = i.children(), C = B.length; C > A; A++)if ("" === B[A].value) {
            o = v = B.eq(A);
            break
          }
          p.init(q, v, z), t && (q.$isEmpty = function (a) {
            return !a || 0 === a.length
          }), u ? n(h, i, q) : t ? m(h, i, q) : l(h, i, q, p)
        }
      }
    }
  }], uf = ["$interpolate", function (a) {
    var b = {addOption: o, removeOption: o};
    return {
      restrict: "E", priority: 100, compile: function (c, d) {
        if (r(d.value)) {
          var e = a(c.text(), !0);
          e || d.$set("value", c.text())
        }
        return function (a, c, d) {
          var f = "$selectController", g = c.parent(), h = g.data(f) || g.parent().data(f);
          h && h.databound ? c.prop("selected", !1) : h = b, e ? a.$watch(e, function (a, b) {
            d.$set("value", a), a !== b && h.removeOption(b), h.addOption(a)
          }) : h.addOption(d.value), c.on("$destroy", function () {
            h.removeOption(d.value)
          })
        }
      }
    }
  }], vf = q({restrict: "E", terminal: !0});
  return a.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (bb(), ib(Ad), void sd(b).ready(function () {
    $(b, _)
  }))
}(window, document), !angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>'), function (a, b) {
  "use strict";
  function c(a, b, c) {
    d.directive(a, ["$parse", "$swipe", function (d, e) {
      var f = 75, g = .3, h = 30;
      return function (i, j, k) {
        function l(a) {
          if (!m)return !1;
          var c = Math.abs(a.y - m.y), d = (a.x - m.x) * b;
          return n && f > c && d > 0 && d > h && g > c / d
        }

        var m, n, o = d(k[a]);
        e.bind(j, {
          start: function (a) {
            m = a, n = !0
          }, cancel: function () {
            n = !1
          }, end: function (a, b) {
            l(a) && i.$apply(function () {
              j.triggerHandler(c), o(i, {$event: b})
            })
          }
        })
      }
    }])
  }

  var d = b.module("ngTouch", []);
  d.factory("$swipe", [function () {
    function a(a) {
      var b = a.touches && a.touches.length ? a.touches : [a], c = a.changedTouches && a.changedTouches[0] || a.originalEvent && a.originalEvent.changedTouches && a.originalEvent.changedTouches[0] || b[0].originalEvent || b[0];
      return {x: c.clientX, y: c.clientY}
    }

    var b = 10;
    return {
      bind: function (c, d) {
        var e, f, g, h, i = !1;
        c.on("touchstart mousedown", function (b) {
          g = a(b), i = !0, e = 0, f = 0, h = g, d.start && d.start(g, b)
        }), c.on("touchcancel", function (a) {
          i = !1, d.cancel && d.cancel(a)
        }), c.on("touchmove mousemove", function (c) {
          if (i && g) {
            var j = a(c);
            if (e += Math.abs(j.x - h.x), f += Math.abs(j.y - h.y), h = j, !(b > e && b > f))return f > e ? (i = !1, void(d.cancel && d.cancel(c))) : (c.preventDefault(), void(d.move && d.move(j, c)))
          }
        }), c.on("touchend mouseup", function (b) {
          i && (i = !1, d.end && d.end(a(b), b))
        })
      }
    }
  }]), d.config(["$provide", function (a) {
    a.decorator("ngClickDirective", ["$delegate", function (a) {
      return a.shift(), a
    }])
  }]), d.directive("ngClick", ["$parse", "$timeout", "$rootElement", function (a, c, d) {
    function e(a, b, c, d) {
      return Math.abs(a - c) < p && Math.abs(b - d) < p
    }

    function f(a, b, c) {
      for (var d = 0; d < a.length; d += 2)if (e(a[d], a[d + 1], b, c))return a.splice(d, d + 2), !0;
      return !1
    }

    function g(a) {
      if (!(Date.now() - j > o)) {
        var b = a.touches && a.touches.length ? a.touches : [a], c = b[0].clientX, d = b[0].clientY;
        1 > c && 1 > d || l && l[0] === c && l[1] === d || (l && (l = null), "label" === a.target.tagName.toLowerCase() && (l = [c, d]), f(k, c, d) || (a.stopPropagation(), a.preventDefault(), a.target && a.target.blur()))
      }
    }

    function h(a) {
      var b = a.touches && a.touches.length ? a.touches : [a], d = b[0].clientX, e = b[0].clientY;
      k.push(d, e), c(function () {
        for (var a = 0; a < k.length; a += 2)if (k[a] == d && k[a + 1] == e)return void k.splice(a, a + 2)
      }, o, !1)
    }

    function i(a, b) {
      k || (d[0].addEventListener("click", g, !0), d[0].addEventListener("touchstart", h, !0), k = []), j = Date.now(), f(k, a, b)
    }

    var j, k, l, m = 750, n = 12, o = 2500, p = 25, q = "ng-click-active";
    return function (c, d, e) {
      function f() {
        o = !1, d.removeClass(q)
      }

      var g, h, j, k, l = a(e.ngClick), o = !1;
      d.on("touchstart", function (a) {
        o = !0, g = a.target ? a.target : a.srcElement, 3 == g.nodeType && (g = g.parentNode), d.addClass(q), h = Date.now();
        var b = a.touches && a.touches.length ? a.touches : [a], c = b[0].originalEvent || b[0];
        j = c.clientX, k = c.clientY
      }), d.on("touchmove", function () {
        f()
      }), d.on("touchcancel", function () {
        f()
      }), d.on("touchend", function (a) {
        var c = Date.now() - h, l = a.changedTouches && a.changedTouches.length ? a.changedTouches : a.touches && a.touches.length ? a.touches : [a], p = l[0].originalEvent || l[0], q = p.clientX, r = p.clientY, s = Math.sqrt(Math.pow(q - j, 2) + Math.pow(r - k, 2));
        o && m > c && n > s && (i(q, r), g && g.blur(), b.isDefined(e.disabled) && e.disabled !== !1 || d.triggerHandler("click", [a])), f()
      }), d.onclick = function () {
      }, d.on("click", function (a, b) {
        c.$apply(function () {
          l(c, {$event: b || a})
        })
      }), d.on("mousedown", function () {
        d.addClass(q)
      }), d.on("mousemove mouseup", function () {
        d.removeClass(q)
      })
    }
  }]), c("ngSwipeLeft", -1, "swipeleft"), c("ngSwipeRight", 1, "swiperight")
}(window, window.angular), function (a, b) {
  "use strict";
  function c() {
    function a(a, c) {
      return b.extend(new (b.extend(function () {
      }, {prototype: a})), c)
    }

    function c(a, b) {
      var c = b.caseInsensitiveMatch, d = {originalPath: a, regexp: a}, e = d.keys = [];
      return a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function (a, b, c, d) {
        var f = "?" === d ? d : null, g = "*" === d ? d : null;
        return e.push({
          name: c,
          optional: !!f
        }), b = b || "", "" + (f ? "" : b) + "(?:" + (f ? b : "") + (g && "(.+?)" || "([^/]+)") + (f || "") + ")" + (f || "")
      }).replace(/([\/$\*])/g, "\\$1"), d.regexp = new RegExp("^" + a + "$", c ? "i" : ""), d
    }

    var d = {};
    this.when = function (a, e) {
      if (d[a] = b.extend({reloadOnSearch: !0}, e, a && c(a, e)), a) {
        var f = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
        d[f] = b.extend({redirectTo: a}, c(f, e))
      }
      return this
    }, this.otherwise = function (a) {
      return this.when(null, a), this
    }, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce", function (c, e, f, g, h, i, j, k) {
      function l(a, b) {
        var c = b.keys, d = {};
        if (!b.regexp)return null;
        var e = b.regexp.exec(a);
        if (!e)return null;
        for (var f = 1, g = e.length; g > f; ++f) {
          var h = c[f - 1], i = "string" == typeof e[f] ? decodeURIComponent(e[f]) : e[f];
          h && i && (d[h.name] = i)
        }
        return d
      }

      function m() {
        var a = n(), d = q.current;
        a && d && a.$$route === d.$$route && b.equals(a.pathParams, d.pathParams) && !a.reloadOnSearch && !p ? (d.params = a.params, b.copy(d.params, f), c.$broadcast("$routeUpdate", d)) : (a || d) && (p = !1, c.$broadcast("$routeChangeStart", a, d), q.current = a, a && a.redirectTo && (b.isString(a.redirectTo) ? e.path(o(a.redirectTo, a.params)).search(a.params).replace() : e.url(a.redirectTo(a.pathParams, e.path(), e.search())).replace()), g.when(a).then(function () {
          if (a) {
            var c, d, e = b.extend({}, a.resolve);
            return b.forEach(e, function (a, c) {
              e[c] = b.isString(a) ? h.get(a) : h.invoke(a)
            }), b.isDefined(c = a.template) ? b.isFunction(c) && (c = c(a.params)) : b.isDefined(d = a.templateUrl) && (b.isFunction(d) && (d = d(a.params)), d = k.getTrustedResourceUrl(d), b.isDefined(d) && (a.loadedTemplateUrl = d, c = i.get(d, {cache: j}).then(function (a) {
              return a.data
            }))), b.isDefined(c) && (e.$template = c), g.all(e)
          }
        }).then(function (e) {
          a == q.current && (a && (a.locals = e, b.copy(a.params, f)), c.$broadcast("$routeChangeSuccess", a, d))
        }, function (b) {
          a == q.current && c.$broadcast("$routeChangeError", a, d, b)
        }))
      }

      function n() {
        var c, f;
        return b.forEach(d, function (d) {
          !f && (c = l(e.path(), d)) && (f = a(d, {params: b.extend({}, e.search(), c), pathParams: c}), f.$$route = d)
        }), f || d[null] && a(d[null], {params: {}, pathParams: {}})
      }

      function o(a, c) {
        var d = [];
        return b.forEach((a || "").split(":"), function (a, b) {
          if (0 === b)d.push(a); else {
            var e = a.match(/(\w+)(.*)/), f = e[1];
            d.push(c[f]), d.push(e[2] || ""), delete c[f]
          }
        }), d.join("")
      }

      var p = !1, q = {
        routes: d, reload: function () {
          p = !0, c.$evalAsync(m)
        }
      };
      return c.$on("$locationChangeSuccess", m), q
    }]
  }

  function d() {
    this.$get = function () {
      return {}
    }
  }

  function e(a, c, d) {
    return {
      restrict: "ECA", terminal: !0, priority: 400, transclude: "element", link: function (e, f, g, h, i) {
        function j() {
          n && (n.remove(), n = null), l && (l.$destroy(), l = null), m && (d.leave(m, function () {
            n = null
          }), n = m, m = null)
        }

        function k() {
          var g = a.current && a.current.locals, h = g && g.$template;
          if (b.isDefined(h)) {
            var k = e.$new(), n = a.current, q = i(k, function (a) {
              d.enter(a, null, m || f, function () {
                !b.isDefined(o) || o && !e.$eval(o) || c()
              }), j()
            });
            m = q, l = n.scope = k, l.$emit("$viewContentLoaded"), l.$eval(p)
          } else j()
        }

        var l, m, n, o = g.autoscroll, p = g.onload || "";
        e.$on("$routeChangeSuccess", k), k()
      }
    }
  }

  function f(a, b, c) {
    return {
      restrict: "ECA", priority: -400, link: function (d, e) {
        var f = c.current, g = f.locals;
        e.html(g.$template);
        var h = a(e.contents());
        if (f.controller) {
          g.$scope = d;
          var i = b(f.controller, g);
          f.controllerAs && (d[f.controllerAs] = i), e.data("$ngControllerController", i), e.children().data("$ngControllerController", i)
        }
        h(d)
      }
    }
  }

  var g = b.module("ngRoute", ["ng"]).provider("$route", c);
  g.provider("$routeParams", d), g.directive("ngView", e), g.directive("ngView", f), e.$inject = ["$route", "$anchorScroll", "$animate"], f.$inject = ["$compile", "$controller", "$route"]
}(window, window.angular), function (a, b, c) {
  "use strict";
  b.module("ngAnimate", ["ng"]).factory("$$animateReflow", ["$$rAF", "$document", function (a, b) {
    var c = b[0].body;
    return function (b) {
      return a(function () {
        c.offsetWidth + 1;
        b()
      })
    }
  }]).config(["$provide", "$animateProvider", function (d, e) {
    function f(a) {
      for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if (c.nodeType == l)return c
      }
    }

    function g(a) {
      return b.element(f(a))
    }

    function h(a, b) {
      return f(a) == f(b)
    }

    var i = b.noop, j = b.forEach, k = e.$$selectors, l = 1, m = "$$ngAnimateState", n = "ng-animate", o = {running: !0};
    d.decorator("$animate", ["$delegate", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", function (a, c, d, l, p, q) {
      function r(a) {
        if (a) {
          var b = [], e = {}, f = a.substr(1).split(".");
          (d.transitions || d.animations) && b.push(c.get(k[""]));
          for (var g = 0; g < f.length; g++) {
            var h = f[g], i = k[h];
            i && !e[h] && (b.push(c.get(i)), e[h] = !0)
          }
          return b
        }
      }

      function s(a, c, d) {
        function e(a, b) {
          var c = a[b], d = a["before" + b.charAt(0).toUpperCase() + b.substr(1)];
          return c || d ? ("leave" == b && (d = c, c = null), v.push({event: b, fn: c}), s.push({
            event: b,
            fn: d
          }), !0) : void 0
        }

        function f(b, c, e) {
          function f(a) {
            if (c) {
              if ((c[a] || i)(), ++l < g.length)return;
              c = null
            }
            e()
          }

          var g = [];
          j(b, function (a) {
            a.fn && g.push(a)
          });
          var l = 0;
          j(g, function (b, e) {
            var g = function () {
              f(e)
            };
            switch (b.event) {
              case"setClass":
                c.push(b.fn(a, h, k, g));
                break;
              case"addClass":
                c.push(b.fn(a, h || d, g));
                break;
              case"removeClass":
                c.push(b.fn(a, k || d, g));
                break;
              default:
                c.push(b.fn(a, g))
            }
          }), c && 0 === c.length && e()
        }

        var g = a[0];
        if (g) {
          var h, k, l = "setClass" == c, m = l || "addClass" == c || "removeClass" == c;
          b.isArray(d) && (h = d[0], k = d[1], d = h + " " + k);
          var n = a.attr("class"), o = n + " " + d;
          if (z(o)) {
            var p = i, q = [], s = [], t = i, u = [], v = [], w = (" " + o).replace(/\s+/g, ".");
            return j(r(w), function (a) {
              var b = e(a, c);
              !b && l && (e(a, "addClass"), e(a, "removeClass"))
            }), {
              node: g, event: c, className: d, isClassBased: m, isSetClassOperation: l, before: function (a) {
                p = a, f(s, q, function () {
                  p = i, a()
                })
              }, after: function (a) {
                t = a, f(v, u, function () {
                  t = i, a()
                })
              }, cancel: function () {
                q && (j(q, function (a) {
                  (a || i)(!0)
                }), p(!0)), u && (j(u, function (a) {
                  (a || i)(!0)
                }), t(!0))
              }
            }
          }
        }
      }

      function t(a, c, d, e, f, g, h) {
        function i(b) {
          var e = "$animate:" + b;
          u && u[e] && u[e].length > 0 && p(function () {
            d.triggerHandler(e, {event: a, className: c})
          })
        }

        function k() {
          i("before")
        }

        function l() {
          i("after")
        }

        function o() {
          i("close"), h && p(function () {
            h()
          })
        }

        function q() {
          q.hasBeenRun || (q.hasBeenRun = !0, g())
        }

        function r() {
          if (!r.hasBeenRun) {
            r.hasBeenRun = !0;
            var b = d.data(m);
            b && (t && t.isClassBased ? v(d, c) : (p(function () {
              var b = d.data(m) || {};
              H == b.index && v(d, c, a)
            }), d.data(m, b))), o()
          }
        }

        var t = s(d, a, c);
        if (!t)return q(), k(), l(), void r();
        c = t.className;
        var u = b.element._data(t.node);
        u = u && u.events, e || (e = f ? f.parent() : d.parent());
        var y = d.data(m) || {}, z = y.active || {}, A = y.totalActive || 0, B = y.last, C = t.isClassBased ? y.disabled || B && !B.isClassBased : !1;
        if (C || w(d, e))return q(), k(), l(), void r();
        var D = !1;
        if (A > 0) {
          var E = [];
          if (t.isClassBased) {
            if ("setClass" == B.event)E.push(B), v(d, c); else if (z[c]) {
              var F = z[c];
              F.event == a ? D = !0 : (E.push(F), v(d, c))
            }
          } else if ("leave" == a && z["ng-leave"])D = !0; else {
            for (var G in z)E.push(z[G]), v(d, G);
            z = {}, A = 0
          }
          E.length > 0 && j(E, function (a) {
            a.cancel()
          })
        }
        if (!t.isClassBased || t.isSetClassOperation || D || (D = "addClass" == a == d.hasClass(c)), D)return k(), l(), void o();
        "leave" == a && d.one("$destroy", function () {
          var a = b.element(this), c = a.data(m);
          if (c) {
            var d = c.active["ng-leave"];
            d && (d.cancel(), v(a, "ng-leave"))
          }
        }), d.addClass(n);
        var H = x++;
        A++, z[c] = t, d.data(m, {last: t, active: z, index: H, totalActive: A}), k(), t.before(function (b) {
          var e = d.data(m);
          b = b || !e || !e.active[c] || t.isClassBased && e.active[c].event != a, q(), b === !0 ? r() : (l(), t.after(r))
        })
      }

      function u(a) {
        var c = f(a);
        if (c) {
          var d = b.isFunction(c.getElementsByClassName) ? c.getElementsByClassName(n) : c.querySelectorAll("." + n);
          j(d, function (a) {
            a = b.element(a);
            var c = a.data(m);
            c && c.active && j(c.active, function (a) {
              a.cancel()
            })
          })
        }
      }

      function v(a, b) {
        if (h(a, l))o.disabled || (o.running = !1, o.structural = !1); else if (b) {
          var c = a.data(m) || {}, d = b === !0;
          !d && c.active && c.active[b] && (c.totalActive--, delete c.active[b]), (d || !c.totalActive) && (a.removeClass(n), a.removeData(m))
        }
      }

      function w(a, b) {
        if (o.disabled)return !0;
        if (h(a, l))return o.disabled || o.running;
        do {
          if (0 === b.length)break;
          var c = h(b, l), d = c ? o : b.data(m), e = d && (!!d.disabled || d.running || d.totalActive > 0);
          if (c || e)return e;
          if (c)return !0
        } while (b = b.parent());
        return !0
      }

      var x = 0;
      l.data(m, o), q.$$postDigest(function () {
        q.$$postDigest(function () {
          o.running = !1
        })
      });
      var y = e.classNameFilter(), z = y ? function (a) {
        return y.test(a)
      } : function () {
        return !0
      };
      return {
        enter: function (b, c, d, e) {
          this.enabled(!1, b), a.enter(b, c, d), q.$$postDigest(function () {
            b = g(b), t("enter", "ng-enter", b, c, d, i, e)
          })
        }, leave: function (b, c) {
          u(b), this.enabled(!1, b), q.$$postDigest(function () {
            t("leave", "ng-leave", g(b), null, null, function () {
              a.leave(b)
            }, c)
          })
        }, move: function (b, c, d, e) {
          u(b), this.enabled(!1, b), a.move(b, c, d), q.$$postDigest(function () {
            b = g(b), t("move", "ng-move", b, c, d, i, e)
          })
        }, addClass: function (b, c, d) {
          b = g(b), t("addClass", c, b, null, null, function () {
            a.addClass(b, c)
          }, d)
        }, removeClass: function (b, c, d) {
          b = g(b), t("removeClass", c, b, null, null, function () {
            a.removeClass(b, c)
          }, d)
        }, setClass: function (b, c, d, e) {
          b = g(b), t("setClass", [c, d], b, null, null, function () {
            a.setClass(b, c, d)
          }, e)
        }, enabled: function (a, b) {
          switch (arguments.length) {
            case 2:
              if (a)v(b); else {
                var c = b.data(m) || {};
                c.disabled = !0, b.data(m, c)
              }
              break;
            case 1:
              o.disabled = !a;
              break;
            default:
              a = !o.disabled
          }
          return !!a
        }
      }
    }]), e.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", function (d, e, g, h) {
      function k(a, b) {
        J && J(), W.push(b), J = h(function () {
          j(W, function (a) {
            a()
          }), W = [], J = null, U = {}
        })
      }

      function m(a, c) {
        var d = f(a);
        a = b.element(d), Z.push(a);
        var e = Date.now() + c;
        Y >= e || (g.cancel(X), Y = e, X = g(function () {
          n(Z), Z = []
        }, c, !1))
      }

      function n(a) {
        j(a, function (a) {
          var b = a.data(P);
          b && (b.closeAnimationFn || i)()
        })
      }

      function o(a, b) {
        var c = b ? U[b] : null;
        if (!c) {
          var e, f, g, h, i = 0, k = 0, m = 0, n = 0;
          j(a, function (a) {
            if (a.nodeType == l) {
              var b = d.getComputedStyle(a) || {};
              g = b[E + K], i = Math.max(p(g), i), h = b[E + L], e = b[E + M], k = Math.max(p(e), k), f = b[G + M], n = Math.max(p(f), n);
              var c = p(b[G + K]);
              c > 0 && (c *= parseInt(b[G + N], 10) || 1), m = Math.max(c, m)
            }
          }), c = {
            total: 0,
            transitionPropertyStyle: h,
            transitionDurationStyle: g,
            transitionDelayStyle: e,
            transitionDelay: k,
            transitionDuration: i,
            animationDelayStyle: f,
            animationDelay: n,
            animationDuration: m
          }, b && (U[b] = c)
        }
        return c
      }

      function p(a) {
        var c = 0, d = b.isString(a) ? a.split(/\s*,\s*/) : [];
        return j(d, function (a) {
          c = Math.max(parseFloat(a) || 0, c)
        }), c
      }

      function q(a) {
        var b = a.parent(), c = b.data(O);
        return c || (b.data(O, ++V), c = V), c + "-" + f(a).getAttribute("class")
      }

      function r(a, b, c, d) {
        var e = q(b), f = e + " " + c, g = U[f] ? ++U[f].total : 0, h = {};
        if (g > 0) {
          var j = c + "-stagger", k = e + " " + j, l = !U[k];
          l && b.addClass(j), h = o(b, k), l && b.removeClass(j)
        }
        d = d || function (a) {
          return a()
        }, b.addClass(c);
        var m = b.data(P) || {}, n = d(function () {
          return o(b, f)
        }), p = n.transitionDuration, r = n.animationDuration;
        if (0 === p && 0 === r)return b.removeClass(c), !1;
        b.data(P, {running: m.running || 0, itemIndex: g, stagger: h, timings: n, closeAnimationFn: i});
        var s = m.running > 0 || "setClass" == a;
        return p > 0 && t(b, c, s), r > 0 && h.animationDelay > 0 && 0 === h.animationDuration && u(b), !0
      }

      function s(a) {
        return "ng-enter" == a || "ng-move" == a || "ng-leave" == a
      }

      function t(a, b, c) {
        s(b) || !c ? f(a).style[E + L] = "none" : a.addClass(Q)
      }

      function u(a) {
        f(a).style[G] = "none 0s"
      }

      function v(a) {
        var b = E + L, c = f(a);
        c.style[b] && c.style[b].length > 0 && (c.style[b] = ""), a.removeClass(Q)
      }

      function w(a) {
        var b = G, c = f(a);
        c.style[b] && c.style[b].length > 0 && (c.style[b] = "")
      }

      function x(a, b, c, d) {
        function e() {
          b.off(t, g), b.removeClass(k), C(b, c);
          var a = f(b);
          for (var d in v)a.style.removeProperty(v[d])
        }

        function g(a) {
          a.stopPropagation();
          var b = a.originalEvent || a, c = b.$manualTimeStamp || b.timeStamp || Date.now(), e = parseFloat(b.elapsedTime.toFixed(R));
          Math.max(c - s, 0) >= r && e >= p && d()
        }

        var h = f(b), i = b.data(P);
        if (-1 == h.getAttribute("class").indexOf(c) || !i)return void d();
        var k = "";
        j(c.split(" "), function (a, b) {
          k += (b > 0 ? " " : "") + a + "-active"
        });
        var l = i.stagger, n = i.timings, o = i.itemIndex, p = Math.max(n.transitionDuration, n.animationDuration), q = Math.max(n.transitionDelay, n.animationDelay), r = q * T, s = Date.now(), t = H + " " + F, u = "", v = [];
        if (n.transitionDuration > 0) {
          var w = n.transitionPropertyStyle;
          -1 == w.indexOf("all") && (u += I + "transition-property: " + w + ";", u += I + "transition-duration: " + n.transitionDurationStyle + ";", v.push(I + "transition-property"), v.push(I + "transition-duration"))
        }
        if (o > 0) {
          if (l.transitionDelay > 0 && 0 === l.transitionDuration) {
            var x = n.transitionDelayStyle;
            u += I + "transition-delay: " + y(x, l.transitionDelay, o) + "; ", v.push(I + "transition-delay")
          }
          l.animationDelay > 0 && 0 === l.animationDuration && (u += I + "animation-delay: " + y(n.animationDelayStyle, l.animationDelay, o) + "; ", v.push(I + "animation-delay"))
        }
        if (v.length > 0) {
          var z = h.getAttribute("style") || "";
          h.setAttribute("style", z + " " + u)
        }
        b.on(t, g), b.addClass(k), i.closeAnimationFn = function () {
          e(), d()
        };
        var A = o * (Math.max(l.animationDelay, l.transitionDelay) || 0), B = (q + p) * S, D = (A + B) * T;
        return i.running++, m(b, D), e
      }

      function y(a, b, c) {
        var d = "";
        return j(a.split(","), function (a, e) {
          d += (e > 0 ? "," : "") + (c * b + parseInt(a, 10)) + "s"
        }), d
      }

      function z(a, b, c, d) {
        return r(a, b, c, d) ? function (a) {
          a && C(b, c)
        } : void 0
      }

      function A(a, b, c, d) {
        return b.data(P) ? x(a, b, c, d) : (C(b, c), void d())
      }

      function B(a, b, c, d) {
        var e = z(a, b, c);
        if (!e)return void d();
        var f = e;
        return k(b, function () {
          v(b, c), w(b), f = A(a, b, c, d)
        }), function (a) {
          (f || i)(a)
        }
      }

      function C(a, b) {
        a.removeClass(b);
        var c = a.data(P);
        c && (c.running && c.running--, c.running && 0 !== c.running || a.removeData(P))
      }

      function D(a, c) {
        var d = "";
        return a = b.isArray(a) ? a : a.split(/\s+/), j(a, function (a, b) {
          a && a.length > 0 && (d += (b > 0 ? " " : "") + a + c)
        }), d
      }

      var E, F, G, H, I = "";
      a.ontransitionend === c && a.onwebkittransitionend !== c ? (I = "-webkit-", E = "WebkitTransition", F = "webkitTransitionEnd transitionend") : (E = "transition", F = "transitionend"), a.onanimationend === c && a.onwebkitanimationend !== c ? (I = "-webkit-", G = "WebkitAnimation", H = "webkitAnimationEnd animationend") : (G = "animation", H = "animationend");
      var J, K = "Duration", L = "Property", M = "Delay", N = "IterationCount", O = "$$ngAnimateKey", P = "$$ngAnimateCSS3Data", Q = "ng-animate-block-transitions", R = 3, S = 1.5, T = 1e3, U = {}, V = 0, W = [], X = null, Y = 0, Z = [];
      return {
        enter: function (a, b) {
          return B("enter", a, "ng-enter", b)
        }, leave: function (a, b) {
          return B("leave", a, "ng-leave", b)
        }, move: function (a, b) {
          return B("move", a, "ng-move", b)
        }, beforeSetClass: function (a, b, c, d) {
          var e = D(c, "-remove") + " " + D(b, "-add"), f = z("setClass", a, e, function (d) {
            var e = a.attr("class");
            a.removeClass(c), a.addClass(b);
            var f = d();
            return a.attr("class", e), f
          });
          return f ? (k(a, function () {
            v(a, e), w(a), d()
          }), f) : void d()
        }, beforeAddClass: function (a, b, c) {
          var d = z("addClass", a, D(b, "-add"), function (c) {
            a.addClass(b);
            var d = c();
            return a.removeClass(b), d
          });
          return d ? (k(a, function () {
            v(a, b), w(a), c()
          }), d) : void c()
        }, setClass: function (a, b, c, d) {
          c = D(c, "-remove"), b = D(b, "-add");
          var e = c + " " + b;
          return A("setClass", a, e, d)
        }, addClass: function (a, b, c) {
          return A("addClass", a, D(b, "-add"), c)
        }, beforeRemoveClass: function (a, b, c) {
          var d = z("removeClass", a, D(b, "-remove"), function (c) {
            var d = a.attr("class");
            a.removeClass(b);
            var e = c();
            return a.attr("class", d), e
          });
          return d ? (k(a, function () {
            v(a, b), w(a), c()
          }), d) : void c()
        }, removeClass: function (a, b, c) {
          return A("removeClass", a, D(b, "-remove"), c)
        }
      }
    }])
  }])
}(window, window.angular), function () {
  var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.push, h = d.slice, i = d.concat, j = e.toString, k = e.hasOwnProperty, l = d.forEach, m = d.map, n = d.reduce, o = d.reduceRight, p = d.filter, q = d.every, r = d.some, s = d.indexOf, t = d.lastIndexOf, u = Array.isArray, v = Object.keys, w = f.bind, x = function (a) {
    return a instanceof x ? a : this instanceof x ? void(this._wrapped = a) : new x(a)
  };
  "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : a._ = x, x.VERSION = "1.5.2";
  var y = x.each = x.forEach = function (a, b, d) {
    if (null != a)if (l && a.forEach === l)a.forEach(b, d);
    else if (a.length === +a.length) {
      for (var e = 0, f = a.length; f > e; e++)if (b.call(d, a[e], e, a) === c)return
    } else for (var g = x.keys(a), e = 0, f = g.length; f > e; e++)if (b.call(d, a[g[e]], g[e], a) === c)return
  };
  x.map = x.collect = function (a, b, c) {
    var d = [];
    return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function (a, e, f) {
      d.push(b.call(c, a, e, f))
    }), d)
  };
  var z = "Reduce of empty array with no initial value";
  x.reduce = x.foldl = x.inject = function (a, b, c, d) {
    var e = arguments.length > 2;
    if (null == a && (a = []), n && a.reduce === n)return d && (b = x.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
    if (y(a, function (a, f, g) {
        e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
      }), !e)throw new TypeError(z);
    return c
  }, x.reduceRight = x.foldr = function (a, b, c, d) {
    var e = arguments.length > 2;
    if (null == a && (a = []), o && a.reduceRight === o)return d && (b = x.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
    var f = a.length;
    if (f !== +f) {
      var g = x.keys(a);
      f = g.length
    }
    if (y(a, function (h, i, j) {
        i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0)
      }), !e)throw new TypeError(z);
    return c
  }, x.find = x.detect = function (a, b, c) {
    var d;
    return A(a, function (a, e, f) {
      return b.call(c, a, e, f) ? (d = a, !0) : void 0
    }), d
  }, x.filter = x.select = function (a, b, c) {
    var d = [];
    return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function (a, e, f) {
      b.call(c, a, e, f) && d.push(a)
    }), d)
  }, x.reject = function (a, b, c) {
    return x.filter(a, function (a, d, e) {
      return !b.call(c, a, d, e)
    }, c)
  }, x.every = x.all = function (a, b, d) {
    b || (b = x.identity);
    var e = !0;
    return null == a ? e : q && a.every === q ? a.every(b, d) : (y(a, function (a, f, g) {
      return (e = e && b.call(d, a, f, g)) ? void 0 : c
    }), !!e)
  };
  var A = x.some = x.any = function (a, b, d) {
    b || (b = x.identity);
    var e = !1;
    return null == a ? e : r && a.some === r ? a.some(b, d) : (y(a, function (a, f, g) {
      return e || (e = b.call(d, a, f, g)) ? c : void 0
    }), !!e)
  };
  x.contains = x.include = function (a, b) {
    return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a, function (a) {
      return a === b
    })
  }, x.invoke = function (a, b) {
    var c = h.call(arguments, 2), d = x.isFunction(b);
    return x.map(a, function (a) {
      return (d ? b : a[b]).apply(a, c)
    })
  }, x.pluck = function (a, b) {
    return x.map(a, function (a) {
      return a[b]
    })
  }, x.where = function (a, b, c) {
    return x.isEmpty(b) ? c ? void 0 : [] : x[c ? "find" : "filter"](a, function (a) {
      for (var c in b)if (b[c] !== a[c])return !1;
      return !0
    })
  }, x.findWhere = function (a, b) {
    return x.where(a, b, !0)
  }, x.max = function (a, b, c) {
    if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535)return Math.max.apply(Math, a);
    if (!b && x.isEmpty(a))return -1 / 0;
    var d = {computed: -1 / 0, value: -1 / 0};
    return y(a, function (a, e, f) {
      var g = b ? b.call(c, a, e, f) : a;
      g > d.computed && (d = {value: a, computed: g})
    }), d.value
  }, x.min = function (a, b, c) {
    if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535)return Math.min.apply(Math, a);
    if (!b && x.isEmpty(a))return 1 / 0;
    var d = {computed: 1 / 0, value: 1 / 0};
    return y(a, function (a, e, f) {
      var g = b ? b.call(c, a, e, f) : a;
      g < d.computed && (d = {value: a, computed: g})
    }), d.value
  }, x.shuffle = function (a) {
    var b, c = 0, d = [];
    return y(a, function (a) {
      b = x.random(c++), d[c - 1] = d[b], d[b] = a
    }), d
  }, x.sample = function (a, b, c) {
    return arguments.length < 2 || c ? a[x.random(a.length - 1)] : x.shuffle(a).slice(0, Math.max(0, b))
  };
  var B = function (a) {
    return x.isFunction(a) ? a : function (b) {
      return b[a]
    }
  };
  x.sortBy = function (a, b, c) {
    var d = B(b);
    return x.pluck(x.map(a, function (a, b, e) {
      return {value: a, index: b, criteria: d.call(c, a, b, e)}
    }).sort(function (a, b) {
      var c = a.criteria, d = b.criteria;
      if (c !== d) {
        if (c > d || void 0 === c)return 1;
        if (d > c || void 0 === d)return -1
      }
      return a.index - b.index
    }), "value")
  };
  var C = function (a) {
    return function (b, c, d) {
      var e = {}, f = null == c ? x.identity : B(c);
      return y(b, function (c, g) {
        var h = f.call(d, c, g, b);
        a(e, h, c)
      }), e
    }
  };
  x.groupBy = C(function (a, b, c) {
    (x.has(a, b) ? a[b] : a[b] = []).push(c)
  }), x.indexBy = C(function (a, b, c) {
    a[b] = c
  }), x.countBy = C(function (a, b) {
    x.has(a, b) ? a[b]++ : a[b] = 1
  }), x.sortedIndex = function (a, b, c, d) {
    c = null == c ? x.identity : B(c);
    for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
      var h = f + g >>> 1;
      c.call(d, a[h]) < e ? f = h + 1 : g = h
    }
    return f
  }, x.toArray = function (a) {
    return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : []
  }, x.size = function (a) {
    return null == a ? 0 : a.length === +a.length ? a.length : x.keys(a).length
  }, x.first = x.head = x.take = function (a, b, c) {
    return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b)
  }, x.initial = function (a, b, c) {
    return h.call(a, 0, a.length - (null == b || c ? 1 : b))
  }, x.last = function (a, b, c) {
    return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0))
  }, x.rest = x.tail = x.drop = function (a, b, c) {
    return h.call(a, null == b || c ? 1 : b)
  }, x.compact = function (a) {
    return x.filter(a, x.identity)
  };
  var D = function (a, b, c) {
    return b && x.every(a, x.isArray) ? i.apply(c, a) : (y(a, function (a) {
      x.isArray(a) || x.isArguments(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a)
    }), c)
  };
  x.flatten = function (a, b) {
    return D(a, b, [])
  }, x.without = function (a) {
    return x.difference(a, h.call(arguments, 1))
  }, x.uniq = x.unique = function (a, b, c, d) {
    x.isFunction(b) && (d = c, c = b, b = !1);
    var e = c ? x.map(a, c, d) : a, f = [], g = [];
    return y(e, function (c, d) {
      (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d]))
    }), f
  }, x.union = function () {
    return x.uniq(x.flatten(arguments, !0))
  }, x.intersection = function (a) {
    var b = h.call(arguments, 1);
    return x.filter(x.uniq(a), function (a) {
      return x.every(b, function (b) {
        return x.indexOf(b, a) >= 0
      })
    })
  }, x.difference = function (a) {
    var b = i.apply(d, h.call(arguments, 1));
    return x.filter(a, function (a) {
      return !x.contains(b, a)
    })
  }, x.zip = function () {
    for (var a = x.max(x.pluck(arguments, "length").concat(0)), b = new Array(a), c = 0; a > c; c++)b[c] = x.pluck(arguments, "" + c);
    return b
  }, x.object = function (a, b) {
    if (null == a)return {};
    for (var c = {}, d = 0, e = a.length; e > d; d++)b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
    return c
  }, x.indexOf = function (a, b, c) {
    if (null == a)return -1;
    var d = 0, e = a.length;
    if (c) {
      if ("number" != typeof c)return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
      d = 0 > c ? Math.max(0, e + c) : c
    }
    if (s && a.indexOf === s)return a.indexOf(b, c);
    for (; e > d; d++)if (a[d] === b)return d;
    return -1
  }, x.lastIndexOf = function (a, b, c) {
    if (null == a)return -1;
    var d = null != c;
    if (t && a.lastIndexOf === t)return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
    for (var e = d ? c : a.length; e--;)if (a[e] === b)return e;
    return -1
  }, x.range = function (a, b, c) {
    arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
    for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;)f[e++] = a, a += c;
    return f
  };
  var E = function () {
  };
  x.bind = function (a, b) {
    var c, d;
    if (w && a.bind === w)return w.apply(a, h.call(arguments, 1));
    if (!x.isFunction(a))throw new TypeError;
    return c = h.call(arguments, 2), d = function () {
      if (!(this instanceof d))return a.apply(b, c.concat(h.call(arguments)));
      E.prototype = a.prototype;
      var e = new E;
      E.prototype = null;
      var f = a.apply(e, c.concat(h.call(arguments)));
      return Object(f) === f ? f : e
    }
  }, x.partial = function (a) {
    var b = h.call(arguments, 1);
    return function () {
      return a.apply(this, b.concat(h.call(arguments)))
    }
  }, x.bindAll = function (a) {
    var b = h.call(arguments, 1);
    if (0 === b.length)throw new Error("bindAll must be passed function names");
    return y(b, function (b) {
      a[b] = x.bind(a[b], a)
    }), a
  }, x.memoize = function (a, b) {
    var c = {};
    return b || (b = x.identity), function () {
      var d = b.apply(this, arguments);
      return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments)
    }
  }, x.delay = function (a, b) {
    var c = h.call(arguments, 2);
    return setTimeout(function () {
      return a.apply(null, c)
    }, b)
  }, x.defer = function (a) {
    return x.delay.apply(x, [a, 1].concat(h.call(arguments, 1)))
  }, x.throttle = function (a, b, c) {
    var d, e, f, g = null, h = 0;
    c || (c = {});
    var i = function () {
      h = c.leading === !1 ? 0 : new Date, g = null, f = a.apply(d, e)
    };
    return function () {
      var j = new Date;
      h || c.leading !== !1 || (h = j);
      var k = b - (j - h);
      return d = this, e = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e)) : g || c.trailing === !1 || (g = setTimeout(i, k)), f
    }
  }, x.debounce = function (a, b, c) {
    var d, e, f, g, h;
    return function () {
      f = this, e = arguments, g = new Date;
      var i = function () {
        var j = new Date - g;
        b > j ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e)))
      }, j = c && !d;
      return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e)), h
    }
  }, x.once = function (a) {
    var b, c = !1;
    return function () {
      return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b)
    }
  }, x.wrap = function (a, b) {
    return function () {
      var c = [a];
      return g.apply(c, arguments), b.apply(this, c)
    }
  }, x.compose = function () {
    var a = arguments;
    return function () {
      for (var b = arguments, c = a.length - 1; c >= 0; c--)b = [a[c].apply(this, b)];
      return b[0]
    }
  }, x.after = function (a, b) {
    return function () {
      return --a < 1 ? b.apply(this, arguments) : void 0
    }
  }, x.keys = v || function (a) {
    if (a !== Object(a))throw new TypeError("Invalid object");
    var b = [];
    for (var c in a)x.has(a, c) && b.push(c);
    return b
  }, x.values = function (a) {
    for (var b = x.keys(a), c = b.length, d = new Array(c), e = 0; c > e; e++)d[e] = a[b[e]];
    return d
  }, x.pairs = function (a) {
    for (var b = x.keys(a), c = b.length, d = new Array(c), e = 0; c > e; e++)d[e] = [b[e], a[b[e]]];
    return d
  }, x.invert = function (a) {
    for (var b = {}, c = x.keys(a), d = 0, e = c.length; e > d; d++)b[a[c[d]]] = c[d];
    return b
  }, x.functions = x.methods = function (a) {
    var b = [];
    for (var c in a)x.isFunction(a[c]) && b.push(c);
    return b.sort()
  }, x.extend = function (a) {
    return y(h.call(arguments, 1), function (b) {
      if (b)for (var c in b)a[c] = b[c]
    }), a
  }, x.pick = function (a) {
    var b = {}, c = i.apply(d, h.call(arguments, 1));
    return y(c, function (c) {
      c in a && (b[c] = a[c])
    }), b
  }, x.omit = function (a) {
    var b = {}, c = i.apply(d, h.call(arguments, 1));
    for (var e in a)x.contains(c, e) || (b[e] = a[e]);
    return b
  }, x.defaults = function (a) {
    return y(h.call(arguments, 1), function (b) {
      if (b)for (var c in b)void 0 === a[c] && (a[c] = b[c])
    }), a
  }, x.clone = function (a) {
    return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a
  }, x.tap = function (a, b) {
    return b(a), a
  };
  var F = function (a, b, c, d) {
    if (a === b)return 0 !== a || 1 / a == 1 / b;
    if (null == a || null == b)return a === b;
    a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
    var e = j.call(a);
    if (e != j.call(b))return !1;
    switch (e) {
      case"[object String]":
        return a == String(b);
      case"[object Number]":
        return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
      case"[object Date]":
      case"[object Boolean]":
        return +a == +b;
      case"[object RegExp]":
        return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
    }
    if ("object" != typeof a || "object" != typeof b)return !1;
    for (var f = c.length; f--;)if (c[f] == a)return d[f] == b;
    var g = a.constructor, h = b.constructor;
    if (g !== h && !(x.isFunction(g) && g instanceof g && x.isFunction(h) && h instanceof h))return !1;
    c.push(a), d.push(b);
    var i = 0, k = !0;
    if ("[object Array]" == e) {
      if (i = a.length, k = i == b.length)for (; i-- && (k = F(a[i], b[i], c, d)););
    } else {
      for (var l in a)if (x.has(a, l) && (i++, !(k = x.has(b, l) && F(a[l], b[l], c, d))))break;
      if (k) {
        for (l in b)if (x.has(b, l) && !i--)break;
        k = !i
      }
    }
    return c.pop(), d.pop(), k
  };
  x.isEqual = function (a, b) {
    return F(a, b, [], [])
  }, x.isEmpty = function (a) {
    if (null == a)return !0;
    if (x.isArray(a) || x.isString(a))return 0 === a.length;
    for (var b in a)if (x.has(a, b))return !1;
    return !0
  }, x.isElement = function (a) {
    return !(!a || 1 !== a.nodeType)
  }, x.isArray = u || function (a) {
    return "[object Array]" == j.call(a)
  }, x.isObject = function (a) {
    return a === Object(a)
  }, y(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (a) {
    x["is" + a] = function (b) {
      return j.call(b) == "[object " + a + "]"
    }
  }), x.isArguments(arguments) || (x.isArguments = function (a) {
    return !(!a || !x.has(a, "callee"))
  }), "function" != typeof/./ && (x.isFunction = function (a) {
    return "function" == typeof a
  }), x.isFinite = function (a) {
    return isFinite(a) && !isNaN(parseFloat(a))
  }, x.isNaN = function (a) {
    return x.isNumber(a) && a != +a
  }, x.isBoolean = function (a) {
    return a === !0 || a === !1 || "[object Boolean]" == j.call(a)
  }, x.isNull = function (a) {
    return null === a
  }, x.isUndefined = function (a) {
    return void 0 === a
  }, x.has = function (a, b) {
    return k.call(a, b)
  }, x.noConflict = function () {
    return a._ = b, this
  }, x.identity = function (a) {
    return a
  }, x.times = function (a, b, c) {
    for (var d = Array(Math.max(0, a)), e = 0; a > e; e++)d[e] = b.call(c, e);
    return d
  }, x.random = function (a, b) {
    return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
  };
  var G = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;"}};
  G.unescape = x.invert(G.escape);
  var H = {
    escape: new RegExp("[" + x.keys(G.escape).join("") + "]", "g"),
    unescape: new RegExp("(" + x.keys(G.unescape).join("|") + ")", "g")
  };
  x.each(["escape", "unescape"], function (a) {
    x[a] = function (b) {
      return null == b ? "" : ("" + b).replace(H[a], function (b) {
        return G[a][b]
      })
    }
  }), x.result = function (a, b) {
    if (null == a)return void 0;
    var c = a[b];
    return x.isFunction(c) ? c.call(a) : c
  }, x.mixin = function (a) {
    y(x.functions(a), function (b) {
      var c = x[b] = a[b];
      x.prototype[b] = function () {
        var a = [this._wrapped];
        return g.apply(a, arguments), M.call(this, c.apply(x, a))
      }
    })
  };
  var I = 0;
  x.uniqueId = function (a) {
    var b = ++I + "";
    return a ? a + b : b
  }, x.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
  var J = /(.)^/, K = {
    "'": "'",
    "\\": "\\",
    "\r": "r",
    "\n": "n",
    "	": "t",
    "\u2028": "u2028",
    "\u2029": "u2029"
  }, L = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  x.template = function (a, b, c) {
    var d;
    c = x.defaults({}, c, x.templateSettings);
    var e = new RegExp([(c.escape || J).source, (c.interpolate || J).source, (c.evaluate || J).source].join("|") + "|$", "g"), f = 0, g = "__p+='";
    a.replace(e, function (b, c, d, e, h) {
      return g += a.slice(f, h).replace(L, function (a) {
        return "\\" + K[a]
      }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b
    }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
    try {
      d = new Function(c.variable || "obj", "_", g)
    } catch (h) {
      throw h.source = g, h
    }
    if (b)return d(b, x);
    var i = function (a) {
      return d.call(this, a, x)
    };
    return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i
  }, x.chain = function (a) {
    return x(a).chain()
  };
  var M = function (a) {
    return this._chain ? x(a).chain() : a
  };
  x.mixin(x), y(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (a) {
    var b = d[a];
    x.prototype[a] = function () {
      var c = this._wrapped;
      return b.apply(c, arguments), "shift" != a && "splice" != a || 0 !== c.length || delete c[0], M.call(this, c)
    }
  }), y(["concat", "join", "slice"], function (a) {
    var b = d[a];
    x.prototype[a] = function () {
      return M.call(this, b.apply(this._wrapped, arguments))
    }
  }), x.extend(x.prototype, {
    chain: function () {
      return this._chain = !0, this
    }, value: function () {
      return this._wrapped
    }
  })
}.call(this);
var mod;
mod = angular.module("infinite-scroll", []), mod.value("THROTTLE_MILLISECONDS", null), mod.directive("infiniteScroll", ["$rootScope", "$window", "$timeout", "THROTTLE_MILLISECONDS", function (a, b, c, d) {
  return {
    scope: {
      infiniteScroll: "&",
      infiniteScrollContainer: "=",
      infiniteScrollDistance: "=",
      infiniteScrollDisabled: "="
    }, link: function (e, f, g) {
      var h, i, j, k, l, m, n, o, p, q, r;
      return b = angular.element(b), p = null, q = null, i = null, j = null, o = !0, n = function () {
        var a, c, d, g;
        if (j === b)a = j.height() + j.scrollTop(), c = f.offset().top + f.height(); else {
          a = j.height();
          var h = angular.isUndefined(j.offset()) ? 0 : j.offset().top;
          c = f.offset().top - h + f.height()
        }
        return d = c - a, g = d <= j.height() * p + 1, g && q ? e.infiniteScroll() : g ? i = !0 : void 0
      }, r = function (a, b) {
        var d, e, f;
        return f = null, e = 0, d = function () {
          var b;
          return e = (new Date).getTime(), c.cancel(f), f = null, a.call(), b = null
        }, function () {
          var g, h;
          return g = (new Date).getTime(), h = b - (g - e), 0 >= h ? (clearTimeout(f), c.cancel(f), f = null, e = g, a.call()) : f ? void 0 : f = c(d, h)
        }
      }, null != d && (n = r(n, d)), e.$on("$destroy", function () {
        return j.off("scroll", n)
      }), m = function (a) {
        return p = parseInt(a, 10) || 0
      }, e.$watch("infiniteScrollDistance", m), m(e.infiniteScrollDistance), l = function (a) {
        return q = !a, q && i ? (i = !1, n()) : void 0
      }, e.$watch("infiniteScrollDisabled", l), l(e.infiniteScrollDisabled), h = function (a) {
        return null != j && j.off("scroll", n), j = a, null != a ? j.on("scroll", n) : void 0
      }, h(b), k = function (a) {
        if (null != a && 0 !== a.length) {
          if (a = angular.element(a), null != a)return h(a);
          throw new Exception("invalid infinite-scroll-container attribute.")
        }
      }, e.$watch("infiniteScrollContainer", k), k(e.infiniteScrollContainer || []), null != g.infiniteScrollParent && h(angular.element(f.parent())), null != g.infiniteScrollImmediateCheck && (o = e.$eval(g.infiniteScrollImmediateCheck)), a.$on("scrollableLoaded", n), c(function () {
        return o ? n() : void 0
      }, 0)
    }
  }
}]), !function () {
  function a(a) {
    console.log("$f.fireEvent", [].slice.call(a))
  }

  function b(a) {
    if (!a || "object" != typeof a)return a;
    var c = new a.constructor;
    for (var d in a)a.hasOwnProperty(d) && (c[d] = b(a[d]));
    return c
  }

  function c(a, b) {
    if (a) {
      var c, d = 0, e = a.length;
      if (void 0 === e) {
        for (c in a)if (b.call(a[c], c, a[c]) === !1)break
      } else for (var f = a[0]; e > d && b.call(f, d, f) !== !1; f = a[++d]);
      return a
    }
  }

  function d(a) {
    return document.getElementById(a)
  }

  function e(a, b, d) {
    return "object" != typeof b ? a : (a && b && c(b, function (b, c) {
      d && "function" == typeof c || (a[b] = c)
    }), a)
  }

  function f(a) {
    var b = a.indexOf(".");
    if (-1 != b) {
      var d = a.slice(0, b) || "*", e = a.slice(b + 1, a.length), f = [];
      return c(document.getElementsByTagName(d), function () {
        this.className && -1 != this.className.indexOf(e) && f.push(this)
      }), f
    }
  }

  function g(a) {
    return a = a || window.event, a.preventDefault ? (a.stopPropagation(), a.preventDefault()) : (a.returnValue = !1, a.cancelBubble = !0), !1
  }

  function h(a, b, c) {
    a[b] = a[b] || [], a[b].push(c)
  }

  function i(a) {
    return a.replace(/&amp;/g, "%26").replace(/&/g, "%26").replace(/=/g, "%3D")
  }

  function j() {
    return "_" + ("" + Math.random()).slice(2, 10)
  }

  function k(f, k, l) {
    function p() {
      function a(a) {
        return !/iPad|iPhone|iPod/i.test(navigator.userAgent) || /.flv$/i.test(B[0].url) || b() ? (y.isLoaded() || y._fireEvent("onBeforeClick") === !1 || y.load(), g(a)) : !0
      }

      function b() {
        return y.hasiPadSupport && y.hasiPadSupport()
      }

      function d() {
        "" !== q.replace(/\s/g, "") ? f.addEventListener ? f.addEventListener("click", a, !1) : f.attachEvent && f.attachEvent("onclick", a) : (f.addEventListener && !b() && f.addEventListener("click", g, !1), y.load())
      }

      $f(f) ? ($f(f).getParent().innerHTML = "", u = $f(f).getIndex(), o[u] = y) : (o.push(y), u = o.length - 1), x = parseInt(f.style.height, 10) || f.clientHeight, s = f.id || "fp" + j(), t = k.id || s + "_api", k.id = t, q = f.innerHTML, "string" == typeof l && (l = {clip: {url: l}}), l.playerId = s, l.clip = l.clip || {}, f.getAttribute("href", 2) && !l.clip.url && (l.clip.url = f.getAttribute("href", 2)), l.clip.url && (l.clip.url = i(l.clip.url)), r = new m(l.clip, -1, y), l.playlist = l.playlist || [l.clip];
      var e = 0;
      c(l.playlist, function () {
        var a = this;
        "object" == typeof a && a.length && (a = {url: "" + a}), a.url && (a.url = i(a.url)), c(l.clip, function (b, c) {
          void 0 !== c && void 0 === a[b] && "function" != typeof c && (a[b] = c)
        }), l.playlist[e] = a, a = new m(a, e, y), B.push(a), e++
      }), c(l, function (a, b) {
        "function" == typeof b && (r[a] ? r[a](b) : h(D, a, b), delete l[a])
      }), c(l.plugins, function (a, b) {
        b && (C[a] = new n(a, b, y))
      }), l.plugins && void 0 !== l.plugins.controls || (C.controls = new n("controls", null, y)), C.canvas = new n("canvas", null, y), q = f.innerHTML, setTimeout(d, 0)
    }

    var q, r, s, t, u, v, w, x, y = this, z = null, A = !1, B = [], C = {}, D = {};
    if (e(y, {
        id: function () {
          return s
        }, isLoaded: function () {
          return null !== z && void 0 !== z.fp_play && !A
        }, getParent: function () {
          return f
        }, hide: function (a) {
          return a && (f.style.height = "0px"), y.isLoaded() && (z.style.height = "0px"), y
        }, show: function () {
          return f.style.height = x + "px", y.isLoaded() && (z.style.height = w + "px"), y
        }, isHidden: function () {
          return y.isLoaded() && 0 === parseInt(z.style.height, 10)
        }, load: function (a) {
          if (!y.isLoaded() && y._fireEvent("onBeforeLoad") !== !1) {
            var b = function () {
              q && !flashembed.isSupported(k.version) && (f.innerHTML = ""), a && (a.cached = !0, h(D, "onLoad", a)), flashembed(f, k, {config: l})
            }, d = 0;
            c(o, function () {
              this.unload(function () {
                ++d == o.length && b()
              })
            })
          }
          return y
        }, unload: function (a) {
          if ("" !== q.replace(/\s/g, "")) {
            if (y._fireEvent("onBeforeUnload") === !1)return a && a(!1), y;
            A = !0;
            try {
              z && (z.fp_isFullscreen() && z.fp_toggleFullscreen(), z.fp_close(), y._fireEvent("onUnload"))
            } catch (b) {
            }
            var c = function () {
              z = null, f.innerHTML = q, A = !1, a && a(!0)
            };
            /WebKit/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent) ? setTimeout(c, 0) : c()
          } else a && a(!1);
          return y
        }, getClip: function (a) {
          return void 0 === a && (a = v), B[a]
        }, getCommonClip: function () {
          return r
        }, getPlaylist: function () {
          return B
        }, getPlugin: function (a) {
          var b = C[a];
          if (!b && y.isLoaded()) {
            var c = y._api().fp_getPlugin(a);
            c && (b = new n(a, c, y), C[a] = b)
          }
          return b
        }, getScreen: function () {
          return y.getPlugin("screen")
        }, getControls: function () {
          return y.getPlugin("controls")._fireEvent("onUpdate")
        }, getLogo: function () {
          try {
            return y.getPlugin("logo")._fireEvent("onUpdate")
          } catch (a) {
          }
        }, getPlay: function () {
          return y.getPlugin("play")._fireEvent("onUpdate")
        }, getConfig: function (a) {
          return a ? b(l) : l
        }, getFlashParams: function () {
          return k
        }, loadPlugin: function (a, b, c, d) {
          "function" == typeof c && (d = c, c = {});
          var e = d ? j() : "_";
          y._api().fp_loadPlugin(a, b, c, e);
          var f = {};
          f[e] = d;
          var g = new n(a, null, y, f);
          return C[a] = g, g
        }, getState: function () {
          return y.isLoaded() ? z.fp_getState() : -1
        }, play: function (a, b) {
          var c = function () {
            void 0 !== a ? y._api().fp_play(a, b) : y._api().fp_play()
          };
          return y.isLoaded() ? c() : A ? setTimeout(function () {
            y.play(a, b)
          }, 50) : y.load(function () {
            c()
          }), y
        }, getVersion: function () {
          var a = "flowplayer.js 3.2.12";
          if (y.isLoaded()) {
            var b = z.fp_getVersion();
            return b.push(a), b
          }
          return a
        }, _api: function () {
          if (!y.isLoaded())throw"Flowplayer " + y.id() + " not loaded when calling an API method";
          return z
        }, setClip: function (a) {
          return c(a, function (b, c) {
            "function" == typeof c ? (h(D, b, c), delete a[b]) : "onCuepoint" == b && $f(f).getCommonClip().onCuepoint(a[b][0], a[b][1])
          }), y.setPlaylist([a]), y
        }, getIndex: function () {
          return u
        }, bufferAnimate: function (a) {
          return z.fp_bufferAnimate(void 0 === a || a), y
        }, _swfHeight: function () {
          return z.clientHeight
        }
      }), c("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut".split(","), function () {
        var a = "on" + this;
        if (-1 != a.indexOf("*")) {
          a = a.slice(0, a.length - 1);
          var b = "onBefore" + a.slice(2);
          y[b] = function (a) {
            return h(D, b, a), y
          }
        }
        y[a] = function (b) {
          return h(D, a, b), y
        }
      }), c("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled".split(","), function () {
        var a = this;
        y[a] = function (b, c) {
          if (!y.isLoaded())return y;
          var d = null;
          return d = void 0 !== b && void 0 !== c ? z["fp_" + a](b, c) : void 0 === b ? z["fp_" + a]() : z["fp_" + a](b), "undefined" === d || void 0 === d ? y : d
        }
      }), y._fireEvent = function (b) {
        "string" == typeof b && (b = [b]);
        var e = b[0], f = b[1], g = b[2], h = b[3], i = 0;
        if (l.debug && a(b), y.isLoaded() || "onLoad" != e || "player" != f || (z = z || d(t), w = y._swfHeight(), c(B, function () {
            this._fireEvent("onLoad")
          }), c(C, function (a, b) {
            b._fireEvent("onUpdate")
          }), r._fireEvent("onLoad")), "onLoad" != e || "player" == f) {
          if ("onError" == e && ("string" == typeof f || "number" == typeof f && "number" == typeof g) && (f = g, g = h), "onContextMenu" == e)return void c(l.contextMenu[f], function (a, b) {
            b.call(y)
          });
          if ("onPluginEvent" != e && "onBeforePluginEvent" != e) {
            if ("onPlaylistReplace" == e) {
              B = [];
              var j = 0;
              c(f, function () {
                B.push(new m(this, j++, y))
              })
            }
            if ("onClipAdd" == e) {
              if (f.isInStream)return;
              for (f = new m(f, g, y), B.splice(g, 0, f), i = g + 1; i < B.length; i++)B[i].index++
            }
            var k = !0;
            if ("number" == typeof f && f < B.length) {
              v = f;
              var n = B[f];
              n && (k = n._fireEvent(e, g, h)), n && k === !1 || (k = r._fireEvent(e, g, h, n))
            }
            return c(D[e], function () {
              return k = this.call(y, f, g), this.cached && D[e].splice(i, 1), k === !1 ? !1 : void i++
            }), k
          }
          var o = f.name || f, p = C[o];
          if (p)return p._fireEvent("onUpdate", f), p._fireEvent(g, b.slice(3))
        }
      }, "string" == typeof f) {
      var E = d(f);
      if (!E)throw"Flowplayer cannot access element: " + f;
      f = E, p()
    } else p()
  }

  function l(a) {
    this.length = a.length, this.each = function (b) {
      c(a, b)
    }, this.size = function () {
      return a.length
    };
    var b = this;
    for (name in k.prototype)b[name] = function () {
      var a = arguments;
      b.each(function () {
        this[name].apply(this, a)
      })
    }
  }

  var m = function (a, b, d) {
    var f = this, g = {}, i = {};
    if (f.index = b, "string" == typeof a && (a = {url: a}), e(this, a, !0), c("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop".split(","), function () {
        var a = "on" + this;
        if (-1 != a.indexOf("*")) {
          a = a.slice(0, a.length - 1);
          var c = "onBefore" + a.slice(2);
          f[c] = function (a) {
            return h(i, c, a), f
          }
        }
        f[a] = function (b) {
          return h(i, a, b), f
        }, -1 == b && (f[c] && (d[c] = f[c]), f[a] && (d[a] = f[a]))
      }), e(this, {
        onCuepoint: function (a, c) {
          if (1 == arguments.length)return g.embedded = [null, a], f;
          "number" == typeof a && (a = [a]);
          var e = j();
          return g[e] = [a, c], d.isLoaded() && d._api().fp_addCuepoints(a, b, e), f
        }, update: function (a) {
          e(f, a), d.isLoaded() && d._api().fp_updateClip(a, b);
          var c = d.getConfig(), g = -1 == b ? c.clip : c.playlist[b];
          e(g, a, !0)
        }, _fireEvent: function (a, h, j, k) {
          if ("onLoad" == a)return c(g, function (a, c) {
            c[0] && d._api().fp_addCuepoints(c[0], b, a)
          }), !1;
          if (k = k || f, "onCuepoint" == a) {
            var l = g[h];
            if (l)return l[1].call(d, k, j)
          }
          h && -1 != "onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(a) && (e(k, h), h.metaData && (k.duration ? k.fullDuration = h.metaData.duration : k.duration = h.metaData.duration));
          var m = !0;
          return c(i[a], function () {
            m = this.call(d, k, h, j)
          }), m
        }
      }), a.onCuepoint) {
      var k = a.onCuepoint;
      f.onCuepoint.apply(f, "function" == typeof k ? [k] : k), delete a.onCuepoint
    }
    c(a, function (b, c) {
      "function" == typeof c && (h(i, b, c), delete a[b])
    }), -1 == b && (d.onCuepoint = this.onCuepoint)
  }, n = function (a, b, d, f) {
    var g = this, h = {}, i = !1;
    f && e(h, f), c(b, function (a, c) {
      "function" == typeof c && (h[a] = c, delete b[a])
    }), e(this, {
      animate: function (c, e, f) {
        if (!c)return g;
        if ("function" == typeof e && (f = e, e = 500), "string" == typeof c) {
          var i = c;
          c = {}, c[i] = e, e = 500
        }
        if (f) {
          var k = j();
          h[k] = f
        }
        return void 0 === e && (e = 500), b = d._api().fp_animate(a, c, e, k), g
      }, css: function (c, f) {
        if (void 0 !== f) {
          var h = {};
          h[c] = f, c = h
        }
        return b = d._api().fp_css(a, c), e(g, b), g
      }, show: function () {
        return this.display = "block", d._api().fp_showPlugin(a), g
      }, hide: function () {
        return this.display = "none", d._api().fp_hidePlugin(a), g
      }, toggle: function () {
        return this.display = d._api().fp_togglePlugin(a), g
      }, fadeTo: function (b, c, e) {
        if ("function" == typeof c && (e = c, c = 500), e) {
          var f = j();
          h[f] = e
        }
        return this.display = d._api().fp_fadeTo(a, b, c, f), this.opacity = b, g
      }, fadeIn: function (a, b) {
        return g.fadeTo(1, a, b)
      }, fadeOut: function (a, b) {
        return g.fadeTo(0, a, b)
      }, getName: function () {
        return a
      }, getPlayer: function () {
        return d
      }, _fireEvent: function (b, f) {
        if ("onUpdate" == b) {
          var j = d._api().fp_getPlugin(a);
          if (!j)return;
          e(g, j), delete g.methods, i || (c(j.methods, function () {
            var b = "" + this;
            g[b] = function () {
              var c = [].slice.call(arguments), e = d._api().fp_invoke(a, b, c);
              return "undefined" === e || void 0 === e ? g : e
            }
          }), i = !0)
        }
        var k = h[b];
        if (k) {
          var l = k.apply(g, f);
          return "_" == b.slice(0, 1) && delete h[b], l
        }
        return g
      }
    })
  }, o = [];
  window.flowplayer = window.$f = function () {
    var a = null, g = arguments[0];
    if (!arguments.length)return c(o, function () {
      return this.isLoaded() ? (a = this, !1) : void 0
    }), a || o[0];
    if (1 == arguments.length)return "number" == typeof g ? o[g] : "*" == g ? new l(o) : (c(o, function () {
      return this.id() == g.id || this.id() == g || this.getParent() == g ? (a = this, !1) : void 0
    }), a);
    if (arguments.length > 1) {
      var h = arguments[1], i = 3 == arguments.length ? arguments[2] : {};
      if ("string" == typeof h && (h = {src: h}), h = e({
          bgcolor: "#000000",
          version: [10, 1],
          expressInstall: "http://releases.flowplayer.org/swf/expressinstall.swf",
          cachebusting: !1
        }, h), "string" == typeof g) {
        if (-1 != g.indexOf(".")) {
          var j = [];
          return c(f(g), function () {
            j.push(new k(this, b(h), b(i)))
          }), new l(j)
        }
        var m = d(g);
        return new k(null !== m ? m : b(g), b(h), b(i))
      }
      if (g)return new k(g, b(h), b(i))
    }
    return null
  }, e(window.$f, {
    fireEvent: function () {
      var a = [].slice.call(arguments), b = $f(a[0]);
      return b ? b._fireEvent(a.slice(1)) : null
    }, addPlugin: function (a, b) {
      return k.prototype[a] = b, $f
    }, each: c, extend: e
  }), "function" == typeof jQuery && (jQuery.fn.flowplayer = function (a, c) {
    if (!arguments.length || "number" == typeof arguments[0]) {
      var d = [];
      return this.each(function () {
        var a = $f(this);
        a && d.push(a)
      }), arguments.length ? d[arguments[0]] : new l(d)
    }
    return this.each(function () {
      $f(this, b(a), c ? b(c) : {})
    })
  })
}(), !function () {
  function a(a, b) {
    if (b)for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c]);
    return a
  }

  function b(a, b) {
    var c = [];
    for (var d in a)a.hasOwnProperty(d) && (c[d] = b(a[d]));
    return c
  }

  function c(b, c, f) {
    if (i.isSupported(c.version))b.innerHTML = i.getHTML(c, f); else if (c.expressInstall && i.isSupported([6, 65]))b.innerHTML = i.getHTML(a(c, {src: c.expressInstall}), {
      MMredirectURL: encodeURIComponent(location.href),
      MMplayerType: "PlugIn",
      MMdoctitle: document.title
    }); else if (b.innerHTML.replace(/\s/g, "") || (b.innerHTML = "<h2>Flash version " + c.version + " or greater is required</h2><h3>" + (j[0] > 0 ? "Your version is " + j : "You have no flash plugin installed") + "</h3>" + ("A" == b.tagName ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='" + e + "'>here</a></p>"), ("A" == b.tagName || "DIV" == b.tagName) && (b.onclick = function () {
        location.href = e
      })), c.onFail) {
      var g = c.onFail.call(this);
      "string" == typeof g && (b.innerHTML = g)
    }
    d && (window[c.id] = document.getElementById(c.id)), a(this, {
      getRoot: function () {
        return b
      }, getOptions: function () {
        return c
      }, getConf: function () {
        return f
      }, getApi: function () {
        return b.firstChild
      }
    })
  }

  var d = document.all, e = "http://get.adobe.com/flashplayer", f = "function" == typeof jQuery, g = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/, h = {
    width: "100%",
    height: "100%",
    id: "_" + ("" + Math.random()).slice(9),
    allowfullscreen: !0,
    allowscriptaccess: "always",
    quality: "high",
    version: [3, 0],
    onFail: null,
    expressInstall: null,
    w3c: !1,
    cachebusting: !1
  };
  window.attachEvent && window.attachEvent("onbeforeunload", function () {
    __flash_unloadHandler = function () {
    }, __flash_savedUnloadHandler = function () {
    }
  }), window.flashembed = function (b, d, e) {
    return "string" == typeof b && (b = document.getElementById(b.replace("#", ""))), b ? ("string" == typeof d && (d = {src: d}), new c(b, a(a({}, h), d), e)) : void 0
  };
  var i = a(window.flashembed, {
    conf: h, getVersion: function () {
      var a, b;
      try {
        b = navigator.plugins["Shockwave Flash"].description.slice(16)
      } catch (c) {
        try {
          a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), b = a && a.GetVariable("$version")
        } catch (d) {
          try {
            a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), b = a && a.GetVariable("$version")
          } catch (e) {
          }
        }
      }
      return b = g.exec(b), b ? [1 * b[1], 1 * b[1 * b[1] > 9 ? 2 : 3] * 1] : [0, 0]
    }, asString: function (a) {
      if (null === a || void 0 === a)return null;
      var c = typeof a;
      switch ("object" == c && a.push && (c = "array"), c) {
        case"string":
          return a = a.replace(new RegExp('(["\\\\])', "g"), "\\$1"), a = a.replace(/^\s?(\d+\.?\d*)%/, "$1pct"), '"' + a + '"';
        case"array":
          return "[" + b(a, function (a) {
              return i.asString(a)
            }).join(",") + "]";
        case"function":
          return '"function()"';
        case"object":
          var d = [];
          for (var e in a)a.hasOwnProperty(e) && d.push('"' + e + '":' + i.asString(a[e]));
          return "{" + d.join(",") + "}"
      }
      return String(a).replace(/\s/g, " ").replace(/\'/g, '"')
    }, getHTML: function (b, c) {
      b = a({}, b);
      var e = '<object width="' + b.width + '" height="' + b.height + '" id="' + b.id + '" name="' + b.id + '"';
      b.cachebusting && (b.src += (-1 != b.src.indexOf("?") ? "&" : "?") + Math.random()), e += b.w3c || !d ? ' data="' + b.src + '" type="application/x-shockwave-flash"' : ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"', e += ">", (b.w3c || d) && (e += '<param name="movie" value="' + b.src + '" />'), b.width = b.height = b.id = b.w3c = b.src = null, b.onFail = b.version = b.expressInstall = null;
      for (var f in b)b[f] && (e += '<param name="' + f + '" value="' + b[f] + '" />');
      var g = "";
      if (c) {
        for (var h in c)if (c[h]) {
          var j = c[h];
          g += h + "=" + (/function|object/.test(typeof j) ? i.asString(j) : j) + "&"
        }
        g = g.slice(0, -1), e += '<param name="flashvars" value=\'' + g + "' />"
      }
      return e += "</object>"
    }, isSupported: function (a) {
      return j[0] > a[0] || j[0] == a[0] && j[1] >= a[1]
    }
  }), j = i.getVersion();
  f && (jQuery.tools = jQuery.tools || {version: "3.2.12"}, jQuery.tools.flashembed = {conf: h}, jQuery.fn.flashembed = function (a, b) {
    return this.each(function () {
      $(this).data("flashembed", flashembed(this, a, b))
    })
  })
}(), $f.addPlugin("ipad", function (a) {
  function b(a, c, d) {
    if (c)for (key in c)if (key) {
      if (c[key] && "function" == typeof c[key] && !d)continue;
      if (c[key] && "object" == typeof c[key] && void 0 === c[key].length) {
        var e = {};
        b(e, c[key]), a[key] = e
      } else a[key] = c[key]
    }
    return a
  }

  function c() {
    if (N.debug)if (L) {
      var a = [].splice.call(arguments, 0).join(", ");
      console.log.apply(console, [a])
    } else console.log.apply(console, arguments)
  }

  function d(a) {
    switch (a) {
      case-1:
        return "UNLOADED";
      case 0:
        return "LOADED";
      case 1:
        return "UNSTARTED";
      case 2:
        return "BUFFERING";
      case 3:
        return "PLAYING";
      case 4:
        return "PAUSED";
      case 5:
        return "ENDED"
    }
    return "UNKOWN"
  }

  function e(a) {
    var b = $f.fireEvent(z.id(), "onBefore" + a, E);
    return b !== !1
  }

  function f(a) {
    return a.stopPropagation(), a.preventDefault(), !1
  }

  function g(a, b) {
    (J != s || b) && (K = J, J = a, j(), a == w && i(), c(d(a)))
  }

  function h() {
    M.fp_stop(), B = !1, C = !1, D = !1, g(u), g(u)
  }

  function i() {
    Q || (console.log("starting tracker"), Q = setInterval(k, 100), k())
  }

  function j() {
    clearInterval(Q), Q = null
  }

  function k() {
    function a(a, e) {
      a = a >= 0 ? a : c - Math.abs(a);
      for (var f = 0; f < e.length; f++)if (e[f].lastTimeFired > d)e[f].lastTimeFired = -1; else {
        if (e[f].lastTimeFired + 500 > d)continue;
        (a == b || a > b - 500 && b > a) && (e[f].lastTimeFired = d, $f.fireEvent(z.id(), "onCuepoint", E, e[f].fnId, e[f].parameters))
      }
    }

    var b = 100 * Math.floor(10 * M.fp_getTime()), c = 100 * Math.floor(10 * M.duration), d = (new Date).time;
    $f.each(z.getCommonClip().cuepoints, a), $f.each(F[E].cuepoints, a)
  }

  function l() {
    h(), D = !0, M.fp_seek(0)
  }

  function m() {
    function a(a) {
      var d = {};
      b(d, I), b(d, z.getCommonClip()), b(d, a), d.ipadUrl ? url = decodeURIComponent(d.ipadUrl) : d.url && (url = d.url), url && -1 == url.indexOf("://") && d.ipadBaseUrl ? url = d.ipadBaseUrl + "/" + url : url && -1 == url.indexOf("://") && d.baseUrl && (url = d.baseUrl + "/" + url), d.originalUrl = d.url, d.completeUrl = url, d.extension = d.completeUrl.substr(d.completeUrl.lastIndexOf("."));
      var e = d.extension.indexOf("?");
      return e > -1 && (d.extension = d.extension.substr(0, e)), d.type = "video", delete d.index, c("fixed clip", d), d
    }

    console.log(M), M.fp_play = function (a, b, d, f) {
      var g = null, i = !0, j = !0;
      if (c("Calling play() " + a, a), b)return void c("ERROR: inStream clips not yet supported");
      if (void 0 === a)return c("clip was not given, simply calling video.play, if not already buffering"), void(J != v && M.play());
      if ("number" == typeof a) {
        if (E >= F.length)return;
        E = a, a = F[E]
      } else"string" == typeof a && (a = {url: a}), M.fp_setPlaylist(void 0 !== a.length ? a : [a]);
      if (0 == E && F.length > 1 && P.test(F[E].extension)) {
        var f = F[E].url;
        return console.log("Poster image available with url " + f), ++E, console.log("Not last clip in the playlist, moving to next one"), void M.fp_play(E, !1, !0, f)
      }
      if (!O || O.test(F[E].extension)) {
        if (a = F[E], g = a.completeUrl, void 0 !== a.autoBuffering && a.autoBuffering === !1 && (i = !1), void 0 === a.autoPlay || a.autoPlay === !0 || d === !0 ? (i = !0, j = !0) : j = !1, c("about to play " + g, i, j), h(), g && (c("Changing SRC attribute" + g), M.setAttribute("src", g)), i) {
          if (!e("Begin"))return !1;
          f && (j = a.autoPlay, M.setAttribute("poster", f), M.setAttribute("preload", "none")), $f.fireEvent(z.id(), "onBegin", E), c("calling video.load()"), M.load()
        }
        j && (c("calling video.play()"), M.play())
      }
    }, M.fp_pause = function () {
      return c("pause called"), e("Pause") ? void M.pause() : !1
    }, M.fp_resume = function () {
      return c("resume called"), e("Resume") ? void M.play() : !1
    }, M.fp_stop = function () {
      if (c("stop called"), !e("Stop"))return !1;
      C = !0, M.pause();
      try {
        M.currentTime = 0
      } catch (a) {
      }
    }, M.fp_seek = function (a) {
      if (c("seek called " + a), !e("Seek"))return !1;
      var b = 0, a = a + "";
      if ("%" == a.charAt(a.length - 1)) {
        var d = parseInt(a.substr(0, a.length - 1)) / 100, f = M.duration;
        b = f * d
      } else b = a;
      try {
        M.currentTime = b
      } catch (g) {
        c("Wrong seek time")
      }
    }, M.fp_getTime = function () {
      return M.currentTime
    }, M.fp_mute = function () {
      return c("mute called"), e("Mute") ? (A = M.volume, void(M.volume = 0)) : !1
    }, M.fp_unmute = function () {
      return e("Unmute") ? void(M.volume = A) : !1
    }, M.fp_getVolume = function () {
      return 100 * M.volume
    }, M.fp_setVolume = function (a) {
      return e("Volume") ? void(M.volume = a / 100) : !1
    }, M.fp_toggle = function () {
      return c("toggle called"), z.getState() == y ? void l() : void(M.paused ? M.fp_play() : M.fp_pause())
    }, M.fp_isPaused = function () {
      return M.paused
    }, M.fp_isPlaying = function () {
      return !M.paused
    }, M.fp_getPlugin = function (a) {
      if ("canvas" == a || "controls" == a) {
        var b = z.getConfig();
        return b.plugins && b.plugins[a] ? b.plugins[a] : null
      }
      return c("ERROR: no support for " + a + " plugin on iDevices"), null
    }, M.fp_close = function () {
      g(s), M.src = "", M.parentNode.removeChild(M), M = null
    }, M.fp_getStatus = function () {
      var a = 0, b = 0;
      try {
        a = M.buffered.start(), b = M.buffered.end()
      } catch (c) {
      }
      return {bufferStart: a, bufferEnd: b, state: J, time: M.fp_getTime(), muted: M.muted, volume: M.fp_getVolume()}
    }, M.fp_getState = function () {
      return J
    }, M.fp_startBuffering = function () {
      J == u && M.load()
    }, M.fp_setPlaylist = function (b) {
      c("Setting playlist"), E = 0;
      for (var d = 0; d < b.length; d++)b[d] = a(b[d]);
      F = b, $f.fireEvent(z.id(), "onPlaylistReplace", b)
    }, M.fp_addClip = function (b, c) {
      b = a(b), F.splice(c, 0, b), $f.fireEvent(z.id(), "onClipAdd", b, c)
    }, M.fp_updateClip = function (a, c) {
      return b(F[c], a), F[c]
    }, M.fp_getVersion = function () {
      return "3.2.3"
    }, M.fp_isFullscreen = function () {
      var a = M.webkitDisplayingFullscreen;
      return void 0 !== a ? a : !1
    }, M.fp_toggleFullscreen = function () {
      M.fp_isFullscreen() ? M.webkitExitFullscreen() : M.webkitEnterFullscreen()
    }, M.fp_addCuepoints = function (a, c, d) {
      var e = -1 == c ? z.getCommonClip() : F[c];
      e.cuepoints = e.cuepoints || {}, a = a instanceof Array ? a : [a];
      for (var f = 0; f < a.length; f++) {
        var g = "object" == typeof a[f] ? a[f].time || null : a[f];
        if (null != g) {
          g = 100 * Math.floor(g / 100);
          var h = g;
          "object" == typeof a[f] && (h = b({}, a[f], !1), void 0 === h.time && delete h.time, void 0 !== h.parameters && (b(h, h.parameters, !1), delete h.parameters)), e.cuepoints[g] = e.cuepoints[g] || [], e.cuepoints[g].push({
            fnId: d,
            lastTimeFired: -1,
            parameters: h
          })
        }
      }
    }, $f.each("toggleFullscreen,stopBuffering,reset,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled,css,animate,showPlugin,hidePlugin,togglePlugin,fadeTo,invoke,loadPlugin".split(","), function () {
      var a = this;
      M["fp_" + a] = function () {
        return c("ERROR: unsupported API on iDevices " + a), !1
      }
    })
  }

  function n() {
    for (var a = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "volumechange", "waiting"], b = function (a) {
      c("Got event " + a.type, a)
    }, i = 0; i < a.length; i++)M.addEventListener(a[i], b, !1);
    var j = function (a) {
      c("got onBufferEmpty event " + a.type), g(v), $f.fireEvent(z.id(), "onBufferEmpty", E)
    };
    M.addEventListener("emptied", j, !1), M.addEventListener("waiting", j, !1);
    var k = function () {
      K == u || K == v || (c("Restoring old state " + d(K)), g(K)), $f.fireEvent(z.id(), "onBufferFull", E)
    };
    M.addEventListener("canplay", k, !1), M.addEventListener("canplaythrough", k, !1);
    var m = function () {
      var a;
      H = F[E].start, F[E].duration > 0 ? (a = F[E].duration, G = a + H) : (a = M.duration, G = null), M.fp_updateClip({
        duration: a,
        metaData: {duration: M.duration}
      }, E), F[E].duration = M.duration, F[E].metaData = {duration: M.duration}, $f.fireEvent(z.id(), "onMetaData", E, F[E])
    };
    M.addEventListener("loadedmetadata", m, !1), M.addEventListener("durationchange", m, !1);
    var n = function (a) {
      return G && M.currentTime > G ? (M.fp_seek(H), h(), f(a)) : void 0
    };
    M.addEventListener("timeupdate", n, !1);
    var q = function (a) {
      if (J == x) {
        if (!e("Resume"))return c("Resume disallowed, pausing"), M.fp_pause(), f(a);
        $f.fireEvent(z.id(), "onResume", E)
      }
      g(w), B || (B = !0, $f.fireEvent(z.id(), "onStart", E))
    };
    M.addEventListener("playing", q, !1);
    var r = function () {
      o()
    };
    M.addEventListener("play", r, !1);
    var s = function (a) {
      return e("Finish") ? (g(y), $f.fireEvent(z.id(), "onFinish", E), void(F.length > 1 && E < F.length - 1 && (c("Not last clip in the playlist, moving to next one"), M.fp_play(++E, !1, !0)))) : (1 == F.length ? (c("Active playlist only has one clip, onBeforeFinish returned false. Replaying"), l()) : E != F.length - 1 ? (c("Not the last clip in the playlist, but onBeforeFinish returned false. Returning to the beginning of current clip"), M.fp_seek(0)) : (c("Last clip in playlist, but onBeforeFinish returned false, start again from the beginning"), M.fp_play(0)), f(a))
    };
    M.addEventListener("ended", s, !1);
    var A = function () {
      g(t, !0), $f.fireEvent(z.id(), "onError", E, 201), N.onFail && N.onFail instanceof Function && N.onFail.apply(z, [])
    };
    M.addEventListener("error", A, !1);
    var I = function (a) {
      if (c("got pause event from player" + z.id()), !C) {
        if (J == v && K == u)return c("forcing play"), void setTimeout(function () {
          M.play()
        }, 0);
        if (!e("Pause"))return M.fp_resume(), f(a);
        p(), g(x), $f.fireEvent(z.id(), "onPause", E)
      }
    };
    M.addEventListener("pause", I, !1);
    var L = function () {
      $f.fireEvent(z.id(), "onBeforeSeek", E)
    };
    M.addEventListener("seeking", L, !1);
    var O = function () {
      C ? (C = !1, $f.fireEvent(z.id(), "onStop", E)) : $f.fireEvent(z.id(), "onSeek", E), c("seek done, currentState", d(J)), D ? (D = !1, M.fp_play()) : J != w && M.fp_pause()
    };
    M.addEventListener("seeked", O, !1);
    var P = function () {
      $f.fireEvent(z.id(), "onVolume", M.fp_getVolume())
    };
    M.addEventListener("volumechange", P, !1)
  }

  function o() {
    r = setInterval(function () {
      M.fp_getTime() >= M.duration - 1 && ($f.fireEvent(z.id(), "onLastSecond", E), p())
    }, 100)
  }

  function p() {
    clearInterval(r)
  }

  function q() {
    M.fp_play(0)
  }

  var r, s = -1, t = 0, u = 1, v = 2, w = 3, x = 4, y = 5, z = this, A = 1, B = !1, C = !1, D = !1, E = 0, F = [], G = null, H = 0, I = {
    accelerated: !1,
    autoBuffering: !1,
    autoPlay: !0,
    baseUrl: null,
    bufferLength: 3,
    connectionProvider: null,
    cuepointMultiplier: 1e3,
    cuepoints: [],
    controls: {},
    duration: 0,
    extension: "",
    fadeInSpeed: 1e3,
    fadeOutSpeed: 1e3,
    image: !1,
    linkUrl: null,
    linkWindow: "_self",
    live: !1,
    metaData: {},
    originalUrl: null,
    position: 0,
    playlist: [],
    provider: "http",
    scaling: "scale",
    seekableOnBegin: !1,
    start: 0,
    url: null,
    urlResolvers: []
  }, J = s, K = s, L = /iPad|iPhone|iPod/i.test(navigator.userAgent), M = null, N = {
    simulateiDevice: !1,
    controlsSizeRatio: 1.5,
    controls: !0,
    debug: !1,
    validExtensions: "mov|m4v|mp4|avi|mp3|m4a|aac|m3u8|m3u|pls",
    posterExtensions: "png|jpg"
  };
  b(N, a);
  var O = N.validExtensions ? new RegExp("^.(" + N.validExtensions + ")$", "i") : null, P = new RegExp("^.(" + N.posterExtensions + ")$", "i"), Q = null;
  if (L || N.simulateiDevice) {
    if (!window.flashembed.__replaced) {
      var R = window.flashembed;
      window.flashembed = function (a, b, c) {
        if ("string" == typeof a && (a = document.getElementById(a.replace("#", ""))), a) {
          var d = window.getComputedStyle(a, null);
          for (parseInt(d.width), parseInt(d.height); a.firstChild;)a.removeChild(a.firstChild);
          var e = document.createElement("div"), f = document.createElement("video");
          e.appendChild(f), a.appendChild(e), e.style.height = "100%", e.style.width = "100%", e.style.display = "block", e.style.background = "-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0.7)))", e.style.cursor = "default", e.style.webkitUserDrag = "none", f.style.height = "100%", f.style.width = "100%", f.style.display = "block", f.id = b.id, f.name = b.id, f.style.cursor = "pointer", f.style.webkitUserDrag = "none", f.type = "video/mp4", f.playerConfig = c.config, $f.fireEvent(c.config.playerId, "onLoad", "player")
        }
      }, flashembed.getVersion = R.getVersion, flashembed.asString = R.asString, flashembed.isSupported = function () {
        return !0
      }, flashembed.__replaced = !0
    }
    var S = z._fireEvent;
    z._fireEvent = function (a) {
      "onLoad" == a[0] && "player" == a[1] && (M = z.getParent().querySelector("video"), N.controls && (M.controls = "controls"), m(), n(), g(t, !0), M.fp_setPlaylist(M.playerConfig.playlist), q(), S.apply(z, [a]));
      var b = J != s;
      return J == s && "string" == typeof a && (b = !0), b ? S.apply(z, [a]) : void 0
    }, z._swfHeight = function () {
      return parseInt(M.style.height)
    }, z.hasiPadSupport = function () {
      return !0
    }
  }
  return z
}), function (a) {
  "use strict";
  function b(b, c) {
    function d(a, b) {
      return '<div style="' + (f._isMove ? "" : a !== f.currSlideId ? f._opacityCSS : "z-index:0;") + '" class="rsSlide ' + (b || "") + '"></div>'
    }

    var e, f = this, g = window.navigator, h = g.userAgent.toLowerCase();
    f.uid = a.rsModules.uid++, f.ns = ".rs" + f.uid;
    var i, j = document.createElement("div").style, k = ["webkit", "Moz", "ms", "O"], l = "", m = 0;
    for (e = 0; e < k.length; e++)i = k[e], !l && i + "Transform"in j && (l = i), i = i.toLowerCase(), window.requestAnimationFrame || (window.requestAnimationFrame = window[i + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame || (window.requestAnimationFrame = function (a) {
      var b = (new Date).getTime(), c = Math.max(0, 16 - (b - m)), d = window.setTimeout(function () {
        a(b + c)
      }, c);
      return m = b + c, d
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
      clearTimeout(a)
    }), f.isIPAD = h.match(/(ipad)/), f.isIOS = f.isIPAD || h.match(/(iphone|ipod)/);
    var n = function (a) {
      var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
      return {browser: b[1] || "", version: b[2] || "0"}
    }, o = n(h), p = {};
    if (o.browser && (p[o.browser] = !0, p.version = o.version), p.chrome && (p.webkit = !0), f._browser = p, f.isAndroid = h.indexOf("android") > -1, f.slider = a(b), f.ev = a(f), f._doc = a(document), f.st = a.extend({}, a.fn.royalSlider.defaults, c), f._currAnimSpeed = f.st.transitionSpeed, f._minPosOffset = 0, f.st.allowCSS3 && (!p.webkit || f.st.allowCSS3OnWebkit)) {
      var q = l + (l ? "T" : "t");
      f._useCSS3Transitions = q + "ransform"in j && q + "ransition"in j, f._useCSS3Transitions && (f._use3dTransform = l + (l ? "P" : "p") + "erspective"in j)
    }
    l = l.toLowerCase(), f._vendorPref = "-" + l + "-", f._slidesHorizontal = "vertical" === f.st.slidesOrientation ? !1 : !0, f._reorderProp = f._slidesHorizontal ? "left" : "top", f._sizeProp = f._slidesHorizontal ? "width" : "height", f._prevNavItemId = -1, f._isMove = "fade" === f.st.transitionType ? !1 : !0, f._isMove || (f.st.sliderDrag = !1, f._fadeZIndex = 10), f._opacityCSS = "z-index:0; display:none; opacity:0;", f._newSlideId = 0, f._sPosition = 0, f._nextSlidePos = 0, a.each(a.rsModules, function (a, b) {
      "uid" !== a && b.call(f)
    }), f.slides = [], f._idCount = 0;
    var r = f.st.slides ? a(f.st.slides) : f.slider.children().detach();
    r.each(function () {
      f._parseNode(this, !0)
    }), f.st.randomizeSlides && f.slides.sort(function () {
      return .5 - Math.random()
    }), f.numSlides = f.slides.length, f._refreshNumPreloadImages(), f.st.startSlideId ? f.st.startSlideId > f.numSlides - 1 && (f.st.startSlideId = f.numSlides - 1) : f.st.startSlideId = 0, f._newSlideId = f.staticSlideId = f.currSlideId = f._realId = f.st.startSlideId, f.currSlide = f.slides[f.currSlideId], f._accelerationPos = 0, f.pointerMultitouch = !1, f.slider.addClass((f._slidesHorizontal ? "rsHor" : "rsVer") + (f._isMove ? "" : " rsFade"));
    var s = '<div class="rsOverflow"><div class="rsContainer">';
    f.slidesSpacing = f.st.slidesSpacing, f._slideSize = (f._slidesHorizontal ? f.slider.width() : f.slider.height()) + f.st.slidesSpacing, f._preload = Boolean(f._numPreloadImages > 0), f.numSlides <= 1 && (f._loop = !1);
    var t = f._loop && f._isMove ? 2 === f.numSlides ? 1 : 2 : 0;
    for (f._loopHelpers = t, f._maxImages = f.numSlides < 6 ? f.numSlides : 6, f._currBlockIndex = 0, f._idOffset = 0, f.slidesJQ = [], e = 0; e < f.numSlides; e++)f.slidesJQ.push(a(d(e)));
    f._sliderOverflow = s = a(s + "</div></div>");
    var u = function () {
      f.st.sliderDrag && (f._hasDrag = !0, p.msie || p.opera ? f._grabCursor = f._grabbingCursor = "move" : p.mozilla ? (f._grabCursor = "-moz-grab", f._grabbingCursor = "-moz-grabbing") : p.webkit && -1 != g.platform.indexOf("Mac") && (f._grabCursor = "-webkit-grab", f._grabbingCursor = "-webkit-grabbing"), f._setGrabCursor())
    }, v = f.ns, w = function (a, b, c, d, e) {
      f._downEvent = a + b + v, f._moveEvent = a + c + v, f._upEvent = a + d + v, e && (f._cancelEvent = a + e + v)
    }, x = g.pointerEnabled;
    f.pointerEnabled = x || g.msPointerEnabled, f.pointerEnabled ? (f.hasTouch = !1, f._lastItemFriction = .2, f.pointerMultitouch = Boolean(g[(x ? "m" : "msM") + "axTouchPoints"] > 1), x ? w("pointer", "down", "move", "up", "cancel") : w("MSPointer", "Down", "Move", "Up", "Cancel")) : (f.isIOS ? f._downEvent = f._moveEvent = f._upEvent = f._cancelEvent = "" : w("mouse", "down", "move", "up"), "ontouchstart"in window || "createTouch"in document ? (f.hasTouch = !0, f._downEvent += " touchstart" + v, f._moveEvent += " touchmove" + v, f._upEvent += " touchend" + v, f._cancelEvent += " touchcancel" + v, f._lastItemFriction = .5, f.st.sliderTouch && (f._hasDrag = !0)) : (f.hasTouch = !1, f._lastItemFriction = .2)), u(), f.slider.html(s), f._controlsContainer = f.st.controlsInside ? f._sliderOverflow : f.slider, f._slidesContainer = f._sliderOverflow.children(".rsContainer"), f.pointerEnabled && f._slidesContainer.css((x ? "" : "-ms-") + "touch-action", f._slidesHorizontal ? "pan-y" : "pan-x"), f._preloader = a('<div class="rsPreloader"></div>');
    var y = f._slidesContainer.children(".rsSlide");
    if (f._currHolder = f.slidesJQ[f.currSlideId], f._selectedSlideHolder = 0, f._useCSS3Transitions)if (f._TP = "transition-property", f._TD = "transition-duration", f._TTF = "transition-timing-function", f._yProp = f._xProp = f._vendorPref + "transform", f._use3dTransform ? (p.webkit && !p.chrome && f.slider.addClass("rsWebkit3d"), f._tPref1 = "translate3d(", f._tPref2 = "px, ", f._tPref3 = "px, 0px)") : (f._tPref1 = "translate(", f._tPref2 = "px, ", f._tPref3 = "px)"), f._isMove)f._slidesContainer[f._vendorPref + f._TP] = f._vendorPref + "transform"; else {
      var z = {};
      z[f._vendorPref + f._TP] = "opacity", z[f._vendorPref + f._TD] = f.st.transitionSpeed + "ms", z[f._vendorPref + f._TTF] = f.st.css3easeInOut, y.css(z)
    } else f._xProp = "left", f._yProp = "top";
    var A;
    if (a(window).on("resize" + f.ns, function () {
        A && clearTimeout(A), A = setTimeout(function () {
          f.updateSliderSize()
        }, 50)
      }), f.ev.trigger("rsAfterPropsSetup"), f.updateSliderSize(), f.st.keyboardNavEnabled && f._bindKeyboardNav(), f.st.arrowsNavHideOnTouch && (f.hasTouch || f.pointerMultitouch) && (f.st.arrowsNav = !1), f.st.arrowsNav) {
      var B = "rsArrow", C = f._controlsContainer;
      if (a('<div class="' + B + " " + B + 'Left"><div class="' + B + 'Icn"></div></div><div class="' + B + " " + B + 'Right"><div class="' + B + 'Icn"></div></div>').appendTo(C), f._arrowLeft = C.children("." + B + "Left").click(function (a) {
          a.preventDefault(), f.prev()
        }), f._arrowRight = C.children("." + B + "Right").click(function (a) {
          a.preventDefault(), f.next()
        }), f.st.arrowsNavAutoHide && !f.hasTouch) {
        f._arrowLeft.addClass("rsHidden"), f._arrowRight.addClass("rsHidden");
        var D = C;
        D.one("mousemove.arrowshover", function () {
          f._arrowLeft.removeClass("rsHidden"), f._arrowRight.removeClass("rsHidden")
        }), D.hover(function () {
          f._arrowsAutoHideLocked || (f._arrowLeft.removeClass("rsHidden"), f._arrowRight.removeClass("rsHidden"))
        }, function () {
          f._arrowsAutoHideLocked || (f._arrowLeft.addClass("rsHidden"), f._arrowRight.addClass("rsHidden"))
        })
      }
      f.ev.on("rsOnUpdateNav", function () {
        f._updateArrowsNav()
      }), f._updateArrowsNav()
    }
    f._hasDrag ? f._slidesContainer.on(f._downEvent, function (a) {
      f._onDragStart(a)
    }) : f.dragSuccess = !1;
    var E = ["rsPlayBtnIcon", "rsPlayBtn", "rsCloseVideoBtn", "rsCloseVideoIcn"];
    f._slidesContainer.click(function (b) {
      if (!f.dragSuccess) {
        var c = a(b.target), d = c.attr("class");
        if (-1 !== a.inArray(d, E) && f.toggleVideo())return !1;
        if (f.st.navigateByClick && !f._blockActions) {
          if (a(b.target).closest(".rsNoDrag", f._currHolder).length)return !0;
          f._mouseNext(b)
        }
        f.ev.trigger("rsSlideClick", b)
      }
    }).on("click.rs", "a", function () {
      return f.dragSuccess ? !1 : (f._blockActions = !0, void setTimeout(function () {
        f._blockActions = !1
      }, 3))
    }), f.ev.trigger("rsAfterInit")
  }

  a.rsModules || (a.rsModules = {uid: 0}), b.prototype = {
    constructor: b, _mouseNext: function (a) {
      var b = this, c = a[b._slidesHorizontal ? "pageX" : "pageY"] - b._sliderOffset;
      c >= b._nextSlidePos ? b.next() : 0 > c && b.prev()
    }, _refreshNumPreloadImages: function () {
      var a, b = this;
      a = b.st.numImagesToPreload, b._loop = b.st.loop, b._loop && (2 === b.numSlides ? (b._loop = !1, b.st.loopRewind = !0) : b.numSlides < 2 && (b.st.loopRewind = b._loop = !1)), b._loop && a > 0 && (b.numSlides <= 4 ? a = 1 : b.st.numImagesToPreload > (b.numSlides - 1) / 2 && (a = Math.floor((b.numSlides - 1) / 2))), b._numPreloadImages = a
    }, _parseNode: function (b, c) {
      function d(a, b) {
        if (h.images.push(b ? a.attr(b) : a.text()), i) {
          i = !1, h.caption = "src" === b ? a.attr("alt") : a.contents(), h.image = h.images[0], h.videoURL = a.attr("data-rsVideo");
          var c = a.attr("data-rsw"), d = a.attr("data-rsh");
          "undefined" != typeof c && c !== !1 && "undefined" != typeof d && d !== !1 ? (h.iW = parseInt(c, 10), h.iH = parseInt(d, 10)) : g.st.imgWidth && g.st.imgHeight && (h.iW = g.st.imgWidth, h.iH = g.st.imgHeight)
        }
      }

      var e, f, g = this, h = {}, i = !0;
      return b = a(b), g._currContent = b, g.ev.trigger("rsBeforeParseNode", [b, h]), h.stopParsing ? void 0 : (b = g._currContent, h.id = g._idCount, h.contentAdded = !1, g._idCount++, h.images = [], h.isBig = !1, h.hasCover || (b.hasClass("rsImg") ? (f = b, e = !0) : (f = b.find(".rsImg"), f.length && (e = !0)), e ? (h.bigImage = f.eq(0).attr("data-rsBigImg"), f.each(function () {
        var b = a(this);
        b.is("a") ? d(b, "href") : b.is("img") ? d(b, "src") : d(b)
      })) : b.is("img") && (b.addClass("rsImg rsMainSlideImage"), d(b, "src"))), f = b.find(".rsCaption"), f.length && (h.caption = f.remove()), h.content = b, g.ev.trigger("rsAfterParseNode", [b, h]), c && g.slides.push(h), 0 === h.images.length && (h.isLoaded = !0, h.isRendered = !1, h.isLoading = !1, h.images = null), h)
    }, _bindKeyboardNav: function () {
      var a, b, c = this, d = function (a) {
        37 === a ? c.prev() : 39 === a && c.next()
      };
      c._doc.on("keydown" + c.ns, function (e) {
        c._isDragging || (b = e.keyCode, (37 === b || 39 === b) && (a || (d(b), a = setInterval(function () {
          d(b)
        }, 700))))
      }).on("keyup" + c.ns, function () {
        a && (clearInterval(a), a = null)
      })
    }, goTo: function (a, b) {
      var c = this;
      a !== c.currSlideId && c._moveTo(a, c.st.transitionSpeed, !0, !b)
    }, destroy: function (b) {
      var c = this;
      c.ev.trigger("rsBeforeDestroy"), c._doc.off("keydown" + c.ns + " keyup" + c.ns + " " + c._moveEvent + " " + c._upEvent), c._slidesContainer.off(c._downEvent + " click"), c.slider.data("royalSlider", null), a.removeData(c.slider, "royalSlider"), a(window).off("resize" + c.ns), c.loadingTimeout && clearTimeout(c.loadingTimeout), b && c.slider.remove(), c.slides = null, c.slider = null, c.ev = null
    }, _updateBlocksContent: function (b, c) {
      function d(c, d, g) {
        c.isAdded ? (e(d, c), f(d, c)) : (g || (g = j.slidesJQ[d]), c.holder ? g = c.holder : (g = j.slidesJQ[d] = a(g), c.holder = g), c.appendOnLoaded = !1, f(d, c, g), e(d, c), j._addBlockToContainer(c, g, b), c.isAdded = !0)
      }

      function e(a, c) {
        c.contentAdded || (j.setItemHtml(c, b), b || (c.contentAdded = !0))
      }

      function f(a, b, c) {
        j._isMove && (c || (c = j.slidesJQ[a]), c.css(j._reorderProp, (a + j._idOffset + m) * j._slideSize))
      }

      function g(a) {
        if (k) {
          if (a > l - 1)return g(a - l);
          if (0 > a)return g(l + a)
        }
        return a
      }

      var h, i, j = this, k = j._loop, l = j.numSlides;
      if (!isNaN(c))return g(c);
      var m, n, o = j.currSlideId, p = b ? Math.abs(j._prevSlideId - j.currSlideId) >= j.numSlides - 1 ? 0 : 1 : j._numPreloadImages, q = Math.min(2, p), r = !1, s = !1;
      for (i = o; o + 1 + q > i; i++)if (n = g(i), h = j.slides[n], h && (!h.isAdded || !h.positionSet)) {
        r = !0;
        break
      }
      for (i = o - 1; i > o - 1 - q; i--)if (n = g(i), h = j.slides[n], h && (!h.isAdded || !h.positionSet)) {
        s = !0;
        break
      }
      if (r)for (i = o; o + p + 1 > i; i++)n = g(i), m = Math.floor((j._realId - (o - i)) / j.numSlides) * j.numSlides, h = j.slides[n], h && d(h, n);
      if (s)for (i = o - 1; i > o - 1 - p; i--)n = g(i), m = Math.floor((j._realId - (o - i)) / l) * l, h = j.slides[n], h && d(h, n);
      if (!b) {
        var t = g(o - p), u = g(o + p), v = t > u ? 0 : t;
        for (i = 0; l > i; i++)t > u && i > t - 1 || (v > i || i > u) && (h = j.slides[i], h && h.holder && (h.holder.detach(), h.isAdded = !1))
      }
    }, setItemHtml: function (b, c) {
      var d = this, e = function () {
        if (!b.images)return b.isRendered = !0, b.isLoaded = !0, b.isLoading = !1, void i(!0);
        if (!b.isLoading) {
          var c, e;
          b.content.hasClass("rsImg") ? (c = b.content, e = !0) : c = b.content.find(".rsImg:not(img)"), c && !c.is("img") && c.each(function () {
            var c = a(this), d = '<img class="rsImg" src="' + (c.is("a") ? c.attr("href") : c.text()) + '" />';
            e ? b.content = a(d) : c.replaceWith(d)
          }), c = e ? b.content : b.content.find("img.rsImg"), k(), c.eq(0).addClass("rsMainSlideImage"), b.iW && b.iH && (b.isLoaded || d._resizeImage(b), i()), b.isLoading = !0;
          var g = "load.rs error.rs";
          if (b.isBig)a("<img />").on(g, function () {
            a(this).off(g), f([this], !0)
          }).attr("src", b.image); else {
            b.loaded = [], b.numStartedLoad = 0;
            for (var h = function () {
              a(this).off(g), b.loaded.push(this), b.loaded.length === b.numStartedLoad && f(b.loaded, !1)
            }, j = 0; j < b.images.length; j++) {
              var l = a("<img />");
              b.numStartedLoad++, l.on("load.rs error.rs", h).attr("src", b.images[j])
            }
          }
        }
      }, f = function (a, c) {
        if (a.length) {
          {
            var d = a[0];
            d.src
          }
          if (c !== b.isBig) {
            var e = b.holder.children();
            return void(e && e.length > 1 && l())
          }
          if (b.iW && b.iH)return void g();
          if (b.iW = d.width, b.iH = d.height, b.iW && b.iH)return void g();
          var f = new Image;
          f.onload = function () {
            f.width ? (b.iW = f.width, b.iH = f.height, g()) : setTimeout(function () {
              f.width && (b.iW = f.width, b.iH = f.height), g()
            }, 1e3)
          }, f.src = d.src
        } else g()
      }, g = function () {
        b.isLoaded = !0, b.isLoading = !1, i(), l(), j()
      }, h = function () {
        return !d._isMove && b.images && b.iW && b.iH ? void e() : (b.holder.isWaiting = !0, k(), void(b.holder.slideId = -99))
      }, i = function () {
        if (!b.isAppended && d.ev) {
          var a = d.st.visibleNearby, e = b.id - d._newSlideId;
          if (!c && !b.appendOnLoaded && d.st.fadeinLoadedSlide && (0 === e || (a || d._isAnimating || d._isDragging) && (-1 === e || 1 === e))) {
            var f = {visibility: "visible", opacity: 0};
            f[d._vendorPref + "transition"] = "opacity 400ms ease-in-out", b.content.css(f), setTimeout(function () {
              b.content.css("opacity", 1)
            }, 16)
          }
          b.holder.find(".rsPreloader").length ? b.holder.append(b.content) : b.holder.html(b.content), b.isAppended = !0, b.isLoaded && (d._resizeImage(b), j()), b.sizeReady || (b.sizeReady = !0, setTimeout(function () {
            d.ev.trigger("rsMaybeSizeReady", b)
          }, 100))
        }
      }, j = function () {
        !b.loadedTriggered && d.ev && (b.isLoaded = b.loadedTriggered = !0, b.holder.trigger("rsAfterContentSet"), d.ev.trigger("rsAfterContentSet", b))
      }, k = function () {
        d.st.usePreloader && b.holder.html(d._preloader.clone())
      }, l = function () {
        if (d.st.usePreloader) {
          var a = b.holder.find(".rsPreloader");
          a.length && a.remove()
        }
      };
      return b.isLoaded ? void i() : void(c ? h() : e())
    }, _addBlockToContainer: function (a) {
      {
        var b = this, c = a.holder;
        a.id - b._newSlideId
      }
      b._slidesContainer.append(c), a.appendOnLoaded = !1
    }, _onDragStart: function (b, c) {
      var d, e = this, f = "touchstart" === b.type;
      if (e._isTouchGesture = f, e.ev.trigger("rsDragStart"), a(b.target).closest(".rsNoDrag", e._currHolder).length)return e.dragSuccess = !1, !0;
      if (c || e._isAnimating && (e._wasAnimating = !0, e._stopAnimation()), e.dragSuccess = !1, e._isDragging)return void(f && (e._multipleTouches = !0));
      if (f && (e._multipleTouches = !1), e._setGrabbingCursor(), f) {
        var g = b.originalEvent.touches;
        if (!(g && g.length > 0))return;
        d = g[0], g.length > 1 && (e._multipleTouches = !0)
      } else b.preventDefault(), d = b, e.pointerEnabled && (d = d.originalEvent);
      e._isDragging = !0, e._doc.on(e._moveEvent, function (a) {
        e._onDragMove(a, c)
      }).on(e._upEvent, function (a) {
        e._onDragRelease(a, c)
      }), e._currMoveAxis = "", e._hasMoved = !1, e._pageX = d.pageX, e._pageY = d.pageY, e._startPagePos = e._accelerationPos = (c ? e._thumbsHorizontal : e._slidesHorizontal) ? d.pageX : d.pageY, e._horDir = 0, e._verDir = 0, e._currRenderPosition = c ? e._thumbsPosition : e._sPosition, e._startTime = (new Date).getTime(), f && e._sliderOverflow.on(e._cancelEvent, function (a) {
        e._onDragRelease(a, c)
      })
    }, _renderMovement: function (a, b) {
      var c = this;
      if (c._checkedAxis) {
        var d = c._renderMoveTime, e = a.pageX - c._pageX, f = a.pageY - c._pageY, g = c._currRenderPosition + e, h = c._currRenderPosition + f, i = b ? c._thumbsHorizontal : c._slidesHorizontal, j = i ? g : h, k = c._currMoveAxis;
        c._hasMoved = !0, c._pageX = a.pageX, c._pageY = a.pageY, "x" === k && 0 !== e ? c._horDir = e > 0 ? 1 : -1 : "y" === k && 0 !== f && (c._verDir = f > 0 ? 1 : -1);
        var l = i ? c._pageX : c._pageY, m = i ? e : f;
        b ? j > c._thumbsMinPosition ? j = c._currRenderPosition + m * c._lastItemFriction : j < c._thumbsMaxPosition && (j = c._currRenderPosition + m * c._lastItemFriction) : c._loop || (c.currSlideId <= 0 && l - c._startPagePos > 0 && (j = c._currRenderPosition + m * c._lastItemFriction), c.currSlideId >= c.numSlides - 1 && l - c._startPagePos < 0 && (j = c._currRenderPosition + m * c._lastItemFriction)), c._currRenderPosition = j, d - c._startTime > 200 && (c._startTime = d, c._accelerationPos = l), b ? c._setThumbsPosition(c._currRenderPosition) : c._isMove && c._setPosition(c._currRenderPosition)
      }
    }, _onDragMove: function (a, b) {
      var c, d = this, e = "touchmove" === a.type;
      if (!d._isTouchGesture || e) {
        if (e) {
          if (d._lockAxis)return;
          var f = a.originalEvent.touches;
          if (!f)return;
          if (f.length > 1)return;
          c = f[0]
        } else c = a, d.pointerEnabled && (c = c.originalEvent);
        if (d._hasMoved || (d._useCSS3Transitions && (b ? d._thumbsContainer : d._slidesContainer).css(d._vendorPref + d._TD, "0s"), function i() {
            d._isDragging && (d._animFrame = requestAnimationFrame(i), d._renderMoveEvent && d._renderMovement(d._renderMoveEvent, b))
          }()), d._checkedAxis)a.preventDefault(), d._renderMoveTime = (new Date).getTime(), d._renderMoveEvent = c; else {
          var g = b ? d._thumbsHorizontal : d._slidesHorizontal, h = Math.abs(c.pageX - d._pageX) - Math.abs(c.pageY - d._pageY) - (g ? -7 : 7);
          if (h > 7) {
            if (g)a.preventDefault(), d._currMoveAxis = "x"; else if (e)return void d._completeGesture(a);
            d._checkedAxis = !0
          } else if (-7 > h) {
            if (g) {
              if (e)return void d._completeGesture(a)
            } else a.preventDefault(), d._currMoveAxis = "y";
            d._checkedAxis = !0
          }
        }
      }
    }, _completeGesture: function (a) {
      var b = this;
      b._lockAxis = !0, b._hasMoved = b._isDragging = !1, b._onDragRelease(a)
    }, _onDragRelease: function (b, c) {
      function d(a) {
        return 100 > a ? 100 : a > 500 ? 500 : a
      }

      function e(a, b) {
        (l._isMove || c) && (j = (-l._realId - l._idOffset) * l._slideSize, k = Math.abs(l._sPosition - j), l._currAnimSpeed = k / b, a && (l._currAnimSpeed += 250), l._currAnimSpeed = d(l._currAnimSpeed), l._animateTo(j, !1))
      }

      var f, g, h, i, j, k, l = this, m = b.type.indexOf("touch") > -1;
      if (!l._isTouchGesture || m) {
        if (l._isTouchGesture = !1, l.ev.trigger("rsDragRelease"), l._renderMoveEvent = null, l._isDragging = !1, l._lockAxis = !1, l._checkedAxis = !1, l._renderMoveTime = 0, cancelAnimationFrame(l._animFrame), l._hasMoved && (c ? l._setThumbsPosition(l._currRenderPosition) : l._isMove && l._setPosition(l._currRenderPosition)), l._doc.off(l._moveEvent).off(l._upEvent), m && l._sliderOverflow.off(l._cancelEvent), l._setGrabCursor(), !l._hasMoved && !l._multipleTouches && c && l._thumbsEnabled) {
          var n = a(b.target).closest(".rsNavItem");
          return void(n.length && l.goTo(n.index()))
        }
        var o = c ? l._thumbsHorizontal : l._slidesHorizontal;
        if (!l._hasMoved || "y" === l._currMoveAxis && o || "x" === l._currMoveAxis && !o) {
          if (c || !l._wasAnimating)return l._wasAnimating = !1, void(l.dragSuccess = !1);
          if (l._wasAnimating = !1, l.st.navigateByClick)return l._mouseNext(l.pointerEnabled ? b.originalEvent : b), void(l.dragSuccess = !0);
          l.dragSuccess = !0
        } else l.dragSuccess = !0;
        l._wasAnimating = !1, l._currMoveAxis = "";
        var p = l.st.minSlideOffset, q = m ? b.originalEvent.changedTouches[0] : l.pointerEnabled ? b.originalEvent : b, r = o ? q.pageX : q.pageY, s = l._startPagePos, t = l._accelerationPos, u = l.currSlideId, v = l.numSlides, w = o ? l._horDir : l._verDir, x = l._loop, y = !1;
        if (f = Math.abs(r - s), g = r - t, h = (new Date).getTime() - l._startTime, i = Math.abs(g) / h, 0 === w || 1 >= v)return void e(!0, i);
        if (!x && !c)if (0 >= u) {
          if (w > 0)return void e(!0, i)
        } else if (u >= v - 1 && 0 > w)return void e(!0, i);
        if (c) {
          j = l._thumbsPosition;
          var z;
          if (j > l._thumbsMinPosition)j = l._thumbsMinPosition; else if (j < l._thumbsMaxPosition)j = l._thumbsMaxPosition; else {
            var A = .003, B = i * i / (2 * A), C = -l._thumbsPosition, D = l._thumbsContainerSize - l._thumbsViewportSize + l._thumbsPosition;
            if (g > 0 && B > C ? (C += l._thumbsViewportSize / (15 / (B / i * A)), i = i * C / B, B = C) : 0 > g && B > D && (D += l._thumbsViewportSize / (15 / (B / i * A)), i = i * D / B, B = D), z = Math.max(Math.round(i / A), 50), j += B * (0 > g ? -1 : 1), j > l._thumbsMinPosition)return void l._animateThumbsTo(j, z, !0, l._thumbsMinPosition, 200);
            if (j < l._thumbsMaxPosition)return void l._animateThumbsTo(j, z, !0, l._thumbsMaxPosition, 200)
          }
          l._animateThumbsTo(j, z, !0)
        } else {
          var E = function (a) {
            var b = Math.floor(a / l._slideSize), c = a - b * l._slideSize;
            return c > p && b++, b
          };
          if (r > s + p) {
            if (0 > w)return void e(!1, i);
            var F = E(r - s);
            l._moveTo(l.currSlideId - F, d(Math.abs(l._sPosition - (-l._realId - l._idOffset + F) * l._slideSize) / i), y, !0, !0)
          } else if (s - p > r) {
            if (w > 0)return void e(!1, i);
            var F = E(s - r);
            l._moveTo(l.currSlideId + F, d(Math.abs(l._sPosition - (-l._realId - l._idOffset - F) * l._slideSize) / i), y, !0, !0)
          } else e(!1, i)
        }
      }
    }, _setPosition: function (a) {
      var b = this;
      a = b._sPosition = a, b._useCSS3Transitions ? b._slidesContainer.css(b._xProp, b._tPref1 + (b._slidesHorizontal ? a + b._tPref2 + 0 : 0 + b._tPref2 + a) + b._tPref3) : b._slidesContainer.css(b._slidesHorizontal ? b._xProp : b._yProp, a)
    }, updateSliderSize: function (a) {
      var b, c, d = this;
      if (d.slider) {
        if (d.st.autoScaleSlider) {
          var e = d.st.autoScaleSliderWidth, f = d.st.autoScaleSliderHeight;
          d.st.autoScaleHeight ? (b = d.slider.width(), b != d.width && (d.slider.css("height", b * (f / e)), b = d.slider.width()), c = d.slider.height()) : (c = d.slider.height(), c != d.height && (d.slider.css("width", c * (e / f)), c = d.slider.height()), b = d.slider.width())
        } else b = d.slider.width(), c = d.slider.height();
        if (a || b != d.width || c != d.height) {
          d.width = b, d.height = c, d._wrapWidth = b, d._wrapHeight = c, d.ev.trigger("rsBeforeSizeSet"), d.ev.trigger("rsAfterSizePropSet"), d._sliderOverflow.css({
            width: d._wrapWidth,
            height: d._wrapHeight
          }), d._slideSize = (d._slidesHorizontal ? d._wrapWidth : d._wrapHeight) + d.st.slidesSpacing, d._imagePadding = d.st.imageScalePadding;
          var g, h;
          for (h = 0; h < d.slides.length; h++)g = d.slides[h], g.positionSet = !1, g && g.images && g.isLoaded && (g.isRendered = !1, d._resizeImage(g));
          if (d._cloneHolders)for (h = 0; h < d._cloneHolders.length; h++)g = d._cloneHolders[h], g.holder.css(d._reorderProp, (g.id + d._idOffset) * d._slideSize);
          d._updateBlocksContent(), d._isMove && (d._useCSS3Transitions && d._slidesContainer.css(d._vendorPref + "transition-duration", "0s"), d._setPosition((-d._realId - d._idOffset) * d._slideSize)), d.ev.trigger("rsOnUpdateNav")
        }
        d._sliderOffset = d._sliderOverflow.offset(), d._sliderOffset = d._sliderOffset[d._reorderProp]
      }
    }, appendSlide: function (b, c) {
      var d = this, e = d._parseNode(b);
      (isNaN(c) || c > d.numSlides) && (c = d.numSlides), d.slides.splice(c, 0, e), d.slidesJQ.splice(c, 0, a('<div style="' + (d._isMove ? "position:absolute;" : d._opacityCSS) + '" class="rsSlide"></div>')), c <= d.currSlideId && d.currSlideId++, d.ev.trigger("rsOnAppendSlide", [e, c]), d._refreshSlides(c), c === d.currSlideId && d.ev.trigger("rsAfterSlideChange")
    }, removeSlide: function (a) {
      var b = this, c = b.slides[a];
      c && (c.holder && c.holder.remove(), a < b.currSlideId && b.currSlideId--, b.slides.splice(a, 1), b.slidesJQ.splice(a, 1), b.ev.trigger("rsOnRemoveSlide", [a]), b._refreshSlides(a), a === b.currSlideId && b.ev.trigger("rsAfterSlideChange"))
    }, _refreshSlides: function () {
      var a = this, b = a.numSlides, c = a._realId <= 0 ? 0 : Math.floor(a._realId / b);
      a.numSlides = a.slides.length, 0 === a.numSlides ? (a.currSlideId = a._idOffset = a._realId = 0, a.currSlide = a._oldHolder = null) : a._realId = c * a.numSlides + a.currSlideId;
      for (var d = 0; d < a.numSlides; d++)a.slides[d].id = d;
      a.currSlide = a.slides[a.currSlideId], a._currHolder = a.slidesJQ[a.currSlideId], a.currSlideId >= a.numSlides ? a.goTo(a.numSlides - 1) : a.currSlideId < 0 && a.goTo(0), a._refreshNumPreloadImages(), a._isMove && a._slidesContainer.css(a._vendorPref + a._TD, "0ms"), a._refreshSlidesTimeout && clearTimeout(a._refreshSlidesTimeout), a._refreshSlidesTimeout = setTimeout(function () {
        a._isMove && a._setPosition((-a._realId - a._idOffset) * a._slideSize), a._updateBlocksContent(), a._isMove || a._currHolder.css({
          display: "block",
          opacity: 1
        })
      }, 14), a.ev.trigger("rsOnUpdateNav")
    }, _setGrabCursor: function () {
      var a = this;
      a._hasDrag && a._isMove && (a._grabCursor ? a._sliderOverflow.css("cursor", a._grabCursor) : (a._sliderOverflow.removeClass("grabbing-cursor"), a._sliderOverflow.addClass("grab-cursor")))
    }, _setGrabbingCursor: function () {
      var a = this;
      a._hasDrag && a._isMove && (a._grabbingCursor ? a._sliderOverflow.css("cursor", a._grabbingCursor) : (a._sliderOverflow.removeClass("grab-cursor"), a._sliderOverflow.addClass("grabbing-cursor")))
    }, next: function (a) {
      var b = this;
      b._moveTo("next", b.st.transitionSpeed, !0, !a)
    }, prev: function (a) {
      var b = this;
      b._moveTo("prev", b.st.transitionSpeed, !0, !a)
    }, _moveTo: function (a, b, c, d, e) {
      var f, g, h, i, j = this;
      if (j.ev.trigger("rsBeforeMove", [a, d]), i = "next" === a ? j.currSlideId + 1 : "prev" === a ? j.currSlideId - 1 : a = parseInt(a, 10), !j._loop) {
        if (0 > i)return void j._doBackAndForthAnim("left", !d);
        if (i >= j.numSlides)return void j._doBackAndForthAnim("right", !d)
      }
      j._isAnimating && (j._stopAnimation(!0), c = !1), g = i - j.currSlideId, j._prevSlideId = j.currSlideId;
      var k, l = j.currSlideId, m = j.currSlideId + g, n = j._realId;
      j._loop ? (m = j._updateBlocksContent(!1, m), n += g) : n = m, j._newSlideId = m, j._oldHolder = j.slidesJQ[j.currSlideId], j._realId = n, j.currSlideId = j._newSlideId, j.currSlide = j.slides[j.currSlideId], j._currHolder = j.slidesJQ[j.currSlideId];
      var o = j.st.slidesDiff, p = Boolean(g > 0), q = Math.abs(g), r = Math.floor(l / j._numPreloadImages), s = Math.floor((l + (p ? o : -o)) / j._numPreloadImages), t = p ? Math.max(r, s) : Math.min(r, s), u = t * j._numPreloadImages + (p ? j._numPreloadImages - 1 : 0);
      u > j.numSlides - 1 ? u = j.numSlides - 1 : 0 > u && (u = 0);
      var v = p ? u - l : l - u;
      if (v > j._numPreloadImages && (v = j._numPreloadImages), q > v + o)for (j._idOffset += (q - (v + o)) * (p ? -1 : 1), b = 1.4 * b, h = 0; h < j.numSlides; h++)j.slides[h].positionSet = !1;
      j._currAnimSpeed = b, j._updateBlocksContent(!0), e || (k = !0), f = (-n - j._idOffset) * j._slideSize, k ? setTimeout(function () {
        j._isWorking = !1, j._animateTo(f, a, !1, c), j.ev.trigger("rsOnUpdateNav")
      }, 0) : (j._animateTo(f, a, !1, c), j.ev.trigger("rsOnUpdateNav"))
    }, _updateArrowsNav: function () {
      var a = this, b = "rsArrowDisabled";
      if (a.st.arrowsNav) {
        if (a.numSlides <= 1)return a._arrowLeft.css("display", "none"), void a._arrowRight.css("display", "none");
        a._arrowLeft.css("display", "block"), a._arrowRight.css("display", "block"), a._loop || a.st.loopRewind || (0 === a.currSlideId ? a._arrowLeft.addClass(b) : a._arrowLeft.removeClass(b), a.currSlideId === a.numSlides - 1 ? a._arrowRight.addClass(b) : a._arrowRight.removeClass(b))
      }
    }, _animateTo: function (b, c, d, e, f) {
      function g() {
        var a;
        h && (a = h.data("rsTimeout"), a && (h !== i && h.css({
          opacity: 0,
          display: "none",
          zIndex: 0
        }), clearTimeout(a), h.data("rsTimeout", ""))), a = i.data("rsTimeout"), a && (clearTimeout(a), i.data("rsTimeout", ""))
      }

      var h, i, j = this, k = {};
      if (isNaN(j._currAnimSpeed) && (j._currAnimSpeed = 400), j._sPosition = j._currRenderPosition = b, j.ev.trigger("rsBeforeAnimStart"), j._useCSS3Transitions)if (j._isMove) {
        j._currAnimSpeed = parseInt(j._currAnimSpeed, 10);
        var l = j._vendorPref + j._TD, m = j._vendorPref + j._TTF;
        k[l] = j._currAnimSpeed + "ms", k[m] = e ? a.rsCSS3Easing[j.st.easeInOut] : a.rsCSS3Easing[j.st.easeOut], j._slidesContainer.css(k), e || !j.hasTouch ? setTimeout(function () {
          j._setPosition(b)
        }, 5) : j._setPosition(b)
      } else j._currAnimSpeed = j.st.transitionSpeed, h = j._oldHolder, i = j._currHolder, i.data("rsTimeout") && i.css("opacity", 0), g(), h && h.data("rsTimeout", setTimeout(function () {
        k[j._vendorPref + j._TD] = "0ms", k.zIndex = 0, k.display = "none", h.data("rsTimeout", ""), h.css(k), setTimeout(function () {
          h.css("opacity", 0)
        }, 16)
      }, j._currAnimSpeed + 60)), k.display = "block", k.zIndex = j._fadeZIndex, k.opacity = 0, k[j._vendorPref + j._TD] = "0ms", k[j._vendorPref + j._TTF] = a.rsCSS3Easing[j.st.easeInOut], i.css(k), i.data("rsTimeout", setTimeout(function () {
        i.css(j._vendorPref + j._TD, j._currAnimSpeed + "ms"), i.data("rsTimeout", setTimeout(function () {
          i.css("opacity", 1), i.data("rsTimeout", "")
        }, 20))
      }, 20)); else j._isMove ? (k[j._slidesHorizontal ? j._xProp : j._yProp] = b + "px", j._slidesContainer.animate(k, j._currAnimSpeed, e ? j.st.easeInOut : j.st.easeOut)) : (h = j._oldHolder, i = j._currHolder, i.stop(!0, !0).css({
        opacity: 0,
        display: "block",
        zIndex: j._fadeZIndex
      }), j._currAnimSpeed = j.st.transitionSpeed, i.animate({opacity: 1}, j._currAnimSpeed, j.st.easeInOut), g(), h && h.data("rsTimeout", setTimeout(function () {
        h.stop(!0, !0).css({opacity: 0, display: "none", zIndex: 0})
      }, j._currAnimSpeed + 60)));
      j._isAnimating = !0, j.loadingTimeout && clearTimeout(j.loadingTimeout), j.loadingTimeout = f ? setTimeout(function () {
        j.loadingTimeout = null, f.call()
      }, j._currAnimSpeed + 60) : setTimeout(function () {
        j.loadingTimeout = null, j._animationComplete(c)
      }, j._currAnimSpeed + 60)
    }, _stopAnimation: function (a) {
      var b = this;
      if (b._isAnimating = !1, clearTimeout(b.loadingTimeout), b._isMove)if (b._useCSS3Transitions) {
        if (!a) {
          var c = b._sPosition, d = b._currRenderPosition = b._getTransformProp();
          b._slidesContainer.css(b._vendorPref + b._TD, "0ms"), c !== d && b._setPosition(d)
        }
      } else b._slidesContainer.stop(!0), b._sPosition = parseInt(b._slidesContainer.css(b._xProp), 10); else b._fadeZIndex > 20 ? b._fadeZIndex = 10 : b._fadeZIndex++
    }, _getTransformProp: function () {
      var a = this, b = window.getComputedStyle(a._slidesContainer.get(0), null).getPropertyValue(a._vendorPref + "transform"), c = b.replace(/^matrix\(/i, "").split(/, |\)$/g), d = 0 === c[0].indexOf("matrix3d");
      return parseInt(c[a._slidesHorizontal ? d ? 12 : 4 : d ? 13 : 5], 10)
    }, _getCSS3Prop: function (a, b) {
      var c = this;
      return c._useCSS3Transitions ? c._tPref1 + (b ? a + c._tPref2 + 0 : 0 + c._tPref2 + a) + c._tPref3 : a
    }, _animationComplete: function () {
      var a = this;
      a._isMove || (a._currHolder.css("z-index", 0), a._fadeZIndex = 10), a._isAnimating = !1, a.staticSlideId = a.currSlideId, a._updateBlocksContent(), a._slidesMoved = !1, a.ev.trigger("rsAfterSlideChange")
    }, _doBackAndForthAnim: function (a, b) {
      var c = this, d = (-c._realId - c._idOffset) * c._slideSize;
      if (0 !== c.numSlides && !c._isAnimating) {
        if (c.st.loopRewind)return void c.goTo("left" === a ? c.numSlides - 1 : 0, b);
        if (c._isMove) {
          c._currAnimSpeed = 200;
          var e = function () {
            c._isAnimating = !1
          }, f = function () {
            c._isAnimating = !1, c._animateTo(d, "", !1, !0, e)
          };
          c._animateTo(d + ("left" === a ? 30 : -30), "", !1, !0, f)
        }
      }
    }, _resizeImage: function (a) {
      var b = !0;
      if (!a.isRendered) {
        var c, d, e, f = a.content, g = "rsMainSlideImage", h = this, i = h.st.imageAlignCenter, j = h.st.imageScaleMode;
        if (a.videoURL && (g = "rsVideoContainer", "fill" !== j ? c = !0 : (d = f, d.hasClass(g) || (d = d.find("." + g)), d.css({
            width: "100%",
            height: "100%"
          }), g = "rsMainSlideImage")), f.hasClass(g) || (b = !1, f = f.find("." + g)), f) {
          var k = a.iW, l = a.iH;
          if (a.isRendered = !0, "none" !== j || i) {
            e = "fill" !== j ? h._imagePadding : 0;
            var m, n, o, p, q, r = h._wrapWidth - 2 * e, s = h._wrapHeight - 2 * e, t = {};
            "fit-if-smaller" === j && (k > r || l > s) && (j = "fit"), "fill" === j || "fit" === j ? (m = r / k, n = s / l, o = "fill" == j ? m > n ? m : n : "fit" == j ? n > m ? m : n : 1, p = Math.ceil(k * o, 10), q = Math.ceil(l * o, 10)) : (p = k, q = l), "none" !== j && (t.width = p, t.height = q, c && f.find(".rsImg").css({
              width: "100%",
              height: "100%"
            })), i && (t.marginLeft = Math.floor((r - p) / 2) + e, t.marginTop = Math.floor((s - q) / 2) + e), f.css(t)
          }
        }
      }
    }
  }, a.rsProto = b.prototype, a.fn.royalSlider = function (c) {
    var d = arguments;
    return this.each(function () {
      var e = a(this);
      if ("object" != typeof c && c) {
        var f = e.data("royalSlider");
        if (f && f[c])return f[c].apply(f, Array.prototype.slice.call(d, 1))
      } else e.data("royalSlider") || e.data("royalSlider", new b(e, c))
    })
  }, a.fn.royalSlider.defaults = {
    slidesSpacing: 8,
    startSlideId: 0,
    loop: !1,
    loopRewind: !1,
    numImagesToPreload: 4,
    fadeinLoadedSlide: !0,
    slidesOrientation: "horizontal",
    transitionType: "move",
    transitionSpeed: 600,
    controlNavigation: "bullets",
    controlsInside: !0,
    arrowsNav: !0,
    arrowsNavAutoHide: !0,
    navigateByClick: !0,
    randomizeSlides: !1,
    sliderDrag: !0,
    sliderTouch: !0,
    keyboardNavEnabled: !1,
    fadeInAfterLoaded: !0,
    allowCSS3: !0,
    allowCSS3OnWebkit: !0,
    addActiveClass: !1,
    autoHeight: !1,
    easeOut: "easeOutSine",
    easeInOut: "easeInOutSine",
    minSlideOffset: 10,
    imageScaleMode: "fit-if-smaller",
    imageAlignCenter: !0,
    imageScalePadding: 4,
    usePreloader: !0,
    autoScaleSlider: !1,
    autoScaleSliderWidth: 800,
    autoScaleSliderHeight: 400,
    autoScaleHeight: !0,
    arrowsNavHideOnTouch: !1,
    globalCaption: !1,
    slidesDiff: 2
  }, a.rsCSS3Easing = {
    easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
    easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)"
  }, a.extend(jQuery.easing, {
    easeInOutSine: function (a, b, c, d, e) {
      return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    }, easeOutSine: function (a, b, c, d, e) {
      return d * Math.sin(b / e * (Math.PI / 2)) + c
    }, easeOutCubic: function (a, b, c, d, e) {
      return d * ((b = b / e - 1) * b * b + 1) + c
    }
  })
}(jQuery, window), function (a) {
  "use strict";
  a.extend(a.rsProto, {
    _initAutoplay: function () {
      var b, c = this;
      c._autoPlayDefaults = {
        enabled: !1,
        stopAtAction: !0,
        pauseOnHover: !0,
        delay: 2e3
      }, !c.st.autoPlay && c.st.autoplay && (c.st.autoPlay = c.st.autoplay), c.st.autoPlay = a.extend({}, c._autoPlayDefaults, c.st.autoPlay), c.st.autoPlay.enabled && (c.ev.on("rsBeforeParseNode", function (c, d, e) {
        d = a(d), b = d.attr("data-rsDelay"), b && (e.customDelay = parseInt(b, 10))
      }), c.ev.one("rsAfterInit", function () {
        c._setupAutoPlay()
      }), c.ev.on("rsBeforeDestroy", function () {
        c.stopAutoPlay(), c.slider.off("mouseenter mouseleave"), a(window).off("blur" + c.ns + " focus" + c.ns)
      }))
    }, _setupAutoPlay: function () {
      var b = this;
      b.startAutoPlay(), b.ev.on("rsAfterContentSet", function (a, c) {
        b._isDragging || b._isAnimating || !b._autoPlayEnabled || c !== b.currSlide || b._play()
      }), b.ev.on("rsDragRelease", function () {
        b._autoPlayEnabled && b._autoPlayPaused && (b._autoPlayPaused = !1, b._play())
      }), b.ev.on("rsAfterSlideChange", function () {
        b._autoPlayEnabled && b._autoPlayPaused && (b._autoPlayPaused = !1, b.currSlide.isLoaded && b._play())
      }), b.ev.on("rsDragStart", function () {
        b._autoPlayEnabled && (b.st.autoPlay.stopAtAction ? b.stopAutoPlay() : (b._autoPlayPaused = !0, b._pause()))
      }), b.ev.on("rsBeforeMove", function (a, c, d) {
        b._autoPlayEnabled && (d && b.st.autoPlay.stopAtAction ? b.stopAutoPlay() : (b._autoPlayPaused = !0, b._pause()))
      }), b._pausedByVideo = !1, b.ev.on("rsVideoStop", function () {
        b._autoPlayEnabled && (b._pausedByVideo = !1, b._play())
      }), b.ev.on("rsVideoPlay", function () {
        b._autoPlayEnabled && (b._autoPlayPaused = !1, b._pause(), b._pausedByVideo = !0)
      }), a(window).on("blur" + b.ns, function () {
        b._autoPlayEnabled && (b._autoPlayPaused = !0, b._pause())
      }).on("focus" + b.ns, function () {
        b._autoPlayEnabled && b._autoPlayPaused && (b._autoPlayPaused = !1, b._play())
      }), b.st.autoPlay.pauseOnHover && (b._pausedByHover = !1, b.slider.hover(function () {
        b._autoPlayEnabled && (b._autoPlayPaused = !1, b._pause(), b._pausedByHover = !0)
      }, function () {
        b._autoPlayEnabled && (b._pausedByHover = !1, b._play())
      }))
    }, toggleAutoPlay: function () {
      var a = this;
      a._autoPlayEnabled ? a.stopAutoPlay() : a.startAutoPlay()
    }, startAutoPlay: function () {
      var a = this;
      a._autoPlayEnabled = !0, a.currSlide.isLoaded && a._play()
    }, stopAutoPlay: function () {
      var a = this;
      a._pausedByVideo = a._pausedByHover = a._autoPlayPaused = a._autoPlayEnabled = !1, a._pause()
    }, _play: function () {
      var a = this;
      a._pausedByHover || a._pausedByVideo || (a._autoPlayRunning = !0, a._autoPlayTimeout && clearTimeout(a._autoPlayTimeout), a._autoPlayTimeout = setTimeout(function () {
        var b;
        a._loop || a.st.loopRewind || (b = !0, a.st.loopRewind = !0), a.next(!0), b && (b = !1, a.st.loopRewind = !1)
      }, a.currSlide.customDelay ? a.currSlide.customDelay : a.st.autoPlay.delay))
    }, _pause: function () {
      var a = this;
      a._pausedByHover || a._pausedByVideo || (a._autoPlayRunning = !1, a._autoPlayTimeout && (clearTimeout(a._autoPlayTimeout), a._autoPlayTimeout = null))
    }
  }), a.rsModules.autoplay = a.rsProto._initAutoplay
}(jQuery), function (a) {
  "use strict";
  a.extend(a.rsProto, {
    _initFullscreen: function () {
      var b = this;
      b._fullscreenDefaults = {
        enabled: !1,
        keyboardNav: !0,
        buttonFS: !0,
        nativeFS: !1,
        doubleTap: !0
      }, b.st.fullscreen = a.extend({}, b._fullscreenDefaults, b.st.fullscreen), b.st.fullscreen.enabled && b.ev.one("rsBeforeSizeSet", function () {
        b._setupFullscreen()
      })
    }, _setupFullscreen: function () {
      var b = this;
      if (b._fsKeyboard = !b.st.keyboardNavEnabled && b.st.fullscreen.keyboardNav, b.st.fullscreen.nativeFS) {
        var c = {
          supportsFullScreen: !1, isFullScreen: function () {
            return !1
          }, requestFullScreen: function () {
          }, cancelFullScreen: function () {
          }, fullScreenEventName: "", prefix: ""
        }, d = "webkit moz o ms khtml".split(" ");
        if ("undefined" != typeof document.cancelFullScreen)c.supportsFullScreen = !0; else for (var e = 0, f = d.length; f > e; e++)if (c.prefix = d[e], "undefined" != typeof document[c.prefix + "CancelFullScreen"]) {
          c.supportsFullScreen = !0;
          break
        }
        c.supportsFullScreen ? (b.nativeFS = !0, c.fullScreenEventName = c.prefix + "fullscreenchange" + b.ns, c.isFullScreen = function () {
          switch (this.prefix) {
            case"":
              return document.fullScreen;
            case"webkit":
              return document.webkitIsFullScreen;
            default:
              return document[this.prefix + "FullScreen"]
          }
        }, c.requestFullScreen = function (a) {
          return "" === this.prefix ? a.requestFullScreen() : a[this.prefix + "RequestFullScreen"]()
        }, c.cancelFullScreen = function () {
          return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
        }, b._fullScreenApi = c) : b._fullScreenApi = !1
      }
      b.st.fullscreen.buttonFS && (b._fsBtn = a('<div class="rsFullscreenBtn"><div class="rsFullscreenIcn"></div></div>').appendTo(b._controlsContainer).on("click.rs", function () {
        b.isFullscreen ? b.exitFullscreen() : b.enterFullscreen()
      }))
    }, enterFullscreen: function (b) {
      var c = this;
      if (c._fullScreenApi) {
        if (!b)return c._doc.on(c._fullScreenApi.fullScreenEventName, function () {
          c._fullScreenApi.isFullScreen() ? c.enterFullscreen(!0) : c.exitFullscreen(!0)
        }), void c._fullScreenApi.requestFullScreen(a("html")[0]);
        c._fullScreenApi.requestFullScreen(a("html")[0])
      }
      if (!c._isFullscreenUpdating) {
        c._isFullscreenUpdating = !0, c._doc.on("keyup" + c.ns + "fullscreen", function (a) {
          27 === a.keyCode && c.exitFullscreen()
        }), c._fsKeyboard && c._bindKeyboardNav();
        var d = a(window);
        c._fsScrollTopOnEnter = d.scrollTop(), c._fsScrollLeftOnEnter = d.scrollLeft(), c._htmlStyle = a("html").attr("style"), c._bodyStyle = a("body").attr("style"), c._sliderStyle = c.slider.attr("style"), a("body, html").css({
          overflow: "hidden",
          height: "100%",
          width: "100%",
          margin: "0",
          padding: "0"
        }), c.slider.addClass("rsFullscreen");
        var e, f;
        for (f = 0; f < c.numSlides; f++)e = c.slides[f], e.isRendered = !1, e.bigImage && (e.isBig = !0, e.isMedLoaded = e.isLoaded, e.isMedLoading = e.isLoading, e.medImage = e.image, e.medIW = e.iW, e.medIH = e.iH, e.slideId = -99, e.bigImage !== e.medImage && (e.sizeType = "big"), e.isLoaded = e.isBigLoaded, e.isLoading = !1, e.image = e.bigImage, e.images[0] = e.bigImage, e.iW = e.bigIW, e.iH = e.bigIH, e.isAppended = e.contentAdded = !1, c._updateItemSrc(e));
        c.isFullscreen = !0, c._isFullscreenUpdating = !1, c.updateSliderSize(), c.ev.trigger("rsEnterFullscreen")
      }
    }, exitFullscreen: function (b) {
      var c = this;
      if (c._fullScreenApi) {
        if (!b)return void c._fullScreenApi.cancelFullScreen(a("html")[0]);
        c._doc.off(c._fullScreenApi.fullScreenEventName)
      }
      if (!c._isFullscreenUpdating) {
        c._isFullscreenUpdating = !0, c._doc.off("keyup" + c.ns + "fullscreen"), c._fsKeyboard && c._doc.off("keydown" + c.ns), a("html").attr("style", c._htmlStyle || ""), a("body").attr("style", c._bodyStyle || "");
        var d, e;
        for (e = 0; e < c.numSlides; e++)d = c.slides[e], d.isRendered = !1, d.bigImage && (d.isBig = !1, d.slideId = -99, d.isBigLoaded = d.isLoaded, d.isBigLoading = d.isLoading, d.bigImage = d.image, d.bigIW = d.iW, d.bigIH = d.iH, d.isLoaded = d.isMedLoaded, d.isLoading = !1, d.image = d.medImage, d.images[0] = d.medImage, d.iW = d.medIW, d.iH = d.medIH, d.isAppended = d.contentAdded = !1, c._updateItemSrc(d, !0), d.bigImage !== d.medImage && (d.sizeType = "med"));
        c.isFullscreen = !1;
        var f = a(window);
        f.scrollTop(c._fsScrollTopOnEnter), f.scrollLeft(c._fsScrollLeftOnEnter), c._isFullscreenUpdating = !1, c.slider.removeClass("rsFullscreen"), c.updateSliderSize(), setTimeout(function () {
          c.updateSliderSize()
        }, 1), c.ev.trigger("rsExitFullscreen")
      }
    }, _updateItemSrc: function (b) {
      var c = b.isLoaded || b.isLoading ? '<img class="rsImg rsMainSlideImage" src="' + b.image + '"/>' : '<a class="rsImg rsMainSlideImage" href="' + b.image + '"></a>';
      b.content.hasClass("rsImg") ? b.content = a(c) : b.content.find(".rsImg").eq(0).replaceWith(c), b.isLoaded || b.isLoading || !b.holder || b.holder.html(b.content)
    }
  }), a.rsModules.fullscreen = a.rsProto._initFullscreen
}(jQuery), ("undefined" == typeof Crypto || !Crypto.util) && function () {
  var a = window.Crypto = {}, b = a.util = {
    rotl: function (a, b) {
      return a << b | a >>> 32 - b
    }, rotr: function (a, b) {
      return a << 32 - b | a >>> b
    }, endian: function (a) {
      if (a.constructor == Number)return 16711935 & b.rotl(a, 8) | 4278255360 & b.rotl(a, 24);
      for (var c = 0; c < a.length; c++)a[c] = b.endian(a[c]);
      return a
    }, randomBytes: function (a) {
      for (var b = []; a > 0; a--)b.push(Math.floor(256 * Math.random()));
      return b
    }, bytesToWords: function (a) {
      for (var b = [], c = 0, d = 0; c < a.length; c++, d += 8)b[d >>> 5] |= (255 & a[c]) << 24 - d % 32;
      return b
    }, wordsToBytes: function (a) {
      for (var b = [], c = 0; c < 32 * a.length; c += 8)b.push(a[c >>> 5] >>> 24 - c % 32 & 255);
      return b
    }, bytesToHex: function (a) {
      for (var b = [], c = 0; c < a.length; c++)b.push((a[c] >>> 4).toString(16)), b.push((15 & a[c]).toString(16));
      return b.join("")
    }, hexToBytes: function (a) {
      for (var b = [], c = 0; c < a.length; c += 2)b.push(parseInt(a.substr(c, 2), 16));
      return b
    }, bytesToBase64: function (a) {
      if ("function" == typeof btoa)return btoa(c.bytesToString(a));
      for (var b = [], d = 0; d < a.length; d += 3)for (var e = a[d] << 16 | a[d + 1] << 8 | a[d + 2], f = 0; 4 > f; f++)b.push(8 * d + 6 * f <= 8 * a.length ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >>> 6 * (3 - f) & 63) : "=");
      return b.join("")
    }, base64ToBytes: function (a) {
      if ("function" == typeof atob)return c.stringToBytes(atob(a));
      for (var a = a.replace(/[^A-Z0-9+\/]/gi, ""), b = [], d = 0, e = 0; d < a.length; e = ++d % 4)0 != e && b.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(d - 1)) & Math.pow(2, -2 * e + 8) - 1) << 2 * e | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(d)) >>> 6 - 2 * e);
      return b
    }
  }, a = a.charenc = {};
  a.UTF8 = {
    stringToBytes: function (a) {
      return c.stringToBytes(unescape(encodeURIComponent(a)))
    }, bytesToString: function (a) {
      return decodeURIComponent(escape(c.bytesToString(a)))
    }
  };
  var c = a.Binary = {
    stringToBytes: function (a) {
      for (var b = [], c = 0; c < a.length; c++)b.push(255 & a.charCodeAt(c));
      return b
    }, bytesToString: function (a) {
      for (var b = [], c = 0; c < a.length; c++)b.push(String.fromCharCode(a[c]));
      return b.join("")
    }
  }
}(), function () {
  var a = Crypto, b = a.util, c = a.charenc, d = c.UTF8, e = c.Binary, f = a.SHA1 = function (a, c) {
    var d = b.wordsToBytes(f._sha1(a));
    return c && c.asBytes ? d : c && c.asString ? e.bytesToString(d) : b.bytesToHex(d)
  };
  f._sha1 = function (a) {
    a.constructor == String && (a = d.stringToBytes(a));
    var c = b.bytesToWords(a), e = 8 * a.length, a = [], f = 1732584193, g = -271733879, h = -1732584194, i = 271733878, j = -1009589776;
    for (c[e >> 5] |= 128 << 24 - e % 32, c[(e + 64 >>> 9 << 4) + 15] = e, e = 0; e < c.length; e += 16) {
      for (var k = f, l = g, m = h, n = i, o = j, p = 0; 80 > p; p++) {
        if (16 > p)a[p] = c[e + p]; else {
          var q = a[p - 3] ^ a[p - 8] ^ a[p - 14] ^ a[p - 16];
          a[p] = q << 1 | q >>> 31
        }
        q = (f << 5 | f >>> 27) + j + (a[p] >>> 0) + (20 > p ? (g & h | ~g & i) + 1518500249 : 40 > p ? (g ^ h ^ i) + 1859775393 : 60 > p ? (g & h | g & i | h & i) - 1894007588 : (g ^ h ^ i) - 899497514), j = i, i = h, h = g << 30 | g >>> 2, g = f, f = q
      }
      f += k, g += l, h += m, i += n, j += o
    }
    return [f, g, h, i, j]
  }, f._blocksize = 16, f._digestsize = 20
}(), function () {
  var a = Crypto, b = a.util, c = a.charenc, d = c.UTF8, e = c.Binary;
  a.HMAC = function (a, c, f, g) {
    c.constructor == String && (c = d.stringToBytes(c)), f.constructor == String && (f = d.stringToBytes(f)), f.length > 4 * a._blocksize && (f = a(f, {asBytes: !0}));
    for (var h = f.slice(0), f = f.slice(0), i = 0; i < 4 * a._blocksize; i++)h[i] ^= 92, f[i] ^= 54;
    return a = a(h.concat(a(f.concat(c), {asBytes: !0})), {asBytes: !0}), g && g.asBytes ? a : g && g.asString ? e.bytesToString(a) : b.bytesToHex(a)
  }
}(), function (a) {
  function b(a) {
    return "object" == typeof a ? a : {top: a, left: a}
  }

  var c = a.scrollTo = function (b, c, d) {
    a(window).scrollTo(b, c, d)
  };
  c.defaults = {axis: "xy", duration: parseFloat(a.fn.jquery) >= 1.3 ? 0 : 1, limit: !0}, c.window = function () {
    return a(window)._scrollable()
  }, a.fn._scrollable = function () {
    return this.map(function () {
      var b = this, c = !b.nodeName || -1 != a.inArray(b.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
      if (!c)return b;
      var d = (b.contentWindow || b).document || b.ownerDocument || b;
      return /webkit/i.test(navigator.userAgent) || "BackCompat" == d.compatMode ? d.body : d.documentElement
    })
  }, a.fn.scrollTo = function (d, e, f) {
    return "object" == typeof e && (f = e, e = 0), "function" == typeof f && (f = {onAfter: f}), "max" == d && (d = 9e9), f = a.extend({}, c.defaults, f), e = e || f.duration, f.queue = f.queue && f.axis.length > 1, f.queue && (e /= 2), f.offset = b(f.offset), f.over = b(f.over), this._scrollable().each(function () {
      function g(a) {
        j.animate(l, e, f.easing, a && function () {
          a.call(this, d, f)
        })
      }

      if (null != d) {
        var h, i = this, j = a(i), k = d, l = {}, m = j.is("html,body");
        switch (typeof k) {
          case"number":
          case"string":
            if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)) {
              k = b(k);
              break
            }
            if (k = a(k, this), !k.length)return;
          case"object":
            (k.is || k.style) && (h = (k = a(k)).offset())
        }
        a.each(f.axis.split(""), function (a, b) {
          var d = "x" == b ? "Left" : "Top", e = d.toLowerCase(), n = "scroll" + d, o = i[n], p = c.max(i, b);
          if (h)l[n] = h[e] + (m ? 0 : o - j.offset()[e]), f.margin && (l[n] -= parseInt(k.css("margin" + d)) || 0, l[n] -= parseInt(k.css("border" + d + "Width")) || 0), l[n] += f.offset[e] || 0, f.over[e] && (l[n] += k["x" == b ? "width" : "height"]() * f.over[e]); else {
            var q = k[e];
            l[n] = q.slice && "%" == q.slice(-1) ? parseFloat(q) / 100 * p : q
          }
          f.limit && /^\d+$/.test(l[n]) && (l[n] = l[n] <= 0 ? 0 : Math.min(l[n], p)), !a && f.queue && (o != l[n] && g(f.onAfterFirst), delete l[n])
        }), g(f.onAfter)
      }
    }).end()
  }, c.max = function (b, c) {
    var d = "x" == c ? "Width" : "Height", e = "scroll" + d;
    if (!a(b).is("html,body"))return b[e] - a(b)[d.toLowerCase()]();
    var f = "client" + d, g = b.ownerDocument.documentElement, h = b.ownerDocument.body;
    return Math.max(g[e], h[e]) - Math.min(g[f], h[f])
  }
}(jQuery), function (a, b) {
  b.module("app", ["ngRoute", "ngTouch", "ngAnimate", "LocalStorageModule", "templates-app", "templates-common", "config.services", "browse.services", "url.services", "navigation.services", "preferences.services", "utils.services", "search.services", "queue.services", "auth.services", "alert.services", "login.services", "app.services", "flowplayer.services", "ad.services", "browse.app", "player.app", "navigation.app", "search.app", "queue.app", "login.app", "image-viewer.app", "directives.genericui", "directives.breadcrumb", "directives.modalDialogs", "directives.player", "directives.browse", "directives.flowplayer", "directives.flowplayerV5", "directives.audioplayer", "directives.image-viewer", "infinite-scroll", "filters.converters"]).config(["$routeProvider", function (a) {
    a.otherwise({redirectTo: "/browse"})
  }]).config(["$httpProvider", function (a) {
    a.responseInterceptors.push("handleGlobalErrors")
  }]).run(["$rootScope", "$location", "AuthenticationService", "AlertService", "Utils", "ApplicationService", "PreferencesService", function (a, b, c, d, e, f, g) {
    f.loadApplicationData();
    var h = a.cdsAnonymousEnabled ? [] : ["/browse", "/queue", "/search"];
    a.loggedIn = a.cdsAnonymousEnabled ? !0 : g.getStoredToken() ? !0 : !1, a.$on("$routeChangeStart", function () {
      d.clear(), _.some(h, function (a) {
        return e.startsWith(b.path(), a)
      }) && !c.isLoggedIn() && (a.request401 = b.path(), a.$broadcast("loginRequired"))
    })
  }]).factory("handleGlobalErrors", ["$location", "$rootScope", "$q", "AlertService", function (a, b, c, d) {
    return function (e) {
      return e.then(function (a) {
        return a
      }, function (e) {
        if (401 !== e.status)d.errorCodeMessage(e.status, e.data ? e.data.errorCode : 0); else if ("/login" !== a.path()) {
          var f = c.defer();
          return b.request401 = a.path(), b.$broadcast("loginRequired"), f.promise
        }
        return c.reject(e)
      })
    }
  }]).controller("AppCtrl", ["$rootScope", "$scope", function (a, b) {
    a.scrollingEnabled = !0, b.$on("openModal", function () {
      a.scrollingEnabled = !1
    }), b.$on("closeModal", function () {
      a.scrollingEnabled = !0
    })
  }]), b.module("browse.app", ["ngRoute", "browse.services", "preferences.services", "queue.services", "alert.services"]).config(["$routeProvider", "ROOT_CONTAINER_ID", "CATEGORY_IDS", function (a, b, c) {
    a.when("/browse", {
      templateUrl: "browse/browse-home.tpl.html",
      controller: "BrowseCtrl",
      resolve: {
        containerTitle: function () {
          return ""
        }, containerId: function () {
          return ""
        }
      }
    }).when("/browse/:containerId", {
      templateUrl: function (a) {
        var d = a.containerId;
        return d && d !== b ? _.contains(c, d) ? "browse/browse-categories.tpl.html" : "browse/browse.tpl.html" : "browse/browse-home.tpl.html"
      }, controller: "BrowseCtrl", resolve: {
        containerTitle: ["$route", function (a) {
          return a.current.params.title
        }], containerId: ["$route", function (a) {
          return a.current.pathParams.containerId
        }]
      }
    })
  }]).controller("BrowseCtrl", ["$scope", "$rootScope", "$location", "BrowseSharedData", "containerTitle", "containerId", "BrowseService", "AlertService", "PreferencesService", "QueueService", "CATEGORY_ID_IMAGE", function (a, b, c, d, e, f, g, h, i, j, k) {
    a.browse = b.loggedIn ? d.newData() : null, a.thubmnailView = i.isGridView(), a.containerTitle = e, a.containerId = f, a.containerFileType = g.getContainerFileType(f), a.lastPlayedItemId = null, b.$broadcast("containerChanged", f, e), a.goBack = function () {
      c.url(a.backButtonUrl)
    }, a.numberOfLoadedItems = function () {
      return a.browse ? a.browse.items.length : 0
    }, a.objectAction = function (d, e, f, i, j) {
      d ? c.url(g.generateBrowseUrl(d, e, i, j)) : (h.clear(), a.selectedItemId = f, a.containerFileType === k ? b.$broadcast("openImageViewer", f, "browse", a.containerFileType) : b.$broadcast("openPlayer", f, "browse", a.containerFileType, a.containerTitle))
    }, a.generateBrowseUrl = function (a, b, c) {
      return "#" + g.generateBrowseUrl(!0, a, b, c)
    }, a.addToQueue = function (b) {
      h.clear(), j.addItemToQueue(a.browse.findItemById(b))
    }, a.$on("viewChanged", function (b, c) {
      a.thubmnailView = c
    }), a.$on("playerClosed", function (b, c) {
      a.lastPlayedItemId = c
    })
  }]), b.module("image-viewer.app", ["browse.services", "url.services", "queue.services", "alert.services"]).controller("ImageViewerCtrl", ["$scope", "$rootScope", "BrowseService", "BrowseSharedData", "Browse", "QueueService", "AlertService", "CATEGORY_ID_IMAGE", function (a, b, c, d, e, f, g, h) {
    function i() {
      a.browse = d.getCurrentBrowseData(), a.autoPlay = !1
    }

    function j(b) {
      c.retrieveSingleItem(b).success(function (b) {
        var c = new e, d = b.objects[0];
        d.uniqueId = d.id, c.items.push(d), a.browse = c, a.autoPlay = !1
      }).error(function () {
      })
    }

    function k(b) {
      var c = new e;
      c.items = f.getQueueItems(b), a.browse = c, a.autoPlay = !0
    }

    function l() {
      a.viewerHidden = !1, b.$broadcast("openModal")
    }

    a.browse = null, a.viewerHidden = !0, a.selectedItemUniqueId = null, a.autoPlay = !1, a.$on("openImageViewer", function (b, c, d, e) {
      a.selectedItemUniqueId = c, "browse" === d ? i() : "search" === d ? j(c) : "queue" === d && k(e), l()
    }), a.$on("$locationChangeStart", function (b) {
      a.viewerHidden || (b.preventDefault(), a.closePlayer(), a.$apply())
    }), a.$on("playAllInQueue", function (b, c) {
      if (c === h) {
        var d = f.getQueueItems(c);
        d && d.length > 0 && (a.autoPlay = !0, a.selectedItemUniqueId = d[0].uniqueId, k(c), l())
      }
    }), a.$on("playAllInContainer", function (b, c) {
      if (c === h) {
        var e = _.find(d.getCurrentBrowseData().items, function (a) {
          return "ITEM" === a.type
        });
        e && (a.selectedItemUniqueId = e.uniqueId, a.browse = d.getCurrentBrowseData(), a.autoPlay = !0, l())
      }
    }), a.closePlayer = function () {
      b.$broadcast("closeModal"), a.viewerHidden = !0, a.browse = null, a.selectedItemUniqueId = null, a.autoPlay = !1
    }
  }]), b.module("login.app", ["login.services", "auth.services", "alert.services", "ngRoute"]).config(["$routeProvider", function (a) {
    a.when("/login", {templateUrl: "login/login.tpl.html", controller: "LoginCtrl"})
  }]).run(["$rootScope", "$location", "AuthenticationService", function (a, b, c) {
    a.request401 = "", a.$on("loginConfirmed", function () {
      var c = a.request401;
      c ? (b.path(c), a.request401 = "") : b.path("/browse")
    }), a.$on("loginRequired", function () {
      c.logout(), b.path("/login")
    })
  }]).controller("LoginCtrl", ["$scope", "$rootScope", "$location", "LoginService", "AuthenticationService", "AlertService", function (a, b, c, d, e, f) {
    a.password = "", a.errorMessage = "", a.rememberMe = !1, a.login = function () {
      makeLoginRequest(a.password, a.rememberMe)
    }, makeLoginRequest = function (c, g) {
      $.ajax(d.logIn(c, function (c) {
        a.$apply(function () {
          a.errorMessage = "", b.$broadcast("loginConfirmed"), e.login(c.parameter[0], g)
        })
      }, function (b) {
        a.$apply(function () {
          var c = b.responseJSON;
          a.errorMessage = f.messageText(b.status, c.errorCode)
        })
      }))
    }
  }]), b.module("navigation.app", ["navigation.services", "preferences.services", "browse.services", "queue.services", "auth.services", "url.services"]).controller("NavigationCtrl", ["$scope", "$rootScope", "$location", "NavigationService", "PreferencesService", "BrowseService", "AuthenticationService", "QueueService", "UrlService", "ROOT_CONTAINER_ID", function (a, b, c, d, e, f, g, h, i, j) {
    var k = "";
    a.navigationItems = [], a.queueCount = null, a.pageType = null, a.containerTitle = null, a.$on("containerChanged", function (b, c, d) {
      setupQueueCount(c), k = c, a.pageType = "browse", a.containerTitle = d, renderNavigation()
    }), a.$on("searchResultsShown", function (b, c) {
      setupQueueCount(c), k = c, a.pageType = "search", renderNavigation()
    }), a.$on("queueShown", function (b, c) {
      setupQueueCount(c), k = c, a.pageType = "queue", renderNavigation()
    }), a.$on("addedToQueue", function (b, c) {
      a.queueCount = a.queueCount ? a.queueCount + c : c
    }), a.$on("removedFromQueue", function () {
      a.queueCount = a.queueCount > 1 ? a.queueCount - 1 : null
    }), a.$on("queueCleaned", function () {
      a.queueCount = null
    }), a.switchToListView = function () {
      e.setGridView(!1), b.$broadcast("viewChanged", !1), renderNavigation()
    }, a.switchToGridView = function () {
      e.setGridView(!0), b.$broadcast("viewChanged", !0), renderNavigation()
    }, a.openSearchBox = function () {
      b.$broadcast("openSearchBox", k)
    }, a.playAll = function () {
      b.$broadcast("playAllInContainer", f.getContainerFileType(k), a.containerTitle)
    }, a.playAllQueue = function () {
      b.$broadcast("playAllInQueue", f.getContainerFileType(k))
    }, a.goToQueue = function () {
      c.path("/queue/" + k)
    }, a.addAllToQueue = function () {
      h.addAllToQueue(k)
    }, a.cleanQueue = function () {
      b.$broadcast("cleanQueue")
    }, a.logout = function () {
      g.logout(), i.redirectToLogin()
    }, renderNavigation = function () {
      a.navigationItems = d.getNavigationItems(a.pageType, k)
    }, setupQueueCount = function (b) {
      if (b && b !== j) {
        var c = f.getContainerFileType(b);
        if (!k || c != f.getContainerFileType(k)) {
          var d = h.getQueueSize(c);
          a.queueCount = 0 !== d ? d : null
        }
      }
    }
  }]), b.module("player.app", ["browse.services", "queue.services", "login.services", "alert.services", "config.services", "flowplayer.services"]).controller("PlayerCtrl", ["$scope", "$rootScope", "$window", "FlowPlayerService", "BrowseSharedData", "Browse", "BrowseService", "AlertService", "QueueService", "LoginService", "ConfigService", "CATEGORY_ID_IMAGE", function (a, b, c, d, e, f, g, h, i, j, k, l) {
    a.playerHidden = !0, a.mobilePlaylistVisible = !1, a.browse = null, a.selectedItem = null, a.autoPlay = !1, a.playlistItemsFullyLoaded = !1, a.containerTitle = null, a.playerV5 = k.useHtml5Player, a.adRolling = !1, a.$on("$locationChangeStart", function (b) {
      a.playerHidden || (b.preventDefault(), a.closePlayer(), a.$apply())
    }), a.$on("openPlayer", function (a, b, c, d, e) {
      j.playerKey(), "browse" === c ? openPlayerWindowForItem(b, !0, e) : "search" === c ? openPlayerWindowForSearchItem(b) : "queue" === c && openPlayerWindowForQueueItem(b, !0, d)
    }), a.$on("playNextInPlaylist", function (b, c) {
      var d = findNextItem(c, a.browse.items);
      d ? a.$apply(function () {
        a.autoPlay = !0, setSelectedItem(d.id, d.uniqueId, d)
      }) : a.autoPlay = !1
    }), a.$on("playAllInContainer", function (b, c, d) {
      if (c !== l) {
        var f = _.find(e.getCurrentBrowseData().items, function (a) {
          return "ITEM" === a.type
        });
        f && (a.autoPlay = !0, openPlayerWindowForItem(f.uniqueId, !1, d))
      }
    }), a.$on("playAllInQueue", function (b, c) {
      if (c !== l) {
        var d = i.getQueueItems(c);
        d && d.length > 0 && (a.autoPlay = !0, openPlayerWindowForQueueItem(d[0].uniqueId, !1, c))
      }
    }), a.play = function (b) {
      (null == a.selectedItem || a.selectedItem.uniqueId !== b) && (d.closePlayer(), playItem(b, !0))
    }, a.closePlayer = function () {
      b.$broadcast("closeModal"), b.$broadcast("playerClosed", a.selectedItem.uniqueId), d.closePlayer(), a.playerHidden = !0, a.mobilePlaylistVisible = !1, a.browse = null, a.autoPlay = !1, a.selectedItem = null, a.playlistItemsFullyLoaded = !1
    }, a.showPlaylistInMobile = function () {
      a.mobilePlaylistVisible = !0
    }, a.showPlayerInMobile = function () {
      a.mobilePlaylistVisible = !1
    }, openPlayerWindowForItem = function (b, c, d) {
      a.playlistItemsFullyLoaded = !1, a.browse = e.getCurrentBrowseData(), a.containerTitle = d, playItem(b, c), openPlayer()
    }, openPlayerWindowForSearchItem = function (b) {
      g.retrieveSingleItem(b).success(function (c) {
        var d = new f, e = c.objects[0];
        e.uniqueId = e.id, d.items.push(e), a.playlistItemsFullyLoaded = !0, a.browse = d, a.containerTitle = "Search results", playItem(b, !1), openPlayer()
      }).error(function () {
      })
    }, openPlayerWindowForQueueItem = function (b, c, d) {
      var e = new f;
      e.items = i.getQueueItems(d), a.playlistItemsFullyLoaded = !0, a.browse = e, a.containerTitle = "Queue", playItem(b, c), openPlayer()
    }, playItem = function (b, c) {
      var d = findItem(b, a.browse.items);
      c && (a.autoPlay = "AUDIO" === d.fileType ? !0 : !1), setSelectedItem(d.id, b, d)
    }, openPlayer = function () {
      a.mobilePlaylistVisible = !1, a.playerHidden = !1, b.$broadcast("openModal")
    }, findItem = function (a, b) {
      return _.find(b, function (b) {
        return b.uniqueId === a
      })
    }, findNextItem = function (a, b) {
      for (var c = -1, d = 0; d < b.length; d++)if (b[d].uniqueId === a) {
        c = d + 1;
        break
      }
      return c > -1 && c < b.length ? b[c] : null
    }, setSelectedItem = function (b, c, d) {
      g.retrieveSingleItem(b).success(function (b) {
        var d = b.objects[0];
        d.uniqueId = c, a.adRolling = !1, a.selectedItem = d
      }).error(function () {
        a.selectedItem = d
      })
    }
  }]), b.module("queue.app", ["ngRoute", "queue.services", "url.services", "browse.services", "preferences.services", "alert.services"]).config(["$routeProvider", function (a) {
    a.when("/queue/:containerId", {
      templateUrl: "queue/queue.tpl.html",
      controller: "QueueCtrl",
      resolve: {
        containerId: ["$route", function (a) {
          return a.current.pathParams.containerId
        }]
      }
    })
  }]).controller("QueueCtrl", ["$scope", "$rootScope", "QueueService", "UrlService", "BrowseService", "PreferencesService", "AlertService", "containerId", "CATEGORY_ID_IMAGE", function (a, b, c, d, e, f, g, h, i) {
    function j() {
      return "#/browse/" + h + "?" + d.buildQueryParams(["title", "b", "bid"])
    }

    function k() {
      return e.getContainerFileType(h)
    }

    a.thubmnailView = f.isGridView(), a.containerFileType = k(), a.queueItems = c.getQueueItems(a.containerFileType), a.backButtonUrl = j(), a.lastPlayedItemId = null, b.$broadcast("queueShown", h), a.$on("cleanQueue", function () {
      c.removeAllItems(a.containerFileType)
    }), a.$on("viewChanged", function (b, c) {
      a.thubmnailView = c
    }), a.$on("playerClosed", function (b, c) {
      a.lastPlayedItemId = c
    }), a.removeFromQueue = function (b) {
      g.clear(), c.removeItem(a.containerFileType, b)
    }, a.playItem = function (c) {
      g.clear(), a.containerFileType === i ? b.$broadcast("openImageViewer", c, "queue", a.containerFileType) : b.$broadcast("openPlayer", c, "queue", a.containerFileType)
    }
  }]), b.module("search.app", ["ngRoute", "url.services", "search.services", "browse.services", "queue.services", "alert.services"]).config(["$routeProvider", function (a) {
    a.when("/search/:containerId", {
      templateUrl: "search/search.tpl.html",
      controller: "SearchCtrl",
      resolve: {
        searchTerm: ["$route", function (a) {
          return a.current.params.q
        }], containerId: ["$route", function (a) {
          return a.current.pathParams.containerId
        }]
      }
    })
  }]).controller("SearchBoxCtrl", ["$scope", "$rootScope", "$location", "UrlService", function (a, b, c) {
    a.dialogBoxHidden = !0, a.searchTerm = "";
    var d = "";
    a.$on("openSearchBox", function (a, b) {
      d = b, openSearchBox()
    }), a.closeSearchBox = function () {
      b.$broadcast("closeModal"), a.searchTerm = "", a.dialogBoxHidden = !0
    }, a.search = function () {
      if ("" !== a.searchTerm.trim()) {
        var b = a.searchTerm;
        a.searchTerm = "", a.closeSearchBox(), c.path("/search/" + d).search("q", b)
      }
    }, openSearchBox = function () {
      a.dialogBoxHidden = !1, b.$broadcast("openModal")
    }
  }]).controller("SearchCtrl", ["$scope", "$rootScope", "$location", "searchTerm", "containerId", "SearchService", "BrowseService", "AlertService", "QueueService", "UrlService", "ThumbnailLoader", "CATEGORY_ID_IMAGE", function (a, b, c, d, e, f, g, h, i, j, k, l) {
    function m() {
      return "#/browse/" + e + "?" + j.buildQueryParams(["title", "b", "bid"])
    }

    function n(a, b) {
      c.search("title", b), c.path("browse/" + a)
    }

    function o(a) {
      h.clear();
      var c = g.getContainerFileType(a);
      c === l ? b.$broadcast("openImageViewer", a, "search", c) : b.$broadcast("openPlayer", a, "search", c)
    }

    a.searchResult = null, a.found = !1, a.searchRun = !1, a.searchTerm = d, a.backButtonUrl = m(), b.$broadcast("searchResultsShown", e), f.search(d, g.getContainerFileType(e)).success(function (b) {
      a.searchResult = b, a.found = _.some(b.categoryResults, function (a) {
        return a.returnedSize > 0
      }), _.each(b.categoryResults, function (a) {
        _.each(a.objects, function (a) {
          a.thumbnailLoaded = !1, k.preloadImage(a)
        })
      }), a.searchRun = !0
    }).error(function () {
      j.redirectToBrowseRoot()
    }), a.objectAction = function (a, b, c) {
      c ? n(a, b) : o(a)
    }, a.addToQueue = function (a) {
      h.clear(), g.retrieveSingleItem(a).success(function (a) {
        var b = a.objects[0];
        b.uniqueId = b.id, i.addItemToQueue(b)
      }).error(function () {
      })
    }
  }]), b.module("directives.audioplayer", ["utils.services", "url.services", "browse.services", "flowplayer.services", "config.services"]).directive("audioPlayerHtml5", ["UrlService", "BrowseService", "FlowPlayerService", "ConfigService", function (c, d, e, f) {
    return {
      template: function () {
        return f.useHtml5Player ? '<div class="audioCoverImage"><div id="componentWrapper" class="flowPlayerAudio"><div class="controls_toggle"><img src="assets/play.png" alt="controls_toggle"/></div><div class="player_mediaTime_current">00:00</div><div class="player_progress">	<div class="progress_bg"></div>	<div class="load_progress"></div>	<div class="play_progress"></div>	<div class="player_progress_tooltip"><p></p></div></div><div class="player_mediaTime_total">00:00</div><div class="player_volume_wrapper">	<div class="player_volume"><img src="assets/volume.png" alt="player_volume"/></div>	<div class="volume_seekbar" data-orientation="vertical" data-autoHide="3000">		<div class="volume_bg"></div>		<div class="volume_level"></div>		<div class="player_volume_tooltip"><p></p></div>	</div></div></div></div>' : "<div></div>"
      }, restrict: "E", replace: !0, link: function (f, g, h) {
        var i = {
          useOnlyMp3Format: !0,
          sound_id: "html5audio",
          defaultVolume: .5,
          autoPlay: !0,
          autoLoad: !1,
          loopingOn: !1,
          mediaTimeSeparator: "",
          useVolumeTooltip: !0,
          useSeekbarTooltip: !0,
          seekTooltipSeparator: "&nbsp;/&nbsp;",
          buttonsUrl: {
            pause: "assets/pause.png",
            pauseOn: "assets/pause_on.png",
            play: "assets/play.png",
            playOn: "assets/play_on.png",
            volume: "assets/volume.png",
            volumeOn: "assets/volume_on.png",
            mute: "assets/mute.png",
            muteOn: "assets/mute_on.png"
          }
        }, j = $("#componentWrapper").html5audio(i);
        f.$on("closePlayer", function () {
          j.stopAudio(), j.destroyAudio()
        }), h.$observe("item", function (f) {
          if (null != f && "" !== f) {
            var g = b.fromJson(f), h = c.secureUrl(g.thumbnailUrl);
            h && $(".audioCoverImage").css("background-image", "url('" + h + "')");
            var i = c.secureUrl(d.getOriginalQualityContent(g).url);
            a.audioPlayerSoundEnd = function () {
              e.playNextInPlaylist(g.uniqueId)
            };
            var k = {type: "local", mp3: i};
            j.inputAudio(k)
          }
        })
      }
    }
  }]), b.module("directives.breadcrumb", ["browse.services", "ngRoute"]).directive("breadcrumb", ["$routeParams", "BrowseService", function (a, c) {
    function d(a, b, c) {
      var d = a.slice(0, c), e = b.slice(0, c), f = _.reduce(d, function (a, b) {
        return a + "&b=" + b
      }, ""), g = _.reduce(e, function (a, b) {
        return a + "&bid=" + b
      }, "");
      return f + g
    }

    return {
      restrict: "A", link: function (e, f) {
        for (var g = b.isArray(a.b) ? a.b : [a.b], h = b.isArray(a.bid) ? a.bid : [a.bid], i = "", j = 0; j < g.length; j++) {
          var k = "#" + c.generateBrowseUrl(!0, h[j], g[j], d(g, h, j));
          i = i + '<li><a href="' + k + '">' + g[j] + "</a></li>"
        }
        var l = c.generateBrowseUrl(!0, h[h.length - 1], g[g.length - 1], d(g, h, g.length - 1)), m = '<div class="row"><div class="navigation"><a class="backButton" href="#' + l + '"></a><ol class="breadcrumb">', n = "</ol></div></div>";
        f.html(m + i + n), g.push(e.containerTitle), h.push(e.containerId), e.breadcrumbUrlParams = d(g, h, g.length), e.backButtonUrl = l
      }
    }
  }]), b.module("directives.browse", []).directive("audioTitleInPlayerPlaylistView", function () {
    return {
      restrict: "E", replace: !0, link: function (a, b) {
        var c = a.item.title;
        a.item.artist && (c = c + '<span class="secondary"> - ' + a.item.artist + "</span>"), b.replaceWith(c)
      }
    }
  }).directive("audioTitleInListView", ["$filter", function (a) {
    return {
      restrict: "E", replace: !0, link: function (b, c) {
        var d = b.item.title + '<span ng-if="!isContainer">', e = !1;
        if ((b.item.artist || b.item.album || b.item.duration) && (e = !0), e) {
          d += '<span class="secondary"> - ';
          var f = [];
          b.item.artist && f.push(b.item.artist), b.item.album && f.push(b.item.album), b.item.duration && f.push(a("timeStringShort")(b.item.duration)), d += f.join(" / ")
        }
        e && (d += "</span>"), d += "</span>", c.replaceWith(d)
      }
    }
  }]).directive("notifyScroller", ["$rootScope", function (a) {
    return function (b) {
      b.$last && a.$broadcast("scrollableLoaded")
    }
  }]).directive("scrollToLastViewedItem", ["$timeout", function (a) {
    return {
      restrict: "A", link: function (b, c, d) {
        d.$observe("scrollToLastViewedItem", function (b) {
          "true" === b && a(function () {
            c.get(0).scrollIntoView(!1)
          }, 500)
        })
      }
    }
  }]), b.module("directives.flowplayer", ["utils.services", "url.services", "browse.services", "login.services", "flowplayer.services"]).constant("flowPlayer_audioPlugin", "assets/flowplayer.audio-3.2.10.swf").constant("flowPlayer_main", "assets/flowplayer-3.2.16.swf").constant("flowPlayer_menuPlugin", "assets/flowplayer.menu-3.2.12.swf").constant("flowPlayer_bitrateSelectPlugin", "assets/flowplayer.bitrateselect-3.2.13.swf").constant("flowPlayer_serviioProviderPlugin", "assets/flowplayer.serviiostreaming-1.0.10.swf").constant("flowPlayer_captionsPlugin", "assets/flowplayer.captions-3.2.9.swf").constant("flowPlayer_contentPlugin", "assets/flowplayer.content-3.2.8.swf").factory("FlowPlayerFlashService", ["flowPlayer_main", "Utils", "LoginService", function (a, b, c) {
    return {
      initFlowPlayer: function (d, e, f, g) {
        flowplayer(d, a, {
          key: c.playerKey(),
          canvas: {backgroundGradient: [0, 0]},
          clip: f,
          playlist: g,
          plugins: e
        }).ipad({validExtensions: "", simulateiDevice: !b.isIOS() && !b.useFlashPlayer()})
      }, buildControls: function (a, b) {
        return {
          autoHide: b,
          backgroundColor: "#dbdbdb",
          backgroundGradient: "none",
          buttonColor: "#f89f04",
          progressColor: "#f89f04",
          sliderColor: "#c9c9c9",
          sliderBorder: "none",
          scrubberHeightRatio: .8,
          scrubberBarHeightRatio: .5,
          volumeSliderColor: "#c9c9c9",
          volumeBorder: "none",
          volumeColor: "#f89f04",
          timeColor: "#333333",
          durationColor: "#333333",
          timeSeparator: " / ",
          tooltipColor: "rgba(255, 255, 255, 0.7)",
          tooltipTextColor: "#000000",
          fullscreen: a,
          stop: !0
        }
      }
    }
  }]).directive("audioPlayer", ["FlowPlayerService", "FlowPlayerFlashService", "UrlService", "BrowseService", "Utils", "flowPlayer_audioPlugin", function (a, c, d, e, f, g) {
    return {
      template: function () {
        var a = f.useFlashPlayer() ? "flash" : "html5";
        return '<div class="audioCoverImage"><a id="flowplayer_aud" class="flowPlayerAudio ' + a + '"></a></div>'
      }, restrict: "E", replace: !0, link: function (h, i, j) {
        j.$observe("item", function (i) {
          if (null != i && "" !== i) {
            var j = b.fromJson(i), k = !f.useFlashPlayer(), l = d.secureUrl(e.getOriginalQualityContent(j).url), m = d.secureUrl(j.thumbnailUrl), n = {
              scaling: "fit",
              accelerated: !0,
              autoPlay: h.autoPlay,
              autoBuffering: !0,
              duration: j.duration,
              live: j.live,
              url: k ? null : l,
              ipadUrl: k ? l : null,
              provider: "audio",
              onPause: function () {
                return j.live ? this.close() : this.pause()
              },
              onResume: function () {
                return j.live ? this.play() : this.resume()
              },
              onStart: function () {
                return this.seek(.1)
              },
              onBeforeFinish: function () {
                a.playNextInPlaylist(j.uniqueId)
              }
            };
            m && $(".audioCoverImage").css("background-image", "url('" + m + "')"), c.initFlowPlayer("flowplayer_aud", {
              audio: {url: g},
              controls: c.buildControls(!1, !1)
            }, n, null)
          }
        })
      }
    }
  }]).directive("videoPlayer", ["FlowPlayerService", "FlowPlayerFlashService", "UrlService", "BrowseService", "Utils", "flowPlayer_menuPlugin", "flowPlayer_bitrateSelectPlugin", "flowPlayer_serviioProviderPlugin", "flowPlayer_captionsPlugin", "flowPlayer_contentPlugin", function (a, c, d, e, f, g, h, i, j, k) {
    return {
      template: function () {
        return '<a id="flowplayer_vid" style="display:block; width:100%; height:100%"></a>'
      }, restrict: "E", replace: !0, link: function (l, m, n) {
        n.$observe("item", function (m) {
          if (null != m && "" !== m) {
            var n = b.fromJson(m), o = !f.useFlashPlayer(), p = {
              menu: {
                url: g,
                items: [{label: "Select quality:", enabled: !1}]
              }, brselect: {
                url: h, menu: !0, onStreamSwitchBegin: function () {
                }
              }, controls: c.buildControls(!0, "fulscreen"), serviio: {url: i}
            };
            n.subtitlesUrl && (p.captions = {url: j, captionTarget: "content"}, p.content = {
              url: k,
              bottom: 5,
              height: 60,
              backgroundColor: "transparent",
              backgroundGradient: "none",
              border: 0,
              textDecoration: "outline",
              style: {body: {fontSize: 14, fontFamily: "Arial", textAlign: "center", color: "#ffffff"}}
            });
            var q = [], r = e.getDefaultQualityContent(n).quality;
            if (!o)for (var s = 0; s < n.contentUrls.length; s++)q.push({
              url: encodeURIComponent(d.secureUrl(n.contentUrls[s].url)),
              bitrate: 100 * (s + 1),
              isDefault: n.contentUrls[s].quality === r,
              label: n.contentUrls[s].quality
            });
            var t = {
              scaling: "fit",
              accelerated: !0,
              autoPlay: l.autoPlay,
              autoBuffering: !1,
              duration: n.duration,
              live: n.live,
              captionUrl: encodeURIComponent(d.secureUrl(n.subtitlesUrl)),
              captionFormat: "subrip",
              urlResolvers: o ? null : "brselect",
              bitrates: q,
              ipadUrl: o ? d.secureUrl(e.getDefaultQualityContent(n).url) : null,
              provider: "serviio",
              onPause: function () {
                return n.live ? this.close() : this.pause()
              },
              onResume: function () {
                return n.live ? this.play() : this.resume()
              },
              onStart: function () {
              },
              onLastSecond: function () {
                a.playNextInPlaylist(n.uniqueId)
              }
            }, u = [];
            if (n.thumbnailUrl) {
              var v = d.secureUrl(n.thumbnailUrl) + "&ext=.jpg", w = {url: v, scaling: "fit"};
              u.push(w)
            }
            u.push(t), c.initFlowPlayer("flowplayer_vid", p, null, u)
          }
        })
      }
    }
  }]), b.module("directives.flowplayerV5", ["url.services", "ad.services", "flowplayer.services", "login.services", "utils.services"]).directive("videoPlayerV5", ["UrlService", "FlowPlayerService", "AdService", "LoginService", "Utils", function (a, c, d, e, f) {
    function g(a) {
      var b = a.live, c = f.supportsHLS();
      return b && !c
    }

    function h(b) {
      var c = g(b), d = _.sortBy(b.contentUrls, function (a) {
        switch (a.quality) {
          case"ORIGINAL":
            return c ? 2 : 1;
          case"MEDIUM":
            return c ? 1 : 2;
          case"LOW":
            return 3
        }
      });
      return _.map(d, function (b) {
        return "video/mp4" === b.mimeType ? {mp4: a.secureUrl(b.url)} : b.mimeType.indexOf("mpegurl") > -1 ? {mpegurl: a.secureUrl(b.url)} : "video/flash" === b.mimeType || "video/x-flv" === b.mimeType ? {flash: a.secureUrl(b.url)} : null
      })
    }

    function i(a) {
      var b = d.adUrl(a.id + "_" + d.clientId());
      return [{mp4: b}]
    }

    function j(a, b, c, d, f) {
      var g = f ? "flash" : "html5", h = e.playerKey();
      a.flowplayer({
        playlist: d,
        flashfit: !0,
        fullscreen: !0,
        live: c,
        native_fullscreen: !0,
        splash: !0,
        preload: "none",
        key: h,
        swf: "assets/flowplayer.swf",
        engine: g
      })
    }

    function k(a, b, c) {
      a.bind("ready", function () {
        b.removeClass("autoplay")
      }).bind("resume", function (a, b) {
        c.live ? b.play(0) : b.resume()
      }).bind("pause", function (a, b) {
        c.live ? b.stop() : b.pause()
      })
    }

    function l(a) {
      var b = Math.floor(1e8 * Math.random() + 1), c = $("<div/>").attr({
        id: "" + b,
        "class": "flowplayer",
        style: "display:block; width:100%; height:100%; background-color: #000",
        "data-embed": "false"
      });
      return a.replaceWith(c), $("#" + b)
    }

    return {
      template: function () {
        return '<div class="flowplayer" data-embed="false" style="display:block; width:100%; height:100%; background-color: #000"></div>'
      }, restrict: "E", replace: !1, link: function (e, m, n) {
        var o = $(".flowplayer");
        n.$observe("item", function (m) {
          if (null !== m && "" !== m) {
            var n = b.fromJson(m), p = null;
            o = l(o), e.autoPlay || o.css("background-image", "url(" + a.secureUrl(n.thumbnailUrl) + ")"), d.showAdverts() ? !n.live || n.live && f.supportsHLS() ? (j(o, n, !1, [i(n), h(n)], !1), p = flowplayer(o), k(p, o, n, e), p.one("load", function (a, b) {
              e.adRolling = !0, b.disable(!0)
            }).bind("finish", function () {
              e.adRolling ? (e.adRolling = !1, p.disable(!1), n.live && o.addClass("is-live")) : c.playNextInPlaylist(n.uniqueId)
            })) : (j(o, n, !1, [i(n)], !1), p = flowplayer(o), k(p, o, n, e), p.one("load", function (a, b) {
              e.adRolling = !0, b.disable(!0)
            }).bind("finish", function (a, b) {
              b.unload(), b.disable(!1), e.adRolling = !1, o.addClass("autoplay"), o = l(o), j(o, n, n.live, [h(n)], g(n));
              var d = flowplayer(o);
              k(d, o, n, e), d.bind("finish", function () {
                c.playNextInPlaylist(n.uniqueId)
              }), flowplayer(o).load()
            })) : (j(o, n, n.live, [h(n)], g(n)), p = flowplayer(o), k(p, o, n, e, !0)), e.autoPlay ? (o.addClass("autoplay"), flowplayer(o).load(0), flowplayer(o).play(0)) : o.removeClass("autoplay")
          }
        })
      }
    }
  }]), b.module("directives.genericui", []).directive("ie10mobilehack", ["$window", function () {
    return {
      restrict: "A", link: function () {
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
          var a = document.createElement("style");
          a.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")), document.getElementsByTagName("head")[0].appendChild(a)
        }
      }
    }
  }]).directive("focusOn", function () {
    return function (a, b, c) {
      a.$on(c.focusOn, function () {
        b[0].focus()
      })
    }
  }).directive("focus", function () {
    return function (a, b) {
      b[0].focus()
    }
  }).directive("scrolling", function () {
    function a(a) {
      a.preventDefault()
    }

    return {
      link: function (b, c, d) {
        b.$watch(function () {
          return d.scrolling
        }, function (b) {
          "true" === b ? document.removeEventListener("touchmove", a, !1) : (document.addEventListener("touchmove", a, !1), $(".scrollable").bind("touchmove", function (a) {
            a.currentTarget.scrollHeight > a.currentTarget.clientHeight && a.stopPropagation()
          }))
        })
      }
    }
  }).directive("ellipsis", ["$timeout", function (a) {
    return {
      restrict: "A", transclude: !0, link: function (b, c) {
        a(function () {
          var a = new Ellipsis(c[0]);
          a.calc(), a.set()
        }, 300)
      }, template: function (a, b) {
        return "<p>" + b.ellipsis + "</p>"
      }
    }
  }]).directive("dontPropagateClick", function () {
    return function (a, b) {
      $(b).click(function (a) {
        a.stopPropagation()
      })
    }
  }).directive("autofill", ["$timeout", function (a) {
    return {
      require: "ngModel", link: function (b, c, d, e) {
        var f = c.val();
        a(function () {
          var a = c.val();
          e.$pristine && f !== a && e.$setViewValue(a)
        }, 500)
      }
    }
  }]).directive("arrowScrolling", function () {
    return function (a, b) {
      function c(a) {
        return a.hasClass("scrollable") ? a : a.find(".scrollable")
      }

      function d(a) {
        c(a).scrollTo("+=100px", 100, {axis: "y"})
      }

      function e(a) {
        c(a).scrollTo("-=100px", 100, {axis: "y"})
      }

      b.bind("keyup", function (a) {
        40 == a.which ? d(b) : 38 == a.which && e(b)
      })
    }
  }), b.module("directives.image-viewer", ["browse.services", "url.services"]).directive("slider", ["BrowseService", "UrlService", "$filter", "$timeout", function (a, c, d, e) {
    function f(a, b) {
      {
        var c = 0;
        _.find(a, function (d) {
          return d.uniqueId === b || ++c == a.length && (c = -1)
        })
      }
      return c
    }

    function g(b) {
      return '<div class="rsImg">' + c.secureUrl(a.getDefaultQualityContent(b).url) + "</div>"
    }

    return {
      restrict: "E", link: function (a, c, d) {
        d.$observe("items", function (c) {
          if (null != c && "" !== c) {
            var d = b.fromJson(c), e = $(".royalSlider").data("royalSlider");
            if (e) {
              var h = d.slice(e.currSlideId + 1);
              _.each(h, function (a) {
                e.appendSlide(g(a))
              })
            } else {
              var i = _.reduce(d, function (a, b) {
                return a + g(b)
              }, ""), j = f(d, a.selectedItemUniqueId);
              if (j > -1) {
                var k = {
                  keyboardNavEnabled: !0,
                  autoScaleSlider: !1,
                  autoHeight: !1,
                  controlNavigation: "none",
                  startSlideId: j,
                  loop: !1,
                  imageScalePadding: 0,
                  fullscreen: {enabled: !0, nativeFS: !0, keyboardNav: !1},
                  autoPlay: {enabled: a.autoPlay, pauseOnHover: !1, stopAtAction: !0, delay: 2e3},
                  slides: i
                };
                e = $(".royalSlider").royalSlider(k).data("royalSlider"), e.ev.on("rsAfterSlideChange", function (b) {
                  var c = b.target, d = c.numSlides, e = c.currSlideId;
                  5 > d - e && a.browse.loadMoreItems()
                })
              }
            }
          }
        }), d.$observe("visible", function (a) {
          "false" === a ? $(".royalSlider").royalSlider("stopAutoPlay").royalSlider("destroy") : e(function () {
            $(".royalSlider").royalSlider("updateSliderSize", !0)
          })
        })
      }
    }
  }]), b.module("directives.modalDialogs", []).directive("centeredPlayerWindow", ["$window", function (a) {
    return function (c) {
      var d = b.element(a);
      c.getWindowDimensions = function () {
        return {h: d.height(), w: d.width()}
      }, c.$watch(c.getWindowDimensions, function (a) {
        if (a.w >= 768) {
          var b = 5, d = 4 / 3, e = a.w / a.h > d, f = 0, g = 0, h = a.h * (b / 100), i = a.w * (b / 100);
          e ? (f = a.w - a.w * (b / 100) * 2, g = a.h - a.h * (b / 100) * 2, i = (a.w - f) / 2, h = (a.h - g) / 2) : (f = a.w - a.w * (b / 100) * 2, g = f / d, h = (a.h - g) / 2), c.style = function () {
            return {height: g + "px", width: f + "px", "margin-left": i + "px", "margin-top": h + "px"}
          }
        } else c.style = function () {
          return {left: 0, top: 0, width: "100%", "margin-left": 0}
        }
      }, !0), d.bind("resize", function () {
        c.$apply()
      })
    }
  }]).directive("centeredSearchWindow", ["$window", function (a) {
    return function (c) {
      var d = b.element(a);
      c.getWindowDimensions = function () {
        return {h: d.height(), w: d.width()}
      }, c.$watch(c.getWindowDimensions, function (a) {
        if (a.w >= 768) {
          var b = 60, d = 200, e = a.w * (b / 100), f = (a.w - e) / 2;
          c.style = function () {
            return {width: e + "px", "margin-left": f + "px", "margin-top": d + "px"}
          }
        } else c.style = function () {
          return {left: 0, top: 0, width: "100%", "margin-left": 0}
        }
      }, !0), d.bind("resize", function () {
        c.$apply()
      })
    }
  }]).directive("playerPlaylistScrollable", ["$window", function (a) {
    return function (c, d) {
      var e = b.element(a);
      c.getPlaylistHeight = function () {
        return d.parent().height()
      }, c.$watch(c.getPlaylistHeight, function (a) {
        var b = $(".headingWrapper").height();
        d.height(a - b + "px")
      }, !0), e.bind("resize", function () {
        c.$apply()
      })
    }
  }]), b.module("directives.player", []).directive("scrollToActiveItem", ["$timeout", function (a) {
    function b(a) {
      var b = $(".playlistBody").height(), c = a.position().top, d = a.height();
      return d > c + d || c + d > b ? !1 : !0
    }

    return {
      restrict: "A", link: function (c, d, e) {
        e.$observe("scrollToActiveItem", function (c) {
          "true" === c && a(function () {
            b(d) || d.get(0).scrollIntoView()
          }, 500)
        })
      }
    }
  }]).directive("videoTitleInPlayer", ["$filter", function () {
    return {
      restrict: "E", replace: !0, link: function (a, b) {
        a.$watch("selectedItem", function () {
          var c = "";
          a.selectedItem.rating && "Unknown" != a.selectedItem.rating && (c = a.selectedItem.rating);
          var d = '<div class="title ' + c + '">' + a.selectedItem.title + "</div>";
          c && (d = d + '<div class="rating ' + c + '"></div>'), b.html(d)
        }, !0)
      }
    }
  }]).directive("audioMetadata", function () {
    return {
      restrict: "E", replace: !0, link: function (a, b, c) {
        a.$watch("selectedItem", function () {
          var d = "", e = c.type, f = null;
          "artist" === e ? f = a.selectedItem.artist : "album" === e ? f = a.selectedItem.album : "genre" === e && (f = a.selectedItem.genre), f && "Unknown" !== f && (d = d + '<div class="row"><div class="metadata"><div class="thumbnail ' + e + '"></div>', d = d + '<div class="value">' + f + "</div>", d += "</div></div>"), b.html(d)
        }, !0)
      }
    }
  }).directive("videoRating", function () {
    return {
      restrict: "E", replace: !0, link: function (a, b) {
        a.$watch("selectedItem", function () {
          var c = "";
          a.selectedItem.rating && "Unknown" != a.selectedItem.rating && (c = c + '<div class="rating ' + a.selectedItem.rating + '"></div>'), b.html(c)
        }, !0)
      }
    }
  }).directive("videoCast", function () {
    return {
      restrict: "E", replace: !0, link: function (a, b, c) {
        a.$watch("selectedItem", function () {
          var d = "", e = c.role, f = null;
          f = "actors" === e ? a.selectedItem.actors : "directors" === e ? a.selectedItem.directors : "producers" === e ? a.selectedItem.producers : [], f && f.length > 0 && "Unknown" !== f[0] && (d = d + '<div class="row"><div class="metadata"><div class="thumbnail ' + e + '"></div>', d = d + '<div class="value">' + f.join(", ") + "</div>", d += "</div></div>"), b.html(d)
        }, !0)
      }
    }
  }).directive("onlineDbLinks", function () {
    function a(a, b) {
      if (b.onlineIdentifiers) {
        var c = _.find(b.onlineIdentifiers, function (b) {
          return b.type === a
        });
        if (c)return c.id
      }
      return null
    }

    return {
      restrict: "E", replace: !0, link: function (b, c) {
        b.$watch("selectedItem", function () {
          var d = "", e = a("IMDB", b.selectedItem), f = a("TMDB", b.selectedItem);
          d += '<div class="onlineDbLinks">', e && (d = d + '<div class="imdb" onClick="window.open(\'http://www.imdb.com/title/' + e + "','_blank');\"></div>"), f && (d = d + '<div class="tmdb" onClick="window.open(\'http://www.themoviedb.org/movie/' + f + "','_blank');\"></div>"), d += "</div>", c.html(d)
        }, !0)
      }
    }
  }), b.module("filters.converters", []).factory("TimeFormatService", function () {
    return {
      timeFormat: function (a, b, c) {
        if (!a)return "";
        var d = Math.floor(a / 3600), e = Math.floor((a - 3600 * d) / 60), f = Math.floor(a - 3600 * d - 60 * e);
        if (10 > d && (d = "0" + d), 10 > e && (e = "0" + e), 10 > f && (f = "0" + f), d || (d = "00"), null != b) {
          var g = b;
          return c && 1 * d === 0 ? (g = g.replace("hh:", ""), g = g.replace("h:", "")) : (g = b.replace("hh", d), g = g.replace("h", 1 * d + "")), g = g.replace("mm", e), g = g.replace("m", 1 * e + ""), g = g.replace("ss", f), g = g.replace("s", 1 * f + "")
        }
        return d + ":" + e + ":" + f
      }
    }
  }).filter("timeStringShort", ["TimeFormatService", function (a) {
    return function (b) {
      return a.timeFormat(b, "hh:mm:ss", !0)
    }
  }]).filter("timeString", ["TimeFormatService", function (a) {
    return function (b) {
      return a.timeFormat(b, "hh:mm:ss", !1)
    }
  }]), b.module("ad.services", ["url.services", "config.services"]).factory("AdService", ["UrlService", "ConfigService", function (a, b) {
    var c = Math.floor(1e8 * Math.random() + 1);
    return {
      adUrl: function (b) {
        return a.hostString() + "/ad/" + b
      }, showAdverts: function () {
        return b.showAdverts
      }, clientId: function () {
        return c
      }
    }
  }]), b.module("alert.services", []).factory("AlertService", ["$rootScope", function (a) {
    function b(a, b) {
      var c = "";
      switch (b) {
        case 552:
          c = "Incorrrect password. Try again.";
          break;
        case 553:
          c = "Invalid authentication. Please log in again.";
          break;
        case 554:
          c = "MediaBrowser is only available in the Pro edition.";
          break;
        case 556:
          c = "Please, setup MediaBrowser password in the console first.";
          break;
        case 557:
          c = "The server has been stopped.";
          break;
        default:
          switch (a) {
            case 404:
              c = "The requested resource does not exist.";
              break;
            default:
              c = "Unknown server error (" + a + ", " + b + ")"
          }
      }
      return c
    }

    var c = !1;
    return {
      clear: function () {
        a.flash = "", c = !1
      }, messageText: function (a, c) {
        return b(a, c)
      }, errorCodeMessage: function (d, e) {
        var f = b(d, e);
        a.flash = f, c = !0
      }, message: function (b) {
        a.flash = b, c = !0
      }
    }
  }]), b.module("LocalStorageModule", []).value("prefix", "serviioMB").constant("cookie", {
    expiry: 30,
    path: "/"
  }).constant("notify", {
    setItem: !0,
    removeItem: !1
  }).service("localStorageService", ["$rootScope", "prefix", "cookie", "notify", function (c, d, e, f) {
    "." !== d.substr(-1) && (d = d ? d + "." : "");
    var g = function () {
      try {
        return "localStorage"in a && null !== a.localStorage
      } catch (b) {
        return c.$broadcast("LocalStorageModule.notification.error", b.message), !1
      }
    }, h = function (a, e) {
      if (!g())return c.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), f.setItem && c.$broadcast("LocalStorageModule.notification.setitem", {
        key: a,
        newvalue: e,
        storageType: "cookie"
      }), n(a, e);
      "undefined" == typeof e && (e = null);
      try {
        (b.isObject(e) || b.isArray(e)) && (e = b.toJson(e)), localStorage.setItem(d + a, e), f.setItem && c.$broadcast("LocalStorageModule.notification.setitem", {
          key: a,
          newvalue: e,
          storageType: "localStorage"
        })
      } catch (h) {
        return c.$broadcast("LocalStorageModule.notification.error", h.message), n(a, e)
      }
      return !0
    }, i = function (a) {
      if (!g())return c.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), o(a);
      var e = localStorage.getItem(d + a);
      return e && "null" !== e ? "{" === e.charAt(0) || "[" === e.charAt(0) ? b.fromJson(e) : e : null
    }, j = function (a) {
      if (!g())return c.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), f.removeItem && c.$broadcast("LocalStorageModule.notification.removeitem", {
        key: a,
        storageType: "cookie"
      }), p(a);
      try {
        localStorage.removeItem(d + a), f.removeItem && c.$broadcast("LocalStorageModule.notification.removeitem", {
          key: a,
          storageType: "localStorage"
        })
      } catch (b) {
        return c.$broadcast("LocalStorageModule.notification.error", b.message), p(a)
      }
      return !0
    }, k = function () {
      if (!g())return c.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), !1;
      var a = d.length, b = [];
      for (var e in localStorage)if (e.substr(0, a) === d)try {
        b.push(e.substr(a))
      } catch (f) {
        return c.$broadcast("LocalStorageModule.notification.error", f.Description), []
      }
      return b
    }, l = function () {
      if (!g())return c.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), q();
      var a = d.length;
      for (var b in localStorage)if (b.substr(0, a) === d)try {
        j(b.substr(a))
      } catch (e) {
        return c.$broadcast("LocalStorageModule.notification.error", e.message), q()
      }
      return !0
    }, m = function () {
      try {
        return navigator.cookieEnabled || "cookie"in document && (document.cookie.length > 0 || (document.cookie = "test").indexOf.call(document.cookie, "test") > -1)
      } catch (a) {
        return c.$broadcast("LocalStorageModule.notification.error", a.message), !1
      }
    }, n = function (a, b) {
      if ("undefined" == typeof b)return !1;
      if (!m())return c.$broadcast("LocalStorageModule.notification.error", "COOKIES_NOT_SUPPORTED"), !1;
      try {
        var f = "", g = new Date;
        null === b ? (g.setTime(g.getTime() + -864e5), f = "; expires=" + g.toGMTString(), b = "") : 0 !== e.expiry && (g.setTime(g.getTime() + 24 * e.expiry * 60 * 60 * 1e3), f = "; expires=" + g.toGMTString()), a && (document.cookie = d + a + "=" + encodeURIComponent(b) + f + "; path=" + e.path)
      } catch (h) {
        return c.$broadcast("LocalStorageModule.notification.error", h.message), !1
      }
      return !0
    }, o = function (a) {
      if (!m())return c.$broadcast("LocalStorageModule.notification.error", "COOKIES_NOT_SUPPORTED"), !1;
      for (var b = document.cookie.split(";"), e = 0; e < b.length; e++) {
        for (var f = b[e]; " " == f.charAt(0);)f = f.substring(1, f.length);
        if (0 === f.indexOf(d + a + "="))return decodeURIComponent(f.substring(d.length + a.length + 1, f.length))
      }
      return null
    }, p = function (a) {
      n(a, null)
    }, q = function () {
      for (var a = null, b = d.length, c = document.cookie.split(";"), e = 0; e < c.length; e++) {
        for (a = c[e]; " " == a.charAt(0);)a = a.substring(1, a.length);
        key = a.substring(b, a.indexOf("=")), p(key)
      }
    };
    return {
      isSupported: g,
      set: h,
      add: h,
      get: i,
      keys: k,
      remove: j,
      clearAll: l,
      cookie: {set: n, add: n, get: o, remove: p, clearAll: q}
    }
  }]), b.module("app.services", ["url.services"]).factory("ApplicationService", ["UrlService", "$http", "$rootScope", function (a, b, c) {
    return {
      loadApplicationData: function () {
        var b = a.unsecureUrl("/cds/application");
        $.ajax({
          method: "GET", url: b, dataType: "json", async: !1, success: function (a) {
            c.cdsAnonymousEnabled = a.cdsAnonymousEnabled
          }, error: function () {
          }
        })
      }
    }
  }]), b.module("auth.services", ["preferences.services"]).factory("AuthenticationService", ["$rootScope", "PreferencesService", function (a, c) {
    var d = c.getStoredToken();
    return {
      token: function () {
        return d
      }, isLoggedIn: function () {
        return b.isDefined(a.loggedIn) && a.loggedIn
      }, login: function (b, e) {
        a.loggedIn = !0, d = b, e && c.storeToken(b)
      }, logout: function () {
        c.storeToken(""), d = null, a.loggedIn = !1
      }
    }
  }]), b.module("browse.services", ["url.services", "utils.services", "auth.services", "config.services", "ngRoute"]).constant("ROOT_CONTAINER_ID", "0").constant("CATEGORY_ID_IMAGE", "I").constant("CATEGORY_ID_AUDIO", "A").constant("CATEGORY_ID_VIDEO", "V").constant("CATEGORY_IDS", ["A", "V", "I"]).factory("BrowseService", ["$http", "$rootScope", "UrlService", "Utils", "AuthenticationService", "ConfigService", "CATEGORY_ID_IMAGE", "CATEGORY_ID_VIDEO", "CATEGORY_ID_AUDIO", function (a, b, c, d, e, f, g, h, i) {
    return getQualityContent = function (a, b) {
      return _.find(a.contentUrls, function (a) {
        return a.quality == b
      })
    }, getIgnorePresentationSettings = function () {
      return !0
    }, {
      browse: function (b, e) {
        var f = c.secureUrl("/cds/browse/" + d.profile() + "/" + b + "/BrowseDirectChildren/all/" + e + "/18?ignoreContentOnlyPresentationSettings=" + getIgnorePresentationSettings());
        return a({method: "GET", url: f})
      }, retrieveAllItems: function (b) {
        var e = c.secureUrl("/cds/browse/" + d.profile() + "/" + b + "/BrowseDirectChildren/items/0/0?ignoreContentOnlyPresentationSettings=" + getIgnorePresentationSettings());
        return a({method: "GET", url: e})
      }, retrieveSingleItem: function (b) {
        var e = c.secureUrl("/cds/browse/" + d.profile() + "/" + b + "/BrowseMetadata/all/0/1?ignoreContentOnlyPresentationSettings=" + getIgnorePresentationSettings());
        return a({method: "GET", url: e})
      }, generateBrowseUrl: function (a, b, c, d) {
        return a ? "/browse/" + b + "?title=" + encodeURIComponent(c) + d : ""
      }, getContainerFileType: function (a) {
        return d.startsWith(a, g) ? g : d.startsWith(a, i) ? i : d.startsWith(a, h) ? h : ""
      }, getOriginalQualityContent: function (a) {
        return getQualityContent(a, "ORIGINAL")
      }, getDefaultQualityContent: function (a) {
        return _.find(a.contentUrls, function (a) {
          return a.preferred === !0
        })
      }, absoluteUrl: function (a) {
        if (!a)return "";
        if (b.cdsAnonymousEnabled)return a;
        var c = -1 === a.indexOf("?") ? "?authToken=" + e.token() : "&authToken=" + e.token();
        return a + c
      }
    }
  }]).filter("missingThumbnail", function () {
    return function (a, b, c) {
      return a ? a : c ? "assets/img/thumbnail-shape.png" : "AUDIO" === b ? "assets/img/categories/audio-hd.png" : "VIDEO" === b ? "assets/img/categories/videos-hd.png" : "IMAGE" === b ? "assets/img/categories/images-hd.png" : a
    }
  }).filter("absoluteUrl", ["BrowseService", function (a) {
    return function (b) {
      return a.absoluteUrl(b)
    }
  }]).factory("BrowseSharedData", ["Browse", function (a) {
    var b = null;
    return {
      getCurrentBrowseData: function () {
        return b
      }, newData: function () {
        return b = new a
      }
    }
  }]).factory("Browse", ["BrowseService", "ThumbnailLoader", "$routeParams", "ROOT_CONTAINER_ID", function (a, b, c, d) {
    var e = function () {
      this.items = [], this.busy = !1, this.offset = 0
    };
    return e.prototype.loadMoreItems = function () {
      if (!this.busy) {
        this.busy = !0;
        var e = c.containerId ? c.containerId : d;
        a.browse(e, this.offset).success(function (a) {
          for (var c = 0; c < a.objects.length; c++) {
            var d = a.objects[c];
            d.uniqueId = d.id + "_" + c, this.items.push(d), d.thumbnailLoaded = !1, b.preloadImage(d)
          }
          this.offset = this.offset + a.objects.length, this.busy = 0 === a.objects.length ? !0 : !1
        }.bind(this)).error(function () {
        })
      }
    }, e.prototype.findItemById = function (a) {
      return _.find(this.items, function (b) {
        return b.id === a
      })
    }, e
  }]).factory("ThumbnailLoader", ["$q", "$rootScope", "BrowseService", function (a, b, c) {
    function d(b) {
      this.item = b, this.imageLocation = c.absoluteUrl(b.thumbnailUrl), this.states = {
        PENDING: 1,
        LOADING: 2,
        RESOLVED: 3,
        REJECTED: 4
      }, this.state = this.states.PENDING, this.deferred = a.defer(), this.promise = this.deferred.promise
    }

    return d.preloadImage = function (a) {
      var b = new d(a);
      return b.load()
    }, d.prototype = {
      constructor: d, isInitiated: function () {
        return this.state !== this.states.PENDING
      }, isRejected: function () {
        return this.state === this.states.REJECTED
      }, isResolved: function () {
        return this.state === this.states.RESOLVED
      }, load: function () {
        return this.isInitiated() ? this.promise : (this.state = this.states.LOADING, this.loadImageLocation(this.imageLocation, this.item), this.promise)
      }, handleImageError: function (a) {
        this.isRejected() || (this.state = this.states.REJECTED, this.deferred.reject(a))
      }, handleImageLoad: function (a, b) {
        this.isRejected() || (b.thumbnailLoaded = !0, this.state = this.states.RESOLVED, this.deferred.resolve(this.imageLocation))
      }, loadImageLocation: function (a, c) {
        var d = this, e = $(new Image).load(function (a) {
          b.$apply(function () {
            d.handleImageLoad(a.target.src, c), d = e = a = null
          })
        }).error(function (a) {
          b.$apply(function () {
            d.handleImageError(a.target.src, c), d = e = a = null
          })
        }).prop("src", a)
      }
    }, d
  }]), b.module("config.services", []).factory("ConfigService", function () {
    return {useHtml5Player: !1, showAdverts: !1}
  }), b.module("flowplayer.services", ["config.services", "utils.services"]).factory("FlowPlayerService", ["Utils", "ConfigService", "$rootScope", function (a, b, c) {
    return {
      closePlayer: function () {
        if (b.useHtml5Player) {
          var d = flowplayer(".flowplayer");
          d && (a.isIOS() && d.stop(), d.unload()), c.$broadcast("closePlayer")
        } else {
          var e = flowplayer();
          null != e && (e.stop(), e.close(), e.unload())
        }
      }, playNextInPlaylist: function (a) {
        c.$broadcast("playNextInPlaylist", a)
      }
    }
  }]), b.module("login.services", ["url.services", "config.services"]).factory("LoginService", ["UrlService", "ConfigService", "$http", "$filter", function (a, b, c, d) {
    function e() {
      return d("date")(new Date, "EEE, dd MMM yyyy  HH:mm:ss Z")
    }

    function f(a, b) {
      var c = Crypto.HMAC(Crypto.SHA1, a, b, {asBytes: !0}), d = Crypto.util.bytesToBase64(c);
      return d
    }

    function g() {
      var c = a.secureUrl(b.useHtml5Player ? "/cds/fp5" : "/cds/fp");
      $.ajax({
        method: "GET", url: c, responseType: "json", async: !1, success: function (a) {
          h = a
        }, error: function () {
        }
      })
    }

    var h = "";
    return {
      logIn: function (b, c, d) {
        var g = e(), h = {
          "X-Serviio-Date": g,
          Authorization: "Serviio " + f(g, b),
          "Content-Type": "application/json",
          Accept: "application/json"
        }, i = a.hostString() + "/cds/login";
        return {method: "POST", url: i, headers: h, responseType: "json", success: c, error: d}
      }, playerKey: function () {
        return h || g(), h
      }
    }
  }]), b.module("navigation.services", ["browse.services", "preferences.services", "utils.services"]).factory("NavigationService", ["CATEGORY_IDS", "CATEGORY_ID_IMAGE", "CATEGORY_ID_AUDIO", "CATEGORY_ID_VIDEO", "PreferencesService", "Utils", "$rootScope", function (a, b, c, d, e, f, g) {
    function h(a, b, c) {
      return {id: a, action: b, text: c}
    }

    var i = h("search", "openSearchBox()", "Search"), j = h("queue", "goToQueue()", "Queue"), k = h("enqueueAll", "addAllToQueue()", "Enqueue All"), l = h("listView", "switchToListView()", "List View"), m = h("gridView", "switchToGridView()", "Grid View"), n = h("slideshow", "playAll()", "Play All"), o = h("slideshow", "playAllQueue()", "Play All"), p = h("removeAll", "cleanQueue()", "Remove All"), q = h("logout", "logout()", "Logout");
    return {
      getNavigationItems: function (b, c) {
        var d = [];
        return g.cdsAnonymousEnabled || d.push(q), "browse" === b ? _.contains(a, c) ? (d.push(i), d.push(j)) : _.some(a, function (a) {
          return f.startsWith(c, a)
        }) && (d.push(i), d.push(n), d.push(k), d.push(j), d.push(e.isGridView() ? l : m)) : "search" === b ? (d.push(i), d.push(j)) : "queue" === b && (d.push(p), d.push(o), d.push(e.isGridView() ? l : m)), d
      }
    }
  }]), b.module("preferences.services", ["LocalStorageModule"]).factory("PreferencesService", ["localStorageService", function (a) {
    return readFromStorage = function (c, d) {
      return b.isUndefined(this[c]) && (this[c] = _.contains(a.keys(), c) ? a.get(c) : d), this[c]
    }, putInStorage = function (b, c) {
      this[b] = c, a.add(b, c)
    }, {
      isGridView: function () {
        return "true" === readFromStorage("gridView", "true")
      }, setGridView: function (a) {
        putInStorage("gridView", a.toString())
      }, getStoredToken: function () {
        return readFromStorage("token", "")
      }, storeToken: function (a) {
        putInStorage("token", a)
      }
    }
  }]), b.module("queue.services", ["browse.services", "LocalStorageModule"]).factory("QueueService", ["$rootScope", "localStorageService", "BrowseService", "ThumbnailLoader", "CATEGORY_ID_IMAGE", "CATEGORY_ID_VIDEO", "CATEGORY_ID_AUDIO", function (a, b, c, d, e, f, g) {
    function h(c, d, e) {
      _.find(c, function (a) {
        return a.id === d.id
      }) || (d.uniqueId = d.id + "_" + (c.length + 1), c.push(d), a.$broadcast("addedToQueue", 1), b.add("queue_" + e, c))
    }

    function i(c, d, e) {
      var f = [];
      _.each(d, function (a) {
        _.find(c, function (b) {
          return b.id === a.id
        }) || (a.uniqueId = a.id + "_" + (c.length + f.length + 1), f.push(a))
      }), c.push.apply(c, f), a.$broadcast("addedToQueue", f.length), b.add("queue_" + e, c)
    }

    function j(c, d, e) {
      for (var f = c.length - 1; f >= 0; f--)c[f].id === d && c.splice(f, 1);
      a.$broadcast("removedFromQueue"), b.add("queue_" + e, c)
    }

    function k(c, d) {
      c.length = 0, a.$broadcast("queueCleaned"), b.remove("queue_" + d)
    }

    function l(a) {
      var c = b.get("queue_" + a);
      return c ? c : []
    }

    function m(a) {
      switch (a) {
        case e:
          return p;
        case f:
          return o;
        case g:
          return n
      }
    }

    var n = l(g), o = l(f), p = l(e);
    return {
      addItemToQueue: function (a) {
        switch (a.fileType) {
          case"AUDIO":
            h(n, a, g);
            break;
          case"IMAGE":
            h(p, a, e);
            break;
          case"VIDEO":
            h(o, a, f)
        }
      }, getQueueSize: function (a) {
        return m(a).length
      }, getQueueItems: function (a) {
        var b = m(a);
        return _.each(b, function (a) {
          a.thumbnailLoaded = !1, d.preloadImage(a)
        }), b
      }, removeItem: function (a, b) {
        switch (a) {
          case e:
            j(p, b, a);
            break;
          case f:
            j(o, b, a);
            break;
          case g:
            j(n, b, a)
        }
      }, removeAllItems: function (a) {
        switch (a) {
          case e:
            k(p, a);
            break;
          case f:
            k(o, a);
            break;
          case g:
            k(n, a)
        }
      }, addAllToQueue: function (a) {
        c.retrieveAllItems(a).success(function (b) {
          var d = c.getContainerFileType(a);
          i(m(d), b.objects, d)
        }).error(function () {
        })
      }
    }
  }]), b.module("search.services", ["utils.services", "url.services"]).factory("SearchService", ["UrlService", "Utils", "$http", function (a, c, d) {
    return {
      search: function (e, f) {
        var g = a.secureUrl("/cds/search/" + c.profile() + "/" + b.lowercase(f) + "/" + e + "/0/12");
        return d({method: "GET", url: g})
      }
    }
  }]).filter("categoryName", function () {
    return function (a) {
      switch (a) {
        case"MOVIES":
          return "Movies";
        case"EPISODES":
          return "Episodes";
        case"SERIES":
          return "Series";
        case"ALBUMS":
          return "Albums";
        case"MUSIC_TRACKS":
          return "Music tracks";
        case"ALBUM_ARTISTS":
          return "Album artists";
        case"FOLDERS":
          return "Folders";
        case"FILES":
          return "Files";
        case"ONLINE_ITEMS":
          return "Online items";
        case"ONLINE_CONTAINERS":
          return "Online resources";
        default:
          return "Other"
      }
    }
  }), b.module("url.services", ["auth.services", "ngRoute", "app.services"]).factory("UrlService", ["$location", "$routeParams", "AuthenticationService", "$rootScope", function (a, c, d, e) {
    function f() {
      a.search("title", null), a.search("bid", null), a.search("b", null), a.search("q", null)
    }

    var g = a.protocol() + "://" + a.host();
    return a.port() && (g = g + ":" + a.port()), {
      hostString: function () {
        return g
      }, unsecureUrl: function (a) {
        return g + a
      }, secureUrl: function (a) {
        if (e.cdsAnonymousEnabled)return g + a;
        if (a) {
          var b = "" + a, c = "?";
          return b.indexOf("?") > -1 && (c = "&"), g + b + c + "authToken=" + d.token()
        }
        return null
      }, buildQueryParams: function (a) {
        var d = _.map(a, function (a) {
          var d = c[a];
          if (b.isArray(d)) {
            var e = _.map(d, function (b) {
              return a + "=" + b
            });
            return e.join("&")
          }
          return a + "=" + d
        });
        return d.join("&")
      }, redirectToBrowseRoot: function () {
        f(), a.path("/browse")
      }, redirectToLogin: function () {
        f(), a.path("/login")
      }
    }
  }]), b.module("utils.services", ["config.services"]).factory("Utils", ["ConfigService", function (a) {
    return isIOS = function () {
      return /iPad|iPhone|iPod/i.test(navigator.userAgent)
    }, isWP = function () {
      return /IEMobile/i.test(navigator.userAgent)
    }, isXboxOne = function () {
      return /Xbox One/i.test(navigator.userAgent)
    }, isPS4 = function () {
      return /PlayStation 4/i.test(navigator.userAgent)
    }, isWiiU = function () {
      return /Nintendo WiiU/i.test(navigator.userAgent)
    }, isAndroid = function () {
      return !isWP() && /Android/i.test(navigator.userAgent)
    }, {
      startsWith: function (a, b) {
        return a.substring(0, b.length) === b
      }, isIOS: function () {
        return isIOS()
      }, useFlashPlayer: function () {
        return !(isIOS() || isWP() || isXboxOne() || isPS4() || isWiiU() || isAndroid())
      }, supportsHLS: function () {
        return isIOS() || isAndroid() || isPS4() || isWiiU()
      }, profile: function () {
        return a.useHtml5Player ? "html5" : isIOS() || isPS4() || isWiiU() || isAndroid() ? "ios" : isWP() || isXboxOne() ? "wp8" : "flv_player"
      }
    }
  }]), b.module("templates-app", ["alert/alert.tpl.html", "browse/browse-categories.tpl.html", "browse/browse-home.tpl.html", "browse/browse.tpl.html", "image-viewer/image-viewer.tpl.html", "login/login.tpl.html", "navigation/navigation.tpl.html", "player/player.tpl.html", "queue/queue.tpl.html", "search/search-dialog.tpl.html", "search/search.tpl.html"]), b.module("alert/alert.tpl.html", []).run(["$templateCache", function (a) {
    a.put("alert/alert.tpl.html", '<div class="container">\n	 <div class="row">\n		  <div class="col-xs-12 col-sm-8 col-sm-offset-2">\n		   		<div id="flash" class="alert alert-danger" ng-show="flash">{{flash}}</div>\n		  </div>\n	</div>\n</div>')
  }]), b.module("browse/browse-categories.tpl.html", []).run(["$templateCache", function (a) {
    a.put("browse/browse-categories.tpl.html", '<div class="container" ng-swipe-right="goBack()">\n	<div breadcrumb></div>\n	<div class="row">\n		<div class="containerName" ng-bind="containerTitle"></div>\n	</div>\n	<div class="row gridView" infinite-scroll="browse.loadMoreItems()" infinite-scroll-distance="2" infinite-scroll-disabled="browse.busy">\n		<div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" ng-repeat="item in browse.items" notify-scroller>\n			<div class="thumbnail">\n				<a href="{{generateBrowseUrl(item.id, item.title, breadcrumbUrlParams);}}">\n					<div class="thumbnailImgContainer categories">\n						<img src="assets/img/thumbnail-shape.png">\n						<div class="thumbnailImg" ng-class="\'container-\'+item.id"></div>\n					</div>\n				</a>		\n				<div class="caption categories">\n					<div class="thumbnailMainTitle">{{item.title}}</div>					\n				</div>\n			</div>\n		</div>\n	</div>\n</div>')
  }]), b.module("browse/browse-home.tpl.html", []).run(["$templateCache", function (a) {
    a.put("browse/browse-home.tpl.html", '<div class="container">\n	<div class="gridView homepage" infinite-scroll="browse.loadMoreItems()" infinite-scroll-distance="2" infinite-scroll-disabled="browse.busy">\n		<div class="col-xs-12 col-sm-{{12 / numberOfLoadedItems()}} col-md-{{12 / numberOfLoadedItems()}} col-lg-{{12 / numberOfLoadedItems()}}" ng-repeat="item in browse.items" >\n			<div class="thumbnail homepage">\n				<a href="{{generateBrowseUrl(item.id, item.title, \'&b=Home&bid=0\');}}">\n					<div class="thumbnailImgContainer homepage">\n						<div class="thumbnailImg homepage" ng-class="\'container-\'+item.id"></div>\n					</div>	\n				</a>	\n				<div class="caption homepage">\n					<div class="thumbnailMainTitle homepage">{{item.title}}</div>					\n				</div>				\n			</div>\n		</div>\n	</div>\n</div>')
  }]), b.module("browse/browse.tpl.html", []).run(["$templateCache", function (a) {
    a.put("browse/browse.tpl.html", '<div class="container" ng-swipe-right="goBack()">\n	<div breadcrumb></div>\n	<div class="row">\n		<div class="containerName" ng-bind="containerTitle"></div>\n	</div>\n\n	<!--thumbnail view -->\n	<div ng-if="thubmnailView" class="row gridView" infinite-scroll="browse.loadMoreItems()" infinite-scroll-distance="2" infinite-scroll-disabled="browse.busy" infinite-scroll-immediate-check="true">\n		<div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" ng-repeat="item in browse.items" ng-init="isContainer = item.type === \'CONTAINER\'" scroll-to-last-viewed-item="{{lastPlayedItemId === item.uniqueId}}" notify-scroller>\n			<div class="thumbnail">\n				<div class="clickable" ng-click="objectAction(isContainer, item.id, item.uniqueId, item.title, breadcrumbUrlParams)">\n					<div class="thumbnailImgContainer">\n						<img src="assets/img/thumbnail-shape.png">\n						<div ng-class="{\'missingThubmnail\': !item.thumbnailUrl, \'thumbnailImg\': true, \'thumbnailImgFadeIn\' : true}" ng-show="!item.thumbnailUrl || item.thumbnailLoaded" ng-style="{\'background\': \'url(\\\'{{item.thumbnailUrl | missingThumbnail:item.fileType:isContainer | absoluteUrl}}\\\') no-repeat center center\'}"></div>\n						<div class="folderOverlay" ng-show="isContainer"></div>\n						<div class="addButton" ng-show="!isContainer" ng-click="addToQueue(item.id)" dont-propagate-click></div>\n					</div>\n				</div>		\n				<div class="caption">\n					<div class="thumbnailMainTitle" ellipsis="{{item.title}}"></div>		\n					<div class="thumbnailSubTitle" ng-show="!isContainer && item.fileType === \'AUDIO\'">{{item.album}}</div>			\n					<div class="thumbnailSubSubTitle" ng-show="!isContainer">{{item.duration | timeStringShort}}</div>\n				</div>\n			</div>\n		</div>\n		<div style=\'clear: both;\'></div>\n	</div>\n\n	<!--list view -->\n	<div ng-if="!thubmnailView" ng-class="{\'row listView\' : true, \'audioListTable\' : isAudio, \'videoListTable\' : isVideo, \'imageListTable\' : isImage}" infinite-scroll="browse.loadMoreItems()" infinite-scroll-distance="2" infinite-scroll-disabled="browse.busy" ng-init="isAudio = containerFileType === \'A\'; isVideo = containerFileType === \'V\'; isImage = containerFileType === \'I\'">\n		<table class="table table-striped">\n			<thead>\n              <tr ng-if="isAudio" class="hidden-xs">\n                <th class="albumArt"></th>\n                <th class="title">Title</th>\n                <th class="duration">Duration</th>\n                <th class="album">Album</th>\n                <th class="artist">Artist</th>\n                <th class="controls"></th>\n              </tr>\n              <tr ng-if="isVideo" class="hidden-xs">\n                <th class="albumArt"></th>\n                <th class="title">Title</th>\n                <th class="duration">Duration</th>\n                <th class="genre">Genre</th>\n                <th class="rating">Rating</th>\n                <th class="year">Year</th>\n                <th class="controls"></th>\n              </tr> \n              <tr ng-if="isImage" class="hidden-xs">\n                <th class="albumArt"></th>\n                <th class="title">Title</th>\n                <th class="date">Date</th>\n                <th class="controls"></th>\n              </tr>   \n            </thead>\n            <tbody>\n              <tr ng-repeat="item in browse.items" ng-init="isContainer = item.type === \'CONTAINER\'" scroll-to-last-viewed-item="{{lastPlayedItemId === item.uniqueId}}" notify-scroller>\n                <td class="albumArt">\n                	<div class="thumbnailImgContainer clickable" ng-click="objectAction(isContainer, item.id, item.uniqueId, item.title, breadcrumbUrlParams)">\n                		<img src="assets/img/thumbnail-shape.png">\n                		<div ng-class="{\'missingThubmnail\': !item.thumbnailUrl, \'thumbnailImg\': true, \'thumbnailImgFadeIn\' : true}" ng-show="!item.thumbnailUrl || item.thumbnailLoaded" ng-style="{\'background\': \'url(\\\'{{item.thumbnailUrl | missingThumbnail:item.fileType:isContainer | absoluteUrl}}\\\') no-repeat center center\'}"></div>\n                		<div class="folderOverlay" ng-show="isContainer"></div>\n                	</div>\n                </td>\n\n                <!-- audio -->\n                <td ng-if="isAudio" class="title hidden-xs clickable" ng-click="objectAction(isContainer, item.id, item.uniqueId, item.title, breadcrumbUrlParams)"><div ng-class="{\'twoLines\':true, \'folderTitle\': isContainer}">{{item.title}}</div></td>\n                <td ng-if="isAudio" class="titleArtist visible-xs clickable" ng-click="objectAction(isContainer, item.id, item.uniqueId, item.title, breadcrumbUrlParams)"><div ng-class="{\'folderTitle\': isContainer}"><audio-title-in-list-view/></div></td>\n                <td ng-if="isAudio" class="duration hidden-xs">{{item.duration | timeStringShort}}</td>\n                <td ng-if="isAudio" class="album hidden-xs"><div class="twoLines">{{item.album}}</div></td>\n                <td ng-if="isAudio" class="artist hidden-xs"><div class="twoLines">{{item.artist}}</div></td>\n                \n                <!-- video -->\n\n                <td ng-if="isVideo" class="title hidden-xs clickable" ng-click="objectAction(isContainer, item.id, item.uniqueId, item.title, breadcrumbUrlParams)"><div ng-class="{\'twoLines\':true, \'folderTitle\': isContainer}">{{item.title}}</div></td>\n                <td ng-if="isVideo" class="titleArtist visible-xs clickable" ng-click="objectAction(isContainer, item.id,item.uniqueId, item.title, breadcrumbUrlParams)"><div ng-class="{\'folderTitle\': isContainer}">{{item.title}}<span ng-if="!isContainer"><span class="secondary"> - {{item.duration | timeStringShort}}</span></span></div></td>\n                <td ng-if="isVideo" class="duration hidden-xs">{{item.duration | timeStringShort}}</td>\n				<td ng-if="isVideo" class="genre hidden-xs">{{item.genre}}</td>\n                <td ng-if="isVideo" class="rating hidden-xs">{{item.rating}}</td>\n				<td ng-if="isVideo" class="year hidden-xs">{{item.date | date:\'yyyy\'}}</td>\n\n				<!--image -->\n\n				 <td ng-if="isImage" class="title hidden-xs clickable" ng-click="objectAction(isContainer, item.id, item.uniqueId, item.title, breadcrumbUrlParams)"><div ng-class="{\'twoLines\':true, \'folderTitle\': isContainer}">{{item.title}}</div></td>\n                <td ng-if="isImage" class="titleArtist visible-xs clickable" ng-click="objectAction(isContainer, item.id, item.uniqueId, item.title, breadcrumbUrlParams)"><div ng-class="{\'folderTitle\': isContainer}">{{item.title}}<span ng-if="!isContainer"><span class="secondary"> - {{item.date}}</span></span></div></td>\n				<td ng-if="isImage" class="date hidden-xs">{{item.date}}</td>\n\n                <td class="controls"><div ng-class="isContainer? \'hiddenButton\' : \'addButton clickable\'" ng-click="!isContainer ? addToQueue(item.id) : true"></div></td>\n              </tr>  \n            </tbody>\n        </table>      \n	</div>	\n</div>')
  }]), b.module("image-viewer/image-viewer.tpl.html", []).run(["$templateCache", function (a) {
    a.put("image-viewer/image-viewer.tpl.html", '<div ng-controller="ImageViewerCtrl" ng-class="{\'semantic-content\':true, \'noflash\': true, \'visible\': !viewerHidden}" >\n	<div class="modal-inner" centered-player-window ng-style="style()">\n			<div class="row imageViewerPopupContainer">\n				<div ng-click="closePlayer()" class="closeButton" dont-propagate-click></div>\n				<div class="royalSlider rsDefault rsWebkit3d">\n					<slider items="{{browse.items | filter: {\'type\' : \'ITEM\'} }}" visible="{{!viewerHidden}}"/>	\n				</div>\n			</div>\n	</div>\n</div>\n')
  }]), b.module("login/login.tpl.html", []).run(["$templateCache", function (a) {
    a.put("login/login.tpl.html", '<div class="container">\n	<div class="login">\n		<div class="row">\n			<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">\n				<div class="logoContainer">\n					<img src="assets/img/logo-shape.png">\n					<div class="loginLogo"></div>\n				</div>	\n			</div>\n		</div>	\n		<form novalidate name="form" class="loginForm" ng-submit="login()">\n			<div class="row">\n				<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">\n					<div id="errorMessage" class="alert alert-danger" ng-show="errorMessage">{{errorMessage}}</div>\n	    			<input type="password" class="passwordField" ng-model="password" placeholder="Password" focus required autofill>\n	    		</div>\n	    	</div>	\n	    	<div class="row">\n				<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">\n	    			<button type="submit" class="loginButton clickable" ng-disabled="form.$invalid">Log In</button>\n		    	</div>	\n			</div>	\n			<div class="row">\n				<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">\n					<div class="rememberMe">\n						<input type="checkbox" name="checkboxG1" id="checkboxG1" class="css-checkbox" ng-model="rememberMe"/>\n						<label for="checkboxG1" class="css-label">Remember me</label>\n					</div>\n				</div>	\n			</div>\n		</form>	\n	</div>\n</div>')
  }]), b.module("navigation/navigation.tpl.html", []).run(["$templateCache", function (a) {
    a.put("navigation/navigation.tpl.html", ' <nav class="navbar navbar-default navbar-fixed-top" role="navigation" ng-controller="NavigationCtrl">\n  <!-- Brand and toggle get grouped for better mobile display -->\n  <div class="navbar-header">\n    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse"></button>\n    <a class="navbar-brand" href="#/browse"></a>\n  </div>\n  <!-- Collect the nav links, forms, and other content for toggling -->\n  <div class="collapse navbar-collapse navbar-ex1-collapse">\n    <ul class="nav navbar-nav navbar-right">\n      <li id="{{item.id}}" ng-repeat="item in navigationItems"><span class="badge hidden-xs" ng-if="item.id === \'queue\'">{{queueCount}}</span><a href ng-click="{{item.action}}"><div class="hidden-xs">{{item.text}}</div></a></li>\n    </ul>\n  </div><!-- /.navbar-collapse -->\n</nav>')
  }]), b.module("player/player.tpl.html", []).run(["$templateCache", function (a) {
    a.put("player/player.tpl.html", '<section ng-controller="PlayerCtrl" ng-class="{\'semantic-content\':true, \'flash\':true, \'visible\': !playerHidden}">\n  <div class="modal-inner" centered-player-window ng-style="style()">\n    <div class="row playerPopupContainer">\n      <div ng-click="closePlayer()" class="closeButton"></div>\n      <div ng-class="{\'slider\': true, \'showPlaylist\' : mobilePlaylistVisible}">\n        <div class="col-sm-7 col-xs-12">\n          <div class="player">\n            <audio-player item="{{selectedItem}}" ng-if="!playerV5 && selectedItem.fileType === \'AUDIO\'"></audio-player>\n            <audio-player-html5 item="{{selectedItem}}" ng-if="playerV5 && selectedItem.fileType === \'AUDIO\'"></audio-player-html5>\n            <video-player item="{{selectedItem}}" ng-if="!playerV5 && selectedItem.fileType === \'VIDEO\'"></video-player>\n            <video-player-v5 item="{{selectedItem}}" ng-if="playerV5 && selectedItem.fileType === \'VIDEO\'"></video-player-v5>\n          </div>\n          <div class="info scrollable">\n            <!-- audio -->\n            <div ng-if="selectedItem.fileType === \'AUDIO\'">\n              <div class="heading">{{selectedItem.title}}</div>              \n              <audio-metadata type="artist"></audio-metadata>\n              <audio-metadata type="album"></audio-metadata>\n              <audio-metadata type="genre"></audio-metadata>\n            </div>   \n            <!--video -->\n            <div ng-if="selectedItem.fileType === \'VIDEO\'">\n              <div class="heading"><video-title-in-player></video-title-in-player></div>\n              <div class="subHeading"><div class="releaseInfo">{{selectedItem.date | date : \'yyyy\'}}</div><online-db-links></online-db-links></div>\n              <video-cast role="actors"></video-cast>\n              <video-cast role="directors"></video-cast>\n              <video-cast role="producers"></video-cast>              \n              <div class="description">{{selectedItem.description}}</div>              \n            </div>   \n          </div>\n          <div class="showPlaylistButton visible-xs" ng-click="showPlaylistInMobile()"></div>\n        </div>\n        <div class="col-sm-5 col-xs-12 fullHeightMobileRight">\n          <div class="playlist" tabindex="1" arrow-scrolling>\n            <div class="headingWrapper">\n              <div class="heading"><div class="showPlayerButton visible-xs" ng-click="showPlayerInMobile()"></div>Playlist</div>\n              <div class="containerTitle">{{containerTitle}}</div>\n            </div>\n            <div id="playlistScrollContainer" class="playlistBody scrollable" player-playlist-scrollable>\n              <div class="listView playerPlaylistTable" infinite-scroll="browse.loadMoreItems()" infinite-scroll-distance="2" infinite-scroll-disabled="browse.busy || playlistItemsFullyLoaded" infinite-scroll-container="\'#playlistScrollContainer\'">\n                <table class="table table-striped">\n                  <tbody>\n                    <tr ng-repeat="item in browse.items | filter: {\'type\' : \'ITEM\'}" ng-class="{\'twoLines\': true, \'active\': selectedItem.uniqueId === item.uniqueId}" ng-init="isAudio = item.fileType === \'AUDIO\'" scroll-to-active-item="{{selectedItem.uniqueId === item.uniqueId}}">\n                      <td class="albumArt">\n                        <div class="thumbnailImgContainer clickable" ng-click="play(item.uniqueId)">\n                          <img src="assets/img/thumbnail-shape.png">\n                          <div ng-class="{\'missingThubmnail\': !item.thumbnailUrl, \'thumbnailImg\': true, \'thumbnailImgFadeIn\' : true}" ng-show="!item.thumbnailUrl || item.thumbnailLoaded" ng-style="{\'background\': \'url(\\\'{{item.thumbnailUrl | missingThumbnail:item.fileType:false | absoluteUrl}}\\\') no-repeat center center\'}"></div>\n                        </div>\n                      </td>\n                      <td ng-if="!isAudio" class="title clickable" ng-click="play(item.uniqueId)"><div class="twoLines">{{item.title}}</div></td>\n                      <td ng-if="isAudio" class="title clickable" ng-click="play(item.uniqueId)"><div class="twoLines"><audio-title-in-player-playlist-view /></div></td>\n                      <td class="duration">{{item.duration | timeStringShort}}</td>\n                    </tr>  \n                  </tbody>\n                </table>\n              </div>\n            </div> \n            <div class="playlistGradient"></div>\n          </div>          \n        </div>  \n      </div>  \n    </div>    \n  </div>  \n</section>')
  }]), b.module("queue/queue.tpl.html", []).run(["$templateCache", function (a) {
    a.put("queue/queue.tpl.html", '<div class="container">\n	<div class="row">\n		<div class="navigation">\n			<a class="backButton" ng-href="{{backButtonUrl}}"></a>\n			<span class="queueTitle">Queue</span>\n		</div>\n	</div>		\n\n	<div class="queueContainer">\n		<div ng-if="queueItems.length > 0"> 	\n			<!--thumbnail view -->\n			<div ng-if="thubmnailView" class="row gridView">\n				<div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" ng-repeat="item in queueItems" scroll-to-last-viewed-item="{{lastPlayedItemId === item.uniqueId}}">\n					<div class="thumbnail">\n						<div class="clickable" ng-click="playItem(item.uniqueId)">\n							<div class="thumbnailImgContainer queue">\n								<img src="assets/img/thumbnail-shape.png">\n								<div ng-class="{\'missingThubmnail\': !item.thumbnailUrl, \'thumbnailImg\': true, \'thumbnailImgFadeIn\' : true}" ng-show="!item.thumbnailUrl || item.thumbnailLoaded" ng-style="{\'background\': \'url(\\\'{{item.thumbnailUrl | missingThumbnail:item.fileType:false | absoluteUrl}}\\\') no-repeat center center\'}"></div>\n								<div class="removeButton" ng-click="removeFromQueue(item.id)" dont-propagate-click></div>\n							</div>\n						</div>		\n						<div class="caption">\n							<div class="thumbnailMainTitle" ellipsis="{{item.title}}"></div>		\n							<div class="thumbnailSubTitle" ng-show="item.fileType === \'AUDIO\'">{{item.album}}</div>			\n							<div class="thumbnailSubSubTitle">{{item.duration | timeStringShort}}</div>\n						</div>\n					</div>\n				</div>\n			</div>\n\n			<!--list view -->\n			<div ng-if="!thubmnailView" ng-class="{\'row listView\' : true, \'audioListTable\' : isAudio, \'videoListTable\' : isVideo, \'imageListTable\' : isImage}" ng-init="isAudio = containerFileType === \'A\'; isVideo = containerFileType === \'V\'; isImage = containerFileType === \'I\'">\n				<table class="table table-striped">\n					<thead>\n		              <tr ng-if="isAudio" class="hidden-xs">\n		                <th class="albumArt"></th>\n		                <th class="title">Title</th>\n		                <th class="duration">Duration</th>\n		                <th class="album">Album</th>\n		                <th class="artist">Artist</th>\n		                <th class="controls"></th>\n		              </tr>\n		              <tr ng-if="isVideo" class="hidden-xs">\n		                <th class="albumArt"></th>\n		                <th class="title">Title</th>\n		                <th class="duration">Duration</th>\n		                <th class="genre">Genre</th>\n		                <th class="year">Year</th>\n		                <th class="controls"></th>\n		              </tr> \n		              <tr ng-if="isImage" class="hidden-xs">\n		                <th class="albumArt"></th>\n		                <th class="title">Title</th>\n		                <th class="date">Date</th>\n		                <th class="controls"></th>\n		              </tr>   \n		            </thead>\n		            <tbody>\n		              <tr ng-repeat="item in queueItems" scroll-to-last-viewed-item="{{lastPlayedItemId === item.uniqueId}}">\n		                <td class="albumArt">\n		                	<div class="thumbnailImgContainer clickable queue" ng-click="playItem(item.uniqueId)">\n		                		<img src="assets/img/thumbnail-shape.png">\n		                		<div ng-class="{\'missingThubmnail\': !item.thumbnailUrl, \'thumbnailImg\': true, \'thumbnailImgFadeIn\' : true}" ng-show="!item.thumbnailUrl || item.thumbnailLoaded" ng-style="{\'background\': \'url(\\\'{{item.thumbnailUrl | missingThumbnail:item.fileType:false | absoluteUrl}}\\\') no-repeat center center\'}"></div>\n		                	</div>\n		                </td>\n\n		                <!-- audio -->\n		                <td ng-if="isAudio" class="title hidden-xs clickable" ng-click="playItem(item.uniqueId)"><div class="twoLines">{{item.title}}</div></td>\n		                <td ng-if="isAudio" class="titleArtist visible-xs clickable" ng-click="playItem(item.uniqueId)"><audio-title-in-list-view/></td>\n		                <td ng-if="isAudio" class="duration hidden-xs">{{item.duration | timeStringShort}}</td>\n		                <td ng-if="isAudio" class="album hidden-xs"><div class="twoLines">{{item.album}}</div></td>\n		                <td ng-if="isAudio" class="artist hidden-xs"><div class="twoLines">{{item.artist}}</div></td>\n		                \n		                <!-- video -->\n\n		                <td ng-if="isVideo" class="title hidden-xs clickable" ng-click="playItem(item.uniqueId)"><div class="twoLines">{{item.title}}</div></td>\n		                <td ng-if="isVideo" class="titleArtist visible-xs clickable" ng-click="playItem(item.uniqueId)">{{item.title}}<span class="secondary"> - {{item.duration | timeStringShort}}</span></td>\n		                <td ng-if="isVideo" class="duration hidden-xs">{{item.duration | timeStringShort}}</td>\n						<td ng-if="isVideo" class="genre hidden-xs">{{item.genre}}</td>\n						<td ng-if="isVideo" class="year hidden-xs">{{item.date | date:\'yyyy\'}}</td>\n\n						<!--image -->\n\n						 <td ng-if="isImage" class="title hidden-xs clickable" ng-click="playItem(item.uniqueId)"><div class="twoLines">{{item.title}}</div></td>\n		                <td ng-if="isImage" class="titleArtist visible-xs clickable" ng-click="playItem(item.uniqueId)">{{item.title}}<span class="secondary"> - {{item.date}}</span></td>\n						<td ng-if="isImage" class="date hidden-xs">{{item.date}}</td>\n\n		                <td class="controls"><div class="removeButton clickable" ng-click="removeFromQueue(item.id)"></div></td>\n		              </tr>  \n		            </tbody>\n		        </table>      \n			</div>	\n\n		</div>	\n\n		<!--nothing found -->\n		<div ng-if="queueItems.length == 0">\n			<div class="row">\n				<div class="queueEmpty">The queue is empty</div>\n			</div>\n		</div>\n	</div>	\n</div>')
  }]), b.module("search/search-dialog.tpl.html", []).run(["$templateCache", function (a) {
    a.put("search/search-dialog.tpl.html", '<section ng-controller="SearchBoxCtrl" ng-class="{\'semantic-content\':true, \'noflash\': true, \'visible\': !dialogBoxHidden}" id="modal-search-box" tabindex="-1">\n  <div class="modal-inner" centered-search-window ng-style="style()">\n    <div class="searchBoxPopupContainer">\n     	<div ng-click="closeSearchBox()" class="closeButton"></div>\n      	<div>\n        	<div class="title">Search</div>\n        	<div>\n        		<form novalidate class="form-inline" ng-submit="search()">\n        			<input type="text" class="searchTermField" ng-model="searchTerm" placeholder="Enter search terms" focus-on="openSearchBox">\n        			<button type="submit" class="searchButton clickable"></button>\n        		</form>	\n        	</div>\n      	</div>\n    </div>    \n  </div>  \n</section>')
  }]), b.module("search/search.tpl.html", []).run(["$templateCache", function (a) {
    a.put("search/search.tpl.html", '<div class="container" ng-init="resultsFound = false">\n	<div class="row">\n		<div class="navigation">\n			<a class="backButton" ng-href="{{backButtonUrl}}"></a>\n			<div class="searchResultsTitle">Search results for <span class="searchTerm" ng-bind="searchTerm"></span></div>\n		</div>\n	</div>		\n	<div ng-if="found && searchRun"> 	\n		<div ng-repeat="categoryResult in searchResult.categoryResults">\n			<div ng-if="categoryResult.returnedSize > 0">\n				<div class="row">\n					<div class="searchCategory">{{categoryResult.category | categoryName}}</div>\n				</div>\n\n				<div class="row gridView">\n					<div class="col-xs-6 col-sm-2 col-md-2 col-lg-2" ng-repeat="item in categoryResult.objects" ng-init="isContainer = item.type === \'CONTAINER\'">\n						<div class="thumbnail">\n							<div class="clickable" ng-click="objectAction(item.id, item.title, isContainer)">\n								<div class="thumbnailImgContainer">\n									<img src="assets/img/thumbnail-shape.png">\n									<div ng-class="{\'missingThubmnail\': !item.thumbnailUrl, \'thumbnailImg\': true, \'thumbnailImgFadeIn\' : true}" ng-show="!item.thumbnailUrl || item.thumbnailLoaded" ng-style="{\'background\': \'url(\\\'{{item.thumbnailUrl | missingThumbnail:item.fileType:isContainer | absoluteUrl}}\\\') no-repeat center center\'}"></div>\n									<div class="folderOverlay" ng-show="isContainer"></div>\n									<div class="addButton" ng-show="!isContainer" ng-click="addToQueue(item.id)" dont-propagate-click></div>\n								</div>\n							</div>		\n							<div class="caption">\n								<div class="thumbnailMainTitle" ellipsis="{{item.title}}"></div>		\n								<div class="thumbnailSubTitle">{{item.context}}</div>\n							</div>\n						</div>\n					</div>\n					<div style=\'clear: both;\'></div>\n				</div>\n			</div>	\n		</div>\n	</div>\n\n	<!--nothing found -->\n	<div ng-if="!found && searchRun">\n		<div class="row">\n			<div class="containerName">Nothing found</div>\n		</div>\n	</div>\n</div>')
  }]), b.module("templates-common", [])
}(window, window.angular);