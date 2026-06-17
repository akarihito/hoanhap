export const DEFAULT_POLICIES = [
  {
    name: "Cấp thẻ Bảo hiểm y tế miễn phí",
    category: "Chăm sóc sức khỏe",
    icon: "medical_services",
    description: "Cấp thẻ Bảo hiểm y tế miễn phí 100% chi phí khám chữa bệnh đối với người khuyết tật nặng và đặc biệt nặng.",
    conditions: "Là người khuyết tật nặng hoặc đặc biệt nặng theo Giấy xác nhận mức độ khuyết tật.",
    supportRate: "Miễn phí 100% mức đóng BHYT hàng năm và chi phí khám chữa bệnh đúng tuyến tại tất cả các cơ sở y tế nhà nước.",
    documents: ["Tờ khai đăng ký cấp thẻ BHYT", "Bản sao Giấy xác nhận mức độ khuyết tật", "Bản sao Căn cước công dân hoặc giấy khai sinh đối với trẻ em"],
    disabilityTypes: ["Tất cả", "Trực quan/Khiếm thị", "Thính giác/Khiếm thính", "Vận động", "Trí tuệ"],
    ageGroups: ["Tất cả", "Trẻ em (<16 tuổi)", "Người trưởng thành (16-60 tuổi)", "Người cao tuổi (>60 tuổi)"],
    provinces: ["Tất cả"],
  },
  {
    name: "Trợ cấp xã hội hàng tháng cho NKT nặng",
    category: "Chăm sóc sức khỏe",
    icon: "payments",
    description: "Hỗ trợ tài chính hàng tháng đối với người khuyết tật nặng không có thu nhập hoặc ở điều kiện kinh tế khó khăn.",
    conditions: "Người khuyết tật nặng, đặc biệt nặng được cấp Giấy xác nhận khuyết tật và có hộ khẩu thường trú tại địa phương.",
    supportRate: "Hỗ trợ từ 540.000đ đến 900.000đ/tháng tùy theo mức độ khuyết tật và độ tuổi quy định tại địa phương.",
    documents: ["Tờ khai đề nghị trợ cấp xã hội hàng tháng", "Bản sao Giấy xác nhận khuyết tật", "Bản sao Căn cước công dân của người khuyết tật hoặc người giám hộ"],
    disabilityTypes: ["Tất cả", "Trực quan/Khiếm thị", "Thính giác/Khiếm thính", "Vận động", "Trí tuệ"],
    ageGroups: ["Tất cả", "Trẻ em (<16 tuổi)", "Người trưởng thành (16-60 tuổi)", "Người cao tuổi (>60 tuổi)"],
    provinces: ["Tất cả"],
  },
  {
    name: "Hỗ trợ miễn giảm học phí học sinh khuyết tật",
    category: "Giáo dục & Đào tạo",
    icon: "school",
    description: "Miễn giảm 100% học phí và hỗ trợ chi phí học tập cho học sinh, sinh viên khuyết tật tại các cơ sở giáo dục công lập.",
    conditions: "Học sinh, sinh viên là người khuyết tật nặng hoặc đặc biệt nặng đang theo học tại các cấp học từ mầm non đến đại học.",
    supportRate: "Miễn 100% học phí theo quy định của trường học công lập và hỗ trợ sinh hoạt học tập 150.000đ/tháng học.",
    documents: ["Đơn đề nghị miễn giảm học phí", "Bản sao Giấy xác nhận khuyết tật", "Giấy xác nhận đang đi học của nhà trường"],
    disabilityTypes: ["Tất cả", "Trực quan/Khiếm thị", "Thính giác/Khiếm thính", "Vận động", "Trí tuệ"],
    ageGroups: ["Trẻ em (<16 tuổi)", "Người trưởng thành (16-60 tuổi)"],
    provinces: ["Tất cả"],
  },
  {
    name: "Vay vốn ưu đãi giải quyết việc làm",
    category: "Việc làm & Sinh kế",
    icon: "work",
    description: "Hỗ trợ vay vốn kinh doanh, sản xuất với lãi suất ưu đãi từ Ngân hàng Chính sách Xã hội dành riêng cho người khuyết tật.",
    conditions: "Người khuyết tật có năng lực hành vi dân sự đầy đủ (hoặc qua người giám hộ), có phương án sản xuất kinh doanh khả thi.",
    supportRate: "Cho vay tối đa 100 triệu đồng/cá nhân, thời hạn vay lên đến 60 tháng với lãi suất bằng 50% lãi suất cho vay hộ nghèo.",
    documents: ["Giấy đề nghị vay vốn giải quyết việc làm", "Phương án sản xuất kinh doanh khả thi", "Bản sao Giấy xác nhận khuyết tật"],
    disabilityTypes: ["Tất cả", "Trực quan/Khiếm thị", "Thính giác/Khiếm thính", "Vận động"],
    ageGroups: ["Người trưởng thành (16-60 tuổi)"],
    provinces: ["Tất cả"],
  },
  {
    name: "Miễn giảm vé giao thông công cộng đô thị",
    category: "Giao thông & Công trình",
    icon: "accessible",
    description: "Miễn phí 100% vé xe buýt nội đô và giảm tối thiểu 50% vé tàu hỏa, vé máy bay nội địa đối với người khuyết tật.",
    conditions: "Người khuyết tật xuất trình Giấy xác nhận khuyết tật khi lên xe buýt hoặc mua vé tàu, vé máy bay.",
    supportRate: "Miễn 100% vé xe buýt tại Hà Nội và TP.HCM; giảm 50% giá vé tàu hỏa và giảm 15% giá vé máy bay nội địa.",
    documents: ["Xuất trình Giấy xác nhận khuyết tật tại quầy vé", "Căn cước công dân đối chiếu"],
    disabilityTypes: ["Tất cả", "Trực quan/Khiếm thị", "Thính giác/Khiếm thính", "Vận động", "Trí tuệ"],
    ageGroups: ["Tất cả", "Trẻ em (<16 tuổi)", "Người trưởng thành (16-60 tuổi)", "Người cao tuổi (>60 tuổi)"],
    provinces: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ"],
  },
  {
    name: "Giảm phí tham quan danh lam, di tích lịch sử",
    category: "Văn hóa, Thể thao & Du lịch",
    icon: "theater_comedy",
    description: "Miễn phí hoặc giảm tối thiểu 50% giá vé tham quan di tích lịch sử, bảo tàng, khu du lịch quốc gia.",
    conditions: "Người khuyết tật nặng và đặc biệt nặng xuất trình thẻ xác nhận khuyết tật tại phòng bán vé.",
    supportRate: "Giảm tối thiểu 50% (nhiều di tích công lập miễn phí 100%) phí vào cửa các khu du lịch, danh thắng do nhà nước quản lý.",
    documents: ["Giấy xác nhận khuyết tật hoặc thẻ người khuyết tật"],
    disabilityTypes: ["Tất cả", "Trực quan/Khiếm thị", "Thính giác/Khiếm thính", "Vận động", "Trí tuệ"],
    ageGroups: ["Tất cả", "Trẻ em (<16 tuổi)", "Người trưởng thành (16-60 tuổi)", "Người cao tuổi (>60 tuổi)"],
    provinces: ["Tất cả"],
  },
  {
    name: "Cấp phương tiện trợ giúp, dụng cụ chỉnh hình",
    category: "Chăm sóc sức khỏe",
    icon: "wheelchair_pickup",
    description: "Hỗ trợ cấp miễn phí xe lăn, xe lắc, chân tay giả hoặc dụng cụ chỉnh hình cho người khuyết tật khó khăn.",
    conditions: "Người khuyết tật vận động nghèo, cận nghèo hoặc có hoàn cảnh đặc biệt khó khăn được chỉ định y khoa.",
    supportRate: "Cấp miễn phí xe lăn tiêu chuẩn hoặc hỗ trợ tối đa 5.000.000đ/lần đối với lắp ráp dụng cụ chỉnh hình.",
    documents: ["Đơn đề nghị hỗ trợ phương tiện trợ giúp", "Bản sao Giấy xác nhận khuyết tật vận động", "Xác nhận hộ nghèo hoặc hoàn cảnh khó khăn"],
    disabilityTypes: ["Vận động"],
    ageGroups: ["Tất cả", "Trẻ em (<16 tuổi)", "Người trưởng thành (16-60 tuổi)", "Người cao tuổi (>60 tuổi)"],
    provinces: ["Tất cả"],
  },
  {
    name: "Học nghề trình độ sơ cấp miễn phí",
    category: "Việc làm & Sinh kế",
    icon: "engineering",
    description: "Hỗ trợ chi phí đào tạo nghề ngắn hạn dưới 3 tháng và trợ cấp ăn trưa, tiền xe đi lại cho người khuyết tật lao động.",
    conditions: "Người khuyết tật trong độ tuổi lao động (16-60 tuổi) có nhu cầu và khả năng học nghề phù hợp.",
    supportRate: "Tài trợ 100% học phí khóa học sơ cấp và hỗ trợ thêm 30.000đ/ngày học thực tế chi phí ăn uống.",
    documents: ["Đơn đăng ký học nghề dành cho NKT", "Bản sao Giấy xác nhận khuyết tật", "Giấy khám sức khỏe đủ điều kiện học tập"],
    disabilityTypes: ["Tất cả", "Trực quan/Khiếm thị", "Thính giác/Khiếm thính", "Vận động"],
    ageGroups: ["Người trưởng thành (16-60 tuổi)"],
    provinces: ["Tất cả"],
  }
];

