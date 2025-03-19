import { PartialType } from '@nestjs/swagger';
import { BaseProfileDto } from './base-profile.dto';

export class UpdateProfileDto extends PartialType(BaseProfileDto) {}
