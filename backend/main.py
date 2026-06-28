from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os

from database import engine, SessionLocal
import models
from auth import hash_password

from routes.contact import router as contact_router
from routes.admin import router as admin_router
from routes.cms import router as cms_router
from routes.work import router as work_router
from routes.courses import router as courses_router

# Auto-create tables (acts as database initialization)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title='EskeeWalker API')

# Configure CORS for local development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://localhost'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Route registrations
app.include_router(contact_router, prefix='/api')
app.include_router(admin_router, prefix='/api')
app.include_router(cms_router, prefix='/api')
app.include_router(work_router, prefix='/api')
app.include_router(courses_router, prefix='/api')

os.makedirs("static", exist_ok=True)
app.mount("/api/static", StaticFiles(directory="static"), name="static")

# Health Check
@app.get('/api/health')
def health():
    return {'status': 'ok'}

# Database Seeding Logic
def seed_database():
    db = SessionLocal()
    try:
        # 1. Seed Admin
        admin = db.query(models.Admin).filter(models.Admin.username == "admin").first()
        if not admin:
            print("[Seed] Creating default admin user...")
            hashed_pass = hash_password("eskeewalker123")
            admin = models.Admin(username="admin", password_hash=hashed_pass)
            db.add(admin)
            db.commit()

        # 2. Seed Pages & Content
        default_pages = {
            "home": {
                "hero": {
                    "title": "Stories built by AI.\nFelt by humans.",
                    "subtitle": "We produce AI drama, UGC, and ads for brands that want to be remembered — and turn sustainability data into stories people actually watch."
                },
                "statement": {
                    "quote": "AI doesn't replace the story.\nIt *accelerates* it.",
                    "description": "We believe the best AI-produced content still starts with a human insight, a real emotion, and a clear reason to exist. That's what we bring to every project."
                }
            },
            "studio": {
                "hero": {
                    "title": "Drama. UGC. Ads.\nBuilt with AI.",
                    "description": "Our AI Creative Studio is built for brands that need to move fast without looking cheap — and for stories that need to feel real even when they're generated pixel by pixel."
                }
            },
            "sustainability": {
                "hero": {
                    "title": "Climate data,\nvisualised.",
                    "description": "We translate complex environmental reports, green policies, and ESG data into visual narratives that engage stakeholders, build trust, and inspire action."
                }
            },
            "about": {
                "hero": {
                    "title": "Stories with\npurpose.",
                    "description": "EskeeWalker Strategies is an AI-first creative studio. We combine cutting-edge technology with traditional storytelling to produce high-impact visual communication."
                },
                "founder": {
                    "name": "Jitaksh Jain",
                    "role": "Founder & Creative Director",
                    "bio": "Jitaksh Jain is an artist, director, and creative technologist based in Jaipur. He founded EskeeWalker to bridge the gap between emerging generative AI tech and deep human emotions."
                }
            },
            "courses": {
                "hero": {
                    "title": "Learn AI from\ncreators.",
                    "description": "Hands-on courses in generative design, AI animation, and visual storytelling. Learn the tools that are reshaping the creative industry."
                }
            }
        }

        for page_name, sections in default_pages.items():
            page = db.query(models.Page).filter(models.Page.name == page_name).first()
            if not page:
                print(f"[Seed] Creating page: {page_name}...")
                page = models.Page(name=page_name)
                db.add(page)
                db.commit()
                db.refresh(page)

            for key, val in sections.items():
                content_item = db.query(models.PageContent).filter(
                    models.PageContent.page_id == page.id,
                    models.PageContent.section_key == key
                ).first()
                if not content_item:
                    print(f"[Seed] Seeding section: {page_name} -> {key}...")
                    content_item = models.PageContent(
                        page_id=page.id,
                        section_key=key,
                        content=val
                    )
                    db.add(content_item)
            db.commit()

        # 3. Seed Work Items (Portfolio)
        work_count = db.query(models.WorkItem).count()
        if work_count == 0:
            print("[Seed] Seeding default work items...")
            default_work = [
                {
                    "cat": "drama", "size": "large",
                    "img": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400&q=80&fit=crop",
                    "alt": "AI Drama Production", "label": "Case Study", "featured": True,
                    "work_cat": "Drama Production", "title": "AI Microdrama Series — Brand Origin Story",
                    "badges": ["3-part series", "Social-first"], "order_index": 0
                },
                {
                    "cat": "ugc", "size": "medium",
                    "img": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&fit=crop",
                    "alt": "UGC Campaign", "label": "UGC", "featured": False,
                    "work_cat": "UGC Campaign", "title": "Social Content — Product Launch",
                    "badges": ["Instagram Reels"], "order_index": 1
                },
                {
                    "cat": "sustainability", "size": "half",
                    "img": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80&fit=crop",
                    "alt": "Sustainability Story", "label": "Sustainability", "featured": False,
                    "work_cat": "Sustainability Communication", "title": "ESG Annual Report — Animated Visual Story",
                    "badges": ["w/ Climate Decode", "2 min video"], "order_index": 2
                },
                {
                    "cat": "ads", "size": "half",
                    "img": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80&fit=crop",
                    "alt": "AI Advertisement", "label": "AI Ads", "featured": False,
                    "work_cat": "AI Advertisement", "title": "Performance Ad — 30 sec cut",
                    "badges": ["Meta / YouTube"], "order_index": 3
                },
                {
                    "cat": "ugc", "size": "third",
                    "img": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=700&q=80&fit=crop",
                    "alt": "Founder Story UGC", "label": "UGC", "featured": False,
                    "work_cat": "UGC", "title": "Founder Story — Talking Head Series",
                    "badges": ["LinkedIn"], "order_index": 4
                },
                {
                    "cat": "drama", "size": "third",
                    "img": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&q=80&fit=crop",
                    "alt": "AI Animation Character", "label": "Drama", "featured": False,
                    "work_cat": "AI Animation", "title": "Brand Character — AI Animation",
                    "badges": ["Character design"], "order_index": 5
                },
                {
                    "cat": "sustainability", "size": "third",
                    "img": "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=700&q=80&fit=crop",
                    "alt": "Climate Campaign", "label": "Sustainability", "featured": False,
                    "work_cat": "Climate Campaign", "title": "Net Zero Pledge — Visual Campaign",
                    "badges": ["w/ Climate Decode"], "order_index": 6
                }
            ]
            for data in default_work:
                item = models.WorkItem(**data)
                db.add(item)
            db.commit()

        # 4. Seed Courses
        courses_count = db.query(models.Course).count()
        if courses_count == 0:
            print("[Seed] Seeding default courses...")
            default_courses = [
                {
                    "title": "Generative AI Animation",
                    "description": "Master tools like Runway Gen-2, Kling, and Sora to create high-end animations from text and image prompts.",
                    "level": "beginner",
                    "modules": ["GenAI Animation Basics", "Advanced Camera Prompting", "Lip Sync & Audio Integration", "Video Editing for AI Content"],
                    "duration": "4 weeks",
                    "price": "₹12,000",
                    "cta_link": "/contact",
                    "order_index": 0
                },
                {
                    "title": "AI Design & Character Development",
                    "description": "Learn to design consistent characters, virtual sets, and stunning marketing materials using Midjourney and Stable Diffusion.",
                    "level": "intermediate",
                    "modules": ["Consistent Character Prompts", "Style Consistency in Midjourney", "Virtual Set Designing", "Upscaling & Retouching Workflows"],
                    "duration": "4 weeks",
                    "price": "₹15,000",
                    "cta_link": "/contact",
                    "order_index": 1
                }
            ]
            for data in default_courses:
                item = models.Course(**data)
                db.add(item)
            db.commit()

    except Exception as e:
        print(f"[Seed Error] {e}")
    finally:
        db.close()

seed_database()
