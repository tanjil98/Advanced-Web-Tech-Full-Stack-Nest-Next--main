/// <reference types="multer" />
import { AdminDTO, AdminLoginDTO, AdminUpdateDTO } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { ManagerEntity } from 'src/manager/manager.entity';
import { AdminEntity } from './entities/admin.entity';
import { ManagerDTO, ManagerUpdateDTO } from 'src/manager/manager.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    sendMail(): void;
    getAdmin(): any;
    getAdminByID(id: number): Promise<AdminEntity>;
    getManagerByID(id: number): Promise<ManagerEntity>;
    getAdminByIDName(qry: any): any;
    getAdminByEmail(email: string): Promise<AdminEntity>;
    insertAdmin(mydto: AdminDTO, file: Express.Multer.File): Promise<any>;
    updateAdmin(session: any, name: string): any;
    updateAdminbyID(id: number, data: AdminUpdateDTO): object;
    updateManagerById(id: number, data: ManagerUpdateDTO): object;
    deleteAdminbyid(id: number): any;
    deleteManagerByID(id: number): any;
    getAllManagersWithAdmin(): Promise<ManagerEntity[]>;
    getManagerByAdminID(id: number): any;
    getImages(name: any, res: any): void;
    getAllManagers(): Promise<ManagerEntity[]>;
    addManagers(manager: ManagerDTO): any;
    signup(mydto: AdminDTO, file: Express.Multer.File): Promise<AdminEntity>;
    getimagebyid(adminId: number, res: any): Promise<void>;
    signin(session: any, mydto: AdminLoginDTO): Promise<any>;
    signout(session: any): {
        message: string;
    };
}
