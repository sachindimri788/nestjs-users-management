import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PREDEFINED_USERS, ROLES_WITH_PERMISSIONS } from '../constants';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.get<string | undefined>(
      PERMISSION_KEY,
      context.getHandler(),
    );
    if (!requiredPermission) return true;

    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    const userId = auth ? Number(String(auth).trim()) : NaN;
    if (!userId || Number.isNaN(userId)) {
      throw new ForbiddenException('Missing or invalid Authorization header');
    }

    const user = PREDEFINED_USERS.find((u) => u.id === userId);
    if (!user) throw new ForbiddenException('User not found');

    // accumulate permissions from roles
    const userPermissions = new Set<string>();
    for (const role of user.roles) {
      const r = ROLES_WITH_PERMISSIONS.find((rr) => rr.code === role);
      if (r && Array.isArray(r.permissions))
        r.permissions.forEach((p) => userPermissions.add(p));
    }

    if (!userPermissions.has(requiredPermission)) {
      throw new ForbiddenException(
        'Not allowed to perform action due to insufficient permissions.',
      );
    }

    // attach user to request for handlers that may need it
    request.currentUser = user;
    return true;
  }
}
