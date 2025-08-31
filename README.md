# Gradix - AI-Powered Application Evaluation Platform

![Gradix](https://gradix.ai/)

## 🚀 Overview

**Manual Review Can't Scale. This Can.**

Gradix is an AI-powered application grading and evaluation platform that transforms how organizations review and select candidates at scale. Whether you're running a pitch event, accelerator program, or any selection process, Gradix automates the tedious work while maintaining transparency and trust in every decision.

## 🎯 The Problem We Solve

Evaluating thousands of applications is slow, inconsistent, and overwhelming. Traditional methods lead to:
- Spreadsheet chaos
- Reviewer fatigue
- Inconsistent evaluation criteria
- Time-consuming manual processes
- Lack of transparency in decision-making

## ✨ Key Features

### 1. **Automatic Criteria Generation**
Simply describe your ideal candidate, and Gradix converts your requirements into structured evaluation logic.

### 2. **Effortless Filtering**
Automatically filters out ineligible candidates based on your specified criteria, saving hours of manual review.

### 3. **Transparent Scoring Engine**
- Custom rubric-based scoring
- Detailed justifications for every decision
- Clear reasoning you can trust and explain

### 4. **Instant Shortlisting**
Get a ranked, curated shortlist of qualified candidates delivered in minutes, not days.

## 🔄 How It Works

1. **Frictionless Onboarding** - Quick setup by describing your ideal candidate profile
2. **Smart Conversion** - Transform requirements into structured evaluation logic
3. **Automatic Filtering** - Remove ineligible candidates instantly
4. **Intelligent Scoring** - Evaluate eligible candidates against your custom rubric
5. **Ranked Results** - Receive a prioritized shortlist with detailed explanations

## 💡 Use Cases

- **Pitch Events** - Select the most promising startups
- **Accelerator Programs** - Screen hundreds of applications efficiently
- **Grant Applications** - Evaluate proposals objectively
- **Scholarship Programs** - Fair and transparent candidate selection
- **Competition Entries** - Judge submissions at scale

## 🎯 Core Benefits

### Curation at Scale
Automate the evaluation of large candidate pools without sacrificing quality or nuance.

### Clarity You Can Trust
Every decision comes with transparent reasoning, making it easy to understand and defend your selections.

### Locked In. Laser-Focused
Fully customizable to your specific requirements, ensuring evaluations align perfectly with your goals.

## 🛠️ Advanced Capabilities

- **Web Enrichment** - Automatically scrapes and analyzes candidate-provided URLs
- **Document Parsing** - Processes attachments and supporting documents
- **Analytics Dashboard** - Aggregated insights into your applicant pool
- **Custom Rubrics** - Design evaluation criteria specific to your needs

## ⚠️ Important Notes

Gradix is designed as a **decision-support tool**, not a decision-maker. It provides:
- Transparent, context-aware evaluations
- Data-driven insights to inform your decisions
- Time savings on initial screening and scoring

The final selection decision always remains with you.

## 🏢 About

Created by [BlockSurvey](https://blocksurvey.io/) - Building tools that respect privacy while delivering powerful functionality.

## 🚀 Setup Instructions

### Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher (or yarn/pnpm)
- Git

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-org/gradix.git
cd gradix/ui/gradix-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add other required environment variables
```

4. **Run database migrations (if applicable)**
```bash
npm run migrate
```

5. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open the application**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Testing

```bash
# Run unit tests
npm run test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🏗️ Architecture Overview

### Technology Stack

- **Frontend Framework**: Next.js 13.1.6 (Pages Router)
- **Language**: TypeScript 4.9.4
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **API Communication**: REST APIs with fetch/axios
- **Authentication**: [Specify auth provider if applicable]
- **Deployment**: Vercel/AWS/Other

### Project Structure

```
gradix-app/
├── src/
│   ├── pages/           # Next.js pages and API routes
│   │   ├── api/         # Backend API endpoints
│   │   └── *.tsx        # Frontend pages
│   ├── components/      # React components
│   │   └── ui/         # shadcn/ui components
│   ├── stores/         # Zustand state management
│   ├── lib/            # Utility functions and helpers
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   └── styles/         # Global styles and Tailwind config
├── public/             # Static assets
├── tests/              # Test files
└── config/             # Configuration files
```

### Key Design Patterns

1. **Component Architecture**: Atomic design with reusable UI components
2. **State Management**: Centralized state with Zustand stores
3. **API Layer**: Abstracted API calls with service modules
4. **Type Safety**: Comprehensive TypeScript coverage
5. **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks

### Data Flow

1. User interacts with UI components
2. Components dispatch actions to Zustand stores
3. Stores manage state and call API services
4. API services communicate with backend endpoints
5. Backend processes requests and returns responses
6. UI updates based on state changes

## 🤖 Models & Data Usage

### AI Models

**Primary Evaluation Model**
- **Model**: GPT-4 / Claude 3 (specify actual model)
- **Purpose**: Application evaluation, scoring, and justification generation
- **License**: Commercial API usage under provider's terms
- **Data Processing**: Text analysis, criteria matching, scoring algorithms

**Document Processing**
- **OCR/Text Extraction**: For PDF and image processing
- **NLP Models**: For entity extraction and semantic analysis

### Data Handling

**Data Types Processed**:
- Application forms (text)
- Supporting documents (PDFs, images)
- External URLs (web scraping)
- Structured data (JSON, CSV)

**Data Privacy**:
- All data processing follows GDPR/CCPA compliance
- No permanent storage of sensitive personal information
- Encrypted data transmission (HTTPS/TLS)
- User data deletion upon request

**Third-Party Services**:
- AI Model Provider (OpenAI/Anthropic/Other)
- Cloud Storage (AWS S3/Google Cloud Storage)
- Analytics (if applicable)
- Authentication Provider

### Licensing

- **Application Code**: [Specify license - MIT/Apache/Proprietary]
- **Dependencies**: See package.json for individual licenses
- **AI Model Usage**: Subject to provider's commercial terms
- **Data Processing**: Compliant with applicable data protection laws

## ⚠️ Known Limitations & Risks

### Technical Limitations

1. **Scalability**
   - Current architecture supports up to X concurrent evaluations
   - API rate limits may affect bulk processing
   - Large file uploads limited to XMB

2. **Model Limitations**
   - AI evaluations are probabilistic, not deterministic
   - May exhibit bias present in training data
   - Context window limitations for very long applications
   - Cannot process certain file formats

3. **Browser Compatibility**
   - Optimized for modern browsers (Chrome, Firefox, Safari, Edge)
   - Limited support for Internet Explorer
   - Some features require JavaScript enabled

### Operational Risks

1. **Data Security**
   - Dependency on third-party AI providers
   - Potential for data breaches (mitigated by encryption)
   - API key exposure risks

2. **Compliance Risks**
   - Must ensure compliance with local data protection laws
   - AI decision-making regulations vary by jurisdiction
   - Regular audits recommended for bias detection

3. **Business Continuity**
   - Dependency on external API services
   - Need for fallback mechanisms during outages
   - Regular backups required

### Mitigation Strategies

- Regular security audits and penetration testing
- Bias detection and correction mechanisms
- Human-in-the-loop validation for critical decisions
- Comprehensive error handling and fallback systems
- Regular model evaluation and retraining
- Clear communication about AI involvement in decisions

## 👥 Team & Contact Information

### Core Development Team

**Project Lead**
- Name: [Team Lead Name]
- Email: lead@gradix.ai
- GitHub: @username

**Engineering Team**
- Frontend Lead: [Name] - frontend@gradix.ai
- Backend Lead: [Name] - backend@gradix.ai
- AI/ML Engineer: [Name] - ml@gradix.ai
- DevOps Engineer: [Name] - devops@gradix.ai

### Support Channels

- **Technical Support**: support@gradix.ai
- **Sales Inquiries**: sales@gradix.ai
- **General Questions**: hello@gradix.ai
- **Bug Reports**: Create an issue on [GitHub](https://github.com/your-org/gradix/issues)
- **Feature Requests**: [Feature Request Form](link-to-form)

### Community

- **Documentation**: [https://docs.gradix.ai](https://docs.gradix.ai)
- **Discord**: [Join our community](discord-link)
- **Twitter**: [@gradix_ai](https://twitter.com/gradix_ai)
- **LinkedIn**: [Gradix Company Page](linkedin-link)

### Parent Organization

**BlockSurvey**
- Website: [https://blocksurvey.io](https://blocksurvey.io)
- Email: contact@blocksurvey.io
- Address: [Company Address]

### Legal

- **Terms of Service**: [https://gradix.ai/terms](https://gradix.ai/terms)
- **Privacy Policy**: [https://gradix.ai/privacy](https://gradix.ai/privacy)
- **Data Processing Agreement**: Available upon request

---

*Last updated: [Current Date]*
*Version: 1.0.0*

## 📚 Additional Resources

### Development Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

### Deployment

**Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Docker**
```bash
# Build Docker image
docker build -t gradix .

# Run container
docker run -p 3000:3000 gradix
```

**Other Platforms**
- AWS Amplify
- Netlify
- Railway
- Render

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [License Type] - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the Gradix Team**
