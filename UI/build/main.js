(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/admin/admin.component.html":
/*!********************************************!*\
  !*** ./src/app/admin/admin.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\" novalidate *ngIf=\"!auth\" class=\"logginForm\">\n    <p class=\"h5 text-center mb-4\">Logg inn </p>\n\n    <div class=\"md-form\">\n        <i class=\"fa fa-user prefix grey-text\"></i>\n        <input type=\"text\" id=\"form3\" class=\"form-control\" name=\"username\" ngModel mdbActive>\n        <label for=\"form3\">Ansatt id</label>\n    </div>\n\n    <div class=\"md-form\">\n        <i class=\"fa fa-dollar prefix grey-text\"></i>\n        <input type=\"password\" id=\"form2\" class=\"form-control\" name=\"password\" ngModel mdbActive>\n        <label for=\"form2\">Passord</label>\n    </div>\n\n    <div class=\"text-center\">\n        <button class=\"btn btn-primary\" mdbRippleRadius>\n            <i class=\"fa fa-send mr-1\"></i> Logg inn</button>\n    </div>\n\n</form>\n<!--Logginn Form-->\n\n<div *ngIf=\"auth\">\n    <h4>Oversikt over utstyr:</h4>\n    <table class=\"table equipmentTable\">\n\n        <!--Table head-->\n        <thead class=\"blue-grey lighten-4\">\n            <tr>\n                <th>Utstyr navn:</th>\n                <th>Type:</th>\n                <th>Tilgjengelighet:</th>\n                <th>Status:</th>\n                <th>Tilgjengelig ved:</th>\n                <th>pris time:</th>\n                <th>pris dag:</th>\n                <th>Ramme</th>\n                <th>Hjulstørrelse</th>\n            </tr>\n        </thead>\n        <!--Table head-->\n\n        <!--Table body-->\n        <tbody>\n            <tr *ngFor=\"let equipment of equipmentList; let i = index\" ngModel>\n                <td>{{equipment.name}}</td>\n                <td>{{equipment.type}}</td>\n                <td>\n                    <button type=\"button\" class=\"btn btn-primary relative waves-light\" (click)=\"avaliableModal.show(); locationConfig(equipment)\"\n                        mdbWavesEffect>\n                        Sjekk Tilgjengelighet\n                    </button>\n                </td>\n                <td>\n                    <span *ngIf=\"!auth\">{{equipment.status}}</span>\n                    <button *ngIf=\"auth\" type=\"button\" class=\"btn btn-primary relative waves-light\" (click)=\"statusModal.show(); statusConfig(equipment)\"\n                        mdbWavesEffect>\n                        Endre status\n                    </button>\n                </td>\n                <td>\n                    <span *ngIf=\"!auth\">{{equipment.status}}</span>\n                    <button *ngIf=\"auth\" type=\"button\" class=\"btn btn-primary relative waves-light\" (click)=\"locationModal.show(); locationConfig(equipment)\"\n                        mdbWavesEffect>\n                        Endre sted\n                    </button>\n                </td>\n                <td>{{equipment.hourPrice}}</td>\n                <td>{{equipment.dailyPrice}}</td>\n                <td>{{equipment.frame}}</td>\n                <td>{{equipment.wheelSize}}</td>\n            </tr>\n        </tbody>\n        <!--Table body-->\n    </table>\n\n    <div mdbModal #statusModal=\"mdb-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mystatusModalLabel\"\n        aria-hidden=\"true\" [config]=\"{backdrop: false, ignoreBackdropClick: true}\">\n        <div class=\"modal-dialog\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"statusModal.hide()\">\n                        <span aria-hidden=\"true\">×</span>\n                    </button>\n                    <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Endre status på</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <p>{{selectedEquipmentName}}</p>\n                    <p> status: {{selectedEquipmentStatus}}</p>\n                    <div class=\"btn-group sorterBtn\" dropdown>\n                        <button dropdownToggle type=\"button\" class=\"btn btn-primary dropdown-toggle waves-light\" mdbWavesEffect>\n                            Endre status til: {{assignedSatus}}\n                        </button>\n                        <div class=\"dropdown-menu dropdown-primary\">\n                            <a class=\"dropdown-item\" (click)=\"assignNewStatus('flytt')\">\n                                Flytt\n                            </a>\n                            <a class=\"dropdown-item\" (click)=\"assignNewStatus('reparasjon')\">\n                                Reparasjon\n                            </a>\n                            <a class=\"dropdown-item\" (click)=\"assignNewStatus('stjålet')\">\n                                Stjålet\n                            </a>\n                            <a class=\"dropdown-item\" (click)=\"assignNewStatus('klar')\">\n                                Klar\n                            </a>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-secondary waves-light\" aria-label=\"Close\" (click)=\"statusModal.hide()\" mdbWavesEffect>Lukk</button>\n                    <button type=\"button\" class=\"btn btn-primary relative waves-light\" (click)=\"updateLocationOrStatus('status')\" mdbWavesEffect>Lagre endringer</button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div mdbModal #avaliableModal=\"mdb-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"avaliableModalLabel\"\n        aria-hidden=\"true\" [config]=\"{backdrop: false, ignoreBackdropClick: true}\">\n        <div class=\"modal-dialog\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"avaliableModal.hide()\">\n                        <span aria-hidden=\"true\">×</span>\n                    </button>\n                    <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Tilgjengelighet</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <p>{{selectedEquipmentName}}</p>\n                    <p>Sist sett på {{selectedEquipmentLocation.name}}</p>\n                    <p>Post nummer: {{selectedEquipmentLocation.postalCode}}</p>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-secondary waves-light\" aria-label=\"Close\" (click)=\"avaliableModal.hide()\" mdbWavesEffect>Lukk</button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div mdbModal #locationModal=\"mdb-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"locationModalLabel\"\n        aria-hidden=\"true\" [config]=\"{backdrop: false, ignoreBackdropClick: true}\">\n        <div class=\"modal-dialog\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"locationModal.hide()\">\n                        <span aria-hidden=\"true\">×</span>\n                    </button>\n                    <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Endre sted</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <p>{{selectedEquipmentName}}</p>\n                    <p>Sist sett på {{selectedEquipmentLocation.name}}</p>\n                    <p>Post nummer: {{selectedEquipmentLocation.postalCode}}</p>\n                    <div class=\"btn-group sorterBtn\" dropdown>\n                        <button dropdownToggle type=\"button\" class=\"btn btn-primary dropdown-toggle waves-light\" mdbWavesEffect>\n                            Endre sted til:\n                        </button>\n                        <div class=\"dropdown-menu dropdown-primary\">\n                            <a class=\"dropdown-item\" *ngFor=\"let place of placesList\" (click)=\"assignNewPlace(place.place_id)\">\n                                {{place.name}}\n                            </a>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-secondary waves-light\" aria-label=\"Close\" (click)=\"locationModal.hide()\" mdbWavesEffect>Lukk</button>\n                    <button type=\"button\" class=\"btn btn-primary relative waves-light\" (click)=\"updateLocationOrStatus('location')\" mdbWavesEffect>Lagre endringer</button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <br/>\n    <br/>\n    <br/>\n    <h4>Oversikt over bestillinger:</h4>\n    <button type=\"button\" class=\"btn btn-primary waves-light\" *ngIf=\"!listSorted\" (click)=\"filterForEmployee()\" mdbWavesEffect>\n        Filtrer etter bestillinger tildelt deg:\n    </button>\n    <button type=\"button\" class=\"btn btn-primary waves-light\" *ngIf=\"listSorted\" (click)=\"fetchOrders()\" mdbWavesEffect>\n       Gå tilbake til original liste:\n    </button>\n    <br/>\n    <br/>\n    <table class=\"table equipmentTable\">\n\n        <!--Table head-->\n        <thead class=\"blue-grey lighten-4\">\n            <tr>\n                <th>Id:</th>\n                <th>Pris:</th>\n                <th>Kunde id:</th>\n                <th>Ansatt id:</th>\n                <th>Order dato:</th>\n            </tr>\n        </thead>\n        <!--Table head-->\n\n        <!--Table body-->\n        <tbody>\n            <tr *ngFor=\"let order of orderList\">\n                <td>{{order.order_id}}</td>\n                <td>{{order.price}}</td>\n                <td>{{order.customer_id}}</td>\n                <td>{{order.employee_id}}</td>\n                <td>{{order.orderDate}}</td>\n            </tr>\n        </tbody>\n        <!--Table body-->\n    </table>\n    <!--Table-->\n</div>"

/***/ }),

