import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { River } from '../../../_models/river';
import { MeasuringPoint } from '../../../_models';
import { RiverSection } from '../../../_models/river-section';
import { RiversService } from 'src/app/_services/rivers.service';
import { RiverSectionsService } from 'src/app/_services/river-sections.service';
import { MeasuringPointsService } from 'src/app/_services/measuring-points.service';

@Component({
  selector: 'app-research-screen',
  templateUrl: './research-screen.component.html',
  providers: [MessageService]
})
export class ResearchScreenComponent {
  data: any;

  rivers: River[];
  riverSections: RiverSection[];
  measuringPoints: MeasuringPoint[];
  allMeasuringPoints: MeasuringPoint[];
  allRiverSections: RiverSection[];
  selectRiverId: number;
  selectRiverIdSectionId: number;

  h: number[];
  x: number[][];
  Kvgl: number[][];
  K1l: number[][];
  K2l: number[][];
  x00: number[];
  x0: number[];
  x1: number[];
  M: number;
  G_l: number[];

  dh: number;
  N: number;
  D: number;
  V: number;
  k1: number;
  k2: number;
  k3: number;
  l: number;

  datasets: any[];
  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly riversService: RiversService,
    private readonly riverSectionsService: RiverSectionsService,
    private readonly measuringPointsService: MeasuringPointsService
  ) {
    this.riversService.list().subscribe((rivers: River[]) => this.rivers = rivers);
    this.riverSectionsService.list().subscribe((riverSections: RiverSection[]) => {
      this.allRiverSections = riverSections;
      this.setNewRiverSections();
    });

    this.measuringPointsService.list().subscribe((measuringPoints: MeasuringPoint[]) => {
      this.allMeasuringPoints = measuringPoints;
      this.setNewMeasuringPoints();
    });



    this.datasets = [];

    this.h = [];
    this.x = [];
    this.Kvgl = [];
    this.K1l = [];
    this.K2l = [];
    this.x00 = [];
    this.x0 = [];
    this.x1 = [];
    this.G_l = [];

    this.dh = 1;
    this.N = 24;
    this.D = 1.6;
    this.V = 5.3;
    this.k1 = 0.3;
    this.l = 1;
    this.x00 = [100, 99, 92, 85, 80, 75, 73, 67];
    this.x0 = [99.41, 98, 90.43, 84, 78, 74.46, 72, 66.03];
    this.M = this.x00.length;

    const labels = [];

    const substanceValidValue = 5;

    for (let n = 0; n <= this.N; n = n + this.dh) {
      labels.push(n);
    }

    for (let n = 0; n <= this.N; n++) {
      this.Kvgl.push([]);
      this.K1l.push([]);
      this.K2l.push([]);
      this.x.push([]);
    }

    this.h[0] = 1;
    for (let i = 0; i < this.M; i++) {
      this.h[1] = Math.sqrt(this.dh);
      this.x1[i] = this.x0[i] - this.h[1] * this.x00[i];
      this.x[0][i] = this.x0[i];
    }


    // Розраховується стан якості води в кожній точці в 1й момент часу
    for (let m = 0; m < this.M; m++) {
      if (this.l === 1) { // Якщо l=1
        this.G_l[1] = -this.k1 / this.D;
      }
      if (this.l === 2) { // Якщо l=2
        this.G_l[1] = -(this.k2 / this.D) * (1 - Math.exp(-this.k1 * 1));
      }
      if (this.l === 3) { // Якщо l=3
        this.G_l[1] = -(this.k3 / this.D) * (1 - Math.exp(-this.k2 * (1 - Math.exp(-this.k1 * 1)) * 1));
      }
      this.h[1] = Math.sqrt(this.dh);
      this.Kvgl[1][m] = 2 * this.h[0] + this.h[0] * (this.h[0] + this.h[1]) * this.V / this.D -
        this.h[0] * this.h[1] * (this.h[0] + this.h[1]) * this.G_l[1];
      this.K1l[1][m] = (2 * this.h[0] + this.h[0] * (this.h[0] + this.h[1]) * this.V / this.D + 2 * this.h[1]) / this.Kvgl[1][m];
      this.K2l[1][m] = 2 * this.h[1] / this.Kvgl[1][m];
      this.x[1][m] = this.K1l[1][m] * this.x[0][m] - this.K2l[1][m] * this.x1[m];
    }
    // Розраховується стан якості води в кожній точці в n-й момент часу
    const arrayN: number[] = [];
    for (let m = 0; m < this.M; m++) {
      let n = 1;
      while (this.x[n][m] >= substanceValidValue) {
        n++;
        if (this.l === 1) { // Якщо l=1
          this.G_l[n] = -this.k1 / this.D;
        }
        if (this.l === 2) { // Якщо l=2
          this.G_l[n] = -(this.k2 / this.D) * (1 - Math.exp(-this.k1 * n));
        }
        if (this.l === 3) { // Якщо l=3
          this.G_l[n] = -(this.k3 / this.D) * (1 - Math.exp(-this.k2 * (1 - Math.exp(-this.k1 * n)) * n));
        }

        this.h[n] = Math.sqrt(n * this.dh);
        this.Kvgl[n][m] = 2 * this.h[n - 1] + this.h[n - 1] * (this.h[n - 1] + this.h[n]) * this.V / this.D -
          this.h[n - 1] * this.h[n] * (this.h[n - 1] + this.h[n]) * this.G_l[n];
        this.K1l[n][m] = (2 * this.h[n - 1] + this.h[n - 1] * (this.h[n - 1] + this.h[n]) * this.V / this.D +
          2 * this.h[n]) / this.Kvgl[n][m];
        this.K2l[n][m] = 2 * this.h[n] / this.Kvgl[n][m];
        this.x[n][m] = this.K1l[n][m] * this.x[n - 1][m] - this.K2l[n][m] * this.x[n - 2][m];
      }
      arrayN.push(n);
    }
    console.log(this.x);

    this.N = Math.max.apply(null, arrayN);
    // графік
    for (let m = 0; m < this.M; m++) {
      const data = [];
      for (let n = 0; n <= this.N; n++) {
        if (this.x[n][m]) {
          data.push(this.x[n][m].toFixed(2));
        }
      }

      this.datasets.push({
        label: 'x' + m,
        data: data,
        fill: true,
        borderColor: '#4bc0c0'
      });
    }
    this.data = {
      labels: labels,
      datasets: this.datasets
    };
  }


  forecastCleaning() {
    console.log('forecastCleaning!');
  }

  onChangeRiverSections(event: any) {
    this.selectRiverIdSectionId = event.target.value;
    this.setNewMeasuringPoints(this.selectRiverIdSectionId);
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
    console.log(this.measuringPoints);
  }
}