export const DEFAULT_DOCUMENTS = [
  {
    title: "Luật Người khuyết tật số 51/2010/QH12",
    date: "Ban hành ngày 17/06/2010",
    url: "/documents/100699_l51qh.doc",
  },
  {
    title: "Nghị định 20/2021/NĐ-CP",
    date: "Quy định chính sách trợ giúp xã hội đối với đối tượng bảo trợ xã hội",
    url: "/documents/nghi_dinh_20_2021_nd_cp.pdf",
  },
];

export const DEFAULT_LOCATIONS = [
  {
    name: "Bệnh viện Phục hồi chức năng Hà Nội",
    category: "Cơ sở phục hồi chức năng",
    icon: "local_hospital",
    lat: 21.0022,
    lng: 105.8016,
    address: "Số 35 Lê Văn Thiêm, Thanh Xuân, Hà Nội",
    phone: "024 3858 2234",
    workingHours: "07:30 - 17:00",
    accessibilityBadges: ["Có đường dốc xe lăn", "Thang máy tiếp cận"],
    utilities: ["Dốc xe lăn", "Thang máy"],
    description: "Cơ sở y tế đầu ngành về phục hồi chức năng và điều trị vật lý trị liệu tại Hà Nội.",
  },
  {
    name: "Trung tâm Chăm sóc NKT Vì Ngày Mai",
    category: "Trung tâm giáo dục đặc biệt",
    icon: "school",
    lat: 21.0065,
    lng: 105.8362,
    address: "Ngõ 120 Trường Chinh, Đống Đa, Hà Nội",
    phone: "024 3869 2233",
    workingHours: "08:00 - 18:00",
    accessibilityBadges: ["Lối vào bằng phẳng", "Chữ nổi Braille"],
    utilities: ["Lối vào phẳng", "Chữ Braille"],
    description: "Nơi cung cấp các lớp học nghề, can thiệp sớm và giáo dục đặc biệt.",
  },
  {
    name: "Sở Lao động - Thương binh & Xã hội Hà Nội",
    category: "Cơ quan nhà nước",
    icon: "groups",
    lat: 21.0254,
    lng: 105.8239,
    address: "Số 75 Nguyễn Chí Thanh, Láng Hạ, Đống Đa, Hà Nội",
    phone: "024 3773 2434",
    workingHours: "08:00 - 17:00",
    accessibilityBadges: ["Có đường dốc xe lăn", "Thang máy tiếp cận"],
    utilities: ["Dốc xe lăn", "Thang máy"],
    description: "Cơ quan hành chính tiếp nhận và xử lý hồ sơ trợ cấp, chính sách ưu đãi.",
  },
];

