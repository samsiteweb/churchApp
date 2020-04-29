import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { TransMember } from '../pages/home/shared/models';
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class MemberActionsService {
  apiUrl: string = "https://churchapp.igeeksng.com/prod_sup/api";
  constructor(private httpClient: HttpClient) { }

  scheduleRide(body) {
    return this.httpClient.post(
      `${this.apiUrl}/Transportation/CreateSchedule`,
      body
    );
  }

  getAllMemberScheduleHistroy() {
    return this.httpClient.get(`${this.apiUrl}/Transportation/RetrieveUserSchedulesHistory`)
      .pipe(map((resData: any) => {

        let newData = []
        resData.forEach((data: any) => {
          data = {
            ...data,
            ScheduleDate: moment(data.ScheduleDate).format("dddd, MMMM Do YYYY"),
            ScheduleTime: moment(data.ScheduleDate).format("LTS"),
          }
          newData.push(data)
        })

        return newData
      }))
  }

  getAllTransportationMembers() {
    return this.httpClient.get(`${this.apiUrl}/Transportation/RetrieveMembers`).pipe(
      map((data: any) => {

        let latestData = []
        data.forEach(resData => {
          let newData: TransMember = {
            Name: resData.FullName,
            Email: resData.ContactInfo.split('|')[1],
            PhoneNumber: resData.ContactInfo.split('|')[0],
            ContactInfo: resData.ContactInfo,
            IsMemberActive: resData.IsMemberActive,
            LastModifiedView: resData.LastModifiedView,
            DateCreatedView: resData.DateCreatedView,
            DateCreated: resData.DateCreated,
            LastModified: resData.LastModified,
            MemberId: resData.MemberId,
            AllowMemberToRecieveNotification: resData.AllowMemberToRecieveNotification,
            AlternativeEmailAddress: resData.AlternativeEmailAddress,
            AlternativeMobileContact: resData.AlternativeMobileContact
          }
          latestData.push(newData)
        })
        return latestData

        // return newData
      })

    )
  }
  getActiveSchedules() {
    return this.httpClient.get(
      `${this.apiUrl}/Transportation/RetrieveUserSchedules`
    );
  }
  retriveScheduleTransportation() {
    return this.httpClient.get(`${this.apiUrl}/Transportation/RetrieveScheduleTransportation`)
  }

  assignScheduleTransportation(body) {
    return this.httpClient.post(`${this.apiUrl}/Transportation/AssignScheduleToTransportationMember`, body)
  }
  retriveScheduleHistoryTranspotation() {
    return this.httpClient.get(`${this.apiUrl}/Transportation/RetrieveScheduleTransportationHistory`).pipe(map((resData: any) => {
      let newData = []
      resData.forEach((data: any) => {
        data = {
          ...data,
          ScheduleDate: moment(data.ScheduleDate).format("dddd, MMMM Do YYYY"),
          ScheduleTime: moment(data.ScheduleDate).format("LTS"),
        }
        newData.push(data)
      })

      return newData
    }))
  }

  addMemberToTransportationDpart(body) {
    return this.httpClient.post(
      `${this.apiUrl}/Transportation/AddMember`, body
    )
  }

  retriveMemberStatusList() {
    return this.httpClient.get(`${this.apiUrl}/Transportation/RetrieveMemberStatusList`)
  }

  retriveMemberStatusTransportation() {
    return this.httpClient.get(`${this.apiUrl}/Transportation/RetrieveTransportationStatusList`)
  }

  deleteFromTransportationDept(userId) {
    return this.httpClient.delete(`${this.apiUrl}/Transportation/RemoveMember?userId=${userId}`)
  }

  updateMember(body) {
    return this.httpClient.put(`${this.apiUrl}/Transportation/UpdateMember`, body)
  }

  updateMemberScheduleStatus(statusId, scheduleId) {
    return this.httpClient.get(`${this.apiUrl}/Transportation/UpdateMemberScheduleStatus?statusId=${statusId}&scheduleId=${scheduleId}`)
  }
  updateMemberScheduleStatusTransportation(statusId, scheduleId) {
    return this.httpClient.get(`${this.apiUrl}/Transportation/UpdateTransportationScheduleStatus?statusId=${statusId}&scheduleId=${scheduleId}`)
  }

  deleteSchedule(id) {
    return this.httpClient.delete(
      `${this.apiUrl}/Transportation/DeleteSchedule?scheduleId=${id}`
    );
  }

  retriveMember() {
    return this.httpClient.get(
      `${this.apiUrl}/Registration/RetrieveAllMembers`
    ).pipe(
      this.Map())
  }

  updateRoleStatus(memberId: string, roleId: string, isActive: Boolean) {
    return this.httpClient.get(
      `${this.apiUrl}/Registration/UpdateMembersRoleStatus?memberId=${memberId}&roleId=${roleId}&isActive=${isActive}`
    );
  }

  deleteAccount(code, type) {
    return this.httpClient.get(
      `${this.apiUrl}/Registration/DeleteAccount?confirmationCode=${code}&deleteAllAccount=${type}`
    );
  }
  requestDeleteAccount() {
    return this.httpClient.get(
      `${this.apiUrl}/Registration/RequestConfirmationId`
    );
  }

  Map() {
    return map((resData: any) => {

      let newData = [];
      for (const dt of resData) {
        let dataIndex = newData.findIndex((dat) => dat.userId == dt.UserId);
        if (dataIndex > -1) {
          let role = {
            isRoleActive: dt.IsRoleActive,
            roleType: dt.RoleType,
            roleTitle: dt.RoleMeaning,
            roleId: dt.RoleId,
          };
          newData[dataIndex].roleInfo.push(role);
        } else {
          let trData = {
            userId: dt.UserId,
            Name: `${dt.FirstName} ${dt.LastName}`,
            Email: dt.Email,
            PhoneNumber: dt.PhoneNumber,
            roleInfo: [
              {
                isRoleActive: dt.IsRoleActive,
                roleType: dt.RoleType,
                roleTitle: dt.RoleMeaning,
                roleId: dt.RoleId,
              },
            ],
            DateCreatedView: dt.DateCreatedView,
            dateCreated: dt.DateCreated,
          };
          newData.push(trData);
        }
      }
      return newData;
    })

  }
}