/***/ "./src/app/admin/admin.component.scss":
/*!********************************************!*\
  !*** ./src/app/admin/admin.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".logginForm {\n  width: 60%;\n  margin: 0 auto; }\n"

/***/ }),

/***/ "./src/app/admin/admin.component.ts":
/*!******************************************!*\
  !*** ./src/app/admin/admin.component.ts ***!
  \******************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminComponent = /** @class */ (function () {
    function AdminComponent(httpClient, authService) {
        this.httpClient = httpClient;
        this.authService = authService;
        this.orderList = Array();
        this.placesList = Array();
        // scope data
        this.selectedEquipment = {};
        this.selectedEquipmentName = " ";
        this.selectedEquipmentStatus = " ";
        this.selectedEquipmentLocation = {};
        this.assignedPlaceId = 0;
        this.assignedSatus = "";
        this.employee = true;
        this.auth = false;
        this.authId = 0;
        this.listSorted = false;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': "{'firstName':'John', 'lastName':'Doe'}"
            })
        };
    }
    AdminComponent.prototype.ngOnInit = function () {
        console.log(this.authService.getHash());
        this.auth = this.authService.checkEmployment();
        this.fetchPlaces();
        if (this.auth) {
            this.fetchEquipment();
            this.fetchOrders();
        }
    };
    AdminComponent.prototype.notifyUponSubmission = function () {
        var validLogging = new Notification("Du er logget inn", {
            body: "Sjekk/endre status på utstyr"
        });
        setTimeout(validLogging.close.bind(validLogging), 5000);
    };
    AdminComponent.prototype.onSubmit = function (f) {
        console.log(f.value);
        this.loggIn(f.value);
    };
    AdminComponent.prototype.sendMessage = function (name, employee, userId) {
        this.authService.sendMessage("logget inn som ansatt " + name, employee, userId);
    };
    AdminComponent.prototype.loggIn = function (data) {
        var _this = this;
        var loggInnUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].ApiUrl + "/auth"; // api logg inn url
        var payload = {
            Username: data.username,
            Password: data.password,
            IsEmployee: this.employee
        };
        console.log(payload);
        this.httpClient.post(loggInnUrl, payload, this.httpOptions) // http-post
            .subscribe(function (data) {
            console.log(data);
            _this.authId = data['creds_id'];
            _this.auth = true;
            _this.notifyUponSubmission();
            _this.fetchEquipment();
            _this.fetchOrders();
        }, function (err) {
            if (err.status == 200) {
                _this.auth = true;
            }
            else {
            }
        });
        this.sendMessage(data.username, this.employee, data.Creds_id);
    };
    AdminComponent.prototype.fetchEquipment = function () {
        var _this = this;
        var equipmentEndpoint = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].ApiUrl + "/bike";
        this.httpClient.get(equipmentEndpoint, this.httpOptions)
            .subscribe(function (data) {
            _this.equipmentList = data;
        }, function (error) {
            console.log(error);
        }, function () {
            console.log("succes");
        });
    };
    AdminComponent.prototype.fetchOrders = function () {
        var _this = this;
        var orderUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].ApiUrl + "/order";
        this.httpClient.get(orderUrl, this.httpOptions)
            .subscribe(function (data) {
            _this.orderList = data;
            _this.listSorted = false;
        });
    };
    AdminComponent.prototype.fetchPlaces = function () {
        var _this = this;
        var placesUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].ApiUrl + "/place";
        this.httpClient.get(placesUrl, this.httpOptions)
            .subscribe(function (data) {
            console.log(data);
            _this.placesList = data;
        }, function (error) { return function () {
            console.log("error:");
        }; }, function () {
            console.log("succes for places");
        });
    };
    AdminComponent.prototype.statusConfig = function (equipment) {
        this.selectedEquipment = Object.assign({}, equipment);
        this.selectedEquipmentStatus = equipment.status;
        this.selectedEquipmentName = equipment.name;
    };
    AdminComponent.prototype.locationConfig = function (equipment) {
        console.log(this.placesList[this.placesList.findIndex(function (place) { return place.place_id === equipment.lastSeenOnPlace; })]);
        this.selectedEquipment = Object.assign({}, equipment);
        this.selectedEquipmentLocation = Object.assign({}, this.placesList[this.placesList.findIndex(function (place) { return place.place_id === equipment.lastSeenOnPlace; })]);
        this.selectedEquipmentName = equipment.name;
        console.log(this.selectedEquipmentLocation);
    };
    AdminComponent.prototype.assignNewPlace = function (id) {
        this.assignedPlaceId = id;
    };
    AdminComponent.prototype.assignNewStatus = function (status) {
        this.assignedSatus = status;
    };
    AdminComponent.prototype.updateLocationOrStatus = function (fieldForUpdate) {
        if (fieldForUpdate == 'location') {
            this.selectedEquipment['lastSeenOnPlace'] = this.assignedPlaceId;
        }
        else {
            this.selectedEquipment['status'] = this.assignedSatus;
        }
        var updateBikeUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].ApiUrl + "/bike" + "/" + this.selectedEquipment['bike_id'];
        var payload = Object.assign({}, this.selectedEquipment);
        console.log(payload);
        this.httpClient.put(updateBikeUrl, payload, this.httpOptions)
            .subscribe(function (data) {
            console.log(data);
        });
        this.updateEquipmentInView();
    };
    AdminComponent.prototype.updateEquipmentInView = function () {
        this.fetchEquipment();
        this.fetchOrders();
        this.fetchPlaces();
    };
    AdminComponent.prototype.filterForEmployee = function () {
        var _this = this;
        var orderForEmployeeUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].ApiUrl + "/status";
        var payload = { criteria: "employee", id: this.authId };
        this.httpClient.post(orderForEmployeeUrl, payload, this.httpOptions)
            .subscribe(function (data) {
            _this.orderList = data;
            _this.listSorted = true;
        });
    };
    AdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/admin/admin.component.html"),
            styles: [__webpack_require__(/*! ./admin.component.scss */ "./src/app/admin/admin.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n\n\n\n<div class=\"headerContainer\">\n    <img src=\"./assets/livhead-2.jpg\" class=\"img-fluid headerImage\" alt=\"Responsive image\">\n    <h1 class=\"headerTitle\">AS-Sykkelutleie</h1>\n    <!--Card Info-->\n    <span class=\"row userStatus\">\n        <span class=\"card success-color text-center z-depth-2 col-md-3\">\n            <span class=\"card-body\">\n                <p class=\"white-text mb-0\">\n                    Status: {{userName}}\n                </p>\n            </span>\n        </span>\n    </span>\n    <!--/.Card Info-->\n</div>\n\n<main class=\"main\">\n    <br/>\n    <br/>\n    <br/>\n    <router-outlet></router-outlet>\n    <br/>\n    <br/>\n    <br/>\n    <footer class=\"page-footer font-small blue pt-4 mt-4\">\n\n        <!--Footer Links-->\n        <div class=\"container-fluid text-center text-md-left\">\n            <div class=\"row\">\n\n                <!--First column-->\n                <div class=\"col-md-6\">\n                    <h5 class=\"title\">Sykkelutleie</h5>\n                    <p>Sykkler og utstyr for alle anledninger</p>\n                </div>\n                <!--/.First column-->\n\n                <!--Second column-->\n                <div class=\"col-md-6\">\n                    <h5 class=\"text-uppercase\">Links</h5>\n                    <ul class=\"list-unstyled\">\n                        <li>\n                            <a href=\"#!\">Link 1</a>\n                        </li>\n                        <li>\n                            <a href=\"#!\">Link 2</a>\n                        </li>\n                        <li>\n                            <a href=\"#!\">Link 3</a>\n                        </li>\n                        <li>\n                            <a href=\"#!\">Link 4</a>\n                        </li>\n                    </ul>\n                </div>\n                <!--/.Second column-->\n            </div>\n        </div>\n        <!--/.Footer Links-->\n        <!--Copyright-->\n        <div class=\"footer-copyright\">\n            <div class=\"container-fluid\">\n                © 2018 Copyright: Sykkelutleie AS\n            </div>\n        </div>\n        <!--/.Copyright-->\n    </footer>\n    <!--/.Footer-->\n</main>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".headerContainer {\n  position: relative; }\n\n.userStatus {\n  padding: 2.5%;\n  width: 65%;\n  position: absolute;\n  bottom: 40%;\n  padding-left: 2%;\n  padding-right: 2%; }\n\n.headerImage {\n  width: 100%;\n  height: 500px;\n  margin: 0 auto; }\n\n.headerTitle {\n  padding: 2.5%;\n  width: 65%;\n  position: absolute;\n  bottom: 80%;\n  right: 0%;\n  padding-left: 2%;\n  padding-right: 2%;\n  color: white; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(authService) {
        var _this = this;
        this.authService = authService;
        this.isAuthenticated = false;
        this.userName = "Gjest";
        this.subscription = this.authService.getMessage().subscribe(function (message) {
            if (message.status) {
                console.log(message);
                _this.userName = message.text + "som ansatt";
            }
            _this.userName = message.text;
        });
    }
    AppComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")],
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _equipment_equipment_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./equipment/equipment.component */ "./src/app/equipment/equipment.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _admin_admin_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./admin/admin.component */ "./src/app/admin/admin.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _order_order_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./order/order.component */ "./src/app/order/order.component.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_order_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/order.service */ "./src/app/services/order.service.ts");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./user/user.component */ "./src/app/user/user.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Dependencies






//Components:







//services:



var appRoutes = [
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"] },
    { path: 'equipment', component: _equipment_equipment_component__WEBPACK_IMPORTED_MODULE_8__["EquipmentComponent"] },
    { path: 'admin', component: _admin_admin_component__WEBPACK_IMPORTED_MODULE_10__["AdminComponent"] },
    { path: 'register', component: _register_register_component__WEBPACK_IMPORTED_MODULE_11__["RegisterComponent"] },
    { path: 'order', component: _order_order_component__WEBPACK_IMPORTED_MODULE_12__["OrderComponent"] },
    { path: 'user/:id', component: _user_user_component__WEBPACK_IMPORTED_MODULE_15__["UserComponent"] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
                _equipment_equipment_component__WEBPACK_IMPORTED_MODULE_8__["EquipmentComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_9__["NavbarComponent"],
                _admin_admin_component__WEBPACK_IMPORTED_MODULE_10__["AdminComponent"],
                _register_register_component__WEBPACK_IMPORTED_MODULE_11__["RegisterComponent"],
                _order_order_component__WEBPACK_IMPORTED_MODULE_12__["OrderComponent"],
                _user_user_component__WEBPACK_IMPORTED_MODULE_15__["UserComponent"],
            ],
            imports: [
                angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MDBBootstrapModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(appRoutes, { useHash: true }),
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
            ],
            providers: [_services_auth_service__WEBPACK_IMPORTED_MODULE_13__["AuthService"], _services_order_service__WEBPACK_IMPORTED_MODULE_14__["OrderService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/equipment/equipment.component.html":
/*!****************************************************!*\
  !*** ./src/app/equipment/equipment.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4>Dersom du er ansatt, gå til /ansatte for å se utstyr</h4>\n<div class=\"btn-group sorterBtn\" dropdown>\n    <button dropdownToggle type=\"button\" class=\"btn btn-primary dropdown-toggle waves-light\" mdbWavesEffect>\n        Sorter etter:\n    </button>\n    <div class=\"dropdown-menu dropdown-primary\">\n        <a class=\"dropdown-item\" (click)=\"orderByCriteria('pris')\">pris per time</a>\n        <a class=\"dropdown-item\" (click)=\"orderByCriteria('prisDag')\">pris per dag </a>\n        <a class=\"dropdown-item\" (click)=\"orderByCriteria('validStatus')\">Tilgjengelig</a>\n        <a class=\"dropdown-item\" (click)=\"orderByCriteria('invalidStatus')\">Ikke tilgjengelig</a>\n    </div>\n</div>\n<br />\n<hr>\n<!--Table-->\n<table class=\"table equipmentTable\">\n    <!--Table head-->\n    <thead class=\"blue-grey lighten-4\">\n        <tr>\n            <th>Utstyr navn:</th>\n            <th>Type</th>\n            <th>Tilgjengelighet:</th>\n            <th>Status:</th>\n            <th>pris  time:</th>\n            <th>pris dag:</th>\n            <th>Ramme</th>\n            <th>Hjulstørrelse</th>\n        </tr>\n    </thead>\n    <!--Table head-->\n    <!--Table body-->\n    <tbody>\n        <tr *ngFor=\"let equipment of equipmentList; let i = index\">\n            <td>{{equipment.name}}</td>\n            <td>{{equipment.type}}</td>\n            <td>\n                <button \n                type=\"button\" \n                class=\"btn btn-primary relative waves-light\" \n                (click)=\"statusModal.show(); modalTrigger(equipment.lastSeenOnPlace, equipment.name)\" \n                mdbWavesEffect\n                >\n                    Sjekk Tilgjengelighet\n                </button>\n            </td>\n            <td>{{equipment.status}}</td>\n            <td>{{equipment.hourPrice}}</td>\n            <td>{{equipment.dailyPrice}}</td>\n            <td>{{equipment.frame}}</td>\n            <td>{{equipment.wheelSize}}</td>\n        </tr>\n    </tbody>\n    <!--Table body-->\n</table>\n<!--Table-->\n\n<div mdbModal #statusModal=\"mdb-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mystatusModalLabel\" aria-hidden=\"true\" [config]=\"{backdrop: false, ignoreBackdropClick: true}\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"statusModal.hide()\">\n                    <span aria-hidden=\"true\">×</span>\n                </button>\n                <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Status på utstyret</h4>\n            </div>\n            <div class=\"modal-body\">\n                <p>Status for: {{selectedEquipmentName}}</p>\n                <p>\n                    Siste sett på: {{selectedPlace.name}}\n                </p>\n                <p> Post nummer: {{selectedPlace.postalCode}}</p>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary waves-light\" aria-label=\"Close\" (click)=\"statusModal.hide()\" mdbWavesEffect>Lukk</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n            \n                                    "

/***/ }),

/***/ "./src/app/equipment/equipment.component.scss":
/*!****************************************************!*\
  !*** ./src/app/equipment/equipment.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".equipmentTable {\n  margin: 0 auto;\n  width: 80%; }\n\n.sorterBtn {\n  padding: 2.5%; }\n"

/***/ }),

/***/ "./src/app/equipment/equipment.component.ts":
/*!**************************************************!*\
  !*** ./src/app/equipment/equipment.component.ts ***!
  \**************************************************/
/*! exports provided: EquipmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentComponent", function() { return EquipmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/notification.service */ "./src/app/services/notification.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EquipmentComponent = /** @class */ (function () {
    function EquipmentComponent(authService, notificationService, httpClient) {
        this.authService = authService;
        this.notificationService = notificationService;
        this.httpClient = httpClient;
        this.selectedPlace = {};
        this.selectedEquipmentName = "";
        this.userName = "Gjest";
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        this.subscription = this.authService.getMessage().subscribe(function (message) {
            if (message.status) {
                console.log(message);
            }
        });
    }
    EquipmentComponent.prototype.ngOnInit = function () {
        this.fetchPlaces();
    };
    EquipmentComponent.prototype.fetchPlaces = function () {
        var _this = this;
        var placesUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/place";
        this.httpClient.get(placesUrl, this.httpOptions)
            .subscribe(function (data) {
            console.log(data);
            _this.placesList = data;
        }, function (error) { return function () {
            console.log("error:");
        }; }, function () {
            _this.fetchEquipment();
            _this.notificationService.notifyEquipmentRecieved();
            console.log("succes for places");
        });
    };
    EquipmentComponent.prototype.fetchEquipment = function () {
        var _this = this;
        var equipmentEndpoint = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/bike";
        this.httpClient.get(equipmentEndpoint, this.httpOptions)
            .subscribe(function (data) {
            console.log(data);
            _this.equipmentList = data;
        }, function (error) { return function () {
            console.log("error:");
        }; }, function () {
            console.log("succes for equipment");
        });
    };
    EquipmentComponent.prototype.modalTrigger = function (index, name) {
        this.selectedPlace = Object.assign({}, this.placesList[this.placesList.findIndex(function (place) { return place.place_id === index; })]);
        this.selectedEquipmentName = name;
    };
    EquipmentComponent.prototype.orderByCriteria = function (criteria) {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/status";
        var payload = {};
        if (criteria == 'pris') {
            payload = { criteria: "price" };
        }
        else if (criteria == 'validStatus') {
            payload = { criteria: "validStatus" };
        }
        else if (criteria == 'prisDag') {
            payload = { criteria: 'priceDay' };
        }
        else {
            payload = { criteria: "invalidStatus" };
        }
        this.httpClient.post(url, payload, this.httpOptions)
            .subscribe(function (data) {
            _this.equipmentList = data;
        });
    };
    EquipmentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-equipment',
            template: __webpack_require__(/*! ./equipment.component.html */ "./src/app/equipment/equipment.component.html"),
            styles: [__webpack_require__(/*! ./equipment.component.scss */ "./src/app/equipment/equipment.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"], _services_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], EquipmentComponent);
    return EquipmentComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h4 *ngIf=\"!auth\" class=\"HomeTittle\">Brukerinnlogging</h4>\n<h4 *ngIf=\"auth\" class=\"HomeTittle\">Velkommen</h4>\n\n<br />\n<div class=\"card text-center NewUserPanel\" *ngIf=\"!auth\">\n    <div class=\"card-header success-color white-text\">\n        Featured\n    </div>\n    <div class=\"card-body\">\n        <h4 class=\"card-title\">Har du ikke bruker hos oss ennå?</h4>\n        <p class=\"card-text\">\n            Det er raskt og enkelt\n        </p>\n        <a class=\"btn btn-success btn-sm\" href=\"#register\">Gå til registrering</a>\n    </div>\n    <div class=\"card-footer text-muted success-color white-text\">\n    </div>\n</div>\n\n<br />\n<form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\" novalidate *ngIf=\"!auth\" class=\"logginForm\">\n    <p class=\"h5 text-center mb-4\">Logg inn </p>\n\n  <div class=\"md-form\">\n      <i class=\"fa fa-user prefix grey-text\"></i>\n      <input type=\"text\" class=\"form-control\" name=\"username\" ngModel mdbActive>\n      <label for=\"logginForm\">Brukernavn</label>\n  </div>\n  \n  <div class=\"md-form\">\n        <i class=\"fa fa-certificate prefix grey-text\"></i>\n        <input type=\"password\" class=\"form-control\" name=\"password\" ngModel mdbActive>\n        <label for=\"logginForm\">passord</label>\n    </div>\n\n    <div class=\"text-center\">\n        <button class=\"btn btn-primary\" mdbRippleRadius>\n            <i class=\"fa fa-send mr-1\"></i> Logg inn</button>\n    </div>\n\n</form>\n\n\n<hr>\n<br/>\n<br/>\n<!--Logginn Form-->\n<div class=\"row\" *ngIf=\"auth\">\n    <!-- Grid column -->\n    <div class=\"col-md-6 col-lg-5 userCard\">\n        \n        <!--Card-->\n        <div class=\"card green darken-3\">\n            \n            <!--Card image-->\n            <div class=\"view\">\n                <img src=\"./assets/downhill.jpg\" class=\"img-fluid\" alt=\"photo\">\n                <a href=\"#\">\n                    <div class=\"mask rgba-white-slight\"></div>\n                </a>\n            </div>\n            \n            <!--Card content-->\n            <div class=\"card-body text-center\">\n                <!--Title-->\n                <h4 class=\"card-title white-text\">{{message}}</h4>\n                <!--Text-->\n                <p class=\"card-text white-text\">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto vitae.</p>\n                <button class=\"btn btn-primary waves-light\" (click)=\"redirectUser('history')\" mdbRippleRadius>Se ordrehistorikken din:</button>\n                <button class=\"btn btn-primary waves-light\" (click)=\"redirectUser('order')\" mdbRippleRadius>Gå til en ny bestilling:</button>\n                </div>\n\n            </div>\n            <!--/.Card-->\n    \n        </div>\n        <!-- Grid column -->\n    \n\n   \n</div>"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".NewUserPanel {\n  width: 60%;\n  margin: 0 auto; }\n\n.HomeTittle {\n  text-align: center; }\n\n.logginForm {\n  width: 60%;\n  margin: 0 auto; }\n\n.userCard {\n  margin: 0 auto; }\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/notification.service */ "./src/app/services/notification.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomeComponent = /** @class */ (function () {
    function HomeComponent(httpClient, authService, router, notificationService) {
        this.httpClient = httpClient;
        this.authService = authService;
        this.router = router;
        this.notificationService = notificationService;
        this.employee = false;
        this.auth = false; // sjekker om bruker er logget inn (false by default)
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'Content-Type': 'application/json',
            })
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        Notification.requestPermission().then(function (result) {
        });
        if (this.authService.getUserCredentials()) {
            this.auth = true;
        }
    };
    HomeComponent.prototype.sendMessage = function (name, employee, userId) {
        this.authService.sendMessage("logged in as user " + name, employee, userId);
    };
    HomeComponent.prototype.onSubmit = function (f) {
        var inputData = f.value;
        this.message = inputData.username;
        if (!inputData.username || !inputData.password) {
            this.notificationService.notifyInvalidCredentials();
        }
        else {
            this.loggIn(inputData);
        }
    };
    HomeComponent.prototype.loggIn = function (data) {
        var _this = this;
        var payload = {
            Username: data.username,
            Password: data.password,
            IsEmployee: this.employee
        };
        console.log(payload);
        var authUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].ApiUrl + "/auth";
        this.httpClient.post(authUrl, payload, this.httpOptions)
            .subscribe(function (data) {
            if (data['creds_id'] && data['password'] && data['username']) {
                _this.auth = true;
                _this.notificationService.notifyUponSubmission();
                _this.sendMessage(data['username'], _this.employee, data['creds_id']);
            }
            (function (error) {
                _this.notificationService.alertApiError(error);
            });
        });
    };
    HomeComponent.prototype.redirectUser = function (route) {
        if (route == 'history') {
            this.router.navigate(['/user' + '/' + this.authService.getId()]);
        }
        else {
            this.router.navigate(['/order']);
        }
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")]
        }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
            ],
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Navbar-->\n<mdb-navbar SideClass=\"navbar navbar-expand-lg navbar-dark indigo\">\n  <!-- Navbar brand -->\n  <logo><a class=\"navbar-brand\" href=\"#\">Sykkelutleie</a></logo>\n  <!-- Collapsible content -->\n  <links>\n      <!-- Links -->\n      <ul class=\"navbar-nav mr-auto\">\n        <li class=\"nav-item waves-light\" mdbRippleRadius>\n            <a class=\"nav-link\" href=\"#\" >Home</a>\n        </li>\n        <li class=\"nav-item waves-light\" mdbRippleRadius>\n            <a class=\"nav-link\" href=\"#equipment\">Ustyr</a>\n        </li>\n        <li class=\"nav-item waves-light\" mdbRippleRadius>\n            <a class=\"nav-link\" href=\"#admin\">Ansatte</a>\n        </li>\n        <li class=\"nav-item waves-light\" mdbRippleRadius>\n            <a class=\"nav-link\" href=\"#order\">Bestille utstyr</a>\n        </li>\n        <li class=\"nav-item waves-light\" mdbRippleRadius>\n            <a class=\"nav-link\" (click)=\"loggOff()\">Logg ut</a>\n        </li>\n      </ul>\n      <!-- Links -->\n  </links>\n  <!-- Collapsible content -->\n</mdb-navbar>\n<!--/.Navbar-->\n          "

