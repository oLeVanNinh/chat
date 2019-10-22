import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Room } from "../../model/room.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('/rooms').pipe(map(res => res['rooms']));
  }

  createRoom(roomName: string): Observable<Room> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    }

    const params = new HttpParams({fromObject: {
      roomName: roomName
    }})

    return this.http.post<Room>('/room/create', params, httpOptions).pipe(map(res => res['room']));
  }
}
