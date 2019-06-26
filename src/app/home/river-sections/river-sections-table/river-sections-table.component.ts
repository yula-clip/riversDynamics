import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { TableContent } from '../../../_models/table-content';
import { RiverSection } from '../../../_models/river-section';
import { RiverSectionsService } from '../../../_services/river-sections.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-river-sections-table',
  templateUrl: './river-sections-table.component.html',
  providers: [MessageService]
})
export class RiverSectionsTableComponent extends TableContent<RiverSection> {
  public rivers: RiverSection[];
  constructor(
    private readonly riversService: RiverSectionsService,
    private readonly modalService: BsModalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super(RiverSectionsService, modalService, router, activatedRoute);
  }

  protected onComponentInit() {
    library.add(faPlus);
    // this.getItems();
    this.rivers = [new RiverSection(1, 'Прут'), new RiverSection(2, 'Дніпро'),
    new RiverSection(3, 'Сірет'), new RiverSection(4, 'Дністер')];
  }

  public setItems(_rivers: RiverSection[]) {
    this.rivers = _rivers;
  }
}
