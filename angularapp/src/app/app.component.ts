import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './shared/data.service';
import { updateDefaultNavigation } from './mock-api/common/navigation/data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor(private dataService: DataService) {
        this.updateDefaultNavigationFromApi();
    }
    data$: Observable<any>;
    updateDefaultNavigationFromApi() {
        this.data$ = this.dataService.getData();
        this.data$.subscribe((data) => {
            if (data && data.status === 'Sucess') {
                const userData = data.data;
                console.log('userData', userData);
                const navigation = userData.navigations;
                console.log('navigations', navigation);
                updateDefaultNavigation(navigation);
            }
        });
    }
}
