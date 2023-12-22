import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '@/api/auth';
import { getExperiment } from '@/api/experiment';
import { Experiment as VangoExperiment } from '@/models/Experiment';
import ExperimentComponent from '@/components/experiment/Experiment'

const Experiment = () => {
  const router = useRouter();
  const { experimentId } = router.query;

  const [experiment, setExperiment] = useState<VangoExperiment>();

  const syncExperiment = async () => {
    setExperiment(await getExperiment(experimentId as string));
  }

  useEffect(() => {
    if (experimentId) {
      isLoggedIn().then((loggedIn) => {
        if (!loggedIn) {
          router.push(`/login?from=${encodeURIComponent(router.asPath)}`);
        } else {
          syncExperiment();
        }
      });
    }
  }, [experimentId]);

  return experiment ? (
    <div>
        <ExperimentComponent experiment={experiment} syncExperiment={syncExperiment}/>
    </div>
  ) : null;
};

export default Experiment;
