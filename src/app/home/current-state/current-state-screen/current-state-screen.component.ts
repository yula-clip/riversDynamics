import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { River } from '../../../_models/river';
import { RiverSection } from '../../../_models/river-section';
import { RiversService } from 'src/app/_services/rivers.service';
import { RiverSectionsService } from 'src/app/_services/river-sections.service';
import { MeasuringPoint, RealMeasure } from 'src/app/_models';
import { RealMeasuresService } from 'src/app/_services/real-measures.service';
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
  allRiverSections: RiverSection[];
  selectRiverId: number;
  selectRiverSectionId: number;
  map: any;
  measures: RealMeasure[];

  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly riversService: RiversService,
    private readonly riverSectionsService: RiverSectionsService,
    private readonly realMeasuresService: RealMeasuresService
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
  }

  getMeasuresBySectionId(id: number) {
    this.realMeasuresService.getBySubstanceId(id).subscribe((measures: RealMeasure[]) => {
      this.measures = measures;
      const measuringPoints = measures.map((measure: any) => measure.measuring_point);
      this.buildMap(measuringPoints);
    });
  }

  isInvalidValue(value: number, validValue: number): boolean {
    return value > validValue;
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

  buildMap(points: MeasuringPoint[]) {
    this.overlays = [];
    let lat = 0;
    let lng = 0;

    if (points.length) {
      points.forEach((point: MeasuringPoint) => {
        lat = lat + +point.x;
        lng = lng + +point.y;
        this.overlays.push(
          new google.maps.Marker({
            position: { lat: +point.x, lng: +point.y }, title: `${point.name}, x: ${point.x}, y: ${point.y}`,
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

      this.options.center = { lat: lat / points.length, lng: lng / points.length };
      this.map.setOptions(this.options);
    }
  }


  onChangeRiverSections(event: any) {
    this.selectRiverSectionId = event.target.value;
    this.getMeasuresBySectionId(this.selectRiverSectionId);
  }
}
