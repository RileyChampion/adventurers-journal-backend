import { ApiProperty } from "@nestjs/swagger";
import { Campaign } from "@prisma/client";

export class CampaignEntity implements Campaign {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({required: false, nullable: true})
    edition: string;

    @ApiProperty()
    gameMasterId: string

    @ApiProperty()
    status: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({required: false, nullable: true})
    archivedAt: Date | null;

    @ApiProperty({required: false, nullable: true})
    archivedBy: string | null;
}
