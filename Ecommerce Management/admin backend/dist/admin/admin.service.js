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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const bcrypt = require("bcrypt");
const dist_1 = require("@nestjs-modules/mailer/dist");
const manager_entity_1 = require("../manager/manager.entity");
const adminprofile_entity_1 = require("./entities/adminprofile.entity");
let AdminService = class AdminService {
    constructor(adminRepo, managerRepo, adminprofileRepo, mailerService) {
        this.adminRepo = adminRepo;
        this.managerRepo = managerRepo;
        this.adminprofileRepo = adminprofileRepo;
        this.mailerService = mailerService;
    }
    async getIndex() {
        return this.adminRepo.find();
    }
    async getAllAdmin() {
        try {
            return this.adminRepo.find();
        }
        catch (error) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async getAllManagers() {
        return this.managerRepo.find();
    }
    async getAdminByEmail(email) {
        return this.adminRepo.findOneBy({ email: email });
    }
    async getAdminByID(id) {
        const data = await this.adminRepo.findOneBy({ id });
        console.log(data);
        if (data !== null) {
            return data;
        }
        else {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getManagerByID(id) {
        const data = await this.managerRepo.findOneBy({ id });
        console.log(data);
        if (data !== null) {
            return data;
        }
        else {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAdminbyIDAndName(id, name) {
        return this.adminRepo.findOneBy({ id: id, fullname: name });
    }
    async addAdmin(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password = hassedpassed;
        return this.adminRepo.save(mydto);
    }
    async createAdmin(user, userProfile) {
        userProfile.AdminEntity = user;
        await this.adminprofileRepo.save(userProfile);
        return this.adminprofileRepo.save(user);
    }
    async updateAdmin(email, data) {
        await this.adminRepo.update({ email: email }, data);
        return this.adminRepo.findOneBy({ id: data.id });
    }
    async updateAdminById(id, data) {
        await this.adminRepo.update(id, data);
        return this.adminRepo.findOneBy({ id });
    }
    async updateManagerById(id, data) {
        await this.managerRepo.update(id, data);
        return this.managerRepo.findOneBy({ id });
    }
    deleteAdminByID(id) {
        return this.adminRepo.delete(id);
    }
    deleteManagerByID(id) {
        return this.managerRepo.delete(id);
    }
    async deleteUser(id) {
        await this.adminRepo.delete(id);
        return this.adminRepo.find();
    }
    async addManager(manager) {
        return this.managerRepo.save(manager);
    }
    insertManager(mydto) {
        return this.managerRepo.save(mydto);
    }
    getAdminByManagerID(id) {
        return this.managerRepo.find({
            where: { id: id },
            relations: {
                admin: true,
            },
        });
    }
    getManagersByAdminID(id) {
        return this.adminRepo.find({
            where: { id: id },
            relations: ['managers']
        });
    }
    async getAllManagerswithadmin() {
        return this.managerRepo.find({
            relations: {
                admin: true
            }
        });
    }
    async signup(data) {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        return this.adminRepo.save(data);
    }
    async getimagebyadminid(adminid) {
        const mydata = await this.adminRepo.findOneBy({ id: adminid });
        console.log(mydata);
        return mydata.filenames;
    }
    async signin(mydto) {
        console.log("data" + { mydto });
        const userdata = await this.adminRepo.findOneBy({ email: mydto.email });
        console.log(userdata);
        if (userdata != null) {
            const match = await bcrypt.compare(mydto.password, userdata.password);
            return match;
        }
        else {
            return false;
        }
    }
    sendMail() {
        this.mailerService.sendMail({
            to: '98sakib@gmail.com',
            from: '99tanjil@gmail.com',
            subject: 'Testing mailer',
            text: 'welcome',
            html: '<b>welcome user</b>',
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(manager_entity_1.ManagerEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(adminprofile_entity_1.AdminProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        dist_1.MailerService])
], AdminService);
//# sourceMappingURL=admin.service.js.map