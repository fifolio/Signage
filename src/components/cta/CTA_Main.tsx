import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// UI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "../ui/separator"
import { Button } from "@/components/ui/button"
import LoadingState from "../ui/LoadingState"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


// STORES
import useAllFiles from "@/stores/backend/useAllFiles"
import useUserDataStore from "@/stores/backend/useUserDataStore"

// INTERFACES
import { fetchedWorkspaces_interface } from "@/interfaces"

// SERVICES
import { fetchAllFiles } from "@/backend/services/files/fetchAllFiles"

// ICONS
import { FaRegFolderOpen } from "react-icons/fa";

// HELPERS
import { handleCreateNewFile } from "@/helpers"


export default function CTA_Main() {

  // Get user data from store
  const { userData } = useUserDataStore();

  // Loading screen
  const [loadingFiles, setLoadingFiles] = useState<boolean>(true);

  // Loading While Creating New File
  const [isCreatingNewFile, setIsCreatingNewFile] = useState<boolean>(false);

  // Collect Search Data
  const [searchData, setSearchData] = useState<{
    searchBy: string,
    searchValue: string,
  }>({
    searchBy: "fileId",
    searchValue: "",
  });

  // Get all files
  const { allFiles } = useAllFiles();

  async function initialize() {
    const getFiles = await fetchAllFiles(searchData);
    if (getFiles) {
      setLoadingFiles(false);
    } else {
      setLoadingFiles(false);
    }
  }

  const handleSearch = () => {
    setLoadingFiles(true);
    initialize();
  };

  useEffect(() => {
    initialize();
  }, []);


  // Handle Create New File
  async function createNewFile() {
    setIsCreatingNewFile(true);
    await handleCreateNewFile(userData?.name, userData?.name);
  };

  return (
    <div className="flex-col space-y-4 max-w-[800px] mx-auto">
      <Separator className="w-[500px] mx-auto" />

      {/* START NEW WORKSPACE */}
      <div className="flex justify-between space-x-2">

        {/* Search By */}
        <Select defaultValue="fileId" onValueChange={(value) => setSearchData({ ...searchData, searchBy: value })}>
          <SelectTrigger className="max-w-[200px] h-[40px] bg-white border-[1px] shadow-sm border-gray-200 rounded-md font-semibold">
            <SelectValue placeholder="Search By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fileId">Screen ID <span className="text-gray-700">(recommended)</span></SelectItem>
            <SelectItem value="fileName">File Title</SelectItem>
            <SelectItem value="fileCreator">File Creator</SelectItem>
          </SelectContent>
        </Select>


        {/* Search Bar */}
        <input
          type="text"
          placeholder={`Search By ${searchData.searchBy === "fileId" ? "screen ID" : searchData.searchBy === "fileName" ? "file title" : searchData.searchBy === "fileCreator" ? "Creator name" : 'screen ID'}`.toLowerCase()}
          className="w-full h-[40px] px-4 border-[1px] shadow-sm border-gray-200 rounded-md capitalize"
          onChange={(e) => setSearchData({ ...searchData, searchValue: e.target.value })}
        />

        <Button onClick={handleSearch} className="h-[40px] shadow-sm">Search</Button>

        {/* Vertical line for space */}
        <div className="w-[2px] h-[40px] bg-gray-200"></div>

        {/* Start New Workspace Btn */}
        <Button
          onClick={createNewFile}
          disabled={isCreatingNewFile}
          className="min-w-[200px] h-[40px] shadow-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 font-semibold text-center"
        >
          {isCreatingNewFile ? (
            <LoadingState setWidth="28" />
          ) : (
            <span>Start New Workspace ✨</span>
          )}
        </Button>
      </div>

      {/* WORKSPACES Table */}
      <div className="border-[1px] border-gray-200 rounded-md overflow-hidden p-1 bg-white">

        {loadingFiles ? (
          <div className="flex justify-center items-center w-full h-[270px]">
            <LoadingState setWidth="50" />
            <p className="text-gray-500 font-semibold">Loading files..</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10 uppercase font-semibold">
                <TableRow>
                  <TableHead className="w-[95px]">Screen ID</TableHead>
                  <TableHead className="w-[100px]">Title</TableHead>
                  <TableHead className="w-[100px]">Creator</TableHead>
                  <TableHead className="w-[100px]">Latest Editor</TableHead>
                  <TableHead className="w-[100px]">Last Update</TableHead>
                  <TableHead className="w-[100px] text-right"></TableHead>
                </TableRow>
              </TableHeader>
            </Table>
            <ScrollArea className="h-[250px] bg-white">
              <Table>
                <TableBody>
                  {allFiles?.length > 0 ? allFiles?.map((workspace: fetchedWorkspaces_interface) => (
                    <TableRow key={workspace.id}>
                      <TableCell className="w-[95px] max-w-[95px] font-medium text-ellipsis overflow-hidden whitespace-nowrap">{workspace.fileId}</TableCell>
                      <TableCell className="w-[100px] max-w-[100px]">{workspace.fileName}</TableCell>
                      <TableCell className="w-[100px] max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap">{workspace.fileCreator}</TableCell>
                      <TableCell className="w-[100px] max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap">{workspace.fileLatestEditor === "" ? workspace.fileCreator : workspace.fileLatestEditor}</TableCell>
                      <TableCell className="w-[100px] max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap">
                        {new Date(workspace.$updatedAt).toISOString().split('T')[0]}
                      </TableCell>
                      <TableCell className="w-[100px] max-w-[100px] text-right">
                        <Link to={`/${workspace.fileId}`}>
                          <Button variant="default" size="sm" className="w-full flex justify-between items-center">
                            Open file
                            <FaRegFolderOpen className="!size-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <div className="flex justify-center items-center w-full h-[250px]">
                      <span className="text-center mx-auto text-gray-500 font-semibold">No files found</span>
                    </div>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </>
        )}

      </div>
    </div>
  )
}

