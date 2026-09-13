# Master Cross-Domain Interlinking Strategy & Link Equity Routing Architecture

**Entity Organization:** CÔNG TY TNHH VNPIS (`MST: 0318266611`)  
**Lead Engineer & Technical Author:** Lưu Trọng Tâm  
**Ecosystem Network:** `vnpis.com` | `cuuhodauin.com` | `inanvnpis.com`  
**Version:** 1.0.0  
**Effective Date:** 2026-08-23  

---

## 1. Executive Summary & Mathematical Link Flow

### 1.1. Triangular Directed Graph Topology
The VNPIS digital marketing ecosystem operates across three specialized B2B domains forming a closed, synergistic triangular directed graph $G = (V, E)$, where vertices $V = \{V_{\text{vnpis}}, V_{\text{cuuho}}, V_{\text{inan}}\}$ and edges $E = \{(u, v) \in V \times V \mid u \neq v\}$ comprise exactly 6 directional vectors ($|E| = 6$).

```
                           ┌────────────────────────────────────────┐
                           │               vnpis.com                │
                           │     (Machinery, Inks & Automation)     │
                           └───────────────▲────────┬───────────────┘
                                           │        │
                   Vector 3: Beyond Repair │        │ Vector 1: Maintenance & Rescue
                   Vector 5: Machine ROI   │        │ Vector 2: Pilot Testing
                                           │        │
                     ┌─────────────────────┴────────▼─────────────────────┐
                     │                                                    │
                     ▼                                                    ▼
   ┌───────────────────────────────────┐        Vector 4: Backlog Offset  ┌───────────────────────────────────┐
   │          cuuhodauin.com           │─────────────────────────────────▶│           inanvnpis.com           │
   │    (Printhead Rescue Lab &        │◀─────────────────────────────────│      (B2B OEM Custom Contract     │
   │     Ultrasonic Restoration)       │       Vector 6: Head Recovery    │          Printing Services)       │
   └───────────────────────────────────┘                                  └───────────────────────────────────┘
```

### 1.2. PageRank & Link Equity Preservation Model
To maximize domain authority without triggering search engine penalties, link equity transmission follows a conservation of equity principle:
1. **Zero External Equity Leakage:** All cross-domain links within the triad pass standard search engine ranking credit (`dofollow`, `rel="noopener"` without `nofollow` or `sponsored`).
2. **Symmetric In-Degree / Out-Degree Distribution:** Across the 48 monthly scheduled articles (16 per domain), each node receives equal backlink weight from sibling domains:
   - $InDegree(V_i) = \sum_{j \neq i} OutDegree(V_j \to V_i) = 16 \text{ incoming contextual bridges/month}$.
   - $OutDegree(V_i) = 16 \text{ outgoing contextual bridges/month}$ (8 pointing to Domain B, 8 pointing to Domain C).
3. **Crawl Depth & Indexation Velocity:** By maintaining deep bi-directional linking across Sub-cluster leaves and Pillar hubs, Googlebot crawls new technical drafts within $< 48\text{ hours}$ of publishing.

---

## 2. The 6 B2B Conversion Bridges & User Journey Routing

Every cross-domain link is engineered as a high-intent conversion bridge solving real industrial manufacturing dilemmas.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE 6 B2B CONVERSION BRIDGES                                     │
├─────────┬───────────────────┬───────────────────┬────────────────────────────────────────────────┤
│ Vector  │ Source Domain     │ Target Domain     │ Strategic Role & Buyer Intent Bridge           │
├─────────┼───────────────────┼───────────────────┼────────────────────────────────────────────────┤
│ V1      │ vnpis.com         │ cuuhodauin.com    │ Machinery Maintenance & No Cure No Pay Rescue  │
│ V2      │ vnpis.com         │ inanvnpis.com     │ Pre-Purchase Pilot Run & Sample Validation     │
│ V3      │ cuuhodauin.com    │ vnpis.com         │ Beyond Repair Replacement & Machine Upgrade    │
│ V4      │ cuuhodauin.com    │ inanvnpis.com     │ Emergency Downtime Production Backlog Offset   │
│ V5      │ inanvnpis.com     │ vnpis.com         │ Scale Threshold & In-House Machine ROI         │
│ V6      │ inanvnpis.com     │ cuuhodauin.com    │ Factory Client Printhead Defect Troubleshooting│
└─────────┴───────────────────┴───────────────────┴────────────────────────────────────────────────┘
```

### Vector 1 ($V \to C$): `vnpis.com` $\to$ `cuuhodauin.com`
- **Context:** Industrial printing machinery owners, operators, and maintenance engineers reading equipment guides or ink troubleshooting articles.
- **Pain Point:** High cost of replacing printheads (Ricoh Gen5: 45M–60M VND; Kyocera KJ4A: 85M–120M VND; Epson i3200: 22M–30M VND) when experiencing clogging, deflection, or dried UV ink.
- **Funnel Stage:** MoFu $\to$ BoFu (Operational risk reduction).
- **Trigger Keywords:** `bảo trì đầu in`, `nghẹt tia béc phun`, `đầu in ricoh gen5`, `đầu in kyocera`, `epson i3200 thông vách`.
- **Target URL:** `https://cuuhodauin.com/kien-thuc/quy-trinh-cuu-ho-dau-in-ricoh-gen5`
- **Conversion CTA Block:**
  > *"Khi đầu in công nghiệp gặp sự cố nghẹt tia UV hoặc lệch tia nghiêm trọng, doanh nghiệp không nhất thiết phải thay mới tốn kém hàng chục triệu đồng. Hãy tham khảo [dịch vụ phục hồi đầu in Ricoh Gen5 chuyên sâu](https://cuuhodauin.com/kien-thuc/quy-trinh-cuu-ho-dau-in-ricoh-gen5) tại Phòng Lab Cứu Hộ Đầu In VNPIS với cam kết No Cure No Pay — Không thông tia, không tính phí."*

