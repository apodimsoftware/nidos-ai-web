import { useState } from 'react';
import { Folder, File, ArrowLeft, Home, RefreshCw, Search, MoreVertical, Plus, FolderPlus, Upload } from 'lucide-react';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
  path: string;
}

interface FolderStructure {
  [key: string]: FileItem[];
}

const FileExplorer = () => {
  const [currentPath, setCurrentPath] = useState('C:\\Users\\NidOS User');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });

  // Simulated file system structure
  const fileSystem: FolderStructure = {
    'C:\\Users\\NidOS User': [
      { name: 'Documents', type: 'folder', modified: '11/28/2024 2:30 PM', path: 'C:\\Users\\NidOS User\\Documents' },
      { name: 'Downloads', type: 'folder', modified: '11/28/2024 1:15 PM', path: 'C:\\Users\\NidOS User\\Downloads' },
      { name: 'Pictures', type: 'folder', modified: '11/27/2024 9:45 AM', path: 'C:\\Users\\NidOS User\\Pictures' },
      { name: 'Music', type: 'folder', modified: '11/26/2024 4:20 PM', path: 'C:\\Users\\NidOS User\\Music' },
      { name: 'Videos', type: 'folder', modified: '11/25/2024 11:30 AM', path: 'C:\\Users\\NidOS User\\Videos' },
      { name: 'readme.txt', type: 'file', size: '2.3 KB', modified: '11/28/2024 10:15 AM', path: 'C:\\Users\\NidOS User\\readme.txt' },
      { name: 'config.ini', type: 'file', size: '1.8 KB', modified: '11/27/2024 3:45 PM', path: 'C:\\Users\\NidOS User\\config.ini' },
    ],
    'C:\\Users\\NidOS User\\Documents': [
      { name: 'Work', type: 'folder', modified: '11/27/2024 3:00 PM', path: 'C:\\Users\\NidOS User\\Documents\\Work' },
      { name: 'Personal', type: 'folder', modified: '11/26/2024 5:00 PM', path: 'C:\\Users\\NidOS User\\Documents\\Personal' },
      { name: 'report.docx', type: 'file', size: '125 KB', modified: '11/28/2024 9:30 AM', path: 'C:\\Users\\NidOS User\\Documents\\report.docx' },
      { name: 'presentation.pptx', type: 'file', size: '2.8 MB', modified: '11/27/2024 4:15 PM', path: 'C:\\Users\\NidOS User\\Documents\\presentation.pptx' },
    ],
    'C:\\Users\\NidOS User\\Downloads': [
      { name: 'installer.exe', type: 'file', size: '45.2 MB', modified: '11/28/2024 8:45 AM', path: 'C:\\Users\\NidOS User\\Downloads\\installer.exe' },
      { name: 'photo.jpg', type: 'file', size: '3.2 MB', modified: '11/27/2024 7:20 PM', path: 'C:\\Users\\NidOS User\\Downloads\\photo.jpg' },
      { name: 'document.pdf', type: 'file', size: '1.5 MB', modified: '11/26/2024 2:10 PM', path: 'C:\\Users\\NidOS User\\Downloads\\document.pdf' },
    ],
    'C:\\Users\\NidOS User\\Pictures': [
      { name: 'Vacation 2024', type: 'folder', modified: '11/25/2024 6:30 PM', path: 'C:\\Users\\NidOS User\\Pictures\\Vacation 2024' },
      { name: 'Screenshots', type: 'folder', modified: '11/28/2024 11:45 AM', path: 'C:\\Users\\NidOS User\\Pictures\\Screenshots' },
      { name: 'wallpaper.jpg', type: 'file', size: '4.1 MB', modified: '11/24/2024 10:20 AM', path: 'C:\\Users\\NidOS User\\Pictures\\wallpaper.jpg' },
    ]
  };

  const currentItems = fileSystem[currentPath] || [];

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentPath(item.path);
      setSelectedItems([]);
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
    if (pathParts.length > 3) { // Don't go above C:\Users\NidOS User
      pathParts.pop();
      setCurrentPath(pathParts.join('\\'));
      setSelectedItems([]);
    }
  };

  const goHome = () => {
    setCurrentPath('C:\\Users\\NidOS User');
    setSelectedItems([]);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const createFolder = () => {
    const newFolderName = prompt('Enter folder name:');
    if (newFolderName) {
      // In a real app, this would create the folder
      console.log(`Creating folder: ${newFolderName}`);
    }
    setShowContextMenu(false);
  };

  const createFile = () => {
    const newFileName = prompt('Enter file name:');
    if (newFileName) {
      // In a real app, this would create the file
      console.log(`Creating file: ${newFileName}`);
    }
    setShowContextMenu(false);
  };

  return (
    <div className="h-full flex flex-col bg-card" onClick={() => setShowContextMenu(false)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <button 
            onClick={goBack}
            className="p-2 hover:bg-accent rounded-lg transition-os"
            disabled={currentPath === 'C:\\Users\\NidOS User'}
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={goHome}
            className="p-2 hover:bg-accent rounded-lg transition-os"
            title="Go home"
          >
            <Home className="w-4 h-4" />
          </button>
          <button 
            className="p-2 hover:bg-accent rounded-lg transition-os"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={createFolder}
            className="p-2 hover:bg-accent rounded-lg transition-os"
            title="New folder"
          >
            <FolderPlus className="w-4 h-4" />
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
        <div className="flex-1 p-3" onContextMenu={handleContextMenu}>
          <div className="space-y-1">
            {currentItems.map(item => (
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
        {currentItems.length} items | {selectedItems.length} selected
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <div 
          className="fixed glass-panel backdrop-blur-xl rounded-lg py-2 z-50 min-w-[160px]"
          style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={createFolder}
            className="w-full text-left px-3 py-2 hover:bg-accent transition-os flex items-center"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </button>
          <button
            onClick={createFile}
            className="w-full text-left px-3 py-2 hover:bg-accent transition-os flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New File
          </button>
          <div className="border-t border-border my-1" />
          <button className="w-full text-left px-3 py-2 hover:bg-accent transition-os flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;