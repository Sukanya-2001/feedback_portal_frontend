"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Add mock password for profile checks
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  website?: string;
  contact?: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  projectId: string;
  projectName: string;
  userName: string;
  guestEmail?: string; // Guest user email (optional but required for developer replies)
  rating: number;
  comment: string;
  isSaved?: boolean; // Toggles bookmark status
  reply?: {          // Single response from project owner
    comment: string;
    createdAt: string;
  };
  createdAt: string;
}

interface MockDatabaseContextType {
  currentUser: User | null;
  projects: Project[];
  feedbacks: Feedback[];
  login: (email: string, password?: string) => boolean;
  signup: (name: string, email: string, password?: string) => boolean;
  logout: () => void;
  updateProfile: (name: string, email: string, password?: string) => void;
  createProject: (name: string, description: string, image: string, tags: string[], website?: string, contact?: string) => void;
  updateProject: (projectId: string, name: string, description: string, image: string, tags: string[], website?: string, contact?: string) => void;
  deleteProject: (projectId: string) => void;
  addFeedback: (projectId: string, userName: string, guestEmail: string | undefined, rating: number, comment: string) => void;
  toggleSaveFeedback: (feedbackId: string) => void;
  replyToFeedback: (feedbackId: string, replyComment: string) => void;
}

const MockDatabaseContext = createContext<MockDatabaseContextType | undefined>(undefined);

