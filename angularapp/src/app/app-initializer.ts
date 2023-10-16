// import { InjectionToken } from '@angular/core';
// import { DataService } from './shared/data.service';
// import { Observable } from 'rxjs';
// import { result } from 'lodash';

// export function initializeApp(dataService: DataService) {
//     return () =>
//         dataService.fetchData().subscribe((result) => {
//             console.log('result', result);
//             dataService.setData(result);
//         });
// }

// export const APP_INITIALIZER_TOKEN = new InjectionToken<() => void>(
//     'appInitializer'
// );
