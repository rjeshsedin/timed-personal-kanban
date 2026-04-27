import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const onboardedGuard: CanActivateFn = () => {
  const user = inject(UserService);
  const router = inject(Router);

  if (user.getName()) return true;
  return router.parseUrl('/onboarding');
};

