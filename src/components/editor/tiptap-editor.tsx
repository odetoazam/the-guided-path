'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorToolbar } from './editor-toolbar'

interface TiptapEditorProps {
  content?: any
  onChange?: (data: { json: any; html: string }) => void
  placeholder?: string
}

export function TiptapEditor({ content, onChange, placeholder = 'Begin your tadabbur...' }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-gold-600 dark:text-gold-400 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap focus:outline-none min-h-[400px] prose-blog',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.({
        json: editor.getJSON(),
        html: editor.getHTML(),
      })
    },
  })

  if (!editor) return null

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900/50 overflow-hidden">
      <EditorToolbar editor={editor} />
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
