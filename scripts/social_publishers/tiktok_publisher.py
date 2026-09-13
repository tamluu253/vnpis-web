import os
import requests

class TikTokPublisher:
    def __init__(self, client_key=None, access_token=None):
        self.client_key = client_key or os.environ.get("TIKTOK_CLIENT_KEY", "YOUR_TIKTOK_CLIENT_KEY")
        self.access_token = access_token or os.environ.get("TIKTOK_ACCESS_TOKEN", "YOUR_TIKTOK_ACCESS_TOKEN")
        self.api_url = "https://open.tiktokapis.com/v2/post/publish/video/init/"

    def publish_video(self, video_file_path, title, privacy_level="PUBLIC_TO_EVERYONE"):
        """
        Publishes a video to TikTok Creator Studio via TikTok Content Posting API.
        """
        print(f"[TIKTOK API] Preparing video upload for TikTok: {title}")
        
        if self.access_token == "YOUR_TIKTOK_ACCESS_TOKEN":
            print("[TIKTOK DRY-RUN] TIKTOK_ACCESS_TOKEN not set. Simulating TikTok publish:")
            print(f" -> Title: {title}")
            print(f" -> Privacy: {privacy_level}")
            print(f" -> Video File: {video_file_path}")
            return {"status": "dry_run_success", "title": title}

        try:
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json; charset=UTF-8"
            }
            payload = {
                "post_info": {
                    "title": title,
                    "privacy_level": privacy_level,
                    "disable_duet": False,
                    "disable_comment": False,
                    "disable_stitch": False
                },
                "source_info": {
                    "source": "FILE_UPLOAD",
                    "video_size": os.path.getsize(video_file_path) if os.path.exists(video_file_path) else 1024000
                }
            }
            response = requests.post(self.api_url, headers=headers, json=payload)
            return response.json()
        except Exception as e:
            print(f"[TIKTOK ERROR] Exception occurred: {e}")
            return None

if __name__ == "__main__":
    tt = TikTokPublisher()
    tt.publish_video("sample_video.mp4", "Thử thách cào mực UV trên phôi nhựa ABS! #VNPIS #InTampon #InAnVNPIS")
