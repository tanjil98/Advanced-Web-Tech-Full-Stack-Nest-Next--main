import { ManagerEntity } from 'src/manager/manager.entity';
import { AdminProfile } from './adminprofile.entity';
export declare class AdminEntity {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    filenames: string;
    managers: ManagerEntity[];
    AdminProfile: AdminProfile;
}
