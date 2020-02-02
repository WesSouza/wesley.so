import { Apps } from '~/src/constants/Apps';

import { Modal } from './Modal/Modal';
import { Notepad } from './Notepad/Notepad';

export const ProgramFiles = {
  [Apps.modal]: Modal,
  [Apps.notepad]: Notepad,
};
