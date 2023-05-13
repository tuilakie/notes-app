import { builder } from "./builder";
import "./types/User";
import "./types/Workspace";
import "./types/WorkspaceMembership";
import "./types/Folder";
import "./types/Note";
import "./types/Invitation";

export const schema = builder.toSchema();
