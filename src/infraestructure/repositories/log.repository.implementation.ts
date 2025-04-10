import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, SeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRepositoryImplementation implements LogRepository {
    constructor(
        private readonly logDatasource: LogDatasource
    ) {}

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }

    async getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }
}