#!/bin/bash

echo "🚀 Personal Portfolio - GitHub Setup Helper"
echo "=========================================="
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Get repository name (default: personal-portfolio)
read -p "Enter repository name (default: personal-portfolio): " REPO_NAME
REPO_NAME=${REPO_NAME:-personal-portfolio}

echo ""
echo "📝 Repository Details:"
echo "Username: $GITHUB_USERNAME"
echo "Repository: $REPO_NAME"
echo "Full URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

# Confirm before proceeding
read -p "Is this correct? (y/N): " CONFIRM

if [[ $CONFIRM =~ ^[Yy]$ ]]; then
    echo ""
    echo "🔗 Setting up Git remote..."
    
    # Remove existing origin if exists
    git remote remove origin 2>/dev/null
    
    # Add new origin
    git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
    
    echo "✅ Git remote configured!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Create the repository on GitHub: https://github.com/new"
    echo "   - Repository name: $REPO_NAME"
    echo "   - Make it public"
    echo "   - Don't initialize with README"
    echo ""
    echo "2. Push your portfolio:"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "3. Enable GitHub Pages:"
    echo "   - Go to repository Settings > Pages"
    echo "   - Source: Deploy from branch 'main'"
    echo "   - Your site will be at: https://$GITHUB_USERNAME.github.io/$REPO_NAME"
    echo ""
    echo "🎉 Your portfolio will be live shortly!"
    
else
    echo "❌ Setup cancelled. Please run the script again with correct details."
fi