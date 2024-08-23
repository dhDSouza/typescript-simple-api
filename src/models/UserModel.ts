export interface IUser {
    id?: number;
    name: string;
    email: string;
}

export class UserModel implements IUser {
    id?: number;
    name: string;
    email: string;
    
    constructor(user: IUser) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}
