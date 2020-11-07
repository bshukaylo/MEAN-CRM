import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from "../../../shared/services/positions.service";
import {Position} from "../../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../../shared/classes/material.service";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  loading = false
  modal: MaterialInstance

  constructor(private positionsService: PositionsService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe(
      positions => {
        this.positions = positions
        this.loading = false
      }
    )
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    debugger
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onPositionSelect(position: Position) {
    //open modal with current position
    this.modal.open()
  }

  onPositionAdd() {
    //add new position
    this.modal.open()
  }

  onModalCancel() {
    this.modal.close()
  }
}
