import { Label } from '@fluentui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import './Clock.css';
import timeService from '../../services/TimeService';

interface IClockState {
    hasClockData: boolean;
    hours: string;
    minutes: string;
    seconds: string;
    part: "AM" | "PM";
}

const Clock: React.FunctionComponent<any> = () => {
    const [time, setTime] = useState<IClockState>({
        hasClockData: false,
        hours: "0",
        minutes: "00",
        seconds: "00",
        part: "AM"
    });

    useEffect(() => {
        let subscriptionId = timeService.subscribe('Second', updateTime);
        return () => {
            if (subscriptionId) {
                timeService.unsubscribe('Second', subscriptionId);
            }
        };
    }, []);

    let updateTime = (now: Date) => {
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

    return <Label className="Clock">{time.hasClockData && `${time.hours}:${time.minutes}:${time.seconds} ${time.part}`}</Label>;
}

export default Clock;