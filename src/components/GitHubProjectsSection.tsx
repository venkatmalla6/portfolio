import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  GitBranch, Star, GitFork, Code2, Building2, Lock, Globe,
  ExternalLink, RefreshCw, Filter, ChevronDown, Terminal, Search, ArrowUpDown
} from 'lucide-react';
import './GitHubProjectsSection.css';

// NO token in frontend code — API calls go through a secure Netlify serverless proxy
const GITHUB_USERNAME = 'venkatmalla6';


async function githubFetch(endpoint: string): Promise<any> {
  // 1. Primary: Fetch through the serverless proxy (Token stays 100% server-side)
  // Works in Production (Netlify) and Local Dev if running 'netlify dev'
  try {
    const res = await fetch(`/.netlify/functions/github-proxy?endpoint=${endpoint}`);
    if (res.ok) {
      return await res.json();
    }
    // If the proxy returns an auth error (401/403) or is missing, fall through to public API
    console.warn(`Proxy returned status ${res.status}. Falling back to public API.`);
  } catch (e) {
    console.warn("Proxy fetch failed, attempting public fallback:", e);
  }

  // 2. Safe Fallback / Local Dev: Use VITE_GITHUB_TOKEN if present
  const viteToken = import.meta.env.VITE_GITHUB_TOKEN;
  
  const fetchWithToken = async (useToken: boolean) => {
    let url = '';
    const headers: any = { Accept: 'application/vnd.github+json' };

    if (useToken && viteToken) {
      headers.Authorization = `Bearer ${viteToken}`;
      url = endpoint === 'repos' 
        ? `https://api.github.com/user/repos?type=all&per_page=100&sort=updated`
        : `https://api.github.com/users/${GITHUB_USERNAME}`;
    } else {
      url = endpoint === 'repos'
        ? `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        : `https://api.github.com/users/${GITHUB_USERNAME}`;
    }

    return fetch(url, { headers });
  };

  let res = await fetchWithToken(true);
  
  // 3. If token is expired/invalid (401) or rate-limited (403), retry completely unauthenticated
  if (viteToken && (res.status === 401 || res.status === 403)) {
    console.warn(`Token failed with ${res.status}. Retrying unauthenticated...`);
    res = await fetchWithToken(false);
  }

  if (!res.ok) throw new Error(`GitHub API error (Fallback): ${res.status}`);
  return res.json();
}

interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  private: boolean;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  topics: string[];
  updated_at: string;
  owner: { login: string; avatar_url: string };
  size: number;
}

interface GithubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Dart: '#00B4AB',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Shell: '#89e051',
};

// Known org metadata (from our API scan)
const ORG_META: Record<string, { label: string; color: string }> = {
  'studrise-team': { label: 'Studrise Team', color: '#f59e0b' },
  'CRACK-IT-YOUR-JOB-PLACEMENT-TOOLS': { label: 'CRACK-IT', color: '#ef4444' },
  Pavankumarswamy: { label: 'Pavankumarswamy', color: '#8b5cf6' },
  venkatmalla6: { label: 'Personal', color: '#10b981' },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return '1 month ago';
  if (months < 12) return `${months} months ago`;
  return `${Math.floor(months / 12)} year(s) ago`;
}

const REPO_DESCRIPTIONS: Record<string, string> = {
  // Public/Existing Repos
  'portfolio': 'My personal portfolio showcasing my skills in Cloud Engineering, DevOps, and Full Stack Development.',
  'bhumi-web': 'A web platform built to manage and streamline operations, developed using modern web technologies.',
  'venkat': 'Personal profile repository containing my GitHub profile configurations and overview.',
  'venkatmalla6': 'Personal repository used for GitHub profile configuration and automation.',
  'neev': 'A comprehensive application focusing on robust backend architecture and seamless user experience.',
  
  // Private / Organization Repos
  'Pocketai': 'An AI chatbot application with online and offline support using downloadable local AI models.',
  'BNL': 'A comprehensive learning and community platform.',
  'demo-repository': 'A sandbox repository for testing, prototyping, and continuous integration workflows.',
  'village': 'A community-oriented management platform or local application.',
  'Hap-Icecreams': 'An e-commerce and business management platform for an ice cream brand.',
  'crackit-website': 'The official landing page and web platform for the CRACK-IT job placement tools.',
  'crackit-v-10-app': 'The core application for CRACK-IT job placement tools, facilitating candidate preparation.',
  'AI-Insurance-agent': 'AI-driven insurance underwriting agent and automated claims processing system.',
  'telugusamiti': 'A regional community platform for organizing events and connecting members.',
  'smartMed': 'A smart healthcare application designed for medical record management and patient care.',
  'MChat': 'A real-time messaging and seamless communication platform.',
  'sweety': 'A customized internal application project.',
  'Astar-app': 'Frontend mobile/web application serving the A-star platform ecosystem.',
  'astar-ai-backend': 'Robust backend AI services and high-performance API for the A-star ecosystem.',
  'pocketpal': 'A mobile-friendly application for daily utility tracking and task management.',
  'showsnap': 'A media sharing and event snapshot platform.',
  'CreaterGo-Admin': 'Admin dashboard and management interface for the CreaterGo platform.',
  'CreaterGO-APP': 'The main consumer application for the CreaterGo ecosystem.',
  'fayaz': 'A specialized client or team project repository.',
};

