# GitHub Pages Deployment Guide

## Current Status

This repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

## Deployment Configuration

### Files Added

1. **`.nojekyll`** - Prevents GitHub Pages from processing the site with Jekyll
2. **`.github/workflows/deploy.yml`** - GitHub Actions workflow for automated deployment

### How It Works

The deployment workflow automatically:
- Triggers on every push to `main` or `master` branches
- Can be manually triggered via GitHub Actions UI (workflow_dispatch)
- Checks out the repository code
- Configures GitHub Pages settings
- Uploads the entire repository as a Pages artifact
- Deploys to GitHub Pages

## Setup Instructions

### 1. Enable GitHub Pages

Before the deployment will work, you need to enable GitHub Pages in the repository settings:

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Save the settings

### 2. Merge the Deployment Configuration

This branch (`claude/investigate-deployment-issue-017NdJDUE1PvA8CPuHqfdorj`) contains the deployment configuration. To activate it:

1. Create a Pull Request to merge this branch into `main`
2. Review and merge the PR
3. The workflow will automatically run on the next push to `main`

### 3. Monitor the Deployment

After pushing to main:

1. Go to the **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Click on it to see the progress
4. Once complete, your site will be live at: `https://YOUR_USERNAME.github.io/harris/`

## Repository Structure

```
harris/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Deployment workflow
├── .nojekyll                   # Prevents Jekyll processing
├── index.html                  # Main HTML file
├── styles.css                  # Stylesheet
├── script.js                   # JavaScript functionality
└── README.md                   # Project documentation
```

## Troubleshooting

### Deployment Fails

If the deployment fails:

1. Check the **Actions** tab for error messages
2. Ensure GitHub Pages is enabled in Settings → Pages
3. Verify the workflow file syntax is correct
4. Check that all required permissions are granted

### Site Not Updating

If changes don't appear on the live site:

1. Verify the workflow completed successfully in the Actions tab
2. Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
3. Wait a few minutes for GitHub's CDN to update

### 404 Errors for CSS/JS

If the site loads but styles/scripts are missing:

1. Verify `.nojekyll` file exists in the repository root
2. Check that `styles.css` and `script.js` paths are relative (not absolute)
3. Ensure all files are committed and pushed

## Workflow Details

### Triggers

- **Push** to `main` or `master` branches
- **Manual dispatch** via GitHub Actions UI

### Permissions

The workflow has:
- `contents: read` - Read repository files
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Required for Pages deployment

### Actions Used

- `actions/checkout@v4` - Latest checkout action
- `actions/configure-pages@v4` - Configure GitHub Pages
- `actions/upload-pages-artifact@v3` - Upload site files
- `actions/deploy-pages@v4` - Deploy to Pages

## Making Changes

After the initial setup, any push to the `main` branch will automatically trigger a new deployment:

1. Make your changes locally
2. Commit your changes
3. Push to `main` branch
4. GitHub Actions will automatically deploy

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

## Security

- The deployment uses OIDC for authentication (no secrets needed)
- All actions are from official GitHub repositories
- The workflow only deploys on push to main/master (protected branches recommended)

## Support

For issues with:
- **GitHub Pages**: See [GitHub Pages Documentation](https://docs.github.com/pages)
- **GitHub Actions**: See [GitHub Actions Documentation](https://docs.github.com/actions)
- **This repository**: Create an issue in the repository

---

**Last Updated**: November 19, 2025
**Configuration Version**: 1.0
