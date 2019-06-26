import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-page-screen',
  templateUrl: './main-page-screen.component.html',
  providers: [MessageService]
})
export class MainPageScreenComponent {
  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService
  ) {}
}
