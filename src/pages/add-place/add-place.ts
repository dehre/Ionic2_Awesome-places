import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {
  ModalController,
  LoadingController,
  ToastController
} from "ionic-angular";
import {
  Geolocation,
  Camera,
  File,
  Entry
} from "ionic-native";
import { Location } from "../../models/location";
import { SetLocationPage } from "../set-location/set-location";
import { PlacesService } from "../../services/places.service";

declare var cordova:any;

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
  imageUrl:string = "https://www.w3schools.com/css/img_fjords.jpg";

  constructor(
    private modalCtrl:ModalController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
    private placesService:PlacesService
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
        const currentName = imageData.replace(/^.*[\\\/]/, '');
        const path = imageData.replace(/[^\/]*$/, '');
        File.moveFile(
          path,
          currentName,
          cordova.file.dataDirectory,
          currentName
        )
          .then(
            (data: Entry) => {
              this.imageUrl = data.nativeURL;
              Camera.cleanup();
            }
          )
          .catch(
            err=>{
              this.imageUrl = '';
              const toast = this.toastCtrl.create({
                message: 'Could not save the image. Please try again',
                duration: 2500
              });
              toast.present();
              Camera.cleanup();
            }
          )
        this.imageUrl = imageData;
      })
      .catch(err=>{
        const toast = this.toastCtrl.create({
          message: 'Could not take the image. Please try again',
          duration: 2500
        });
        toast.present();
        Camera.cleanup();

      })
  }

  onSubmit(form:NgForm){
    let place = form.value;
    this.placesService.addPlace(
      place.title,
      place.description,
      this.location,
      this.imageUrl
    );
    form.reset();
    this.location = {
      lat: 45.7896645,
      lng: 11.9168145
    };
    this.locationIsSet = false;
    this.imageUrl = "";
  }

}
