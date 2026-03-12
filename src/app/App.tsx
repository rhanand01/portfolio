import { useState, useEffect, useRef } from 'react';
import {
  Mail, Linkedin, Github, Phone, MapPin, ExternalLink, Calendar,
  Briefcase, GraduationCap, Code2, Database, BarChart3, TrendingUp,
  Users, Brain, Menu, X, ChevronDown, Award, Layers,
  Terminal, Cpu, Star, ArrowUpRight, Sparkles
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import profilePhoto from 'figma:asset/935508db6244888c0d17e317aac4bb6797184390.png';

const PROFILE_IMG = profilePhoto;

/* ─────────────────────────── DATA ─────────────────────────── */
const projects = [
  {
    id: 1,
    title: "Loyalty Analytics Dashboard",
    period: "February 2025",
    tech: ["Python", "Streamlit", "Pandas", "Matplotlib", "Seaborn", "Plotly"],
    accent: "from-violet-500 to-indigo-500",
    accentBg: "bg-violet-500/10 border-violet-500/25 text-violet-300",
    description:
      "Designed and built an interactive multi-page Streamlit dashboard to visualise loyalty programme KPIs – redemption rate, customer retention, and revenue per user — across 30,000+ transaction records.",
    highlights: [
      "Created customer behaviour trend charts using Plotly and Seaborn, enabling stakeholders to identify drop-off patterns and seasonal engagement shifts at a glance.",
      "Built sales and revenue visualisations (bar charts, line trends) using Matplotlib and Plotly, replacing static Excel reports and cutting reporting turnaround from 2 days to real-time.",
      "Processed and transformed raw loyalty data using pandas, applying data cleaning and aggregation to ensure dashboard accuracy across multiple business teams.",
    ],
  },
  {
    id: 2,
    title: "Sales & Financial Analytics Reports",
    period: "March 2026",
    tech: ["Advanced Excel", "Power Query", "Power Pivot", "DAX", "ETL", "Data Modeling"],
    accent: "from-cyan-500 to-blue-500",
    accentBg: "bg-cyan-500/10 border-cyan-500/25 text-cyan-300",
    description:
      "Automated sales analytics reports using Power Query and Power Pivot, cutting manual report generation time by ~60% and enabling monthly performance tracking across 24 regional markets.",
    highlights: [
      "Analyzed sales performance across 24 global markets (598.9M INR), identified 54.9M revenue gap with 5 underperforming regions exceeding -12% variance, delivering actionable insights that informed executive resource reallocation.",
      "Modelled a star-schema in Power Pivot with DAX-calculated KPIs (revenue growth %, margin, target attainment) and engineered ETL pipelines in Power Query, reducing data preparation time from hours to minutes.",
    ],
  },
  {
    id: 3,
    title: "Retail Sales Analysis Using SQL",
    period: "February 2026",
    tech: ["SQL", "PostgreSQL", "Data Querying", "Sales Analytics", "Customer Segmentation"],
    accent: "from-emerald-500 to-teal-500",
    accentBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-300",
    description:
      "Analyzed 2,000+ retail transactions using SQL to uncover sales trends and customer behavior patterns, identifying peak sales periods, top 5 high-value customers, and shift-based ordering patterns.",
    highlights: [
      "Performed end-to-end SQL data analysis on 2,000+ retail transactions including data cleaning (null value removal), exploratory analysis, and complex query aggregations to derive actionable business insights across multiple product categories.",
      "Analyzed retail sales transactions using SQL (PostgreSQL), performing data cleaning, trend analysis, and customer segmentation to identify top-performing categories, peak sales periods, and delivering insights that informed inventory and marketing strategies.",
    ],
  },
];

const skills = [
  {
    category: "Data Analysis & EDA",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    items: ["EDA", "Statistical Analysis", "Trend Identification", "KPI Tracking"],
  },
  {
    category: "Programming & Querying",
    icon: <Terminal className="w-5 h-5" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    items: ["SQL", "Python", "MySQL", "Query Optimization", "Data Wrangling", "ETL Basics", "Problem Solving"],
  },
  {
    category: "Visualisation & BI",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    items: ["Power BI", "Tableau", "Excel Dashboards", "Pivot Tables", "KPI Tracking", "Automation"],
  },
  {
    category: "Analytics & Statistics",
    icon: <Brain className="w-5 h-5" />,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    items: ["Data Cleaning", "EDA", "Descriptive Statistics", "Forecasting Basics", "Insight Generation", "Performance Analysis", "Trend Analysis"],
  },
  {
    category: "Tools & Workflow",
    icon: <Cpu className="w-5 h-5" />,
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
    items: ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
  },
];

const certifications = [
  { name: "Data Analytics Job Simulation (2026)", org: "Deloitte", color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
  { name: "Excel: Mother of Business Intelligence (2026)", org: "Codebasics", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  { name: "Python Programming (2025)", org: "IIT Madras", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
];

const education = [
  {
    degree: "MCA – Master of Computer Applications",
    institution: "CMR University, Bengaluru",
    period: "October 2025",
    cgpa: "8.49 / 10",
  },
  {
    degree: "BCA – Bachelor of Computer Applications",
    institution: "BVVS Science College, Bagalkote",
    period: "November 2023",
    cgpa: "8.37 / 10",
  },
];

const stats = [
  { value: "30K+", label: "Records Processed" },
  { value: "3", label: "Projects Delivered" },
  { value: "3+", label: "Certifications" },
  { value: "5+", label: "Tools Mastered" },
];

/* ─────────────────────────── COMPONENT ─────────────────────── */
export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = ["hero", "about", "experience", "projects", "skills", "education", "contact"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 120 && bottom >= 120) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#080b14] text-slate-100 overflow-x-hidden font-sans">

      {/* ╔══════════════ NAV ══════════════╗ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#080b14]/90 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl shadow-black/50" : ""
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => goto("hero")}
            className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/60 transition-shadow">
              AH
            </span>
            <span className="font-semibold text-slate-200 group-hover:text-white transition-colors hidden sm:block">
              Anand Hadapad
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => goto(l.id)}
                className={`px-3.5 py-2 rounded-lg text-sm transition-all ${
                  activeSection === l.id
                    ? "text-violet-400 bg-violet-500/10"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                }`}>
                {l.label}
              </button>
            ))}
            <a href="mailto:rhanand2001@gmail.com"
              className="ml-3 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40">
              Hire Me
            </a>
          </nav>

          <button className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden bg-[#0d1117]/95 backdrop-blur-xl border-t border-slate-800 px-6 py-4 space-y-1">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => goto(l.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                  activeSection === l.id ? "text-violet-400 bg-violet-500/10" : "text-slate-400 hover:text-slate-100"
                }`}>
                {l.label}
              </button>
            ))}
            <a href="mailto:rhanand2001@gmail.com"
              className="block w-full text-center mt-2 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium">
              Hire Me
            </a>
          </div>
        )}
      </header>

      {/* ╔══════════════ HERO ══════════════╗ */}
      <section id="hero" ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-12 overflow-hidden">

        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: Text ── */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to full-time opportunities
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-[1.05]">
                <span className="text-slate-100">Anand</span>{" "}
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Hadapad
                </span>
              </h1>

              <p className="text-xl text-slate-400 font-medium mb-2">Data Analyst</p>
              <p className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
                <MapPin className="w-4 h-4" /> Bengaluru, India
              </p>

              <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
                Skilled in <span className="text-slate-200">SQL, Python, Excel, Power BI and Tableau</span>, with strong abilities
                in data cleaning, analysis, dashboards and KPI tracking. Experienced in generating insights, organizing datasets
                and supporting decision-making through clear reporting, visualization and analytical problem-solving.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a href="mailto:rhanand2001@gmail.com"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105">
                  <Mail className="w-4 h-4" /> Get In Touch
                </a>
                <button onClick={() => goto("projects")}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-violet-500/50 hover:bg-slate-800/60 text-slate-300 font-medium text-sm transition-all hover:scale-105">
                  View Projects <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <a href="tel:+916360069300" className="flex items-center gap-1.5 hover:text-violet-400 transition-colors">
                  <Phone className="w-3.5 h-3.5" /> +91 - 6360069300
                </a>
                <a href="mailto:rhanand2001@gmail.com" className="flex items-center gap-1.5 hover:text-violet-400 transition-colors">
                  <Mail className="w-3.5 h-3.5" /> rhanand2001@gmail.com
                </a>
              </div>
            </div>

            {/* ── Right: Photo + social ── */}
            <div className="flex flex-col items-center gap-6 lg:items-end">
              <div className="relative">
                {/* Ring glow */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-500 blur-xl opacity-30" />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 opacity-60" />
                <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[#080b14]">
                  <ImageWithFallback
                    src={PROFILE_IMG}
                    alt="Anand Hadapad"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </div>
                {/* Status badge */}
                <div className="absolute -bottom-1 -right-1 px-3 py-1.5 bg-[#0d1117] border border-slate-700 rounded-full text-xs text-emerald-400 flex items-center gap-1.5 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/rhanand11/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/40 text-slate-300 hover:text-blue-400 text-sm transition-all hover:scale-105">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="https://github.com/rhanand01" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-violet-500/40 text-slate-300 hover:text-violet-400 text-sm transition-all hover:scale-105">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* ── Stats bar ── */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i}
                className="group relative overflow-hidden bg-slate-900/60 backdrop-blur border border-slate-800 hover:border-violet-500/40 rounded-2xl p-5 text-center transition-all hover:shadow-lg hover:shadow-violet-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  {s.value}
                </div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div className="mt-12 flex justify-center">
            <button onClick={() => goto("about")}
              className="flex flex-col items-center gap-2 text-slate-600 hover:text-violet-400 transition-colors group">
              <span className="text-xs font-medium">Scroll Down</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* ╔══════════════ ABOUT ══════════════╗ */}
      <section id="about" className="py-24 px-6 bg-[#0a0e1a]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="01 // About" />
          <h2 className="text-4xl font-bold mb-10">Who I Am</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <p className="text-slate-300 leading-relaxed text-base mb-4">
                I'm a <span className="text-violet-400 font-semibold">Data Analyst</span> with a Master's in Computer Applications,
                passionate about transforming raw data into clear, actionable business insights. My experience spans loyalty analytics,
                sales performance reporting, and retail transaction analysis.
              </p>
              <p className="text-slate-400 leading-relaxed text-base mb-4">
                During my internship at <span className="text-slate-200 font-medium">Elevator Loyalty Solutions</span>, I worked with
                30,000+ transaction records, built real-time Streamlit dashboards, and partnered with cross-functional teams to deliver
                4 analytics solutions in 3 months.
              </p>
              <p className="text-slate-400 leading-relaxed text-base">
                I thrive on clean data pipelines, storytelling through visualization, and using <span className="text-slate-200">Python, SQL and Power BI</span> to
                uncover the patterns that drive smarter decisions.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <Database className="w-4 h-4" />, label: "Core Focus", value: "Data Cleaning · EDA · Dashboards · KPI" },
                { icon: <Code2 className="w-4 h-4" />, label: "Tech Stack", value: "SQL · Python · Power BI · Tableau · Streamlit" },
                { icon: <Briefcase className="w-4 h-4" />, label: "Experience", value: "Data Analyst Intern @ Elevator Loyalty Solutions" },
                { icon: <GraduationCap className="w-4 h-4" />, label: "Education", value: "MCA · CMR University · CGPA 8.49/10" },
                { icon: <MapPin className="w-4 h-4" />, label: "Location", value: "Bengaluru, India" },
              ].map((item, i) => (
                <div key={i}
                  className="flex items-start gap-3 p-4 bg-slate-900/60 border border-slate-800 hover:border-violet-500/30 rounded-xl transition-all group">
                  <div className="text-violet-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
                    <div className="text-sm text-slate-200">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════ EXPERIENCE ══════════════╗ */}
      <section id="experience" className="py-24 px-6 bg-[#080b14]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="02 // Experience" />
          <h2 className="text-4xl font-bold mb-10">Work History</h2>

          <div className="relative border-l-2 border-violet-500/30 pl-8 ml-4">
            {/* dot */}
            <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/50 ring-4 ring-[#080b14]" />

            <div className="bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 rounded-2xl p-8 transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-violet-400 mb-1">Data Analyst Intern</h3>
                  <div className="flex items-center gap-2 text-slate-200 font-medium mb-2">
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    Elevator Loyalty Solutions
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full">
                      Internship
                    </span>
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-400 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Bengaluru, India
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 rounded-xl text-slate-400 text-sm flex-shrink-0 self-start border border-slate-700">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  Dec 2024 – Feb 2025
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Tools Used: </span>
                <span className="text-xs text-slate-400">Python, SQL, Excel, Streamlit, Metabase</span>
              </div>

              <ul className="space-y-3">
                {[
                  "Ingested, cleaned, and standardised 30,000+ loyalty transaction records using Python (pandas) and SQL, eliminating data inconsistencies and enabling reliable downstream reporting for 3 business teams.",
                  "Conducted in-depth EDA across 4+ operational datasets, identifying 3 critical performance gaps — including a 12% drop in repeat purchase rates — that directly shaped product roadmap priorities.",
                  "Developed interactive Streamlit dashboards to communicate loyalty KPIs to stakeholders, reducing reporting turnaround from 2 days to real-time.",
                  "Partnered with product managers and business analysts across cross-functional teams to translate business requirements into Python and SQL-based data pipelines, delivering 4 analytics solutions over 3 months.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm group/item">
                    <span className="text-violet-400 mt-0.5 flex-shrink-0 font-bold">—</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ghost future entry */}
            <div className="absolute -left-[9px] bottom-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-700 ring-4 ring-[#080b14]" />
          </div>
        </div>
      </section>

      {/* ╔══════════════ PROJECTS ══════════════╗ */}
      <section id="projects" className="py-24 px-6 bg-[#0a0e1a]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="03 // Projects" />
          <h2 className="text-4xl font-bold mb-10">Featured Work</h2>

          <div className="space-y-6">
            {projects.map((p, idx) => (
              <div key={p.id}
                className="group relative overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-slate-600 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-black/50">
                {/* Gradient stripe on left */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${p.accent} rounded-l-2xl`} />

                <div className="p-7 pl-8">
                  {/* Header row */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-slate-600 font-mono">0{idx + 1}</span>
                        <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                          {p.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5" /> {p.period}
                      </div>
                    </div>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tech.map((t, ti) => (
                      <span key={ti} className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${p.accentBg}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.description}</p>

                  {/* Bullet points */}
                  <ul className="space-y-2">
                    {p.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2.5 text-sm text-slate-500">
                        <span className="text-violet-500 mt-0.5 flex-shrink-0">▸</span>
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════ SKILLS ══════════════╗ */}
      <section id="skills" className="py-24 px-6 bg-[#080b14]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="04 // Skills" />
          <h2 className="text-4xl font-bold mb-10">Technical Expertise</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((s, i) => (
              <div key={i}
                className="group bg-slate-900/50 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl border ${s.bg} ${s.color} group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <h3 className="font-semibold text-slate-100 text-sm">{s.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item, ii) => (
                    <span key={ii}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700/80 transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════ CERTIFICATIONS ══════════════╗ */}
      <section className="py-20 px-6 bg-[#0a0e1a]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="05 // Certifications" />
          <h2 className="text-4xl font-bold mb-10">Credentials</h2>

          <div className="grid sm:grid-cols-3 gap-5">
            {certifications.map((c, i) => (
              <div key={i}
                className="group flex flex-col gap-4 p-6 bg-slate-900/60 border border-slate-800 hover:border-slate-600 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${c.color} group-hover:scale-110 transition-transform`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-100 mb-1 leading-snug">{c.name}</div>
                  <div className="text-xs text-slate-500">{c.org}</div>
                </div>
                <a href="#" className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 mt-auto transition-colors">
                  View Certificate <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════ EDUCATION ══════════════╗ */}
      <section id="education" className="py-24 px-6 bg-[#080b14]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="06 // Education" />
          <h2 className="text-4xl font-bold mb-10">Academic Background</h2>

          <div className="relative border-l-2 border-violet-500/30 pl-8 ml-4 space-y-6">
            {education.map((e, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[41px] top-5 w-4 h-4 rounded-full ring-4 ring-[#080b14] ${
                  i === 0 ? "bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/40" : "bg-slate-700 border-2 border-slate-600"
                }`} />
                <div className="group bg-slate-900/60 border border-slate-800 hover:border-violet-500/35 rounded-2xl p-6 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl flex-shrink-0">{i === 0 ? "🎓" : "📚"}</div>
                      <div>
                        <h3 className="font-bold text-violet-400 mb-1 leading-snug">{e.degree}</h3>
                        <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-1">
                          <GraduationCap className="w-4 h-4 text-slate-600" />
                          {e.institution}
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs text-violet-400">
                          <Star className="w-3 h-3" /> CGPA: {e.cgpa}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl text-slate-400 text-sm self-start flex-shrink-0 border border-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      {e.period}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════ CONTACT ══════════════╗ */}
      <section id="contact" className="py-24 px-6 bg-[#0a0e1a]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel label="07 // Contact" centered />
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Data-Driven
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            I'm actively looking for Data Analyst roles. Whether you have an opportunity, a project,
            or just want to connect — my inbox is always open!
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                label: "Email",
                value: "rhanand2001@gmail.com",
                href: "mailto:rhanand2001@gmail.com",
                color: "hover:border-violet-500/40",
                iconBg: "bg-violet-500/10 border-violet-500/20 text-violet-400",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                label: "Phone",
                value: "+91 - 6360069300",
                href: "tel:+916360069300",
                color: "hover:border-indigo-500/40",
                iconBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
              },
            ].map((item, i) => (
              <a key={i} href={item.href}
                className={`group flex items-center gap-4 p-5 bg-slate-900/60 border border-slate-800 ${item.color} rounded-2xl transition-all hover:-translate-y-0.5 text-left`}>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${item.iconBg} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
                  <div className="text-sm font-medium text-slate-200">{item.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:rhanand2001@gmail.com"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105">
              <Mail className="w-5 h-5" /> Send a Message
            </a>
            <a href="https://www.linkedin.com/in/rhanand11/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-700 hover:border-blue-500/40 hover:bg-slate-800/60 text-slate-300 font-semibold transition-all hover:scale-105">
              <Linkedin className="w-5 h-5" /> Connect on LinkedIn
            </a>
            <a href="https://github.com/rhanand01" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-700 hover:border-violet-500/40 hover:bg-slate-800/60 text-slate-300 font-semibold transition-all hover:scale-105">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ╔══════════════ FOOTER ══════════════╗ */}
      <footer className="bg-[#080b14] border-t border-slate-800/60 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">AH</span>
              <span className="font-semibold text-slate-300">Anand Hadapad</span>
            </div>
            <p className="text-xs text-slate-600">Data Analyst · Bengaluru, India</p>
          </div>
          <p className="text-sm text-slate-600">© 2026 Anand Hadapad. All rights reserved.</p>
          <div className="flex gap-3">
            {[
              { Icon: Github, href: "https://github.com/rhanand01", hoverBorder: "hover:border-violet-500/40", hoverText: "hover:text-violet-400" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/rhanand11/", hoverBorder: "hover:border-blue-500/40", hoverText: "hover:text-blue-400" },
              { Icon: Mail, href: "mailto:rhanand2001@gmail.com", hoverBorder: "hover:border-violet-500/40", hoverText: "hover:text-violet-400" },
            ].map(({ Icon, href, hoverBorder, hoverText }, i) => (
              <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 ${hoverBorder} flex items-center justify-center text-slate-500 ${hoverText} transition-all`}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Section label chip ── */
function SectionLabel({ label, centered = false }: { label: string; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-2 mb-3 ${centered ? "justify-center" : ""}`}>
      <span className="text-xs font-mono font-bold text-violet-500 tracking-widest uppercase">{label}</span>
    </div>
  );
}