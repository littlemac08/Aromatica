import React, { useState, useEffect } from 'react';
import { fetchDataForComponent } from './Util'; // 경로를 프로젝트에 맞게 수정

const Commu = ({ componentPath }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchDataForComponent(componentPath, setData);
    }, [componentPath]);

    return (
        <div>
            <h2>Commu Component</h2>
            <div>
                {data ? JSON.stringify(data) : '로딩 중...'}
            </div>
        </div>
    );
}

export default Commu;
