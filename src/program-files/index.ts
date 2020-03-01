import { Apps } from '~/src/constants/Apps';

import { Calculator } from './Calculator/Calculator';
import { Clippit } from './Clippit/Clippit';
import { Instagram } from './Instagram/Instagram';
import { InternetExplorer } from './InternetExplorer/InternetExplorer';
import { Modal } from './Modal/Modal';
import { Notepad } from './Notepad/Notepad';
import { Spotify } from './Spotify/Spotify';
import { Twitter } from './Twitter/Twitter';

export const ProgramFiles = {
  [Apps.calc]: Calculator,
  [Apps.clippit]: Clippit,
  [Apps.instagram]: Instagram,
  [Apps.iexplore]: InternetExplorer,
  [Apps.modal]: Modal,
  [Apps.notepad]: Notepad,
  [Apps.spotify]: Spotify,
  [Apps.twitter]: Twitter,
};
