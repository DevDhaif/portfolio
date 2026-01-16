# Bilingual Blog System Guide

## Overview

Your blog now supports **Arabic and English** content with a single URL per post and shared images for both language versions.

## ✅ What's Implemented

### 1. Database Schema

The posts table now has bilingual columns:

- `title_en` / `title_ar` - Blog titles
- `description_en` / `description_ar` - Descriptions
- `content_en` / `content_ar` - Full content (rich text HTML)
- `cover_image` - **Shared between both languages**
- `tags` - **Shared between both languages**
- `slug` - **Single slug for both languages**

### 2. SEO Strategy: Single URL with Language Parameter

- **One URL per post**: `/blog/my-post-slug`
- **Language parameter**: Add `?lang=ar` for Arabic version
- **Default**: English (`/blog/my-post-slug`)
- **Arabic**: `/blog/my-post-slug?lang=ar`

**Benefits:**

- ✅ No duplicate content SEO penalties
- ✅ Simple URL structure
- ✅ hreflang meta tags for search engines
- ✅ Easy to share both versions

### 3. Admin Interface (BilingualPostForm)

**Create/Edit Posts:**

- Navigate to `/admin/blog/new` or `/admin/blog/[id]/edit`
- Two tabs: **🇬🇧 English** and **🇸🇦 العربية**
- Switch between tabs to edit each language

**Features:**

- ✅ Separate rich text editors for each language
- ✅ RTL (right-to-left) support for Arabic inputs
- ✅ "Copy from English" button on Arabic tab to duplicate structure
- ✅ Shared cover image (upload once, used for both)
- ✅ Shared tags
- ✅ Single slug

**Workflow:**

1. Fill in English tab completely (title, description, content, image, tags)
2. Switch to Arabic tab
3. Click "Copy from English" button to copy English structure
4. Translate the text while keeping images/formatting
5. Save/publish

### 4. Public Blog Pages

**Blog List Page** (`/blog`):

- Shows English title/description by default
- 🇬🇧 🇸🇦 badge on posts with Arabic translations
- Backward compatible with old posts (title → title_en)

**Single Post Page** (`/blog/[slug]`):

- Language switcher buttons at top: **🇬🇧 English / 🇸🇦 العربية**
- RTL layout for Arabic content
- Localized date formatting
- Share buttons use current language
- URL updates with `?lang=ar` parameter

### 5. SEO & Meta Tags

**Implemented:**

- ✅ hreflang alternate links (en/ar)
- ✅ Open Graph with alternateLocale
- ✅ Twitter Cards
- ✅ Uses bilingual title/description in metadata
- ✅ Backward compatible with old schema

## 🔧 Setup Required

### ⚠️ IMPORTANT: Database Migration

You **MUST** run the SQL migration script to add the new columns:

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Open the file: `BILINGUAL_MIGRATION.sql`
4. Copy the entire SQL script
5. Paste into SQL Editor
6. Click **Run**

**What this does:**

- Adds 6 new columns: `title_en`, `title_ar`, `description_en`, `description_ar`, `content_en`, `content_ar`
- Migrates your existing posts to English columns (title → title_en)
- Sets Arabic columns with placeholder text

**Your existing posts will:**

- Keep working (backward compatible)
- Migrate to `title_en`, `description_en`, `content_en`
- Get placeholder Arabic content that you can edit later

## 📝 How to Use

### Creating a New Bilingual Post

1. Go to `/admin/blog/new`
2. **English Tab:**

   - Add English title: "My Amazing Tutorial"
   - Add English description
   - Write English content (with images, formatting)
   - Upload cover image
   - Add tags

3. **Arabic Tab:**

   - Click "Copy from English" button
   - This copies the English HTML structure
   - Translate the text content to Arabic
   - Images and formatting are already there!

4. Set status (Draft/Published)
5. Click Create Post

### Editing Existing Posts

1. Go to `/admin/blog`
2. Click Edit on any post
3. Form loads with both English and Arabic content
4. Edit either tab
5. Save changes

### Viewing Posts in Different Languages

**English (default):**

```
https://yoursite.com/blog/my-post
```

**Arabic:**

```
https://yoursite.com/blog/my-post?lang=ar
```

Users can switch languages using the buttons at the top of the post.

## 🔄 Backward Compatibility

The system works with **old posts** that only have:

- `title` (no `title_en`)
- `description` (no `description_en`)
- `content` (no `content_en`)

**Fallback logic:**

```typescript
const title = post.title_en || post.title;
const description = post.description_en || post.description;
const content = post.content_en || post.content;
```

After running the migration, old posts will be moved to English columns automatically.

## 🌍 Language Detection

The system detects language from URL parameter:

```typescript
const searchParams = useSearchParams();
const langParam = searchParams.get('lang');
const [language, setLanguage] = useState<'en' | 'ar'>(
  langParam === 'ar' ? 'ar' : 'en'
);
```

## 🎨 RTL Support

Arabic content automatically applies:

- `dir="rtl"` attribute
- Right-aligned text
- Reversed arrow icons
- Proper date localization (`ar-SA` locale)

## 🔍 SEO Benefits

### hreflang Tags

Search engines see both language versions:

```html
<link rel="alternate" hreflang="en" href="/blog/my-post" />
<link rel="alternate" hreflang="ar" href="/blog/my-post?lang=ar" />
```

### Open Graph

Social media shares show correct language:

- Uses `title_en` or `title_ar` based on URL
- `og:locale` = "en_US" or "ar_SA"
- Single cover image for both

## 🚀 Next Steps

1. **Run the migration SQL** (most important!)
2. Test creating a new post with both languages
3. Edit your existing posts to add Arabic translations
4. Verify language switcher works on blog post pages
5. Check SEO meta tags in browser DevTools

## 📊 Quick Checklist

- [ ] Run `BILINGUAL_MIGRATION.sql` in Supabase
- [ ] Create a test post with both English and Arabic
- [ ] Verify "Copy from English" button works
- [ ] Check language switcher shows up on posts with Arabic
- [ ] Confirm images are shared (not duplicated)
- [ ] Test RTL layout for Arabic content
- [ ] Check blog list shows 🇬🇧 🇸🇦 badge on bilingual posts

## 💡 Tips

- **Images:** Upload once in English tab, automatically available in Arabic tab
- **Tags:** Add once, shared between both languages
- **Slug:** One slug for both languages (good for SEO)
- **Translation workflow:** Use "Copy from English" to preserve formatting
- **Old posts:** Will keep working, migrate them when you have time

---

**Questions or issues?** Check the code in:

- `/src/components/BilingualPostForm.tsx` - Admin form
- `/src/app/blog/[slug]/BlogPost.tsx` - Public post page
- `/src/app/admin/blog/actions.ts` - CRUD operations
