const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '../public/content/blog');
const outputDir = path.join(__dirname, '../public/content');
const outputFile = path.join(outputDir, 'blog-index.json');

// Crear la carpeta si no existe
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(contentDir);

const posts = files
  .filter(file => file.endsWith('.md'))
  .map(file => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return {
      slug: file.replace('.md', ''),
      title: data.title,
      date: data.date,
      thumbnail: data.thumbnail,
      description: data.description,
      author: data.author,
      category: data.category
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Blog index generated with ${posts.length} posts.`);
