import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatMessagesService } from 'src/app/services/chat-messages.service';

@Component({
  selector: 'ngchat-general-chat',
  templateUrl: './general-chat.component.html',
  styleUrls: ['./general-chat.component.scss']
})
export class GeneralChatComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  CurrentMessage: string;
  Messages: string[] = [];
  constructor(private chatService: ChatMessagesService) { }

  ngOnInit(): void {
    this.subscription = this.chatService.GetMessages('').subscribe((msg: string) => {
      this.Messages.push(msg);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  SendMessage(): void {
    this.chatService.SendMessage(this.CurrentMessage);
    //this.Messages.push(this.CurrentMessage);
    this.CurrentMessage = '';
  }

}
