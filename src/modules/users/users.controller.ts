import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PermissionsGuard } from '../../common/guards';
import { Permission } from 'src/common/decorators';
import { ApiControllerResponse } from '../../common/dtos';
import { User } from 'src/common/constants/auth.constants';

@Controller('v1/users')
@UseGuards(PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permission('CREATE')
  async create(
    @Body() dto: CreateUserDto,
  ): Promise<ApiControllerResponse<User>> {
    const user = await this.usersService.create(dto);
    return {
      data: user,
      message: 'User created successfully',
    };
  }

  @Get()
  @Permission('VIEW')
  async findAll(): Promise<ApiControllerResponse<User[]>> {
    const users = await this.usersService.findAll();
    return {
      data: users,
      message: 'Users fetched successfully',
    };
  }

  @Patch(':id')
  @Permission('EDIT')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<ApiControllerResponse<User>> {
    const user = await this.usersService.update(Number(id), dto);
    return {
      data: user,
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  @Permission('DELETE')
  async remove(
    @Param('id') id: string,
  ): Promise<ApiControllerResponse<unknown>> {
    await this.usersService.remove(Number(id));
    return {
      data: {},
      message: 'User deleted successfully',
    };
  }

  @Get('managed/:id')
  @Permission('VIEW')
  async managed(
    @Param('id') id: string,
  ): Promise<ApiControllerResponse<User[]>> {
    const managedUsers = await this.usersService.managedUsersBy(Number(id));
    return {
      data: managedUsers,
      message: 'Managed users fetched successfully',
    };
  }
}
