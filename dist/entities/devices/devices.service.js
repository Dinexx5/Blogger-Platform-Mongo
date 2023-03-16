"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importStar(require("mongoose"));
const devices_repository_1 = require("./devices.repository");
const devices_schema_1 = require("./devices.schema");
const mongoose_2 = require("@nestjs/mongoose");
let DevicesService = class DevicesService {
    constructor(devicesRepository, deviceModel) {
        this.devicesRepository = devicesRepository;
        this.deviceModel = deviceModel;
        this.filter = { status: '204' };
    }
    async createDevice(userId, ip, deviceName, deviceId, issuedAt) {
        const deviceDTO = {
            _id: new mongoose_1.default.Types.ObjectId(),
            userId: userId,
            ip: ip,
            title: deviceName,
            deviceId: deviceId,
            lastActiveDate: issuedAt,
        };
        const deviceInstance = new this.deviceModel(deviceDTO);
        await this.devicesRepository.save(deviceInstance);
    }
    async findActiveDevices(userId) {
        const foundDevices = await this.devicesRepository.findSessions(userId);
        return foundDevices.map((device) => ({
            ip: device.ip,
            title: device.title,
            lastActiveDate: device.lastActiveDate,
            deviceId: device.deviceId,
        }));
    }
    async deleteSessionById(userId, deviceId) {
        const foundDevice = await this.devicesRepository.findSessionByDeviceId(deviceId);
        if (!foundDevice) {
            this.filter.status = '404';
            return this.filter.status;
        }
        if (foundDevice.userId.toString() !== userId.toString()) {
            this.filter.status = '403';
            return this.filter.status;
        }
        await foundDevice.deleteOne();
        this.filter.status = '204';
        return this.filter.status;
    }
};
DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(devices_schema_1.Device.name)),
    __metadata("design:paramtypes", [devices_repository_1.DevicesRepository,
        mongoose_1.Model])
], DevicesService);
exports.DevicesService = DevicesService;
//# sourceMappingURL=devices.service.js.map