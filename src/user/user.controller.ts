import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(
    @Body() data: { username: string; phone: string },
  ): Promise<User> {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Get('find-by-email/:email') // New endpoint for finding user by email
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { username?: string; phone?: string },
  ): Promise<User> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userService.deleteUser(id);
  }

  // @Post(':userId/profile')
  // async createProfile(
  //   @Param('userId', ParseIntPipe) userId: number,
  //   @Body()
  //   createProfileDto: {
  //     email: string;
  //     gender: string;
  //     address: string;
  //     pincode: string;
  //     city: string;
  //     state: string;
  //     country: string;
  //   },
  // ): Promise<Profile> {
  //   const user = await this.userService.getUserById(userId);
  //   if (!user) {
  //     throw new NotFoundException(`User with id ${userId} not found`);
  //   }
  //   return this.userService.createProfile(+userId, createProfileDto);
  // }
}
