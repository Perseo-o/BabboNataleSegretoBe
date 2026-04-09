import { Controller, Post, Body, Get, Query, Param, BadRequestException } from '@nestjs/common';
import { DrawService } from './draw.service';
import { EncryptionService } from 'src/encryption/encryption.service';

@Controller('draw')
export class DrawController {
  constructor(
    private readonly drawService: DrawService,
    private encryptionService: EncryptionService,
  ) {}

  @Post('generate')
  generateAll() {
    return this.drawService.generateAll();
  }

  @Get('participants')
  getPartecipants() {
    return this.drawService.allName();
  }

  @Get(':token')
  async draw(@Param('token') token: string) {
    if (!token.includes(':')) {
      throw new BadRequestException('Token non valido');
    }

    let name: string;
    try {
      name = this.encryptionService.decrypt(token);
    } catch {
      throw new BadRequestException('Token non valido');
    }

    return this.drawService.getMyMatch(name);
  }

}
