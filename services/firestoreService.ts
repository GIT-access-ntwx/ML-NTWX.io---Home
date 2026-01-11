import { db } from "../config/firebase";
import { doc, setDoc, collection, addDoc, Timestamp } from "firebase/firestore";

export const saveUser = async (uid: string, email: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      email,
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

export const saveAudit = async (userId: string, url: string) => {
  try {
    await addDoc(collection(db, "audits"), {
      user_id: userId,
      url: url,
      timestamp: Timestamp.now(),
      status: 'pending'
    });
  } catch (error) {
    console.error("Error saving audit:", error);
  }
};

export const saveReport = async (reportId: string, email: string) => {
    try {
        await addDoc(collection(db, "reports"), {
            report_id: reportId,
            emailed_to: email,
            sent_at: Timestamp.now()
        });
    } catch (error) {
        console.error("Error saving report log:", error);
    }
}