import { useEffect } from "react";

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - AutoShift`
    })
}

export default useDocumentTitle;