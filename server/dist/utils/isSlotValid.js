"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isSlotValid = (bookTime, preferedTime) => {
    const preferedStartTime = new Date(bookTime);
    preferedStartTime.setHours(preferedTime.startTime.getHours(), preferedTime.startTime.getMinutes(), 0, 0);
    const preferedEndTime = new Date(bookTime);
    preferedEndTime.setHours(preferedTime.endTime.getHours(), preferedTime.endTime.getMinutes(), 0, 0);
    if (bookTime < preferedStartTime || bookTime > preferedEndTime) {
        return false;
    }
    let currentSlotStart = new Date(preferedStartTime);
    while (currentSlotStart <= preferedEndTime) {
        if (bookTime.getTime() === currentSlotStart.getTime()) {
            return true;
        }
        currentSlotStart = new Date(currentSlotStart.getTime() + preferedTime.duration * 60000);
    }
    return false;
};
exports.default = isSlotValid;
