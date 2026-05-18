import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface ApproachItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface NavLink {
  label: string;
  href: string;
}

export type Page = 'home' | 'about' | 'linkedin';
