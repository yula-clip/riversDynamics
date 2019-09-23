import { Component, OnInit, Input } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AuthenticationService } from '../../_services';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  constructor(private readonly authService: AuthenticationService) { }

  ngOnInit() {
    library.add(faAngleDown);
  }

  public isOpenedAdministration(...links: any[]) {
    return links.some((link: any) => link.isActive);
  }

  public showForAdmin(): boolean {
    if (this.authService.getCurrentUser.isAdmin) {
      return true;
    }
    return false;
  }
}
