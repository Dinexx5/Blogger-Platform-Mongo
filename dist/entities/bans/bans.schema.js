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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanSchema = exports.Ban = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Ban = class Ban {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Ban.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Ban.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Ban.prototype, "isBanned", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Ban.prototype, "banReason", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Ban.prototype, "bannedBlogsId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Ban.prototype, "bannedPostsId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Ban.prototype, "bannedCommentsId", void 0);
Ban = __decorate([
    (0, mongoose_1.Schema)()
], Ban);
exports.Ban = Ban;
exports.BanSchema = mongoose_1.SchemaFactory.createForClass(Ban);
//# sourceMappingURL=bans.schema.js.map