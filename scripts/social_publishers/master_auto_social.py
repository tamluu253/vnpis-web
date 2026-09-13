import os
import sys
from facebook_publisher import FacebookPublisher
from youtube_publisher import YouTubePublisher
from tiktok_publisher import TikTokPublisher

class MasterAutoSocialPublisher:
    def __init__(self):
        self.fb = FacebookPublisher()
        self.yt = YouTubePublisher()
        self.tt = TikTokPublisher()

    def dispatch_post(self, text_content, video_file_path=None, image_url=None, title="VNPIS Solutions"):
        """
        Dispatches content simultaneously across Facebook Fanpage, YouTube Shorts, and TikTok.
        """
        print("==================================================")
        print("🚀 STARTING VNPIS MULTI-PLATFORM AUTO-SOCIAL DISPATCH")
        print("==================================================")

        # 1. Dispatch to Facebook Fanpage
        print("\n1. Publishing to Facebook Fanpage...")
        fb_result = self.fb.publish_post(text_content, image_url=image_url)

        # 2. Dispatch to YouTube Shorts (if video provided)
        if video_file_path:
            print("\n2. Publishing to YouTube Shorts...")
            yt_result = self.yt.upload_short(video_file_path, title, text_content)
        else:
            print("\n2. [YouTube Shorts] Skipped (No video file attached).")

        # 3. Dispatch to TikTok (if video provided)
        if video_file_path:
            print("\n3. Publishing to TikTok...")
            tt_result = self.tt.publish_video(video_file_path, f"{title} #VNPIS #inanvnpis #cuuhodauin")
        else:
            print("\n3. [TikTok] Skipped (No video file attached).")

        print("\n==================================================")
        print("✅ DISPATCH COMPLETED FOR ALL PLATFORMS")
        print("==================================================")

if __name__ == "__main__":
    publisher = MasterAutoSocialPublisher()
    sample_text = """VNPIS Solutions: Giải Pháp In Ấn B2B & Cứu Hộ Đầu In Phun Kỹ Thuật Số Số 1 Việt Nam!
    - Hotline/Zalo Kỹ Thuật 24/7: 0987 453 866
    - Website chính thức: https://inanvnpis.com | https://cuuhodauin.com | https://vnpis.com"""
    publisher.dispatch_post(sample_text, video_file_path="sample_xưởng_vnpis.mp4", title="Cận Cảnh Máy In Tampon 4 Màu Tại Xưởng VNPIS")
