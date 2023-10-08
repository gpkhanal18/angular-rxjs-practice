import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, forkJoin } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-rxjs-practice';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.switchMap1();
    // this.switchMap2();
    // this.switchMap3();
    // this.switchMap4();
    // this.forkjoin();
    // this.combineLatest();
  }


  private combineLatest(){

    // forkJoin - When all observables are completed, emit the last emitted value 
    // from each.combineLatest - When any observable emits a value, 
    // emit the latest value from each.
  
    combineLatest([
      this.getAllPosts(),
      this.getUsers(),
    ]).subscribe((result) => {console.log('combineLatest result is ', result)})

  }

  private forkjoin() {

    forkJoin({
      posts: this.getAllPosts(),
      comments: this.getComments()
    }).subscribe(response => {
      console.log('fork join response is ' , response);
    })

  }



  private switchMap4() {
    this.getAllPosts().pipe(
      switchMap(posts => this.getPostsById(posts[5].id).pipe(
        map(post => ({ posts, post }))
      ))
    ).subscribe(result => console.log(result));
  }


  private switchMap3() {

    this.getAllPosts().pipe(
      switchMap(posts => this.getPostsById(posts[9].id).pipe(
        map(post => [posts, post]),
        tap(response => console.log(response))
      ))
    ).subscribe(result => console.log(result));

  }



  private switchMap2() {

    this.getAllPosts().pipe(
      switchMap(posts => this.getPostsById(posts[2].id).pipe(
        map(post => {
          return post;
        })
      ))
    ).subscribe(result => console.log(result));

  }


  private switchMap1(): void {
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

  private getPostsById(postId: number) {
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