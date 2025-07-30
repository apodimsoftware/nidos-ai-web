import { useState, useRef, useEffect, useCallback } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
}

const Window = ({ id, title, children, onClose, onMinimize, onFocus, zIndex }: WindowProps) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('draggable')) {
      setIsDragging(true);
      onFocus();
      
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: Math.max(0, e.clientY - dragOffset.y),
      });
    }
  }, [isDragging, isMaximized, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Add event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 48px)' }
    : { 
        top: position.y, 
        left: position.x, 
        width: '800px', 
        height: '600px' 
      };

  return (
    <div
      ref={windowRef}
      className={`fixed os-window select-none ${isDragging ? 'cursor-grabbing' : 'cursor-default'}`}
      style={{ ...windowStyle, zIndex }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between p-3 border-b border-white/10 draggable cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-primary rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="text-sm font-medium text-foreground draggable">{title}</span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-os"
          >
            <Minus className="w-3 h-3 text-foreground" />
          </button>
          <button
            onClick={toggleMaximize}
            className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-os"
          >
            {isMaximized ? (
              <Square className="w-3 h-3 text-foreground" />
            ) : (
              <Maximize2 className="w-3 h-3 text-foreground" />
            )}
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center hover:bg-red-500/20 rounded transition-os"
          >
            <X className="w-3 h-3 text-foreground hover:text-red-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-full overflow-hidden bg-card">
        {children}
      </div>
    </div>
  );
};

export default Window;