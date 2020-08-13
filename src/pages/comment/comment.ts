import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Form, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment} from '../../shared/comment';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comment :FormGroup;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private viewController :ViewController) {
    this.comment = this.formBuilder.group({
      
      rating:[5,Validators.required],
      comment:['',Validators.required],
      author:['',Validators.required],
      date:['',],
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
  dismiss() {
    this.viewController.dismiss();
  }
  onSubmit() {
    console.log(this.comment.value);
    let d = new Date().toISOString();
    
    let data = this.comment.value;
    data["date"] = d;
   
    this.viewController.dismiss(data);
  }

}
