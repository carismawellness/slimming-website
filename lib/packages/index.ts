import { PackageContent } from './types';
import { fatFreezing } from './fat-freezing';
import { fatDissolving } from './fat-dissolving';
import { muscleStimulation } from './muscle-stimulation';
import { skinTightening } from './skin-tightening';
import { lipocavitation } from './lipocavitation';
import { antiCellulite } from './anti-cellulite';
import { lymphaticDrainage } from './lymphatic-drainage';

/** Registry of pixel-faithful package-page content, keyed by route slug. */
export const packageContent: Record<string, PackageContent> = {
  'fat-freezing': fatFreezing,
  'fat-dissolving': fatDissolving,
  'muscle-stimulation': muscleStimulation,
  'skin-tightening': skinTightening,
  'lipocavitation': lipocavitation,
  'anti-cellulite': antiCellulite,
  'lymphatic-drainage': lymphaticDrainage,
};
