/*
 Highcharts JS v5.0.0 (2016-09-29)
 Client side exporting module

 (c) 2015 Torstein Honsi / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(r) {
    "object" === typeof module && module.exports ? module.exports = r : r(Highcharts)
})(function(r) {
    (function(a) {
        function r(e, a) {
            var c = t.getElementsByTagName("head")[0],
                b = t.createElement("script");
            b.type = "text/javascript";
            b.src = e;
            b.onload = a;
            c.appendChild(b)
        }
        var A = a.merge,
            m = a.win,
            q = m.navigator,
            t = m.document,
            v = m.URL || m.webkitURL || m,
            w = /Edge\/|Trident\/|MSIE /.test(q.userAgent),
            B = w ? 150 : 0;
        a.CanVGRenderer = {};
        a.downloadURL = function(e, a) {
            var c = t.createElement("a"),
                b;
            if (q.msSaveOrOpenBlob) q.msSaveOrOpenBlob(e,
                a);
            else if (void 0 !== c.download) c.href = e, c.download = a, c.target = "_blank", t.body.appendChild(c), c.click(), t.body.removeChild(c);
            else try {
                if (b = m.open(e, "chart"), void 0 === b || null === b) throw "Failed to open window";
            } catch (h) {
                m.location.href = e
            }
        };
        a.svgToDataUrl = function(e) {
            var a = -1 < q.userAgent.indexOf("WebKit") && 0 > q.userAgent.indexOf("Chrome");
            try {
                if (!a && 0 > q.userAgent.toLowerCase().indexOf("firefox")) return v.createObjectURL(new m.Blob([e], {
                    type: "image/svg+xml;charset-utf-16"
                }))
            } catch (c) {}
            return "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(e)
        };
        a.imageToDataUrl = function(a, k, c, b, h, d, l, g, p) {
            var f = new m.Image,
                n, u = function() {
                    setTimeout(function() {
                        var d = t.createElement("canvas"),
                            u = d.getContext && d.getContext("2d"),
                            g;
                        try {
                            if (u) {
                                d.height = f.height * b;
                                d.width = f.width * b;
                                u.drawImage(f, 0, 0, d.width, d.height);
                                try {
                                    g = d.toDataURL(k), h(g, k, c, b)
                                } catch (m) {
                                    n(a, k, c, b)
                                }
                            } else l(a, k, c, b)
                        } finally {
                            p && p(a, k, c, b)
                        }
                    }, B)
                },
                z = function() {
                    g(a, k, c, b);
                    p && p(a, k, c, b)
                };
            n = function() {
                f = new m.Image;
                n = d;
                f.crossOrigin = "Anonymous";
                f.onload = u;
                f.onerror = z;
                f.src = a
            };
            f.onload = u;
            f.onerror = z;
            f.src = a
        };
        a.downloadSVGLocal = function(e, k, c, b, h, d) {
            var l, g, p = !0,
                f, n = a.getOptions().exporting.libURL;
            if ("image/svg+xml" === c) try {
                q.msSaveOrOpenBlob ? (g = new MSBlobBuilder, g.append(e), l = g.getBlob("image/svg+xml")) : l = a.svgToDataUrl(e), a.downloadURL(l, k), d && d()
            } catch (u) {
                h()
            } else l = a.svgToDataUrl(e), f = function() {
                try {
                    v.revokeObjectURL(l)
                } catch (a) {}
            }, a.imageToDataUrl(l, c, {}, b, function(b) {
                try {
                    a.downloadURL(b, k), d && d()
                } catch (c) {
                    h()
                }
            }, function() {
                var g = t.createElement("canvas"),
                    l = g.getContext("2d"),
                    x = e.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1] * b,
                    y = e.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1] * b,
                    v = function() {
                        l.drawSvg(e, 0, 0, x, y);
                        try {
                            a.downloadURL(q.msSaveOrOpenBlob ? g.msToBlob() : g.toDataURL(c), k), d && d()
                        } catch (b) {
                            h()
                        } finally {
                            f()
                        }
                    };
                g.width = x;
                g.height = y;
                m.canvg ? v() : (p = !0, n = "/" !== n.substr[-1] ? n + "/" : n, r(n + "rgbcolor.js", function() {
                    r(n + "canvg.js", function() {
                        v()
                    })
                }))
            }, h, h, function() {
                p && f()
            })
        };
        a.Chart.prototype.getSVGForLocalExport = function(e, k, c, b) {
            var h = this,
                d, l = 0,
                g, p, f, n, m = function(a,
                    c, e) {
                    ++l;
                    e.imageElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", a);
                    l === d.length && b(h.sanitizeSVG(g.innerHTML))
                };
            a.wrap(a.Chart.prototype, "getChartHTML", function(a) {
                g = this.container.cloneNode(!0);
                return a.apply(this, Array.prototype.slice.call(arguments, 1))
            });
            h.getSVGForExport(e, k);
            d = g.getElementsByTagName("image");
            try {
                if (d.length)
                    for (f = 0, n = d.length; f < n; ++f) p = d[f], a.imageToDataUrl(p.getAttributeNS("http://www.w3.org/1999/xlink", "href"), "image/png", {
                        imageElement: p
                    }, e.scale, m, c, c, c);
                else b(h.sanitizeSVG(g.innerHTML))
            } catch (q) {
                c()
            }
        };
        a.Chart.prototype.exportChartLocal = function(e, k) {
            var c = this,
                b = a.merge(c.options.exporting, e),
                h = b && b.type || "image/png",
                d = function() {
                    if (!1 === b.fallbackToExportServer)
                        if (b.error) b.error();
                        else throw "Fallback to export server disabled";
                    else c.exportChart(b)
                },
                l = function(c) {
                    var e = (b.filename || "chart") + "." + ("image/svg+xml" === h ? "svg" : h.split("/")[1]);
                    a.downloadSVGLocal(c, e, h, b.scale, d)
                };
            w && "image/svg+xml" !== h && c.container.getElementsByTagName("image").length ? d() : c.getSVGForLocalExport(b, k, d, l)
        };
        A(!0, a.getOptions().exporting, {
            libURL: "http://code.highcharts.com@product.cdnpath@/5.0.0/lib/",
            buttons: {
                contextButton: {
                    menuItems: [{
                        textKey: "printChart",
                        onclick: function() {
                            this.print()
                        }
                    }, {
                        separator: !0
                    }, {
                        textKey: "downloadPNG",
                        onclick: function() {
                            this.exportChartLocal()
                        }
                    }, {
                        textKey: "downloadJPEG",
                        onclick: function() {
                            this.exportChartLocal({
                                type: "image/jpeg"
                            })
                        }
                    }, {
                        textKey: "downloadSVG",
                        onclick: function() {
                            this.exportChartLocal({
                                type: "image/svg+xml"
                            })
                        }
                    }]
                }
            }
        })
    })(r)
});
