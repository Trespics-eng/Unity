export interface Comment {
    id: string;
    user: string;
    avatar: string;
    text: string;
    date: string;
    replies?: Comment[];
}

export interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorRole: string;
    authorAvatar: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    likes: number;
    shares: number;
    comments: Comment[];
}

export const mockBlogs: Blog[] = [
    {
        id: "1",
        title: "The Power of Community Organizing",
        excerpt: "When people come together for a common cause, the impossible becomes achievable. Discover the key steps to effectively mobilize your local community.",
        content: `
Community organizing is the process of bringing people together to solve problems that affect them directly. It’s an empowering, democratic, and deeply human way to create tangible change. Whether you want to improve a local park, demand safer streets, or advocate for policy shifts, community organizing gives everyday people a voice.

### Why It Matters

Historically, social movements have almost always started with small groups of dedicated individuals. Civil rights, environmental protections, and workers' rights were all born from the grassroots. The beauty of organizing is that it amplifies individual voices into a powerful collective roar.

### The First Steps

1. **Listen:** Start by having conversations. Understand what your neighbors care about. You cannot build a movement on assumptions.
2. **Educate:** Share what you learn. Empower others with knowledge about the systems and structures affecting their lives.
3. **Build Relationships:** Trust is the currency of any community effort. Cultivate genuine relationships that go beyond the issue at hand.
4. **Action:** Plan small, achievable actions to build momentum and demonstrate that change is possible.

Together, we can reshape the environments we live in. We just have to start.
        `,
        author: "Sarah Jenks",
        authorRole: "Community Advocate",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        date: "October 12, 2023",
        readTime: "4 min read",
        category: "Activism",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop",
        likes: 124,
        shares: 34,
        comments: [
            {
                id: "c1",
                user: "Mark Thompson",
                avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
                text: "This is a great reminder that small actions do matter. Thanks for breaking down the initial steps so clearly!",
                date: "Oct 12, 2023",
                replies: [
                    {
                        id: "r1",
                        user: "Sarah Jenks",
                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
                        text: "You're welcome, Mark! Glad you found it helpful.",
                        date: "Oct 13, 2023"
                    }
                ]
            }
        ]
    },
    {
        id: "2",
        title: "Sustainable Living on a Budget",
        excerpt: "Eco-friendly choices don't have to break the bank. Here's a practical guide to reducing your carbon footprint while saving money.",
        content: `
Many people believe that living sustainably is a luxury. While some eco-friendly products carry a premium price tag, the core philosophy of sustainability—reduce, reuse, recycle—is inherently economical.

### Embrace Minimalism

The first step to sustainability is simply buying less. Before making a purchase, ask yourself if you truly need it. Fast fashion and impulsive buys not only drain your wallet but also contribute heavily to landfill waste. Focus on quality over quantity.

### Rethink Food Consumption

Diet plays a massive role in our carbon footprint. 
- **Eat Local:** Buying produce from local farmers markets reduces the energy used in transportation.
- **Plant-Based Meals:** Incorporating more plant-based meals into your week drastically reduces your environmental impact. Beans, lentils, and seasonal vegetables are often cheaper than meat.
- **Reduce Food Waste:** Plan your meals, and freeze leftovers. Food waste in landfills produces methane, a potent greenhouse gas.

### Energy Efficiency at Home

Small changes at home can lead to big savings on utility bills. 
- Switch to LED bulbs.
- Unplug electronics when not in use (phantom energy can account for up to 10% of your bill).
- Wash clothes in cold water.

Sustainability is a journey. Start with one small change, master it, and move on to the next.
        `,
        author: "David Chen",
        authorRole: "Environmentalist",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        date: "September 28, 2023",
        readTime: "5 min read",
        category: "Sustainability",
        image: "https://images.unsplash.com/photo-1440407876336-6184ebf3d325?q=80&w=1200&auto=format&fit=crop",
        likes: 89,
        shares: 12,
        comments: []
    },
    {
        id: "3",
        title: "Youth Voices in Climate Action",
        excerpt: "How young activists are driving the narrative and forcing policy changes on a global scale.",
        content: `
The climate crisis is undoubtedly the defining challenge of our era. And leading the charge to confront it are not entirely seasoned politicians or veteran scientists, but young people. 

### The Generational Divide

Youth activists understand that they are the ones who will inherit the planet. This urgency translates directly into their activism. Their approach is marked by a refusal to accept the status quo, a demand for immediate action, and a deep understanding of intersectional justice. They recognize that climate change disproportionately affects marginalized communities.

### Methods of Protest

From school strikes spanning continents to eloquent speeches at the United Nations, younger generations are utilizing every tool at their disposal. They leverage social media to organize rapidly, spread awareness, and hold leaders accountable in ways past generations couldn't.

### The Impact

Their voices are impossible to ignore. They have successfully pushed climate change to the forefront of political agendas worldwide. However, the fight is far from over. It is crucial that we all—regardless of age—amplify their voices and support their demands for a livable future.
        `,
        author: "Elena Rodriguez",
        authorRole: "Youth Organizer",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        date: "August 15, 2023",
        readTime: "6 min read",
        category: "Environment",
        image: "https://images.unsplash.com/photo-1618477461853-cf6ed80fbbc4?q=80&w=1200&auto=format&fit=crop",
        likes: 310,
        shares: 145,
        comments: [
            {
                id: "c2",
                user: "Johnathan Lee",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
                text: "Incredibly inspiring. The youth are our future and our present leaders.",
                date: "Aug 16, 2023"
            }
        ]
    }
];
