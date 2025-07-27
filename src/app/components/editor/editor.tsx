import { useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import { TextStyle } from '@tiptap/extension-text-style';
import { Mathematics } from '@tiptap/extension-mathematics';
import CodeBlockLowLight from '@tiptap/extension-code-block-lowlight';

const lowlight = createLowlight(common);

export default function RichTextEditor() {
    const [loading, setLoading] = useState(true);
    const [htmlToRender, setHtmlToRender] = useState(``);

    useEffect(() => {
        setLoading(false);
    }, [])

    const editor = useEditor({
        content: ``,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            let htmlContent = editor?.getHTML();
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
            <EditorContent editor={editor} className={`richTextEditorField`} />
            {/* {loading == false && (
                <div 
                    dangerouslySetInnerHTML={{ __html: htmlToRender }}
                    className={`richTextEditorPreview prose prose-sm`} 
                ></div>
            )} */}
        </div>
    )
}