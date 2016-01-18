import { provide, Injectable, Inject } from 'angular2/core';
import { Http, URLSearchParams } from 'angular2/http';
import { AppConfig } from './app-config.service';

interface GeocodeServiceOptions {
  baseUri?: string,
  dataset?: string,
  proximity?: number[],
  accessToken: string
}

const DEFAULT_OPTIONS = {
  baseUri: 'https://api.mapbox.com/geocoding/v5/',
  dataset: 'mapbox.places'
}

@Injectable()
export default class GeocodeService {

  private options: any;
  private http: Http;

  constructor(options: GeocodeServiceOptions, http: Http) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.http = http;
  }

  formatQuery(query = '') {
    return encodeURIComponent(query.replace(/;/g, ''));
  }

  forwardGeocode(query = '') {
    const { baseUri, dataset, proximity, accessToken } = this.options;

    query = this.formatQuery(query);

    const searchParams = new URLSearchParams();

    searchParams.set('access_token', accessToken);

    if (proximity) {
      searchParams.set('proximity', proximity.join(','));
    }

    const uri = `${baseUri}${dataset}/${query}.json`;

    return this.http.get(uri, { search: searchParams })
      .map(response => response.json());
  }
}
