import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/api.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<TEntity, TResponse> {

  public baseUrl: string = '';
  public _httpSvc = inject(HttpClient);

  constructor() { }

  getAllAsync(queryParams?: any): Observable<IApiResponse<TResponse[]>> {
    const url = this.handleUrl()
    return this._httpSvc.get<IApiResponse<TResponse[]>>(`${url}`, { params: queryParams });
  }

  getById(id: number | string): Observable<TResponse> {
    const url = this.handleUrl()
    return this._httpSvc.get<TResponse>(`${url}/${id}`);
  }

  deleteAsync(id: number | string): Observable<IApiResponse<TResponse>> {
    const url = this.handleUrl()
    return this._httpSvc.delete<IApiResponse<TResponse>>(`${url}/${id}`);
  }

  saveAsync(data: TEntity | FormData): Observable<IApiResponse<TResponse>> {
    const url = this.handleUrl()
    return this._httpSvc.post<IApiResponse<TResponse>>(
      `${url}`,
      data
    );
  }

  updateAsync(id: number | string, data: TEntity | FormData): Observable<IApiResponse<TResponse>> {
    const url = this.handleUrl()
    return this._httpSvc.put<IApiResponse<TResponse>>(
      `${url}/${id}`,
      data
    );
  }

  updateWithoutIdAsync(data: TEntity): Observable<IApiResponse<TResponse>> {
    const url = this.handleUrl()
    return this._httpSvc.put<IApiResponse<TResponse>>(
      `${url}`,
      data
    );
  }

  handleUrl() {
    const apiUrl: string = environment.production ? environment.apiUrl : environment.apiDevUrl;
    return `${apiUrl}/${this.baseUrl}`
  }
}
