import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
import { UserService } from '../user/user.service';
import { ProfileService } from './profile.service';

@Controller('api/profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
  ) {}

  // Create a new profile for a user
  @Post(':userId')
  async createProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body()
    data: {
      email: string;
      gender: string;
      address: string;
      pincode: string;
      city: string;
      state: string;
      country: string;
    },
  ): Promise<Profile> {
    // Check if the user exists
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    try {
      return this.profileService.createProfile(userId, data);
    } catch (error) {
      console.error('Error creating profile:', error);
      throw new InternalServerErrorException('Failed to create profile');
    }
  }

  // Get all profiles
  @Get()
  async getAllProfiles(): Promise<Profile[]> {
    try {
      return this.profileService.getAllProfiles();
    } catch (error) {
      console.error('Error retrieving profiles:', error);
      throw new InternalServerErrorException('Failed to retrieve profiles');
    }
  }

  // Get profile by user ID
  @Get(':userId')
  async getProfileByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Profile> {
    return this.profileService.getProfileByUserId(userId);
  }

  // Update a profile
  @Patch(':userId')
  async updateProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body()
    updateProfileDto: { email?: string; gender?: string; address?: string },
  ): Promise<Profile> {
    return this.profileService.updateProfile(userId, updateProfileDto);
  }

  // Delete a profile
  @Delete(':userId')
  async deleteProfile(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Profile> {
    return this.profileService.deleteProfile(userId);
  }
}
