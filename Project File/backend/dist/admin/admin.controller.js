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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const admin_service_1 = require("./admin.service");
const session_guard_1 = require("./session.guard");
const manager_dto_1 = require("../manager/manager.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    sendMail() {
        return this.adminService.sendMail();
    }
    getAdmin() {
        return this.adminService.getIndex();
    }
    async getAdminByID(id) {
        const res = await this.adminService.getAdminByID(id);
        if (res !== null) {
            return await this.adminService.getAdminByID(id);
        }
        else {
            throw new exceptions_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getManagerByID(id) {
        const res = await this.adminService.getManagerByID(id);
        if (res !== null) {
            return await this.adminService.getManagerByID(id);
        }
        else {
            throw new exceptions_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
    getAdminByIDName(qry) {
        return this.adminService.getAllAdmin();
    }
    async getAdminByEmail(email) {
        const admin = await this.adminService.getAdminByEmail(email);
        if (admin !== null) {
            return admin;
        }
        else {
            throw new exceptions_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
    insertAdmin(mydto, file) {
        mydto.filenames = file.filename;
        return this.adminService.addAdmin(mydto);
    }
    updateAdmin(session, name) {
        return this.adminService.updateAdmin(name, session.email);
    }
    updateAdminbyID(id, data) {
        return this.adminService.updateAdminById(id, data);
    }
    updateManagerById(id, data) {
        return this.adminService.updateManagerById(id, data);
    }
    deleteAdminbyid(id) {
        return this.adminService.deleteAdminByID(id);
    }
    deleteManagerByID(id) {
        return this.adminService.deleteManagerByID(id);
    }
    getAllManagersWithAdmin() {
        return this.adminService.getAllManagerswithadmin();
    }
    getManagerByAdminID(id) {
        return this.adminService.getManagersByAdminID(id);
    }
    getImages(name, res) {
        res.sendFile(name, { root: './uploads' });
    }
    getAllManagers() {
        return this.adminService.getAllManagers();
    }
    addManagers(manager) {
        console.log(manager);
        return this.adminService.insertManager(manager);
    }
    signup(mydto, file) {
        mydto.filenames = file.filename;
        console.log(mydto);
        return this.adminService.signup(mydto);
    }
    async getimagebyid(adminId, res) {
        const filename = await this.adminService.getimagebyadminid(adminId);
        res.sendFile(filename, { root: './uploads' });
    }
    async signin(session, mydto) {
        const res = await (this.adminService.signin(mydto));
        if (res) {
            session.email = mydto.email;
            return (session.email);
        }
        return res;
    }
    signout(session) {
        if (session.destroy()) {
            return { message: "you are logged out" };
        }
        else {
            throw new exceptions_1.UnauthorizedException("invalid actions");
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "sendMail", null);
__decorate([
    (0, common_1.Get)('/index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Get)('/findadmin/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminByID", null);
__decorate([
    (0, common_1.Get)('/findmanager/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getManagerByID", null);
__decorate([
    (0, common_1.Get)('/findalladmin'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminByIDName", null);
__decorate([
    (0, common_1.Get)('/getadmin/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminByEmail", null);
__decorate([
    (0, common_1.Post)('insertadmin'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', { storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1600000000 }),
            new common_1.FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.AdminDTO, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "insertAdmin", null);
__decorate([
    (0, common_1.Put)('/updateadmin/'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Put)('/updateadmin/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_admin_dto_1.AdminUpdateDTO]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateAdminbyID", null);
__decorate([
    (0, common_1.Put)('/updatemanager/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, manager_dto_1.ManagerUpdateDTO]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateManagerById", null);
__decorate([
    (0, common_1.Delete)('/deleteadmin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteAdminbyid", null);
__decorate([
    (0, common_1.Delete)('/deletemanager/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteManagerByID", null);
__decorate([
    (0, common_1.Get)('/getallmanagerwithadmin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllManagersWithAdmin", null);
__decorate([
    (0, common_1.Get)('/findmanagersbyadmin/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getManagerByAdminID", null);
__decorate([
    (0, common_1.Get)('/getimage/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getImages", null);
__decorate([
    (0, common_1.Get)('/getallmanager'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllManagers", null);
__decorate([
    (0, common_1.Post)('/addmanager'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manager_dto_1.ManagerDTO]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "addManagers", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', { storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 16000000 }),
            new common_1.FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.AdminDTO, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('getimagebyadminid/:adminId'),
    __param(0, (0, common_1.Param)('adminId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getimagebyid", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_admin_dto_1.AdminLoginDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('/signout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "signout", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map