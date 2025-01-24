import CustomTransportLogging from "src/utils/customTransportLogging";
import { format, transports } from "winston";

const dateFormated = new Date().toLocaleDateString().replace(/\//g, '-');
export const WinstonConfig = {
  transports: [
    // new transports.Console({
    //   format: format.combine(
    //     format.timestamp(),
    //     format.colorize(),
    //     format.simple()
    //   )
    // }),
    // Logging All Level
    new CustomTransportLogging({
      filename: `logs/NESTJS_WINSTON_LOGGER_${dateFormated}.json`,
      format: format.combine(
        format.timestamp({
          alias: 'timestamp',
          format: 'DD-MM-YYYY HH:mm:ss'
        }),
        format.json(),
        // format.prettyPrint(),
        // format.simple(),
        // format.colorize()
      ),

    }),

    // Info level logging
    // new transports.File({
    //   filename: `logging/info.log`,
    //   level: 'info',
    //   format: format.combine(
    //     format.timestamp({
    //       alias: 'timestamp',
    //       format: 'DD-MM-YYYY _ HH:mm:ss'
    //     }),
    //     format.json(),
    //     format.prettyPrint(),
    //     format.simple()

    //   )
    // }),

    // Error level logging
    // new transports.File({
    //   filename: `logs/error.log`,
    //   level: 'error',
    //   format: format.combine(format.timestamp(), format.json()),
    // }),

    // 
  ]
}