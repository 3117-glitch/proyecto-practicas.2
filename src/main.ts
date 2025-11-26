import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// Removed AppModule and platformBrowserDynamic imports as they are not needed with bootstrapApplication
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
