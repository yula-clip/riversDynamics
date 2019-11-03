import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';

@Component({
  selector: 'app-current-state-screen',
  templateUrl: './current-state-screen.component.html',
  providers: [MessageService]
})
export class CurrentStateScreenComponent {
  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService
  ) { }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add(
      {
        key: 'riverWarn', sticky: true, severity: 'warn', summary: 'Зверніть увагу!',
        detail: 'Рівень забрудняння на певній ділянці річки перевищує норму.'
      }
    );
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}
