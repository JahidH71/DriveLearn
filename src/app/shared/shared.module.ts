import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatButtonComponent } from './components/chat-button/chat-button.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    NotificationsComponent,
    ChatComponent,
    ChatButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[HeaderComponent,ChatComponent,
    ChatButtonComponent, FooterComponent,ProfileComponent,NotificationsComponent]
})
export class SharedModule { }
