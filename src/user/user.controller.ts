import { Controller, Get, Query, Post, Body, Param, Put, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const users = [
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
]

@Controller('user')
export class UserController {
    @Get()
    getUsers(@Query('name') name: string) {
        if (name) {
            return users.filter(user =>
                user.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        return users;
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return users.find(user => user.id === parseInt(id));
    }

    @Post() // POST /user
    createUser(@Body() createUserDto: CreateUserDto) {
        return {
            data: createUserDto,
            message: 'User created successfully'
        };
    }

    @Put(':id') // PUT /user/:id
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const user = users.find(user => user.id === parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return {
            data: updateUserDto,
            message: 'User updated successfully'
        };
    }

   
}
