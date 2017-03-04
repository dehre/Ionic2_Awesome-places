import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ModalController } from "ionic-angular";
import { Location } from "../../models/location";
import { SetLocationPage } from "../set-location/set-location";

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {

  location:Location = {
    lat: 45.7896645,
    lng: 11.9168145
  };

  constructor(
    private modalCtrl:ModalController
  ){}

  onLocate(){}

  onOpenMap(){
    const modal = this.modalCtrl.create(SetLocationPage,{location:this.location});
    modal.present();
  }

  onTakePhoto(){}

  onSubmit(form:NgForm){
    console.log(form.value);
  }

}
