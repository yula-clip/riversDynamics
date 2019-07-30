import { Component, OnInit, forwardRef, TemplateRef } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator,
  AbstractControl, ValidationErrors, FormGroup, FormBuilder, Validators
} from '@angular/forms';
import { CleaningSubstance } from '../../../_models/cleaning-substance';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CustomValidators } from '../../../custom-validators';
import { Substance } from '../../../_models';

@Component({
  selector: 'app-cleaning-substances',
  templateUrl: './cleaning-substances.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CleaningSubstancesComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CleaningSubstancesComponent,
      multi: true
    }
  ]
})

export class CleaningSubstancesComponent implements OnInit, ControlValueAccessor, Validator {
  itemToProcess: any;
  bsModalRef: BsModalRef;

  substances: Substance[];
  cleaningSubstanceForm: FormGroup;

  cleaningSubstances: CleaningSubstance[];

  constructor(
    private readonly modalService: BsModalService,
    private readonly formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.substances = [new Substance(1, 'Прут'), new Substance(2, 'Дніпро'),
    new Substance(3, 'Сірет'), new Substance(4, 'Дністер')];
    this.cleaningSubstanceForm = this.buildForm();
    library.add(faTrash, faPencilAlt, faPlus);
  }

  showConfirmation(template: TemplateRef<any>, classTitle?: string, item?: any) {
    this.beforeModalOpen(item);
    const config = {
      class: `${classTitle ? classTitle : ''} modal-dialog-centered`
    };
    this.bsModalRef = this.modalService.show(template, config);
    const onHideSubscription = this.modalService.onHide.subscribe(() => {
      this.beforeModalClose();
      onHideSubscription.unsubscribe();
    });
  }

  closeModal() {
    if (this.bsModalRef) {
      this.bsModalRef.hide();
    }
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      substance: [null, [Validators.required]],
      count: [null, [Validators.required]],
    });
  }

  beforeModalOpen(item?: CleaningSubstance) {
    if (!item) {
      this.itemToProcess = null;
      return;
    }
    this.itemToProcess = item;
    this.cleaningSubstanceForm.reset(item);
  }

  beforeModalClose() {
    this.cleaningSubstanceForm.reset();
  }

  deleteCleaningSubstance() {
    const item = this.itemToProcess;
    if (!this.cleaningSubstances) {
      return;
    }
    this.editArray(item, true);
    this.onChange(this.cleaningSubstances);
    this.closeModal();
  }

  addCleaningSubstance() {
    const item: CleaningSubstance = { ...this.cleaningSubstanceForm.value };
    if (this.cleaningSubstanceForm.invalid) {
      return;
    }

    if (this.itemToProcess) {
      this.editArray(item, false);
    } else {
      this.cleaningSubstances.push(item);
    }
    this.onChange(this.cleaningSubstances);
    this.closeModal();
  }

  private editArray(item: any, isDelete: boolean) {
    for (let i = 0; i < this.cleaningSubstances.length; i++) {
      if ((this.cleaningSubstances[i].substance.name === item.substance.name) && (this.cleaningSubstances[i].count === item.count)) {
        isDelete ? this.cleaningSubstances.splice(i, 1) : this.cleaningSubstances[i] = item;
      }
    }
  }

  getErrorParam(fieldName: string, errorName: string): string {
    return CustomValidators.GET_ERROR_PARAM(this.cleaningSubstanceForm, fieldName, errorName);
  }

  isFieldError(fieldName: string): boolean {
    return CustomValidators.IS_FIELD_ERROR(this.cleaningSubstanceForm, fieldName);
  }

  getRecipientcleaningSubstancesEnum(variable: string): string {
    return `recipientContactEnums.${variable}`;
  }

  writeValue(value: any) {
    this.cleaningSubstances = value || [];
    this.onChange(value);
  }

  validate(control: AbstractControl): ValidationErrors | undefined {
    if (!control.value || control.value.length === 0) {
      return { 'required': true };
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChange: any = () => { };

  onTouched: any = () => { };

  registerOnValidatorChange?(fn: () => void): void { }
}
