import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {InputText, DataTable, Button, Dialog, Column, Header, Footer} from 'primeng/primeng';
import {Claim} from './claims/claim';
import {ClaimService} from './claims/claimservice';

@Component({
  templateUrl: 'app/app.component.html',
  selector: 'my-app',
  directives: [InputText, DataTable, Button, Dialog, Column, Header, Footer],
  providers: [HTTP_PROVIDERS, ClaimService]
})
export class AppComponent {

  displayDialog: boolean;

  claim: Claim = new PrimeClaim();

  selectedClaim: Claim;

  newClaim: boolean;

  claims: Claim[];

  constructor(private claimService: ClaimService) { }

  ngOnInit() {
    this.claimService.getClaimsMedium().then(claims => this.claims = claims);
  }

  showDialogToAdd() {
    this.newClaim = true;
    this.claim = new PrimeClaim();
    this.displayDialog = true;
  }

  save() {
    if (this.newClaim)
      this.claims.push(this.claim);
    else
      this.claims[this.findSelectedClaimIndex()] = this.claim;

    this.claim = null;
    this.displayDialog = false;
  }

  delete() {
    this.claims.splice(this.findSelectedClaimIndex(), 1);
    this.claim = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newClaim = false;
    this.claim = this.cloneClaim(event.data);
    this.displayDialog = true;
  }

  cloneClaim(c: Claim): Claim {
    let claim = new PrimeClaim();
    for (let prop in c) {
      claim[prop] = c[prop];
    }
    return claim;
  }

  findSelectedClaimIndex(): number {
    return this.claims.indexOf(this.selectedClaim);
  }
}

class PrimeClaim implements Claim {

  constructor(public first_name?, public last_name?, public event_date?, public attendees?, public company_name?, public company_address?, public company_industry?) { }
}
