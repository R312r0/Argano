import React from 'react';
import { TokenIcon } from './../../TokenIcon/token_icon';
import {formattedNum} from "../../../utils/helpers";

const AccountsSynthetic = ({sytheticAssets}) => {

    return (
        <div className='accounts-wrapper-use-staking-pools cosmetical-wrapper'> 
            <h1> Synthetic assets </h1>
            
            <div className='accounts-wrapper-use-staking-pools__list-header'> 
                <span> Asset </span>
                <span> Balance </span>
                <span> USD </span>
            </div>

            <ul> 
                {sytheticAssets && sytheticAssets.map((item) => {
                    return (
                        <li key={item.name}>
                            <div>
                                <TokenIcon iconName={item.name}/>
                                <p> {item.name} </p>
                            </div>
                            <span> {formattedNum(item.nativeBalance)} </span>
                            <span> ${formattedNum(item.usdBalance)} </span>
                        </li>
                    )
                })}
            </ul>

            <div className='accounts-wrapper-use-staking-pools__pagination'>
                <span className='active'>1</span>
            </div>
        </div>
    )
}

export default AccountsSynthetic;