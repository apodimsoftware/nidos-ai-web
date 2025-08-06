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
  const [position, setPosition] = useState({ x: 150, y: 50 });
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
      // Ensure window doesn't go below the taskbar area (80px from bottom)
      const maxY = window.innerHeight - 80 - 40; // 80px taskbar + 40px margin
      setPosition({
        x: e.clientX - dragOffset.x,
        y: Math.max(0, Math.min(maxY, e.clientY - dragOffset.y)),
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
    ? { 
        top: 10, 
        left: 10, 
        width: 'calc(100vw - 20px)', 
        height: 'calc(100vh - 100px)' // Leave space for taskbar (80px) + margins
      }
    : { 
        top: position.y, 
        left: position.x, 
        width: '800px', 
        height: '600px' 
      };

  return (
    <div
      ref={windowRef}
      className={`fixed select-none rounded-xl overflow-hidden shadow-2xl border border-white/20 ${isDragging ? 'cursor-grabbing' : 'cursor-default'}`}
      style={{ 
        ...windowStyle, 
        zIndex,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)'
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 draggable cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="text-sm font-medium text-white draggable">{title}</span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/15 rounded-lg transition-all duration-200"
          >
            <Minus className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={toggleMaximize}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/15 rounded-lg transition-all duration-200"
          >
            {isMaximized ? (
              <Square className="w-4 h-4 text-white" />
            ) : (
              <Maximize2 className="w-4 h-4 text-white" />
            )}
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-red-500/30 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4 text-white hover:text-red-300" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-full overflow-hidden bg-white/5">
        {children}
      </div>
    </div>
  );
};

export default Window;