export const DEFAULT_CONNECTIONS = [
  {
    name: "Nguyễn Thu Hà",
    type: "tình nguyện viên",
    typeLabel: "Tình nguyện viên",
    location: "Cầu Giấy, Hà Nội",
    region: "Hà Nội",
    supportType: "Hướng dẫn thủ tục",
    description: "Có kinh nghiệm 5 năm hỗ trợ người khiếm thị làm các thủ tục hành chính.",
    email: "thuha.nguyen@hoanhap.org",
    phone: "0912345678",
    availability: "Cuối tuần",
    details: "Tôi hiện đang là kiểm toán viên nhưng dành thời gian rảnh cuối tuần tham gia thiện nguyện.",
    avatarUrl: "",
    status: "approved"
  },
  {
    name: "Hành trình Hy vọng",
    type: "cộng đồng",
    typeLabel: "Cộng đồng",
    location: "Quận 3, TP. Hồ Chí Minh",
    region: "TP. Hồ Chí Minh",
    supportType: "Vận chuyển",
    description: "Tổ chức chuyên hỗ trợ vận chuyển người khuyết tật bằng phương tiện chuyên dụng.",
    email: "hanhtrinhhyvong@hoanhap.org",
    phone: "0987654321",
    availability: "8:00 - 17:00",
    details: "Sở hữu đội xe bán tải có lắp bệ nâng thủy lực chuyên chở xe lăn.",
    avatarUrl: "",
    status: "approved"
  },
];

