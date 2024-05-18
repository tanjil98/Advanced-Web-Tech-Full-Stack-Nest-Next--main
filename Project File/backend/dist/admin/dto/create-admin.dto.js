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
exports.AdminUpdateDTO = exports.AdminLoginDTO = exports.AdminDTO = void 0;
const class_validator_1 = require("class-validator");
class AdminDTO {
}
exports.AdminDTO = AdminDTO;
__decorate([
    (0, class_validator_1.Matches)(/^[a-zA-Z]+$/, { message: "enter a proper name" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminDTO.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminDTO.prototype, "filenames", void 0);
class AdminLoginDTO {
}
exports.AdminLoginDTO = AdminLoginDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminLoginDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminLoginDTO.prototype, "password", void 0);
class AdminUpdateDTO {
}
exports.AdminUpdateDTO = AdminUpdateDTO;
//# sourceMappingURL=create-admin.dto.js.map