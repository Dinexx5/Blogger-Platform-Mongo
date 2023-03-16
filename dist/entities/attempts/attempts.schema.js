"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptSchema = exports.Attempt = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("@nestjs/mongoose");
let Attempt = class Attempt {
};
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], Attempt.prototype, "_id", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Attempt.prototype, "requestData", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Attempt.prototype, "date", void 0);
Attempt = __decorate([
    (0, mongoose_2.Schema)()
], Attempt);
exports.Attempt = Attempt;
exports.AttemptSchema = mongoose_2.SchemaFactory.createForClass(Attempt);
//# sourceMappingURL=attempts.schema.js.map