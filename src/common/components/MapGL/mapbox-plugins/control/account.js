import md5 from 'blueimp-md5';
const mapbox = require('mapbox-gl');
const { Control, util } = mapbox;

const DEFAULT_OPTIONS = {
  position: 'top-right'
};

const LOCAL_STORAGE_KEY = 'id_token';
const GRAVATAR_URL = 'https://www.gravatar.com/avatar/';

class AccountControl extends Control {

  constructor(options = DEFAULT_OPTIONS) {
    super(options);
    util.setOptions(this, options);

    const { Auth0Lock } = window;
    const { clientId, domain } = window.__ACCOUNTS__;

    const lock = new Auth0Lock(clientId, domain);
    const hash = lock.parseHash(window.location.hash);

    if (hash) {
      if (hash.error) {
        console.error('Unable to sign in:', hash.error);
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, hash.id_token);
        window.location.hash = '';
      }
    }

    const idToken = localStorage.getItem(LOCAL_STORAGE_KEY);

    this.lock = lock;
    this.idToken = idToken;
  }

  onAdd() {
    const className = 'mapboxgl-ctrl';
    const container = this.container = document.createElement('div');

    container.classList.add(className);
    container.classList.add('mapboxgl-ctrl-account-container');

    if (this.idToken) {
      this.lock.getProfile(this.idToken, (error, profile) => {
        if (error) return console.error('Unable to get user profile:', error);

        const avatar = document.createElement('img');

        avatar.src = this.gravatarUrl(profile.email);
        avatar.addEventListener('click', this.signOut.bind(this));
        container.appendChild(avatar);
      });
    } else {
      const signInButton = document.createElement('button');

      signInButton.addEventListener('click', this.showSignIn.bind(this));
      signInButton.textContent = 'Sign In';
      container.appendChild(signInButton);
    }

    return container;
  }

  showSignIn() {
    this.lock.show({
      rememberLastLogin: false
    });
  }

  signOut() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.location.href = '/';
  }

  gravatarUrl(email) {
    const hash = md5(email.trim().toLowerCase());

    return GRAVATAR_URL + hash + '?s=48&d=mm';
  }

}

module.exports = AccountControl;
