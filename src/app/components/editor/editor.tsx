import { useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import { TextStyle } from '@tiptap/extension-text-style';
import { Mathematics } from '@tiptap/extension-mathematics';
import CodeBlockLowLight from '@tiptap/extension-code-block-lowlight';

const lowlight = createLowlight(common);

export default function RichTextEditor({
    readOnly = false,
    startingContent = ``,
    background = `var(--darkMain)`, 
    onEditorChange = (content?: any) => {}, 
}) {
    const [loading, setLoading] = useState(true);
    const [htmlToRender, setHtmlToRender] = useState(``);

    useEffect(() => {
        setLoading(false);
    }, [])

    const editor = useEditor({
        editable: !readOnly,
        content: startingContent,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            let htmlContent = editor?.getHTML();
            onEditorChange(htmlContent);
            setHtmlToRender(htmlContent);
        },
        extensions: [
            TextStyle,
            StarterKit,
            CodeBlockLowLight.configure({ lowlight }),
            Mathematics.configure({
                // optional: inlineOptions
            }),
            Placeholder.configure({
                placeholder: `Enter Question - Example: $E=mc^2$`
            }),
        ],
    })

    return (
        <div className={`richTextEditorComponent`}>
            <EditorContent 
                editor={editor} 
                style={{ background }}
                className={`richTextEditorField ${readOnly ? `readOnly` : ``}`} 
            />
            {/* {loading == false && (
                <div 
                    dangerouslySetInnerHTML={{ __html: htmlToRender }}
                    className={`richTextEditorPreview prose prose-sm`} 
                ></div>
            )} */}
        </div>
    )
}