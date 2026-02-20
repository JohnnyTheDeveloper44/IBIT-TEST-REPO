import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const owners = [
  {
    name: 'Owner 1',
    role: 'Co-Founder & CEO',
    initials: 'O1',
    bio: 'Visionary leader with 10+ years in technology solutions.',
  },
  {
    name: 'Owner 2',
    role: 'Co-Founder & CTO',
    initials: 'O2',
    bio: 'Technical expert specializing in software architecture.',
  },
  {
    name: 'Owner 3',
    role: 'Co-Founder & COO',
    initials: 'O3',
    bio: 'Operations specialist ensuring seamless project delivery.',
  },
];

const team = [
  {
    name: 'Team Member',
    role: 'Software Engineer',
    image: '/placeholder.svg',
    bio: 'Full-stack developer passionate about creating elegant solutions.',
  },
];

export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="section-padding relative" ref={ref}>
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Our Team</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Meet the{' '}
            <span className="text-gradient">innovators</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The talented individuals behind IBIT's success, dedicated to delivering 
            exceptional technology solutions.
          </p>
        </motion.div>

        {/* Owners */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-8 text-center">Leadership</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {owners.map((owner, index) => (
              <motion.div
                key={owner.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-card p-8 text-center h-full transition-all duration-500 hover:bg-card/80 gradient-border">
                  {/* Avatar placeholder */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 glow-cyan">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {owner.initials}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-1">{owner.name}</h4>
                  <p className="text-primary text-sm mb-4">{owner.role}</p>
                  <p className="text-muted-foreground text-sm mb-6">{owner.bio}</p>
                  
                  {/* Social links */}
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team members */}
        <div>
          <h3 className="text-xl font-semibold mb-8 text-center">Team</h3>
          <div className="flex justify-center">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group max-w-sm"
              >
                <div className="glass-card p-8 text-center transition-all duration-500 hover:bg-card/80 gradient-border">
                  {/* Photo */}
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ring-2 ring-primary/50">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                  <p className="text-primary text-sm mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-6">{member.bio}</p>
                  
                  {/* Social links */}
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
