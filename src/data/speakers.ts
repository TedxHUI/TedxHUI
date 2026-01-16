// src/data/speakers.ts

export interface Speaker {
  id: string;
  name: string;
  role: string;
  img: string;
  fullBio: string;
  instagram: string;
  linkedin: string;
}

export const SPEAKERS_DATA: Speaker[] = [
    { 
        id: "alhaji-ali", 
        name: "Alhaji Ali Sarkin Mota", 
        role: "Director General, Security and Exchange Commission, Nigeria", 
        img: "/images/Speakers/Ali.jpg",
        fullBio: `He was born during the reign of Sarkin Zazzau Ibrahim and learned car repair from the late chief mechanic Malam Iyal. He served as the driver for Turaki Aliyu and later became the chief driver for the late Premier, Sir Ahmadu Bello.

        Notable Achievements:
        He had the experience of driving Queen Elizabeth during her visit to Nigeria. Aliyu Mohammad (Sarkinmota Autos)

        Profession: He is a car dealer.
        Business: He runs a successful car dealership called Sarkinmota Autos.
        Philosophy: He is motivated by passion and self-belief, inspiring others to dream bigger, and proving that commitment can overcome doubt.`,
        instagram: "#",
        linkedin: "#"
    },
    { 
        id: "alhan-islam", 
        name: "Alhan Islam", 
        role: "UN Global Advocate For Peace", 
        img: "/images/Speakers/Alhan.jpg",
        fullBio: `Known professionally as Alhanislam, Maryam is a renowned Nigerian poet, human rights activist, and Pan-Africanist. In 2025, she was designated as the UN's first Global Advocate for Peace for the Peace and Security Pillar.

        Hailing from Biu, Borno State, her advocacy was shaped by the Boko Haram insurgency. She uses spoken word poetry to bridge art and activism, championing the leadership of women and youth in sustainable peacebuilding. Her poem "Peace is a Verb" has become a global anthem for resilience and human spirit.`,
        instagram: "https://instagram.com/alhanislam",
        linkedin: "#"
    },
    { 
        id: "maryam", 
        name: "Maryam Apaokagi", 
        role: "Content Creator & CEO, Chop Tao", 
        img: "/images/Speakers/Taoma.jpg",
        fullBio: `Popularly known as Taaooma, Maryam is a premier Nigerian comedian, cinematographer, and social media influencer. A graduate of Tourism and Hospitality from Kwara State University, she rose to stardom in 2019 through her unique multi-character skits.

        With over 15 million followers, she represents the typical African home through comedy while managing her food company, Chop Tao. She has been recognized as one of the 100 Most Inspiring Women in Nigeria and won the AMVCA for Best Online Social Content Creator.`,
        instagram: "https://instagram.com/taaooma",
        linkedin: "#"
    },
    { 
        id: "khalil", 
        name: "Khalil Suleiman Halilu", 
        role: "Executive Vice Chairman, NASENI", 
        img: "/images/Speakers/Khalil.jpg",
        fullBio: `Khalil is a serial entrepreneur and the current Executive Vice Chairman of the National Agency for Science and Engineering Infrastructure (NASENI). Appointed by President Bola Tinubu in 2023, he is a leader in Nigeria's industrial renaissance.

        He founded West Africa’s first eco-friendly tech hub, The CANs, and the on-demand delivery app ShapShap. Holding an M.Sc in International Business from the University of Hertfordshire, Khalil is dedicated to closing the technology gap in Africa through localized innovation and reverse engineering.`,
        instagram: "https://instagram.com/kshhalilu",
        linkedin: "#"
    },
    { 
        id: "odunayo", 
        name: "Odunayo Eweniyi", 
        role: "Co-founder & COO, PiggyVest", 
        img: "/images/Speakers/odunayo.jpeg",
        fullBio: `Odunayo is a leading fintech entrepreneur and social activist. As the COO of PiggyVest, Nigeria's largest digital savings platform, she has helped over 5 million users achieve financial discipline.

        A first-class Computer Engineering graduate from Covenant University, she also co-founded FirstCheck Africa, a fund that invests specifically in female-led startups. She was named to the Forbes Africa 30 Under 30 list and is a powerful voice for gender equity and social justice in the African tech ecosystem.`,
        instagram: "https://instagram.com/odun_eweniyi",
        linkedin: "https://linkedin.com/in/odunayoeweniyi"
    },
    { 
        id: "hamzat", 
        name: "Hamzat Lawal", 
        role: "Founder, Connected Development (CODE)", 
        img: "/images/Speakers/hamzat.jpeg",
        fullBio: `Hamzat is a world-renowned anti-corruption activist and the founder of Connected Development (CODE). He leads the "Follow The Money" movement, which uses data to track government spending and international aid in grassroots communities.

        Named one of the world's 100 most influential people in digital government, Hamzat was a key convener of the "Not Too Young To Run" movement. His work empowers marginalized communities across Africa to hold their leaders accountable and demand better public services.`,
        instagram: "https://instagram.com/hamzy_lawal",
        linkedin: "#"
    },
    { 
        id: "Ahmad-XM", 
        name: "Ahmad XM", 
        role: "CEO, XM Trading", 
        img: "/images/Speakers/xm.jpg",
        fullBio: `Ahmad XM is a prominent digital creator and the CEO of XM Trading. Known for his expertise in digital assets and market trends, he has built a significant reputation as a voice for the new generation of Nigerian traders.

        Through XM Trading, he focuses on financial literacy and empowering young Nigerians to navigate the complexities of global markets, combining entrepreneurial grit with a passion for technological advancement in finance.`,
        instagram: "#",
        linkedin: "#"
    }
];