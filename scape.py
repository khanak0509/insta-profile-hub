from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:8081", "http://127.0.0.1:8080", "http://127.0.0.1:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UsernameRequest(BaseModel):
    username: str

def scrape_full_profile(username: str):
    """Scrape full Instagram profile with posts"""
    client = httpx.Client(
        headers={
            "x-ig-app-id": "936619743392459",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/5.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        }
    )

    response = client.get(f"https://i.instagram.com/api/v1/users/web_profile_info/?username={username}")
    response.raise_for_status()
    raw_data = response.json()

    user_data = raw_data.get("data", {}).get("user")
    if not user_data:
        return None

    profile_info = {
        "username": user_data.get("username"),
        "full_name": user_data.get("full_name"),
        "followers": user_data.get("edge_followed_by", {}).get("count"),
        "following": user_data.get("edge_follow", {}).get("count"),
        "posts_count": user_data.get("edge_owner_to_timeline_media", {}).get("count"),
        "bio": user_data.get("biography"),
        "profile_pic_url": user_data.get("profile_pic_url_hd")
    }

    simplified_posts = []
    posts = user_data.get("edge_owner_to_timeline_media", {}).get("edges", [])
    for post_edge in posts:
        node = post_edge.get("node", {})
        caption_edges = node.get("edge_media_to_caption", {}).get("edges", [])
        caption = caption_edges[0]["node"]["text"] if caption_edges else ""

        post_info = {
            "media_type": "video" if node.get("is_video") else "image",
            "media_url": node.get("video_url") if node.get("is_video") else node.get("display_url"),
            "caption": caption,
            "likes": node.get("edge_liked_by", {}).get("count"),
            "comments": node.get("edge_media_to_comment", {}).get("count"),
            "ai_description": node.get("accessibility_caption"),
        }
        simplified_posts.append(post_info)

    profile_info["posts"] = simplified_posts
    return profile_info

def scrape_instagram_followers(username: str):
    """Scrape Instagram followers list"""
    client = httpx.Client(
        headers={
            "x-ig-app-id": "936619743392459",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/5.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        }
    )

    response = client.get(f"https://i.instagram.com/api/v1/users/web_profile_info/?username={username}")
    response.raise_for_status()
    raw_data = response.json()

    user_data = raw_data.get("data", {}).get("user")
    if not user_data:
        return None
    followers = user_data.get("edge_followed_by", {}).get("count")

  

    return {"followers": followers}

@app.post("/instagram")
async def get_instagram_full_profile(request: UsernameRequest):
    profile_data = scrape_full_profile(request.username)
    if not profile_data:
        return {"error": "User not found or failed to fetch data"}
    return profile_data

@app.post("/followers")
async def get_instagram_followers(request: UsernameRequest):
    followers_data = scrape_instagram_followers(request.username)
    if not followers_data:
        return {"error": "User not found or failed to fetch data"}
    return followers_data

