import React from 'react';

import useStore from '~/store';

const LoadJson = ({ disabled }) => {
    const state = useStore((state) => state);

    const fileInputRef = React.createRef();

    const handleFileSelect = (event) => {
        const { files } = event.target;
        if (!files.length) {
            alert('No file select');
            return;
        }
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setData(e.target.result);
        };
        reader.readAsText(file);
    };

    const setData = (content) => {
        state.loadPoints(JSON.parse(content));
    };

    return <input id="files" disabled={disabled} ref={fileInputRef} type="file" name="loadjson" onChange={handleFileSelect} />;
};

export default LoadJson;
