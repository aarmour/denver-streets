import { provide, Injectable, Inject } from 'angular2/core';
import { Http } from 'angular2/http';
import { AppConfig } from './app-config.service';

interface GeocodeServiceOptions {
  baseUri?: string,
  dataset?: string,
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

  _formatQuery(query = '') {
    return encodeURIComponent(query.replace(/;/g, ''));
  }

  forwardGeocode(query = '') {
    const { baseUri, dataset, accessToken } = this.options;

    query = this._formatQuery(query);

    const uri = `${baseUri}${dataset}/${query}.json?access_token=${accessToken}`;

    return this.http.get(uri)
      .map(response => response.json());
  }
}

export function createGeocodeService(config, http: Http) {
  return new GeocodeService({ accessToken: config.mapbox.accessToken }, http);
}

export const GEOCODE_SERVICE_PROVIDERS = [
  provide(GeocodeService, { useFactory: createGeocodeService, deps: [AppConfig, Http] })
];
