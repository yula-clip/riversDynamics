import { Component, OnInit, Input } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  ngOnInit() {
    library.add(faAngleDown);
  }

  public isOpenedAdministration(...links: any[]) {
    return links.some((link: any) => link.isActive);
  }
}
