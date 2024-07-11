"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertTimeToDate(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}
exports.default = convertTimeToDate;
