import React, { useState } from 'react';
import Search from './Search';

function Index() {
    const [Value, setValue] = useState(null);
    const label = 'name';
    return (
        <div style={{ width: 200, }}>
            <Search prompt='selected number....'
                value={Value}
                id='code'
                label='mobile'
                onChange={val => setValue(val)}
            />
            <input
                value={Value ? Value[label] : 'none'}
            />

        </div>
    )
}

export default Index;
