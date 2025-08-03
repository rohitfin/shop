import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  let router = inject(Router);

  const userData = storageService.getItem('userData');

  if (userData) {
    router.navigateByUrl('/');
  } else {
    return true;
  }
  return false;
};
