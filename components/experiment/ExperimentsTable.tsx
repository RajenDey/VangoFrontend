import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./../ui/table";
import { Experiment } from "@/models/Experiment";
import { getUsernames } from "@/api/user";
import { formatLastEdited } from "@/lib/utils";

type ExperimentsTableProps = {
    experiments: Experiment[];
    updateExperiments: () => Promise<void>;
}

export default function ExperimentsTable({ experiments, updateExperiments }: ExperimentsTableProps) {
  const [usernames, setUsernames] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernames = await getUsernames(experiments.map(experiment => experiment.owner_id));
      setUsernames(usernames);
    }
    if (experiments.length > 0) {
      fetchUsernames();
    }
  }, [experiments]);

  const openExperiment = (experimentId: string) => {
    window.open(`/experiment/${experimentId}`, '_blank');
  }

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Experiment Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Last Edited</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiments.map((experiment, index) => (
              <TableRow key={experiment.experiment_id} onDoubleClick={() => openExperiment(experiment.experiment_id)}>
                <TableCell>{experiment.name}</TableCell>
                <TableCell>{usernames ? usernames[index] : ""}</TableCell>
                <TableCell>{formatLastEdited(new Date(experiment.last_edited))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
