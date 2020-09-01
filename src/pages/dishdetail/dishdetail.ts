import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Comment } from '../../shared/comment';
import { CommentPage } from '../comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    @Inject('baseURL') private baseURL,
    private favoriteService: FavoriteProvider,
    private socialSharing:SocialSharing) {
    this.dish = navParams.get('dish');
    this.favorite = favoriteService.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgstars = (total / this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
  toogleToFavorites() {
    if (this.favoriteService.isFavorite(this.dish.id)) {
      this.favoriteService.deleteFavorite(this.dish.id);
      this.favorite = false;
    } else {
      this.favorite = this.favoriteService.addFavorite(this.dish.id);
    }
    this.toastController.create({
      message: 'Dish ' + this.dish.id + ' toggled as favorite successfully',
      position: 'bottom',
      duration: 3000
    }).present();
  }
  actionSheet() {
    const actionSheet = this.actionSheetController.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.toogleToFavorites();

          }
        },
        {
          text: 'Add a Comment',
          handler: () => {
            this.commentModal();

          }
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.baseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.baseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
      ]

    });
    actionSheet.present();
  }
  commentModal() {

    let modal = this.modalController.create(CommentPage);
    modal.present();
    modal.onDidDismiss(data => {
      this.dish.comments.push(data);
      console.log(data);
    });
  }

}
