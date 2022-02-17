import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Link, LinkData } from '../models/link.model';
import { map, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  linkUploading = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  shortenLink(linkData: LinkData) {
    this.linkUploading.next(true);
    return this.http.post<Link>(environment.apiUrl + '/links', linkData).pipe(
      (map((link) => {
        return new Link(link._id, link.originalUrl, link.shortUrl);
      }))
    );
  }
}
