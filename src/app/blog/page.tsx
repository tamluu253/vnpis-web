import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Blog Kiến Thức In Phun Công Nghiệp | VNPIS',
  description: 'Tổng hợp các bài viết chuyên sâu về mực in, giải pháp in phun công nghiệp CIJ, TIJ, DOD và các ứng dụng thực tế.',
};

const articles = [
    {
        slug: "giai-phap-in-truc-tiep-len-vo-trung-ga-muc-he01",
        title: "Bí Quyết In Sắc Nét Trên Vỏ Trứng Gà Với Mực Thực Phẩm HE01",
        code: "HE01",
        type: "TIJ",
        mediaExt: "mp4",
        desc: "Mực in trứng HE01 là dòng mực thực phẩm an toàn, khô siêu tốc, giúp in ngày tháng, logo lên vỏ trứng rõ nét mà không làm tổn hại cấu trúc vỏ."
    },
    {
        slug: "muc-in-lop-xe-dzwav-chiu-nhiet-luu-hoa",
        title: "Mực In Lốp Xe DZWAV: Chống Chịu Lưu Hóa Cực Đoan",
        code: "DZWAV",
        type: "DOD",
        mediaExt: "mp4",
        desc: "DZWAV là mã mực DOD trắng siêu bám dính, chuyên dụng cho ngành sản xuất lốp xe cao su, chịu được nhiệt độ và áp suất lưu hóa khắc nghiệt nhất."
    },
    {
        slug: "muc-cij-k12-chiu-nhiet-121-do-luoc-soi",
        title: "Mực CIJ K12 Chịu Nhiệt 121°C: Giải Pháp Cho Ngành Đồ Hộp",
        code: "K12",
        type: "CIJ",
        mediaExt: "mp4",
        desc: "Mực K12 được thiết kế đặc biệt để in trên bao bì đồ hộp, túi màng nhôm. Chịu được quá trình hấp thanh trùng, luộc sôi ở 121 độ C lên tới 2 tiếng mà không bong tróc."
    },
    {
        slug: "muc-in-tang-hinh-t03-chong-hang-gia",
        title: "Test Thực Tế Mực In Tàng Hình T03 - Công Nghệ Chống Giả Đỉnh Cao",
        code: "T03",
        type: "CIJ",
        mediaExt: "mp4",
        desc: "Mực T03 hoàn toàn tàng hình dưới ánh sáng thường và chỉ phát quang màu xanh dương dưới đèn UV. Giải pháp hoàn hảo để đánh dấu nội bộ và chống hàng giả."
    },
    {
        slug: "muc-tij-hf200-kho-nhanh-sieu-net",
        title: "Đánh Giá Mực Đen TIJ HF200: Khô Siêu Nhanh, Độ Nét Cao",
        code: "HF200",
        type: "TIJ",
        mediaExt: "jpg",
        desc: "Mực HF200 gốc dung môi mang lại bản in đen sâu, khô cực nhanh trên các bề mặt khó nhằn như nilon, màng PE, và kim loại."
    },
    {
        slug: "muc-bam-dinh-sieu-cuong-k15-khong-halogen",
        title: "Mực Bám Dính Siêu Cường K15: Tuân Thủ Tiêu Chuẩn Halogen-Free",
        code: "K15",
        type: "CIJ",
        mediaExt: "mp4",
        desc: "K15 không chỉ bám dính siêu việt trên nhựa và kim loại mà còn hoàn toàn không chứa Halogen, đáp ứng các chuẩn xuất khẩu EU khắt khe nhất."
    },
    {
        slug: "muc-in-day-cap-trang-linx-videojet",
        title: "Giải Pháp In Dây Cáp Điện: Mực Trắng Không Răng Cưa",
        code: "WHITE-CABLE",
        type: "CIJ",
        mediaExt: "mp4",
        desc: "In thông số lên dây cáp điện đòi hỏi độ bám cao và mã vạch không bị vỡ hạt. Mực trắng chuyên dụng cho cáp giải quyết triệt để vấn đề này."
    },
    {
        slug: "muc-in-chai-thuy-tinh-uot-lanh",
        title: "In Date Lên Chai Thủy Tinh Ướt Lạnh: Thách Thức Và Lời Giải",
        code: "GLASS-INK",
        type: "CIJ",
        mediaExt: "mp4",
        desc: "Nước ngưng tụ trên vỏ chai bia/nước ngọt là kẻ thù của mực in. Dòng mực CIJ chuyên dụng của VNPIS xuyên qua lớp nước để bám chặt vào thủy tinh."
    },
    {
        slug: "muc-in-tij-bao-bi-bim-bim-snack",
        title: "Mực In TIJ Chuyên Trị Bao Bì Snack (Bóng Kính)",
        code: "TIJ-SNACK",
        type: "TIJ",
        mediaExt: "mp4",
        desc: "In ngày sản xuất lên túi bim bim, màng nhôm bóng kính đòi hỏi mực phải bám ngay lập tức trước khi rơi xuống thùng rớt. Mực TIJ Solvent là lựa chọn số 1."
    },
    {
        slug: "muc-khang-con-alcohol-resistant-ink",
        title: "Mực In Kháng Cồn (Alcohol Resistant) Cho Ngành Y Tế",
        code: "ALCOHOL-RES",
        type: "CIJ",
        mediaExt: "mp4",
        desc: "Các sản phẩm y tế thường xuyên bị lau chùi bằng dung môi cồn. Mực in kháng cồn đảm bảo thông tin quan trọng không bao giờ bị bay màu."
    },
    {
        slug: "muc-do-cij-reda-in-nhua-toi-mau",
        title: "Sử Dụng Mực Đỏ REDA Cho Bề Mặt Tối Màu",
        code: "REDA",
        type: "CIJ",
        mediaExt: "jpg",
        desc: "Trên nền nhựa đen hoặc vật liệu tối màu, mực đỏ REDA mang lại sự tương phản hoàn hảo, giúp mã vạch dễ dàng được máy quét nhận diện."
    },
    {
        slug: "muc-in-ong-pe-ong-nhua",
        title: "Mực Vàng In Ống Nhựa PE/PVC Siêu Bền Chắc",
        code: "YELLOW-PIPE",
        type: "CIJ",
        mediaExt: "mp4",
        desc: "Ống nhựa PE thường xuyên chịu nắng mưa ngoài trời. Mực vàng chuyên dụng có khả năng chống tia UV, không phai màu theo thời gian."
    },
    {
        slug: "muc-nuoc-tij-hw-in-carton",
        title: "Tối Ưu Chi Phí In Thùng Carton Với Mực Nước TIJ HW",
        code: "HW",
        type: "TIJ",
        mediaExt: "jpg",
        desc: "Đối với bề mặt thấm hút như thùng carton, giấy kraft, mực nước HW mang lại độ đậm cực cao với chi phí siêu tiết kiệm so với in nhãn dán."
    },
    {
        slug: "muc-in-nhua-pvc-vang-trang",
        title: "Test Bám Dính Mực Trắng Trên Can Nhựa Hóa Chất PVC",
        code: "PVC-WHITE",
        type: "CIJ",
        mediaExt: "mp4",
        desc: "Can nhựa đựng hóa chất thường bị rò rỉ dung môi ra ngoài. Mực trắng CIJ của chúng tôi kháng được hầu hết các loại axit nhẹ và hóa chất tẩy rửa."
    },
    {
        slug: "muc-tij-tuy-bien-ma-vach",
        title: "In Mã QR Code Biến Đổi Liên Tục Bằng Máy TIJ",
        code: "TIJ-QR",
        type: "TIJ",
        mediaExt: "jpg",
        desc: "Ứng dụng in QR code định danh cho từng sản phẩm đòi hỏi hộp mực TIJ phải có độ phân giải tối thiểu 300dpi và không được phép nghẹt tia."
    },
    {
        slug: "muc-xanh-la-green-ink",
        title: "Tạo Điểm Nhấn Nhận Diện Thương Hiệu Với Mực Xanh Lá (GREEN)",
        code: "GREEN",
        type: "CIJ",
        mediaExt: "jpg",
        desc: "Đừng gò bó vào mực đen truyền thống. Mực xanh lá (GREEN) giúp sản phẩm của bạn nổi bật hơn trên kệ hàng và chống làm giả trực quan."
    },
    {
        slug: "muc-in-tij-tieu-chuan-fda",
        title: "Mực In Thực Phẩm TIJ Đạt Chuẩn Tiếp Xúc Trực Tiếp FDA",
        code: "FOOD-TIJ",
        type: "TIJ",
        mediaExt: "jpg",
        desc: "Không chỉ trứng gà, mực in thực phẩm còn in trực tiếp lên bánh kẹo, vỏ trái cây màng mỏng một cách an toàn tuyệt đối."
    },
    {
        slug: "muc-in-tu-dong-hoa-robot",
        title: "Tích Hợp Máy In TIJ Lên Cánh Tay Robot",
        code: "TIJ-ROBOT",
        type: "TIJ",
        mediaExt: "jpg",
        desc: "Đầu in nhỏ gọn của công nghệ TIJ kết hợp với mực khô nhanh là combo hoàn hảo để gắn lên các cánh tay robot phân loại sản phẩm tốc độ cao."
    },
    {
        slug: "muc-khang-dau-t09-in-kim-loai",
        title: "Mực Kháng Dầu T09: Cứu Tinh Cho Gia Công Cơ Khí",
        code: "T09",
        type: "CIJ",
        mediaExt: "jpg",
        desc: "Các chi tiết kim loại phay tiện xong thường dính lớp dầu bảo quản. Mực T09 có khả năng tự xuyên qua lớp dầu mỏng để bám chặt vào kim loại."
    },
    {
        slug: "giai-phap-in-date-gia-re-hieu-qua",
        title: "Nên Chọn Mực TIJ Hay CIJ Cho Doanh Nghiệp Của Bạn?",
        code: "GUIDE",
        type: "TIJ/CIJ",
        mediaExt: "jpg",
        desc: "Bài viết tổng hợp giúp chủ doanh nghiệp SME quyết định đúng đắn khoản đầu tư giữa hệ thống in phun nhiệt TIJ và in phun liên tục CIJ."
    }
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 font-semibold">
            <FileText className="w-5 h-5" />
            <span>Blog & Tin Tức Ngành</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Giải Pháp & Kiến Thức In Phun Công Nghiệp</h1>
          <p className="text-lg text-slate-600">
            Khám phá thư viện 20+ bài viết chuyên sâu và video test thực tế các dòng mực in đặc biệt của VNPIS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link key={index} href={`/blog/${article.slug}`} className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full">
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {article.mediaExt === 'mp4' && article.slug !== 'giai-phap-in-truc-tiep-len-vo-trung-ga-muc-he01' && article.slug !== 'muc-in-day-cap-trang-linx-videojet' ? (
                  <video src={`/media/blog/${article.slug}.mp4`} muted loop playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900 group-hover:scale-105 transition-transform duration-500">
                     <span className="text-4xl font-bold text-white opacity-20">{article.code}</span>
                     {article.mediaExt === 'jpg' && <img src={`/media/blog/${article.slug}.jpg`} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />}
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">{article.type}</span>
                  <span className="bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-md">{article.code}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                  {article.desc}
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm mt-auto">
                  Xem chi tiết <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
