const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true
        },
        complete: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);


module.exports = mongoose.model("Task", modelSchema);
