const calculateFreeSlots = (
    preferedTime: {
        startTime: Date;
        endTime: Date;
        duration: number;
    },
    appointments: {
        slot: {
            startTime: Date;
            endTime: Date;
            duration: number;
        };
    }[],
    bookDate: Date,
    currentDate: Date
): { startTime: Date; endTime: Date; duration: number }[] => {
    const { startTime, endTime, duration } = preferedTime;
    const freeSlots = [];

    const bookingDateStart = new Date(bookDate);
    bookingDateStart.setHours(
        startTime.getHours(),
        startTime.getMinutes(),
        0,
        0
    );
    const bookingDateEnd = new Date(bookDate);
    bookingDateEnd.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

    appointments.sort(
        (a, b) => a.slot.startTime.getTime() - b.slot.startTime.getTime()
    );

    let currentStartTime = new Date(bookingDateStart);

    while (
        currentStartTime.getTime() + duration * 60000 <=
        bookingDateEnd.getTime()
    ) {
        const slotEndTime = new Date(
            currentStartTime.getTime() + duration * 60000
        );

        if (currentStartTime > currentDate) {
            let isFree = true;

            for (const appointment of appointments) {
                const appointmentStart = new Date(appointment.slot.startTime);
                const appointmentEnd = new Date(appointment.slot.endTime);

                if (
                    (currentStartTime >= appointmentStart &&
                        currentStartTime < appointmentEnd) ||
                    (slotEndTime > appointmentStart &&
                        slotEndTime <= appointmentEnd)
                ) {
                    isFree = false;
                    break;
                }
            }

            if (isFree) {
                freeSlots.push({
                    startTime: new Date(currentStartTime),
                    endTime: slotEndTime,
                    duration: duration,
                });
            }
        }

        currentStartTime.setTime(slotEndTime.getTime());
    }

    return freeSlots;
};

export default calculateFreeSlots;
