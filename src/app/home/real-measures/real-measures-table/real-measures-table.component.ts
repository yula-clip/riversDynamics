import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { TableContent } from '../../../_models/table-content';
import { RealMeasure } from '../../../_models/real-measure';
import { RealMeasuresService } from '../../../_services/real-measures.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as moment from 'moment';
import { AppConstants } from '../../../app-constants';

@Component({
  selector: 'app-real-measures-table',
  templateUrl: './real-measures-table.component.html',
  providers: [MessageService]
})
export class RealMeasuresTableComponent extends TableContent<RealMeasure> {
  public realMeasures: RealMeasure[];
  constructor(
    private readonly realMeasuresService: RealMeasuresService,
    private readonly modalService: BsModalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    super(realMeasuresService, modalService, router, activatedRoute);
  }

  protected onComponentInit() {
    library.add(faPlus);
    this.getItems();
  }

  public setItems(_realMeasures: RealMeasure[]) {
    this.realMeasures = _realMeasures;
  }

  public convertDate(dateTime: Date): string {
    return moment(dateTime).toDate().toLocaleString(AppConstants.LOCALE, AppConstants.DATE_OPTIONS);
  }

  onUpload(event) {
    this.getItems();
    this.messageService.add({ severity: 'success', summary: 'Успішно імпортовано з файлу', detail: '' });
  }

  onError(event) {
    event.files = [];
    this.messageService.add({ severity: 'error', summary: 'Під час імпорту виникла помилка. Завантажте інший файл', detail: '' });
  }
}
