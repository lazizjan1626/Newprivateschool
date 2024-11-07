import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ParentModule } from './parent/parent.module';
import { FeesModule } from './fees/fees.module';
import { GradesModule } from './grades/grades.module';
import { ClassScheduleModule } from './class-schedule/class-schedule.module';
import { SubjectModule } from './subject/subject.module';
import { ClassesModule } from './classes/classes.module';
import { AttendanceModule } from './attendance/attendance.module';
import { TeachersModule } from './teachers/teachers.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { StudentModule } from './sudent/sudent.module';
import { AdminModule } from './admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
// import { IsCreatorGuard } from './guard/isCreator-guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres', 
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DATABASE,
      password: "laziz2005",
      database: process.env.DB_USERNAME,
      autoLoadModels: true,
      synchronize: true, 
    }),
    
    UserModule,
    RoleModule,
    ParentModule,
    FeesModule,
    GradesModule,
    ClassScheduleModule,
    SubjectModule,
    ClassesModule,
    AttendanceModule,
    TeachersModule,
    EnrollmentsModule,
    StudentModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: IsCreatorGuard,
    // },
  ],
})
export class AppModule {}
