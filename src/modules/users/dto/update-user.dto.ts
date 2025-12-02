import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  ArrayNotEmpty,
} from 'class-validator';
import {
  Group,
  PREDEFINED_GROUPS,
  PREDEFINED_ROLES,
  Role,
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
  roles?: Role[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(PREDEFINED_GROUPS, { each: true })
  groups?: Group[];
}
