import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  ArrayNotEmpty,
} from 'class-validator';
import {
  PREDEFINED_GROUPS,
  PREDEFINED_ROLES,
} from 'src/constants/auth.constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(PREDEFINED_ROLES, { each: true })
  roles: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(PREDEFINED_GROUPS, { each: true })
  groups: string[];
}
