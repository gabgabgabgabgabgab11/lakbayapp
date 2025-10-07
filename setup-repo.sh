#!/bin/bash
# Script to create MainLakbay repository on GitHub

echo "Creating MainLakbay repository..."
gh repo create MainLakbay --public --source=. --remote=origin

echo "Repository created successfully!"
echo "Remote 'origin' now points to MainLakbay"
