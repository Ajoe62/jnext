"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+234) 8067 325 131",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "ijeborjoe@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Tech Lane, Benin City, Edo State, Nigeria"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Debug: Log environment variables
    console.log('EmailJS Config:', {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    });

    // Debug: Check if EmailJS is loaded
    console.log('EmailJS object:', emailjs);
    console.log('EmailJS send function:', typeof emailjs.send);

    // Debug: Log environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    
    console.log('EmailJS Config:', {
      serviceId,
      templateId,
      publicKey,
      hasService: !!serviceId,
      hasTemplate: !!templateId,
      hasKey: !!publicKey
    });

    // Check if credentials are still placeholders
    if (!serviceId || serviceId.includes('PASTE_YOUR') || serviceId.includes('your_real')) {
      console.error('❌ EmailJS credentials not properly configured!');
      alert('Please configure EmailJS credentials in .env.local file');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Validate required fields
      if (!formData.firstName || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      // EmailJS template parameters
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`.trim(),
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        service: formData.service || 'Not specified',
        message: formData.message,
        to_name: 'Joseph Akharume'
      };

      console.log('Sending email with params:', templateParams);

      // Send notification email to you
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Email send error:', error);
      console.error('Error type:', error.constructor.name);
      console.error('Error status:', error.status);
      console.error('Error text:', error.text);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      
      // EmailJS specific error handling
      if (error.status) {
        console.error('HTTP Status:', error.status);
        switch (error.status) {
          case 400:
            console.error('❌ Bad Request - Check your EmailJS configuration');
            break;
          case 401:
            console.error('❌ Unauthorized - Invalid API key');
            break;
          case 404:
            console.error('❌ Not Found - Invalid service or template ID');
            break;
          default:
            console.error('❌ Unknown error status:', error.status);
        }
      }
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-[30px]'>
          {/* form */}
          <div className='xl:w-[54%] order-2 xl:order-none'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl'>
              <h3 className='text-4xl text-accent'>Let's work together</h3>
              <p className='text-white/60'>I enjoy building digital solutions from scratch. You've got a business that need professional website and application? Reach out to me now.
              </p>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className='bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-lg'>
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className='bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg'>
                  ❌ Failed to send message. Please try again or email me directly.
                </div>
              )}

              {/* input */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Firstname"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Lastname"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              {/* select */}
              <Select value={formData.service} onValueChange={handleServiceChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Content Creation">Content Creation</SelectItem>
                    <SelectItem value="Code/AI Tutoring">Code/AI Tutoring</SelectItem>
                    <SelectItem value="SEO Optimization">SEO Optimization</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* textarea */}
              <Textarea
                className="h-[200px]"
                name="message"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleInputChange}
                required
              />

              {/* button */}
              <Button
                type="submit"
                size="md"
                className="max-w-40"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </div>
          {/* info */}
          <div className='flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0'>
            <ul className='flex flex-col gap-10'>
              {info.map((item, index) => {
                return (
                  <li key={index} className='flex items-center gap-6'>
                    <div className='w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center'>
                      <div className='text-[28px]'>{item.icon}</div>
                    </div>
                    <div className='flex-1'>
                      <p className='text-white/60'>{item.title}</p>
                      <h3 className='text-xl'>{item.description}</h3>
                    </div>
                  </li>

                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
export default Contact;