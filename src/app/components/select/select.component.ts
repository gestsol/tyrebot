import { Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
  @ViewChild('itemList') itemList: ElementRef | null = null
  @Input() items: any[] = []
  @Input() key: string | null = null
  @Input() displayKey: string | null = null
  @Input() name: string = ''
  @Output() change = new EventEmitter()
  onChange = (_: any) => { };
  onTouch = () => { };

  value:any = null
  displayName: number | string = ''
  open = false
  isDisabled = false
  onMouseUp = (event: any) => {}

  constructor() { }

  ngOnInit(): void {
    this.onMouseUp = this.shouldCloseSelect.bind(this)
    window.addEventListener('mouseup', this.onMouseUp)
  }

  ngOnDestroy() {
    window.removeEventListener('mouseup', this.onMouseUp)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this.writeValue(this.value)
    }
  }

  shouldCloseSelect(event: any) {
    if (this.itemList) {
      const element = this.itemList.nativeElement
      const {top, height, left, width} = element.getBoundingClientRect()
      const {clientX, clientY} = event
      if (clientY < top || clientY > top + height || clientX < left || clientX > left + width)
        this.open = false
    }
  }

  focus() {
    this.open = true
  }

  onSelect(item: any) {
    this.setValue(item)
    this.onTouch();
    this.onChange(this.value);
    this.change.emit(this.value);
    this.open = false
  }

  writeValue(value: any): void {
    let newValue: any = null;
    if (this.key != null && this.items.length) {
      newValue = this.items.find(item => item[this.key as string] === value); //|| this.items[0]
    } else {
      newValue = value;
    }
    this.setValue(newValue)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setValue(value: any) {
    if (this.displayKey != null && value != null && value[this.displayKey]) {
      this.displayName = value[this.displayKey]
    } else {
      this.displayName = this.displayKey != null ? '' : value
    }
    if (this.key != null && value != null && value[this.key]) {
      this.value = value[this.key]
    } else {
      this.value = value == null? null: value
    }
  }
}
