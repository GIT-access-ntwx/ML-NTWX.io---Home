import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  cta?: string;
}

export interface ROIDataPoint {
  month: string;
  buildCost: number;
  rentCost: number;
}