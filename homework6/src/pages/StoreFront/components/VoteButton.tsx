import * as React from 'react';

var classNames = require('classnames');

interface IProps {
  votesCount: number;
  hadVoted: boolean;
  onChange: (checked: boolean) => void;
}

export default function VoteButton({ votesCount, hadVoted, onChange }: IProps) {
  return (
    <button className={classNames({
        'row w-100 vote-btn': true,
        'fade-out': hadVoted
    })} 
    onClick={() => onChange(hadVoted)}>
        <div className="hor-center w-100">
            <span>Vote</span> 
            {!hadVoted && <span className={'vote-arrow'}> ▲</span>}
            {hadVoted && <span className={'vote-arrow'}> ▼</span>}
        </div>
        <span className="votes-count hor-center w-100">{votesCount}</span>  
    </button>);
}





