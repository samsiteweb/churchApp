import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { OrgList } from "./orgListResolver.service";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  apiUrl: string = "https://churchapp.igeeksng.com/prod_sup/api";
  constructor(private httpClient: HttpClient) {}

  setParams(params) {
    const options = { params: new HttpParams({ fromObject: params }) };
    return options;
  }
  registerOrg(body) {
    return this.httpClient.post(
      `${this.apiUrl}/Organization/RegisterOrganization`,
      body
    );
  }

  registerAdmin(body) {
    return this.httpClient.post(
      `${this.apiUrl}/Registration/RegisterAdministrator`,
      body
    );
  }

  registerUser(body, type) {
    if (type == "admin") {
      return this.registerAdmin(body);
    } else if (type == "member") {
      return this.httpClient.post(
        `${this.apiUrl}/Registration/RegisterMember`,
        body
      );
    }
  }

  getAllRegOrg() {
    return this.httpClient.get<OrgList>(
      `${this.apiUrl}/Organization/RetrieveAllOrganization`
    );
  }
}
