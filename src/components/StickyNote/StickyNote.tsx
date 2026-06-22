import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNotesStore } from "../../store/useNotes";
import { useDrag } from "../../hooks/useDrag";
import { useResize } from "../../hooks/useResize";
import { BoardContext } from "../../context/boardContext";
import {
  GripHorizontal,
  Bold,
  Italic,
  Underline,
  Strikethrough,
} from "lucide-react";
import "./StickyNote.css";
import { Editable, Slate, withReact } from "slate-react";
import {
  createEditor,
  Editor,
  type Descendant,
  type Element as SlateElement,
} from "slate";

const normalizeTextContent = (
  content: string | Descendant[] | undefined,
): Descendant[] => {
  if (Array.isArray(content)) {
    return content;
  }

  return [
    {
      type: "paragraph",
      children: [{ text: content ?? "" }],
    } as SlateElement,
  ];
};

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: Record<string, any>;
  children: React.ReactNode;
  leaf: any;
}) => {
  let el = children;

  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }
  if (leaf.italic) {
    el = <em>{el}</em>;
  }
  if (leaf.underline) {
    el = <u>{el}</u>;
  }
  if (leaf.strikethrough) {
    el = <del>{el}</del>;
  }

  return <span {...attributes}>{el}</span>;
};

const StickyNote = ({ id }: { id: string }) => {
  const note = useNotesStore((s) => s.notes[id]);
  const noteRef = useRef<HTMLDivElement>(null);
  const { trashRef, boardRef } = useContext(BoardContext)!;

  const { onStartDragNote, onDragNote, onDropNote } = useDrag(
    id,
    noteRef,
    trashRef,
    boardRef,
  );
  const { onStartResizeNote, onResizeNote, onResizeNoteEnd } = useResize(
    id,
    noteRef,
    boardRef,
  );

  const updateNote = useNotesStore((s) => s.updateNote);
  const editor = useMemo(() => withReact(createEditor()), []);

  const [noteValue, setNoteValue] = useState<Descendant[]>(
    normalizeTextContent(note?.textContent),
  );

  useEffect(() => {
    setNoteValue(normalizeTextContent(note?.textContent));
  }, [note?.textContent]);

  const handleSlateChange = useCallback((newValue: Descendant[]) => {
    setNoteValue(newValue);
  }, []);

  const toggleMark = useCallback(
    (format: string) => {
      const isActive = (Editor.marks(editor) as Record<string, any>)?.[format];
      if (isActive) {
        Editor.removeMark(editor, format);
      } else {
        Editor.addMark(editor, format, true);
      }
    },
    [editor],
  );

  const isMarkActive = useCallback(
    (format: string) => {
      return !!(Editor.marks(editor) as Record<string, any>)?.[format];
    },
    [editor],
  );

  const handleUpdateText = useCallback(() => {
    const current = normalizeTextContent(
      useNotesStore.getState().notes[id]?.textContent,
    );

    if (JSON.stringify(noteValue) !== JSON.stringify(current)) {
      updateNote(id, { textContent: noteValue });
    }
  }, [id, noteValue, updateNote]);

  if (!note) return null;

  return (
    <article
      className="sticky-note"
      style={{
        width: note.size?.width,
        height: note.size?.height,
        transform: `translate(${note.position.x}px, ${note.position.y}px)`,
        backgroundColor: note.backgroundColor,
        zIndex: note.zIndex,
      }}
      ref={noteRef}
    >
      <div
        className="sticky-note-drag-handler"
        onPointerDown={onStartDragNote}
        onPointerMove={onDragNote}
        onPointerUp={onDropNote}
      >
        <span className="sticky-note-drag-handler-icon">
          <GripHorizontal />
        </span>
      </div>

      <div className="sticky-note-toolbar">
        <button
          className={`sticky-note-toolbar-btn ${
            isMarkActive("bold") ? "active" : ""
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark("bold");
          }}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </button>
        <button
          className={`sticky-note-toolbar-btn ${
            isMarkActive("italic") ? "active" : ""
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark("italic");
          }}
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </button>
        <button
          className={`sticky-note-toolbar-btn ${
            isMarkActive("underline") ? "active" : ""
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark("underline");
          }}
          title="Underline (Ctrl+U)"
        >
          <Underline size={16} />
        </button>
        <button
          className={`sticky-note-toolbar-btn ${
            isMarkActive("strikethrough") ? "active" : ""
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark("strikethrough");
          }}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>
      </div>

      <Slate
        editor={editor}
        initialValue={noteValue}
        onChange={handleSlateChange}
      >
        <Editable
          className="sticky-note_text-content"
          onBlur={handleUpdateText}
          renderLeaf={(props) => <Leaf {...props} />}
        />
      </Slate>

      <div
        className="sticky-note-resize-handler"
        onPointerDown={onStartResizeNote}
        onPointerMove={onResizeNote}
        onPointerUp={onResizeNoteEnd}
      />
    </article>
  );
};

export default React.memo(StickyNote);
