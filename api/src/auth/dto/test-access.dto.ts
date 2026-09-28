import { IsString, MaxLength } from "class-validator";

export class TestAccessDto {
  @IsString()
  @MaxLength(256)
  token!: string;
}
