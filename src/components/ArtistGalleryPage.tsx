import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Instagram, ChevronDown, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import logo from 'figma:asset/8d811ca05c847b26d58e972726d1fedb6e42a47d.png';
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';

interface ArtistGalleryPageProps {
  artistId: number;
  onBack: () => void;
  onArtistChange: (artistId: number) => void;
}

interface GalleryImage {
  id: number;
  url: string;
  title: string;
}

// Artist gallery data
const artistGalleries: Record<number, {
  name: string;
  style: string;
  bio: string;
  instagram: string;
  photo: string;
  images: GalleryImage[];
}> = {
  1: {
    name: 'Elena Martinez',
    style: 'Fine Line & Minimalist',
    bio: 'Specializing in delicate fine-line work and minimalist designs with over 10 years of experience.',
    instagram: '@elena.ink',
    photo: 'https://images.unsplash.com/photo-1761957381251-af434afd2922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB0YXR0b28lMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQyNTU1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Fine Line Floral' },
      { id: 2, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Minimalist Design' },
      { id: 3, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Delicate Line Work' },
      { id: 4, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Fine Line Portrait' },
      { id: 5, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Abstract Minimal' },
      { id: 6, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Botanical Fine Line' },
    ]
  },
  2: {
    name: 'Marcus Weber',
    style: 'Realism & Portraits',
    bio: 'Master of hyper-realistic portraits and detailed black & grey work. Award-winning artist.',
    instagram: '@marcus.realism',
    photo: 'https://images.unsplash.com/photo-1642791112868-60c92b7b9eef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGF0dG9vJTIwYXJ0aXN0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MjU1NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Realistic Portrait' },
      { id: 2, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Black & Grey Realism' },
      { id: 3, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Detailed Portrait Work' },
      { id: 4, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Hyper Realism' },
      { id: 5, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Portrait Detail' },
      { id: 6, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Award Winning Piece' },
    ]
  },
  3: {
    name: 'Yuki Tanaka',
    style: 'Japanese Traditional',
    bio: 'Traditional Japanese tattooing with contemporary flair. Trained in Tokyo and Berlin.',
    instagram: '@yuki.irezumi',
    photo: 'https://images.unsplash.com/photo-1758796305225-edcd03933430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHRhdHRvbyUyMGFydGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDI1NTU1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Traditional Irezumi' },
      { id: 2, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Japanese Dragon' },
      { id: 3, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Koi Fish Sleeve' },
      { id: 4, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Cherry Blossom' },
      { id: 5, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Samurai Warrior' },
      { id: 6, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Phoenix Rising' },
    ]
  },
  4: {
    name: 'Sofia Andersson',
    style: 'Geometric & Dotwork',
    bio: 'Creating intricate geometric patterns and mandala designs with precision and symmetry.',
    instagram: '@sofia.geometric',
    photo: 'https://images.unsplash.com/photo-1730573520193-6ae0b1070621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDI0MzI5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Geometric Mandala' },
      { id: 2, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Sacred Geometry' },
      { id: 3, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Dotwork Pattern' },
      { id: 4, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Symmetrical Design' },
      { id: 5, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Ornamental Dotwork' },
      { id: 6, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Precision Geometry' },
    ]
  },
  5: {
    name: 'Marcus Weber',
    style: 'Realism & Portraits',
    bio: 'Master of hyper-realistic portraits and detailed black & grey work. Award-winning artist.',
    instagram: '@marcus.realism',
    photo: 'https://images.unsplash.com/photo-1642791112868-60c92b7b9eef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGF0dG9vJTIwYXJ0aXN0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MjU1NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Realistic Portrait' },
      { id: 2, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Black & Grey Realism' },
      { id: 3, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Detailed Portrait Work' },
      { id: 4, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Hyper Realism' },
      { id: 5, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Portrait Detail' },
      { id: 6, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Award Winning Piece' },
    ]
  },
  6: {
    name: 'Yuki Tanaka',
    style: 'Japanese Traditional',
    bio: 'Traditional Japanese tattooing with contemporary flair. Trained in Tokyo and Berlin.',
    instagram: '@yuki.irezumi',
    photo: 'https://images.unsplash.com/photo-1758796305225-edcd03933430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHRhdHRvbyUyMGFydGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDI1NTU1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Traditional Irezumi' },
      { id: 2, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Japanese Dragon' },
      { id: 3, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Koi Fish Sleeve' },
      { id: 4, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Cherry Blossom' },
      { id: 5, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Samurai Warrior' },
      { id: 6, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Phoenix Rising' },
    ]
  },
  7: {
    name: 'Sofia Andersson',
    style: 'Geometric & Dotwork',
    bio: 'Creating intricate geometric patterns and mandala designs with precision and symmetry.',
    instagram: '@sofia.geometric',
    photo: 'https://images.unsplash.com/photo-1730573520193-6ae0b1070621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDI0MzI5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Geometric Mandala' },
      { id: 2, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Sacred Geometry' },
      { id: 3, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Dotwork Pattern' },
      { id: 4, url: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Symmetrical Design' },
      { id: 5, url: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Ornamental Dotwork' },
      { id: 6, url: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Precision Geometry' },
    ]
  }
};

export function ArtistGalleryPage({ artistId, onBack, onArtistChange }: ArtistGalleryPageProps) {
  const artist = artistGalleries[artistId];
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Refs for parallax
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for header parallax
  const { scrollYProgress: headerScrollProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  // Scroll progress for gallery parallax
  const { scrollYProgress: galleryScrollProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });
  
  // Scroll progress for CTA parallax
  const { scrollYProgress: ctaScrollProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax effects
  const headerY = useTransform(headerScrollProgress, [0, 1], [0, -100]);
  const headerOpacity = useTransform(headerScrollProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const photoScale = useTransform(headerScrollProgress, [0, 1], [1, 0.8]);
  
  const galleryY = useTransform(galleryScrollProgress, [0, 1], [50, -50]);
  const galleryOpacity = useTransform(galleryScrollProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  
  const ctaY = useTransform(ctaScrollProgress, [0, 1], [100, -50]);
  const ctaOpacity = useTransform(ctaScrollProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  
  // Get all artists for dropdown
  const allArtists = Object.entries(artistGalleries).map(([id, data]) => ({
    id: Number(id),
    name: data.name
  }));

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation functions
  const handlePrevious = () => {
    if (selectedImageIndex !== null && artist) {
      const newIndex = selectedImageIndex === 0 ? artist.images.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && artist) {
      const newIndex = selectedImageIndex === artist.images.length - 1 ? 0 : selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, artist]);

  const selectedImage = selectedImageIndex !== null && artist ? artist.images[selectedImageIndex] : null;

  if (!artist) {
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-playfair text-gold text-4xl mb-4">Artist Not Found</h2>
          <Button onClick={onBack} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
            <ArrowLeft className="mr-2" size={18} />
            Back to Artists
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#151515] z-[100]">
        <motion.div
          className="h-full bg-gold shadow-[0_0_10px_rgba(200,157,83,0.5)]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#151515]/95 backdrop-blur-sm border-b border-gold/20 mt-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Back Button */}
            <Button 
              onClick={onBack} 
              variant="ghost" 
              className="text-gold hover:text-gold/80 hover:bg-gold/10"
            >
              <ArrowLeft className="mr-2" size={18} />
              <span className="hidden sm:inline">Back to Artists</span>
            </Button>

            {/* Center: Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img 
                src={logo} 
                alt="99 Roots Studio" 
                className="hidden sm:block h-12 sm:h-16 md:h-20 w-auto"
              />
            </div>

            {/* Right: Artist Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-300 text-sm sm:text-base"
              >
                <span className="hidden sm:inline">{artist.name}</span>
                <span className="sm:hidden">Artists</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute right-0 top-full mt-2 w-48 sm:w-56 bg-[#151515] border border-gold/40 transition-all duration-300 z-50 shadow-2xl ${
                isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                {allArtists.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      onArtistChange(a.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02] hover:pl-6 ${
                      a.id === artistId
                        ? 'bg-gold/20 text-gold border-l-2 border-gold'
                        : 'text-white/80 hover:bg-gold/10 hover:text-gold hover:border-l-2 hover:border-gold/50'
                    }`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Artist Header */}
      <section ref={headerRef} className="py-12 sm:py-16 lg:py-24 border-b border-gold/20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
          >
            {/* Artist Photo */}
            <motion.div
              style={{ scale: photoScale }}
              className="mb-8 sm:mb-10 flex justify-center"
            >
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
                <div className="absolute inset-0 border-2 border-gold/40 rounded-full"></div>
                <img
                  src={artist.photo}
                  alt={artist.name}
                  className="w-full h-full object-cover rounded-full border-4 border-black shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gold rounded-full border-4 border-black"></div>
              </div>
            </motion.div>

            <h1 className="font-playfair text-gold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
              {artist.name}
            </h1>
            <p className="text-white/80 text-xl sm:text-2xl md:text-3xl mb-6">
              {artist.style}
            </p>
            <p className="font-inter text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              {artist.bio}
            </p>
            
            {/* Instagram Link */}
            <a
              href={`https://instagram.com/${artist.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
            >
              <Instagram size={20} />
              <span className="font-inter">{artist.instagram}</span>
            </a>

            {/* Decorative Elements */}
            <div className="mt-12 flex justify-center items-center gap-4">
              <div className="h-px w-16 bg-gold/40"></div>
              <div className="w-2 h-2 rotate-45 border border-gold/60"></div>
              <div className="h-px w-16 bg-gold/40"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={galleryRef} className="py-12 sm:py-16 lg:py-24 overflow-hidden">
        <motion.div 
          style={{ y: galleryY, opacity: galleryOpacity }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {artist.images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group relative aspect-square overflow-hidden bg-[#151515] border border-gold/20 group"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                />
                {/* Zoom Icon Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-12 sm:py-16 lg:py-24 border-t border-gold/20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            style={{ y: ctaY, opacity: ctaOpacity }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-playfair text-gold text-3xl sm:text-4xl md:text-5xl mb-6">
              Book with {artist.name}
            </h2>
            <p className="font-inter text-white/70 text-base sm:text-lg mb-8">
              Ready to get your own custom piece? Schedule a consultation to discuss your vision.
            </p>
            <a
              href="https://calendly.com/99rootsstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 sm:px-12 py-3 sm:py-4 border-2 border-gold text-gold font-inter uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 hover:bg-gold hover:text-black touch-manipulation"
            >
              Book Consultation
            </a>
          </motion.div>
        </div>
      </section>

      {/* Image Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="w-screen h-screen max-w-none max-h-none sm:max-w-[95vw] sm:max-h-[95vh] sm:w-auto sm:h-auto p-0 bg-black border-0 sm:border-2 border-gold/40">
          <DialogTitle className="sr-only">
            {selectedImage?.title || 'Tattoo Image'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Full size view of {selectedImage?.title || 'tattoo artwork'}
          </DialogDescription>
          {selectedImage && (
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-4 right-4 sm:-top-12 sm:right-0 sm:-right-12 text-gold hover:text-gold/80 transition-colors z-50 bg-black/80 p-2 border border-gold/40"
              >
                <X size={24} />
              </button>

              {/* Invisible Navigation Zones */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-0 bottom-0 w-1/3 z-40 cursor-w-resize"
                aria-label="Previous image"
              />
              <button
                onClick={handleNext}
                className="absolute right-0 top-0 bottom-0 w-1/3 z-40 cursor-e-resize"
                aria-label="Next image"
              />

              {/* Full Size Image */}
              <div className="relative w-screen h-screen sm:max-h-[90vh] sm:max-w-[90vw] sm:w-auto sm:h-auto flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain sm:max-h-[90vh] sm:w-auto sm:h-auto"
                />
              </div>

              {/* Image Title & Counter */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 sm:p-6 text-center">
                <p className="font-inter text-gold text-sm sm:text-lg md:text-xl mb-1 sm:mb-2">
                  {selectedImage.title}
                </p>
                <p className="font-inter text-white/60 text-xs sm:text-sm">
                  {(selectedImageIndex ?? 0) + 1} / {artist.images.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}