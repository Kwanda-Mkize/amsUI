import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

export const AuthInterceptorService: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  let accessToken;

  try {
    accessToken = sessionStorage.getItem("Token");
  } catch (e) {
    console.log(e);
  }

  if (accessToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(clonedRequest.headers);
    return next(clonedRequest);
  }
  return next(req);
};
