import React from "react";
import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import './UrlEncoder.css';

interface IUrlEncoderState {
    encodedValue: string;
    decodedValue: string;
    canEncode: boolean;
    canDecode: boolean;
}

export default class UrlEncoder extends React.Component<any, IUrlEncoderState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            encodedValue: '',
            decodedValue: '',
            canEncode: false,
            canDecode: false
        };
    }

    private _onEncodedChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        this.setState({
            encodedValue: newValue,
            canDecode: newValue.trim().length > 0
        });
    }

    private _onDecodedChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        this.setState({
            decodedValue: newValue,
            canEncode: newValue.trim().length > 0
        });
    }

    private _Encode = () => {
        const { decodedValue } = this.state;
        this.setState({
            encodedValue: encodeURI(decodedValue),
            canEncode: true
        });
    }

    private _Decode = () => {
        const { encodedValue } = this.state;
        this.setState({
            decodedValue: decodeURI(encodedValue),
            canEncode: true
        });
    }

    public render() {
        const { encodedValue, canEncode, decodedValue, canDecode } = this.state;
        return <>
            <Stack className="UrlEncoder" tokens={{ childrenGap: 20, padding: 20 }}>
                <Stack horizontal grow tokens={{ childrenGap: 10 }}>
                    <TextField label="Encoded" multiline value={encodedValue} rows={20} onChange={this._onEncodedChanged} />
                    <TextField label="Decoded" multiline value={decodedValue} rows={20} onChange={this._onDecodedChanged} />
                </Stack>
                <Stack horizontal grow tokens={{ childrenGap: 10 }}>
                    <PrimaryButton text="Encode" disabled={!canEncode} onClick={this._Encode} />
                    <PrimaryButton text="Decode" disabled={!canDecode} onClick={this._Decode} />
                </Stack>
            </Stack>
        </>;
    }
}