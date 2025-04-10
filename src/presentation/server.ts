import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";

export class Server {
  constructor(

  ){}

  static run() {
    CronService.createJob(
      '*/2 * * * * *',
      () => {
        const url: string = 'http://localhost:3000'
        
        new CheckService(
          () => console.log(`${url} is up`),
          (error) => console.error(error)
        ).execute(url)
      }
    );
  }
}