---

### Vector 2 ($V \to I$): `vnpis.com` $\to$ `inanvnpis.com`
- **Context:** Factory managers, R&D engineers, and procurement specialists researching new pad printing or screen printing machinery for new product lines.
- **Pain Point:** Uncertainty regarding ink adhesion on difficult substrates (POM, untreated PP/PE, coated glass, anodized aluminum) prior to committing capital expenditure ($150\text{M} - 800\text{M VND}$).
- **Funnel Stage:** ToFu $\to$ MoFu (Validation & Risk Elimination).
- **Trigger Keywords:** `in thử nghiệm`, `mẫu test pantone`, `chưa đầu tư máy`, `gia công in tampon`, `độ bám dính vật liệu`.
- **Target URL:** `https://inanvnpis.com/blog/gia-cong-in-tampon-linh-kien-nhua-abs`
- **Conversion CTA Block:**
  > *"Trước khi quyết định đầu tư hệ thống máy móc, quý khách có thể gửi mẫu phôi thực tế để trải nghiệm [dịch vụ in tampon mẫu thử linh kiện nhựa kỹ thuật](https://inanvnpis.com/blog/gia-cong-in-tampon-linh-kien-nhua-abs) tại Xưởng gia công in ấn B2B VNPIS nhằm thẩm định độ chuẩn màu Pantone và tiêu chuẩn bám dính ASTM D3359."*

---

### Vector 3 ($C \to V$): `cuuhodauin.com` $\to$ `vnpis.com`
- **Context:** Factory technicians reading printhead diagnostic articles whose printheads have suffered irreparable physical damage (piezo crystal cracking, burned ICs, internal delamination).
- **Pain Point:** Printheads that are Beyond Economic Repair (BER); need new genuine equipment, certified non-clogging inks, or automated production lines.
- **Funnel Stage:** BoFu (Machinery & Consumables Acquisition).
- **Trigger Keywords:** `đầu in hỏng nặng`, `thông vách không thể phục hồi`, `nâng cấp máy in mới`, `mực in chính hãng chống nghẹt`, `máy in single pass`.
- **Target URL:** `https://vnpis.com/blog/may-in-uv-single-pass-thung-carton`
- **Conversion CTA Block:**
  > *"Trong trường hợp đầu in đã hư hỏng cấu trúc vi mạch hoặc quá tuổi thọ kinh tế, việc nâng cấp lên [dây chuyền máy in UV Single Pass thùng carton tốc độ cao](https://vnpis.com/blog/may-in-uv-single-pass-thung-carton) từ Thiết bị in ấn công nghiệp VNPIS sẽ tối ưu 40% chi phí vận hành và bảo hành chính hãng 12 tháng tận xưởng."*

---

### Vector 4 ($C \to I$): `cuuhodauin.com` $\to$ `inanvnpis.com`
- **Context:** Workshop owners whose printheads are undergoing 24–72 hour lab ultrasonic recovery cycles while their production line is at a standstill.
- **Pain Point:** Contract deadlines approaching, risking liquidated damages or customer churn due to machine downtime.
- **Funnel Stage:** BoFu (Emergency Production Fulfillment).
- **Trigger Keywords:** `thời gian chờ phục hồi`, `dừng chuyền sản xuất`, `đơn hàng gấp`, `in gia công cấp tốc`, `in vdp mã qr`.
- **Target URL:** `https://inanvnpis.com/blog/dich-vu-in-uv-du-lieu-bien-doi-vdp`
- **Conversion CTA Block:**
  > *"Trong thời gian chờ phòng Lab phục hồi đầu phun, quý khách có thể ủy thác các lô hàng gấp cho [dịch vụ in UV dữ liệu biến đổi VDP ứng cứu đơn hàng](https://inanvnpis.com/blog/dich-vu-in-uv-du-lieu-bien-doi-vdp) tại xưởng gia công inanvnpis.com với công suất 50.000 sản phẩm/ngày để đảm bảo 100% tiến độ bàn giao."*

