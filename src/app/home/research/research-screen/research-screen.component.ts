import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { River } from '../../../_models/river';
import { MeasuringPoint } from '../../../_models';
import { RiverSection } from '../../../_models/river-section';
import { RiversService } from 'src/app/_services/rivers.service';
import { RiverSectionsService } from 'src/app/_services/river-sections.service';
import { RealMeasuresService } from 'src/app/_services/real-measures.service';
import { SharedPollutedSectionService } from 'src/app/_services/sharedPollutedSectionService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-research-screen',
  templateUrl: './research-screen.component.html',
  providers: [MessageService]
})

export class ResearchScreenComponent implements OnInit, OnDestroy {
  rivers: River[];
  riverSections: RiverSection[];
  measuringPoints: MeasuringPoint[];
  allMeasuringPoints: MeasuringPoint[];
  allRiverSections: RiverSection[];
  selectRiverId: number;
  selectRiverSectionId: number;
  subscribePollutedSection: Subscription;

  dh = 0.5;
  D: number;
  V: number;
  l: number;

  measures: any[];

  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly riversService: RiversService,
    private readonly riverSectionsService: RiverSectionsService,
    private readonly realMeasuresService: RealMeasuresService,
    private readonly sharedPollutedSection: SharedPollutedSectionService
  ) {
    this.riversService.list().subscribe((rivers: River[]) => this.rivers = rivers);
    this.riverSectionsService.list().subscribe((riverSections: RiverSection[]) => {
      this.allRiverSections = riverSections;
      this.setNewRiverSections();
    });
  }

  ngOnInit() {
    this.selectRiverId = null;
    this.selectRiverSectionId = null;
    this.subscribePollutedSection = this.sharedPollutedSection.section.subscribe((section: any) => {
      if (section) {
        this.selectRiverId = section.riverId;
        this.selectRiverSectionId = section.sectionId;
        this.onChangeRiverSections();
      }
    });
    this.sharedPollutedSection.setSection(null);
  }

  ngOnDestroy() {
    this.subscribePollutedSection.unsubscribe();
  }

  setGroupL(event: any) {
    this.l = event.target.value;
  }

  // setStep(event: any) {
  //   this.dh = event.target.value;
  // }

  onChangeRiverSections(event?: any) {
    if (event) {
      this.selectRiverSectionId = event.target.value;
    }
    this.riverSectionsService.getById(this.selectRiverSectionId).subscribe((section: RiverSection) => {
      this.D = section.diffuse;
      this.V = section.velosity;
    });
  }

  forecast(arr: any[], l: number, dh: number): any {
    let datasets: any[];
    let data: any;
    datasets = [];
    data = [];
    const h = [];
    const x: number[][] = [];
    const Kvgl = [];
    const K1l = [];
    const K2l = [];
    let x00 = [];
    let x0 = [];
    const x1 = [];
    const G_l = [];

    x0 = arr.map((item: any) => +item.value);
    x00 = arr.map((item: any) => +item.value + 1);

    const D = this.D;
    const V = this.V;
    const k1 = arr[0].substance.k1;
    const k2 = arr[0].substance.k2;
    const k3 = arr[0].substance.k3;
    const M = x00.length;
    l = +l;
    dh = +dh;
    const substanceValidValue = arr[0].substance.validValue;

    x[0] = [];

    for (let i = 0; i < M; i++) {
      h[0] = 1;
      x1[i] = x0[i] - 0 * x00[i];
      x[0][i] = x0[i];
    }

    x[1] = [];
    Kvgl[1] = [];
    K1l[1] = [];
    K2l[1] = [];

    // Розраховується стан якості води в кожній точці в 1й момент часу
    for (let m = 0; m < M; m++) {
      if (l === 1) { // Якщо l=1
        G_l[1] = -k1 / D;
      }
      if (l === 2) { // Якщо l=2
        G_l[1] = -(k2 / D) * (1 - Math.exp(-k1 * 1));
      }
      if (l === 3) { // Якщо l=3
        G_l[1] = -(k3 / D) * (1 - Math.exp(-k2 * (1 - Math.exp(-k1 * 1)) * 1));
      }
      h[1] = Math.sqrt(1 * dh);
      Kvgl[1][m] = 2 * h[0] + h[0] * (h[0] + h[1]) * V / D -
        h[0] * h[1] * (h[0] + h[1]) * G_l[1];
      K1l[1][m] = (2 * h[0] + h[0] * (h[0] + h[1]) * V / D + 2 * h[1]) / Kvgl[1][m];
      K2l[1][m] = 2 * h[1] / Kvgl[1][m];
      x[1][m] = K1l[1][m] * x[0][m] - K2l[1][m] * x1[m];
    }

    // Розраховується стан якості води в кожній точці в n-й момент часу
    const arrayN: number[] = [];
    for (let m = 0; m < M; m++) {
      let n = 2;
      while (x[n - 1][m] >= substanceValidValue) {
        Kvgl.push([]);
        K1l.push([]);
        K2l.push([]);
        x.push([]);
        if (l === 1) { // Якщо l=1
          G_l[n] = -k1 / D;
        }
        if (l === 2) { // Якщо l=2
          G_l[n] = -(k2 / D) * (1 - Math.exp(-k1 * n));
        }
        if (l === 3) { // Якщо l=3
          G_l[n] = -(k3 / D) * (1 - Math.exp(-k2 * (1 - Math.exp(-k1 * n)) * n));
        }

        h[n] = Math.sqrt(n * dh);
        Kvgl[n][m] = 2 * h[n - 1] + h[n - 1] * (h[n - 1] + h[n]) * V / D -
          h[n - 1] * h[n] * (h[n - 1] + h[n]) * G_l[n];
        K1l[n][m] = (2 * h[n - 1] + h[n - 1] * (h[n - 1] + h[n]) * V / D +
          2 * h[n]) / Kvgl[n][m];
        K2l[n][m] = 2 * h[n] / Kvgl[n][m];
        x[n][m] = K1l[n][m] * x[n - 1][m] - K2l[n][m] * x[n - 2][m];
        n++;
      }
      arrayN.push(n - 1);
    }

    const N = Math.max.apply(null, arrayN);
    // графік
    for (let m = 0; m < M; m++) {
      const dataItem = [];
      for (let n = 0; n <= N; n++) {
        if (x[n][m]) {
          dataItem.push(x[n][m].toFixed(2));
        }
      }

      datasets.push({
        label: arr[m].measuring_point.name,
        data: dataItem,
        fill: true,
        borderColor: '#4bc0c0'
      });
    }

    const labels = [];
    dh = 1;
    for (let n = 0; n <= N; n = n + dh) {
      labels.push(n);
    }

    data = {
      labels: labels,
      datasets: datasets
    };

    return { cleanTime: N, substance: arr[0].substance, x, datasets, data };
  }


  forecastCleaning() {
    this.realMeasuresService.getResults(this.selectRiverSectionId).subscribe((measures: any) => {
      measures = Object.keys(measures).map(key => (measures[key]));
      this.measures = measures.map(measure => this.forecast(measure, this.l, this.dh));
    });
  }

  maxCleanTime(): string {
    let maxTime = 0;
    this.measures.forEach(measure => {
      maxTime = Math.max(maxTime, measure.cleanTime);
    });
    return maxTime.toString();
  }

  setNewRiverSections(event?: any) {
    if (event) {
      this.selectRiverId = event.target.value;
    }

    if (!this.selectRiverId) {
      this.riverSections = this.allRiverSections;
      return;
    }

    this.riverSections = this.allRiverSections
      // tslint:disable-next-line:triple-equals
      .filter((riverSection: RiverSection) => riverSection.river_id == this.selectRiverId);
  }

  compareById(itemFromList: any, item: any): boolean {
    return itemFromList && item
      ? itemFromList.id === item.id
      : itemFromList === item;
  }
}
