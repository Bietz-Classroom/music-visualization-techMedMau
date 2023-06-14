import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  @Output() dataEvent: EventEmitter<ResourceData[]> = new EventEmitter<ResourceData[]>();
  searchString:string = '';
  searchCategory:string = 'playlist';
  resources:ResourceData[];
  warningText:string = '';

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }
  

  passData() {
    // console.log("search pass data to home")
    this.dataEvent.emit(this.resources);
  }

  search() {
    // show warning when no input
    if(this.searchString === null || this.searchString === ''){
      this.warningText = "Please enter words for searching"
      return;
    }else{
      this.warningText = '';
    }

    // get playlist data from API
    this.spotifyService.searchFor(this.searchCategory, this.searchString)
    .then(data=>{
      console.log(data)
      this.resources = data
      // show warning when no result
      if(this.resources.length === 0){
        this.warningText = "No result"
      }else{
        this.warningText = "";
      }
      this.passData()
    }).catch(error => {
      console.error('Search component: ', error);
    });
  }

}
