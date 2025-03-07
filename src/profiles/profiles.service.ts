import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  findOne(userId: string) {
    return this.prisma.profile.findUniqueOrThrow({ where: { id: userId } });
  }

  update(userId: string, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: { id: userId },
      data: updateProfileDto,
    });
  }

  remove(userId: string) {
    return this.prisma.profile.delete({ where: { id: userId } });
  }
}
