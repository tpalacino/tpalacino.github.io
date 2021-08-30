import { Label } from '@fluentui/react';
import React from 'react';
import './Clock.css';

interface IClockState {
    hasClockData: boolean;
    hours: string;
    minutes: string;
    seconds: string;
    part: "AM" | "PM";
}

export default class Clock extends React.Component<any, IClockState> {
    private _UpdateTimeInterval: number = -1;

    constructor(props: any) {
        super(props);
        this.state = {
            hasClockData: false,
            hours: "00",
            minutes: "00",
            seconds: "00",
            part: "AM"
        };
        this._getTime();
    }

    public componentDidMount() {
        this._UpdateTimeInterval = window.setInterval(this._getTime, 1000);
    }

    public componentWillUnmount() {
        if (this._UpdateTimeInterval >= 0) {
            window.clearInterval(this._UpdateTimeInterval);
        }
    }

    private _getTime = () => {
        this._updateTime(new Date());
    }

    private _updateTime = (now: Date) => {
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        this.setState({
            hasClockData: true,
            hours: (hours === 0 ? 12 : hours > 12 ? hours - 12 : hours).toString().padStart(2, "0"),
            minutes: minutes.toString().padStart(2, "0"),
            seconds: seconds.toString().padStart(2, "0"),
            part: hours < 12 ? "AM" : "PM"
        })
    }

    public render() {
        const { hasClockData, hours, minutes, seconds, part } = this.state;
        return hasClockData && <Label className="Clock">{hours}:{minutes}:{seconds} {part}</Label>;
    }
}