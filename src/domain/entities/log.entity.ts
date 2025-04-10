export enum SeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class LogEntity {
  public message: string
  public level: SeverityLevel
  public createdAt: Date

  constructor(message: string, level: SeverityLevel) {
    this.message = message
    this.level = level
    this.createdAt = new Date()
  }

  static fromJson = (json: string): LogEntity => {
    const {message, level, createdAt} = JSON.parse(json)
    
    const log = new LogEntity(message, level)
    
    log.createdAt = new Date(createdAt)

    return log
  }
}