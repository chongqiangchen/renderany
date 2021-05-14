/// <reference lib="webworker" />

import less from './less';
import {fromEvent, of} from 'rxjs';
import sass from 'sass.js/dist/sass.sync.js';
import {catchError, distinctUntilChanged, filter, map, switchMap, throttleTime} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

const message$ = fromEvent(self, 'message').pipe(throttleTime(50));

const languages = {
  SCSS: 'scss',
  LESS: 'less'
};

message$
  .pipe(
    filter((e: any) => e.data.action === languages.SCSS),
    map((e: any) => e.data.data),
  )
  .subscribe((data) => {
    try {
      sass.compile(data, (result) => {
        postMessage(result.text);
      });
    } catch (e) {
    }
  });

message$
  .pipe(
    filter((e: any) => e.data.action === languages.LESS),
    map((e: any) => e.data.data),
    switchMap((data) => {
      return fromPromise(less.render(data)).pipe(catchError(err => of('')));
    })
  )
  .subscribe((result: any) => {
    postMessage(result.css);
  });