/***/ }),

/***/ "./src/app/navbar/navbar.component.scss":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authService) {
        this.authService = authService;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.loggOff = function () {
        console.log(window);
        //window.location.reload();
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.scss */ "./src/app/navbar/navbar.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/order/order.component.html":
/*!********************************************!*\
  !*** ./src/app/order/order.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n\n    <div class=\"orderInputFields col-md-6\">\n        \n        <p>Er det fler som skal ha utstyr?</p>\n        <button type=\"button\" class=\"btn btn-primary waves-light\" (click)=\"multiplePeople('yes')\" mdbWavesEffect>Ja</button>\n        <button type=\"button\" class=\"btn btn-primary waves-light\" (click)=\"multiplePeople('no')\" mdbWavesEffect>Nei</button>\n        \n        <h5 *ngIf=\"groups\">Antall Personer:</h5>\n        <div class=\"btn-group\" *ngIf=\"groups\">\n            <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"personModel\" (click)=\"addPerson(1)\" mdbRadio=\"1\" mdbWavesEffect>\n                1\n            </label>\n            <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"personModel\" (click)=\"addPerson(2)\" mdbRadio=\"2\" mdbWavesEffect>\n                2\n            </label>\n            <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"personModel\" (click)=\"addPerson(3)\" mdbRadio=\"3\" mdbWavesEffect>\n                3\n            </label>\n            <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"personModel\" (click)=\"addPerson(4)\" mdbRadio=\"4\" mdbWavesEffect>\n                4\n            </label>\n            <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"personModel\" (click)=\"addPerson(5)\" mdbRadio=\"5\" mdbWavesEffect>\n                5\n            </label>\n            <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"personModel\" (click)=\"addPerson(6)\" mdbRadio=\"6\" mdbWavesEffect>\n                6\n            </label>\n        </div>\n        \n        <br/>\n        <br/>\n        <p>Skal dere leie i timer eller dager?</p>\n        <button type=\"button\" class=\"btn btn-primary waves-light\" (click)=\"daysOrHours('hours')\" mdbWavesEffect>Timer</button>\n        <button type=\"button\" class=\"btn btn-primary waves-light\" (click)=\"daysOrHours('days')\" mdbWavesEffect>Dager</button>\n        \n        <br/>\n        <br/>\n        <div *ngIf=\"days\">\n            \n            <h5>Antall dager:</h5>\n            <div class=\"btn-group\">\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"dayModel\" (click)=\"addDays(1)\" mdbRadio=\"1\" mdbWavesEffect>\n                    1\n                </label>\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"dayModel\" (click)=\"addDays(2)\" mdbRadio=\"2\" mdbWavesEffect>\n                    2\n                </label>\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"dayModel\" (click)=\"addDays(3)\" mdbRadio=\"3\" mdbWavesEffect>\n                    3\n                </label>\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"dayModel\" (click)=\"addDays(4)\" mdbRadio=\"4\" mdbWavesEffect>\n                    4\n                </label>\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"dayModel\" (click)=\"addDays(5)\" mdbRadio=\"5\" mdbWavesEffect>\n                    5\n                </label>\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"dayModel\" (click)=\"addDays(6)\" mdbRadio=\"6\" mdbWavesEffect>\n                    6\n                </label>\n            </div>\n        </div>\n        <div *ngIf=\"hours\">\n            <h5>Antall timer:</h5>\n            <div class=\"btn-group\">\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"hourModel\" (click)=\"addHour(1)\" mdbRadio=\"1\" mdbWavesEffect>\n                    1\n                </label>\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"hourModel\" (click)=\"addHour(2)\" mdbRadio=\"2\" mdbWavesEffect>\n                    2\n                </label>\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"hourModel\" (click)=\"addHour(3)\" mdbRadio=\"3\" mdbWavesEffect>\n                    3\n                </label>\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"hourModel\" (click)=\"addHour(4)\" mdbRadio=\"4\" mdbWavesEffect>\n                    4\n                </label>\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"hourModel\" (click)=\"addHour(5)\" mdbRadio=\"5\" mdbWavesEffect>\n                    5\n                </label>\n                <label class=\"btn btn-primary waves-light\" [(ngModel)]=\"hourModel\" (click)=\"addHour(6)\" mdbRadio=\"6\" mdbWavesEffect>\n                    6\n                </label>\n            </div>\n        </div>\n        <br />\n        <br />\n        <div class=\"btn-group\" dropdown>\n            <button dropdownToggle type=\"button\"  class=\"btn btn-primary dropdown-toggle waves-light\" mdbWavesEffect>\n                <i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i>\n                Type sykkel\n            </button>\n            \n            <div class=\"dropdown-menu dropdown-primary\">\n                <a class=\"dropdown-item\" *ngFor=\"let bike of bikeEquipmnet\" (click)=\"addEquipOrBike(bike, 'bike')\" >{{bike.name}}</a>\n            </div>\n        </div>\n        <div class=\"btn-group\" dropdown>\n            <button dropdownToggle type=\"button\" class=\"btn btn-primary dropdown-toggle waves-light\" mdbWavesEffect>\n                <i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i>\n                Type utstyr for denne sykkelen\n            </button>\n            \n            <div class=\"dropdown-menu dropdown-primary\">\n                <a class=\"dropdown-item\" *ngFor=\"let equipment of nonBikeEquipment\" (click)=\"addEquipOrBike(equipment, 'equipment')\">{{equipment.name}}</a>\n            </div>\n        </div>\n    </div>\n    \n    \n    \n    \n    <!--Panel-->\n    <div class=\"card card-body col-md-5 orderSummary\">\n        <h4 class=\"card-title\">Nåværende bestilling</h4>\n        <p>bestilling for: {{personModel}} person(er)</p>\n        <p *ngIf=\"hours\">bestilling for: {{hourModel}} timer</p>\n        <p *ngIf=\"days\">bestilling for: {{dayModel}} dager</p>\n        <p>Utstyr:</p>\n        <ul *ngFor=\"let equipment of selectedEquipment\">\n            <li>{{equipment.name}}, {{equipment.type}}, <span *ngIf=\"days\">pris: {{equipment.dailyPrice}}</span> <span *ngIf=\"hours\">pris: {{equipment.hourPrice}}</span></li>\n        </ul>\n        <p>Sykkel:</p>\n        <ul *ngFor=\"let bike of selectedBike\">\n            <li>{{bike.name}}, {{bike.type}}, <span *ngIf=\"days\">pris: {{bike.dailyPrice}}</span> <span *ngIf=\"hours\">pris: {{bike.hourPrice}}</span></li>\n        </ul>\n        <br/>\n        <p>Total pris:</p>\n        <p>{{totalPrice}}</p>\n    </div>\n    <!--/.Panel-->\n    <hr>\n    <button class=\"btn btn-primary orderSubmit\" (click)=\"submitOrder()\"> Sende bestilling </button>\n</div>"

/***/ }),

