import { Component, OnInit,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaderProvider} from '../../providers/leader/leader';
import { Leader } from '../../shared/leader';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit {
  leaders: Leader[];
  errMess: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private leaderService : LeaderProvider,
    @Inject('baseURL') private baseURL) {
  }
  ngOnInit(): void {
    this.leaderService.getLeaders().
    subscribe(leaders=> this.leaders = leaders, errmess => this.errMess = errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
