import {Component} from '@angular/core';
import {editor} from 'monaco-editor';
import {LocalStorageService} from './localStorage.service';

let worker = null;

if (typeof Worker !== 'undefined') {
  // Create a new
  worker = new Worker('./app.worker', {type: 'module'});
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}

// tslint:disable-next-line no-any
declare const monaco: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  language = 'less';
  editor: editor.IStandaloneCodeEditor & editor.IStandaloneDiffEditor;
  resultEditor: editor.IStandaloneCodeEditor & editor.IStandaloneDiffEditor;

  constructor(
    private localStorageService: LocalStorageService,
  ) {
  }

  onEditorInit(e: editor.IStandaloneCodeEditor & editor.IStandaloneDiffEditor) {
    this.editor = e;
    this.editor.onDidChangeModelContent(e => {
      this.localStorageService.set(this.language, this.editor.getValue());
      this.compileCss();
    });
    this.updateEditorModelLanguage();
  }

  onResultEditorInit(e: editor.IStandaloneCodeEditor & editor.IStandaloneDiffEditor) {
    this.resultEditor = e;
    this.resultEditor.setModel(monaco.editor.createModel('', 'css'));

    worker.onmessage = ({data}) => {
      this.resultEditor.setModel(monaco.editor.createModel(data, 'css'));
      // @ts-ignore
      this.resultEditor.getAction('editor.action.formatDocument')._run();
    };
  }

  changeLanguage() {
    this.updateEditorModelLanguage();
  }

  updateEditorModelLanguage() {
    const content = this.localStorageService.get(this.language) || '';
    this.editor.setModel(monaco.editor.createModel(content, this.language));
    this.compileCss();
  }

  compileCss() {
    worker.postMessage({
      data: this.localStorageService.get(this.language),
      action: this.language
    });
  }
}
