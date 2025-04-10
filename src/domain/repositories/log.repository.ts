import { LogEntity, SeverityLevel } from "../entities/log.entity";

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]>;
}