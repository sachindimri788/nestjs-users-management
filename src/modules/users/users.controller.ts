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

@Controller('v1/users')
@UseGuards(PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permission('CREATE')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @Permission('VIEW')
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @Permission('EDIT')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(Number(id), dto);
  }

  @Delete(':id')
  @Permission('DELETE')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }

  @Get('managed/:id')
  // managed users query is a view operation: use VIEW permission (but it could be open)
  @Permission('VIEW')
  managed(@Param('id') id: string) {
    return this.usersService.managedUsersBy(Number(id));
  }
}
