import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async createUser(data: { username: string; phone: string }): Promise<User> {
    return this.db.user.create({
      data,
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.db.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const profile = await this.db.profile.findUnique({
      where: { email },
      include: { user: true }, // Include the user information
    });

    return profile ? profile.user : null; // Return user if profile is found
  }

  async updateUser(
    id: number,
    data: { username?: string; phone?: string },
  ): Promise<User> {
    return this.db.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.db.user.delete({
      where: { id },
    });
  }
}
