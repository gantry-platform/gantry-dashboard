import { Injectable } from '@angular/core';
import { ProjectsService } from '../restapi/user-swagger/services';
import { Project, Group, PendingUser, Member } from '../restapi/user-swagger/models';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  static readonly ADMIN_ROLE = 'admin';
  static readonly DEV_ROLE = 'dev';
  static readonly OPS_ROLE = 'ops';

  userId: string = "55f503e5-0dce-4952-acc0-7f6673da4ba9";
  project: Project = null;

  constructor(
    private projectsService: ProjectsService
  ) {
  }

  // test(): Observable<Project> {
  //   return this.projectsService.userIdProjectsProjectNameGet({
  //     userId: '55f503e5-0dce-4952-acc0-7f6673da4ba9',
  //     projectName: '810ebe23-9871-40eb-8a10-e561cae613f5_test-go-home-333-33311'
  //   }).pipe(
  //     take(1)
  //   );
  // 
  //   
  //   .subscribe((res: Project) => {
  //     console.log(res);
  //     this.project1 = res
  //     this.project = res;
  //     this.project.groups.find(g=>g.name  == 'admin').members = [];
  //   },
  //     (err) => {
  //       console.error(err);
  //     }
  //   );
  // }

  // userIdProjectsProjectNameGet1(userId: string, projectName: string): void {
  //   this.project1 = this.projectsService.userIdProjectsProjectNameGet({
  //     userId: '810ebe23-9871-40eb-8a10-e561cae613f5',
  //     projectName: '810ebe23-9871-40eb-8a10-e561cae613f5_test-go-home-333-33311'
  //   }).pipe(
  //     take(1)
  //   );
  // }

  clean(): void {
    this.project = null;
  }

  userIdProjectsProjectIdGet(projectId: string): void {
    this.project = null;

    const params: any = {
      userId: this.userId,
      projectId: projectId
    }

    this.projectsService.userIdProjectsProjectIdGet(params).pipe(
      take(1)
    ).subscribe((res: Project) => {
      console.log("프로젝트 정보 조회");
      this.project = res;
    },
      (err) => {
        console.error(err);
      }
    );
  };

  getGroupMembersByRole(role: string): Array<Member> {
    let group: Group = Object.assign({}, this.project.groups.find(g => g.name === role));

    if (group.members) {
      group.members = group.members.filter(m => m.email_verified);
    } else {
      group.members = [];
    }

    return group.members;
  }

  getGroupPendingMembers(): Array<PendingUser> {
    return this.project.pending_users;
  }

}