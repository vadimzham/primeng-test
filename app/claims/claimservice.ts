import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Claim} from '../../app/claims/claim';

@Injectable()
export class ClaimService {

    constructor(private http: Http) {}

    getClaimsMedium() {
        return this.http.get('app/resources/data/claims.json')
                    .toPromise()
                    .then(res => <Claim[]> res.json().data)
                    .then(data => { return data; });
    }
}
