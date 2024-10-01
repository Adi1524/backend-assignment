import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: DatabaseService) {}

  async getAllProfiles(): Promise<Profile[]> {
    return this.prisma.profile.findMany(); // Fetch all profiles from the database
  }

  // Create a new profile for a user
  async createProfile(
    userId: number,
    data: {
      email: string;
      gender: string;
      address: string;
      pincode: string;
      city: string;
      state: string;
    },
  ): Promise<Profile> {
    // Check if user exists before creating the profile
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Proceed to create the profile if the user exists
    return this.prisma.profile.create({
      data: {
        ...data,
        userId, // Associate profile with the user
      },
    });
  }

  // Get a profile by userId
  async getProfileByUserId(userId: number): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException(
        `Profile for user with ID ${userId} not found`,
      );
    }
    return profile;
  }

  // Update a profile
  async updateProfile(
    userId: number,
    data: { email?: string; gender?: string; address?: string },
  ): Promise<Profile> {
    // Ensure the profile exists before updating
    const existingProfile = await this.getProfileByUserId(userId);
    if (!existingProfile) {
      throw new NotFoundException(
        `Profile for user with ID ${userId} not found`,
      );
    }

    // Update the profile with the provided data
    return this.prisma.profile.update({
      where: { userId },
      data,
    });
  }

  // Delete a profile
  async deleteProfile(userId: number): Promise<Profile> {
    // Ensure the profile exists before deleting
    const existingProfile = await this.getProfileByUserId(userId);
    if (!existingProfile) {
      throw new NotFoundException(
        `Profile for user with ID ${userId} not found`,
      );
    }

    // Delete the profile
    return this.prisma.profile.delete({
      where: { userId },
    });
  }
}
