import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UserService {

    constructor(private readonly logger: LoggerService) {}

    private users: User[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
        {
            id: 2,
            name: 'Ljupche',
            email: 'ljupche@example.com',
        }
    ];

    findAllUsers(name: string = ''): User[] {
        this.logger.log(`Finding all users with name: ${name}`);
        return this.users.filter((user) => {
            return user.name.toLowerCase().includes(name.toLowerCase());
        });
    }

    findOneUser(id: number) {
        this.logger.log(`Finding user with id: ${id}`);
        return this.users.find((user) => user.id === id) ?? null
    }

    createUser(dto: CreateUserDto) {
        this.logger.log(`Creating user with data: ${JSON.stringify(dto)}`);
        const newUser = { id: this.users.length + 1, ...dto };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, dto: UpdateUserDto) {
        this.logger.log(`Updating user with id: ${id}`);
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) return null;
        this.users[index] = { ...this.users[index], ...dto };
        return this.users[index];
    }
    
    deleteUser(id: number) {
        this.logger.log(`Deleting user with id: ${id}`);
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) return null;
        const [deletedUser] = this.users.splice(index, 1);
        return deletedUser;
    }
}
