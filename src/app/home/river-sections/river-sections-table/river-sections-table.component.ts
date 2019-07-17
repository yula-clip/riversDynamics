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
  public riverSections: RiverSection[];
  constructor(
    private readonly riverSectionsService: RiverSectionsService,
    private readonly modalService: BsModalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super(riverSectionsService, modalService, router, activatedRoute);
  }

  protected onComponentInit() {
    library.add(faPlus);
    // this.getItems();
    this.riverSections = [new RiverSection(1, 'Ділянка Прут'), new RiverSection(2, 'Ділянка Дніпро'),
    new RiverSection(3, 'Ділянка Сірет'), new RiverSection(4, 'Ділянка Дністер')];
  }

  public setItems(_riverSections: RiverSection[]) {
    this.riverSections = _riverSections;
  }
}
