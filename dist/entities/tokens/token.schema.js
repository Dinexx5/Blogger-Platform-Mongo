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
exports.TokenSchema = exports.Token = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("@nestjs/mongoose");
let Token = class Token {
};
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], Token.prototype, "_id", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Token.prototype, "issuedAt", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Token.prototype, "expiredAt", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Token.prototype, "deviceId", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Token.prototype, "deviceName", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Token.prototype, "ip", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], Token.prototype, "userId", void 0);
Token = __decorate([
    (0, mongoose_2.Schema)()
], Token);
exports.Token = Token;
exports.TokenSchema = mongoose_2.SchemaFactory.createForClass(Token);
//# sourceMappingURL=token.schema.js.map