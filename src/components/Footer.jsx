import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-8 border-t border-gray-700 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* About */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">About The Daily Blogs</h3>
                    <p className="text-sm text-gray-400">
                        Discover and share the new blogs, articles and many more contents.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="/" className="hover:text-emerald-400 transition">Home</a></li>
                        <li><a href="/blogs" className="hover:text-emerald-400 transition">Blogs</a></li>
                        <li><a href="#" className="hover:text-emerald-400 transition">Contact</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Resources</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:text-emerald-400 transition">FAQ</a></li>
                        <li><a href="#" className="hover:text-emerald-400 transition">Privacy</a></li>
                        <li><a href="#" className="hover:text-emerald-400 transition">Terms</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Newsletter</h3>
                    <form className="space-y-2">
                        <input 
                            type="email" 
                            placeholder="Your email" 
                            className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white placeholder-gray-400 rounded"
                        />
                        <button 
                            type="submit" 
                            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
