import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {
  ModalController,
  LoadingController,
  ToastController
} from "ionic-angular";
import {
  Geolocation,
  Camera
} from "ionic-native";
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
    private modalCtrl:ModalController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController
  ){}

  onLocate(){
    const loader = this.loadingCtrl.create({
      content: 'Getting your location..'
    });
    loader.present();
    Geolocation.getCurrentPosition()
      .then(location=>{
        loader.dismiss();
        this.location = new Location(
          location.coords.latitude,
          location.coords.longitude
        );
        this.locationIsSet = true;
      })
      .catch((err)=>{
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message:'Could not get location, please pick it manually',
          duration: 2500,
          position: 'bottom'
        });
        toast.present();
      })
  }

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

  onTakePhoto(){
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(imageData=>{
        console.log(imageData)
      })
      .catch(err=>console.log(err))
  }

  onSubmit(form:NgForm){
    console.log(form.value);
  }

}
