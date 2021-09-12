import React, { useState } from "react";
import { Dropdown, IDropdownOption, PrimaryButton, Stack, TextField } from "@fluentui/react";

type UrlEncoderMode = 'decode' | 'decodeComponent' | 'encode' | 'encodeComponent';

interface IUrlEncoderState {
    mode: UrlEncoderMode;
    encodeValue: string;
    decodeValue: string;
    results: string;
    canProcess: boolean;
}

const UrlEncoder: React.FunctionComponent = () => {

    const [state, setState] = useState<IUrlEncoderState>({
        mode: 'decode',
        encodeValue: '',
        decodeValue: '',
        results: '',
        canProcess: false
    });

    let _canProcess = (mode: UrlEncoderMode, encodeValue?: string, decodeValue?: string): boolean => {
        let retVal = false;
        switch (mode) {
            case "decode":
            case "decodeComponent": {
                retVal = decodeValue ? decodeValue.trim().length > 0 : false;
                break;
            }
            case "encode":
            case "encodeComponent": {
                retVal = encodeValue ? encodeValue.trim().length > 0 : false;
                break;
            }
        }
        return retVal;
    }

    let _onEncodedChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        setState({
            ...state,
            encodeValue: newValue,
            canProcess: _canProcess(state.mode, newValue, state.decodeValue),
            results: ''
        });
    }

    let _onDecodedChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        setState({
            ...state,
            decodeValue: newValue,
            canProcess: _canProcess(state.mode, state.encodeValue, newValue),
            results: ''
        });
    }

    let _onModeChanged = (e?: any, item?: IDropdownOption) => {
        let newMode = state.mode;
        if (item && item.key) {
            newMode = item.key as UrlEncoderMode;
        }
        setState({
            ...state,
            mode: newMode,
            canProcess: _canProcess(newMode, state.encodeValue, state.decodeValue),
            results: ''
        });
    }

    let _Process = () => {
        if (state.canProcess) {
            let results: string = '';
            try {
                switch (state.mode) {
                    case "decode": {
                        results = decodeURI(state.decodeValue);
                        break;
                    }
                    case "decodeComponent": {
                        results = decodeURIComponent(state.decodeValue);
                        break;
                    }
                    case "encode": {
                        results = encodeURI(state.encodeValue);
                        break;
                    }
                    case "encodeComponent": {
                        results = encodeURIComponent(state.encodeValue);
                        break;
                    }
                }

            }
            catch (err) {
                const error = err as any;
                if (error && error.message) {
                    results = error.message;
                }
                else {
                    results = `${error}`;
                }
            }
            setState({
                ...state,
                results: results ? results : ''
            });
        }
    }

    return <>
        <Stack className="UrlEncoder" tokens={{ childrenGap: 20 }}>
            {(state.mode === 'decode' || state.mode === 'decodeComponent') && <>
                <TextField label="Decode" multiline value={state.decodeValue} rows={10} onChange={_onDecodedChanged} />
            </>}
            {(state.mode === 'encode' || state.mode === 'encodeComponent') && <>
                <TextField label="Encode" multiline value={state.encodeValue} rows={10} onChange={_onEncodedChanged} />
            </>}
            <TextField label="Results" multiline value={state.results} rows={10} readOnly />
            <Stack horizontal grow tokens={{ childrenGap: 10 }}>
                <Dropdown
                    dropdownWidth='auto'
                    selectedKey={state.mode}
                    onChange={_onModeChanged}
                    options={[
                        {
                            key: "decode",
                            text: "Decode URI"
                        },
                        {
                            key: "decodeComponent",
                            text: "Decode URI Component"
                        },
                        {
                            key: "encode",
                            text: "Encode URI"
                        },
                        {
                            key: "encodeComponent",
                            text: "Encode URI Component"
                        }
                    ]} />
                <PrimaryButton text="Process" disabled={!state.canProcess} onClick={_Process} />
            </Stack>
        </Stack>
    </>;
}

export default UrlEncoder;