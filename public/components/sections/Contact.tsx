import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'support@innovatebitech.com',
    href: 'mailto:innovatebiznestechnology@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+232 32 466 976',
    href: 'tel:+23232466976',
  },
  {
    icon: Phone,
    label: 'Phone 2',
    value: '+232 30 548 655',
    href: 'tel:+23230548655',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Freetown, Sierra Leone',
    href: '#',
  },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
      });

      if (error) {
        console.error('Error sending message:', error);
        toast({
          title: 'Failed to send message',
          description: 'Please try again or contact us directly via email.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Message sent!',
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Failed to send message',
        description: 'Please try again or contact us directly via email.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Get in Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let's build something{' '}
            <span className="text-gradient">amazing together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto px-4">
            Ready to transform your business with technology? Contact us for a free consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start max-w-6xl mx-auto">
          {/* Contact form - Mobile responsive */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="glass-card p-6 md:p-8 gradient-border">
              <h3 className="text-xl font-bold mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="bg-background/50 border-border focus:border-primary w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-background/50 border-border focus:border-primary w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={5}
                    required
                    className="bg-background/50 border-border focus:border-primary resize-none w-full"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 glow-cyan"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send size={18} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact info - Mobile responsive */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 md:space-y-8 w-full"
          >
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4 md:space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium group-hover:text-primary transition-colors truncate">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* AI Chat CTA */}
            <div className="glass-card p-5 md:p-6 gradient-border">
              <h4 className="font-bold mb-2">Need instant answers?</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Chat with our AI assistant 24/7 for quick questions about our services.
              </p>
              <p className="text-sm text-primary">
                Look for the chat bubble in the bottom right corner →
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