// 3D Tilt Card
const RepoCard = ({ repo }: { repo: Repo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const orgMeta = ORC_META_SAFE(repo.owner.login);
  const langColor = LANGUAGE_COLORS[repo.language || ''] || '#6b7280';
  const isOrg = repo.owner.login !== GITHUB_USERNAME;
  
  const displayDescription = REPO_DESCRIPTIONS[repo.name] || repo.description || null;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -4 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="gh-card-wrapper"
    >
      <div className="gh-card glass-panel glass-panel-hover">
        {/* Top row */}
        <div className="gh-card-top" style={{ transform: 'translateZ(40px)' }}>
          <div className="gh-card-owner">
            <img src={repo.owner.avatar_url} alt={repo.owner.login} className="gh-owner-avatar" />
            <span
              className="gh-org-badge"
              style={{ background: `${orgMeta.color}22`, color: orgMeta.color, borderColor: `${orgMeta.color}44` }}
            >
              {isOrg ? <Building2 size={10} /> : <GitBranch size={10} />}
              {orgMeta.label}
            </span>
          </div>
          <div className="gh-card-visibility">
            {repo.private
              ? <><Lock size={12} /><span>Private</span></>
              : <><Globe size={12} /><span>Public</span></>
            }
          </div>
        </div>

        {/* Repo name */}
        <div className="gh-card-name" style={{ transform: 'translateZ(50px)' }}>
          <Code2 size={18} className="gh-code-icon" />
          <h3>{repo.name}</h3>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="gh-ext-link">
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Description */}
        <p className="gh-card-desc" style={{ transform: 'translateZ(30px)' }}>
          {displayDescription ? displayDescription : <span className="gh-no-desc">No description provided</span>}
        </p>

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="gh-topics" style={{ transform: 'translateZ(25px)' }}>
            {repo.topics.slice(0, 4).map(t => (
              <span key={t} className="gh-topic">#{t}</span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="gh-card-footer" style={{ transform: 'translateZ(20px)' }}>
          <div className="gh-stats">
            {repo.language && (
              <span className="gh-lang">
                <span className="gh-lang-dot" style={{ background: langColor }} />
                {repo.language}
              </span>
            )}
            <span className="gh-stat"><Star size={12} /> {repo.stargazers_count}</span>
            <span className="gh-stat"><GitFork size={12} /> {repo.forks_count}</span>
          </div>
          <span className="gh-updated">{timeAgo(repo.updated_at)}</span>
        </div>
      </div>
    </motion.div>
  );
};

function ORC_META_SAFE(login: string) {
  return ORG_META[login] || { label: login, color: '#6b7280' };
}

const GitHubProjectsSection = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOwner, setFilterOwner] = useState<string>('all');
  const [filterLang, setFilterLang] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'forks' | 'name'>('updated');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const ownerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (showDropdown === 'owner' && ownerRef.current && !ownerRef.current.contains(e.target as Node)) {
        setShowDropdown(null);
      }
      if (showDropdown === 'lang' && langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showDropdown]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [reposData, userData] = await Promise.all([
        githubFetch('repos'),
        githubFetch('user'),
      ]);

      // Filter out profile repo and sort by updated
      const filtered = reposData
        .filter((r: Repo) => r.name !== GITHUB_USERNAME)
        .sort((a: Repo, b: Repo) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

      setRepos(filtered);
      setUser(userData);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch GitHub data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Derived filters
  const owners = ['all', ...Array.from(new Set(repos.map(r => r.owner.login)))];
  const languages = ['all', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))];

  let displayed = repos.filter(r => {
    if (filterOwner !== 'all' && r.owner.login !== filterOwner) return false;
    if (filterLang !== 'all' && r.language !== filterLang) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = r.name.toLowerCase().includes(q);
      const matchesDesc = r.description?.toLowerCase().includes(q) || false;
      const matchesTopics = r.topics?.some(t => t.toLowerCase().includes(q)) || false;
      if (!matchesName && !matchesDesc && !matchesTopics) return false;
    }
    return true;
  });

  displayed = displayed.sort((a, b) => {
    if (sortBy === 'updated') return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
    if (sortBy === 'forks') return b.forks_count - a.forks_count;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Stats
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const orgs = Array.from(new Set(repos.filter(r => r.owner.login !== GITHUB_USERNAME).map(r => r.owner.login)));

  return (
    <section id="github" className="gh-section">
      {/* Section Header */}
      <div className="section-header">
        <GitBranch size={32} color="var(--color-accent)" />
        <h2>GitHub Repositories</h2>
      </div>

      {/* User Profile Banner */}
      {user && (
        <motion.div
          className="gh-profile-banner glass-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="gh-profile-left">
            <img src={user.avatar_url} alt={user.name} className="gh-profile-avatar" />
            <div className="gh-profile-info">
              <h3 className="gh-profile-name">{user.name}</h3>
              <p className="gh-profile-bio">{user.bio}</p>
              <div className="gh-profile-orgs">
                {orgs.map(org => {
                  const meta = ORC_META_SAFE(org);
                  return (
                    <span key={org} className="gh-org-pill" style={{ borderColor: `${meta.color}55`, color: meta.color }}>
                      <Building2 size={11} /> {meta.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="gh-profile-stats">
            <div className="gh-stat-box">
              <span className="gh-stat-val">{repos.length}</span>
              <span className="gh-stat-key">Repos</span>
            </div>
            <div className="gh-stat-box">
              <span className="gh-stat-val">{orgs.length}</span>
              <span className="gh-stat-key">Orgs</span>
            </div>
            <div className="gh-stat-box">
              <span className="gh-stat-val">{totalStars}</span>
              <span className="gh-stat-key">Stars</span>
            </div>
            <div className="gh-stat-box">
              <span className="gh-stat-val">{user.followers}</span>
              <span className="gh-stat-key">Followers</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filter Bar */}
      {!loading && !error && (
        <div className="gh-filter-bar">
          <Filter size={16} className="gh-filter-icon" />

          {/* Owner filter */}
          <div className="gh-dropdown-wrap" ref={ownerRef}>
            <button
              className="gh-filter-btn"
              onClick={() => setShowDropdown(showDropdown === 'owner' ? null : 'owner')}
            >
              <Building2 size={14} />
              {filterOwner === 'all' ? 'All Owners' : ORC_META_SAFE(filterOwner).label}
              <ChevronDown size={14} />
            </button>
            {showDropdown === 'owner' && (
              <div className="gh-dropdown">
                {owners.map(o => (
                  <button
                    key={o}
                    className={`gh-dropdown-item ${filterOwner === o ? 'active' : ''}`}
                    onClick={() => { setFilterOwner(o); setShowDropdown(null); }}
                  >
                    {o === 'all' ? 'All Owners' : ORC_META_SAFE(o).label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language filter */}
          <div className="gh-dropdown-wrap" ref={langRef}>
            <button
              className="gh-filter-btn"
              onClick={() => setShowDropdown(showDropdown === 'lang' ? null : 'lang')}
            >
              <Code2 size={14} />
              {filterLang === 'all' ? 'All Languages' : filterLang}
              <ChevronDown size={14} />
            </button>
            {showDropdown === 'lang' && (
              <div className="gh-dropdown">
                {languages.map(l => (
                  <button
                    key={l || 'none'}
                    className={`gh-dropdown-item ${filterLang === l ? 'active' : ''}`}
                    onClick={() => { setFilterLang(l || 'all'); setShowDropdown(null); }}
                  >
                    {l === 'all' ? 'All Languages' : (
                      <><span className="gh-lang-dot-sm" style={{ background: LANGUAGE_COLORS[l] || '#6b7280' }} />{l}</>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="gh-search-wrap" style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '0 8px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <Search size={14} color="rgba(255, 255, 255, 0.4)" />
            <input 
              type="text" 
              placeholder="Search repos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.8)', padding: '8px', outline: 'none', fontSize: '0.82rem', width: '140px' }}
            />
          </div>

          {/* Sort filter */}
          <div className="gh-dropdown-wrap" ref={sortRef}>
            <button
              className="gh-filter-btn"
              onClick={() => setShowDropdown(showDropdown === 'sort' ? null : 'sort')}
            >
              <ArrowUpDown size={14} />
              {sortBy === 'updated' ? 'Recently Updated' : sortBy === 'stars' ? 'Most Stars' : sortBy === 'forks' ? 'Most Forks' : 'Name'}
              <ChevronDown size={14} />
            </button>
            {showDropdown === 'sort' && (
              <div className="gh-dropdown">
                {[
                  { id: 'updated', label: 'Recently Updated' },
                  { id: 'stars', label: 'Most Stars' },
                  { id: 'forks', label: 'Most Forks' },
                  { id: 'name', label: 'Name' }
                ].map(s => (
                  <button
                    key={s.id}
                    className={`gh-dropdown-item ${sortBy === s.id ? 'active' : ''}`}
                    onClick={() => { setSortBy(s.id as any); setShowDropdown(null); }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="gh-count">{displayed.length} repos</span>

          <button className="gh-refresh-btn" onClick={fetchData} title="Refresh">
            <RefreshCw size={14} />
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="gh-loading">
          <div className="gh-loading-spinner" />
          <div className="gh-loading-text">
            <Terminal size={16} />
            <span>Fetching repositories from GitHub API...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="gh-error glass-panel">
          <p>⚠️ {error}</p>
          <button className="btn-primary" onClick={fetchData}>Retry</button>
        </div>
      )}

      {/* Repos Grid */}
      {!loading && !error && (
        <div className="gh-grid">
          {displayed.map(repo => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
          {displayed.length === 0 && (
            <div className="gh-empty">No repositories match the selected filters.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default GitHubProjectsSection;
