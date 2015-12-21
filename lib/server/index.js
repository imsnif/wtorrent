"use strict";

// This file is a temporary ugliness until I decide on a DI framework
import Config from './components/config';
import AppServer from './components/app-server';
import Dashboard from './components/dashboard';
import DownloadFactory from './components/download';
import ZipFactory from './utils/zip';
import Router from './components/router';

import DownloadController from './controllers/download';
import ClientController from './controllers/client';

import WebTorrent from 'webtorrent';

let client = new WebTorrent();
let config = new Config;
let Zip = new ZipFactory(config);

let Download = new DownloadFactory(Zip, config, client);
let dashboard = new Dashboard(Download, client);

let controllers = {
  download: new DownloadController(dashboard),
  client: new ClientController(dashboard)
}

let router = new Router(config, controllers)

let app = new AppServer(router, dashboard, config)

app.init()