/***/ "./src/app/order/order.component.scss":
/*!********************************************!*\
  !*** ./src/app/order/order.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".orderInputFields {\n  padding: 2.5%; }\n\n.orderSummary {\n  padding: 2.5%; }\n\n.orderSubmit {\n  margin: 0 auto; }\n"

/***/ }),

/***/ "./src/app/order/order.component.ts":
/*!******************************************!*\
  !*** ./src/app/order/order.component.ts ***!
  \******************************************/
/*! exports provided: OrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderComponent", function() { return OrderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/notification.service */ "./src/app/services/notification.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OrderComponent = /** @class */ (function () {
    function OrderComponent(authService, notificationService, httpClient) {
        this.authService = authService;
        this.notificationService = notificationService;
        this.httpClient = httpClient;
        //scope variables
        this.personModel = "1";
        this.daysModel = "1";
        this.hourModel = "1";
        //payload variables for creating order:
        this.selectedEquipment = Array();
        this.selectedBike = Array();
        this.totalPrice = 0;
        this.userName = "Gjest";
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
    }
    OrderComponent.prototype.ngOnInit = function () {
        this.fetchEquipment();
        this.getEmployees();
        this.userId = this.authService.getId();
    };
    OrderComponent.prototype.fetchEquipment = function () {
        var _this = this;
        var equipmentEndpoint = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/bike";
        this.httpClient.get(equipmentEndpoint, this.httpOptions)
            .subscribe(function (data) {
            console.log(data);
            _this.equipmentList = data;
        }, function (error) { return function () {
        }; }, function () {
            _this.filterEquipment(_this.equipmentList);
        });
    };
    OrderComponent.prototype.filterEquipment = function (list) {
        this.nonBikeEquipment = list.filter(function (element) {
            return element.type != "Sykkel" && element.status == "klar";
        });
        this.bikeEquipmnet = list.filter(function (element) {
            return element.type == "Sykkel" && element.status == "klar";
        });
    };
    OrderComponent.prototype.getEmployees = function () {
        var _this = this;
        var EmploymentUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/employee";
        this.httpClient.get(EmploymentUrl, this.httpOptions)
            .subscribe(function (data) {
            _this.employess = data;
        }, function (error) { return function () {
            console.log("error:");
        }; }, function () {
            _this.employee = Math.floor((Math.random() * _this.employess.length) + 1);
        });
    };
    OrderComponent.prototype.addPerson = function (numOfPeople) {
        this.personModel = numOfPeople.toString();
        return numOfPeople;
    };
    OrderComponent.prototype.addDays = function (numOfDays) {
        this.daysModel = numOfDays.toString();
        return numOfDays;
    };
    OrderComponent.prototype.addHour = function (numOfHours) {
        this.hourModel = numOfHours.toString();
        this.determineDate();
        return numOfHours;
    };
    OrderComponent.prototype.daysOrHours = function (choice) {
        if (choice == 'hours') {
            this.hours = true;
            ;
            this.days = false;
        }
        else {
            this.hours = false;
            this.days = true;
        }
    };
    OrderComponent.prototype.multiplePeople = function (choice) {
        if (choice == 'yes') {
            this.groups = true;
        }
        else {
            this.groups = false;
            this.personModel = "1";
        }
    };
    OrderComponent.prototype.addEquipOrBike = function (item, dropdown) {
        if (dropdown == 'bike') {
            this.selectedBike.push(item);
        }
        else {
            this.selectedEquipment.push(item);
        }
    };
    OrderComponent.prototype.checkCredentials = function () {
        this.userName = this.authService.getUserCredentials();
    };
    OrderComponent.prototype.getDayOrHours = function () {
        if (this.hours) {
            return "hourPrice";
        }
        else {
            return "dailyPrice";
        }
    };
    OrderComponent.prototype.calculatePrice = function () {
        var _this = this;
        var price = this.getDayOrHours();
        try {
            this.selectedBike.forEach(function (element) {
                var elementPrice = element[price];
                _this.totalPrice = _this.totalPrice + elementPrice;
            });
            this.selectedEquipment.forEach(function (element) {
                var elementPrice = element[price];
                _this.totalPrice = _this.totalPrice + elementPrice;
            });
        }
        catch (e) {
            console.log(e);
        }
    };
    OrderComponent.prototype.submitOrder = function () {
        var _this = this;
        var createOrderUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/order";
        this.checkCredentials();
        console.log(this.userName);
        if (this.userName == 'Gjest' || !this.userName) {
            this.notificationService.notifyInvalidOrder();
        }
        else {
            this.getDayOrHours();
            this.calculatePrice();
            var payload = {
                Price: this.totalPrice,
                IsGroupOrder: this.groups ? 1 : 0,
                Customer_id: this.userId,
                Employee_id: this.employee,
                OrderDate: new Date(),
                IsAvailableFrom: new Date(),
                MustBeDeliveredBefore: this.determineDate() // denne må avgjøres basert på valg av timer eller dagr
            };
            console.log(payload);
            this.httpClient.post(createOrderUrl, payload, this.httpOptions)
                .subscribe(function (data) {
                _this.orderId = data[0].order_id;
                console.log(_this.orderId);
                _this.linkEquipmentToOrder();
            });
        }
    };
    OrderComponent.prototype.determineDate = function () {
        if (this.hours) {
            console.log(parseInt(this.hourModel));
            return new Date().setHours(parseInt(this.hourModel));
        }
        else {
            console.log(parseInt(this.daysModel));
            return new Date(+parseInt(this.daysModel));
        }
    };
    OrderComponent.prototype.linkEquipmentToOrder = function () {
        var _this = this;
        var equipmentAndOrderUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/bikeandorder";
        this.selectedBike.forEach(function (element) {
            var payload = {
                Bike_Id: element['bike_id'],
                Order_Id: _this.orderId
            };
            _this.httpClient.post(equipmentAndOrderUrl, payload, _this.httpOptions)
                .subscribe(function (data) {
                console.log(data);
            });
        });
        this.selectedEquipment.forEach(function (element) {
            var payload = {
                Bike_Id: element['bike_id'],
                Order_Id: _this.orderId
            };
            _this.httpClient.post(equipmentAndOrderUrl, payload, _this.httpOptions)
                .subscribe(function (data) {
                console.log(data);
            });
        });
        this.notificationService.notifyOrderCompleted(this.orderId);
        this.updateStatusOfRentedEquipment();
    };
    OrderComponent.prototype.updateStatusOfRentedEquipment = function () {
        var _this = this;
        this.selectedEquipment.forEach(function (element) {
            var updateUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/bike" + "/" + element['bike_id'];
            element['status'] = "utleid";
            var payload = {
                Bike_id: element['bike_id'],
                Name: element['name'],
                Type: element['type'],
                DailyPrice: element['dailyPrice'],
                HourPrice: element['hourPrice'],
                EquipmentCode: element['equipmentCode'],
                LastSeenOnPlace: element['lastSeenOnPlace'],
                BelongsToPlace: element['belongsToPlace'],
                WheelSize: element['wheelSize'],
                Frame: element['frame'],
                STATUS: element['status']
            };
            _this.httpClient.put(updateUrl, payload, _this.httpOptions)
                .subscribe(function (data) {
                console.log(data);
            });
        });
    };
    OrderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-order',
            template: __webpack_require__(/*! ./order.component.html */ "./src/app/order/order.component.html"),
            styles: [__webpack_require__(/*! ./order.component.scss */ "./src/app/order/order.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _services_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], OrderComponent);
    return OrderComponent;
}());



