import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail, MdContentCopy } from "react-icons/md";
import { BsLightbulb } from "react-icons/bs";
import { IoMdLink } from "react-icons/io";
import { FiDollarSign } from "react-icons/fi";
import { AiOutlineShake } from "react-icons/ai";
import { GiBank } from "react-icons/gi";
import { BiMoney } from "react-icons/bi";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firestore
const db = getFirestore();

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      fetchReferralCode(userEmail);
    } else {
      setError("User email not found. Please log in again.");
      setLoading(false);
    }
  }, []);

  const fetchReferralCode = async (userEmail) => {
    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(userQuery);
      
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.referralCode) {
          const baseUrl = window.location.origin;
          // setReferralLink(`${baseUrl}/refer-friends/${userData.referralCode}`);
          setReferralLink(`Scholar-creator#${userData.referralCode}`);
        } else {
          setError("Referral code not found. Please contact support.");
        }
      } else {
        setError("User data not found. Please contact support.");
      }
    } catch (err) {
      console.error("Error fetching referral code:", err);
      setError("An error occurred while fetching your referral code.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = (platform) => {
    let shareUrl;
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Check%20out%20this%20great%20opportunity!`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this great opportunity! ${referralLink}`)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Great%20Referral%20Opportunity&body=Check%20out%20this%20link:%20${encodeURIComponent(referralLink)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <section className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">
                Refer and{" "}
                <span className="text-purple-600">Earn Unlimited</span>
              </h1>
              <p className="mb-4">
                Earn ₹3,000 per referral, your friend gets ₹1,500.
                <br />
                Bonus ₹10,000 on every 5th referral for you.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Refer Now
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Referral Illustration"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </section>

        <section className="bg-purple-100 rounded-lg p-6 mb-8 flex items-center">
          <BsLightbulb
            className="text-3xl mr-4 text-yellow-500"
            aria-hidden="true"
          />
          <p className="text-lg">
            Maximize your rewards effortlessly! Share your referral link in
            WhatsApp groups, and watch the rewards roll in.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Your Personalised Referral Link
          </h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <Button onClick={() => shareLink('facebook')} variant="outline" className="flex items-center gap-2">
              <FaFacebookF className="text-blue-600" aria-hidden="true" />
              <span>Facebook</span>
            </Button>
            <Button onClick={() => shareLink('twitter')} variant="outline" className="flex items-center gap-2">
              <FaTwitter className="text-blue-400" aria-hidden="true" />
              <span>Twitter</span>
            </Button>
            <Button onClick={() => shareLink('whatsapp')} variant="outline" className="flex items-center gap-2">
              <FaWhatsapp className="text-green-500" aria-hidden="true" />
              <span>WhatsApp</span>
            </Button>
            <Button onClick={() => shareLink('linkedin')} variant="outline" className="flex items-center gap-2">
              <FaLinkedinIn className="text-blue-700" aria-hidden="true" />
              <span>LinkedIn</span>
            </Button>
            <Button onClick={() => shareLink('email')} variant="outline" className="flex items-center gap-2">
              <MdEmail className="text-red-500" aria-hidden="true" />
              <span>Gmail</span>
            </Button>
          </div>
          <div className="flex gap-2">
            {loading ? (
              <p>Loading your referral link...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <Input
                  value={referralLink}
                  readOnly
                  className="flex-grow"
                  aria-label="Your referral link"
                />
                <Button
                  onClick={copyToClipboard}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {copied ? "Copied!" : "Copy"}
                  <MdContentCopy className="ml-2" aria-hidden="true" />
                </Button>
              </>
            )}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Refer & Earn?</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                icon: <IoMdLink />,
                title: "Share your referral link with friends or in groups.",
              },
              {
                icon: <FiDollarSign />,
                title: "Get notified when they apply & secure a loan.",
              },
              {
                icon: <BiMoney />,
                title:
                  "You earn ₹1,500 after their loan sanction and another ₹1,500 after they disburse!",
              },
              {
                icon: <AiOutlineShake />,
                title:
                  "The referred person also gets ₹1,500 after their loan disbursal.",
              },
              {
                icon: <GiBank />,
                title:
                  "Transfer your earnings to your bank account. Keep referring to keep earning!",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2" aria-hidden="true">
                  {step.icon}
                </div>
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                  {index + 1}
                </div>
                <p className="text-sm">{step.title}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

