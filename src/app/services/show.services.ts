import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Show} from '../show.model';
//import { Stream } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http: HttpClient) { }
  
    getPostsData(): Observable<any> {
      return this.http.get("http://localhost:8081/api/shows");
    }

  addPost(title: string, epnum: string, snum: string, info: string): Observable<any> {
    const show: Show = {title: title, epnum: epnum, snum: snum, info: info};
    return this.http.post("http://localhost:8081/api/shows",show);
  }

  deletePost(id: String): Observable<any> {
    return this.http.delete("http://localhost:8081/api/shows/"+id);
  }

  getPost(id:String): Observable<any> {
    return this.http.get("http://localhost:8081/api/shows/"+id);
  }

  updatePost(id:String, title: string, info: string, snum: string, epnum: string): Observable<any> {
    const show: Show = {title: title, info: info, snum: snum, epnum: epnum};
  return this.http.put("http://localhost:8081/api/show/"+id, show);
  }
}