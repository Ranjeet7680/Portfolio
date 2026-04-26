// @ts-nocheck
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata = {
    title: "Members | Ranjeet Kumar",
};

const memberNames = [
    "Raj Mangesh Deo", "Laxmi Yadav", "Ananya Singh Sisodia", "Abhay Pandey", "Ruchi",
    "Hardik Raghunath Thakur", "Shreyasee Maity", "Kumawat Rohit Sharvanlal", "Manesh Umesh Sarode",
    "Buthkureshivaprasad", "Medavarapu Suvyaktha", "Aman Sharma", "Mahima", "Saloni Singh",
    "Swarali Kamble", "Anannya", "Ranjeet Kumar", "Palak Saluja", "Piyush Chavan", "Subhrodeep Mitra",
    "Ananya maji", "Khushi Chaudhary", "Aman Trivedi", "Tanya Mittal", "Pratik Giya",
    "LOYA YAGNA VENKATA PRAKASH NAIDU", "Naveen Bhatt", "Tavleen kaur", "Shreya Dwivedi",
    "Nishant Sharma", "Gunjan Mansute", "Divyanshu Sahu", "Devi Priya Gude", "Aditi Tayal",
    "R Raj Kumar", "Bandari Shikhara", "Purujeet Samantaray", "Gursimran Singh", "Mohammad Ateek",
    "Yash Surve", "Sirigiri Naga Jyothi", "KANCHI GOWTHAMI", "SNEHA YADAV", "Pisati Aashritha",
    "Nikita.S.Mishra", "Vishu Singla", "Akshita Oberoi", "Maneti Sriram Reddy", "Jyotsana Rai",
    "Ayush Kunar", "Vineet", "Sandeep Kumar Sharma", "Manish Kumar", "Sairam", "Gayathri sruthi sri",
    "Srushti Ukirde", "Anant Singh Shishodia"
];

const members = memberNames.map((name, i) => ({
    id: i,
    name,
    dp: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=c0aede,d1d4f9,ffdfbf,ffd5dc`,
    online: Math.random() > 0.3 // Simulating 70% online
}));

export default function MembersPage() {
    return (
        <main className="container mx-auto px-4 py-24 min-h-screen">
            <h1 className="text-4xl font-bold font-heading mb-8 text-center mt-12 text-gray-900 dark:text-white">Active Members</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {members.map((member) => (
                    <GlassCard key={member.id} className="flex flex-col items-center text-center p-6 relative group hover:-translate-y-1 transition-transform">
                        {member.online && (
                            <span className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse" title="Online now" />
                        )}

                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-start to-accent mb-4 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black/50 overflow-hidden relative shadow-inner">
                                <img src={member.dp} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 w-full" title={member.name}>{member.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Developer</p>
                    </GlassCard>
                ))}
            </div>
        </main>
    );
}
