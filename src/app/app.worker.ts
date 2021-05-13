/// <reference lib="webworker" />

import less from './less';
import {fromEvent} from 'rxjs';
import Sass from 'sass.js/dist/sass.sync.js';

fromEvent(self, 'message').subscribe(({data}: any) => {
  less.render(data).then(
    (result) => {
      postMessage(result);
    },
  );

  less.render('@color1: fadein(rgba(0, 0, 0, 0.018), 35%); a {color: @color1; opacity: 0.4}').then(
    (result) => {
      console.log(result.css);
    },
  );

  Sass.compile(`
    a {
     color: fade-in(rgba(0, 0, 0, 0.018), .35);
    }
  `, (result) => {
    console.log(result.text);
  });
});
