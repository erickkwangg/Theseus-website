#!/bin/bash

echo "🚀 Setting up Theseus project..."

# Fix npm cache permissions (requires your password)
echo "Fixing npm cache permissions..."
sudo chown -R 501:20 "/Users/ericwang/.npm"

# Navigate to project directory
cd /Users/ericwang/Documents/eric_theseus_delivery

# Install dependencies
echo "Installing dependencies..."
npm install

# Start development server
echo "Starting development server..."
npm run dev

