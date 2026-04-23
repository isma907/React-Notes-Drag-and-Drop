import { useNotesStore } from '../../store/useNotes';
import './StickyNote.css'
const StickyNote = ({ id }: { id: string }) => {

    const note = useNotesStore((s) => s.notes[id]);

    return (
        <article className="sticky-note" style={{ left: note.position.x, top: note.position.y, backgroundColor: note.backgroundColor }}>
            <textarea placeholder="Write your note here..." value={note.textContent} />
        </article>
    )
}

export default StickyNote
