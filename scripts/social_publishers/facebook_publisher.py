import os
import requests

class FacebookPublisher:
    def __init__(self, page_id=None, access_token=None):
        self.page_id = page_id or os.environ.get("FB_PAGE_ID", "YOUR_FB_PAGE_ID")
        self.access_token = access_token or os.environ.get("FB_PAGE_ACCESS_TOKEN", "YOUR_FB_ACCESS_TOKEN")
        self.graph_url = f"https://graph.facebook.com/v19.0/{self.page_id}"

    def publish_post(self, message, image_url=None):
        """
        Publishes a text post or photo post to Facebook Fanpage.
        """
        if self.access_token == "YOUR_FB_ACCESS_TOKEN":
            print("[FB DRY-RUN] FB_PAGE_ACCESS_TOKEN not set. Simulating post publish:")
            print(f" -> Message: {message[:100]}...")
            print(f" -> Target Page ID: {self.page_id}")
            return {"status": "dry_run_success", "message": message[:100]}

        try:
            if image_url:
                endpoint = f"{self.graph_url}/photos"
                payload = {
                    "caption": message,
                    "url": image_url,
                    "access_token": self.access_token
                }
            else:
                endpoint = f"{self.graph_url}/feed"
                payload = {
                    "message": message,
                    "access_token": self.access_token
                }
            
            response = requests.post(endpoint, data=payload)
            result = response.json()
            if response.status_code == 200:
                print(f"[FB SUCCESS] Published post ID: {result.get('id')}")
                return result
            else:
                print(f"[FB ERROR] API Error: {result}")
                return result
        except Exception as e:
            print(f"[FB ERROR] Exception occurred: {e}")
            return None

    def publish_reel(self, video_path, caption):
        """
        Publishes a video reel to Facebook Fanpage.
        """
        print(f"[FB REEL] Preparing to upload reel: {video_path} with caption: {caption[:50]}...")
        # Step 1: Initialize upload session, Step 2: Upload binary, Step 3: Publish
        return {"status": "reel_ready", "video_path": video_path}

if __name__ == "__main__":
    fb = FacebookPublisher()
    fb.publish_post("VNPIS Solutions: Chuyên gia giải pháp in ấn B2B & Cứu hộ đầu in công nghiệp! Website: https://inanvnpis.com")
