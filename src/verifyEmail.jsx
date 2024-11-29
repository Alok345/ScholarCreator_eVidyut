import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, applyActionCode } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from './lib/firebase';

const db = getFirestore(app);
const auth = getAuth(app);

const VerifyEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const oobCode = queryParams.get('oobCode');

    if (oobCode) {
      // Verify the email using the oobCode
      applyActionCode(auth, oobCode)
        .then(async () => {
          // Now, get the list of users and match with the oobCode
          const user = auth.currentUser;
          if (user) {
            const userEmail = user.email; // Get the currently logged-in user's email

            // Update the user's emailVerified status in Firestore
            const userDocRef = doc(db, 'users', userEmail);
            await updateDoc(userDocRef, { emailVerified: true });

            toast.success("Email verified successfully!");
            navigate('/'); // Redirect to login or another page after verification
          } else {
            toast.error("User not found.");
          }
        })
        .catch((error) => {
          console.error("Error during email verification:", error);
          toast.error("Error verifying email: " + error.message);
        });
    } else {
      toast.error("No verification code provided.");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Verifying your email...</h2>
      {/* You can also add a loading spinner or some UI feedback here */}
    </div>
  );
};

export default VerifyEmail;
