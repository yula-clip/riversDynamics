import { OnInit, TemplateRef } from '@angular/core';
import { AppConstants } from '../app-constants';
import { AbstractEntity } from '../_models/abstract-entity';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/components/common/messageservice';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { BaseCRUDService } from '../_services/base-crud.service';
import * as moment from 'moment';


export abstract class EditContent<T extends AbstractEntity> implements OnInit {
  public modalRef: BsModalRef;
  public defaultPageOption: number;
  public pageOptions: number[];
  public editForm: FormGroup;
  public itemId: number;
  public loading: boolean;
  public isCreate: boolean;

  constructor(
    private readonly _location: Location,
    private readonly _service: BaseCRUDService<T>,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _messageService: MessageService,
    private readonly _modalService: BsModalService

  ) {
    this.defaultPageOption = AppConstants.DEFAULT_PAGE_OPTIONS;
    this.pageOptions = AppConstants.PAGE_OPTIONS;
  }

  ngOnInit() {
    this.editForm = this.buildForm();
    library.add(faPencilAlt, faTrash, faPlus);
    this._activatedRoute.params.subscribe(params => {
      this.itemId = params['id'];
      if (!this.itemId) {
        this.isCreate = true;
        return;
      }
      this.isCreate = false;
    });
    this.onComponentInit();
    if (!this.itemId) {
      return;
    }
    this.getItem(this.itemId);
  }

  protected onEditScreenOpened(item: T) { }
  protected abstract onComponentInit(): void;
  protected abstract buildForm(): FormGroup;
  protected abstract beforeSubmit(): void;

  public createItem(item: T) {
    this.loading = true;
    this._service.create(item).subscribe(
      () => {
        this.cancel();
      },
      this.handleError()
    );
  }

  public updateItem(item: T) {
    this.loading = true;
    this._service.update(item).subscribe(
      () => {
        this.cancel();
      },
      this.handleError()
    );
  }

  private handleError(): any {
    return (errorMessage: string) => {
      this.addErrorMessage(errorMessage);
      this.loading = false;
    };
  }

  public getItem(itemId: number) {
    this._service.getById(itemId).subscribe(
      (item: T) => {
        this.onEditScreenOpened(item);

        if (item.date) {
          item.date = moment(item.date).toDate();
        }
        this.editForm.reset(item);
      },
      (errorMessage: string) => {
        this.addErrorMessage(errorMessage);
      });
  }

  public cancel() {
    this._location.back();
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  public onSubmit() {
    this.beforeSubmit();
    if (this.editForm.invalid) {
      return;
    }
    const item: T = Object.assign({}, { id: this.itemId }, this.editForm.value);
    if (this.itemId) {
      this.updateItem(item);
      return;
    }
    this.createItem(item);
  }

  private addErrorMessage(errorMessage: string) {
    this._messageService.add({ severity: 'error', summary: 'Error Message', detail: errorMessage });
  }

  public isFieldError(fieldName: string): boolean {
    return this.editForm.get(fieldName).invalid && (this.editForm.get(fieldName).dirty || this.editForm.get(fieldName).touched);
  }

  public getErrorParam(fieldName: string, errorName: string): string {
    return this.editForm.get(fieldName).errors[errorName];
  }

  public closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}
