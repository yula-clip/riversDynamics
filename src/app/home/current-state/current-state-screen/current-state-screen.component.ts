import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { River } from '../../../_models/river';
import { RiverSection } from '../../../_models/river-section';
import { RiversService } from 'src/app/_services/rivers.service';
import { RiverSectionsService } from 'src/app/_services/river-sections.service';
import { MeasuringPointsService } from 'src/app/_services/measuring-points.service';
import { MeasuringPoint } from 'src/app/_models';
declare var google: any;

@Component({
  selector: 'app-current-state-screen',
  templateUrl: './current-state-screen.component.html',
  providers: [MessageService]
})
export class CurrentStateScreenComponent {
  options: any;
  overlays: any[];
  rivers: River[];
  riverSections: RiverSection[];
  measuringPoints: MeasuringPoint[];
  allMeasuringPoints: MeasuringPoint[];
  allRiverSections: RiverSection[];
  selectRiverId: number;
  selectRiverIdSectionId: number;
  map: any;

  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly riversService: RiversService,
    private readonly riverSectionsService: RiverSectionsService,
    private readonly measuringPointsService: MeasuringPointsService
  ) {
    this.options = {
      center: { lat: 48, lng: 24 },
      zoom: 21
    };

    this.riversService.list().subscribe((rivers: River[]) => this.rivers = rivers);
    this.riverSectionsService.list().subscribe((riverSections: RiverSection[]) => {
      this.allRiverSections = riverSections;
      this.setNewRiverSections();
    });

    this.measuringPointsService.list().subscribe((measuringPoints: MeasuringPoint[]) => {
      this.allMeasuringPoints = measuringPoints;
      this.setNewMeasuringPoints();
    });
  }

  setMap(event) {
    this.map = event.map;
  }

  setNewRiverSections(event?: any) {
    this.selectRiverId = event ? event.target.value : null;

    if (!this.selectRiverId) {
      this.riverSections = this.allRiverSections;
      return;
    }

    this.riverSections = this.allRiverSections
      // tslint:disable-next-line:triple-equals
      .filter((riverSection: RiverSection) => riverSection.river_id == this.selectRiverId);
  }

  setNewMeasuringPoints(sectionid?: number) {
    if (!this.selectRiverIdSectionId) {
      this.measuringPoints = this.allMeasuringPoints;
      return;
    }
    const id = sectionid ? sectionid : this.selectRiverIdSectionId;

    this.measuringPoints = this.allMeasuringPoints
      // tslint:disable-next-line:triple-equals
      .filter((measuringPoint: MeasuringPoint) => measuringPoint.river_section_id == id);
    if (!this.measuringPoints) {
      return;
    }

    this.overlays = [];
    let lat = 0;
    let lng = 0;
    this.measuringPoints.forEach((point: MeasuringPoint) => {
      lat = lat + +point.x;
      lng = lng + +point.y;
      this.overlays.push(
        new google.maps.Marker({
          position: { lat: +point.x, lng: +point.y }, title: point.name,
          icon: 'http://www.google.com/mapfiles/markerA.png'
        })
      );

      this.overlays.push(
        new google.maps.Circle({
          center: { lat: +point.x as number, lng: +point.y as number }, fillColor: '#1976D2',
          fillOpacity: 0.35, strokeWeight: 1, radius: 1, title: point.name
        })
      );
    });

    this.options.center = { lat: lat / this.measuringPoints.length, lng: lng / this.measuringPoints.length };
    this.map.setOptions(this.options);
  }


  onChangeRiverSections(event: any) {
    this.selectRiverIdSectionId = event.target.value;
    this.setNewMeasuringPoints(this.selectRiverIdSectionId);
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add(
      {
        key: 'riverWarn', sticky: true, severity: 'warn', summary: 'Зверніть увагу!',
        detail: 'Рівень забрудняння на певній ділянці річки перевищує норму.'
      }
    );
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}
