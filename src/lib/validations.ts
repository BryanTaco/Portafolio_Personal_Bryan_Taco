import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),

  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export const blogSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),

  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug must be less than 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),

  excerpt: z.string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(300, 'Excerpt must be less than 300 characters'),

  content: z.string()
    .min(50, 'Content must be at least 50 characters'),

  tags: z.array(z.string().max(50)).max(10, 'Maximum 10 tags allowed').optional(),

  published: z.boolean().optional(),
});

export const projectSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),

  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),

  technologies: z.array(z.string()).min(1, 'At least one technology required'),

  githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),

  liveUrl: z.string().url('Invalid live URL').optional().or(z.literal('')),

  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),

  featured: z.boolean().optional(),

  category: z.enum(['web', 'mobile', 'desktop', 'api', 'other']),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type BlogFormData = z.infer<typeof blogSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
