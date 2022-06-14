import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../fireabse/config";

const useFireStore = (collect, uid) => {
    const [documents, setDocuments] = useState({
        userName: "",
        photoURL: "",
    });
    useEffect(() => {
        console.log("listening..");
        if (uid) {
            const unsub = onSnapshot(doc(db, collect, uid), (doc) => {
                setDocuments(doc.data());
            });
            return unsub;
        } else {
            setDocuments({});
        }
    }, [collect, uid]);
    return documents;
};

export default useFireStore;
