import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';


/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {
  favorites: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteservice: FavoriteProvider,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    @Inject('baseURL') private baseURL) {
  }
  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
  }
  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);
    let alert = this.alertController.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete Dish ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            let loading = this.loadingController.create({
              content: 'Loading . . .'
            });
            let toast = this.toastController.create({
              message: 'Dish ' + id + ' has been deleted',
              duration: 3000
            });
            loading.present();
            this.favoriteservice.deleteFavorite(id)
              .subscribe(favorites => {
                this.favorites = favorites;
                loading.dismiss();
                toast.present();
              },
                errmess => {
                  this.errMess = errmess;
                  loading.dismiss()
                });

          }
        }
      ]
    });
    alert.present();
    item.close();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

}
