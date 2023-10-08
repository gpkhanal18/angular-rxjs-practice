import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-rxjs-practice';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.scenario1();
    this.scneario2();
    // this.scenario3();
  }



  private scenario3() {

    this.getAllPosts().pipe(
      switchMap(posts => this.getPostsById(posts[9].id).pipe(
        map(post => [posts, post]),
        tap(response => console.log(response))
      ))
    ).subscribe(result => console.log(result));

  }



  private scneario2() {

  this.getAllPosts().pipe(
    switchMap(posts => this.getPostsById(posts[2].id).pipe(
      map(post => {
        return post;
      })
    ))
  ).subscribe(result => console.log(result));

  }


  private scenario1(): void {
    const obs1$ = this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/posts');

    const obs2$ = this.http
      .get('https://jsonplaceholder.typicode.com/users');

    obs1$
      .pipe(
      switchMap((posts) =>
        obs2$
          .pipe(map((users) => ({ posts, users })))
      )
      )
      .subscribe((result) => console.log('merged: ', result));

    obs1$.pipe(
      switchMap(posts => obs2$.pipe(
        map(users => ([users, posts]))
      ))
    ).subscribe(console.log);
  }

  private getAllPosts() {
    return this.http
      .get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
  }

  private getPostsById(postId: number): Observable<{}> {
    return this.http
      .get<IPost>('https://jsonplaceholder.typicode.com/posts/' + postId);
  }

  private getComments() {
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/comments');
  }

  private getUsers() {
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  private getCommentsForPost(postid: number) {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/comments?postId=' + postid);
  }



}

export interface IPost {
  "userId": number,
  "id": number,
  "title": string,
  "body": string
}

export interface IComment {
  "postId": number,
  "id": number,
  "name": string,
  "email": string,
  "body": string
}