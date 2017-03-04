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
  locationIsSet:boolean = false;

  constructor(
    private modalCtrl:ModalController
  ){}

  onLocate(){}

  onOpenMap(){
    const modal = this.modalCtrl.create(SetLocationPage,{
      location:this.location,
      isSet:this.locationIsSet
    });
    modal.present();
    modal.onDidDismiss(
      (data)=>{
        if(data){
          this.location= new Location(data.location.lat,data.location.lng);
          this.locationIsSet = true;
        }
      }
    );
  }

  onTakePhoto(){}

  onSubmit(form:NgForm){
    console.log(form.value);
  }

}