---

### Vector 5 ($I \to V$): `inanvnpis.com` $\to$ `vnpis.com`
- **Context:** OEM print service clients whose batch volumes have grown from pilot runs to mass production ($> 50,000 - 100,000\text{ units/month}$).
- **Pain Point:** Cumulative outsourcing costs exceed the amortization and operating costs of purchasing and running an automated in-house printing machine.
- **Funnel Stage:** MoFu $\to$ BoFu (Capital Investment Justification).
- **Trigger Keywords:** `sản lượng lớn trên 100000`, `tự đầu tư máy in`, `tính toán roi máy in`, `điểm hòa vốn gia công`, `dây chuyền mâm xoay`.
- **Target URL:** `https://vnpis.com/blog/day-chuyen-in-tampon-tu-dong-mam-xoay`
- **Conversion CTA Block:**
  > *"Khi sản lượng in ấn định kỳ vượt mốc 50.000 sản phẩm/tháng, doanh nghiệp nên cân nhắc chuyển giao [dây chuyền máy in tampon tự động mâm xoay tích hợp PLC](https://vnpis.com/blog/day-chuyen-in-tampon-tu-dong-mam-xoay) từ VNPIS để cắt giảm 60% giá thành đơn vị và chủ động kế hoạch giao hàng."*

---

### Vector 6 ($I \to C$): `inanvnpis.com` $\to$ `cuuhodauin.com`
- **Context:** B2B manufacturing clients exploring OEM printing services whose internal printers have suffered printhead clogging, banding, or color shift defects.
- **Pain Point:** Factory in-house printers failing quality control due to dirty nozzles, air locks, or waveform misalignment.
- **Funnel Stage:** MoFu $\to$ BoFu (Technical Remediation).
- **Trigger Keywords:** `máy in khách hàng bị nghẹt`, `đầu in epson bị sọc`, `đầu ricoh đứt tia`, `sự cố đầu phun`, `phòng lab cứu hộ`.
- **Target URL:** `https://cuuhodauin.com/kien-thuc/xu-ly-dau-in-epson-i3200-lech-tia-thong-vach`
- **Conversion CTA Block:**
  > *"Nếu dàn máy in tại nhà máy của bạn đang bị sọc ngang hoặc đứt kênh màu, hãy gửi mẫu đầu phun đến [Phòng Lab Cứu Hộ Đầu In VNPIS (cuuhodauin.com)](https://cuuhodauin.com/kien-thuc/xu-ly-dau-in-epson-i3200-lech-tia-thong-vach) để được chẩn đoán xung điện trở kháng piezo và xử lý thông vách chuyên sâu."*

---

## 3. Anchor Text Diversity Protocol & Penalty Mitigation

To safeguard against search engine link spam algorithms (Google Penguin & SpamBrain), cross-domain anchor text distributions must adhere to strict ratio boundaries:

```
┌────────────────────────────────────────┬───────────────────┬──────────────────────────────────────────┐
│ Anchor Text Category                   │ Target Ratio      │ Example Anchor Text                      │
├────────────────────────────────────────┼───────────────────┼──────────────────────────────────────────┤
│ 1. Partial Match / Semantic Long-Tail  │ 35% – 40%         │ "dịch vụ phục hồi đầu in Ricoh Gen5..." │
│ 2. Brand + Contextual Phrase           │ 25% – 30%         │ "Phòng Lab Cứu Hộ Đầu In VNPIS"          │
│ 3. Conversational / Action-Oriented CTA│ 20% – 25%         │ "tham khảo quy trình phục hồi đầu in..." │
│ 4. Exact Match (Strict Cap)            │ ≤ 10% MAXIMUM CAP │ "cứu hộ đầu in ricoh gen5"               │
└────────────────────────────────────────┴───────────────────┴──────────────────────────────────────────┘
```

