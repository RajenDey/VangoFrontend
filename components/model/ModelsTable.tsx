import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./../ui/table";
import { Model } from "@/models/Model";
import { getUsernames } from "@/api/user";
import { formatLastEdited } from "@/lib/utils";

type ModelsTableProps = {
    models: Model[];
    updateModels: () => Promise<void>;
}

export default function ModelsTable({ models, updateModels }: ModelsTableProps) {
  const [usernames, setUsernames] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernames = await getUsernames(models.map(model => model.owner_id));
      setUsernames(usernames);
    }
    if (models.length > 0) {
      fetchUsernames();
    }
  }, [models]);

  const openModel = (modelId: string) => {
    // window.open(`/model/${modelId}`, '_blank');
  }

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Last Edited</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model, index) => (
              <TableRow key={model.model_id} onDoubleClick={() => openModel(model.model_id)}>
                <TableCell>{model.name}</TableCell>
                <TableCell>{usernames ? usernames[index] : ""}</TableCell>
                <TableCell>{formatLastEdited(new Date(model.last_edited))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
