import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const userData = storageService.getItem('userData');

  if (userData) {
    return true;
  } else {
    router.navigateByUrl('/login');
  }
  return false;
};