export const DEFAULT_OFFICES = [
  {
    city: "Hà Nội",
    name: "Sở Lao động - Thương binh và Xã hội Hà Nội",
    address: "Số 75 Nguyễn Chí Thanh, Láng Hạ, Đống Đa, Hà Nội",
    phone: "024 3835 8868",
    email: "vanthu_soldsxh@hanoi.gov.vn",
  },
  {
    city: "TP. Hồ Chí Minh",
    name: "Sở Lao động - Thương binh và Xã hội TP.HCM",
    address: "159 Pasteur, Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh",
    phone: "028 3829 1302",
    email: "sldtbxh@tphcm.gov.vn",
  },
  {
    city: "Đà Nẵng",
    name: "Sở Lao động - Thương binh và Xã hội Đà Nẵng",
    address: "512 Ngô Quyền, An Hải Bắc, Sơn Trà, Đà Nẵng",
    phone: "0236 3822 423",
    email: "sldtbxh@danang.gov.vn",
  },
];

export const DEFAULT_ARTICLES = [
  {
    title: "Hướng dẫn đăng ký thẻ bảo hiểm y tế miễn phí cho người khuyết tật",
    category: "phap-luat",
    summary: "Chi tiết các bước từ việc xác định đối tượng, chuẩn bị hồ sơ đến việc nộp đơn tại cơ quan BHXH địa phương.",
    date: "14/06/2026",
    readTime: "5 phút đọc",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "5 bài tập phục hồi chức năng vận động tại nhà đơn giản và an toàn",
    category: "suc-khoe",
    summary: "Các bài tập nhẹ nhàng giúp duy trì độ linh hoạt khớp xương và tăng cường tuần hoàn máu mà không cần dụng cụ chuyên dụng.",
    date: "12/06/2026",
    readTime: "8 phút đọc",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Kinh nghiệm tìm kiếm việc làm hòa nhập dành cho người khiếm thính",
    category: "doi-song",
    summary: "Chia sẻ từ các bạn trẻ khiếm thính về cách vượt qua rào cản phỏng vấn, tận dụng các công nghệ hỗ trợ giao tiếp hiệu quả.",
    date: "10/06/2026",
    readTime: "6 phút đọc",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Các điều khoản mới nhất trong Luật Người khuyết tật có hiệu lực năm 2026",
    category: "phap-luat",
    summary: "Phân tích những điểm thay đổi quan trọng về mức trợ cấp xã hội, chính sách ưu tiên đào tạo nghề và tuyển dụng lao động.",
    date: "08/06/2026",
    readTime: "10 phút đọc",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600",
  },
];

