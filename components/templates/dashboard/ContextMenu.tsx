import React, { useEffect, useState } from 'react';
import VangoUIFile from '@/models/VangoUIFile';

type ContextMenuProps = {
    show: boolean;
    x: number;
    y: number;
    file: VangoUIFile | null;
    onRenameClick: (fileId: string) => void;
    onCopyClick: (fileId: string) => void;
    onClose: () => void;
};

function ContextMenu({ show, x, y, file, onRenameClick, onCopyClick, onClose }: ContextMenuProps) {
  useEffect(() => {
    document.addEventListener('click', onClose);
    return () => {
        document.removeEventListener('click', onClose);
    };
  }, [onClose]);

  return show ? (
    <div className="absolute bg-gray-900 rounded-sm shadow-lg w-48 z-50 text-white text-xs" style={{top: y, left: x}} onClick={e => e.stopPropagation()}>
      <div className="rounded-tl-sm rounded-tr-sm cursor-pointer px-4 py-2 hover:bg-blue-500" onClick={() => onRenameClick(file?.fileId || '')}>
        Rename
      </div>
      <div className="rounded-bl-sm rounded-br-sm cursor-pointer px-4 py-2 hover:bg-blue-500" onClick={() => onCopyClick(file?.fileId || '')}>
        Copy
      </div>
    </div>
  ) : null;
}

export default ContextMenu;
