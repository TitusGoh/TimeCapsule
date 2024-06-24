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
exports.OpenpageComponent = void 0;
var core_1 = require("@angular/core");
var OpenpageComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-openpage',
            templateUrl: './openpage.component.html',
            styleUrl: './openpage.component.css'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OpenpageComponent = _classThis = /** @class */ (function () {
        function OpenpageComponent_1(capsuleProxyService, router) {
            this.capsuleProxyService = capsuleProxyService;
            this.router = router;
            this.openCapsules = [];
            this.displayedColumns = ['capsuleID', 'name', 'description', 'createdDate', 'openDate'];
        }
        OpenpageComponent_1.prototype.ngOnInit = function () {
            this.getCapsules();
        };
        OpenpageComponent_1.prototype.getCapsules = function () {
            var _this = this;
            this.capsuleProxyService.getCapsuleList()
                .subscribe(function (lists) {
                _this.openCapsules = lists.filter(function (capsule) { return capsule.capsule.completed && _this.isOpenDateAfterToday(capsule.capsule.openDate); });
            }, function (error) {
                console.error('Error fetching lists:', error);
            });
        };
        OpenpageComponent_1.prototype.isOpenDateAfterToday = function (openDate) {
            var today = new Date();
            var openDateObj = new Date(openDate);
            return openDateObj > today;
        };
        OpenpageComponent_1.prototype.viewCapsule = function (capsuleID) {
            this.router.navigate(['/view', capsuleID]);
        };
        return OpenpageComponent_1;
    }());
    __setFunctionName(_classThis, "OpenpageComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OpenpageComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OpenpageComponent = _classThis;
}();
exports.OpenpageComponent = OpenpageComponent;
