import { OpaqueToken } from 'angular2/core';

export const AppConfig = new OpaqueToken('appconfig');

export function loadFromGlobal(name) {
  return window[name];
}
