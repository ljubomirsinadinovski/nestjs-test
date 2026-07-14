import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

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

    constructor(private readonly userService: UserService) {}
    
    @Get()
    getUsers(@Query('name') name: string): unknown {
        return this.userService.findAllUsers(name);
    }

    @Get(':id')
    getUserById(@Param('id') id: string): unknown {
        return this.userService.findOneUser(Number(id));
    }

    @Post() // POST /user
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

    @Put(':id') // PUT /user/:id
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): unknown {
        return this.userService.updateUser(Number(id), updateUserDto)
    }

    @Delete(':id') // DELETE /user/:id
    deleteUser(@Param('id') id: string): unknown {
        console.log("ENTERS")
        return this.userService.deleteUser(Number(id))
    }

   
}
