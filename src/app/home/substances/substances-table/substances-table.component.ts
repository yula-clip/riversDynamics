import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { TableContent } from '../../../_models/table-content';
import { Substance } from '../../../_models/substance';
import { SubstancesService } from '../../../_services/substances.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-substances-table',
  templateUrl: './substances-table.component.html',
  providers: [MessageService]
})
export class SubstancesTableComponent extends TableContent<Substance> {
  public substances: Substance[];
  constructor(
    private readonly substancesService: SubstancesService,
    private readonly modalService: BsModalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super(substancesService, modalService, router, activatedRoute);
  }

  protected onComponentInit() {
    library.add(faPlus);
    this.getItems();
  }

  public setItems(_substances: Substance[]) {
    this.substances = _substances;
  }
}
