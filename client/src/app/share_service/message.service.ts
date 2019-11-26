import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor(private http: HttpClient) {}

  getMessages(roomId: string): Observable<Message[]> {
    const params = new HttpParams().set('roomId', roomId);

    return this.http.get<Message[]>('/rooms/messages', { params });
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
