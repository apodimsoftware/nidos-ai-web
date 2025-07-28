import { useState } from 'react';
import { Folder, File, ArrowLeft, Home, RefreshCw, Search, MoreVertical } from 'lucide-react';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
}

const FileExplorer = () => {
  const [currentPath, setCurrentPath] = useState('C:\\Users\\NidOS User');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const folders: FileItem[] = [
    { name: 'Documents', type: 'folder', modified: '11/28/2024 2:30 PM' },
    { name: 'Downloads', type: 'folder', modified: '11/28/2024 1:15 PM' },
    { name: 'Pictures', type: 'folder', modified: '11/27/2024 9:45 AM' },
    { name: 'Music', type: 'folder', modified: '11/26/2024 4:20 PM' },
    { name: 'Videos', type: 'folder', modified: '11/25/2024 11:30 AM' },
  ];

  const files: FileItem[] = [
    { name: 'readme.txt', type: 'file', size: '2.3 KB', modified: '11/28/2024 10:15 AM' },
    { name: 'config.ini', type: 'file', size: '1.8 KB', modified: '11/27/2024 3:45 PM' },
    { name: 'notes.docx', type: 'file', size: '45.2 KB', modified: '11/26/2024 2:20 PM' },
  ];

  const allItems = [...folders, ...files];

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentPath(`${currentPath}\\${item.name}`);
    }
  };

  const handleItemSelect = (name: string) => {
    setSelectedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const goBack = () => {
    const pathParts = currentPath.split('\\');
    if (pathParts.length > 1) {
      pathParts.pop();
      setCurrentPath(pathParts.join('\\'));
    }
  };

  const goHome = () => {
    setCurrentPath('C:\\Users\\NidOS User');
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <button 
            onClick={goBack}
            className="p-2 hover:bg-accent rounded-lg transition-os"
            disabled={currentPath === 'C:\\Users\\NidOS User'}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={goHome}
            className="p-2 hover:bg-accent rounded-lg transition-os"
          >
            <Home className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-accent rounded-lg transition-os">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-accent rounded-lg px-3 py-1">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Search files..."
              className="bg-transparent outline-none text-sm flex-1 min-w-[150px]"
            />
          </div>
          <button className="p-2 hover:bg-accent rounded-lg transition-os">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="p-3 border-b border-border">
        <div className="bg-accent rounded-lg px-3 py-2">
          <span className="text-sm font-mono">{currentPath}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 border-r border-border p-3">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground mb-2">Quick Access</div>
            {['Desktop', 'Documents', 'Downloads', 'Pictures', 'Music', 'Videos'].map(item => (
              <button
                key={item}
                className="w-full text-left p-2 hover:bg-accent rounded-lg transition-os text-sm"
              >
                <Folder className="w-4 h-4 inline mr-2" />
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 p-3">
          <div className="space-y-1">
            {allItems.map(item => (
              <div
                key={item.name}
                className={`flex items-center p-2 hover:bg-accent rounded-lg cursor-pointer transition-os ${
                  selectedItems.includes(item.name) ? 'bg-primary/20' : ''
                }`}
                onClick={() => handleItemSelect(item.name)}
                onDoubleClick={() => handleItemClick(item)}
              >
                <div className="flex items-center flex-1">
                  {item.type === 'folder' ? (
                    <Folder className="w-5 h-5 text-primary mr-3" />
                  ) : (
                    <File className="w-5 h-5 text-muted-foreground mr-3" />
                  )}
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="flex items-center space-x-8 text-xs text-muted-foreground">
                  <span className="w-16 text-right">{item.size || ''}</span>
                  <span className="w-32 text-right">{item.modified}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-2 border-t border-border bg-accent/50 text-xs text-muted-foreground">
        {allItems.length} items | {selectedItems.length} selected
      </div>
    </div>
  );
};

export default FileExplorer;