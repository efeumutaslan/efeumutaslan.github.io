# Efe's Dev Logs

A minimalistic dark blog with neon cyberpunk aesthetics, built on Jekyll and customized from [TMaize Blog](https://github.com/TMaize/tmaize-blog).

## Features

- **Neon Dark Theme** - Cyberpunk-inspired color palette with cyan, magenta, and purple accents
- **Enhanced Animations** - Interactive click effects with neon glow and rotation
- **Full-text Search** - Quick search through all posts
- **Responsive Design** - Works seamlessly on all devices
- **Category System** - Posts organized by SAP Logs, Technical Writing, and General categories
- **Lightweight** - No frameworks, fast loading times (<20KB)

## Theme Credits

Based on [TMaize Blog](https://github.com/TMaize/tmaize-blog) with significant customizations

## Local Development

Install Ruby and dependencies:

```bash
gem install bundler
bundle install
```

Run locally:

```bash
bundle exec jekyll serve --watch --host=127.0.0.1 --port=8080
```

## Writing Posts

Create posts in `_posts` directory with format `yyyy-MM-dd-post-title.md`:

```yaml
---
layout: mypost
title: Post Title
categories: [SAP Logs, Technical Writing, General]
---
Your content in Markdown
```

Place images and resources in `posts/yyyy/mm/dd/` directory.
