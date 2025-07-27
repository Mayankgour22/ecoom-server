import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        {/* Newsletter CTA */}
        <div className="max-w-6xl mx-auto px-4 py-8 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold">Stay Updated</h3>
          <form className="mt-4 sm:mt-0 flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-3 rounded-l bg-gray-800 border border-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 bg-blue-600 hover:bg-blue-700 rounded-r"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Info Columns */}
        <div className="max-w-6xl mx-auto px-4 py-8 grid gap-8 grid-cols-2 sm:grid-cols-4">
          <div>
            <h4 className="font-semibold mb-2">Products</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-white">
                  Mobiles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Laptops
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Speakers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Customer Service</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">About Us</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-white">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 bg-gray-800 rounded hover:bg-gray-700"
                    aria-label="Social link"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p>
              © {new Date().getFullYear()} YourElectroStore. All rights
              reserved.
            </p>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
