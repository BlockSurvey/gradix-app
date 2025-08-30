import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    // TODO: Implement navigation to application dashboard
    console.log('Getting started with email:', email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 lg:px-12 py-6">
        <div className="text-2xl font-bold text-white">
          Gradix<span className="text-purple-400">.ai</span>
        </div>
        <div className="flex gap-6">
          <button className="text-white hover:text-purple-300 transition">Features</button>
          <button className="text-white hover:text-purple-300 transition">How it Works</button>
          <button className="text-white hover:text-purple-300 transition">Use Cases</button>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">
              HACKATHON EDITION
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
            Manual Review Can&apos;t Scale.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              This Can.
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Transform your hackathon judging process. Evaluate hundreds of submissions in minutes, 
            not hours. Get AI-powered insights, transparent scoring, and a curated shortlist you can trust.
          </p>
          
          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 w-full sm:w-80 focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition w-full sm:w-auto"
            >
              Start Free Trial
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">10x</div>
              <div className="text-gray-400">Faster Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">1000+</div>
              <div className="text-gray-400">Applications/Hour</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">99%</div>
              <div className="text-gray-400">Time Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Hackathon Judging, Reimagined
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Setup</h3>
              <p className="text-gray-400">Describe your ideal project. We handle the rest.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Filtering</h3>
              <p className="text-gray-400">Auto-remove ineligible entries based on your criteria.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Scoring</h3>
              <p className="text-gray-400">Consistent, transparent evaluation with explanations.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Custom Rubrics</h3>
              <p className="text-gray-400">Tailor evaluation criteria to your hackathon theme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Define Your Criteria</h3>
              <p className="text-gray-400">Tell us what makes a winning hackathon project. Technical innovation? Impact? Feasibility? We&apos;ll build your custom evaluation framework.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Upload Submissions</h3>
              <p className="text-gray-400">Import project submissions via CSV, API, or direct form integration. We&apos;ll parse demos, repos, and documentation automatically.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Get Your Winners</h3>
              <p className="text-gray-400">Receive a ranked shortlist with detailed scoring breakdowns. Every decision is transparent and defensible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Perfect For Every Hackathon
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">University Hackathons</h3>
              <p className="text-gray-300">Handle 500+ student submissions efficiently while ensuring fair evaluation across diverse skill levels.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Corporate Innovation</h3>
              <p className="text-gray-300">Evaluate internal innovation challenges and identify the most promising employee-led initiatives.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Web3 & Blockchain</h3>
              <p className="text-gray-300">Assess technical implementations, smart contract quality, and innovation in decentralized applications.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">AI/ML Competitions</h3>
              <p className="text-gray-300">Evaluate model performance, code quality, and innovative approaches to complex problems.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Social Impact</h3>
              <p className="text-gray-300">Judge projects based on potential impact, sustainability, and alignment with SDG goals.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Game Jams</h3>
              <p className="text-gray-300">Evaluate gameplay, creativity, technical execution, and adherence to theme constraints.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Hackathon?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of organizers who&apos;ve revolutionized their judging process. 
              Get started in minutes, see results in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Start Free Trial
              </button>
              <button className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition border border-white/30">
                Schedule Demo
              </button>
            </div>
            <p className="text-white/70 mt-6 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-4 md:mb-0">
              <div className="text-2xl font-bold mb-2">
                Gradix<span className="text-purple-400">.ai</span>
              </div>
              <p className="text-gray-400">Intelligent application evaluation at scale</p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">
                Terms
              </Link>
              <Link href="/docs" className="text-gray-400 hover:text-white transition">
                Documentation
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-white transition">
                Support
              </Link>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-400 text-sm">
            Built with ❤️ by BlockSurvey
          </div>
        </div>
      </footer>
    </div>
  );
}