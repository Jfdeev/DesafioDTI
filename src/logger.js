import winston from "winston";

const { createLogger, format, transports: transport } = winston;

export const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
    ),
    transports: [
        new transport.File({ filename: 'logs/app.log' }),
        new transport.Console()
    ]
})