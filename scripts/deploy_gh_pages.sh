#!/bin/bash

set -e
echo "🚀 Starting build and deployment process..."


if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend directory not found. Are you in the project root?"
    exit 1
fi


cd frontend


if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in frontend directory"
    exit 1
fi


VERSION=$(node -p "require('./package.json').version")
if [ -z "$VERSION" ]; then
    echo "⚠️ Warning: Could not get version from package.json, using 'latest' instead"
    VERSION="latest"
fi


if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi



    echo "📦 Updating dependencies..."
    npx vitest



echo "🔨 Building the project..."
npm run build


if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi


cd ..


echo "📝 Committing the new build..."
git add frontend/dist -f
git commit -m "🚀 deploy: Deploy version ${VERSION}" || echo "No changes to commit"

echo "📦 Publishing frontend/dist folder to gh-pages branch..."


current_branch=$(git rev-parse --abbrev-ref HEAD)


if git subtree push --prefix frontend/dist origin gh-pages; then
    echo "✅ Successfully deployed to GitHub Pages!"
else
    echo "❌ Deployment failed. If you get a 'updates were rejected' error, try running:"
    echo "git push origin `git subtree split --prefix frontend/dist $current_branch`:gh-pages --force"
fi


echo "🔄 Pushing changes to remote..."
git push origin $current_branch

echo "✨ All done! Version ${VERSION} has been deployed to GitHub Pages and pushed to remote."