/***/ }),

/***/ "./src/app/register/register.component.html":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-6\">\n\n    <div class=\"btn-group\" dropdown>\n      <button dropdownToggle type=\"button\" class=\"btn btn-primary dropdown-toggle waves-light\" mdbWavesEffect>\n        Velg område:\n    </button>\n    \n    <div class=\"dropdown-menu dropdown-primary\">\n      <a class=\"dropdown-item\" *ngFor=\"let place of placesList\" (click)=\"addPlace(place)\">{{place.name}}</a>\n    </div>\n  </div>\n  \n  <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\" novalidate class=\"col-md-6 padd\">\n    <div class=\"md-form\">\n      <input type=\"text\" class=\"form-control\" mdbActive ngModel name=\"FirstName\">\n      <label for=\"form1\">Fornavn:</label>\n    </div>\n    \n    <div class=\"md-form\">\n      <input type=\"text\" class=\"form-control\" mdbActive ngModel name=\"LastName\">\n      <label for=\"form1\">Etternavn:</label>\n    </div>\n    \n    <div class=\"md-form\">\n      <input type=\"tel\" class=\"form-control\" mdbActive ngModel name=\"Phone\">\n      <label for=\"form1\">Telefon</label>\n    </div>\n    \n    <div class=\"md-form\">\n      <input type=\"email\" class=\"form-control\" mdbActive ngModel name=\"Email\">\n      <label for=\"form1\">Brukernavn</label>\n    </div>\n    \n    \n    <div class=\"md-form\">\n      <input type=\"password\" class=\"form-control\" mdbActive ngModel name=\"Password\">\n      <label for=\"form1\">Passord</label>\n    </div>\n    \n    <div class=\"md-form\">\n      <input type=\"password\" class=\"form-control\" mdbActive ngModel name=\"secondPassword\">\n      <label for=\"form1\">Gjenta passord</label>\n    </div>\n    \n    <div class=\"text-center\">\n      <button class=\"btn btn-primary\" mdbRippleRadius>\n        <i class=\"fa fa-send mr-1\"></i> Registrer</button>\n      </div>\n    </form>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"card-deck\">\n      <!--Panel-->\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">Til informasjon: </h5>\n          <p class=\"card-text\">Alle feltene må være fylt ut!</p>\n        </div>\n      </div>\n      <!--/.Panel-->\n\n      <!--Panel-->\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">Valgt plass:</h5>\n          <p class=\"card-text\">\n            {{place.name}}\n          </p>\n          <p class=\"card-text\">\n            post nummer: {{place.postalCode}}\n          </p>\n          <p class=\"card-text\">\n            <small class=\"text-muted\">Last updated {{date}}</small>\n          </p>\n        </div>\n      </div>\n      <!--/.Panel-->\n\n    </div>\n\n  </div>"

