(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/luca/Progetti/websites/Bar-Chart-COVID19/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-array */ "vBe5");
/* harmony import */ var d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-scale-chromatic */ "oetV");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-scale */ "ziQ1");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "vDqi");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");









var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Demo-Bar-Chart-Race';
        this.duration = 110;
        this.n = 17;
        this.k = 2;
        this.margin = { top: 30, right: 6, bottom: 3, left: 100 };
        this.barSize = 38;
        this.width = window.screen.width;
    }
    AppComponent.prototype.startProvincia = function () {
        this.dataUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json";
        Object(d3__WEBPACK_IMPORTED_MODULE_2__["select"])("svg").remove();
        this.renderGraph();
    };
    AppComponent.prototype.startRegione = function () {
        this.dataUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json";
        Object(d3__WEBPACK_IMPORTED_MODULE_2__["select"])("svg").remove();
        this.renderGraph();
    };
    AppComponent.prototype.cleanData = function (response) {
        var _this = this;
        var data = response.data.map(function (d) { return new Object({
            'date': d.data.trim().replace(" ", "T").split("T")[0],
            'name': _this.dataUrl.includes("province") ? d.denominazione_provincia : d.denominazione_regione,
            'value': d.totale_casi
        }); });
        return data.filter(function (d) { return d.date > '2020-02-24' && d.name != 'In fase di definizione/aggiornamento'; });
    };
    AppComponent.prototype.renderGraph = function () {
        var _this = this;
        axios__WEBPACK_IMPORTED_MODULE_6___default.a.get(this.dataUrl).then(function (response) {
            var e_1, _a, _b, _c, _d;
            var data = _this.cleanData(response);
            _this.names = new Set(data.map(function (d) { return d.name; }));
            _this.datevalues = Array.from(Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["rollup"])(data, function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 1), d = _b[0];
                return +d.value || 0.001;
            }, function (d) { return d.date; }, function (d) { return d.name; }))
                .map(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), date = _b[0], data = _b[1];
                return [new Date(date), data];
            })
                .sort(function (_a, _b) {
                var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 1), a = _c[0];
                var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_b, 1), b = _d[0];
                return Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["ascending"])(a[0], b[0]);
            });
            _this.keyframes = [];
            var ka, a, kb, b;
            try {
                for (var _e = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["pairs"])(_this.datevalues)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_f.value, 2), _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_b[0], 2), ka = _c[0], a = _c[1], _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_b[1], 2), kb = _d[0], b = _d[1];
                    var _loop_1 = function (i) {
                        var t = i / _this.k;
                        _this.keyframes.push([
                            new Date(ka * (1 - t) + kb * t),
                            _this.rank(function (name) { return (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t; })
                        ]);
                    };
                    for (var i = 0; i < _this.k; ++i) {
                        _loop_1(i);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            _this.keyframes.push([new Date(kb), _this.rank(function (name) { return +b.get(name) || 0; })]);
            _this.nameframes = Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["groups"])(_this.keyframes.flatMap(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), data = _b[1];
                return data;
            }), function (d) { return d.name; });
            _this.prev = new Map(_this.nameframes.flatMap(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), data = _b[1];
                return Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["pairs"])(data, function (a, b) { return [b, a]; });
            }));
            _this.next = new Map(_this.nameframes.flatMap(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), data = _b[1];
                return Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["pairs"])(data);
            }));
            var scale = Object(d3_scale__WEBPACK_IMPORTED_MODULE_5__["scaleOrdinal"])(d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_4__["schemeTableau10"]);
            if (data.some(function (d) { return d.category !== undefined; })) {
                var categoryByName_1 = new Map(data.map(function (d) { return [d.name, d.category]; }));
                scale.domain(Array.from(categoryByName_1.values()));
                _this.color = function (d) { return scale(categoryByName_1.get(d.name)); };
            }
            else {
                _this.color = function (d) { return scale(d.name); };
            }
            _this.height = _this.margin.top + _this.barSize * _this.n + _this.margin.bottom;
            _this.x = Object(d3_scale__WEBPACK_IMPORTED_MODULE_5__["scaleLinear"])([0, 1], [_this.margin.left, _this.width - _this.margin.right]);
            _this.y = Object(d3_scale__WEBPACK_IMPORTED_MODULE_5__["scaleBand"])()
                .domain(Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["range"])(_this.n + 1).map(function (m) { return m.toString(); }))
                .rangeRound([_this.margin.top, _this.margin.top + _this.barSize * (_this.n + 1 + 0.1)])
                .padding(0.1);
            _this.chart();
        }).catch(function (err) {
            console.log(err);
        });
    };
    AppComponent.prototype.chart = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var svg, updateBars, updateAxis, updateLabels, updateTicker, _a, _b, keyframe, transition, e_2_1;
            var e_2, _c;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        svg = Object(d3__WEBPACK_IMPORTED_MODULE_2__["select"])("div#chart").append("svg").attr("viewBox", "0 0 " + this.width + " " + this.height);
                        updateBars = this.bars(svg);
                        updateAxis = this.axis(svg);
                        updateLabels = this.labels(svg);
                        updateTicker = this.ticker(svg);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.keyframes), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        keyframe = _b.value;
                        transition = svg.transition()
                            .duration(this.duration)
                            .ease(d3__WEBPACK_IMPORTED_MODULE_2__["easeLinear"]);
                        // Extract the top bar’s value.
                        this.x.domain([0, keyframe[1][0].value]);
                        updateAxis(keyframe, transition);
                        updateBars(keyframe, transition);
                        updateLabels(keyframe, transition);
                        updateTicker(keyframe, transition);
                        return [4 /*yield*/, transition.end()];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.rank = function (value) {
        var data = Array.from(this.names, function (name) { return ({ name: name, value: value(name) }); });
        data.sort(function (a, b) { return Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["descending"])(a.value, b.value); });
        for (var i = 0; i < data.length; ++i)
            data[i]['rank'] = Math.min(this.n, i);
        return data;
    };
    AppComponent.prototype.bars = function (svg) {
        var _this = this;
        var bar = svg.append("g")
            .attr("fill-opacity", 0.6)
            .selectAll("rect");
        return function (_a, transition) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), date = _b[0], data = _b[1];
            return bar = bar
                .data(data.slice(0, _this.n), function (d) { return d.name; })
                .join(function (enter) { return enter.append("rect")
                .attr("fill", _this.color)
                .attr("height", _this.y.bandwidth())
                .attr("x", _this.x(0))
                .attr("y", function (d) { return _this.y((_this.prev.get(d) || d).rank); })
                .attr("width", function (d) { return _this.x((_this.prev.get(d) || d).value) - _this.x(0); }); }, function (update) { return update; }, function (exit) { return exit.transition(transition).remove()
                .attr("y", function (d) { return _this.y((_this.next.get(d) || d).rank); })
                .attr("width", function (d) { return _this.x((_this.next.get(d) || d).value) - _this.x(0); }); })
                .call(function (bar) { return bar.transition(transition)
                .attr("y", function (d) { return _this.y(d.rank); })
                .attr("width", function (d) { return _this.x(d.value) - _this.x(0); }); });
        };
    };
    AppComponent.prototype.labels = function (svg) {
        var _this = this;
        var label = svg.append("g")
            .style("font", "bold 14px var(--sans-serif)")
            .style("font-variant-numeric", "tabular-nums")
            .attr("text-anchor", "end")
            .selectAll("text");
        return function (_a, transition) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), date = _b[0], data = _b[1];
            return label = label
                .data(data.slice(0, _this.n), function (d) { return d.name; })
                .join(function (enter) { return enter.append("text")
                .attr("transform", function (d) { return "translate(" + _this.x((_this.prev.get(d) || d).value) + "," + _this.y((_this.prev.get(d) || d).rank) + ")"; })
                .attr("y", _this.y.bandwidth() / 2)
                .attr("x", -6)
                .attr("dy", "-0.25em")
                .text(function (d) { return d.name; })
                .call(function (text) { return text.append("tspan")
                .attr("fill-opacity", 0.7)
                .attr("font-weight", "normal")
                .attr("x", -6)
                .attr("dy", "1.15em"); }); }, function (update) { return update; }, function (exit) { return exit.transition(transition).remove()
                .attr("transform", function (d) { return "translate(" + _this.x((_this.next.get(d) || d).value) + "," + _this.y((_this.next.get(d) || d).rank) + ")"; })
                .call(function (g) { return g.select("tspan").tween("text", function (d) { return _this.textTween(d.value, (_this.next.get(d) || d).value); }); }); })
                .call(function (bar) { return bar.transition(transition)
                .attr("transform", function (d) { return "translate(" + _this.x(d.value) + "," + _this.y(d.rank) + ")"; })
                .call(function (g) { return g.select("tspan").tween("text", function (d) { return _this.textTween((_this.prev.get(d) || d).value, d.value); }); }); });
        };
    };
    AppComponent.prototype.textTween = function (a, b) {
        var i = Object(d3__WEBPACK_IMPORTED_MODULE_2__["interpolateNumber"])(a, b);
        return function (t) {
            this.textContent = Object(d3__WEBPACK_IMPORTED_MODULE_2__["format"])(",d")(i(t));
        };
    };
    AppComponent.prototype.axis = function (svg) {
        var g = svg.append("g")
            .attr("transform", "translate(0," + this.margin.top + ")");
        var axis = Object(d3__WEBPACK_IMPORTED_MODULE_2__["axisTop"])(this.x)
            .ticks(this.width / 160)
            .tickSizeOuter(0)
            .tickSizeInner(-this.barSize * (this.n + this.y.padding()));
        return function (_, transition) {
            g.transition(transition).call(axis);
            g.select(".tick:first-of-type text").remove();
            g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
            g.select(".domain").remove();
        };
    };
    AppComponent.prototype.ticker = function (svg) {
        var now = svg.append("text")
            .attr("font-size", "30px")
            .attr("text-anchor", "end")
            .attr("x", this.width)
            .attr("y", this.margin.top + this.barSize * (this.n - 0.45))
            .text(Object(d3__WEBPACK_IMPORTED_MODULE_2__["utcFormat"])("%d/%m/%Y")(this.keyframes[0][0]));
        return function (_a, transition) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 1), date = _b[0];
            transition.end().then(function () { return now.text(Object(d3__WEBPACK_IMPORTED_MODULE_2__["utcFormat"])("%d/%m/%Y")(date)); });
        };
    };
    AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 13, vars: 0, consts: [["id", "head"], [3, "click"], ["id", "source"], ["href", "https://github.com/pcm-dpc/COVID-19"], ["id", "chart"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Casi COVID-19");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_button_click_3_listener() { return ctx.startRegione(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Regioni");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_button_click_5_listener() { return ctx.startProvincia(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Province");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Sorgente dati: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "a", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "https://github.com/pcm-dpc/COVID-19");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "router-outlet");
        } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterOutlet"]], styles: ["div#head[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  justify-content: space-around;\n  height: 30px;\n}\ndiv#head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 30px;\n}\ndiv#head[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 5px;\n  border-radius: 15%;\n}\ndiv#head[_ngcontent-%COMP%]   span#source[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  position: absolute;\n  bottom: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSw2QkFBQTtFQUNBLFlBQUE7QUFDSjtBQUNJO0VBQ0ksZUFBQTtBQUNSO0FBRUk7RUFDSSxZQUFBO0VBQ0Esa0JBQUE7QUFBUjtBQUdJO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFEUiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJkaXYjaGVhZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIGhlaWdodDogMzBweDtcblxuICAgIHNwYW4ge1xuICAgICAgICBmb250LXNpemU6IDMwcHg7XG4gICAgfVxuXG4gICAgYnV0dG9uIHtcbiAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxNSU7XG4gICAgfVxuXG4gICAgc3BhbiNzb3VyY2Uge1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3R0b206IDVweFxuICAgIH1cbn0iXX0= */"] });
    return AppComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
            ]] });
    return AppModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
    return AppRoutingModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map