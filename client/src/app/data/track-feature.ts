import * as chroma from 'chroma-js';

export class TrackFeature {
	static FeatureTypes = ['danceability', 'energy', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence'];

	id:string;
	valence:number;
	energy:number;


	constructor(objectModel:{}) {
		this.id = objectModel['id'];
		this.valence = objectModel[TrackFeature.FeatureTypes[6]];
		this.energy = objectModel[TrackFeature.FeatureTypes[1]];
	}

	get percentageAString() {
		return (this.valence*100).toFixed() + '%';
	}

	get percentageBString() {
		return (this.energy*100).toFixed() + '%';
	}

	get colorA() {
		return chroma.mix('red', 'green', this.valence, 'hsl').hex();
	}
}
