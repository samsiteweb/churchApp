import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MemberActionsService {
  apiUrl: string = "https://churchapp.igeeksng.com/prod_sup/api";
  constructor(private httpClient: HttpClient) {}

  scheduleRide(body) {
    return this.httpClient.post(
      `${this.apiUrl}/Transportation/CreateSchedule`,
      body
    );
  }
  getScheduleRide() {
    return this.httpClient.get(
      `${this.apiUrl}/Transportation/RetrieveUserSchedules`
    );
  }

  deleteSchedule(id) {
    return this.httpClient.delete(
      `${this.apiUrl}/Transportation/DeleteSchedule?scheduleId=${id}`
    );
  }

  retriveMember() {
    return this.httpClient.get(
      `${this.apiUrl}/Registration/RetrieveAllMembers`
    );
  }

  updateRoleStatus(memberId: string, roleId: string, isActive: Boolean) {
    return this.httpClient.get(
      `${this.apiUrl}/Registration/UpdateMembersRoleStatus?memberId=${memberId}&roleId=${roleId}&isActive=${isActive}`
    );
  }
}
