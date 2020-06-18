import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsers } from '../users';
import { FormGroup } from '@angular/forms';
import { IPosts } from '../posts';
import { ITours } from '../tours';
import { IBands } from '../bands';
import { IInvites } from '../invites';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'auth': 'false'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userUrl = 'http://localhost:3000/api/users';
  postUrl = 'http://localhost:3000/api/posts';
  tourUrl = 'http://localhost:3000/api/tours';
  bandUrl = 'http://localhost:3000/api/bands';
  inviteUrl = 'http://localhost:3000/api/invites';

  getAllUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.userUrl, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getUserDetails(): Observable<IUsers> {
    return this.http.get<IUsers>(`${this.userUrl}/details`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getUsers(): Observable<IUsers> {
    return this.http.get<IUsers>(`${this.userUrl}/username`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getPost(): Observable<IPosts[]> {
    return this.http.get<IPosts[]>(this.postUrl, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }

  getPostDetails(): Observable<IPosts> {
    return this.http.get<IPosts>(`${this.postUrl}/post`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  // deleteUser(id: number): Observable<{}> {
  //   return this.http.delete(`${this.deleteUserUrl}/${id}.json`);
  // }

  // getOffices(): Observable<IOffices[]> {
  //   return this.http.get<IOffices[]>(this.url2);
  // }

  postUser(data: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(`${this.userUrl}/register`, data, httpOptions);
  }

  postPost(data: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(`${this.postUrl}`, data, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }

  postUserLogin(data: { login: string, password: string }): Observable<string> {
    return this.http.post<string>(`${this.userUrl}/login`, data);
  }

  putUser(data: FormGroup): Observable<FormGroup> {
    return this.http.put<FormGroup>(`${this.userUrl}/details`, data, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  };

  putPost(data: FormGroup): Observable<FormGroup> {
    return this.http.put<FormGroup>(`${this.postUrl}`, data, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  };

  deleteUser(id: string): Observable<{}> {
    return this.http.delete(`${this.userUrl}/delete?id=${id}`, {
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getTours(): Observable<ITours[]> {
    return this.http.get<ITours[]>(`${this.tourUrl}/get`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }

  postTour(data: ITours): Observable<ITours> {
    return this.http.post<ITours>(`${this.tourUrl}/add`, data, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  };

  deleteTour(id: string): Observable<{}> {
    return this.http.delete(`${this.tourUrl}/delete?id=${id}`, {
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getBand(): Observable<any> {
    return this.http.get<any>(`${this.bandUrl}/get`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }

  getUserBand(userId): Observable<IBands> {
    return this.http.get<IBands>(`${this.bandUrl}/getBand?usersId=${userId}`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }

  postBand(data): Observable<string> {
    return this.http.post<string>(`${this.bandUrl}/add`, data, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  };

  putBand(userId: any, usersId: any, name: any): Observable<any> {
    return this.http.put<any>(`${this.bandUrl}?userId=${userId}`, { usersId, name }, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  };

  deleteBand(): Observable<{}> {
    return this.http.delete(`${this.bandUrl}/delete`, {
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getAllInvites(): Observable<IInvites> {
    return this.http.get<IInvites>(this.inviteUrl, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getInvites(): Observable<IInvites[]> {
    return this.http.get<IInvites[]>(`${this.inviteUrl}/get`, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }

  deleteInvite(userId: string): Observable<{}> {
    return this.http.delete(`${this.inviteUrl}/delete?userId=${userId}`, {
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  sendInvite(data: { endUserId: string, name: string }): Observable<any> {
    return this.http.post<any>(`${this.inviteUrl}/add`, data, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  };
}

