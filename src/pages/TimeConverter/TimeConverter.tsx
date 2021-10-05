import { ComboBox, IComboBoxOption, IDropdownOption, Label, Stack, Toggle } from '@fluentui/react';
import React, { useCallback, useEffect, useState } from 'react';
import timeService from '../../services/TimeService';

type AmPmDesignator = "AM" | "PM";

interface ITimeConverterState {
    useCurrentTimeAsSource: boolean;
    targetTimeZone?: string;
}

const DefaultTimeZone: string = "Local Time Zone";

interface ITimeConverterTime {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    designator: AmPmDesignator;
    timeZone: string;
}

const getTime = (date: Date): ITimeConverterTime => {
    let designator: AmPmDesignator = "AM";
    let hours = date.getHours();
    if (hours >= 12) {
        hours = hours - 12;
        designator = "PM";
    }
    if (hours === 0) {
        hours = 12;
    }
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: hours,
        minute: date.getMinutes(),
        second: date.getSeconds(),
        designator: designator,
        timeZone: DefaultTimeZone
    };
}

const TimeConverter: React.FunctionComponent = () => {

    const TimeZones: string[] = require('../../data/TimeZones.json');

    const [convertedTime, setConvertedTime] = useState<ITimeConverterTime>();

    const [currentTime, setCurrentTime] = useState<ITimeConverterTime>(() => getTime(new Date()));

    const [userTime, setUserTime] = useState<ITimeConverterTime>(() => getTime(new Date()));

    const [state, setState] = useState<ITimeConverterState>({ useCurrentTimeAsSource: true });

    //#region Event Handlers
    const onUseCurrentTimeChanged = (ev?: any, checked?: boolean) => {
        const newUseCurrentTimeAsSource = true === checked;
        setState({
            ...state,
            useCurrentTimeAsSource: newUseCurrentTimeAsSource
        });
        updateConvertedTime(newUseCurrentTimeAsSource ? currentTime : userTime, state.targetTimeZone);
    }

    const onHoursChanged = (ev?: any, option?: IComboBoxOption) => {
        if (typeof option?.key === "number" && !Number.isNaN(option.key)) {
            const newUserTime = {
                ...userTime,
                hour: option.key
            };
            setUserTime(newUserTime);
            updateConvertedTime(newUserTime, state.targetTimeZone);
        }
    }

    const onMinutesChanged = (ev?: any, option?: IComboBoxOption) => {
        if (typeof option?.key === "number" && !Number.isNaN(option.key)) {
            const newUserTime = {
                ...userTime,
                minute: option.key
            };
            setUserTime(newUserTime);
            updateConvertedTime(newUserTime, state.targetTimeZone);
        }
    }

    const onDesignatorChanged = (ev?: any, option?: IComboBoxOption) => {
        if (typeof option?.key === "string") {
            let designator = userTime.designator;
            switch (option.key) {
                case "AM":
                case "PM": {
                    designator = option.key;
                }
            }
            if (designator !== userTime.designator) {
                const newUserTime = {
                    ...userTime,
                    designator: designator
                };
                setUserTime(newUserTime);
                updateConvertedTime(newUserTime, state.targetTimeZone);
            }
        }
    }

    const onSourceTimeZoneChanged = (ev?: any, option?: IComboBoxOption) => {
        if (typeof option?.key === "string") {
            const newUserTime = {
                ...userTime,
                timeZone: option.key
            };
            setUserTime(newUserTime);
            updateConvertedTime(newUserTime, state.targetTimeZone);
        }
    }

    const onTargetTimeZoneChanged = (ev?: any, option?: IComboBoxOption) => {
        if (typeof option?.key === "string") {
            const newState = {
                ...state,
                targetTimeZone: option.key
            };
            setState(newState);
            updateConvertedTime(state.useCurrentTimeAsSource ? currentTime : userTime, newState.targetTimeZone);
        }
    }
    //#endregion Event Handlers

    //#region Methods
    const getHours = (): IComboBoxOption[] => {
        let retVal: IComboBoxOption[] = [];
        for (var i = 1; i <= 12; i++) {
            retVal.push({
                key: i,
                text: i.toString()
            });
        }
        return retVal;
    }

    const getMinutes = (): IComboBoxOption[] => {
        let retVal: IComboBoxOption[] = [];
        for (var i = 0; i <= 59; i++) {
            retVal.push({
                key: i,
                text: i.toString().padStart(2, '0'),
                hidden: i % 5 !== 0
            });
        }
        return retVal;
    }

    const getDesignators = (): IComboBoxOption[] => {
        return ["AM", "PM"].map(d => ({ key: d, text: d }));
    }

    const getTimeZoneOptions = (): IDropdownOption[] => {
        let retVal: IDropdownOption[] = [{
            key: DefaultTimeZone,
            text: DefaultTimeZone
        }];
        TimeZones.forEach(tz => {
            retVal.push({
                key: tz,
                text: tz
            });
        });
        return retVal;
    }

    const updateConvertedTime = useCallback((sourceTime: ITimeConverterTime, targetTimeZone?: string): void => {
        try {
            if (sourceTime && targetTimeZone) {
                let hours = sourceTime.hour;
                if (sourceTime.designator === "PM") {
                    hours = hours + 12;
                }
                if (hours === 24) {
                    hours = 0;
                }
                const conversionOptions = DefaultTimeZone === targetTimeZone ? undefined : { timeZone: targetTimeZone };
                const timeString = new Date(
                    sourceTime.year,
                    sourceTime.month,
                    sourceTime.day,
                    hours,
                    sourceTime.minute,
                    sourceTime.second
                ).toLocaleString("en-us", conversionOptions);
                const timeMatch = /^(?<month>\d{1,2})\/(?<day>\d{1,2})\/(?<year>\d{4}),\s(?<hours>\d{1,2}):(?<minutes>\d{1,2}):(?<seconds>\d{1,2})\s(?<designator>[AP]M)$/.exec(timeString);
                if (timeMatch && timeMatch.groups) {
                    let parsedHours = parseInt(timeMatch.groups.hours);
                    if (timeMatch.groups.designator === "PM") {
                        parsedHours = parsedHours + 12;
                    }
                    if (parsedHours === 24) {
                        parsedHours = 0;
                    }
                    setConvertedTime(getTime(new Date(
                        parseInt(timeMatch.groups.year),
                        parseInt(timeMatch.groups.month),
                        parseInt(timeMatch.groups.day),
                        parsedHours,
                        parseInt(timeMatch.groups.minutes),
                        parseInt(timeMatch.groups.seconds)
                    )))
                }
            }
        }
        catch (err) {
            console.log("An error occurred updating the converted time.", err);
        }
    }, [setConvertedTime])
    //#endregion Methods

    useEffect(() => {
        let id = timeService.subscribe("Minute", time => {
            if (id) {
                const newCurrentTime = getTime(time);
                setCurrentTime(newCurrentTime);
                if (state.useCurrentTimeAsSource) {
                    updateConvertedTime(newCurrentTime, state.targetTimeZone);
                }
            }
        });
        return () => {
            if (id) {
                timeService.unsubscribe("Minute", id);
                id = undefined;
            }
        };
    }, [state, updateConvertedTime]);

    return <>
        <Stack className="TimeConverter" horizontalAlign="start" tokens={{ childrenGap: 20 }}>
            <Toggle label="Use Current Time" checked={state.useCurrentTimeAsSource} onChange={onUseCurrentTimeChanged} />
            <Stack>
                <Label>Source Time</Label>
                <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 4 }}>
                    <ComboBox
                        options={getHours()}
                        disabled={state.useCurrentTimeAsSource}
                        allowFreeform={false}
                        useComboBoxAsMenuWidth
                        selectedKey={state.useCurrentTimeAsSource ? currentTime.hour : userTime.hour}
                        onChange={onHoursChanged} />
                    <ComboBox
                        options={getMinutes()}
                        disabled={state.useCurrentTimeAsSource}
                        useComboBoxAsMenuWidth
                        selectedKey={state.useCurrentTimeAsSource ? currentTime.minute : userTime.minute}
                        onChange={onMinutesChanged} />
                    <ComboBox
                        options={getDesignators()}
                        disabled={state.useCurrentTimeAsSource}
                        allowFreeform={false}
                        useComboBoxAsMenuWidth
                        selectedKey={state.useCurrentTimeAsSource ? currentTime.designator : userTime.designator}
                        onChange={onDesignatorChanged} />
                </Stack>
            </Stack>
            <ComboBox
                label="Source Time Zone"
                options={getTimeZoneOptions()}
                allowFreeform={false}
                autoComplete="off"
                disabled={state.useCurrentTimeAsSource}
                selectedKey={state.useCurrentTimeAsSource ? currentTime.timeZone : userTime.timeZone}
                onChange={onSourceTimeZoneChanged} />
            <ComboBox
                label="Target Time Zone"
                options={getTimeZoneOptions()}
                allowFreeform={false}
                autoComplete="off"
                selectedKey={state.targetTimeZone}
                onChange={onTargetTimeZoneChanged} />
            <Stack>
                <Label>Converted Time</Label>
                <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 4 }}>
                    <ComboBox
                        options={[]}
                        disabled={true}
                        useComboBoxAsMenuWidth
                        text={convertedTime?.hour?.toString().padStart(2, '0')}
                    />
                    <ComboBox
                        options={[]}
                        disabled={true}
                        useComboBoxAsMenuWidth
                        text={convertedTime?.minute?.toString().padStart(2, '0')}
                    />
                    <ComboBox
                        options={[]}
                        disabled={true}
                        useComboBoxAsMenuWidth
                        text={convertedTime?.designator}
                    />
                </Stack>
            </Stack>
        </Stack>
    </>;
}

export default TimeConverter;