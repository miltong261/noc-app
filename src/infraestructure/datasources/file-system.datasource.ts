import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, SeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  constructor() {
    this.createLogsPath()
  }

  private readonly logPath: string = 'logs/'
  private readonly allLogPath: string = 'logs/all.log'
  private readonly mediumLogPath: string = 'logs/medium.log'
  private readonly highLogPath: string = 'logs/high.log'

  private createLogsPath() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    [
      this.allLogPath,
      this.mediumLogPath,
      this.highLogPath
    ].forEach(path => {
      if (!fs.existsSync(path)) {
        return
      }

      fs.writeFileSync(path, '')
    })
  }

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`

    fs.appendFileSync(this.allLogPath, logAsJson)

    switch (log.level) {
      case SeverityLevel.MEDIUM:
        fs.appendFileSync(this.mediumLogPath, logAsJson)
        break
      case SeverityLevel.HIGH:
        fs.appendFileSync(this.highLogPath, logAsJson)
        break
      default:
        throw new Error(`Log level ${log.level} not supported`)
        break
    }
  }

  async getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case SeverityLevel.LOW:
        return this.getLogsFromFile(this.allLogPath)
      case SeverityLevel.MEDIUM:
        return this.getLogsFromFile(this.mediumLogPath)
      case SeverityLevel.HIGH:
        return this.getLogsFromFile(this.highLogPath)
      default:
        throw new Error(`Log level ${severityLevel} not supported`)
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8')

    const logs = content.split('\n').map(log => {
      return LogEntity.fromJson(log)
    })

    return logs
  }
}