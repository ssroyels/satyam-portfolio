 import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import projects from "./projects.json";
import profile from "/satya-port.jpeg";
import profile1 from "/portfo.png";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const FRONTEND = import.meta.env.VITE_DOMAIN;

/* ================= TYPEWRITER ================= */
function useTypewriter(words, speed = 120, delay = 1500) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex((p) => p + 1);
        if (charIndex + 1 === currentWord.length)
          setTimeout(() => setIsDeleting(true), delay);
      } else {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex((p) => p - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((p) => (p + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, speed, delay]);

  return text;
}

/* ================= COUNTER ================= */
function Counter({ value, label }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setCount(i);
      if (i === value) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
        {count}+
      </h3>
      <p className="mt-2 text-gray-400 tracking-wide">{label}</p>
    </div>
  );
}

/* ================= APP ================= */
export default function App() {
  const [dark, setDark] = useState(true);
  const [aboutTab, setAboutTab] = useState("skills");
  const [menuOpen, setMenuOpen] = useState(false);

  const typedText = useTypewriter([
    "MERN Stack Engineer",
    "Full Stack Developer",
    "React & Node Specialist",
    "Building Scalable Web Apps",
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="bg-[#0b0f1a] text-gray-200 scroll-smooth font-sans">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur bg-[#0b0f1a]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Satyam Singh
          </h1>

          <div className="hidden md:flex gap-8 items-center text-gray-300">
            {["home", "about", "projects", "contact"].map((i) => (
              <a
                key={i}
                href={`#${i}`}
                className="hover:text-cyan-400 transition font-medium tracking-wide"
              >
                {i.toUpperCase()}
              </a>
            ))}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg border hover:scale-110 transition"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 border border-white/10 rounded-lg"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="min-h-screen grid md:grid-cols-2 items-center pt-28 max-w-7xl mx-auto px-8"
      >
        <div>
          <span className="text-cyan-400 font-semibold tracking-widest">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>

          <h1 className="text-5xl font-extrabold mt-4 leading-tight">
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Satyam
            </span>
            <br />
            Full Stack Developer
          </h1>

          <p className="text-gray-400 mt-6 max-w-xl leading-relaxed">
            I build high-performance MERN stack applications with clean UI and
            scalable backend architecture.
          </p>

          <div className="flex gap-6 mt-8 text-cyan-400">
            <a href="https://github.com/ssroyels" target="_blank">
              <Github />
            </a>
            <a href="https://www.linkedin.com/in/satyam-singh-077679290/" target="_blank">
              <Linkedin />
            </a>
            <a href="mailto:satyam884060singh@gmail.com">
              <Mail />
            </a>
          </div>

          <a
            href="/satyam-resume-final.pdf"
            download
            className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-xl
            bg-gradient-to-r from-cyan-500 to-violet-500
            hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30
            transition font-semibold text-black"
          >
            <Download /> Download Resume
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl opacity-20"></div>
            <img
              src={profile}
              className="relative w-[320px] rounded-full shadow-2xl hover:scale-105 transition"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          <Counter value={20} label="Projects" />
          <Counter value={60} label="Users" />
          <Counter value={1} label="Years Experience" />
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="py-20 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
      >
        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full bg-violet-400 blur-3xl opacity-20"></div>
          <img
            src={profile1}
            className="relative w-[320px] rounded-full shadow-2xl hover:scale-105 transition"
          />
        </div>

        <div>
          <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="flex gap-8 border-b border-white/10 mb-6">
            {["skills", "experience", "education"].map((tab) => (
              <button
                key={tab}
                onClick={() => setAboutTab(tab)}
                className={
                  aboutTab === tab
                    ? "text-cyan-400 border-b-2 border-cyan-400 pb-2 font-semibold"
                    : "text-gray-400 hover:text-gray-200"
                }
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {aboutTab === "skills" && (
            <ul className="space-y-2 text-gray-400">
              <li>React.js, Next.js, JavaScript</li>
              <li>Node.js, Express, MongoDB</li>
              <li>HTML, CSS, Tailwind CSS</li>
              <li>C, Java, Python</li>
              <li>Git, GitHub, Vercel, Render</li>
              <li>DSA, SQL, MongoDB</li>
            </ul>
          )}

          {aboutTab === "experience" && (
            <ul className="space-y-2 text-gray-400">
              <li>Freelance MERN Developer (2024–Present)</li>
              <li>Frontend Developer (2024–2025)</li>
              <li>Backend Developer (2024–2025)</li>
            </ul>
          )}

          {aboutTab === "education" && (
            <ul className="space-y-2 text-gray-400">
              <li>BCA – RMLAU University (2023–2026): 78.12%</li>
              <li>
                Intermediate (2022–2023): 79.4% <br />
                High School (2020–2021): 65.5%
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -8 }}
              className="bg-white/5 backdrop-blur rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400 transition"
            >
              <a href={project.link} target="_blank" className="relative block">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                  <span className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-lg text-black font-semibold">
                    Live →
                  </span>
                </div>
              </a>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.description}</p>
                <a
                  href={project.github}
                  target="_blank"
                  className="text-cyan-400 hover:underline"
                >
                  GitHub →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Contact Me
        </h2>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="bg-white/5 backdrop-blur p-8 rounded-xl space-y-6 border border-white/10"
        >
          <input type="hidden" name="access_key" value={ACCESS_KEY} />
          <input type="hidden" name="redirect" value={FRONTEND} />
          <input type="hidden" name="redirect_error" value={FRONTEND} />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0b0f1a] border border-white/10 focus:border-cyan-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0b0f1a] border border-white/10 focus:border-cyan-400 outline-none"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0b0f1a] border border-white/10 focus:border-cyan-400 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-black font-semibold hover:scale-[1.02] transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-6 text-center text-gray-500">
        © 2026 Satyam Singh — Built with Passion 🚀
      </footer>
    </div>
  );
}
