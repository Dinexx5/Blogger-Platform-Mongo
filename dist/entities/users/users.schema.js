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
exports.UserSchema = exports.User = exports.AccountDataSchema = exports.PasswordRecoverySchema = exports.EmailConfirmationSchema = exports.BanInfoSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let BanInfoSchema = class BanInfoSchema {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], BanInfoSchema.prototype, "isBanned", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BanInfoSchema.prototype, "banDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], BanInfoSchema.prototype, "banReason", void 0);
BanInfoSchema = __decorate([
    (0, mongoose_1.Schema)()
], BanInfoSchema);
exports.BanInfoSchema = BanInfoSchema;
let EmailConfirmationSchema = class EmailConfirmationSchema {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EmailConfirmationSchema.prototype, "confirmationCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], EmailConfirmationSchema.prototype, "expirationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], EmailConfirmationSchema.prototype, "isConfirmed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EmailConfirmationSchema.prototype, "createdAt", void 0);
EmailConfirmationSchema = __decorate([
    (0, mongoose_1.Schema)()
], EmailConfirmationSchema);
exports.EmailConfirmationSchema = EmailConfirmationSchema;
let PasswordRecoverySchema = class PasswordRecoverySchema {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], PasswordRecoverySchema.prototype, "recoveryCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], PasswordRecoverySchema.prototype, "expirationDate", void 0);
PasswordRecoverySchema = __decorate([
    (0, mongoose_1.Schema)()
], PasswordRecoverySchema);
exports.PasswordRecoverySchema = PasswordRecoverySchema;
let AccountDataSchema = class AccountDataSchema {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AccountDataSchema.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AccountDataSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AccountDataSchema.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AccountDataSchema.prototype, "passwordHash", void 0);
AccountDataSchema = __decorate([
    (0, mongoose_1.Schema)()
], AccountDataSchema);
exports.AccountDataSchema = AccountDataSchema;
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", AccountDataSchema)
], User.prototype, "accountData", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", EmailConfirmationSchema)
], User.prototype, "emailConfirmation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", PasswordRecoverySchema)
], User.prototype, "passwordRecovery", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", BanInfoSchema)
], User.prototype, "banInfo", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=users.schema.js.map