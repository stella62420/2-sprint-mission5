import { nonempty, object, partial, string } from 'superstruct';
import { CursorParamsStruct } from '../lib/commonStructs.js';

export const CreateCommentBodyStruct = object({
  content: nonempty(string()),
});

export const GetCommentListParamsStruct = CursorParamsStruct;

export const UpdateCommentBodyStruct = partial(CreateCommentBodyStruct);
