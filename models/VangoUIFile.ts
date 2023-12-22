import User from "@/models/User";
import { getUser } from "@/api/user";

class VangoUIFile {
    fileId: string;
    fileName: string;
    owner: User;
    lastEdited: Date;

    constructor(fileId: string, fileName: string, owner: User, lastEdited: Date) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.owner = owner;
        this.lastEdited = lastEdited;
    }

    formatLastEdited(): string {
        const now = new Date();
      
        // Get the difference in time between the current date and the last edited date
        const diff = now.getTime() - this.lastEdited.getTime();
      
        // Calculate the difference in various units
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
      
        // Create a relative time formatter
        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      
        // Return the appropriate string based on the time difference
        if (weeks > 1) return `${this.lastEdited.toLocaleDateString()}`;
        if (days > 0) return rtf.format(-days, 'day');
        if (hours > 0) return rtf.format(-hours, 'hour');
        if (minutes > 0) return rtf.format(-minutes, 'minute');
        
        return rtf.format(-seconds, 'second');
    }

    static async fromObject(obj: {file_id: string, file_name: string, owner_id: string, last_edited: string}): Promise<VangoUIFile> {
        const lastEdited = new Date(obj.last_edited);
        const owner = await getUser(obj.owner_id);
        return new VangoUIFile(obj.file_id, obj.file_name, owner, lastEdited);
    }
}

export default VangoUIFile;
