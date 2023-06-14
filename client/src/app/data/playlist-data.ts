import { ResourceData } from './resource-data';
import { ArtistData } from './artist-data';

export class PlaylistData extends ResourceData {
    // category:string = "unknown";
	// name:string;
	// imageURL:string;
	// id:string;
	// url:string;
	genres:string[];
	artists:ArtistData[];
    description: string;

	constructor(objectModel:{}) {
		super(objectModel);
		this.category="playlist";
        this.id = objectModel['id'];
        this.name = objectModel['name']
        this.description = objectModel['description']
        if(objectModel['images'].length > 0) {
			this.imageURL = objectModel['images'][0].url;
		} else {
			this.imageURL = '../../assets/unknown.jpg';
		}
        this.url = objectModel['tracks']['href'];
	}
}