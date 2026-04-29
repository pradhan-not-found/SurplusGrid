import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* CTA Section */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
            Start Saving With <br className="hidden md:block"/> Clean Energy Today
          </h2>
          <Link to="/dashboard" className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-medium text-white bg-green-500 hover:bg-green-600 transition-all shadow-xl shadow-green-500/20 hover:scale-[1.03] active:scale-[0.98]">
            Get Early Access
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                S
              </div>
              <span className="text-lg font-semibold tracking-tight text-gray-900">SurplusGrid</span>
            </div>
            <p className="text-gray-500 font-light text-sm max-w-sm leading-relaxed">
              Making renewable energy efficient by connecting surplus generation with flexible industrial demand.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-green-600 text-sm transition-colors">How it works</Link></li>
              <li><Link to="/" className="text-gray-500 hover:text-green-600 text-sm transition-colors">For Producers</Link></li>
              <li><Link to="/" className="text-gray-500 hover:text-green-600 text-sm transition-colors">For Consumers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-green-600 text-sm transition-colors">About</Link></li>
              <li><Link to="/" className="text-gray-500 hover:text-green-600 text-sm transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-gray-500 hover:text-green-600 text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SurplusGrid. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
