import { Label } from '@fluentui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import './Clock.css';

interface IClockState {
    hasClockData: boolean;
    hours: string;
    minutes: string;
    seconds: string;
    part: "AM" | "PM";
}

let _UpdateTimeInterval: number = -1;

const Clock: React.FunctionComponent<any> = () => {
    const [time, setTime] = useState<IClockState>({
        hasClockData: false,
        hours: "0",
        minutes: "00",
        seconds: "00",
        part: "AM"
    });

    useEffect(() => {
        updateTime();
        _UpdateTimeInterval = window.setInterval(updateTime, 1000);
        return () => {
            if (_UpdateTimeInterval >= 0) {
                window.clearInterval(_UpdateTimeInterval);
            }
        };
    }, []);

    let updateTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        setTime({
            hasClockData: true,
            hours: (hours === 0 ? 12 : hours > 12 ? hours - 12 : hours).toString(),
            minutes: minutes.toString().padStart(2, "0"),
            seconds: seconds.toString().padStart(2, "0"),
            part: hours < 12 ? "AM" : "PM"
        })
    }

    return <>
        {time.hasClockData && <Label className="Clock">{time.hours}:{time.minutes}:{time.seconds} {time.part}</Label>}
    </>;
}

export default Clock;