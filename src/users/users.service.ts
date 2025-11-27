import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PREDEFINED_USERS } from 'src/constants';

@Injectable()
export class UsersService {
  private users = PREDEFINED_USERS;

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((u) => u.id === id);
  }

  create(dto: CreateUserDto) {
    const maxId = this.users.reduce((m, u) => (u.id > m ? u.id : m), 0);
    const newUser = { id: maxId + 1, ...dto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, dto: UpdateUserDto) {
    const ix = this.users.findIndex((u) => u.id === id);
    if (ix === -1) throw new NotFoundException('User not found');
    this.users[ix] = { ...this.users[ix], ...dto };
    return this.users[ix];
  }

  remove(id: number) {
    const ix = this.users.findIndex((u) => u.id === id);
    if (ix === -1) throw new NotFoundException('User not found');
    const removed = this.users.splice(ix, 1);
    return removed[0];
  }

  // users that the user with `id` can manage: ADMINs can manage users within their groups
  managedUsersBy(id: number) {
    const user = this.findOne(id);
    if (!user) return [];
    if (!user.roles.includes('ADMIN')) return [];
    const groups = user.groups;
    // return users that share at least one group with this admin and are not the admin themselves
    return this.users.filter(
      (u) => u.id !== id && u.groups.some((g) => groups.includes(g)),
    );
  }
}
