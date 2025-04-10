import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.implementation";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
)

export class Server {
  static run() {
    CronService.createJob(
      '*/2 * * * * *',
      () => {
        const url: string = 'http://localhost:3000'
        
        new CheckService(
          fileSystemLogRepository,
          undefined,
          undefined
        ).execute(url)
      }
    );
  }
}