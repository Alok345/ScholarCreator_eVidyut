import { DollarSign, Star, Settings, LogOut } from "lucide-react";
import medium from "./assets/medium.png";
import { FaMedal } from "react-icons/fa";
import { GiCreditsCurrency } from "react-icons/gi";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          toast.error("User email not found in localStorage!");
          return;
        }

        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", userEmail);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser(userDoc.data());
          console.log(userDoc.data()); // Logging fetched data
        } else {
          toast.error("User does not exist. Please signup first!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        toast.error("Error fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleInvite = () => {
    navigate("/referral");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex space-x-8">
          {/* Left Sidebar */}
          <div className="w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <img src={medium} alt="Profile" className="h-44 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-center mb-4">
                {user.fullName || "Full Name Not Available"}
              </h2>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                onClick={handleInvite}
              >
                Invite friends
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md">
              <ul>
                <li className="border-b">
                  <a
                    href="#"
                    className="block px-4 py-2 text-orange-500 font-medium"
                  >
                    Profile
                  </a>
                </li>
                <li className="border-b">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <DollarSign className="inline-block mr-2 h-4 w-4" />
                    Loan
                  </a>
                </li>
                <li className="border-b">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <Star className="inline-block mr-2 h-4 w-4" />
                    Shortlisted & Applied
                  </a>
                </li>
                <li className="border-b">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="inline-block mr-2 h-4 w-4" />
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Middle Section */}
          <div className="w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-600">
                  Basic Information
                </h3>
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-1 px-3 rounded text-sm">
                  Edit Profile
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium">{user.gender || "Not-Set"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">DOB</p>
                  <p className="font-medium">{user.dob || "Not-Set"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nationality</p>
                  <p className="font-medium">{user.nationality || "Not-Set"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current location</p>
                  <p className="font-medium">{user.location || "Not-Set"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact number</p>
                  <p className="font-medium">{user.contact || "Not-Set"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user.email || "Not-Set"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <FaMedal color="orange" size={30} />
                <span className="text-4xl font-bold">0</span>
              </div>
              <p className="text-center text-gray-600 mb-2">Novice</p>
              <p className="text-center text-sm text-blue-600">
                150 points to level up & become knowledgeable
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <GiCreditsCurrency color="green" size={30} />
              <p className="text-sm text-gray-600 mb-2">Credits earned</p>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded text-sm">
                Earn more credits
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
