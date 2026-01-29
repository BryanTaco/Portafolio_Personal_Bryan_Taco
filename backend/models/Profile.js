import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Personal Information
  personalInfo: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    title: {
      type: String,
      required: [true, 'Professional title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters']
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters']
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.*/, 'Website must be a valid URL']
    },
    linkedin: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?linkedin\.com\/.*/, 'Must be a valid LinkedIn URL']
    },
    github: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?github\.com\/.*/, 'Must be a valid GitHub URL']
    },
    profileImage: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      maxlength: [500, 'Bio cannot exceed 500 characters']
    }
  },

  // Experience
  experience: [{
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    position: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Position cannot exceed 100 characters']
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters']
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      default: null // null means current position
    },
    description: {
      type: String,
      required: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    technologies: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    isCurrent: {
      type: Boolean,
      default: false
    }
  }],

  // Education
  education: [{
    institution: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Institution name cannot exceed 100 characters']
    },
    degree: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Degree cannot exceed 100 characters']
    },
    field: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Field of study cannot exceed 100 characters']
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      default: null
    },
    gpa: {
      type: Number,
      min: 0,
      max: 4.0
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    isCurrent: {
      type: Boolean,
      default: false
    }
  }],

  // Skills
  skills: {
    technical: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'intermediate'
      },
      category: {
        type: String,
        enum: ['frontend', 'backend', 'database', 'devops', 'mobile', 'other'],
        default: 'other'
      }
    }],
    soft: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'intermediate'
      }
    }],
    languages: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      proficiency: {
        type: String,
        enum: ['basic', 'conversational', 'fluent', 'native'],
        default: 'conversational'
      }
    }]
  },

  // Projects
  projects: [{
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Project title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    technologies: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    githubUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?github\.com\/.*/, 'Must be a valid GitHub URL']
    },
    liveUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.*/, 'Must be a valid URL']
    },
    image: {
      type: String,
      default: null
    },
    featured: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    }
  }],

  // Certifications
  certifications: [{
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Certification name cannot exceed 100 characters']
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Issuer name cannot exceed 100 characters']
    },
    issueDate: {
      type: Date,
      required: true
    },
    expiryDate: {
      type: Date,
      default: null
    },
    credentialId: {
      type: String,
      trim: true,
      maxlength: [50, 'Credential ID cannot exceed 50 characters']
    },
    credentialUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.*/, 'Must be a valid URL']
    }
  }],

  // Settings
  settings: {
    isPublic: {
      type: Boolean,
      default: true
    },
    showEmail: {
      type: Boolean,
      default: true
    },
    showPhone: {
      type: Boolean,
      default: false
    },
    allowContact: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
profileSchema.virtual('fullName').get(function() {
  return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`;
});

// Virtual for current position
profileSchema.virtual('currentPosition').get(function() {
  const currentExp = this.experience.find(exp => exp.isCurrent);
  return currentExp ? currentExp.position : null;
});

// Index for better performance
profileSchema.index({ 'personalInfo.email': 1 });
profileSchema.index({ 'settings.isPublic': 1 });

// Pre-save middleware to update current position flags
profileSchema.pre('save', function(next) {
  // Ensure only one experience is marked as current
  const currentExperiences = this.experience.filter(exp => exp.isCurrent);
  if (currentExperiences.length > 1) {
    // Keep only the most recent current experience
    this.experience.forEach((exp, index) => {
      if (exp.isCurrent && index !== this.experience.length - 1) {
        exp.isCurrent = false;
      }
    });
  }

  // Ensure only one education is marked as current
  const currentEducation = this.education.filter(edu => edu.isCurrent);
  if (currentEducation.length > 1) {
    this.education.forEach((edu, index) => {
      if (edu.isCurrent && index !== this.education.length - 1) {
        edu.isCurrent = false;
      }
    });
  }

  next();
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
