import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { TableContent } from '../../../_models/table-content';
import { River } from '../../../_models/river';
import { RiversService } from '../../../_services/rivers.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-rivers-table',
  templateUrl: './rivers-table.component.html',
  providers: [MessageService]
})
export class RiversTableComponent extends TableContent<River> {
  public rivers: River[];
  constructor(
    private readonly riversService: RiversService,
    private readonly modalService: BsModalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super(riversService, modalService, router, activatedRoute);
  }

  protected onComponentInit() {
    library.add(faPlus);
    this.getItems();
  }

  public setItems(_rivers: River[]) {
    this.rivers = _rivers;
  }
}
