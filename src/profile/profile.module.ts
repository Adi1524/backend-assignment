import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { UserModule } from 'src/user/user.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ProfileController],
  providers: [ProfileService, DatabaseService],
})
export class ProfileModule {}
