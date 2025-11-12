#!/bin/bash

# Colors for terminal output
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${PURPLE}╔════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║  🌟 New Blog Post Creator 🌟         ║${NC}"
echo -e "${PURPLE}╔════════════════════════════════════════╝${NC}"
echo ""

# Get post title
echo -e "${CYAN}📝 Enter post title:${NC}"
read -r title

# Get categories (comma-separated)
echo -e "${CYAN}🏷️  Enter categories (comma-separated, e.g., Tech,Tutorial):${NC}"
read -r categories

# Convert title to filename format
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')
date=$(date +%Y-%m-%d)
filepath="_posts/${date}-${filename}.md"

# Convert categories to YAML array format
IFS=',' read -ra CAT_ARRAY <<< "$categories"
yaml_categories="["
for i in "${!CAT_ARRAY[@]}"; do
    cat="${CAT_ARRAY[$i]}"
    cat=$(echo "$cat" | xargs) # trim whitespace
    if [ $i -eq 0 ]; then
        yaml_categories+="$cat"
    else
        yaml_categories+=", $cat"
    fi
done
yaml_categories+="]"

# Create the post file
cat > "$filepath" << EOF
---
layout: mypost
title: $title
categories: $yaml_categories
---

Write your post content here...

## Example Heading

Your content goes here. You can use:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Code blocks
- Images: ![alt text](image.jpg)

\`\`\`javascript
// Code example
console.log('Hello World!');
\`\`\`

EOF

echo ""
echo -e "${PURPLE}✨ Success! Post created at:${NC}"
echo -e "${CYAN}$filepath${NC}"
echo ""
echo -e "${CYAN}📋 Quick commands:${NC}"
echo "  Open in nano:  nano $filepath"
echo "  Open in vim:   vim $filepath"
echo "  Open in code:  code $filepath"
echo ""
echo -e "${CYAN}🚀 To preview your blog:${NC}"
echo "  ./blog.sh run"
echo ""
