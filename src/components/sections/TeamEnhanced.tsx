import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import managingDirectorImg from '@/assets/team-managing-director.jpeg';
import itSupportImg from '@/assets/team-it-support.png';
import adminImg from '@/assets/team-admin.jpeg';
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  isAvatar?: boolean;
  bio: string[];
  qualifications?: string;
  closing?: string;
}
const managingDirector: TeamMember = {
  id: 'md',
  name: 'Ethleen George',
  role: 'Managing Director',
  image: managingDirectorImg,
  bio: ['Ethleen George is the Managing Director of Innovate Business and Technology, overseeing the company\'s overall strategy, leadership, and operational direction. Her key responsibilities include:'],
  qualifications: 'Ethleen holds a BA with Honours in Archive, Information, and Communication Studies, with specialization in records organization and information management. She also possesses internationally recognized ICT certifications from Pearson Vue, including CompTIA A+, Networking, and Security+.',
  closing: 'With her strong leadership, technical background, and strategic vision, Ethleen drives Innovate Business and Technology forward, delivering impactful solutions and fostering continuous growth.'
};
const mdResponsibilities = ['Setting organizational goals and strategic objectives', 'Making executive decisions on operations and finance', 'Leading and managing multidisciplinary teams', 'Ensuring delivery of high-quality technology and business services', 'Building strong relationships with stakeholders, partners, and clients', 'Driving innovation, growth, and long-term sustainability'];
const itSupport: TeamMember = {
  id: 'it',
  name: 'Johnny Paul Marah',
  role: 'IT Support Officer',
  image: itSupportImg,
  bio: ['Johnny Paul Marah is the IT Support Officer at Innovate Business and Technology, responsible for managing, securing, and optimizing the organization\'s technology infrastructure and digital systems. His key responsibilities include:'],
  qualifications: 'Johnny is currently pursuing a B.Sc. in Information Systems and has undergone extensive professional training in software engineering, networking, database systems, and cybersecurity. His expertise includes full-stack software development, mobile application development, network configuration, system administration, and database management, with hands-on experience in security-focused environments such as Kali Linux. He also holds an IBM Certification in Generative AI Application Development, reflecting his growing expertise in artificial intelligence, automation, and modern digital solutions.',
  closing: 'With a strong technical foundation and a continuous learning mindset, Johnny supports Innovate Business and Technology by ensuring reliable systems, secure operations, and innovative technology-driven solutions.'
};
const itResponsibilities = ['Providing enterprise-level support for hardware, software, and network systems', 'Designing, developing, and maintaining scalable software and mobile applications', 'Managing database systems and ensuring data integrity and availability', 'Monitoring system performance and maintaining stable network connectivity', 'Identifying, diagnosing, and resolving technical and security-related issues', 'Supporting digital transformation and automation initiatives', 'Applying cybersecurity best practices to protect systems and organizational data'];
const administrator: TeamMember = {
  id: 'admin',
  name: 'Maseray Bangura',
  role: 'Administrator',
  image: adminImg,
  isAvatar: true,
  bio: [
    'The Administrator at Innovate Business and Technology brings a wealth of experience from diverse professional backgrounds, now responsible for coordinating internal operations, managing system workflows, and supporting organizational processes.',
    'Previously served as Secretary to the HR Department at the Ministry of Fisheries and Marine Resources (MFMR), and later contributed to the Monitoring and Evaluation team.',
    'Worked as a Loan Administrator at Elite Capital Investment, overseeing loan processing and administrative functions.',
    'Gained marketing experience at Sierra Leone Insurance Company (SLICO), contributing to business development and client engagement.',
    'This rich cross-sector experience strengthens IBIT\'s administrative capability, ensuring smooth operations and effective team coordination.'
  ]
};

