import {Component} from '@angular/core';
import lessValue from '../assets/theme.js';
import {changesValue, add} from './default';
import Sass from 'sass.js/dist/sass.js';
import * as SassWorker from 'sass.js/dist/sass.worker.js';


let worker = null;

if (typeof Worker !== 'undefined') {
  // Create a new
  worker = new Worker('./app.worker', {type: 'module'});
  worker.onmessage = ({data}) => {
    createStyle(data.css);
  };
  worker.postMessage(lessValue);
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'less-webworker-demo';
  btnPrimaryColor = '';
  btnPrimaryBg = '';
  btnHeightBase = '';
  btnHeightLg = '';
  btnHeightSm = '';
  heightBase = '';

  constructor() {
    const sass = new Sass(SassWorker);

    sass.compile('a{color: red}', (result) => {
      console.log("compiled", result.text);
    });
  }

  handle() {
    // '@color: red' + '@color: white'
    worker.postMessage(lessValue + changesValue());
  }

  change(key: string) {
    add(key, this[key]);
    console.log(
      changesValue()
    );
  }
}


const createStyle = (html) => {
  const head = document.querySelector('head');
  let style = document.getElementById('test');
  if (!style) {
    style = document.createElement('style');
    style.id = 'test';
  }
  style.innerHTML = html;
  head.appendChild(style);
};
