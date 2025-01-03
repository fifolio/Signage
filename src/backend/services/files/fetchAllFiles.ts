import { databases } from "@/backend/configs/configs";
import { searchData_interface } from "@/interfaces";
import { setAllFiles } from "@/stores/backend/useAllFiles";
import { Query } from "appwrite";


export async function fetchAllFiles(searchData: searchData_interface) {

    const queries = [
        Query.orderDesc('$createdAt'),
        ...(searchData.searchBy !== "" && searchData.searchValue !== "" ? [Query.equal(`${searchData.searchBy}`, [`${searchData.searchValue}`])] : [])
      ];

    try {
        const results = await databases.listDocuments(
            `${import.meta.env.VITE_DATABASES_MAIN}`,
            `${import.meta.env.VITE_COLL_DOCS}`,
            queries
        );
        setAllFiles(results.documents);
        return true;
    } catch (err) {
        console.error('Error fetching files:', err);
        return false;
    }
}