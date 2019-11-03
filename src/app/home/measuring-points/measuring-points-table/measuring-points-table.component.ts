import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { TableContent } from '../../../_models/table-content';
import { MeasuringPointsService } from '../../../_services/measuring-points.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MeasuringPoint } from '../../../_models';

@Component({
  selector: 'app-measuring-points-table',
  templateUrl: './measuring-points-table.component.html',
  providers: [MessageService]
})
export class MeasuringPointsTableComponent extends TableContent<MeasuringPoint> {
  public measuringPoints: MeasuringPoint[];
  constructor(
    private readonly riversService: MeasuringPointsService,
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

  public setItems(_measuringPoints: MeasuringPoint[]) {
    this.measuringPoints = _measuringPoints;
  }
}
