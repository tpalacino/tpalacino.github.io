import React from "react";
import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import './UrlEncoder.css';

interface IUrlEncoderProps { }

interface IUrlEncoderState {
    userDefinedValue: string;
    unprocessedValue: string;
    processedValue: string;
    canProcess: boolean;
}

export default class UrlEncoder extends React.Component<IUrlEncoderProps, IUrlEncoderState> {
    public constructor(props: IUrlEncoderProps) {
        super(props);
        this.state = {
            userDefinedValue: '',
            processedValue: '',
            unprocessedValue: '',
            canProcess: false
        };
    }

    private _onInputChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        this.setState({
            userDefinedValue: newValue,
            canProcess: this.state.unprocessedValue !== newValue
        });
    }

    private _Encode = () => {
        const { userDefinedValue } = this.state;
        this.setState({
            unprocessedValue: userDefinedValue,
            processedValue: encodeURI(userDefinedValue),
            canProcess: false
        });
    }

    private _Decode = () => {
        const { userDefinedValue } = this.state;
        this.setState({
            unprocessedValue: userDefinedValue,
            processedValue: decodeURI(userDefinedValue),
            canProcess: false
        });
    }

    public render() {
        const { userDefinedValue, processedValue, canProcess } = this.state;
        return <>
            <Stack className="UrlEncoder" tokens={{ childrenGap: 20, padding: 20 }}>
                <Stack horizontal grow tokens={{ childrenGap: 10 }}>
                    <TextField label="Input" multiline value={userDefinedValue} rows={20} onChange={this._onInputChanged} />
                    <TextField label="Output" multiline value={processedValue} rows={20} readOnly />
                </Stack>
                <Stack horizontal grow tokens={{ childrenGap: 10 }}>
                    <PrimaryButton text="Encode" disabled={!canProcess} onClick={this._Encode} />
                    <PrimaryButton text="Decode" disabled={!canProcess} onClick={this._Decode} />
                </Stack>
            </Stack>
        </>;
    }
}
