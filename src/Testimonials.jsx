import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaGoogle, FaLinkedin, FaQuora } from "react-icons/fa";



const testimonials = [
  {
    platform: "quora",
    icon: <FaQuora size={25} color="red" />,
    items: [
      {
        name: "Mylavavapu Phanichandra",
        date: "11 Mar, 2022",
        quote:
          "They completely transformed my loan procurement experience, making it stress-free and straightforward.",
        profilePic: "https://randomuser.me/api/portraits/women/19.jpg",
      },
      {
        name: "Diana Elizabeth Roy",
        date: "05 Jul, 2021",
        quote:
          "This organization made the entire process seamless and it was FREE. Highly recommend!",
        profilePic: "https://randomuser.me/api/portraits/women/85.jpg",
      },
      {
        name: "Mounika Bhargavi",
        date: "05 Jul, 2021",
        quote:
          "Their approach made the loan process smoother than I ever imagined.",
        profilePic: "https://randomuser.me/api/portraits/women/47.jpg",
      },
      {
        name: "Rakesh Sharma",
        date: "22 Aug, 2020",
        quote:
          "Wemakescholars helped me secure my loan quickly, and the team’s support was remarkable.",
        profilePic: "https://randomuser.me/api/portraits/men/87.jpg",
      },
    ],
  },
  {
    platform: "facebook",
    icon: <BiLogoFacebookSquare color="blue" className="size-16"/>,
    items: [
      {
        name: "Vaishali Tiwari",
        date: "09 Nov, 2020",
        quote:
          "After several frustrating visits to the bank, WMS came to the rescue. Such a relief!",
        profilePic: "https://randomuser.me/api/portraits/women/64.jpg",
      },
      {
        name: "Karthik Bhukya",
        date: "28 Aug, 2021",
        quote:
          "They provided me with detailed insights on all available options, making my decision much easier.",
        profilePic: "https://randomuser.me/api/portraits/men/27.jpg",
      },
      {
        name: "Prateek Srivastav",
        date: "20 Dec, 2021",
        quote:
          "I sincerely appreciate Wemakescholars for their hassle-free and quick process.",
        profilePic: "https://randomuser.me/api/portraits/men/76.jpg",
      },
      {
        name: "Pooja Mehra",
        date: "10 Sep, 2020",
        quote:
          "Exceptional service from start to finish. They were always available to assist.",
        profilePic: "https://randomuser.me/api/portraits/women/32.jpg",
      },
    ],
  },
  {
    platform: "linkedin",
    icon: <FaLinkedin  color="blue" className="size-16"/>,
    items: [
      {
        name: "Adithyan Jagannathan Panicker",
        date: "16 Oct, 2024",
        quote:
          "They helped me negotiate the interest rate and processing fees with ease, saving me time and money.",
        profilePic: "https://randomuser.me/api/portraits/men/58.jpg",
      },
      {
        name: "Raval Dhaval Sanjaybhai",
        date: "15 Oct, 2024",
        quote:
          "Their attention to detail and personal guidance ensured a smooth and efficient experience.",
        profilePic: "https://randomuser.me/api/portraits/men/38.jpg",
      },
      {
        name: "Surbhi Jain",
        date: "23 Sep, 2023",
        quote:
          "Professional and knowledgeable team. Their expertise helped me navigate the process effortlessly.",
        profilePic: "https://randomuser.me/api/portraits/women/20.jpg",
      },
      {
        name: "Ashwin Kumar",
        date: "10 May, 2023",
        quote:
          "Wemakescholars made sure I was informed about every step. Highly recommend their services.",
        profilePic: "https://randomuser.me/api/portraits/men/0.jpg",
      },
    ],
  },
  {
    platform: "google",
    icon: <FaGoogle size={25} color="orange"/>,
    items: [
      {
        name: "Kunal Das",
        date: "14 Oct, 2024",
        quote:
          "The team worked diligently and were always just a phone call away. Their support was incredible.",
        profilePic: "https://randomuser.me/api/portraits/men/93.jpg",
      },
      {
        name: "Krishna Mohan",
        date: "14 Oct, 2024",
        quote:
          "Arun Shaji from their team helped me secure a lower interest rate, going above and beyond.",
        profilePic: "https://randomuser.me/api/portraits/men/34.jpg",
      },
      {
        name: "Syed Fasih Ur Rahaman",
        date: "09 Oct, 2024",
        quote:
          "They guided me through their streamlined portal, making the entire process incredibly convenient.",
        profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
      },
      {
        name: "Anusha Bhatia",
        date: "05 Jul, 2022",
        quote:
          "Top-notch service, I was impressed with how smooth everything went. Highly recommended!",
        profilePic: "https://randomuser.me/api/portraits/women/86.jpg",
      },
    ],
  },
];

export default function Component() {
  const handleViewAll = () => {
    window.location.href = "https://www.wemakescholars.com/testimonial";
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-white w-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Why students can't stop talking about us!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((platform) => (
          <div
            key={platform.platform}
            className="bg-gray-200 rounded-lg shadow-md p-10 relative"
          >
            <div
              className={`absolute top-2 right-2 w-8 h-8 ${platform.color} rounded-full flex items-center justify-center font-bold`}
            >
              {platform.icon}
            </div>
            {platform.items.map((item, index) => (
              <div
                key={index}
                className="mb-4 last:mb-0 bg-white p-10 rounded-lg"
              >
                <blockquote className="text-xl">{`❝ ${item.quote} ❞`}</blockquote>
                <div className="flex items-center mb-2 mt-4">
                  <div className="w-10 h-10 rounded-full mr-3">
                    <img
                      src={item.profilePic}
                      alt={`${item.name}'s profile`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className=" mx-80 text-center w-full items-center flex justify-center">
        <button
            onClick={handleViewAll}
            className="px-6 py-2 w-full bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors"
          >
            View all
          </button>
        </div>
      </div>
    </div>
  );
}
