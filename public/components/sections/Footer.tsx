import { Link } from 'react-router-dom';
import { Facebook, Phone } from 'lucide-react';
import { ReactNode } from 'react';
import ibitLogo from '@/assets/ibit-logo.jpeg';

const footerLinks = {
  services: [
    { label: 'Software Development', href: '#services' },
    { label: 'Website Development', href: '#services' },
    { label: 'IT Consultancy', href: '#services' },
    { label: 'Cybersecurity', href: '#services' },
    { label: 'Cloud Computing', href: '#services' },
  ],
  company: [
    { label: 'About IBIT', href: '#about' },
    { label: 'IBIT Team', href: '#team' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact IBIT', href: '#contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { icon: <Facebook size={18} />, href: 'https://www.facebook.com/profile.php?id=61586281957315', label: 'Facebook' },
  { icon: <WhatsAppIcon />, href: 'https://wa.me/23232466976', label: 'WhatsApp' },
  { icon: <Phone size={18} />, href: 'tel:+23232466976', label: 'Phone' },
];

export const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={ibitLogo} alt="IBIT Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-gradient">IBIT</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              IBIT (Innovate Bitech) – Your Partner in Digital Transformation.
            </p>
            <p className="text-muted-foreground text-sm mb-2">
              <a href="mailto:support@innovatebitech.com" className="hover:text-primary transition-colors">
                support@innovatebitech.com
              </a>
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              <a href="tel:+23232466976" className="hover:text-primary transition-colors">
                +232 32 466 976
              </a>
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} IBIT (Innovate Bitech). All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            IBIT – Your Partner in Digital Transformation
          </p>
        </div>
      </div>
    </footer>
  );
};
