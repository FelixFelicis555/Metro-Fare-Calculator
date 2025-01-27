const fareConfig={
    sameLine: {
        "Green":{peak:2,nonPeak:1,dailyCap:8,weeklyCap:55},
        "Red":{peak:3,nonPeak:2,dailyCap:12,weeklyCap:70},
    },
    differentLine: {
        "Green-Red":{peak:4,nonPeak:3,dailyCap:15,weeklyCap:90},
        "Red-Green":{peak:3,nonPeak:2,dailyCap:15,weeklyCap:90},
    },
    peakHours:{
       "Monday": [
        { startHour: 8, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 16, startMinute: 30, endHour: 19, endMinute: 0 },
    ],
    "Tuesday": [
        { startHour: 8, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 16, startMinute: 30, endHour: 19, endMinute: 0},
    ],
    "Wednesday": [
        { startHour: 8, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 16, startMinute: 30, endHour: 19, endMinute: 0 },
    ],
    "Thursday": [
        { startHour: 8, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 16, startMinute: 30, endHour: 19, endMinute: 0 },
    ],
    "Friday": [
        { startHour: 8, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 16, startMinute: 30, endHour: 19, endMinute: 0 },
    ],
    "Saturday": [
        { startHour: 10, startMinute: 0, endHour: 14, endMinute: 0 },
        { startHour: 18, startMinute: 0, endHour: 23, endMinute: 0 },
    ],
    "Sunday": [
        { startHour: 18, startMinute: 0, endHour: 23, endMinute: 0 },
    ], 
    },
};

module.exports=fareConfig;