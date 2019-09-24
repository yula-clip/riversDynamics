import { OnInit, TemplateRef } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppConstants } from '../app-constants';
import { AbstractEntity } from '../_models/abstract-entity';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseCRUDService } from '../_services/base-crud.service';

export abstract class TableContent<T extends AbstractEntity> implements OnInit {
    public modalRef: BsModalRef;
    public itemToDelete: T;
    public defaultPageOption: number;
    public pageOptions: number[];
    public error: string;

    constructor(
        private readonly _service: BaseCRUDService<T>,
        private readonly _modalService: BsModalService,
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute
    ) {
        this.defaultPageOption = AppConstants.DEFAULT_PAGE_OPTIONS;
        this.pageOptions = AppConstants.PAGE_OPTIONS;
    }

    ngOnInit() {
        library.add(faPencilAlt, faTrash);
        this.onComponentInit();
    }

    protected abstract onComponentInit(): void;

    public showDeleteConfirmation(item: T, template: TemplateRef<any>) {
        this.itemToDelete = item;
        this.openModal(template);
    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this._modalService.show(template);
    }

    public deleteItem(itemId: number) {
        this._service.delete(itemId).subscribe(
            () => {
                this.modalRef.hide();
                this.getItems();
            },
            (error: string) => {
                this.error = error;
                this.getItems();
            }
        );
    }

    public getItems() {
        this._service.list().subscribe((items: T[]) => {
            this.setItems(items);
        });
    }

    public abstract setItems(items: T[]): void;

    public openCreateScreen() {
        this._router.navigate(['add'], { relativeTo: this._activatedRoute });
    }

    public openEditScreen(item: T) {
        this._router.navigate([item.id], { relativeTo: this._activatedRoute });
    }
}
