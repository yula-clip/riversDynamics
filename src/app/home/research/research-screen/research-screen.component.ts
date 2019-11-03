import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';

@Component({
  selector: 'app-research-screen',
  templateUrl: './research-screen.component.html',
  providers: [MessageService]
})
export class ResearchScreenComponent {
  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService
  ) {}
}
