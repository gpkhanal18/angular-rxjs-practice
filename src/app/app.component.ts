import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
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
  }






  private scneario2(){
  
    const obs1$ = this.getAllPosts();
    
    obs1$.pipe(
      switchMap(posts => this.getPostsById(posts[4].id)
        .pipe(
          map(post => ([post, posts]))
        )
      )
    ).subscribe(result => console.log('results is ', result));
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
        map(users => ([users , posts]))
      ))
    ).subscribe(console.log);
  }

  private getAllPosts(){
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/posts');
  }

  private getPostsById(postId: number): Observable<{}>{
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/posts/' + postId );
  }

  private getComments() {
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/comments');
  }

  private getUsers() {
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  private getCommentsForPost(postid : number) {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/comments?postId=' + postid);
  }



}
