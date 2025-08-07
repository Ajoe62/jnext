# Joseph's Portfolio - Next.js Developer Website

A modern, high-performance portfolio website showcasing mobile and web development expertise. Built with Next.js 15, featuring AI-powered chat assistance and lightning-fast performance optimizations.

## 🚀 Features

### ✨ **AI Chat Assistant**

- **Real-time AI chat** powered by Groq's LLaMA 3 model
- **Lightning-fast responses** (millisecond response times)
- **Resizable chat widget** with smooth animations
- **Smart error handling** for seamless conversations
- **24/7 availability** to answer visitor questions

### 🎨 **Modern Design**

- **Electric blue theme** (#00d4ff) with smooth transitions
- **Responsive design** optimized for all devices
- **Custom animations** with Framer Motion
- **Mobile-first approach** with dedicated mobile navigation

### ⚡ **Performance Optimized**

- **90% smaller images** with WebP/AVIF formats
- **Instant navigation** with 0.1s transition delays
- **Code splitting** for optimal loading
- **Sharp image optimization** with lazy loading

### 📧 **Contact Integration**

- **EmailJS integration** for direct contact form submissions
- **Real-time form validation**
- **Professional email templates**

### 🛠 **Services Showcase**

1. **Mobile App Development** (React Native, Flutter)
2. **Web Development** (React, Next.js, Node.js)
3. **UI/UX Design** (Figma, responsive design)
4. **Logo Design** (brand identity, creative design)

## 🛠 Tech Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and context
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions

### **AI & APIs**

- **Groq API** - LLaMA 3-8B model for chat assistance
- **EmailJS** - Contact form email delivery

### **Performance**

- **Sharp** - Image optimization and compression
- **Vercel** - Edge deployment and hosting
- **WebP/AVIF** - Modern image formats

### **Development**

- **ESLint** - Code linting and formatting
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Git for version control

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Ajoe62/jnext.git
cd jnext
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

```bash
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/chat/       # AI chat API endpoint
│   ├── contact/        # Contact page with EmailJS
│   ├── resume/         # Resume/CV page
│   ├── services/       # Services showcase
│   ├── work/           # Portfolio projects
│   └── globals.css     # Global styles and theme
├── components/         # Reusable React components
│   ├── ui/            # Shadcn/ui components
│   ├── ChatWidget.jsx # AI chat interface
│   ├── Nav.jsx        # Navigation component
│   └── Photo.jsx      # Optimized image component
└── lib/               # Utility functions and constants
    ├── constants.js   # App-wide constants
    └── utils.js       # Helper functions
```

## 🔧 Key Features Implementation

### AI Chat Integration

The portfolio includes a sophisticated AI chat system:

- Groq API integration with LLaMA 3 model
- Real-time conversation handling
- Error management and fallbacks
- Responsive chat widget design

### Image Optimization

Advanced image optimization for superior performance:

- Multiple format generation (WebP, AVIF, PNG)
- Responsive sizing (298px, 398px, 498px)
- Blur placeholder generation
- 90% file size reduction

### Performance Optimizations

- Reduced animation delays from 2.4s to 0.1s
- Prefetch navigation links for instant loading
- Code splitting with dynamic imports
- Edge-optimized deployment

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables** in Vercel dashboard:
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
3. **Deploy** - Vercel will automatically build and deploy

### Manual Build

```bash
npm run build
npm start
```

## 🤖 AI Chat Usage

Visitors can interact with the AI assistant to:

- Learn about services and expertise
- Get project recommendations
- Ask technical questions
- Inquire about collaboration opportunities

## 📧 Contact Form

The contact form supports:

- Multiple service selection
- Real-time email delivery via EmailJS
- Professional email templates
- Form validation and error handling

## 🎨 Customization

### Theme Colors

Update the electric blue theme in `tailwind.config.js`:

```javascript
colors: {
  accent: '#00d4ff', // Electric blue theme
}
```

### AI Responses

Customize AI personality in `src/app/api/chat/route.js`:

- Modify system prompts
- Adjust response tone
- Add specialized knowledge

## 📈 Performance Metrics

- **90% image size reduction** with modern formats
- **Sub-second page transitions** (0.1s delays)
- **Lightning-fast AI responses** via Groq API
- **Perfect Lighthouse scores** on Core Web Vitals

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Contact

**Joseph Okoye** - Mobile & Web Developer

- Portfolio: [Live Demo](https://jnext-ajoe62.vercel.app)
- GitHub: [@Ajoe62](https://github.com/Ajoe62)
- LinkedIn: [Joseph Okoye](https://linkedin.com/in/joseph-okoye)

---

**Built with ❤️ using Next.js 15, powered by AI, optimized for speed.**
