import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignDto } from './create-campaign.dto';
import { CampaignStatus } from './campaign-status.dto';

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {
  status: CampaignStatus | undefined;
}
