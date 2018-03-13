

import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';


import L from 'leaflet';
import 'leaflet.markercluster';


/**
 * Generated class for the Summary page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
})
export class HelloIonicPage {

  @ViewChild('map') mapContainer: ElementRef;
  mymap: any;
  myButton: any;
  enableFiler : boolean = false;

  public OurCustomControl = L.Control.extend({
    options: {
      position: 'topleft'
      //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
    },
    initialize: function (options) {
      console.log(JSON.stringify(options));
      this.options = L.Util.setOptions(this, options);
    },
    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      container.style.backgroundColor = 'white';
      container.style.width = '30px';
      container.style.height = '30px';
      L.DomEvent.addListener(container, 'click',  this.options.onCl);
      return container;
    }
  });

  constructor(private ngZone: NgZone, public navCtrl: NavController, public navParams: NavParams) {
    //this.addGraph();
  }

  loadmap() {
    this.mymap = L.map('map').setView([39.0097, -95.844], 4);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(this.mymap);


    L.marker([39.809734, -98.55562]).addTo(this.mymap)
      .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    var filterButtonOptions = {
      'position': 'bottomright',
      //'onCl': function() { console.log("button cl clicked");}
      'onCl': this.buttonClicked
    }
    this.myButton = new this.OurCustomControl(filterButtonOptions).addTo(this.mymap);

    console.log("loading done");
  }

  buttonClicked() {
    console.log("button cl clicked");
    this.ngZone.run(() => this.enableFiler = true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Summary');
    this.loadmap();
  }

}
