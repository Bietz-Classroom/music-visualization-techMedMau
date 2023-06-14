import { Component, OnInit, Input } from '@angular/core';
import { PlaylistData } from '../../data/playlist-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
  // get the playlist data from home-page component
  @Input() resource:PlaylistData;

  constructor() { }

  ngOnInit() { }
}
