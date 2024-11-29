import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Users, GraduationCap, Building2, FileText, Menu, LogOut } from 'lucide-react';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { app } from "@/lib/firebase";

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [companyScholarshipData, setCompanyScholarshipData] = useState({
    companyName: "",
    scholarshipType: "",
    numberOfScholarships: "",
    eligibleDegrees: "",
    fundingType: "",
    eligibleNationalities: "",
    scholarshipLocation: "",
    deadline: "",
    companyUrl: "", // Added companyUrl field
  });
  const [loanEnquiries, setLoanEnquiries] = useState([]);
  const [scholarshipEnquiries, setScholarshipEnquiries] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("userEmail"));
  const [scholarshipData, setScholarshipData] = useState({
    scholarshipName: "",
    numberOfScholarships: "",
    scholarshipType: "",
    eligibilityCriteria: "",
    fundingType: "",
    eligibleDegrees: "",
    eligibleNationalities: "",
    scholarshipLocation: "",
    deadline: "",
    companyLogo: null,
    companyUrl: "",
  });
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const [overviewCounts, setOverviewCounts] = useState({
    total: 0,
    educationLoanEnquiries: 0,
    scholarshipEnquiries: 0,
    addScholarship: 0,
    companyScholarships: 0,
  });

  const sidebarItems = [
    {
      name: "Overview",
      icon: BarChart,
      tab: "overview",
      color: "text-blue-500",
    },
    {
      name: "Education Loan Enquiries",
      icon: FileText,
      tab: "education-loan",
      color: "text-green-500",
    },
    {
      name: "Scholarship Enquiries",
      icon: GraduationCap,
      tab: "scholarship",
      color: "text-purple-500",
    },
    {
      name: "Add Scholarship",
      icon: Users,
      tab: "add-scholarship",
      color: "text-yellow-500",
    },
    {
      name: "Add Company Scholarship",
      icon: Building2,
      tab: "add-company-scholarship",
      color: "text-red-500",
    },
  ];

  useEffect(() => {
    const fetchLoanEnquiries = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "educationLoanEnquiries")
        );
        const enquiries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoanEnquiries(enquiries);
      } catch (error) {
        console.error("Error fetching loan enquiries: ", error);
      }
    };
    fetchLoanEnquiries();
  }, []);

  useEffect(() => {
    const fetchScholarshipEnquiries = async () => {
      try {
        const scholarshipEnquiriesRef = collection(db, "ScholarshipEnquiries");
        const querySnapshot = await getDocs(scholarshipEnquiriesRef);

        const enquiries = await Promise.all(
          querySnapshot.docs.map(async (document) => {
            const enquiryData = document.data();

            // Fetch user data
            let userData = { fullName: "N/A", phone: "N/A" };
            if (enquiryData.Email) {
              const userDocRef = doc(db, "users", enquiryData.Email);
              const userDocSnap = await getDoc(userDocRef);
              if (userDocSnap.exists()) {
                userData = userDocSnap.data();
              }
            }

            return {
              id: document.id,
              ...enquiryData,
              Name: userData.fullName || "N/A",
              Phone: userData.phone || "N/A",
            };
          })
        );

        setScholarshipEnquiries(enquiries);
      } catch (error) {
        console.error("Error fetching Scholarship enquiries: ", error);
      }
    };

    fetchScholarshipEnquiries();
  }, []);

  useEffect(() => {
    const fetchOverviewCounts = async () => {
      try {
        const collections = [
          "educationLoanEnquiries",
          "ScholarshipEnquiries",
          "addScholarship",
          "companyScholarships",
        ];
        const counts = await Promise.all(
          collections.map(async (collectionName) => {
            const querySnapshot = await getDocs(collection(db, collectionName));
            return querySnapshot.size;
          })
        );

        const [
          educationLoanEnquiries,
          scholarshipEnquiries,
          addScholarship,
          companyScholarships,
        ] = counts;
        const total = counts.reduce((acc, count) => acc + count, 0);

        setOverviewCounts({
          total,
          educationLoanEnquiries,
          scholarshipEnquiries,
          addScholarship,
          companyScholarships,
        });
      } catch (error) {
        console.error("Error fetching overview counts: ", error);
      }
    };

    fetchOverviewCounts();
  }, []);

  const handleAddCompanyScholarship = async () => {
    try {
      const docRef = await addDoc(collection(db, "companyScholarships"), {
        ...companyScholarshipData,
        numberOfScholarships: parseInt(companyScholarshipData.numberOfScholarships, 10),
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setCompanyScholarshipData({
        companyName: "",
        scholarshipType: "",
        numberOfScholarships: "",
        eligibleDegrees: "",
        fundingType: "",
        eligibleNationalities: "",
        scholarshipLocation: "",
        deadline: "",
        companyUrl: "", // Reset companyUrl field
      });
      toast.success("Company Scholarship added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      toast.error(`Error adding company scholarship: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScholarshipData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanyScholarshipInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyScholarshipData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScholarshipData((prevData) => ({
      ...prevData,
      companyLogo: file,
    }));
  };

  const getNextScholarshipId = async () => {
    const counterRef = doc(db, "counters", "scholarshipCounter");
    const counterSnap = await getDoc(counterRef);

    if (counterSnap.exists()) {
      const currentCounter = counterSnap.data().value;
      await updateDoc(counterRef, { value: currentCounter + 1 });
      return currentCounter + 1;
    } else {
      await setDoc(counterRef, { value: 1 });
      return 1;
    }
  };

  const handleAddScholarship = async () => {
    try {
      let logoUrl = "";
      if (scholarshipData.companyLogo) {
        const storageRef = ref(
          storage,
          `company-logos/${scholarshipData.companyLogo.name}`
        );
        await uploadBytes(storageRef, scholarshipData.companyLogo);
        logoUrl = await getDownloadURL(storageRef);
      }

      const scholarshipId = await getNextScholarshipId();

      const scholarshipDataToSave = {
        ...scholarshipData,
        id: scholarshipId,
        companyLogo: logoUrl,
        createdAt: new Date(),
      };

      await setDoc(
        doc(db, "addScholarship", scholarshipId.toString()),
        scholarshipDataToSave
      );

      console.log("Scholarship document written with ID: ", scholarshipId);
      setScholarshipData({
        scholarshipName: "",
        numberOfScholarships: "",
        scholarshipType: "",
        eligibilityCriteria: "",
        fundingType: "",
        eligibleDegrees: "",
        eligibleNationalities: "",
        scholarshipLocation: "",
        deadline: "",
        companyLogo: null,
        companyUrl: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Scholarship added successfully!");
    } catch (error) {
      console.error("Error adding scholarship document: ", error);
      toast.error("Error adding scholarship. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("redirectAfterLogin");
      localStorage.removeItem("lastActiveTime");
      setUser(null);
      toast.success("Admin Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {user ? (
        <div className="flex h-screen bg-gray-100">
          <div
            className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
              sidebarOpen ? "w-64" : "w-20"
            }`}
          >
            <div className="p-4 flex justify-between items-center">
              <h1
                className={`text-2xl font-bold text-gray-800 transition-opacity duration-300 ${
                  sidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                Admin
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <nav className="mt-4">
              {sidebarItems.map((item) => (
                <button
                  key={item.tab}
                  className={`flex items-center w-full px-4 py-3 text-left transition-all duration-200 ${
                    activeTab === item.tab ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(item.tab)}
                >
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <span
                    className={`ml-2 transition-opacity duration-300 ${
                      sidebarOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-1 overflow-auto p-8">
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleLogout}
                className="text-sm text-red-700 font-bold hover:bg-gray-100"
              >
                <LogOut className="inline-block mr-2" size={16} />
                Log Out
              </Button>
            </div>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsContent value="overview" className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-blue-500 bg-opacity-10 p-4">
                      <CardTitle className="text-lg font-semibold">
                        Total
                      </CardTitle>
                      <BarChart className="h-6 w-6 text-blue-500" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold">
                        {overviewCounts.total}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-green-500 bg-opacity-10 p-4">
                      <CardTitle className="text-lg font-semibold">
                        Education Loan Enquiries
                      </CardTitle>
                      <FileText className="h-6 w-6 text-green-500" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold">
                        {overviewCounts.educationLoanEnquiries}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0  bg-purple-500 bg-opacity-10 p-4">
                      <CardTitle className="text-lg font-semibold">
                        Scholarship Enquiries
                      </CardTitle>
                      <GraduationCap className="h-6 w-6 text-purple-500" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold">
                        {overviewCounts.scholarshipEnquiries}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-yellow-500 bg-opacity-10 p-4">
                      <CardTitle className="text-lg font-semibold">
                        Scholarship
                      </CardTitle>
                      <Users className="h-6 w-6 text-yellow-500" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold">
                        {overviewCounts.addScholarship}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-red-500 bg-opacity-10 p-4">
                      <CardTitle className="text-lg font-semibold">
                        Company Scholarship
                      </CardTitle>
                      <Building2 className="h-6 w-6 text-red-500" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold">
                        {overviewCounts.companyScholarships}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="education-loan" className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  Education Loan Enquiries
                </h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Loan Amount</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanEnquiries.map((enquiry, index) => (
                        <TableRow key={enquiry.id}>
                          <TableCell>{enquiry.fullName}</TableCell>
                          <TableCell>{enquiry.email}</TableCell>
                          <TableCell>${enquiry.loanAmount}</TableCell>
                          <TableCell>{enquiry.purpose}</TableCell>
                          <TableCell>
                            <Button className="bg-green-500 hover:bg-green-600">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="scholarship" className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  Scholarship Enquiries
                </h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Scholarship</TableHead>
                        <TableHead>Applied At</TableHead>
                        {/* <TableHead>Status</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scholarshipEnquiries.map((enquiry, i) => (
                        <TableRow key={enquiry.id}>
                          <TableCell>{enquiry.Name}</TableCell>
                          <TableCell>{enquiry.Email}</TableCell>
                          <TableCell>{enquiry.Phone}</TableCell>
                          <TableCell>{enquiry.scholarshipTitle}</TableCell>
                          <TableCell>
                            {enquiry.appliedAt ? new Date(enquiry.appliedAt.seconds * 1000).toLocaleString() : 'N/A'}
                          </TableCell>
                          {/* <TableCell>{enquiry.status || 'N/A'}</TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="add-scholarship" className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  Scholarship
                </h2>
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="scholarship-name"
                        className="text-lg font-semibold"
                      >
                        Scholarship Name
                      </Label>
                      <Input
                        id="scholarship-name"
                        name="scholarshipName"
                        placeholder="Enter scholarship name"
                        className="w-full p-2 border rounded"
                        value={scholarshipData.scholarshipName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="scholarship-number"
                        className="text-lg font-semibold"
                      >
                        Scholarship Amount
                      </Label>
                      <Input
                        id="scholarship-number"
                        name="numberOfScholarships"
                        type="number"
                        placeholder="Enter Scholarship Amount"
                        className="w-full p-2 border rounded"
                        value={scholarshipData.numberOfScholarships}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="scholarship-type"
                        className="text-lg font-semibold"
                      >
                        Scholarship Type
                      </Label>
                      <Select
                        name="scholarshipType"
                        value={scholarshipData.scholarshipType}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: { name: "scholarshipType", value },
                          })
                        }
                      >
                        <SelectTrigger
                          id="scholarship-type"
                          className="w-full p-2 border rounded"
                        >
                          <SelectValue placeholder="Select scholarship type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="merit">Merit-based</SelectItem>
                          <SelectItem value="need">Need-based</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="eligibility-criteria"
                        className="text-lg font-semibold"
                      >
                        Eligibility Criteria
                      </Label>
                      <Input
                        id="eligibility-criteria"
                        name="eligibilityCriteria"
                        placeholder="Enter eligibility criteria"
                        className="w-full p-2 border rounded"
                        value={scholarshipData.eligibilityCriteria}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="funding-type"
                        className="text-lg font-semibold"
                      >
                        Funding Type
                      </Label>
                      <Input
                        id="funding-type"
                        name="fundingType"
                        placeholder="Enter funding type"
                        className="w-full p-2 border rounded"
                        value={scholarshipData.fundingType}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="eligible-degrees"
                        className="text-lg font-semibold"
                      >
                        Eligible Degrees
                      </Label>
                      <Input
                        id="eligible-degrees"
                        name="eligibleDegrees"
                        placeholder="Enter eligible degrees"
                        className="w-full p-2 border rounded"
                        value={scholarshipData.eligibleDegrees}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="eligible-nationalities"
                        className="text-lg font-semibold"
                      >
                        Eligible Nationalities
                      </Label>
                      <Input
                        id="eligible-nationalities"
                        name="eligibleNationalities"
                        placeholder="Enter eligible nationalities"
                        className="w-full p-2 border rounded"
                        value={scholarshipData.eligibleNationalities}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="scholarship-location"
                        className="text-lg font-semibold"
                      >
                        Scholarship can be taken at
                      </Label>
                      <Input
                        id="scholarship-location"
                        name="scholarshipLocation"
                        placeholder="Enter where scholarship can be taken"
                        className="w-full p-2 border rounded"
                        value={scholarshipData.scholarshipLocation}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="deadline"
                        className="text-lg font-semibold"
                      >
                        Deadline
                      </Label>
                      <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        className="w-full p-2 border rounded"
                        value={scholarshipData.deadline}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-logo"
                        className="text-lg font-semibold"
                      >
                        Company Logo
                      </Label>
                      <Input
                        id="company-logo"
                        name="companyLogo"
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border rounded"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-url"
                        className="text-lg font-semibold"
                      >
                        Company URL
                      </Label>
                      <Input
                        id="company-url"
                        name="companyUrl"
                        type="url"
                        placeholder="Enter company website URL"
                        className="w-full p-2 border rounded"
                        value={scholarshipData.companyUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={handleAddScholarship}
                    >
                      Add Scholarship
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                value="add-company-scholarship"
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold text-gray-800">
                  Company Scholarship
                </h2>
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-name"
                        className="text-lg font-semibold"
                      >
                        Company Name
                      </Label>
                      <Input
                        id="company-name"
                        name="companyName"
                        placeholder="Enter company name"
                        className="w-full p-2 border rounded"
                        value={companyScholarshipData.companyName}
                        onChange={handleCompanyScholarshipInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-scholarship-type"
                        className="text-lg font-semibold"
                      >
                        Scholarship Type
                      </Label>
                      <Select
                        name="scholarshipType"
                        value={companyScholarshipData.scholarshipType}
                        onValueChange={(value) =>
                          handleCompanyScholarshipInputChange({
                            target: { name: "scholarshipType", value },
                          })
                        }
                      >
                        <SelectTrigger
                          id="company-scholarship-type"
                          className="w-full p-2 border rounded"
                        >
                          <SelectValue placeholder="Select scholarship type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="full-time">
                            Full-time employment
                          </SelectItem>
                          <SelectItem value="research">
                            Research grant
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-scholarship-number"
                        className="text-lg font-semibold"
                      >
                        Number of Scholarships
                      </Label>
                      <Input
                        id="company-scholarship-number"
                        name="numberOfScholarships"
                        type="number"
                        placeholder="Enter number of scholarships"
                        className="w-full p-2 border rounded"
                        value={companyScholarshipData.numberOfScholarships}
                        onChange={handleCompanyScholarshipInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-eligible-degrees"
                        className="text-lg font-semibold"
                      >
                        Eligible Degrees
                      </Label>
                      <Input
                        id="company-eligible-degrees"
                        name="eligibleDegrees"
                        placeholder="Enter eligible degrees"
                        className="w-full p-2 border rounded"
                        value={companyScholarshipData.eligibleDegrees}
                        onChange={handleCompanyScholarshipInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-funding-type"
                        className="text-lg font-semibold"
                      >
                        Funding Type
                      </Label>
                      <Input
                        id="company-funding-type"
                        name="fundingType"
                        placeholder="Enter funding type"
                        className="w-full p-2 border rounded"
                        value={companyScholarshipData.fundingType}
                        onChange={handleCompanyScholarshipInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-eligible-nationalities"
                        className="text-lg font-semibold"
                      >
                        Eligible Nationalities
                      </Label>
                      <Input
                        id="company-eligible-nationalities"
                        name="eligibleNationalities"
                        placeholder="Enter eligible nationalities"
                        className="w-full p-2 border rounded"
                        value={companyScholarshipData.eligibleNationalities}
                        onChange={handleCompanyScholarshipInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-scholarship-location"
                        className="text-lg font-semibold"
                      >
                        Scholarship can be taken at
                      </Label>
                      <Input
                        id="company-scholarship-location"
                        name="scholarshipLocation"
                        placeholder="Enter where scholarship can be taken"
                        className="w-full p-2 border rounded"
                        value={companyScholarshipData.scholarshipLocation}
                        onChange={handleCompanyScholarshipInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-deadline"
                        className="text-lg font-semibold"
                      >
                        Deadline
                      </Label>
                      <Input
                        id="company-deadline"
                        name="deadline"
                        type="date"
                        className="w-full p-2 border rounded"
                        value={companyScholarshipData.deadline}
                        onChange={handleCompanyScholarshipInputChange}
                      />
                    </div>
                    {/* New Company URL field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-url"
                        className="text-lg font-semibold"
                      >
                        Company URL
                      </Label>
                      <Input
                        id="company-url"
                        name="companyUrl"
                        type="url"
                        placeholder="Enter company website URL"
                        className="w-full p-2 border rounded"
                        value={companyScholarshipData.companyUrl}
                        onChange={handleCompanyScholarshipInputChange}
                      />
                    </div>
                    <Button
                      className="w-full bg-red-500 hover:bg-red-600 text-white"
                      onClick={handleAddCompanyScholarship}
                    >
                      Add Company Scholarship
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Admin Login Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please log in to access the admin dashboard.</p>
              <Button
                className="w-full mt-4"
                onClick={() => navigate("/admin-login")}
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}