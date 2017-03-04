import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { Location } from "../../models/location";

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html'
})
export class SetLocationPage {

  location:Location;
  marker: Location;

  constructor(
    private navParams:NavParams,
    private viewCtrl:ViewController
  ){
    this.location = this.navParams.get('location');
  }

  onSetMarker(event:any){
    // this.marker = new Location(event.coords.lat,event.coords.lng);
    this.marker = {
      lat:event.coords.lat,
      lng:event.coords.lng
    }
  }

  onConfirm(){
    this.viewCtrl.dismiss({location: this.marker});
  }

  onAbort(){
    this.viewCtrl.dismiss();
  }

}
