import { useState } from 'react';
import { Save, FileText, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const TextEditor = () => {
  const [content, setContent] = useState(`Welcome to NidOS Text Editor!

This is a simple text editor that simulates basic word processing functionality.

You can:
• Type and edit text
• Use basic formatting options
• Save your documents
• Create new files

Start typing to experience the authentic text editing environment of NidOS.`);

  const [fileName, setFileName] = useState('Untitled Document');
  const [isModified, setIsModified] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsModified(true);
  };

  const handleSave = () => {
    setIsModified(false);
    // Simulate save operation
    console.log('Document saved:', fileName);
  };

  const handleNew = () => {
    setContent('');
    setFileName('Untitled Document');
    setIsModified(false);
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Menu Bar */}
      <div className="flex items-center justify-between p-2 border-b border-border">
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleNew}
            className="px-3 py-1 hover:bg-accent rounded text-sm transition-os"
          >
            New
          </button>
          <button 
            onClick={handleSave}
            className="px-3 py-1 hover:bg-accent rounded text-sm transition-os flex items-center"
          >
            <Save className="w-3 h-3 mr-1" />
            Save
          </button>
          <div className="border-l border-border h-4 mx-2" />
          <span className="text-sm text-muted-foreground">
            {fileName} {isModified && '*'}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-accent rounded transition-os">
            <Bold className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-accent rounded transition-os">
            <Italic className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-accent rounded transition-os">
            <Underline className="w-4 h-4" />
          </button>
          <div className="border-l border-border h-4 mx-2" />
          <button className="p-1 hover:bg-accent rounded transition-os">
            <AlignLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-accent rounded transition-os">
            <AlignCenter className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-accent rounded transition-os">
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start typing your document..."
          className="w-full h-full bg-transparent outline-none resize-none text-sm leading-relaxed font-mono"
          style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 border-t border-border bg-accent/50 text-xs text-muted-foreground">
        <span>Line 1, Column 1</span>
        <span>{content.length} characters</span>
        <span>Plain Text</span>
      </div>
    </div>
  );
};

export default TextEditor;