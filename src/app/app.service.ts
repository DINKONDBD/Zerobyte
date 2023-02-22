import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

const apiUrl = 'http://localhost:80';

@Injectable({providedIn: 'root'})
export class AppService {
  items$: BehaviorSubject<any[]> = new BehaviorSubject([] as any[]);
  constructor(private http: HttpClient){}

  loadItems() {
    this.http.get<any[]>(`${apiUrl}/get`).subscribe((items) => this.items$.next(items));
  }

  public send(user:any, description:any)
  {
    this.http.get(`${apiUrl}/send/${user}/${description}`).subscribe();
  }
}
