import React, { useState } from 'react';

function StreamingResponse() {
    const [data, setData] = useState('');

    const fetchStreamingData = async () => {
        try {
            const response = await fetch('http://localhost:5000/streaming');
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let result = '';
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                result += decoder.decode(value, { stream: true });
                setData(prev => prev + decoder.decode(value, { stream: true }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Streaming Response</h1>
            <button onClick={fetchStreamingData}>Fetch Data</button>
            <pre>{data}</pre>
        </div>
    );
}

export default StreamingResponse;
