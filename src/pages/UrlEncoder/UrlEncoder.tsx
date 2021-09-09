import React, { useState } from "react";
import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import './UrlEncoder.css';

interface IUrlEncoderState {
    encodedValue: string;
    decodedValue: string;
    canEncode: boolean;
    canDecode: boolean;
}

const UrlEncoder: React.FunctionComponent<any> = () => {

    const [ state, setState ] = useState<IUrlEncoderState>({
        encodedValue: '',
        decodedValue: '',
        canEncode: false,
        canDecode: false
     });

    let _onEncodedChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        setState({ ...state, encodedValue: newValue, canDecode: newValue.trim().length > 0 });
    }

    let _onDecodedChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        setState({ ...state, decodedValue: newValue, canEncode: newValue.trim().length > 0 });
    }

    let _Encode = () => {
        setState({ ...state, encodedValue: encodeURI(state.decodedValue), canEncode: true });
    }

    let _Decode = () => {
        setState({ ...state, decodedValue: decodeURI(state.encodedValue), canEncode: true });
    }

    return <>
        <Stack className="UrlEncoder" tokens={{ childrenGap: 20, padding: 20 }}>
            <Stack horizontal grow tokens={{ childrenGap: 10 }}>
                <TextField label="Encoded" multiline value={state.encodedValue} rows={20} onChange={_onEncodedChanged} />
                <TextField label="Decoded" multiline value={state.decodedValue} rows={20} onChange={_onDecodedChanged} />
            </Stack>
            <Stack horizontal grow tokens={{ childrenGap: 10 }}>
                <PrimaryButton text="Encode" disabled={!state.canEncode} onClick={_Encode} />
                <PrimaryButton text="Decode" disabled={!state.canDecode} onClick={_Decode} />
            </Stack>
        </Stack>
    </>;
}

export default UrlEncoder;