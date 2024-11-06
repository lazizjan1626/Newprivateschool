export class CreateClassDto {
    className: string;
    section: string;
    teacherID: number;
    classScheduleID?: number;
    attendanceID:number;
}
