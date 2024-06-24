"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapsuleproxyService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var CapsuleproxyService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CapsuleproxyService = _classThis = /** @class */ (function () {
        function CapsuleproxyService_1(httpClient) {
            this.httpClient = httpClient;
            this.hostUrl = 'http://localhost:8080/';
        }
        CapsuleproxyService_1.prototype.handleError = function (error) {
            if (error.status === 401 && error.error && error.error.redirectUrl) {
                // Redirect to the provided URL
                window.location.href = error.error.redirectUrl;
                return (0, rxjs_1.throwError)('User is not authenticated. Redirecting to login.');
            }
            else {
                // Handle other errors
                return (0, rxjs_1.throwError)('An error occurred: ' + error.message);
            }
        };
        CapsuleproxyService_1.prototype.getCapsuleList = function () {
            return this.httpClient.get(this.hostUrl + 'capsuleList', { withCredentials: true })
                .pipe((0, operators_1.catchError)(this.handleError));
        };
        CapsuleproxyService_1.prototype.getCapsule = function (capsuleID) {
            return this.httpClient.get(this.hostUrl + "capsuleList/".concat(capsuleID), { withCredentials: true })
                .pipe((0, operators_1.catchError)(this.handleError));
        };
        CapsuleproxyService_1.prototype.createCapsule = function (formData) {
            return this.httpClient.post(this.hostUrl + 'capsuleList', formData, { responseType: 'text', withCredentials: true })
                .pipe((0, operators_1.catchError)(this.handleError));
        };
        CapsuleproxyService_1.prototype.updateCapsule = function (capsuleID, updateData) {
            return this.httpClient.put(this.hostUrl + "capsuleList/".concat(capsuleID), updateData, { withCredentials: true })
                .pipe((0, operators_1.catchError)(this.handleError));
        };
        CapsuleproxyService_1.prototype.deleteCapsule = function (capsuleID) {
            return this.httpClient.delete(this.hostUrl + "capsuleList/".concat(capsuleID), { withCredentials: true })
                .pipe((0, operators_1.catchError)(this.handleError));
        };
        CapsuleproxyService_1.prototype.deleteFile = function (fileID) {
            return this.httpClient.delete(this.hostUrl + "files/".concat(fileID), { withCredentials: true })
                .pipe((0, operators_1.catchError)(this.handleError));
        };
        CapsuleproxyService_1.prototype.addFilesToCapsule = function (capsuleID, formData) {
            return this.httpClient.post(this.hostUrl + "capsuleList/".concat(capsuleID, "/files"), formData, { withCredentials: true })
                .pipe((0, operators_1.catchError)(this.handleError));
        };
        return CapsuleproxyService_1;
    }());
    __setFunctionName(_classThis, "CapsuleproxyService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CapsuleproxyService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CapsuleproxyService = _classThis;
}();
exports.CapsuleproxyService = CapsuleproxyService;
