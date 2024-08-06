const isMeetValid = (
    currentDate: Date,
    slot: {
        startTime: Date;
        endTime: Date;
    }
) => {
    if(slot.startTime > currentDate) {
        return false;
    }
    if(slot.endTime < currentDate) {
        return false;
    }
    return true;
};

export default isMeetValid;