/***/ }),

/***/ "./src/app/register/register.component.scss":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".padd {\n  padding: 5%; }\n"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/notification.service */ "./src/app/services/notification.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(httpClient, notificationService) {
        this.httpClient = httpClient;
        this.notificationService = notificationService;
        this.date = new Date();
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.fetchPlaces();
    };
    RegisterComponent.prototype.fetchPlaces = function () {
        var _this = this;
        var placesUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].ApiUrl + "/place";
        this.httpClient.get(placesUrl, this.httpOptions)
            .subscribe(function (data) {
            console.log(data);
            _this.placesList = data;
        }, function (error) { return function () {
            console.log("error:");
        }; }, function () {
            console.log("succes for places");
        });
    };
    RegisterComponent.prototype.addPlace = function (item) {
        this.place = item;
        console.log(this.place);
        this.date = new Date();
    };
    RegisterComponent.prototype.onSubmit = function (f) {
        console.log(f.value);
        var input = f.value;
        if (input.Password == input.secondPassword) {
            this.preparePayload(f.value);
        }
        else {
            //Todo: legg til notification-service
            console.log("password mismatch");
        }
    };
    RegisterComponent.prototype.preparePayload = function (formData) {
        var payload = {
            FirstName: formData.FirstName,
            LastName: formData.LastName,
            Phone: formData.Phone,
            Email: formData.Email,
            Password: formData.Password,
            Location: this.place['place_id'],
        };
        console.log(payload);
        this.submitCustomer(payload);
    };
    RegisterComponent.prototype.submitCustomer = function (payload) {
        var _this = this;
        var newCustomerUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].ApiUrl + "/customer";
        this.httpClient.post(newCustomerUrl, payload, this.httpOptions)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) { return function () {
            console.log("error:");
        }; }, function () {
            _this.notificationService.notifyCustomerCreated();
        });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _services_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
