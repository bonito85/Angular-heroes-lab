import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({ 
    setHeaders: { 
      Authorization: 'Bearer demo-token' 
    } 
  });
  return next(cloned);
};