# Task Management Dashboard

A modern, responsive task management application built with Next.js, React, and Chakra UI. Features a intuitive kanban board with drag-and-drop functionality, comprehensive task creation, and a collapsible sidebar navigation.

![Task Management Dashboard](https://img.shields.io/badge/Next.js-15.5.3-black) ![React](https://img.shields.io/badge/React-19.1.0-blue) ![Chakra UI](https://img.shields.io/badge/Chakra%20UI-Latest-teal) ![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)

## ✨ Features

### 🎯 Task Management

- **Kanban Board View**: Drag-and-drop tasks between To Do, In Progress, and Complete columns
- **List View**: Alternative table-style view for task management
- **Task Creation**: Comprehensive modal with form validation using React Hook Form + Zod
- **Task Details**: Title, description, dates, priority levels, and assignee management
- **Persistent Storage**: All tasks saved to localStorage with automatic persistence

### 🎨 User Interface

- **Modern Design**: Clean, professional interface with Chakra UI components
- **Responsive Layout**: Desktop-optimized with mobile fallback
- **Collapsible Sidebar**: Smooth animations with icon-only and full modes
- **Drag-and-Drop**: Intuitive task movement with visual feedback
- **Search & Filter**: Find tasks quickly with search and status filtering

### 🛠 Technical Features

- **Type Safety**: Full TypeScript implementation
- **Form Validation**: Zod schema validation with error handling
- **State Management**: React hooks with custom persistence layer
- **Modular Architecture**: Separated components for maintainability
- **Performance**: Optimized rendering with React memoization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ashiruhammed/nextjs-frontend
   cd nextjs-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Creating Tasks

1. Click the **"+ Add Task"** button in the header
2. Fill in the task details:
   - **Title**: Task name (required)
   - **Status**: To Do, In Progress, or Complete
   - **Dates**: Start and end dates with calendar picker
   - **Priority**: Low, Medium, Important, or Urgent
   - **Assignees**: Select from available team members
   - **Description**: Optional task details
3. Click **"Create Task"** to save

### Managing Tasks

- **Drag & Drop**: Grab any task card and drag it to a different column to change status
- **View Modes**: Toggle between Kanban and List views using the header buttons
- **Search**: Use the search bar to find specific tasks
- **Filter**: Filter tasks by status (All, To Do, In Progress, Complete)

### Navigation

- **Sidebar**: Access different sections of the application
- **Collapse**: Click the chevron icon to collapse the sidebar for more space
- **Mobile**: Sidebar automatically becomes a drawer on mobile devices

## 🏗 Project Structure

```
nextjs-frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main dashboard page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── dashboard-layout.tsx   # Main layout with sidebar
│   │   ├── task/                 # Task-related components
│   │   │   ├── TaskCard.tsx      # Individual task card
│   │   │   ├── TaskHeader.tsx    # Dashboard header
│   │   │   ├── SearchBar.tsx     # Search and filters
│   │   │   ├── KanbanView.tsx    # Kanban board layout
│   │   │   ├── ListView.tsx      # List table view
│   │   │   └── CreateTaskModal.tsx # Task creation modal
│   │   └── ui/
│   │       └── DatePicker.tsx    # Custom date picker
│   ├── types/
│   │   └── task.ts               # TypeScript interfaces
│   ├── data/
│   │   ├── mockData.ts           # Sample tasks and config
│   │   └── mockUsers.ts          # Sample user data
│   ├── schemas/
│   │   └── taskSchema.ts         # Zod validation schemas
│   └── hooks/
│       └── useTaskPersistence.ts # localStorage persistence
├── components/
│   └── icons/                    # Custom icon components
├── public/                       # Static assets
└── README.md
```

## 🛠 Technologies Used

### Core Framework

- **Next.js 15.5.3**: React framework with App Router
- **React 19.1.0**: UI library with latest features
- **TypeScript**: Type safety and better developer experience

### UI & Styling

- **Chakra UI**: Component library for consistent design
- **React Icons**: Icon library for UI elements
- **Iconsax React**: Additional icon set

### Form & Validation

- **React Hook Form**: Form state management
- **Zod**: Schema validation for type-safe forms
- **@hookform/resolvers**: Integration between RHF and Zod

### Drag & Drop

- **@dnd-kit/core**: Modern drag-and-drop toolkit
- **@dnd-kit/sortable**: Sortable list functionality
- **@dnd-kit/utilities**: Helper utilities for drag-and-drop

### Development Tools

- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Tailwind CSS**: Utility-first CSS framework

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type Checking
npm run type-check   # Run TypeScript compiler
```

## 🎨 Design System

### Responsive Breakpoints

- **Mobile**: `base` (0px)
- **Tablet**: `md` (768px)
- **Desktop**: `lg` (1024px)
- **Large Desktop**: `xl` (1280px)

### Customization

- **Tasks**: Edit `src/data/mockData.ts` to modify sample tasks
- **Users**: Edit `src/data/mockUsers.ts` to change assignee options
- **Colors**: Modify priority colors in `src/data/mockData.ts`
- **Validation**: Update schemas in `src/schemas/taskSchema.ts`

## 📱 Mobile Support

This application is optimized for desktop use but includes mobile responsiveness:

- **Desktop**: Full kanban board with drag-and-drop
- **Mobile**: Automatically switches to list view with touch-friendly interface
- **Tablet**: Responsive layout adapts to screen size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Other Platforms

- **Netlify**: Drag and drop the `out` folder after `npm run build`
- **GitHub Pages**: Use `next export` for static deployment
- **Docker**: Create a Dockerfile for containerized deployment

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time collaboration with WebSockets
- [ ] Task comments and activity history
- [ ] File attachments for tasks
- [ ] Team management and permissions
- [ ] Advanced filtering and sorting options
- [ ] Dashboard analytics and reporting
- [ ] Integration with external services (Slack, email)
- [ ] Offline support with service workers
- [ ] Dark mode theme

## 📞 Support

For questions, issues, or feature requests:

- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ using Next.js and Chakra UI**
