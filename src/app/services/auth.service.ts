import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { User } from "../models/user";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AuthService {
  private BASE_URL: string = "YOUR_SITE";
  private headers: Headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json"
  });
  constructor(private http: Http) {}
  login(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/oauth/token`;

    let data = {
      grant_type: "password",
      client_id: "2",
      client_secret: "yout_secert",
      username: user["email"],
      password: user["password"],
      scope: "*"
    };

    return this.http.post(url, data, { headers: this.headers }).toPromise();
  }
  register(user: User): Promise<any> {
    let url: string = `${this.BASE_URL}/register`;
    return this.http.post(url, user, { headers: this.headers }).toPromise();
  }
  ensureAuthenticated(token): Promise<any> {
    let url: string = `${this.BASE_URL}/status`;
    let headers: Headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, { headers: headers }).toPromise();
  }
}
