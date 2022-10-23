import {ChangeEvent} from "react";

export interface InputProps<T extends string>{
    value?: string,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void,
    name: T,
    type: 'text' | 'password',
    isValid?: boolean,
    errors?: string[],
    className?: string
}

export function Input<T extends string>(props: InputProps<T>){
    return (
        <div>
            <input style={{border: props.isValid === false ? '1px solid red' : '1px solid black'}}
                   className={props.className}
                   onChange={props.onChange}
                   type={props.type}
                   value={props.value ?? ''} name={props.name ?? ''}/>
            {props.errors?.map(err => <div key={err}>{err}</div>)}
        </div>
    )
}