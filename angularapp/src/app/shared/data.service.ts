import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environment/environment';
import { CommonService } from 'app/Service/api.client.generated';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    basepath = environment.apiUrl;
    getDatapath = this.basepath + 'Common/';
    private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public data$: Observable<any> = this.dataSubject.asObservable();
    constructor(
        private http: HttpClient,
        private commonService: CommonService
    ) {}
    fetchData(): Observable<any> {
        const token = localStorage.getItem('accessToken');

        return this.commonService.getUserDetails(token);
    }

    setData(data: any): void {
        this.dataSubject.next(data);
    }

    getData(): Observable<any> {
        console.log('ss');
        return this.data$;
    }
}
