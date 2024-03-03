import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUser } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: createUser): Promise<User> {
    try {
      return await this.prisma.user.create({ data: { ...user } });
    } catch (e) {
      throw new ForbiddenException();
    }
  }
  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findFirst({ where: { email } });
    } catch (e) {
      throw new BadRequestException();
    }
  }
  async findAll (): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
