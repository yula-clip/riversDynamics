import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedPollutedSectionService {
  private readonly sectionSource = new BehaviorSubject(null);
  readonly section = this.sectionSource.asObservable();

  setSection(section: any) {
    this.sectionSource.next(section);
  }
}
