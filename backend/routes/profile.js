import express from 'express';
import { body } from 'express-validator';
import {
  getProfile,
  updateProfile,
  getPublicProfile,
  updateProfileSettings,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  addProject,
  updateProject,
  deleteProject
} from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const experienceValidation = [
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('position').trim().notEmpty().withMessage('Position is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').optional().isISO8601().withMessage('Valid end date is required'),
  body('isCurrent').optional().isBoolean().withMessage('isCurrent must be a boolean')
];

const educationValidation = [
  body('institution').trim().notEmpty().withMessage('Institution is required'),
  body('degree').trim().notEmpty().withMessage('Degree is required'),
  body('field').trim().notEmpty().withMessage('Field of study is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').optional().isISO8601().withMessage('Valid end date is required'),
  body('isCurrent').optional().isBoolean().withMessage('isCurrent must be a boolean')
];

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Project title is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('technologies').optional().isArray().withMessage('Technologies must be an array'),
  body('githubUrl').optional().isURL().withMessage('Valid GitHub URL is required'),
  body('liveUrl').optional().isURL().withMessage('Valid live URL is required'),
  body('featured').optional().isBoolean().withMessage('Featured must be a boolean')
];

// Public routes
router.get('/public/:userId', getPublicProfile);

// Protected routes
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.put('/settings', protect, updateProfileSettings);

// Experience routes
router.post('/experience', protect, experienceValidation, addExperience);
router.put('/experience/:expId', protect, experienceValidation, updateExperience);
router.delete('/experience/:expId', protect, deleteExperience);

// Education routes
router.post('/education', protect, educationValidation, addEducation);
router.put('/education/:eduId', protect, educationValidation, updateEducation);
router.delete('/education/:eduId', protect, deleteEducation);

// Project routes
router.post('/projects', protect, projectValidation, addProject);
router.put('/projects/:projectId', protect, projectValidation, updateProject);
router.delete('/projects/:projectId', protect, deleteProject);

export default router;