// Default users for mock database login
const INITIAL_USERS: User[] = [
  { id: "user-1", name: "Alice Smith", email: "alice@gmail.com", password: "alice123" },
  { id: "user-2", name: "Bob Jones", email: "bob@gmail.com", password: "bob123" },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "TaskFlow Manager",
    description: "A beautiful, lightweight task manager designed for fast-paced agile teams. Features real-time sync, customizable Kanban boards, and clean visual progress charts.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    tags: ["Productivity", "SaaS", "Collab"],
    website: "https://taskflow.io",
    contact: "hello@taskflow.io",
    userId: "user-1",
    userName: "Alice Smith",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-2",
    name: "FitPulse Workout Tracker",
    description: "Keep track of your strength routine, running logs, and custom nutrition plans. Focuses on minimal input latency so you can log your sets in seconds between breaks.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Health", "Tech"],
    website: "https://fitpulse.app",
    contact: "support@fitpulse.app",
    userId: "user-2",
    userName: "Bob Jones",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-3",
    name: "Apex Code Academy",
    description: "An interactive e-learning platform with gamified tutorials for learning modern web standards like TypeScript, Next.js, and CSS grid layout models.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    tags: ["Education", "Tech"],
    website: "https://apexcode.academy",
    contact: "info@apexcode.academy",
    userId: "user-1",
    userName: "Alice Smith",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const INITIAL_FEEDBACKS: Feedback[] = [
  {
    id: "feed-1",
    projectId: "proj-1",
    projectName: "TaskFlow Manager",
    userName: "Jane Miller",
    guestEmail: "jane@gmail.com",
    rating: 5,
    comment: "The interface is absolutely stunning. Navigating boards is very fluid, and the micro-animations when dragging tasks feel so responsive!",
    isSaved: true, // Bookmarked by default
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "feed-2",
    projectId: "proj-1",
    projectName: "TaskFlow Manager",
    userName: "Developer Dave",
    guestEmail: "dave@dev.com",
    rating: 4,
    comment: "Excellent startup times. I'd love to see git integration to automatically close tickets on git commit push events.",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "feed-3",
    projectId: "proj-2",
    projectName: "FitPulse Workout Tracker",
    userName: "GymRat99",
    guestEmail: "gymrat@fit.com",
    rating: 5,
    comment: "Loving the clean layout and white design! So easy to use when working out. Great job!",
    reply: {
      comment: "Thank you for the review! I'm glad you liked the light theme!",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "feed-4",
    projectId: "proj-2",
    projectName: "FitPulse Workout Tracker",
    userName: "Sarah Connor",
    guestEmail: "sarah@connor.com",
    rating: 3,
    comment: "Solid app, but some charts fail to update when screen orientation changes on mobile browsers. Please fix.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export function MockDatabaseProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(INITIAL_FEEDBACKS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("fb_portal_users_list");
      const storedUser = localStorage.getItem("fb_portal_user");
      const storedProjects = localStorage.getItem("fb_portal_projects");
      const storedFeedbacks = localStorage.getItem("fb_portal_feedbacks");

      if (storedUsers) setUsers(JSON.parse(storedUsers));
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
      if (storedProjects) setProjects(JSON.parse(storedProjects));
      if (storedFeedbacks) setFeedbacks(JSON.parse(storedFeedbacks));
    } catch (e) {
      console.error("Failed to load mock database state", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fb_portal_users_list", JSON.stringify(users));
      if (currentUser) {
        localStorage.setItem("fb_portal_user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("fb_portal_user");
      }
      localStorage.setItem("fb_portal_projects", JSON.stringify(projects));
      localStorage.setItem("fb_portal_feedbacks", JSON.stringify(feedbacks));
    } catch (e) {
      console.error("Failed to save mock database state", e);
    }
  }, [users, currentUser, projects, feedbacks, isLoaded]);

  const login = (email: string, password?: string): boolean => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      // If password check is simulated
      if (password && existing.password && existing.password !== password) {
        return false;
      }
      setCurrentUser(existing);
      return true;
    }

    // Auto-create new user if not found (simulated guest signup flow)
    const name = email.split("@")[0];
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: capitalizedName,
      email,
      password: password || "password123",
    };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const signup = (name: string, email: string, password?: string): boolean => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: password || "password123",
    };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (name: string, email: string, password?: string) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      name,
      email,
      password: password || currentUser.password,
    };

    // Update current user
    setCurrentUser(updatedUser);
    
    // Update users list
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));

    // Update userName on all projects created by this user
    setProjects(prev => prev.map(p => p.userId === currentUser.id ? { ...p, userName: name } : p));
  };

  const createProject = (
    name: string,
    description: string,
    image: string,
    tags: string[],
    website?: string,
    contact?: string
  ) => {
    if (!currentUser) return;
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name,
      description,
      image: image.trim() || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      tags: tags.length > 0 ? tags : ["General"],
      website,
      contact,
      userId: currentUser.id,
      userName: currentUser.name,
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (
    projectId: string,
    name: string,
    description: string,
    image: string,
    tags: string[],
    website?: string,
    contact?: string
  ) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          name,
          description,
          image: image.trim() || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
          tags: tags.length > 0 ? tags : ["General"],
          website,
          contact,
        };
      }
      return p;
    }));

    // Update project name inside feedbacks too
    setFeedbacks(prev => prev.map(f => f.projectId === projectId ? { ...f, projectName: name } : f));
  };

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setFeedbacks((prev) => prev.filter((f) => f.projectId !== projectId));
  };

  const addFeedback = (projectId: string, userName: string, guestEmail: string | undefined, rating: number, comment: string) => {
    const targetProject = projects.find((p) => p.id === projectId);
    const projectName = targetProject ? targetProject.name : "Unknown Project";
    
    const newFeedback: Feedback = {
      id: `feed-${Date.now()}`,
      projectId,
      projectName,
      userName: userName.trim() || "Anonymous Guest",
      guestEmail: guestEmail?.trim() || undefined,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  const toggleSaveFeedback = (feedbackId: string) => {
    setFeedbacks(prev => prev.map(f => f.id === feedbackId ? { ...f, isSaved: !f.isSaved } : f));
  };

  const replyToFeedback = (feedbackId: string, replyComment: string) => {
    setFeedbacks(prev => prev.map(f => {
      if (f.id === feedbackId) {
        return {
          ...f,
          reply: {
            comment: replyComment,
            createdAt: new Date().toISOString()
          }
        };
      }
      return f;
    }));
  };

  return (
    <MockDatabaseContext.Provider
      value={{
        currentUser,
        projects,
        feedbacks,
        login,
        signup,
        logout,
        updateProfile,
        createProject,
        updateProject,
        deleteProject,
        addFeedback,
        toggleSaveFeedback,
        replyToFeedback,
      }}
    >
      {children}
    </MockDatabaseContext.Provider>
  );
}

export function useMockDatabase() {
  const context = useContext(MockDatabaseContext);
  if (context === undefined) {
    throw new Error("useMockDatabase must be used within a MockDatabaseProvider");
  }
  return context;
}
