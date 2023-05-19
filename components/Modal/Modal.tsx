"use client";
import { gql, useMutation } from "@apollo/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, useEffect, useState } from "react";
import {
  CREATE_FOLDER,
  CREATE_INVITATION,
  CREATE_WORKSPACE,
  DELETE_FOLDER,
  DELETE_NOTE,
  DELETE_WORKSPACE,
} from "./mutation";
import toast from "react-hot-toast";
import { GET_WORKSPACES } from "../workspace/workspace.query";
import { GET_FOLDER_BY_WORKSPACEID } from "../folders/folder.query";
import { GET_NOTES_BY_FOLDERID } from "../notes/notes.query";
import { useSession } from "next-auth/react";

const popupTypes = ["workspace", "folder", "note"];
const actionTypes = ["create", "edit", "delete", "invite", "leave"];
const styleToasts: CSSProperties = {
  minWidth: "250px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export default function WorkspaceModal() {
  const [textInput, setTextInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { workspaceId, folderId } = useParams();
  const router = useRouter();
  const { data: session } = useSession() as any;

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCancel();
    }
  };

  // hanlde workspace
  const [createWorkspace] = useMutation(CREATE_WORKSPACE);
  const [deleteWokspace] = useMutation(DELETE_WORKSPACE);
  const [createInvitation] = useMutation(CREATE_INVITATION);

  // handle folder
  const [createFolder] = useMutation(CREATE_FOLDER);
  const [deleteFolder] = useMutation(DELETE_FOLDER);

  // handle note
  // const [createNote] = useMutation(CREATE_NOTE);
  const [deleteNote] = useMutation(DELETE_NOTE);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (popup) {
      case "workspace":
        if (action === "create") {
          toast.promise(
            createWorkspace({
              variables: { name: textInput, ownerId: session?.user?.id },
              refetchQueries: [
                {
                  query: GET_WORKSPACES,
                  variables: { userId: session?.user?.id },
                },
              ],
            }),
            {
              loading: "Creating workspace...",
              success: (data: any) => {
                console.log(data);
                const workspaceName = data?.data?.createWorkspace?.name || "";
                return `Workspace ${workspaceName} created!`;
              },
              error: (error) => error.message,
            },
            {
              style: styleToasts,
            }
          );
        }
        if (action === "delete") {
          arg
            ? toast.promise(
                deleteWokspace({
                  variables: { deleteWorkspaceId: arg },
                  refetchQueries: [
                    {
                      query: GET_WORKSPACES,
                      variables: { userId: session?.user?.id },
                    },
                  ],
                }),
                {
                  loading: "Deleting workspace...",
                  success: (data: any) => {
                    console.log(data);
                    const workspaceName =
                      data?.data?.deleteWorkspace?.name || "";
                    return `Workspace ${workspaceName} deleted!`;
                  },
                  error: (error) => error.message,
                },
                {
                  style: styleToasts,
                }
              )
            : toast.error("Error deleting workspace");
        }
        if (action === "invite") {
          toast.promise(
            createInvitation({
              variables: { workspaceId, email: textInput },
            }),
            {
              loading: "Sending invitation...",
              success: (data: any) => {
                console.log(data);
                return `Invitation sent!`;
              },
              error: (error) => error.message,
            },
            {
              style: styleToasts,
            }
          );
        }
        handleCancel();
        break;
      case "folder":
        if (action === "create") {
          workspaceId
            ? toast.promise(
                createFolder({
                  variables: { name: textInput, workspaceId },
                  refetchQueries: [
                    {
                      query: GET_FOLDER_BY_WORKSPACEID,
                      variables: { workspaceId },
                    },
                  ],
                }),
                {
                  loading: "Creating folder...",
                  success: (data: any) => {
                    console.log(data);
                    const folderName = data?.data?.createFolder?.name || "";
                    return `Folder ${folderName} created!`;
                  },
                  error: (error) => error.message,
                },
                {
                  style: {
                    minWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }
              )
            : toast.error("Error creating folder");
        }
        if (action === "delete") {
          arg
            ? toast.promise(
                deleteFolder({
                  variables: { deleteFolderId: arg },
                  refetchQueries: [
                    {
                      query: GET_FOLDER_BY_WORKSPACEID,
                      variables: { workspaceId },
                    },
                  ],
                }),
                {
                  loading: "Deleting folder...",
                  success: (data: any) => {
                    console.log(data);
                    const folderName = data?.data?.deleteFolder?.name || "";
                    return `Folder ${folderName} deleted!`;
                  },
                  error: (error) => error.message,
                }
              )
            : toast.error("Error deleting folder");
        }

        handleCancel();
        break;
      case "note":
        if (action === "delete") {
          arg
            ? toast.promise(
                deleteNote({
                  variables: { deleteNoteId: arg },
                  refetchQueries: [
                    {
                      query: GET_NOTES_BY_FOLDERID,
                      variables: { folderId: folderId },
                    },
                  ],
                }),
                {
                  loading: "Deleting note...",
                  success: (data: any) => {
                    console.log(data);
                    const noteName =
                      data?.data?.deleteNote?.contnent?.substring(0, 15) || "";
                    return `Note ${noteName} deleted!`;
                  },
                  error: (error) => error.message,
                }
              )
            : toast.error("Error deleting note");
        }
        handleCancel();
        break;
      default:
        handleCancel();
        break;
    }
  };

  const handleCancel = () => {
    setTextInput("");
    setIsOpen(false);
    router.back();
  };

  const popup = useSearchParams().get("popup");
  const action = useSearchParams().get("action");
  const arg = useSearchParams().get("arg");

  useEffect(() => {
    if (
      popup &&
      action &&
      popupTypes.includes(popup) &&
      actionTypes.includes(action)
    ) {
      setIsOpen(true);
    }
    return () => {
      setIsOpen(false);
    };
  }, [popup, action]);

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={handleClickOutside}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="w-full flex flex-col ">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                    {action && action.toUpperCase()}{" "}
                    {popup && popup.toUpperCase()}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    {action === "delete" || action === "leave"
                      ? `Are you sure you want to ${action} this ${
                          popup === "workspace"
                            ? "workspace"
                            : popup === "folder"
                            ? "folder"
                            : "note"
                        }?`
                      : `Enter a name for your ${
                          popup === "folder"
                            ? "folder"
                            : action === "invite"
                            ? "member(email)"
                            : "workspace"
                        }`}
                  </p>
                  {action !== "delete" && (
                    <input
                      type="text"
                      name="textInput"
                      value={textInput}
                      onChange={(event) => setTextInput(event.target.value)}
                      placeholder="Workspace Name"
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {action && action.toUpperCase()}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
