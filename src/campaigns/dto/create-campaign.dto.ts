export class CreateCampaignDto {
  name: string;
  edition: string | undefined;
  description: string | undefined;
  setting: string | undefined;
  gameMasterId: string;
}
