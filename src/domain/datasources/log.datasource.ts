import { LogEntity, SeverityLevel } from "../entities/log.entity";

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]>;
}