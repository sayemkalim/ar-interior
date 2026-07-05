'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { useEffect, useState, useRef } from 'react'
import {
  Bold, Italic, Underline as UnderlineIcon,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus,
  RotateCcw, RotateCw, Link as LinkIcon, Unlink
} from 'lucide-react'

// ── Toolbar Button ────────────────────────────────────────────────────
const ToolbarBtn = ({ onClick, active, title, children, disabled }) => (
  <button
    type="button"
    onMouseDown={e => { e.preventDefault(); if (!disabled) onClick() }}
    title={title}
    disabled={disabled}
    style={{
      background: active ? 'rgba(201,169,110,0.25)' : 'transparent',
      border: active ? '1px solid rgba(201,169,110,0.5)' : '1px solid transparent',
      color: disabled ? 'rgba(232,224,212,0.2)' : active ? '#C9A96E' : 'rgba(232,224,212,0.7)',
      borderRadius: 4,
      padding: '6px 8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
      minWidth: 32,
    }}
  >
    {children}
  </button>
)

const Sep = () => (
  <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.1)', margin: '0 4px', flexShrink: 0 }} />
)

// ── Link Popup ────────────────────────────────────────────────────────
function LinkPopup({ editor, onClose }) {
  const [url, setUrl] = useState(() => editor.getAttributes('link').href || '')
  const [openInNew, setOpenInNew] = useState(() => editor.getAttributes('link').target === '_blank')
  const inputRef = useRef(null)

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50) }, [])

  const apply = () => {
    if (!url.trim()) return
    const href = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')
      ? url : `https://${url}`
    editor.chain().focus().extendMarkRange('link').setLink({
      href,
      target: openInNew ? '_blank' : null,
      rel: openInNew ? 'noopener noreferrer' : null,
    }).run()
    onClose()
  }

  const remove = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    onClose()
  }

  const isExistingLink = editor.isActive('link')

  return (
    <div style={{
      position: 'absolute', top: '100%', left: 0, zIndex: 999, marginTop: 6,
      background: '#0f0f14', border: '1px solid rgba(201,169,110,0.3)',
      borderRadius: 6, padding: 16, width: 340, boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
    }}>
      <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(232,224,212,0.4)', marginBottom: 10 }}>
        {isExistingLink ? 'Edit Link' : 'Insert Link'}
      </p>
      <input
        ref={inputRef}
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); apply() } if (e.key === 'Escape') onClose() }}
        placeholder="https://example.com"
        style={{
          width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 4, padding: '9px 12px', color: '#fff', fontSize: 13,
          fontFamily: 'monospace', boxSizing: 'border-box', marginBottom: 10,
        }}
      />
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 14, fontSize: 13, color: 'rgba(232,224,212,0.6)' }}>
        <input
          type="checkbox"
          checked={openInNew}
          onChange={e => setOpenInNew(e.target.checked)}
          style={{ accentColor: '#C9A96E', width: 14, height: 14 }}
        />
        Open in new tab
      </label>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={apply}
          style={{ flex: 1, background: '#C9A96E', color: '#000', border: 'none', borderRadius: 4, padding: '9px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          {isExistingLink ? 'Update' : 'Apply'}
        </button>
        {isExistingLink && (
          <button
            type="button"
            onClick={remove}
            style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 4, padding: '9px 14px', fontSize: 13, cursor: 'pointer' }}>
            Remove
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(232,224,212,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, padding: '9px 14px', fontSize: 13, cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

// ── Main Editor ───────────────────────────────────────────────────────
export default function RichEditor({ value, onChange }) {
  const [showLinkPopup, setShowLinkPopup] = useState(false)
  const linkBtnRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: 'tiptap-link',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog post here...\n\nTip: Select text then click the link icon to add a hyperlink. You can also paste directly from Google Docs.',
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        style: [
          'height: 700px',
          'overflow-y: auto',
          'padding: 24px',
          'outline: none',
          'font-size: 15px',
          'line-height: 1.8',
          'color: rgba(232,224,212,0.85)',
          'font-family: var(--font-dm-sans)',
        ].join(';'),
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false)
    }
  }, [value]) // eslint-disable-line

  // Close link popup on outside click
  useEffect(() => {
    if (!showLinkPopup) return
    const handler = (e) => {
      if (!linkBtnRef.current?.parentElement?.contains(e.target)) {
        setShowLinkPopup(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showLinkPopup])

  if (!editor) return null

  const btn = (fn, isActive, label, icon, disabled) => (
    <ToolbarBtn onClick={fn} active={isActive} title={label} disabled={disabled}>{icon}</ToolbarBtn>
  )

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'visible', background: 'rgba(0,0,0,0.3)', position: 'relative' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2,
        padding: '10px 14px', background: 'rgba(0,0,0,0.4)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '6px 6px 0 0',
      }}>
        {btn(() => editor.chain().focus().toggleBold().run(),      editor.isActive('bold'),      'Bold',          <Bold size={15}/>)}
        {btn(() => editor.chain().focus().toggleItalic().run(),    editor.isActive('italic'),    'Italic',        <Italic size={15}/>)}
        {btn(() => editor.chain().focus().toggleUnderline().run(), editor.isActive('underline'), 'Underline',     <UnderlineIcon size={15}/>)}
        <Sep/>
        {btn(() => editor.chain().focus().toggleHeading({ level: 1 }).run(), editor.isActive('heading',{level:1}), 'Heading 1', <Heading1 size={15}/>)}
        {btn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading',{level:2}), 'Heading 2', <Heading2 size={15}/>)}
        {btn(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive('heading',{level:3}), 'Heading 3', <Heading3 size={15}/>)}
        <Sep/>
        {btn(() => editor.chain().focus().toggleBulletList().run(),  editor.isActive('bulletList'),  'Bullet List',   <List size={15}/>)}
        {btn(() => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'), 'Numbered List', <ListOrdered size={15}/>)}
        <Sep/>
        {btn(() => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote'), 'Blockquote', <Quote size={15}/>)}
        {btn(() => editor.chain().focus().setHorizontalRule().run(), false, 'Divider', <Minus size={15}/>)}
        <Sep/>

        {/* Link button with popup */}
        <div ref={linkBtnRef} style={{ position: 'relative' }}>
          <ToolbarBtn
            onClick={() => setShowLinkPopup(p => !p)}
            active={editor.isActive('link') || showLinkPopup}
            title="Add / Edit Link (select text first)"
          >
            <LinkIcon size={15}/>
          </ToolbarBtn>
          {showLinkPopup && (
            <LinkPopup editor={editor} onClose={() => setShowLinkPopup(false)} />
          )}
        </div>

        {/* Unlink — only visible when cursor is on a link */}
        {editor.isActive('link') && (
          btn(
            () => editor.chain().focus().extendMarkRange('link').unsetLink().run(),
            false, 'Remove Link', <Unlink size={15}/>
          )
        )}

        <Sep/>
        {btn(() => editor.chain().focus().undo().run(), false, 'Undo', <RotateCcw size={15}/>)}
        {btn(() => editor.chain().focus().redo().run(), false, 'Redo', <RotateCw size={15}/>)}
      </div>

      <EditorContent editor={editor} />

      <style>{`
        .tiptap p { margin: 0 0 16px; }
        .tiptap h1 { font-family: var(--font-playfair); font-size: 34px; color: #fff; margin: 48px 0 18px; line-height: 1.2; }
        .tiptap h2 { font-family: var(--font-playfair); font-size: 26px; color: #fff; margin: 40px 0 14px; line-height: 1.3; }
        .tiptap h3 { font-family: var(--font-playfair); font-size: 20px; color: #fff; margin: 30px 0 12px; line-height: 1.3; }
        .tiptap ul { padding-left: 22px; margin-bottom: 18px; list-style-type: disc; }
        .tiptap ol { padding-left: 22px; margin-bottom: 18px; list-style-type: decimal; }
        .tiptap li { margin-bottom: 8px; }
        .tiptap ul li::marker { color: #C9A96E; }
        .tiptap blockquote { border-left: 3px solid #C9A96E; padding: 4px 0 4px 20px; margin: 28px 0; color: rgba(201,169,110,0.85); font-style: italic; font-size: 17px; font-family: var(--font-playfair); }
        .tiptap hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 36px 0; }
        .tiptap strong { color: #fff; }
        .tiptap em { color: rgba(232,224,212,0.95); }
        .tiptap u { text-decoration-color: rgba(201,169,110,0.6); }
        .tiptap-link, .tiptap a { color: #C9A96E; text-decoration: underline; text-decoration-color: rgba(201,169,110,0.4); text-underline-offset: 3px; cursor: pointer; transition: color 0.2s; }
        .tiptap-link:hover, .tiptap a:hover { color: #e0c88a; }
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(232,224,212,0.2);
          pointer-events: none;
          height: 0;
          white-space: pre-line;
        }
        /* Custom scrollbar for the editor */
        .tiptap::-webkit-scrollbar { width: 8px; }
        .tiptap::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 4px; }
        .tiptap::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .tiptap::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  )
}
