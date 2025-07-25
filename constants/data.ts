export const profiles = [
  {
    id: 1,
    name: "Shafa Asadel",
    age: 20,
    distance: "2 km away",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop&crop=face",
    liked: false,
  },
  {
    id: 2,
    name: "Aura Alexandra",
    age: 20,
    distance: "2 km away",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face",
    liked: false,
  },
  {
    id: 3,
    name: "Maya Chen",
    age: 22,
    distance: "3 km away",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face",
    liked: true,
  },
  {
    id: 4,
    name: "Anggita Sekar",
    age: 23,
    distance: "4 km away",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
    liked: false,
  },
  {
    id: 5,
    name: "Lisa Park",
    age: 21,
    distance: "1 km away",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face",
    liked: false,
  },
  {
    id: 6,
    name: "Emma Wilson",
    age: 24,
    distance: "5 km away",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face",
    liked: false,
  },
];

export const tabs = [
  { title: "Hot Users", label: "All Users" },
  { title: "Hot Match Requests", label: "Match requests" },
  { title: "Hot Matched Users", label: "Matched Users" },
];

export const navigationItems = [
  { icon: "home", label: "Home", active: false, badge: null },
  { icon: "compass", label: "For You", active: false, badge: null },
  { icon: "heart", label: "Like You", active: true, badge: 99 },
  { icon: "chatbubble", label: "Chat", active: false, badge: 69 },
  { icon: "person", label: "Account", active: false, badge: null },
];

export const onboardingPreferences = [
  {
    name: "Preference & expectation",
    subheading: "What kind of connection?",
    select_count: 1,
    options: ["One-night stand", "Weekend meeting", "Weekday meeting"],
  },
  {
    name: "How soon to meet",
    subheading: "",
    select_count: 1,
    options: ["Today", "Weekend", "Nextweek", "Tomorrow"],
  },
  {
    name: "Body type and Preference",
    subheading: "",
    select_count: 1,
    options: ["Slim", "Athletic", "Curvy", "Any"],
  },
  {
    name: "Hair color preference",
    subheading: "",
    select_count: 1,
    options: ["Blonde", "Brunette", "Redhead", "Any"],
  },
  {
    name: "Sexual preferences",
    subheading: "What are you into?",
    select_count: 1,
    options: ["Vanila", "Roleplay", "BDSM", "Tantra", "Group", "Voyeur"],
  },
  {
    name: "Sexual preferences",
    subheading: "",
    select_count: 1,
    options: ["Feet","Lingerie","Spanking","Toys","Restraints","Cosplay"],
  },
  {
    name: "Your role preferences",
    subheading: "",
    select_count: 1,
    options: ["Dom","Sub","Switch"],
  },
];


export const pricingData = {
  pricingDetails: {
    id: "basic",
    name: "Hot Adventure Premium",
    price: 39,
    duration: "per month",
    features: [
      "Unlimited matches per day",
      "See who liked your profile",
      "Special discount at partner restaurants"
    ],
  },
  subscriptionDetails: [
    "Billed monthly at $39 USD",
    "Cancel anytime",
  ]
}