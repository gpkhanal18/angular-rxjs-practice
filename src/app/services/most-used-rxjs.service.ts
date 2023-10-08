import { HttpClient } from '@angular/common/http';
import { of, from, interval, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError, debounceTime, distinctUntilChanged, startWith, tap, take, filter, concatMap, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MostUsedRxjsService {

  names = ['gopal', 'gopal2 gopal2', 'gopal3 gopal3 gopal3'];
  users = [
    { 'name': 'gopal1', age: 31 },
    { 'name': 'gopal2', age: 32 },
    { 'name': 'gopal3', age: 33 }
  ];
  namesDuplicate = ['gopal', 'gopal', 'kamal', 'gopal', 'ram', 'shyam', 'kamal'];


  constructor(private http: HttpClient) { }

  public mostUsedRxjsOperators(){
    // console.log('most used');

    // this.mapAndFilter();
    // this.tap();
    // this.switchMap(); // overrides => switchmap is like if outer obs has new value then inner observable is cancelled and triggeered with new value 
    // this.concatMap(); // queue => concat is a queue system inner observable has to complete before moving to next one. 
    // this.switchMapDifferenceWithConcat();
    // this.combineLatest(); // takes the latest from all the streams and waits until all of them are complete; 
    // this.startWith() // it basically allows you to start stream with some startwith imp during forms creation. 
    // this.distinctUntilChanged(); // distinct until changed
    // this.debounceTime(); // delay kind of feature  wait every this amount of time to get the value from stream 
    this.catchError();
  }



  private catchError(){
    from(this.names).pipe(
      catchError(err => of([]))
    ).subscribe(result => console.log(result));
  }


  private debounceTime() {

    interval(1000).pipe(
      take(3),
      debounceTime(1000)
    ).subscribe(result => console.log(`debounceTime is ${result}`));
  }

  private distinctUntilChanged() {
    from(this.namesDuplicate).pipe(
      distinctUntilChanged()
    ).subscribe(result => console.log('distinctUntilChanged is ', result));
  }

  private startWith(){
    from(this.names).pipe(
      startWith('First Boy')
    ).subscribe(result => console.log(result));
  }

  private combineLatest(){
  
    combineLatest(of(this.names), of(this.users)).pipe(

    ).subscribe(result => console.log('combinelatest is ', result));

  }
  private switchMapDifferenceWithConcat() {

    interval(1000).pipe(
      take(4),
      switchMap(value => interval(1).pipe(
        take(4),
        map(valu2 => [value, valu2])
      ))
    ).subscribe(result => console.log(`outer is ${result[0]} and inner is ${result[1]}`))
  }

  private concatMap(){

    interval(5000).pipe(
      take(4),
      concatMap(value => interval(1).pipe(
        take(4),
        map(valu2 => [value, valu2])
      ))
    ).subscribe(result => console.log(`outer is ${result[0]} and inner is ${result[1]}`))
  }

  private switchMap(){
  
    this.getAllPosts().pipe(
      switchMap(posts => this.getPostsById(posts[6].id).pipe(
        map(post => {
          return [post, posts];
        })
      ))
    ).subscribe(result => console.log(result));
  }

  private tap() {
    of(this.names).pipe(
      map(names => names.map(name => 'yo ' + name)),
      map(names => names.filter(name => name.length > 10)),
      tap(response => console.log('tap response is ', response))
    ).subscribe(result => console.log(result));
  }


  private mapAndFilter(){
    of(this.names).pipe(
      map(names => names.map(name => 'yo ' + name)),
      map(names => names.filter(name => name.length > 10))
    ).subscribe(result => console.log(result));
  }



  private getAllPosts() {
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/posts');
  }

  private getPostsById(postId: number) {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/posts/' + postId);
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
