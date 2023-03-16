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
exports.deviceViewModel = exports.createDeviceModel = exports.DeviceSchema = exports.Device = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("@nestjs/mongoose");
let Device = class Device {
};
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], Device.prototype, "_id", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], Device.prototype, "userId", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Device.prototype, "ip", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Device.prototype, "title", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Device.prototype, "lastActiveDate", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Device.prototype, "deviceId", void 0);
Device = __decorate([
    (0, mongoose_2.Schema)()
], Device);
exports.Device = Device;
exports.DeviceSchema = mongoose_2.SchemaFactory.createForClass(Device);
class createDeviceModel {
}
exports.createDeviceModel = createDeviceModel;
class deviceViewModel {
}
exports.deviceViewModel = deviceViewModel;
//# sourceMappingURL=devices.schema.js.map