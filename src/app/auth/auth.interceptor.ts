import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set("Authorization", `Token ${token}`)
      .set('Access-Control-Allow-Origin', '*')
    });

    return next(cloned);
  }
  return next(req);
};
