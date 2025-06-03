import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import e from 'express';

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.css']
})
export class LanguageToggleComponent implements OnInit {
  currentLang: string = 'ar';

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
   this.currentLang = this.getCurrentLang();
    translate.setDefaultLang(this.currentLang);
    translate.use('ar');
  }

  ngOnInit(): void {
    this.setDirection();
  }

  private setDirection(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }
  }

  switchLang(lang: string) {
    this.currentLang = lang;
     if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('lang', lang);
    }
    this.translate.use(lang);
    this.setDirection();
  }
  getCurrentLang(): string {
    if (isPlatformBrowser(this.platformId)) {
          return localStorage.getItem('lang') || 'ar';
    }
    else{
      return 'ar';
    }
  }
}
