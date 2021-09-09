import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import React, { useState } from "react";

interface IRegex {
    pattern: string;
    input: string;
    results: string;
    canProcess: boolean;
}

const Regex: React.FunctionComponent = () => {

    const [state, setState] = useState<IRegex>({
        pattern: '',
        input: '',
        results: '',
        canProcess: false
    });

    let _onPatternChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        setState({
            ...state,
            pattern: newValue,
            canProcess: state.input?.length > 0 && newValue?.length > 0
        });
    }

    let _onInputChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        setState({
            ...state,
            input: newValue,
            canProcess: state.pattern?.length > 0 && newValue?.length > 0
        });
    }

    let _Process = () => {
        if (state.canProcess) {
            let result: any = null;
            try { result = new RegExp(state.pattern).exec(state.input); }
            catch (err) { result = err; }
            setState(old => {
                return {
                    ...old,
                    results: result ? JSON.stringify(result, null, 4) : ''
                };
            });
        }
    }

    return <>
        <Stack className="Regex" tokens={{ childrenGap: 20, padding: 20 }}>
            <TextField label="Pattern" multiline value={state.pattern} rows={5} onChange={_onPatternChanged} />
            <TextField label="Input" multiline value={state.input} rows={5} onChange={_onInputChanged} />
            <TextField label="Results" multiline value={state.results} rows={10} readOnly />
            <Stack horizontal grow tokens={{ childrenGap: 10 }}>
                <PrimaryButton text="Test" disabled={!state.canProcess} onClick={_Process} />
            </Stack>
        </Stack>
    </>;
}

export default Regex;