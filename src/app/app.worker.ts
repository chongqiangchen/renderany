/// <reference lib="webworker" />

import less from './less';
import {fromEvent} from 'rxjs';

fromEvent(self, 'message').subscribe(({data}: any) => {
  less.render(data).then(
    (result) => {
      postMessage(result);
    },
  );
});
