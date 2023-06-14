import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResourceData } from 'src/app/data/resource-data';
import { TrackData } from 'src/app/data/track-data';
import { TrackFeature } from 'src/app/data/track-feature';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  // @Output() noticeEvent = new EventEmitter<void>();
  resources:ResourceData[];
  tracks:TrackData[] = [];
  ids:string;
  features:TrackFeature[];
  activeClass: string = '';
  hovered:boolean;
  tracksIdAndName = [];
  chartValues = [];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  receiveData(data: ResourceData[]) {
    this.resources = data;
    this.resetDataForChartAndTable();
  }

  resetDataForChartAndTable(){
    this.chartValues = [];
    this.tracks = [];
  }

  changeActive(id: string){
    this.activeClass = id;
    this.spotifyService.getTracksForPlaylist(id)
    .then(data=>{
      this.tracks = data
      console.log(this.tracks)
      this.tracksIdAndName = data.map(element => {
        console.log(element.artists.map(artist => artist.name).join(", "))
        return {
          "name": element.name,
          "artist": element.artists.map(artist => artist.name).join(", ")
        }
      })
      this.ids = data.map(element => element.id).join(",")
    })
    .then(() => {
      // console.log(this.ids)
      this.spotifyService.getAudioFeaturesForTrack(this.ids)
        .then(data=>{
          this.features = data
          this.chartValues = [];
          for (let i = 0; i < this.tracksIdAndName.length; i++) {
            this.chartValues.push(Object.assign(this.tracksIdAndName[i], this.features[i]))
          }
        
        })
        .catch(error => {
          console.error('carousel-card | getAudioFeaturesForTrack(): ', error);
        });
    })
    .catch(error => {
      console.error('carousel-card component | getTracksForPlaylist(): ', error);
    });
  }

}
