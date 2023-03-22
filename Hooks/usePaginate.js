import { useState } from "react";

function usePaginate(pages, data) {

    const [currentPage, setCurrentPage] = useState(1)

    const [postPerPage] = useState(pages)

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    return { currentPosts, currentPage, setCurrentPage, pages }

}

export default usePaginate;
