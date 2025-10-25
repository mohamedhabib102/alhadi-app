

import React from 'react';



export interface StatItem {
    id: number;
    value: number;        
    label: string;       
    IconComponent: React.ElementType; 
    prefix?: string;      
    suffix?: string;      
}