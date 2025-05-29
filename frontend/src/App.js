import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [typedText, setTypedText] = useState('');
  const [typedTitle, setTypedTitle] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particlesData, setParticlesData] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Typing animation effect
  useEffect(() => {
    const name = 'Laxmi Sai Maneesh Reddy Jupalle';
    const title = 'Computer Science Graduate Student | AI & ML Specialist';
    
    let nameIndex = 0;
    let titleIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (nameIndex < name.length) {
        setTypedText(name.slice(0, nameIndex + 1));
        nameIndex++;
      } else if (titleIndex < title.length) {
        setTypedTitle(title.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particles animation
  useEffect(() => {
    const generateParticles = () => {
      const particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
      setParticlesData(particles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticlesData(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = {
    programming: [
      { name: 'Python', level: 95 },
      { name: 'Java', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'C++', level: 80 },
      { name: 'C', level: 75 },
      { name: 'RUST', level: 70 },
      { name: 'SQL', level: 85 }
    ],
    frameworks: [
      { name: 'TensorFlow', level: 90 },
      { name: 'PyTorch', level: 85 },
      { name: 'Django', level: 80 },
      { name: 'Scikit-Learn', level: 88 }
    ],
    tools: [
      { name: 'AWS', level: 85 },
      { name: 'Azure', level: 80 },
      { name: 'Docker', level: 75 },
      { name: 'Jenkins', level: 70 },
      { name: 'APIs', level: 90 }
    ],
    databases: [
      { name: 'SQL', level: 85 },
      { name: 'DBMS', level: 80 },
      { name: 'Hadoop', level: 75 }
    ],
    visualization: [
      { name: 'PowerBI', level: 80 },
      { name: 'Tableau', level: 75 },
      { name: 'Data Analysis', level: 90 }
    ]
  };

  const experiences = [
    {
      title: 'Technical Support Engineer',
      company: 'VMware by Broadcom',
      location: 'Bengaluru, KA',
      period: 'May 2023 – Jul 2024',
      achievements: [
        'Provided expertise in APIs, certificates, XML, and profiles to optimize system performance',
        'Supported thousands of enterprise clients, ensuring continuous service delivery',
        'Created Jira ticketing protocols, reducing developer-tester communication time by 40%',
        'Mentored peers on Apple product compatibility and troubleshooting'
      ]
    },
    {
      title: 'Associate Technical Support Engineer',
      company: 'VMware by Broadcom',
      location: 'Bengaluru, KA',
      period: 'Aug 2022 – Apr 2023',
      achievements: [
        'Diagnosed platform issues and enhanced mobility solutions',
        'Provided technical support for enterprise mobility solutions'
      ]
    },
    {
      title: 'Campus Ambassador',
      company: 'Ifortis Corporate',
      location: 'Bengaluru, KA',
      period: 'Mar 2020 – Jul 2020',
      achievements: [
        'Led 30+ online programming workshops, promoting skill sharing',
        'Facilitated virtual mentorship sessions for over 50 students'
      ]
    }
  ];

  const projects = [
    {
      title: 'SheSecure',
      period: 'Dec 2024 – Present',
      description: 'Built a CCTV-based ML pipeline using YOLOv5, achieving 92% accuracy in assault detection.',
      highlights: ['92% accuracy', 'YOLOv5 implementation', 'Real-time detection'],
      image: 'https://images.unsplash.com/photo-1516192518150-0d8fee5425e3'
    },
    {
      title: 'Jan Swasthya',
      period: 'Jan 2021 – Jun 2021',
      description: 'Created a health app using a CNN model (85% accuracy), reducing patient wait times by 30%.',
      highlights: ['85% accuracy', 'Django chatbot', '30% time reduction'],
      image: 'https://images.pexels.com/photos/17485657/pexels-photo-17485657.png'
    },
    {
      title: 'Twitter Data Scraping',
      period: 'Nov 2021 – Dec 2021',
      description: 'Automated follower analytics using Python, reducing weekly workload by 10+ hours.',
      highlights: ['Python automation', '10+ hours saved', 'Influencer identification'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
    }
  ];

  const education = [
    {
      institution: 'University of Illinois - Chicago (UIC)',
      degree: 'Master of Science in Computer Science',
      location: 'Chicago, IL',
      period: 'Aug 2024 – May 2026',
      gpa: '3.80',
      coursework: 'AI, ML, Data Science, Networking, DBMS, DevOps'
    },
    {
      institution: 'Jain (Deemed-to-be University)',
      degree: 'B.Tech in Computer Science and Technology (AI specialization)',
      location: 'Bengaluru, KA',
      period: 'Jul 2018 – Jul 2022',
      gpa: '3.80',
      coursework: 'ML, Deep Learning, NLP, HCI, Data Structures, DAA, DBMS, AI'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 rounded-full bg-blue-400/30 pointer-events-none z-50 transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'scale(1)',
        }}
      />

      {/* Animated Particles Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particlesData.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Maneesh Reddy
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'education', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-blue-400 hover:scale-110 ${
                    activeSection === item ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/80"></div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-4xl font-bold animate-pulse-slow">
              MR
            </div>
            
            {/* Fixed Name Display */}
            <h1 className="hero-name font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-shadow-lg">
              <span className="inline-block">
                {typedText || 'Laxmi Sai Maneesh Reddy Jupalle'}
                <span className="animate-pulse typing-cursor">|</span>
              </span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl mb-6 text-gray-200 min-h-[3rem] text-shadow">
              {typedTitle || 'Computer Science Graduate Student | AI & ML Specialist'}
            </h2>
            
            <p className="text-lg sm:text-xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passionate about Artificial Intelligence, Machine Learning, and building innovative solutions that make a difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  I'm a Computer Science graduate student at the University of Illinois - Chicago with a strong foundation in 
                  Artificial Intelligence, Data Science, and DevOps. My passion lies in developing innovative ML solutions 
                  that solve real-world problems.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  With professional experience at VMware by Broadcom and a track record of impactful projects, I've demonstrated 
                  expertise in technical support, machine learning applications, and automation tools. I'm particularly interested 
                  in AI safety, healthcare technology, and creating accessible solutions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 border border-blue-500/30">
                    AI & Machine Learning
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 border border-purple-500/30">
                    Data Science
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-400 border border-green-500/30">
                    DevOps
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-700/50 p-6 rounded-xl border border-blue-500/20">
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Current Focus</h3>
                  <p className="text-gray-300">
                    Pursuing MS in Computer Science at UIC while working on cutting-edge ML projects including 
                    security applications and healthcare solutions.
                  </p>
                </div>
                <div className="bg-slate-700/50 p-6 rounded-xl border border-purple-500/20">
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">Research Interests</h3>
                  <p className="text-gray-300">
                    Computer Vision, Natural Language Processing, Deep Learning, and their applications 
                    in healthcare and security domains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
              
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative group">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-slate-900 group-hover:scale-125 transition-transform duration-300"></div>
                    
                    <div className="ml-16 bg-slate-800/50 p-8 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover-lift">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-xl text-gray-300 mb-1">{exp.company}</p>
                          <p className="text-gray-400">{exp.location}</p>
                        </div>
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full text-sm font-semibold mt-4 md:mt-0 self-start">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start group/item">
                            <span className="text-blue-400 mr-3 mt-1 group-hover/item:scale-125 transition-transform">▸</span>
                            <span className="text-gray-300 group-hover/item:text-white transition-colors">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible.education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <div key={index} className="bg-slate-700/50 p-8 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">{edu.degree}</h3>
                  <p className="text-lg text-gray-300 mb-2">{edu.institution}</p>
                  <p className="text-gray-400 mb-2">{edu.location}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-purple-400 font-semibold">{edu.period}</span>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      GPA: {edu.gpa}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold">Relevant Coursework:</span> {edu.coursework}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], index) => (
                <div key={category} className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover-lift">
                  <h3 className="text-xl font-semibold text-blue-400 mb-6 capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="space-y-4">
                    {skillList.map((skill, idx) => (
                      <div key={idx} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-blue-400 text-sm font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: isVisible.skills ? `${skill.level}%` : '0%',
                              transitionDelay: `${idx * 100}ms`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover-lift">
                <div className="text-3xl font-bold text-green-400 mb-2 counter-animate">4+</div>
                <div className="text-gray-300">Languages Spoken</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover-lift">
                <div className="text-3xl font-bold text-blue-400 mb-2 counter-animate">2+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover-lift">
                <div className="text-3xl font-bold text-purple-400 mb-2 counter-animate">10+</div>
                <div className="text-gray-300">Technologies</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover-lift">
                <div className="text-3xl font-bold text-pink-400 mb-2 counter-animate">3.8</div>
                <div className="text-gray-300">GPA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="group relative bg-slate-700/50 rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover-lift">
                  <div 
                    className="h-48 bg-cover bg-center relative overflow-hidden" 
                    style={{ backgroundImage: `url(${project.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent group-hover:from-slate-900/70 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">→</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        {project.period}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30 group-hover:bg-blue-500/30 group-hover:border-blue-500/50 transition-all duration-300"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Interactive overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
            
            {/* Publications */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8 text-blue-400">Publications</h3>
              <div className="bg-slate-700/50 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover-lift group">
                <h4 className="text-xl font-semibold text-purple-400 mb-3 group-hover:text-purple-300 transition-colors">
                  "Diabetic Retinopathy Detection using ML"
                </h4>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors">
                  Developed a 5-layer CNN achieving 94.5% image classification accuracy. 
                  Recognized as International Best Researcher by ISSN.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-sm border border-purple-500/30 group-hover:bg-purple-500/30 transition-all duration-300">
                    94.5% Accuracy
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm border border-green-500/30 group-hover:bg-green-500/30 transition-all duration-300">
                    ISSN Recognition
                  </span>
                  <a 
                    href="https://www.ijariit.com/manuscript/diabetic-retinopathy-detection-using-machine-learning/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                  >
                    Read Publication →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="text-center mb-12">
              <p className="text-xl text-gray-300 mb-8">
                I'm always interested in discussing new opportunities, research collaborations, 
                or just connecting with fellow tech enthusiasts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-500/20">
                <h3 className="text-xl font-semibold text-blue-400 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-4">📧</span>
                    <a href="mailto:ljupa1@uic.edu" className="text-gray-300 hover:text-blue-400 transition-colors">
                      ljupa1@uic.edu
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-4">📱</span>
                    <span className="text-gray-300">(872) 357-7484</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-4">📍</span>
                    <span className="text-gray-300">Chicago, IL</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-4">💼</span>
                    <a 
                      href="https://www.linkedin.com/in/laxmi-sai-maneesh-reddy-j-a52935106/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 p-8 rounded-xl border border-purple-500/20">
                <h3 className="text-xl font-semibold text-purple-400 mb-6">Let's Connect</h3>
                <p className="text-gray-300 mb-6">
                  Whether you're looking for a passionate developer, a research collaborator, 
                  or just want to discuss the latest in AI and ML, I'd love to hear from you.
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:ljupa1@uic.edu"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Send Email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/laxmi-sai-maneesh-reddy-j-a52935106/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-blue-500 rounded-lg font-semibold text-center hover:bg-blue-500 transition-all duration-300"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Laxmi Sai Maneesh Reddy Jupalle. Crafted with passion for technology and innovation.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;