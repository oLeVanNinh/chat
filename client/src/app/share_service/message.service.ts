import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '@models/message.model';
import { RoomMessage } from '@models/room_message.model';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor(private http: HttpClient) {}

  getMessages(roomId: string): Observable<RoomMessage> {
    const params = new HttpParams().set('roomId', roomId);

    return this.http.get<RoomMessage>('/rooms/messages', { params });
  }

  createMessage(roomId: string, message: string): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    const params = new HttpParams({fromObject: {
      roomId,
      message
    }});

    return this.http.post<Message>('/rooms/message/create', params, httpOptions);
  }
}
