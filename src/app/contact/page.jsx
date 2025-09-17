"use client";

import React, { useState } from 'react';

// Mock components to replace missing UI components
const Button = ({ children, size, className, ...props }) => (
  <button
    {...props}
    className={`px-6 py-3 bg-accent hover:bg-accent-600 text-white rounded-lg transition-colors ${className || ''}`}
  >
    {children}
  </button>
);

const Input = ({ placeholder, type, className, ...props }) => (
  <input
    {...props}
    type={type || 'text'}
    placeholder={placeholder}
    className={`w-full p-3 bg-[#1a1a1f] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none ${className || ''}`}
  />
);

const Textarea = ({ placeholder, className, ...props }) => (
  <textarea
    {...props}
    placeholder={placeholder}
    className={`w-full p-3 bg-[#1a1a1f] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none resize-none ${className || ''}`}
  />
);

// Mock ScrollAnimation component
const ScrollAnimation = ({ children }) => (
  <div className="animate-fadeIn">{children}</div>
);

// Mock icons
const FaPhoneAlt = () => <span className="text-xl">📞</span>;
const FaEnvelope = () => <span className="text-xl">✉️</span>;
const FaMapMarkerAlt = () => <span className="text-xl">📍</span>;

// Contact component
const ContactComponent = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const info = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      description: "(+234) 8067 325 131",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: "jossyking99@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      description: "Tech Lane, Benin City, Edo State, Nigeria"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! (This is a demo)');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-6 bg-[#1b1b1f] text-white min-h-screen">
      <div className='container mx-auto px-4'>
        <ScrollAnimation>
          <div className='flex flex-col xl:flex-row gap-[30px]'>
            {/* form */}
            <div className='xl:w-[54%] order-2 xl:order-none'>
              <div className='flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl'>
                <h3 className='text-4xl text-accent'>Let's work together</h3>
                <p className='text-white/60'>
                  I enjoy building digital solutions from scratch. You've got a business that need professional website and application? Reach out to me now.
                </p>

                {/* input */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input
                    placeholder="Firstname"
                    value={formData.firstname}
                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                  />
                  <Input
                    placeholder="Lastname"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>

                {/* select */}
                <div className="relative">
                  <select
                    className="w-full p-3 bg-[#1a1a1f] border border-gray-600 rounded-lg text-white focus:border-accent focus:outline-none appearance-none"
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                  >
                    <option value="">Select a service</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="seo">SEO Optimization</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</div>
                </div>

                {/* textarea */}
                <Textarea
                  className="h-[200px]"
                  placeholder="Type your message here."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />

                {/* btn */}
                <Button
                  size="md"
                  className="max-w-40"
                  onClick={handleSubmit}
                >
                  Send message
                </Button>
              </div>
            </div>

            {/* info */}
            <div className='flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0'>
              <ul className='flex flex-col gap-10'>
                {info.map((item, index) => (
                  <li key={index} className='flex items-center gap-6'>
                    <div className='w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center'>
                      <div className='text-[28px]'>{item.icon}</div>
                    </div>
                    <div className='flex-1'>
                      <p className='text-white/60'>{item.title}</p>
                      <h3 className='text-xl'>{item.description}</h3>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ContactComponent;