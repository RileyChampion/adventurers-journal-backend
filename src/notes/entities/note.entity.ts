import { ApiProperty } from "@nestjs/swagger";
import { Note } from "@prisma/client";

export class NoteEntity implements Note {
    @ApiProperty()
    id: string;

    @ApiProperty()
    characterCampaignId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    link: string;

    @ApiProperty()
    fileType: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({required: false, nullable: true})
    deletedAt: Date | null;
}
