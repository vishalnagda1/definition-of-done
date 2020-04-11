const {createLogger, transports, format} = require("winston");

const jsonLoggerFormat = format.printf(info => {
    if (info.message && info.message.stack !== undefined) {
        info.message += info.message.stack;
    }
    return JSON.stringify(info);
});

const timestampFormatter = format.timestamp({format: "YYYY-MM-DD HH:mm:ss.SSS"});

const logger = createLogger({    
    transports: [
        new transports.File({
            filename: `logs/error.log`,
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: true,
            maxsize: 1000000, // 1MB
            maxFiles: 1,
            colorize: false,
            format: format.combine(timestampFormatter, jsonLoggerFormat, format.splat()),
        }),
    ]
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new transports.Console({
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            colorize: true,
            format: format.combine(timestampFormatter, jsonLoggerFormat, format.splat()),
        })
    );
}

module.exports = logger;
