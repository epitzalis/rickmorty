import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private readonly DEFAULT_LANG: string = 'en'

  constructor(
    private readonly translateService: TranslateService,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.setlanguage();
  }

  private setlanguage(): void {
    this.translateService.setDefaultLang(this.DEFAULT_LANG);
    const userLang = this.document.defaultView.navigator?.language ?? this.DEFAULT_LANG
    this.translateService.use(userLang.substring(0, 2));
  }

}