### 3.1. Algorithmic Anchor Selection Logic
The `interlink_engine.js` module dynamically assigns anchor text using a deterministic cycling algorithm:
$$\text{categoryIndex} = (\text{articleIndex} + \text{linkOccurrence}) \pmod 4$$
- When $\text{categoryIndex} = 0$: Returns a **Partial Match** anchor ($40\%$ weight).
- When $\text{categoryIndex} = 1$: Returns a **Brand + Context** anchor ($30\%$ weight).
- When $\text{categoryIndex} = 2$: Returns a **Conversational CTA** anchor ($20\%$ weight).
- When $\text{categoryIndex} = 3$: Returns an **Exact Match** anchor ($10\%$ capped weight).

---

## 4. Internal Hierarchical Linking Architecture

In addition to cross-domain links, each domain maintains an airtight internal silo structure:

```
                              ┌───────────────────────────────────┐
                              │         PILLAR HUB PAGE           │
                              │     (Comprehensive 3000w Guide)   │
                              └───────▲───────────────────┬───────┘
                                      │                   │
                  1x Contextual Link  │                   │ 3-4x Cluster Links
                  Back to Pillar      │                   │ Distributed in Body
                                      │                   │
             ┌────────────────────────┴───────────────────▼────────────────────────┐
             │                                                                     │
┌────────────┴────────────┐             ┌─────────────────────────┐             ┌──┴──────────────────────┐
│  Sub-Cluster Leaf A     │◀───────────▶│   Sub-Cluster Leaf B    │◀───────────▶│   Sub-Cluster Leaf C    │
│  (Deep Dive 1800w)      │ Lateral Link│   (Deep Dive 1800w)     │ Lateral Link│   (Deep Dive 1800w)     │
└─────────────────────────┘             └─────────────────────────┘             └─────────────────────────┘
```

1. **Pillar to Cluster (Downstream Equity Cascade):** Every Pillar article links to all 3–4 subordinate sub-cluster articles using technical machine/printhead classification anchors.
2. **Cluster to Pillar (Upstream Equity Consolidation):** Every Sub-cluster article contains at least 1 prominent link back to its parent Pillar hub.
3. **Sibling Lateral Linking (Contextual Traversal):** Sub-clusters within the same pillar cross-link laterally ($\le 2\text{ links}$) to guide readers across complementary technical aspects.
4. **Zero Orphan Page Guarantee:** No article draft may be published without at least 1 incoming internal link and 1 incoming cross-domain link.

---

## 5. Technical Specifications & Markdown AST Safety

### 5.1. HTML & Link Placement Rules
- **Target & Rel Attributes:** External cross-domain links must open in a new tab: `target="_blank"` and include `rel="noopener"` (preserving security while allowing PageRank flow).
- **Introductory Exclusion Buffer:** No cross-domain link may appear within the first **200 words** (reserved exclusively for problem statement and hook).
- **Minimum Word Distance:** A minimum of **300 words** of contextual text must separate two consecutive interlinks.
- **Maximum Link Density:** Strictly capped at **$\le 3$ cross-domain links** per 1,500–3,000 word article.
- **No Self-Linking:** A document on domain $D_A$ must never link to $D_A$ via cross-domain routing rules.

### 5.2. Markdown AST Parsing Integrity
The link injector parses markdown and strictly forbids link insertion inside:
- Markdown Headings (`#`, `##`, `###`, `####`)
- Fenced Code Blocks (` ```lang ... ``` `) and Inline Code (`` `code` ``)
- Existing Markdown Links (`[text](url)`) or Images (`![alt](url)`)
- YAML Frontmatter (`--- ... ---`)

---

## 6. Schema Markup Cross-Referencing

To signal unified entity ownership to Google Knowledge Graph without confusing domain topicality, JSON-LD Schema markup in Milestone M3 will cross-reference the triad:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CÔNG TY TNHH VNPIS",
  "taxID": "0318266611",
  "url": "https://vnpis.com",
  "sameAs": [
    "https://cuuhodauin.com",
    "https://inanvnpis.com",
    "https://facebook.com/vnpis.vietnam"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+84-987-453-866",
    "contactType": "technical support",
    "areaServed": "VN",
    "availableLanguage": "Vietnamese"
  }
}
```

---

## 7. Monitoring, Audit & Maintenance Protocol

1. **Automated Weekly Audits:** The `runInterlinkAudit()` CLI tool scans all markdown files across the 3 CMS content folders to verify:
   - Zero broken URLs (HTTP 404/301 loops).
   - Anchor text exact match percentage strictly $\le 10\%$.
   - Symmetrical link distribution across the 6 vectors.
2. **Google Search Console Integration:** Weekly monitoring of anchor text distributions in GSC Links report to proactively detect algorithmic drift.
3. **Draft Mode Isolation:** Interlinks injected in draft articles are staged safely within CMS directories (`vnpis-web/content/articles`, `cuuhodauin-web/content/articles`, `inanvnpis-web/content/articles`) until human editorial approval.
