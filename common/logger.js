const {createLogger, transports} = require("winston");

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
        })
    );
}

module.exports = logger;