//source: http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import * as shajs from 'sha.js/index.js';
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.subject = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    AuthService.prototype.sendMessage = function (message, employee, userId) {
        this.message = message;
        this.employee = employee;
        this.userId = userId;
        this.subject.next({
            text: message,
            status: employee
        });
    };
    AuthService.prototype.clearMessage = function () {
        this.message = null;
        this.employee = null;
        this.userId = null;
    };
    AuthService.prototype.getUserCredentials = function () {
        return this.message;
    };
    AuthService.prototype.checkEmployment = function () {
        return this.employee;
    };
    AuthService.prototype.getId = function () {
        return this.userId;
    };
    AuthService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    AuthService.prototype.getHash = function () {
        var hash = "hei";
        //shajs("SHA-512", "TEXT");
        return hash;
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/notification.service.ts":
/*!**************************************************!*\
  !*** ./src/app/services/notification.service.ts ***!
  \**************************************************/
/*! exports provided: NotificationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationService", function() { return NotificationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotificationService = /** @class */ (function () {
    function NotificationService() {
    }
    NotificationService.prototype.notifyInvalidOrder = function () {
        var error = new Notification("Feil:", {
            body: "Du kan ikke lagen en bestilling uten å være logget inn",
            icon: '../assets/icons/bike-21-512.png'
        });
        setTimeout(error.close.bind(error), 8000);
    };
    NotificationService.prototype.notifyEquipmentRecieved = function () {
        var validLogging = new Notification("Utstyr fra databasen er mottat", {
            body: "Her har du oversikt over alt utstyret vi kan tilby",
            icon: '../assets/icons/bike-21-512.png'
        });
        setTimeout(validLogging.close.bind(validLogging), 8000);
    };
    NotificationService.prototype.notifyUponSubmission = function () {
        var validLogging = new Notification("Du er logget inn", {
            body: "Nå kan du velge område og tidsrom du vil leie utstyr i",
            icon: '../assets/icons/bike-21-512.png'
        });
        setTimeout(validLogging.close.bind(validLogging), 8000);
    };
    NotificationService.prototype.notifyCustomerCreated = function () {
        var validCreation = new Notification("Brukeren er lagt", {
            body: "Nå kan du leie utstyr",
            icon: '../assets/icons/bike-21-512.png'
        });
        setTimeout(validCreation.close.bind(validCreation), 8000);
    };
    NotificationService.prototype.notifyOrderCompleted = function (orderId) {
        var validCreation = new Notification("Bestilling lagret", {
            body: "med id: " + orderId,
            icon: '../assets/icons/bike-21-512.png'
        });
        setTimeout(validCreation.close.bind(validCreation), 8000);
    };
    NotificationService.prototype.notifyInvalidCredentials = function () {
        var validCreation = new Notification("Ugyldig logg inn", {
            body: "Vi finner ikke denne brukeren i databasen",
            icon: '../assets/icons/bike-21-512.png'
        });
        setTimeout(validCreation.close.bind(validCreation), 8000);
    };
    NotificationService.prototype.alertApiError = function (error) {
        var errorMessage = new Notification("Feil:", {
            body: "" + error.toString(),
            icon: '../assets/icons/bike-21-512.png'
        });
    };
    NotificationService.prototype.notifyOrderRecordsRecieved = function (recordLength) {
        var orderRecords = new Notification("Bestillinger er hentet", {
            body: "Vi fant " + recordLength + " bestilinger for denne brukeren",
            icon: '../assets/icons/bike-21-512.png'
        });
        setTimeout(orderRecords.close.bind(orderRecords), 8000);
    };
    NotificationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], NotificationService);
    return NotificationService;
}());



