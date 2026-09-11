const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Directorios
const contentDir = path.join(__dirname, '..', 'content', 'blog');
const templatePost = path.join(__dirname, '..', 'post.template.html');
const templateBlog = path.join(__dirname, '..', 'blog.template.html');
const outputDir = path.join(__dirname, '..');

// Asegurar que exista la carpeta de contenido
if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
}

// 1. Leer todas las entradas de markdown
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
const posts = [];

for (const file of files) {
    const rawContent = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { data, content } = matter(rawContent);
    const slug = file.replace('.md', '');

    posts.push({
        slug,
        title: data.title || 'Sin título',
        date: data.date || new Date().toISOString(),
        category: data.category || 'Blog',
        featured: !!data.featured,
        thumbnail: (data.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80').replace(/^\/asset\//, 'asset/'),
        excerpt: data.description || content.substring(0, 150) + '...',
        content: marked.parse(content).replace(/src="\/asset\//g, 'src="asset/')
    });
}

// Ordenar por fecha descendente
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// 2. Generar páginas de posts individuales
const postTemplateContent = fs.readFileSync(templatePost, 'utf-8');

for (const post of posts) {
    let postHtml = postTemplateContent
        .replace(/<!-- POST_TITLE -->/g, post.title)
        .replace(/<!-- POST_EXCERPT -->/g, post.excerpt.replace(/"/g, '&quot;'))
        .replace(/<!-- POST_SLUG -->/g, post.slug)
        .replace(/<!-- POST_IMAGE -->/g, post.thumbnail)
        .replace(/<!-- POST_CATEGORY -->/g, post.category)
        .replace(/<!-- POST_BODY -->/g, post.content);

    fs.writeFileSync(path.join(outputDir, `blog-${post.slug}.html`), postHtml);
}

// 3. Generar la página principal del blog (blog.html)
let blogListHtml = '';

for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const isFeatured = i === 0 || post.featured; // El primero o marcado como destacado

    if (isFeatured && i === 0) {
        blogListHtml += `
            <!-- Featured Blog Card -->
            <article class="blog-card fade-in-up" style="border: 1px solid var(--primary); grid-column: 1 / -1; flex-direction: row; align-items: center; justify-content: center; min-height: 250px;">
                <div class="blog-card-img" style="background-image: url('${post.thumbnail}'); flex: 1; height: 100%; min-height: 250px;"></div>
                <div class="blog-card-content" style="flex: 1.5; padding: 40px;">
                    <span class="blog-badge-featured">Destacado</span>
                    <span class="blog-category" style="display: inline-block; margin-left: 10px;">${post.category}</span>
                    <h2 class="blog-title" style="font-size: 1.8rem; margin-top: 10px;">${post.title}</h2>
                    <p class="blog-excerpt" style="font-size: 1.05rem;">${post.excerpt}</p>
                    <a href="blog-${post.slug}.html" class="btn-read-more">Leer Artículo <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                </div>
            </article>
        `;
    } else {
        blogListHtml += `
            <!-- Blog Card -->
            <article class="blog-card fade-in-up">
                <div class="blog-card-img" style="background-image: url('${post.thumbnail}');"></div>
                <div class="blog-card-content">
                    <span class="blog-category">${post.category}</span>
                    <h2 class="blog-title">${post.title}</h2>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="blog-${post.slug}.html" class="btn-read-more">Leer Artículo <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                </div>
            </article>
        `;
    }
}

const blogTemplateContent = fs.readFileSync(templateBlog, 'utf-8');
const finalBlogHtml = blogTemplateContent.replace('<!-- DYNAMIC_BLOG_POSTS -->', blogListHtml);

fs.writeFileSync(path.join(outputDir, 'blog.html'), finalBlogHtml);

console.log(`✅ Generados ${posts.length} posts y blog.html correctamente.`);
