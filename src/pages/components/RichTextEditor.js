// 富文本组件
// RichTextEditor.js

import React, { useRef, useEffect } from 'react';

const RichTextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    return (
        <div
            ref={editorRef}
            className="rich-text-editor"
        />
    );
};

export default RichTextEditor;