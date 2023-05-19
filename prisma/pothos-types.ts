/* eslint-disable */
import type { Prisma, User, Workspace, Folder, Note, WorkspaceMembership, Invitation } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "workspaceMemberships" | "ownedWorkspaces";
        ListRelations: "workspaceMemberships" | "ownedWorkspaces";
        Relations: {
            workspaceMemberships: {
                Shape: WorkspaceMembership[];
                Name: "WorkspaceMembership";
            };
            ownedWorkspaces: {
                Shape: Workspace[];
                Name: "Workspace";
            };
        };
    };
    Workspace: {
        Name: "Workspace";
        Shape: Workspace;
        Include: Prisma.WorkspaceInclude;
        Select: Prisma.WorkspaceSelect;
        OrderBy: Prisma.WorkspaceOrderByWithRelationInput;
        WhereUnique: Prisma.WorkspaceWhereUniqueInput;
        Where: Prisma.WorkspaceWhereInput;
        Create: {};
        Update: {};
        RelationName: "owner" | "memberships" | "folders" | "Invitation";
        ListRelations: "memberships" | "folders" | "Invitation";
        Relations: {
            owner: {
                Shape: User;
                Name: "User";
            };
            memberships: {
                Shape: WorkspaceMembership[];
                Name: "WorkspaceMembership";
            };
            folders: {
                Shape: Folder[];
                Name: "Folder";
            };
            Invitation: {
                Shape: Invitation[];
                Name: "Invitation";
            };
        };
    };
    Folder: {
        Name: "Folder";
        Shape: Folder;
        Include: Prisma.FolderInclude;
        Select: Prisma.FolderSelect;
        OrderBy: Prisma.FolderOrderByWithRelationInput;
        WhereUnique: Prisma.FolderWhereUniqueInput;
        Where: Prisma.FolderWhereInput;
        Create: {};
        Update: {};
        RelationName: "workspace" | "notes";
        ListRelations: "notes";
        Relations: {
            workspace: {
                Shape: Workspace;
                Name: "Workspace";
            };
            notes: {
                Shape: Note[];
                Name: "Note";
            };
        };
    };
    Note: {
        Name: "Note";
        Shape: Note;
        Include: Prisma.NoteInclude;
        Select: Prisma.NoteSelect;
        OrderBy: Prisma.NoteOrderByWithRelationInput;
        WhereUnique: Prisma.NoteWhereUniqueInput;
        Where: Prisma.NoteWhereInput;
        Create: {};
        Update: {};
        RelationName: "folder";
        ListRelations: never;
        Relations: {
            folder: {
                Shape: Folder;
                Name: "Folder";
            };
        };
    };
    WorkspaceMembership: {
        Name: "WorkspaceMembership";
        Shape: WorkspaceMembership;
        Include: Prisma.WorkspaceMembershipInclude;
        Select: Prisma.WorkspaceMembershipSelect;
        OrderBy: Prisma.WorkspaceMembershipOrderByWithRelationInput;
        WhereUnique: Prisma.WorkspaceMembershipWhereUniqueInput;
        Where: Prisma.WorkspaceMembershipWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "workspace";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
            };
            workspace: {
                Shape: Workspace;
                Name: "Workspace";
            };
        };
    };
    Invitation: {
        Name: "Invitation";
        Shape: Invitation;
        Include: Prisma.InvitationInclude;
        Select: Prisma.InvitationSelect;
        OrderBy: Prisma.InvitationOrderByWithRelationInput;
        WhereUnique: Prisma.InvitationWhereUniqueInput;
        Where: Prisma.InvitationWhereInput;
        Create: {};
        Update: {};
        RelationName: "workspace";
        ListRelations: never;
        Relations: {
            workspace: {
                Shape: Workspace;
                Name: "Workspace";
            };
        };
    };
}