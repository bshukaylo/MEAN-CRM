import {Injectable} from "@angular/core";
import {User} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({providedIn:"root"})
export class AuthService {
  private token = null;
  constructor(private http: HttpClient) {

  }

  getToken(): string {
    return this.token
  }

  setToken(value: any) {
    this.token = value;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.setToken(null)
    localStorage.clear()
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('authToken', token)
            this.setToken(token)
          }
        )
      )
  }
}
