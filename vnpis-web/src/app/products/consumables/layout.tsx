import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Vật Tư In Công Nghiệp (In Tampon & In Lụa) | VNPIS',
  },
  description: 'Siêu thị vật tư tổng hợp cho ngành in Tampon (Pad printing) và In lụa (Screen printing): Mực in cao cấp, cốc mực kín, vòng sứ gạt mực, vòng thép, tấm lót khay mực, đầu in silicone, khuôn in.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
