import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DishProvider } from '../dish/dish';
import { Dish } from '../../shared/dish';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {
  favorites: Array<any>;
  constructor(public http: Http, private dishservice: DishProvider,
    private storage: Storage,
    private localNotifications: LocalNotifications) {
    this.storage.get('fav').then(fav => {

      if (fav) {
        this.favorites = fav;
      }
      else {
        this.favorites = [];
      }
    });

  }
  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
    console.log('favorites', this.favorites);
    this.storage.set('fav', this.favorites);
    // Schedule a single notification
    this.localNotifications.schedule({
      id: id,
      text: 'Dish ' + id + ' added as a favorite successfully'
    });
    return true;
  }
  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }
  getFavorites(): Observable<Dish[]> {

    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }
  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set('fav', this.favorites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

}
