import { Component } from '@angular/core';


declare var gapi: any;

const CLIENT_ID = '528582006686-efaf6ki6a2v9a6v9fsujv1uj2u1gj5l6.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

// Authorization scopes required by the API. If using multiple scopes,
// separated them with spaces.
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const channelform = document.getElementById('channel-form');
const channelInput = document.getElementById('channel-input');
const channelData = document.getElementById('channel-data');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppComponent';

  
  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }


   initClient() {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
     console.log('google client OK!!')
    });
  }

}
