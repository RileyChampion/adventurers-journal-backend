import { PartialType } from "@nestjs/swagger";
import { BaseProfileDto } from "./base-profile.dto";

export class CreateProfileDto extends PartialType(BaseProfileDto) {}