export const DEFAULT_FORUM_POSTS = [
  {
    title: "Cách cải tiến thìa ăn cho người bị liệt cơ bàn tay",
    board: "support",
    subType: "mẹo vặt",
    content: "Chào mọi người, bố mình bị tai biến nhẹ dẫn đến liệt cơ bàn tay và cầm nắm thìa rất khó khăn. Mình đã tự chế bằng cách bọc một lớp mút xốp dày (loại bọc ghi-đông xe đạp) quanh cán thìa, sau đó quấn thêm băng thun tự dính. Nhờ cán thìa to và mềm hơn nên bố mình tự xúc ăn rất dễ dàng! Ai có người nhà hoàn cảnh tương tự có thể tham khảo mẹo này nhé.",
    authorName: "Trần Thế Anh",
    authorId: "seed-user-1",
    authorRole: "member",
    authorBadge: "Đại sứ Hoà Nhập",
    reactions: { care: 5, inspire: 3, withYou: 2 },
    comments: [
      {
        id: "comm-1",
        authorName: "Nguyễn Thu Hà",
        authorRole: "volunteer",
        authorBadge: "Trái tim Vàng",
        text: "Mẹo hay quá bạn ơi! Cán to giúp lực cầm được phân phối đều hơn. Cảm ơn bạn đã chia sẻ sáng kiến rất ý nghĩa này.",
        createdAt: "2026-06-16T12:00:00Z"
      }
    ],
    createdAt: "2026-06-16T10:00:00.000Z"
  },
  {
    title: "Cần tình nguyện viên đẩy xe lăn và đọc sách tại Thư viện Tổng hợp Huế",
    board: "support",
    subType: "đồng hành",
    content: "Mình tên là Minh, hiện đang sống tại TP. Huế. Mình bị liệt hai chân và rất thích đọc sách. Sáng thứ 7 tuần này (từ 8h30 đến 11h), mình muốn đến Thư viện Tổng hợp Huế ở đường Lê Lợi để mượn và đọc tài liệu nghiên cứu. Mình cần một bạn tình nguyện viên hỗ trợ đẩy xe giúp và phụ lấy sách trên kệ cao. Rất mong được đồng hành cùng một bạn hảo tâm!",
    authorName: "Nguyễn Tuấn Minh",
    authorId: "seed-user-2",
    authorRole: "member",
    authorBadge: "",
    reactions: { care: 8, inspire: 2, withYou: 6 },
    comments: [],
    offers: [
      {
        volunteerName: "Phan Văn Nam",
        contactInfo: "0905999888 - namphan@gmail.com",
        message: "Chào bạn Minh, sáng thứ 7 tuần này mình rảnh. Mình ở gần thư viện và có thể qua hỗ trợ bạn suốt buổi sáng nhé. Đã nhắn tin Zalo cho bạn!",
        createdAt: "2026-06-16T15:30:00Z"
      }
    ],
    createdAt: "2026-06-16T08:30:00.000Z"
  },
  {
    title: "Hành trình lần đầu tự lái xe máy ba bánh tự chế của tôi",
    board: "inspiration",
    subType: "nhật ký",
    content: "Suốt 25 năm qua, tôi chỉ quanh quẩn trong bốn bức tường hoặc phụ thuộc vào người thân đưa đón. Nhưng tuần trước, nhờ sự hỗ trợ vay vốn của Ngân hàng CSXH và một xưởng cơ khí tình nghĩa, chiếc xe máy ba bánh đầu tiên của tôi đã hoàn thành. Lần đầu tiên tự tay vít ga, đón gió trời trên đường phố, cảm giác tự do thật sự không thể tả bằng lời. Tôi viết nhật ký này để nhắn nhủ các bạn có cùng hoàn cảnh: Đừng bao giờ từ bỏ khát vọng bước ra thế giới!",
    authorName: "Lê Văn Hùng",
    authorId: "seed-user-3",
    authorRole: "member",
    authorBadge: "Đại sứ Hoà Nhập",
    reactions: { care: 12, inspire: 25, withYou: 18 },
    comments: [
      {
        id: "comm-2",
        authorName: "Hành trình Hy vọng",
        authorRole: "admin",
        authorBadge: "Trái tim Vàng",
        text: "Chúc mừng anh Hùng! Câu chuyện của anh thực sự truyền cảm hứng rất lớn cho toàn thể thành viên của Hoà Nhập.",
        createdAt: "2026-06-16T09:15:00Z"
      }
    ],
    createdAt: "2026-06-16T05:00:00.000Z"
  },
  {
    title: "Khai giảng Lớp học Tin học Văn phòng miễn phí qua Zoom",
    board: "aspiration",
    subType: "kỹ năng",
    content: "Nhóm tin học thiện nguyện chúng mình sẽ khai giảng khóa tin học văn phòng cơ bản (Word, Excel, cách tìm kiếm thông tin an toàn) trực tuyến dành riêng cho các bạn khuyết tật vận động hoặc thính giác. Lớp học hoàn toàn miễn phí, học vào tối thứ 3 và thứ 5 từ 19h30. Có hỗ trợ phụ đề trực tiếp (caption) cho các bạn khiếm thính. Các bạn quan tâm bình luận hoặc nhấn nút liên hệ để đăng ký nhé!",
    authorName: "CLB Tin Học Xanh",
    authorId: "seed-user-4",
    authorRole: "volunteer",
    authorBadge: "Trái tim Vàng",
    reactions: { care: 4, inspire: 10, withYou: 7 },
    comments: [],
    createdAt: "2026-06-15T14:00:00.000Z"
  }
];

