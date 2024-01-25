import { IParsedParticipant } from '../store/models/common/Participants';
import { safeJSONParse } from './safeJsonParse';

export const dataError = 'Data error!';

export const isParsedParticipant = <(o: unknown) => o is IParsedParticipant>((o) => {
  const typed = o as IParsedParticipant;
  return typed?.email !== undefined && typed?.name !== undefined && typed?.userAgent !== undefined;
});

export const parseParticipant = (jsonStr: string) => {
  return safeJSONParse<IParsedParticipant>(isParsedParticipant)(jsonStr);
};
