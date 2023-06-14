import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import embed from 'vega-embed';

@Component({
  selector: 'app-vega-viz',
  templateUrl: './vega-viz.component.html',
  styleUrls: ['./vega-viz.component.css']
})
export class VegaVizComponent implements OnInit {
  @Input() chartValues;
  
  constructor(private spotifyService:SpotifyService) { }

  // when chart data changed, re-generate the chart
  ngOnChanges(changes: SimpleChanges) {
    // console.log("CCCHANGE")
    // console.log(this.chartValues)
    this.generateChart();
  }

  ngOnInit() {
    // console.log("FOR  CHHHHHART")
    // console.log(this.chartValues)
    this.generateChart();
  }

  generateChart(){
    // spec for generate vega lite chart
    const tmp = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "",
      "title": "Energy/Valence visualization",
      "data": {"values": this.chartValues},
      "transform": [{
        "window": [{"op": "row_number", "as": "row_number"}]
      }],
      "hconcat": [{
        "params": [{"name": "brush", "select": "interval"}],
        "mark": {"type": "circle", "size": 60, "tooltip": {"content": "data"}},
        "encoding": {
          "x": {"field": "energy", "type": "quantitative"},
          "y": {"field": "valence", "type": "quantitative"},
          "color": {
            "condition": {"param": "brush", "type": "ordinal"},
            "value": "grey"
          }
        }
      }, {
        "transform": [
          {"filter": {"param": "brush"}},
          {"window": [{"op": "rank", "as": "rank"}]},
          {"filter": {"field": "rank", "lt": 20}}
        ],
        "hconcat": [{
          "width": "length(energy)",
          "title": "energy",
          "mark": "text",
          "encoding": {
            "text": {"field": "energy", "type": "nominal"},
            "y": {"field": "row_number", "type": "ordinal", "axis": null}
          }
        }, {
          "width": "length(valence)",
          "title": "valence",
          "mark": "text",
          "encoding": {
            "text": {"field": "valence", "type": "nominal"},
            "y": {"field": "row_number", "type": "ordinal", "axis": null}
          }
        }, {
          "width": "length(name)",
          "title": "name",
          "mark": "text",
          "encoding": {
            "text": {"field": "name", "type": "nominal"},
            "y": {"field": "row_number", "type": "ordinal", "axis": null}
          }
        }]
      }],
      "resolve": {"legend": {"color": "independent"}}
    } as any;
    embed("#vis",tmp);
  }
}