/***/ }),

/***/ "./src/app/services/order.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/order.service.ts ***!
  \*******************************************/
/*! exports provided: OrderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderService", function() { return OrderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrderService = /** @class */ (function () {
    function OrderService() {
    }
    OrderService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], OrderService);
    return OrderService;
}());



/***/ }),

/***/ "./src/app/user/user.component.html":
/*!******************************************!*\
  !*** ./src/app/user/user.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<!--Section: Blog v.1-->\n<section class=\"py-4 text-center text-lg-left orderSection\">\n    <!--Grid row-->\n    <div class=\"row pb-5\">\n\n        <!--Grid column-->\n        <div class=\"col-lg-4 col-xl-4 pb-2\">\n            <!--Featured image-->\n            <div class=\"view overlay rounded z-depth-2 waves-light\" mdbWavesEffect>\n                <img src=\"./assets/bike.jpg\" alt=\"Thrid image in the blog listing.\" class=\"img-fluid\">\n                <a>\n                    <div class=\"mask rgba-white-slight\"></div>\n                </a>\n            </div>\n        </div>\n        <!--Grid column-->\n\n        <!--Grid column-->\n        <div class=\"col-lg-7 col-xl-7\">\n            <!--Excerpt-->\n            <a href=\"\" class=\"indigo-text\">\n                <h6 class=\"font-weight-bold pb-1\">\n                    <i class=\"fa fa-bicycle\"></i> Sykkler og utstyr</h6>\n            </a>\n            <h3 class=\"mb-4 font-weight-bold dark-grey-text\">\n                <strong>Her finner du alle de tidligere bestillingene fra oss</strong>\n            </h3>\n            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur\n                magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro qui dolorem ipsum quia sit\n                amet, consectetur.</p>\n            <p>by\n                <a>\n                    <strong>Sykkelutleie</strong>\n                </a>, {{date}}</p>\n        </div>\n        <!--Grid column-->\n\n    </div>\n    <!--Grid row-->\n\n</section>\n<!--Section: Blog v.1-->\n\n<table class=\"table orderSection\">\n    <thead class=\"blue-grey lighten-4 orderSection\">\n        <tr>\n            <th>Ordre id:</th>\n            <th>Pris:</th>\n            <th>Ordre dato:</th>\n        </tr>\n    </thead>\n    <tbody class=\"orderSection\" >\n      <tr *ngFor=\"let order of orderRecords; let i = index\">\n        <td>\n          {{order.order_id}}\n          <button \n                type=\"button\" \n                class=\"btn btn-primary relative waves-light\" \n                (click)=\"statusModal.show(); modalTrigger(i)\" \n                mdbWavesEffect\n                >\n                    Mer informasjon:\n                </button>\n\n        </td>\n        <td>{{order.price}}</td>\n        <td>{{order.orderDate}}</td>\n      </tr>\n    </tbody>\n</table>\n\n<div mdbModal #statusModal=\"mdb-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mystatusModalLabel\" aria-hidden=\"true\" [config]=\"{backdrop: false, ignoreBackdropClick: true}\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"statusModal.hide(); clearEquipmentInfo()\">\n                    <span aria-hidden=\"true\">×</span>\n                </button>\n                <h4 class=\"modal-title w-100\" id=\"myModalLabel\">Utstyr for denne bestillingen</h4>\n            </div>\n            <div class=\"modal-body\">\n                <ul *ngFor=\"let bike of equipmentRecordForOrder\">\n                    <li>\n                        <span>Navn: {{bike.name}}</span>\n                        &ensp; &ensp;\n                        <span>Type: {{bike.type}}</span>\n                        &ensp; &ensp;\n                        <span>Status: {{bike.status}}</span>\n                        &ensp; &ensp;\n                    </li>\n                </ul>\n                <p>Trukk enten på Lukk eller x når du skal ut av vinduet</p>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary waves-light\" aria-label=\"Close\" (click)=\"statusModal.hide(); clearEquipmentInfo()\" mdbWavesEffect>Lukk</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/user/user.component.scss":
/*!******************************************!*\
  !*** ./src/app/user/user.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".orderSection {\n  padding: 2.5%; }\n"

/***/ }),

/***/ "./src/app/user/user.component.ts":
/*!****************************************!*\
  !*** ./src/app/user/user.component.ts ***!
  \****************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/notification.service */ "./src/app/services/notification.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserComponent = /** @class */ (function () {
    function UserComponent(authService, notificationService, httpClient) {
        this.authService = authService;
        this.notificationService = notificationService;
        this.httpClient = httpClient;
        this.orderRecords = Array();
        this.equipmentRecordForOrder = Array();
        this.date = new Date();
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
    }
    UserComponent.prototype.ngOnInit = function () {
        if (this.authService.getId()) {
            this.fetchOrderIds();
        }
    };
    UserComponent.prototype.fetchOrderIds = function () {
        var _this = this;
        var iDUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/orderbyuser";
        var payload = { id: this.authService.getId() };
        this.httpClient.post(iDUrl, payload, this.httpOptions)
            .subscribe(function (data) {
            _this.orderIdForUser = data;
            console.log(_this.orderIdForUser);
        }, function (error) {
            _this.notificationService.alertApiError(error);
        }, function () {
            _this.fetchOrders();
        });
    };
    UserComponent.prototype.fetchOrders = function () {
        var _this = this;
        this.orderIdForUser.forEach(function (element) {
            var orderUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + '/order' + '/' + element;
            _this.httpClient.get(orderUrl, _this.httpOptions)
                .subscribe(function (data) {
                _this.orderRecords.push(data[0]);
            }, function (error) {
                _this.notificationService.alertApiError(error);
            }, function () {
            });
        });
        this.notificationService.notifyOrderRecordsRecieved(this.orderRecords.length);
    };
    UserComponent.prototype.modalTrigger = function (index) {
        var _this = this;
        var selectedOrderRecord = Array();
        var orderEquipmentUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/orderbyuser" + "/" + this.orderRecords[index]['order_id'];
        this.httpClient.get(orderEquipmentUrl, this.httpOptions)
            .subscribe(function (data) {
            selectedOrderRecord = data;
            _this.fetchEquipmentInfoForSelectedOrderId(selectedOrderRecord);
        });
    };
    UserComponent.prototype.fetchEquipmentInfoForSelectedOrderId = function (orderRecord) {
        var _this = this;
        orderRecord.forEach(function (element) {
            var equipmentInfoUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].ApiUrl + "/bike" + "/" + element['bike_id'];
            _this.httpClient.get(equipmentInfoUrl, _this.httpOptions)
                .subscribe(function (data) {
                console.log(data);
                _this.equipmentRecordForOrder.push(data[0]);
            });
        });
    };
    UserComponent.prototype.clearEquipmentInfo = function () {
        this.equipmentRecordForOrder = [];
    };
    UserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user',
            template: __webpack_require__(/*! ./user.component.html */ "./src/app/user/user.component.html"),
            styles: [__webpack_require__(/*! ./user.component.scss */ "./src/app/user/user.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _services_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    ApiUrl: "http://localhost:5000/api",
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/thinkpad/personalWork/prosjektOppgaveGruppe2/UI/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map