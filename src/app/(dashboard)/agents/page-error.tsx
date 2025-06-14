"use client";
// No use in this scenario as we use the ErrorBoundary

import { AgentsViewError } from '@/modules/agents/ui/views/agents-view';
import React from 'react'

const ErrorPage = () => {
  return (
    <AgentsViewError  />
  );
};

export default ErrorPage