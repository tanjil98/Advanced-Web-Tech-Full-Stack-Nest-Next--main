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
exports.AdminEntity = void 0;
const manager_entity_1 = require("../../manager/manager.entity");
const typeorm_1 = require("typeorm");
const adminprofile_entity_1 = require("./adminprofile.entity");
let AdminEntity = class AdminEntity {
};
exports.AdminEntity = AdminEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fullname', type: "varchar", length: 150 }),
    __metadata("design:type", String)
], AdminEntity.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], AdminEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminEntity.prototype, "filenames", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => manager_entity_1.ManagerEntity, (manager) => manager.admin),
    __metadata("design:type", Array)
], AdminEntity.prototype, "managers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => adminprofile_entity_1.AdminProfile, AdminProfile => AdminProfile.AdminEntity, { cascade: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", adminprofile_entity_1.AdminProfile)
], AdminEntity.prototype, "AdminProfile", void 0);
exports.AdminEntity = AdminEntity = __decorate([
    (0, typeorm_1.Entity)("Admin")
], AdminEntity);
//# sourceMappingURL=admin.entity.js.map