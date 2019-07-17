import { Component, Input, ViewChild, OnInit, forwardRef } from '@angular/core';
import { PickList } from 'primeng/picklist';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-pick-list',
  templateUrl: './pick-list.component.html',
  styleUrls: ['./pick-list.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickItemListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PickItemListComponent,
      multi: true
    }
  ]
})
export class PickItemListComponent implements OnInit, ControlValueAccessor, Validator {
  targetList: any[];

  @Input() sourceList: any[];
  @Input() sourceListHeader: string;
  @Input() targetListHeader: string;

  @ViewChild('pickListComponent') pickListComponent: PickList;

  ngOnInit() {
  }

  onMove() {
    this.pickListComponent.resetFilter();
    this.onChange(this.pickListComponent.target);
  }

  writeValue(value: any) {
    this.targetList = value || [];
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
