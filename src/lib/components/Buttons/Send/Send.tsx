import { ReactElement } from 'react';
import SendIcon from '../../Icons/SendIcon';
import './../../../styles/audio-recorder.css';

interface ISend {
    onClick?: () => void
}

export function Send ({
    onClick
}: ISend): ReactElement {
    return (
        <button onClick={onClick} type='button' className='button button-send'>
            <SendIcon />
        </button>
    )
}