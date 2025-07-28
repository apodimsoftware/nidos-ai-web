import { useState } from 'react';
import { Plus, Search, Trash2, Edit3 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
}

const NotesApp = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome to NidOS Notes',
      content: 'This is your first note! You can create, edit, and organize your thoughts here.',
      lastModified: new Date('2024-11-28T10:30:00')
    },
    {
      id: '2', 
      title: 'Meeting Notes',
      content: 'Project review scheduled for next week. Need to prepare presentation slides.',
      lastModified: new Date('2024-11-27T14:15:00')
    },
    {
      id: '3',
      title: 'Shopping List',
      content: '• Groceries\n• Hardware store\n• Pick up dry cleaning',
      lastModified: new Date('2024-11-26T09:45:00')
    }
  ]);

  const [selectedNoteId, setSelectedNoteId] = useState<string>('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const selectedNote = notes.find(note => note.id === selectedNoteId);
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      lastModified: new Date()
    };

    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
    setIsEditing(true);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, lastModified: new Date() }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(notes.length > 1 ? notes[0].id : '');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex bg-card">
      {/* Notes Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Notes</h2>
            <button
              onClick={createNewNote}
              className="p-2 hover:bg-accent rounded-lg transition-os"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center bg-accent rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className={`p-4 border-b border-border cursor-pointer hover:bg-accent transition-os ${
                selectedNoteId === note.id ? 'bg-primary/10 border-l-2 border-l-primary' : ''
              }`}
              onClick={() => {
                setSelectedNoteId(note.id);
                setIsEditing(false);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{note.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {note.content || 'No content'}
                  </p>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {formatDate(note.lastModified)}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="p-1 hover:bg-destructive/20 rounded transition-os ml-2"
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            {/* Editor Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
                className="text-lg font-semibold bg-transparent outline-none flex-1"
                placeholder="Note title..."
              />
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 hover:bg-accent rounded-lg transition-os ml-2"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4">
              <textarea
                value={selectedNote.content}
                onChange={(e) => updateNote(selectedNote.id, { content: e.target.value })}
                placeholder="Start writing your note..."
                className="w-full h-full bg-transparent outline-none resize-none text-sm leading-relaxed"
              />
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-border bg-accent/50 text-xs text-muted-foreground">
              Last modified: {formatDate(selectedNote.lastModified)}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Edit3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a note to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesApp;