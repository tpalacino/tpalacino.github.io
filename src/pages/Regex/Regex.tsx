import { Dropdown, IDropdownOption, PrimaryButton, Stack, TextField } from "@fluentui/react";
import React, { useState } from "react";

type RegexMode = 'exec' | 'test' | 'replace';

interface IRegex {
    mode: RegexMode;
    pattern: string;
    input: string;
    replacement: string;
    results: string;
    canProcess: boolean;
}

const Regex: React.FunctionComponent = () => {

    const [state, setState] = useState<IRegex>({
        mode: 'exec',
        pattern: '',
        input: '',
        replacement: '',
        results: '',
        canProcess: false
    });

    let _canProcess = (mode: RegexMode, pattern?: string, replacement?: string): boolean => {
        let retVal = false;
        switch (mode) {
            case "test":
            case "exec": {
                retVal = pattern ? pattern.trim().length > 0 : false;
                break;
            }
            case "replace": {
                retVal = (pattern ? pattern.trim().length > 0 : false) && (replacement ? replacement.trim().length > 0 : false);
                break;
            }
        }
        return retVal;
    }

    let _onPatternChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        setState({
            ...state,
            pattern: newValue,
            canProcess: _canProcess(state.mode, newValue, state.replacement)
        });
    }

    let _onInputChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        setState({
            ...state,
            input: newValue
        });
    }

    let _onReplacementChanged = (e?: any, value?: string) => {
        const newValue = value || '';
        setState({
            ...state,
            replacement: newValue,
            canProcess: _canProcess(state.mode, state.pattern, newValue)
        });
    }

    let _onModeChanged = (e?: any, item?: IDropdownOption) => {
        let newMode = state.mode;
        if (item && item.key) {
            newMode = item.key as RegexMode;
        }
        setState({
            ...state,
            mode: newMode,
            canProcess: _canProcess(newMode, state.pattern, state.replacement)
        });
    }

    let _Process = () => {
        if (state.canProcess) {
            let results: string = '';
            try {
                const pattern = new RegExp(state.pattern);
                switch (state.mode) {
                    case "exec": {
                        const m = pattern.exec(state.input);
                        if (m) {
                            results = JSON.stringify(m, null, 4);
                        }
                        break;
                    }
                    case "test": {
                        results = `${pattern.test(state.input)}`;
                        break;
                    }
                    case "replace": {
                        results = state.input.replace(pattern, state.replacement);
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
            setState(old => {
                return {
                    ...old,
                    results: results ? results : ''
                };
            });
        }
    }

    return <>
        <Stack className="Regex" tokens={{ childrenGap: 20 }}>
            <TextField label="Pattern" multiline value={state.pattern} rows={5} onChange={_onPatternChanged} />
            <TextField label="Input" multiline value={state.input} rows={5} onChange={_onInputChanged} />
            {state.mode === 'replace' && <>
                <TextField label="Replacement" multiline value={state.replacement} rows={5} onChange={_onReplacementChanged} />
            </>}
            <TextField label="Results" multiline value={state.results} rows={10} readOnly />
            <Stack horizontal grow tokens={{ childrenGap: 10 }}>
                <Dropdown
                    selectedKey={state.mode}
                    onChange={_onModeChanged}
                    options={[
                        {
                            key: "exec",
                            text: "Match"
                        },
                        {
                            key: "test",
                            text: "Is Match"
                        },
                        {
                            key: "replace",
                            text: "Replace"
                        }
                    ]} />
                <PrimaryButton text="Process" disabled={!state.canProcess} onClick={_Process} />
            </Stack>
        </Stack>
    </>;
}

export default Regex;