// Profile Card Component
const ProfileCard = ({
  member,
  size = 'medium',
  onClick
}: {
  member: TeamMember;
  size?: 'large' | 'medium' | 'small';
  onClick: () => void;
}) => {
  const sizeClasses = {
    large: 'w-48 h-48 md:w-56 md:h-56',
    medium: 'w-36 h-36 md:w-44 md:h-44',
    small: 'w-28 h-28 md:w-32 md:h-32'
  };
  return <motion.div whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.98
  }} className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
      {/* Profile Image */}
      <div className={`${sizeClasses[size]} relative rounded-full overflow-hidden mb-4 transition-all duration-300 group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] ring-4 ring-primary/30 group-hover:ring-primary/60`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img src={member.image} alt={member.name} loading="lazy" decoding="async" className="w-full h-full object-cover object-top scale-125" />
      </div>
      
      {/* Name & Role */}
      <h4 className="text-lg font-bold text-foreground text-center">{member.name}</h4>
      <p className="text-sm text-primary font-medium text-center">{member.role}</p>
    </motion.div>;
};

// 3D Modal Component
const TeamModal = ({
  member,
  isOpen,
  onClose,
  responsibilities
}: {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  responsibilities?: string[];
}) => {
  if (!member) return null;
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-primary/20 shadow-[0_0_60px_hsl(var(--primary)/0.2)]">
        <DialogHeader className="text-center pb-4 border-b border-border/50">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top scale-125" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-gradient">{member.role}</DialogTitle>
          <p className="text-muted-foreground">{member.name}</p>
        </DialogHeader>
        
        <div className="space-y-4 pt-4 text-sm leading-relaxed text-foreground/90">
          {member.bio.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
          
          {responsibilities && responsibilities.length > 0 && <ul className="space-y-2 pl-4">
              {responsibilities.map((item, idx) => <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>)}
            </ul>}
          
          {member.qualifications && <p className="pt-2">{member.qualifications}</p>}
          
          {member.closing && <p className="pt-2 text-muted-foreground italic">{member.closing}</p>}
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4 pt-6 border-t border-border/50 mt-4">
          <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </DialogContent>
    </Dialog>;
};

// Partners Section - Text Only
const PartnersSection = () => {
  return <div className="py-10">
      <motion.p initial={{
      opacity: 0,
      y: 10
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="text-center text-base md:text-lg text-muted-foreground px-6 max-w-3xl mx-auto leading-relaxed">
        IBIT collaborates with experts from renowned tech companies globally. These partners share their expertise to train and enhance staff capabilities, driving excellence in service delivery.
      </motion.p>
    </div>;
};
export const TeamEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedResponsibilities, setSelectedResponsibilities] = useState<string[]>([]);
  const openMemberModal = (member: TeamMember, responsibilities?: string[]) => {
    setSelectedMember(member);
    setSelectedResponsibilities(responsibilities || []);
  };
  return <section id="team" className="section-padding relative bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background pointer-events-none" />
      
      <div className="container mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block">Our Team</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Meet the{' '}
            <span className="text-gradient">Innovators</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The talented individuals behind IBIT's success, dedicated to delivering 
            exceptional technology solutions.
          </p>
        </motion.div>

        {/* All Team Members - same row */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6,
        delay: 0.1
      }} className="mb-20">
          <h3 className="text-lg font-semibold mb-10 text-center text-primary/80">
        </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <ProfileCard member={managingDirector} size="medium" onClick={() => openMemberModal(managingDirector, mdResponsibilities)} />
            <ProfileCard member={itSupport} size="medium" onClick={() => openMemberModal(itSupport, itResponsibilities)} />
            <ProfileCard member={administrator} size="medium" onClick={() => openMemberModal(administrator)} />
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6,
        delay: 0.3
      }}>
          <h3 className="text-lg font-semibold mb-4 text-center text-primary/80">Partners and Board Members</h3>
          <PartnersSection />
        </motion.div>
      </div>

      {/* Modals */}
      <TeamModal member={selectedMember} isOpen={!!selectedMember} onClose={() => setSelectedMember(null)} responsibilities={selectedResponsibilities} />
    </section>;
};