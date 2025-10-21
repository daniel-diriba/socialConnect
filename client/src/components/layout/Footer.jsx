import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-blue-400 mb-4">
              SocialConnect
            </h3>
            <p className="text-gray-400 text-sm">
              Connecting people around the world. Share your stories, build your
              community, and stay connected with friends and family.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-lg">📘</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-lg">🐦</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-lg">💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="hover:text-white transition-colors"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to="/notifications"
                  className="hover:text-white transition-colors"
                >
                  Notifications
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  className="hover:text-white transition-colors"
                >
                  Messages
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Safety Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 SocialConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
