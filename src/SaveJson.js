import React from 'react';

import useStore from '~/store';
const SaveJson = () => {
    const state = useStore((state) => state);

    const jsonStringify = JSON.stringify(state.points, null, 2);
    const blob = new Blob([jsonStringify], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    return (
        <div>
            {JSON.stringify(state.points) !== JSON.stringify({}) ? (
                <a href={url} download="points">
                    opslaan disk
                </a>
            ) : (
                <span>opslaan disk</span>
            )}
        </div>
    );
};

export default SaveJson;
