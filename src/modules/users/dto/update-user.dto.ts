import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  ArrayNotEmpty,
} from 'class-validator';
import {
  PREDEFINED_GROUPS,
  PREDEFINED_ROLES,
} from 'src/common/constants/auth.constants';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(PREDEFINED_ROLES, { each: true })
  roles?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(PREDEFINED_GROUPS, { each: true })
  groups?: string[];
}
