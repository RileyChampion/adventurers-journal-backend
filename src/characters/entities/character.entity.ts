import { ApiProperty } from "@nestjs/swagger";
import { Character } from "@prisma/client";

export class CharacterEntity implements Character {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string

  @ApiProperty()
  name: string;

  @ApiProperty()
  class: string;

  @ApiProperty()
  level: number;

  @ApiProperty()
  background: string;

  @ApiProperty()
  race: string;

  @ApiProperty()
  isAlive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({required: false, nullable: true})
  deletedAt: Date | null;
}
