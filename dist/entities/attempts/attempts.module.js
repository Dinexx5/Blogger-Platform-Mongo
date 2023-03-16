"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const attempts_repository_1 = require("./attempts.repository");
const attempts_schema_1 = require("./attempts.schema");
const rate_limit_guard_1 = require("../auth/guards/rate-limit.guard");
let AttemptsModule = class AttemptsModule {
};
AttemptsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: attempts_schema_1.Attempt.name, schema: attempts_schema_1.AttemptSchema }])],
        providers: [attempts_repository_1.AttemptsRepository, rate_limit_guard_1.RateLimitGuard],
        exports: [attempts_repository_1.AttemptsRepository, rate_limit_guard_1.RateLimitGuard],
    })
], AttemptsModule);
exports.AttemptsModule = AttemptsModule;
//# sourceMappingURL=attempts.module.js.map