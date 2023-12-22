import { Table } from "./../../ui/table";
import { TableHeader } from "./../../ui/table";
import { TableRow } from "./../../ui/table";
import { TableHead } from "./../../ui/table";
import { TableBody } from "./../../ui/table";
import { TableCell } from "./../../ui/table";
import ContextMenu from './ContextMenu';
import { useState } from "react";
import VangoUIFile from "@/models/VangoUIFile";
import { renameFile, copyFile } from "@/api/file";

type FilesTableProps = {
    files: VangoUIFile[];
    updateFiles: () => Promise<void>;
}

export default function FilesTable({ files, updateFiles }: FilesTableProps) {
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, file: VangoUIFile | null }>({ x: 0, y: 0, file: null });
  const [currentEditId, setCurrentEditId] = useState<string>('');
  
  const openFile = (fileId: string) => {
    window.open(`/file/${fileId}`, '_blank');
  }

  const handleRightClick = (event: React.MouseEvent, file: VangoUIFile) => {
    event.preventDefault();
    
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      file: file
    });
  }

  const handleCloseContextMenu = () => {
    setContextMenu({ x: 0, y: 0, file: null });
  }

  const onRenameClick = (fileId: string) => {
    setCurrentEditId(fileId);
    handleCloseContextMenu();
  }

  const onCopyClick = (fileId: string) => {
    copyFile(fileId).then(updateFiles);
    handleCloseContextMenu();
  }

  const rename = (fileId: string, newName: string) => {
    renameFile(fileId, newName).then(updateFiles);
    setCurrentEditId('');
  }

  return (
    <div className="flex-col md:flex">
        <ContextMenu
            show={contextMenu.file !== null}
            x={contextMenu.x}
            y={contextMenu.y}
            file={contextMenu.file}
            onRenameClick={onRenameClick}
            onCopyClick={onCopyClick}
            onClose={handleCloseContextMenu}
        />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Last Edited</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map(file => (
              <TableRow key={file.fileId} onDoubleClick={() => openFile(file.fileId)} onContextMenu={(event) => handleRightClick(event, file)}>
                <TableCell style={{width: '50%'}}>
                    {currentEditId === file.fileId ?
                        <input type="text" defaultValue={file.fileName} autoFocus onBlur={(e) => {rename(file.fileId, (e.target as any).value)}} onKeyDown={(e) => e.key === 'Enter' && rename(file.fileId, (e.target as any).value)} />
                        : 
                        file.fileName
                    }
                </TableCell>
                <TableCell>{file.owner.username}</TableCell>
                <TableCell>{file.formatLastEdited()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
