import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './services/task.service';
import { VideosComponent } from './videos/videos.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
