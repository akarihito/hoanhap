import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Icon from "../components/ui/Icon";
import { useAccessibility } from "../contexts/AccessibilityContext";

// Fallbacks for data initialization
const DEFAULT_LOCATIONS = [
  {
    id: "loc-1",
    name: "Bệnh viện Phục hồi chức năng Hà Nội",
    category: "Cơ sở phục hồi chức năng",
    icon: "local_hospital",
    lat: 21.0022,
    lng: 105.8016,
    address: "Số 35 Lê Văn Thiêm, Thanh Xuân, Hà Nội",
    phone: "024 3858 2234",
    workingHours: "07:30 - 17:00",
    distance: "1.2 km",
    accessibilityBadges: ["Có đường dốc xe lăn", "Thang máy tiếp cận"],
    utilities: ["Dốc xe lăn", "Thang máy"],
    description: "Cơ sở y tế đầu ngành về phục hồi chức năng và điều trị vật lý trị liệu tại Hà Nội.",
  },
  {
    id: "loc-2",
    name: "Trung tâm Chăm sóc NKT Vì Ngày Mai",
    category: "Trung tâm giáo dục đặc biệt",
    icon: "school",
    lat: 21.0065,
    lng: 105.8362,
    address: "Ngõ 120 Trường Chinh, Đống Đa, Hà Nội",
    phone: "024 3869 2233",
    workingHours: "08:00 - 18:00",
    distance: "3.5 km",
    accessibilityBadges: ["Lối vào bằng phẳng", "Chữ nổi Braille"],
    utilities: ["Lối vào phẳng", "Chữ Braille"],
    description: "Nơi cung cấp các lớp học nghề, can thiệp sớm và giáo dục đặc biệt.",
  },
  {
    id: "loc-3",
    name: "Sở Lao động - Thương binh & Xã hội Hà Nội",
    category: "Cơ quan nhà nước",
    icon: "groups",
    lat: 21.0254,
    lng: 105.8239,
    address: "Số 75 Nguyễn Chí Thanh, Láng Hạ, Đống Đa, Hà Nội",
    phone: "024 3773 2434",
    workingHours: "08:00 - 17:00",
    distance: "2.8 km",
    accessibilityBadges: ["Có đường dốc xe lăn", "Thang máy tiếp cận"],
    utilities: ["Dốc xe lăn", "Thang máy"],
    description: "Cơ quan hành chính tiếp nhận và xử lý hồ sơ trợ cấp, chính sách ưu đãi.",
  },
];

const DEFAULT_CONNECTIONS = [
  {
    id: "conn-1",
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
  },
  {
    id: "conn-2",
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
  },
];

const DEFAULT_POLICIES = [
  {
    id: "pol-1",
    name: "Cấp thẻ Bảo hiểm y tế miễn phí",
    category: "Chăm sóc sức khỏe",
    icon: "medical_services",
    description: "Cấp thẻ Bảo hiểm y tế miễn phí 100% chi phí khám chữa bệnh đối với người khuyết tật nặng và đặc biệt nặng.",
    conditions: "Là người khuyết tật nặng hoặc đặc biệt nặng theo Giấy xác nhận mức độ khuyết tật.",
    supportRate: "Miễn phí 100% mức đóng BHYT hàng năm và chi phí khám chữa bệnh đúng tuyến tại tất cả các cơ sở y tế nhà nước.",
    documents: ["Tờ khai đăng ký cấp thẻ BHYT", "Bản sao Giấy xác nhận mức độ khuyết tật"],
    disabilityTypes: ["Tất cả", "Trực quan/Khiếm thị", "Thính giác/Khiếm thính", "Vận động", "Trí tuệ"],
    ageGroups: ["Tất cả", "Trẻ em (<16 tuổi)", "Người trưởng thành (16-60 tuổi)"],
    provinces: ["Tất cả"],
  },
  {
    id: "pol-2",
    name: "Trợ cấp xã hội hàng tháng cho NKT nặng",
    category: "Chăm sóc sức khỏe",
    icon: "payments",
    description: "Hỗ trợ tài chính hàng tháng đối với người khuyết tật nặng không có thu nhập hoặc ở điều kiện kinh tế khó khăn.",
    conditions: "Người khuyết tật nặng, đặc biệt nặng được cấp Giấy xác nhận khuyết tật và có hộ khẩu thường trú tại địa phương.",
    supportRate: "Hỗ trợ từ 540.000đ đến 900.000đ/tháng tùy theo mức độ khuyết tật và độ tuổi quy định tại địa phương.",
    documents: ["Tờ khai đề nghị trợ cấp xã hội", "Bản sao Giấy xác nhận khuyết tật", "Bản sao CCCD"],
    disabilityTypes: ["Tất cả", "Trực quan/Khiếm thị", "Thính giác/Khiếm thính", "Vận động"],
    ageGroups: ["Tất cả", "Trẻ em (<16 tuổi)", "Người trưởng thành (16-60 tuổi)"],
    provinces: ["Tất cả"],
  },
];

const DEFAULT_DOCUMENTS = [
  {
    id: "doc-1",
    title: "Luật Người khuyết tật số 51/2010/QH12",
    date: "Ban hành ngày 17/06/2010",
    url: "/documents/100699_l51qh.doc",
  },
  {
    id: "doc-2",
    title: "Nghị định 20/2021/NĐ-CP",
    date: "Quy định chính sách trợ giúp xã hội đối với đối tượng bảo trợ xã hội",
    url: "/documents/nghi_dinh_20_2021_nd_cp.pdf",
  },
];

const DEFAULT_OFFICES = [
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
];

export default function AdminPage() {
  const { user } = useAuth();
  const { speakText } = useAccessibility();

  // Redirect if not logged in as Admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Active Tab
  const [activeTab, setActiveTab] = useState("overview"); // overview | users | rights | locations | connections | allowance

  // Datasets states
  const [users, setUsers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [connections, setConnections] = useState([]);
  const [offices, setOffices] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Base rate config
  const [allowanceRate, setAllowanceRate] = useState(360000);
  const [rateInput, setRateInput] = useState("360000");

  // Form states - Rights Policy Add/Edit
  const [isPolicyFormOpen, setIsPolicyFormOpen] = useState(false);
  const [editingPolicyId, setEditingPolicyId] = useState(null);
  const [policyForm, setPolicyForm] = useState({
    name: "",
    category: "Chăm sóc sức khỏe",
    icon: "medical_services",
    description: "",
    conditions: "",
    supportRate: "",
    docsText: "",
    disabilityTypesText: "Tất cả",
    ageGroupsText: "Tất cả",
    provincesText: "Tất cả",
  });

  // Form states - Legal Document Add/Edit
  const [isDocFormOpen, setIsDocFormOpen] = useState(false);
  const [editingDocId, setEditingDocId] = useState(null);
  const [docForm, setDocForm] = useState({
    title: "",
    date: "",
    url: "",
  });

  // Form states - Location Add/Edit
  const [isLocFormOpen, setIsLocFormOpen] = useState(false);
  const [editingLocId, setEditingLocId] = useState(null);
  const [locForm, setLocForm] = useState({
    name: "",
    category: "Cơ sở phục hồi chức năng",
    address: "",
    phone: "",
    workingHours: "08:00 - 17:00",
    lat: "",
    lng: "",
    description: "",
    badgesText: "Dốc xe lăn, Thang máy tiếp cận",
  });

  // Form states - Connection Add/Edit
  const [isConnFormOpen, setIsConnFormOpen] = useState(false);
  const [editingConnId, setEditingConnId] = useState(null);
  const [connForm, setConnForm] = useState({
    name: "",
    type: "tình nguyện viên",
    location: "",
    region: "Hà Nội",
    supportType: "Hướng dẫn thủ tục",
    description: "",
    email: "",
    phone: "",
    availability: "Thỏa thuận",
    details: "",
  });

  // Form states - Welfare Office Add/Edit
  const [isOfficeFormOpen, setIsOfficeFormOpen] = useState(false);
  const [editingOfficeId, setEditingOfficeId] = useState(null);
  const [officeForm, setOfficeForm] = useState({
    city: "Hà Nội",
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  // Selected feedback for detail modal
  const [viewingFeedback, setViewingFeedback] = useState(null);

  // Load datasets on mount
  useEffect(() => {
    // 1. Users
    const storedUsers = localStorage.getItem("hoa-nhap-registered-users");
    if (storedUsers) setUsers(JSON.parse(storedUsers));

    // 2. Base Allowance Rate
    const savedRate = localStorage.getItem("allowance-base-rate");
    if (savedRate) {
      setAllowanceRate(parseInt(savedRate, 10));
      setRateInput(savedRate);
    }

    // 3. Policies & Documents
    const storedPol = localStorage.getItem("hoa-nhap-policies");
    if (storedPol) {
      setPolicies(JSON.parse(storedPol));
    } else {
      localStorage.setItem("hoa-nhap-policies", JSON.stringify(DEFAULT_POLICIES));
      setPolicies(DEFAULT_POLICIES);
    }

    const storedDocs = localStorage.getItem("hoa-nhap-legal-documents");
    if (storedDocs) {
      setDocuments(JSON.parse(storedDocs));
    } else {
      localStorage.setItem("hoa-nhap-legal-documents", JSON.stringify(DEFAULT_DOCUMENTS));
      setDocuments(DEFAULT_DOCUMENTS);
    }

    // 4. Map Locations
    const storedLocs = localStorage.getItem("hoa-nhap-map-locations");
    if (storedLocs) {
      setLocations(JSON.parse(storedLocs));
    } else {
      localStorage.setItem("hoa-nhap-map-locations", JSON.stringify(DEFAULT_LOCATIONS));
      setLocations(DEFAULT_LOCATIONS);
    }

    // 5. Connections
    const storedConns = localStorage.getItem("hoa-nhap-connections");
    if (storedConns) {
      setConnections(JSON.parse(storedConns));
    } else {
      localStorage.setItem("hoa-nhap-connections", JSON.stringify(DEFAULT_CONNECTIONS));
      setConnections(DEFAULT_CONNECTIONS);
    }

    // 6. Welfare Offices
    const storedOffices = localStorage.getItem("hoa-nhap-welfare-offices");
    if (storedOffices) {
      setOffices(JSON.parse(storedOffices));
    } else {
      localStorage.setItem("hoa-nhap-welfare-offices", JSON.stringify(DEFAULT_OFFICES));
      setOffices(DEFAULT_OFFICES);
    }

    // 7. Feedbacks
    const storedFeedbacks = localStorage.getItem("hoa-nhap-feedbacks");
    if (storedFeedbacks) setFeedbacks(JSON.parse(storedFeedbacks));
  }, []);

  // Update Base Rate
  const handleUpdateRate = (e) => {
    e.preventDefault();
    const rateVal = parseInt(rateInput, 10);
    if (isNaN(rateVal) || rateVal <= 0) {
      speakText("Lỗi: Mức chuẩn trợ cấp không hợp lệ.");
      alert("Mức chuẩn trợ cấp phải là số dương.");
      return;
    }
    localStorage.setItem("allowance-base-rate", rateInput);
    setAllowanceRate(rateVal);
    window.dispatchEvent(new Event("storage"));
    speakText(`Đã cập nhật mức chuẩn trợ cấp xã hội thành ${rateVal.toLocaleString("vi-VN")} đồng.`);
    alert("Cập nhật mức trợ cấp chuẩn thành công!");
  };

  // Toggle user status
  const toggleUserStatus = (email) => {
    const updated = users.map((u) => {
      if (u.email === email) {
        const nextStatus = u.status === "suspended" ? "active" : "suspended";
        speakText(`Đã thay đổi trạng thái của tài khoản ${u.fullName} thành ${nextStatus === "suspended" ? "Bị khoá" : "Đang hoạt động"}`);
        return { ...u, status: nextStatus };
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem("hoa-nhap-registered-users", JSON.stringify(updated));
  };

  const handleDeleteUser = (email) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      const updated = users.filter((u) => u.email !== email);
      setUsers(updated);
      localStorage.setItem("hoa-nhap-registered-users", JSON.stringify(updated));
      speakText("Đã xóa tài khoản.");
    }
  };

  // Save Rights Policy
  const handleSavePolicy = (e) => {
    e.preventDefault();
    if (!policyForm.name || !policyForm.description || !policyForm.supportRate) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      return;
    }

    const docsArray = policyForm.docsText.split(",").map((s) => s.trim()).filter((s) => s);
    const disabilityArray = policyForm.disabilityTypesText.split(",").map((s) => s.trim()).filter((s) => s);
    const ageArray = policyForm.ageGroupsText.split(",").map((s) => s.trim()).filter((s) => s);
    const provincesArray = policyForm.provincesText.split(",").map((s) => s.trim()).filter((s) => s);

    if (editingPolicyId) {
      const updated = policies.map((pol) => {
        if (pol.id === editingPolicyId) {
          return {
            ...pol,
            name: policyForm.name,
            category: policyForm.category,
            icon: policyForm.icon,
            description: policyForm.description,
            conditions: policyForm.conditions,
            supportRate: policyForm.supportRate,
            documents: docsArray,
            disabilityTypes: disabilityArray,
            ageGroups: ageArray,
            provinces: provincesArray,
          };
        }
        return pol;
      });
      setPolicies(updated);
      localStorage.setItem("hoa-nhap-policies", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText(`Đã cập nhật chính sách ${policyForm.name}.`);
    } else {
      const newPol = {
        id: `pol-${Date.now()}`,
        name: policyForm.name,
        category: policyForm.category,
        icon: policyForm.icon,
        description: policyForm.description,
        conditions: policyForm.conditions,
        supportRate: policyForm.supportRate,
        documents: docsArray,
        disabilityTypes: disabilityArray,
        ageGroups: ageArray,
        provinces: provincesArray,
      };
      const updated = [newPol, ...policies];
      setPolicies(updated);
      localStorage.setItem("hoa-nhap-policies", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText(`Đã thêm mới chính sách ${policyForm.name}.`);
    }

    setIsPolicyFormOpen(false);
    setEditingPolicyId(null);
    setPolicyForm({
      name: "",
      category: "Chăm sóc sức khỏe",
      icon: "medical_services",
      description: "",
      conditions: "",
      supportRate: "",
      docsText: "",
      disabilityTypesText: "Tất cả",
      ageGroupsText: "Tất cả",
      provincesText: "Tất cả",
    });
  };

  const handleEditPolicy = (pol) => {
    setEditingPolicyId(pol.id);
    setPolicyForm({
      name: pol.name,
      category: pol.category,
      icon: pol.icon || "medical_services",
      description: pol.description,
      conditions: pol.conditions || "",
      supportRate: pol.supportRate,
      docsText: (pol.documents || []).join(", "),
      disabilityTypesText: (pol.disabilityTypes || []).join(", "),
      ageGroupsText: (pol.ageGroups || []).join(", "),
      provincesText: (pol.provinces || []).join(", "),
    });
    setIsPolicyFormOpen(true);
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chính sách này?")) {
      const updated = policies.filter((pol) => pol.id !== id);
      setPolicies(updated);
      localStorage.setItem("hoa-nhap-policies", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText("Đã xóa chính sách.");
    }
  };

  // Save Legal Document
  const handleSaveDoc = (e) => {
    e.preventDefault();
    if (!docForm.title || !docForm.url) {
      alert("Vui lòng điền tiêu đề và liên kết.");
      return;
    }

    if (editingDocId) {
      const updated = documents.map((doc) => {
        if (doc.id === editingDocId) {
          return {
            ...doc,
            title: docForm.title,
            date: docForm.date || "Không xác định",
            url: docForm.url,
          };
        }
        return doc;
      });
      setDocuments(updated);
      localStorage.setItem("hoa-nhap-legal-documents", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText(`Đã cập nhật văn bản ${docForm.title}.`);
    } else {
      const newDoc = {
        id: `doc-${Date.now()}`,
        title: docForm.title,
        date: docForm.date || "Ban hành mới",
        url: docForm.url,
      };
      const updated = [newDoc, ...documents];
      setDocuments(updated);
      localStorage.setItem("hoa-nhap-legal-documents", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText(`Đã thêm mới văn bản ${docForm.title}.`);
    }

    setIsDocFormOpen(false);
    setEditingDocId(null);
    setDocForm({ title: "", date: "", url: "" });
  };

  const handleEditDoc = (doc) => {
    setEditingDocId(doc.id);
    setDocForm({
      title: doc.title,
      date: doc.date || "",
      url: doc.url,
    });
    setIsDocFormOpen(true);
  };

  const handleDeleteDoc = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa văn bản pháp luật này?")) {
      const updated = documents.filter((doc) => doc.id !== id);
      setDocuments(updated);
      localStorage.setItem("hoa-nhap-legal-documents", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText("Đã xóa văn bản.");
    }
  };

  // Save/Update Map Location
  const handleSaveLocation = (e) => {
    e.preventDefault();
    if (!locForm.name || !locForm.address || !locForm.lat || !locForm.lng) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      return;
    }

    const badgeArray = locForm.badgesText.split(",").map((s) => s.trim()).filter((s) => s);

    if (editingLocId) {
      const updated = locations.map((loc) => {
        if (loc.id === editingLocId) {
          return {
            ...loc,
            name: locForm.name,
            category: locForm.category,
            address: locForm.address,
            phone: locForm.phone,
            workingHours: locForm.workingHours,
            lat: parseFloat(locForm.lat),
            lng: parseFloat(locForm.lng),
            description: locForm.description,
            accessibilityBadges: badgeArray,
            utilities: badgeArray,
          };
        }
        return loc;
      });
      setLocations(updated);
      localStorage.setItem("hoa-nhap-map-locations", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText(`Đã cập nhật thông tin địa điểm ${locForm.name}.`);
    } else {
      const newLoc = {
        id: `loc-${Date.now()}`,
        name: locForm.name,
        category: locForm.category,
        icon: locForm.category === "Cơ sở phục hồi chức năng" ? "local_hospital" : locForm.category === "Trung tâm giáo dục đặc biệt" ? "school" : "groups",
        lat: parseFloat(locForm.lat),
        lng: parseFloat(locForm.lng),
        address: locForm.address,
        phone: locForm.phone,
        workingHours: locForm.workingHours,
        distance: "0.0 km",
        accessibilityBadges: badgeArray,
        utilities: badgeArray,
        description: locForm.description,
      };
      const updated = [newLoc, ...locations];
      setLocations(updated);
      localStorage.setItem("hoa-nhap-map-locations", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText(`Đã thêm mới địa điểm ${locForm.name}.`);
    }

    setIsLocFormOpen(false);
    setEditingLocId(null);
    setLocForm({
      name: "",
      category: "Cơ sở phục hồi chức năng",
      address: "",
      phone: "",
      workingHours: "08:00 - 17:00",
      lat: "",
      lng: "",
      description: "",
      badgesText: "Dốc xe lăn, Thang máy tiếp cận",
    });
  };

  const handleEditLocation = (loc) => {
    setEditingLocId(loc.id);
    setLocForm({
      name: loc.name,
      category: loc.category,
      address: loc.address,
      phone: loc.phone || "",
      workingHours: loc.workingHours || "08:00 - 17:00",
      lat: loc.lat.toString(),
      lng: loc.lng.toString(),
      description: loc.description || "",
      badgesText: (loc.accessibilityBadges || []).join(", "),
    });
    setIsLocFormOpen(true);
  };

  const handleDeleteLocation = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa địa điểm này khỏi bản đồ?")) {
      const updated = locations.filter((loc) => loc.id !== id);
      setLocations(updated);
      localStorage.setItem("hoa-nhap-map-locations", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText("Đã xóa địa điểm.");
    }
  };

  // Save/Update Connections / Volunteers
  const handleSaveConnection = (e) => {
    e.preventDefault();
    if (!connForm.name || !connForm.email || !connForm.phone || !connForm.location) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    if (editingConnId) {
      const updated = connections.map((conn) => {
        if (conn.id === editingConnId) {
          return {
            ...conn,
            name: connForm.name,
            type: connForm.type,
            typeLabel: connForm.type === "tình nguyện viên" ? "Tình nguyện viên" : "Cộng đồng",
            location: connForm.location,
            region: connForm.region,
            supportType: connForm.supportType,
            description: connForm.description,
            email: connForm.email,
            phone: connForm.phone,
            availability: connForm.availability,
            details: connForm.details,
          };
        }
        return conn;
      });
      setConnections(updated);
      localStorage.setItem("hoa-nhap-connections", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText(`Đã cập nhật hồ sơ kết nối của ${connForm.name}.`);
    } else {
      const newConn = {
        id: `conn-${Date.now()}`,
        name: connForm.name,
        type: connForm.type,
        typeLabel: connForm.type === "tình nguyện viên" ? "Tình nguyện viên" : "Cộng đồng",
        location: connForm.location,
        region: connForm.region,
        supportType: connForm.supportType,
        description: connForm.description || "Hồ sơ kết nối mới được tạo.",
        email: connForm.email,
        phone: connForm.phone,
        availability: connForm.availability,
        details: connForm.details,
        avatarUrl: connForm.type === "tình nguyện viên"
          ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
          : "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=200",
      };
      const updated = [newConn, ...connections];
      setConnections(updated);
      localStorage.setItem("hoa-nhap-connections", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText(`Đã thêm mới hồ sơ kết nối ${connForm.name}.`);
    }

    setIsConnFormOpen(false);
    setEditingConnId(null);
    setConnForm({
      name: "",
      type: "tình nguyện viên",
      location: "",
      region: "Hà Nội",
      supportType: "Hướng dẫn thủ tục",
      description: "",
      email: "",
      phone: "",
      availability: "Thỏa thuận",
      details: "",
    });
  };

  const handleEditConnection = (conn) => {
    setEditingConnId(conn.id);
    setConnForm({
      name: conn.name,
      type: conn.type,
      location: conn.location,
      region: conn.region,
      supportType: conn.supportType,
      description: conn.description || "",
      email: conn.email,
      phone: conn.phone,
      availability: conn.availability || "Thỏa thuận",
      details: conn.details || "",
    });
    setIsConnFormOpen(true);
  };

  const handleDeleteConnection = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hồ sơ kết nối này?")) {
      const updated = connections.filter((conn) => conn.id !== id);
      setConnections(updated);
      localStorage.setItem("hoa-nhap-connections", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText("Đã xóa hồ sơ kết nối.");
    }
  };

  // Save/Update Welfare Office
  const handleSaveOffice = (e) => {
    e.preventDefault();
    if (!officeForm.name || !officeForm.address || !officeForm.phone) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      return;
    }

    if (editingOfficeId !== null) {
      const updated = offices.map((off, idx) => {
        if (idx === editingOfficeId) {
          return {
            city: officeForm.city,
            name: officeForm.name,
            address: officeForm.address,
            phone: officeForm.phone,
            email: officeForm.email,
          };
        }
        return off;
      });
      setOffices(updated);
      localStorage.setItem("hoa-nhap-welfare-offices", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText(`Đã cập nhật cơ quan tiếp nhận ${officeForm.name}.`);
    } else {
      const newOff = {
        city: officeForm.city,
        name: officeForm.name,
        address: officeForm.address,
        phone: officeForm.phone,
        email: officeForm.email,
      };
      const updated = [...offices, newOff];
      setOffices(updated);
      localStorage.setItem("hoa-nhap-welfare-offices", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText(`Đã thêm cơ quan tiếp nhận ${officeForm.name}.`);
    }

    setIsOfficeFormOpen(false);
    setEditingOfficeId(null);
    setOfficeForm({
      city: "Hà Nội",
      name: "",
      address: "",
      phone: "",
      email: "",
    });
  };

  const handleEditOffice = (off, idx) => {
    setEditingOfficeId(idx);
    setOfficeForm({
      city: off.city || "Hà Nội",
      name: off.name,
      address: off.address,
      phone: off.phone || "",
      email: off.email || "",
    });
    setIsOfficeFormOpen(true);
  };

  const handleDeleteOffice = (idx) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cơ quan tiếp nhận hồ sơ này?")) {
      const updated = offices.filter((_, i) => i !== idx);
      setOffices(updated);
      localStorage.setItem("hoa-nhap-welfare-offices", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      speakText("Đã xóa cơ quan tiếp nhận.");
    }
  };

  // Feedback Actions
  const toggleFeedbackStatus = (id) => {
    const updated = feedbacks.map((fb) => {
      if (fb.id === id) {
        const nextStatus = fb.status === "resolved" ? "pending" : "resolved";
        speakText(`Đã đổi trạng thái góp ý thành ${nextStatus === "resolved" ? "Đã xử lý" : "Chưa xử lý"}`);
        return { ...fb, status: nextStatus };
      }
      return fb;
    });
    setFeedbacks(updated);
    localStorage.setItem("hoa-nhap-feedbacks", JSON.stringify(updated));
  };

  const handleDeleteFeedback = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa góp ý này?")) {
      const updated = feedbacks.filter((fb) => fb.id !== id);
      setFeedbacks(updated);
      localStorage.setItem("hoa-nhap-feedbacks", JSON.stringify(updated));
      speakText("Đã xóa góp ý.");
      if (viewingFeedback && viewingFeedback.id === id) {
        setViewingFeedback(null);
      }
    }
  };

  return (
    <div className="flex-1 bg-surface-container-lowest dark:bg-tertiary/20 theme-transition pb-24 animate-[fadeIn_0.2s_ease-out]">
      {/* ─── Header Section ─── */}
      <section className="relative w-full bg-primary text-on-primary dark:bg-primary-fixed dark:text-on-primary-fixed border-b-2 border-primary-container p-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-headline-xl text-headline-xl mb-2 flex items-center gap-2">
              <Icon name="admin_panel_settings" size="text-4xl" />
              Bảng quản trị hệ thống
            </h1>
            <p className="text-sm opacity-90">
              Quản trị dữ liệu cho 4 phân hệ cốt lõi: Quyền lợi, Bản đồ, Kết nối cộng đồng và Tính trợ cấp xã hội.
            </p>
          </div>
          <span className="bg-primary-container text-on-primary-container dark:bg-on-primary-fixed-variant dark:text-primary-fixed text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Quyền: Quản trị viên
          </span>
        </div>
      </section>

      {/* ─── Tab Navigation Bar ─── */}
      <section className="bg-surface-container-high dark:bg-tertiary border-b border-outline-variant/60 w-full theme-transition">
        <div className="max-w-[1440px] mx-auto px-gutter flex overflow-x-auto gap-2 py-3 scrollbar-hide">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all accessibility-focus whitespace-nowrap ${
              activeTab === "overview" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-variant/40"
            }`}
          >
            <Icon name="monitoring" size="text-sm" />
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all accessibility-focus whitespace-nowrap ${
              activeTab === "users" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-variant/40"
            }`}
          >
            <Icon name="manage_accounts" size="text-sm" />
            Thành viên ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("rights")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all accessibility-focus whitespace-nowrap ${
              activeTab === "rights" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-variant/40"
            }`}
          >
            <Icon name="policy" size="text-sm" />
            1. Quyền lợi & Văn bản ({policies.length})
          </button>
          <button
            onClick={() => setActiveTab("locations")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all accessibility-focus whitespace-nowrap ${
              activeTab === "locations" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-variant/40"
            }`}
          >
            <Icon name="map" size="text-sm" />
            2. Bản đồ địa điểm ({locations.length})
          </button>
          <button
            onClick={() => setActiveTab("connections")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all accessibility-focus whitespace-nowrap ${
              activeTab === "connections" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-variant/40"
            }`}
          >
            <Icon name="diversity_1" size="text-sm" />
            3. Hồ sơ kết nối ({connections.length})
          </button>
          <button
            onClick={() => setActiveTab("allowance")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all accessibility-focus whitespace-nowrap ${
              activeTab === "allowance" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-variant/40"
            }`}
          >
            <Icon name="payments" size="text-sm" />
            4. Trợ cấp & Cơ quan ({offices.length})
          </button>
        </div>
      </section>

      {/* ─── Tab Content ─── */}
      <div className="max-w-[1440px] mx-auto px-gutter mt-8">

        {/* ── Tab 1: Overview ── */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-[fadeIn_0.15s_ease-out]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-2xl p-6 theme-transition shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-on-surface-variant dark:text-tertiary-fixed-dim uppercase tracking-wider">Tổng số thành viên</span>
                  <Icon name="group" className="text-primary" />
                </div>
                <div className="text-3xl font-extrabold text-on-surface dark:text-inverse-on-surface">{users.length}</div>
              </div>
              <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-2xl p-6 theme-transition shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-on-surface-variant dark:text-tertiary-fixed-dim uppercase tracking-wider">Chính sách & Văn bản</span>
                  <Icon name="description" className="text-primary" />
                </div>
                <div className="text-3xl font-extrabold text-on-surface dark:text-inverse-on-surface">{policies.length + documents.length}</div>
              </div>
              <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-2xl p-6 theme-transition shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-on-surface-variant dark:text-tertiary-fixed-dim uppercase tracking-wider">Địa điểm hỗ trợ</span>
                  <Icon name="pin_drop" className="text-primary" />
                </div>
                <div className="text-3xl font-extrabold text-on-surface dark:text-inverse-on-surface">{locations.length}</div>
              </div>
              <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-2xl p-6 theme-transition shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-on-surface-variant dark:text-tertiary-fixed-dim uppercase tracking-wider">Góp ý chưa giải quyết</span>
                  <Icon name="feedback" className="text-primary" />
                </div>
                <div className="text-3xl font-extrabold text-on-surface dark:text-inverse-on-surface">{feedbacks.filter((f) => f.status === "pending").length}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-3xl p-6 shadow-sm theme-transition">
                <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-inverse-on-surface mb-4 flex items-center gap-2">
                  <Icon name="tune" className="text-primary" />
                  Mức chuẩn trợ cấp xã hội
                </h2>
                <p className="text-xs text-on-surface-variant dark:text-tertiary-fixed-dim mb-6 leading-relaxed">
                  Cấu hình chuẩn tối thiểu (được dùng để tự động nhân hệ số chi trả theo Nghị định 20).
                </p>
                <form onSubmit={handleUpdateRate} className="space-y-4">
                  <div>
                    <label htmlFor="base-rate-input" className="block text-xs font-bold text-on-surface dark:text-inverse-on-surface mb-2">
                      Chuẩn trợ cấp hiện hành (VND)
                    </label>
                    <input
                      type="number"
                      id="base-rate-input"
                      value={rateInput}
                      onChange={(e) => setRateInput(e.target.value)}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent theme-transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary font-bold py-3 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm flex items-center justify-center gap-2 accessibility-focus active:scale-95 text-xs"
                  >
                    Lưu cấu hình
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-3xl p-6 shadow-sm theme-transition flex flex-col justify-between">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-inverse-on-surface mb-4 flex items-center gap-2">
                    <Icon name="info" className="text-primary" />
                    Hướng dẫn Đồng bộ Cơ sở Dữ liệu
                  </h2>
                  <p className="text-xs text-on-surface-variant dark:text-tertiary-fixed-dim leading-relaxed space-y-2">
                    Hệ thống đang hoạt động dưới cơ chế **Mock Database (`localStorage`)**. Mọi thay đổi thực hiện trên trang quản trị này (Thêm/Sửa/Xóa chính sách, bản đồ, tình nguyện viên, cơ quan) sẽ được lưu trữ cục bộ và đồng bộ hóa ngay lập tức lên giao diện của người dùng.
                    <br/><br/>
                    Khi tích hợp các cơ sở dữ liệu thực (MongoDB, MySQL, Supabase, v.v.), lập trình viên chỉ cần thay thế các lệnh lấy/ghi `localStorage` bằng API Call (`fetch` / `axios` endpoints: `/api/policies`, `/api/locations`, `/api/connections`, `/api/offices`). Các biểu mẫu và cấu trúc quản trị UI đã được thiết lập hoàn chỉnh theo chuẩn backend JSON.
                  </p>
                </div>
                <div className="text-xs text-primary dark:text-inverse-primary font-bold mt-4">
                  * Dữ liệu hiện tại đã sẵn sàng cấu trúc JSON chuẩn backend.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 2: Users ── */}
        {activeTab === "users" && (
          <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-3xl p-6 shadow-sm theme-transition animate-[fadeIn_0.15s_ease-out]">
            <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-inverse-on-surface mb-2 flex items-center gap-2">
              <Icon name="manage_accounts" className="text-primary" />
              Quản lý tài khoản thành viên
            </h2>
            <p className="text-xs text-on-surface-variant dark:text-tertiary-fixed-dim mb-6">
              Xem danh sách và chặn/mở khóa các tài khoản đăng ký trên hệ thống Cổng Hòa Nhập.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs" role="table">
                <thead>
                  <tr className="border-b border-outline-variant/60" role="row">
                    <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Họ tên / Email</th>
                    <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-center" role="columnheader">Quyền hạn</th>
                    <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-center" role="columnheader">Trạng thái</th>
                    <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-right" role="columnheader">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-on-surface-variant/60">Chưa có người dùng nào đăng ký trên hệ thống.</td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.email} className="border-b border-outline-variant/30 last:border-b-0" role="row">
                        <td className="py-3 pr-2" role="cell">
                          <div className="font-bold text-on-surface dark:text-inverse-on-surface">{u.fullName}</div>
                          <div className="text-[10px] text-on-surface-variant dark:text-tertiary-fixed-dim mt-0.5">{u.email}</div>
                        </td>
                        <td className="py-3 text-center" role="cell">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                            u.role === "admin" ? "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300" : "bg-surface-variant text-on-surface-variant"
                          }`}>
                            {u.role === "admin" ? "Admin" : "User"}
                          </span>
                        </td>
                        <td className="py-3 text-center" role="cell">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                            u.status === "suspended" ? "bg-error-container text-on-error-container" : "bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300"
                          }`}>
                            {u.status === "suspended" ? "Bị khóa" : "Hoạt động"}
                          </span>
                        </td>
                        <td className="py-3 text-right" role="cell">
                          {u.role !== "admin" && (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => toggleUserStatus(u.email)}
                                title={u.status === "suspended" ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                                className={`p-1.5 rounded-lg border transition-colors accessibility-focus ${
                                  u.status === "suspended" ? "border-teal-500 text-teal-600 hover:bg-teal-50" : "border-error text-error hover:bg-error-container/10"
                                }`}
                              >
                                <Icon name={u.status === "suspended" ? "check" : "block"} size="text-sm" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u.email)}
                                title="Xóa"
                                className="p-1.5 rounded-lg border border-outline hover:bg-error-container/10 text-error hover:border-error transition-colors accessibility-focus"
                              >
                                <Icon name="delete" size="text-sm" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Tab 3: Rights Policies & Legal Documents ── */}
        {activeTab === "rights" && (
          <div className="space-y-8 animate-[fadeIn_0.15s_ease-out]">
            {/* Phân hệ 1: Chính sách quyền lợi */}
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-2xl p-4 md:p-6 shadow-sm theme-transition">
                <div>
                  <h2 className="font-bold text-base text-on-surface dark:text-inverse-on-surface flex items-center gap-2">
                    <Icon name="policy" className="text-primary" />
                    Quản lý Chính sách Quyền lợi NKT
                  </h2>
                  <p className="text-xs text-on-surface-variant dark:text-tertiary-fixed-dim">
                    Thêm và chỉnh sửa các chính sách quyền lợi (Y tế, Giáo dục, Việc làm, Giao thông, Văn hóa).
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingPolicyId(null);
                    setPolicyForm({
                      name: "",
                      category: "Chăm sóc sức khỏe",
                      icon: "medical_services",
                      description: "",
                      conditions: "",
                      supportRate: "",
                      docsText: "",
                      disabilityTypesText: "Tất cả",
                      ageGroupsText: "Tất cả",
                      provincesText: "Tất cả",
                    });
                    setIsPolicyFormOpen(!isPolicyFormOpen);
                  }}
                  className="bg-primary text-on-primary font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-1.5 accessibility-focus active:scale-95"
                >
                  <Icon name={isPolicyFormOpen ? "expand_less" : "add"} size="text-sm" />
                  {isPolicyFormOpen ? "Đóng form" : "Thêm chính sách"}
                </button>
              </div>

              {isPolicyFormOpen && (
                <form onSubmit={handleSavePolicy} className="bg-surface-container dark:bg-tertiary border-2 border-primary/40 dark:border-outline rounded-3xl p-6 shadow-md theme-transition grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fadeIn_0.2s_ease-out]">
                  <h3 className="md:col-span-2 font-bold text-sm text-primary dark:text-inverse-primary border-b border-outline-variant/60 pb-2 flex items-center gap-2">
                    <Icon name="edit" />
                    {editingPolicyId ? "Cập nhật thông tin chính sách" : "Thêm chính sách quyền lợi mới"}
                  </h3>
                  <div>
                    <label htmlFor="pol-name" className="block text-xs font-bold mb-1.5">Tên chính sách (*)</label>
                    <input
                      id="pol-name"
                      type="text"
                      required
                      value={policyForm.name}
                      onChange={(e) => setPolicyForm({ ...policyForm, name: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent theme-transition"
                      placeholder="Ví dụ: Cấp thẻ Bảo hiểm y tế miễn phí..."
                    />
                  </div>
                  <div>
                    <label htmlFor="pol-category" className="block text-xs font-bold mb-1.5">Phân nhóm chính sách (*)</label>
                    <select
                      id="pol-category"
                      value={policyForm.category}
                      onChange={(e) => setPolicyForm({ ...policyForm, category: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    >
                      <option value="Chăm sóc sức khỏe">Chăm sóc sức khỏe</option>
                      <option value="Giáo dục & Đào tạo">Giáo dục & Đào tạo</option>
                      <option value="Việc làm & Sinh kế">Việc làm & Sinh kế</option>
                      <option value="Giao thông & Công trình">Giao thông & Công trình</option>
                      <option value="Văn hóa, Thể thao & Du lịch">Văn hóa, Thể thao & Du lịch</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pol-icon" className="block text-xs font-bold mb-1.5">Icon hiển thị</label>
                    <select
                      id="pol-icon"
                      value={policyForm.icon}
                      onChange={(e) => setPolicyForm({ ...policyForm, icon: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    >
                      <option value="medical_services">Medical Services (Y tế)</option>
                      <option value="school">School (Giáo dục)</option>
                      <option value="work">Work (Việc làm)</option>
                      <option value="accessible">Accessible (Giao thông/Tiếp cận)</option>
                      <option value="theater_comedy">Theater (Văn hóa/Thể thao)</option>
                      <option value="payments">Payments (Tiền mặt/Trợ cấp)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pol-rate" className="block text-xs font-bold mb-1.5">Mức hỗ trợ quy định (*)</label>
                    <input
                      id="pol-rate"
                      type="text"
                      required
                      value={policyForm.supportRate}
                      onChange={(e) => setPolicyForm({ ...policyForm, supportRate: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent theme-transition"
                      placeholder="Miễn phí 100% / Hỗ trợ 150.000đ/tháng..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="pol-desc" className="block text-xs font-bold mb-1.5">Mô tả chính sách (*)</label>
                    <textarea
                      id="pol-desc"
                      required
                      rows="2"
                      value={policyForm.description}
                      onChange={(e) => setPolicyForm({ ...policyForm, description: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none resize-none"
                      placeholder="Mô tả tóm tắt nội dung ưu đãi..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="pol-cond" className="block text-xs font-bold mb-1.5">Điều kiện áp dụng</label>
                    <input
                      id="pol-cond"
                      type="text"
                      value={policyForm.conditions}
                      onChange={(e) => setPolicyForm({ ...policyForm, conditions: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent theme-transition"
                      placeholder="Ví dụ: Là người khuyết tật nặng hoặc đặc biệt nặng..."
                    />
                  </div>
                  <div>
                    <label htmlFor="pol-disabilities" className="block text-xs font-bold mb-1.5">Dạng khuyết tật hỗ trợ (phân cách bằng dấu phẩy)</label>
                    <input
                      id="pol-disabilities"
                      type="text"
                      value={policyForm.disabilityTypesText}
                      onChange={(e) => setPolicyForm({ ...policyForm, disabilityTypesText: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                      placeholder="Tất cả, Trực quan/Khiếm thị, Vận động..."
                    />
                  </div>
                  <div>
                    <label htmlFor="pol-ages" className="block text-xs font-bold mb-1.5">Nhóm độ tuổi hỗ trợ (phân cách bằng dấu phẩy)</label>
                    <input
                      id="pol-ages"
                      type="text"
                      value={policyForm.ageGroupsText}
                      onChange={(e) => setPolicyForm({ ...policyForm, ageGroupsText: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                      placeholder="Tất cả, Trẻ em (<16 tuổi), Người trưởng thành (16-60 tuổi)..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="pol-docs" className="block text-xs font-bold mb-1.5">Giấy tờ cần chuẩn bị (phân cách bằng dấu phẩy)</label>
                    <input
                      id="pol-docs"
                      type="text"
                      value={policyForm.docsText}
                      onChange={(e) => setPolicyForm({ ...policyForm, docsText: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                      placeholder="Tờ khai đăng ký cấp thẻ BHYT, Bản sao Giấy xác nhận mức độ khuyết tật..."
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPolicyFormOpen(false);
                        setEditingPolicyId(null);
                      }}
                      className="border border-outline px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-surface-variant/30 accessibility-focus"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm accessibility-focus"
                    >
                      {editingPolicyId ? "Cập nhật chính sách" : "Thêm mới chính sách"}
                    </button>
                  </div>
                </form>
              )}

              {/* Table listing policies */}
              <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-3xl p-6 shadow-sm theme-transition">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs" role="table">
                    <thead>
                      <tr className="border-b border-outline-variant/60" role="row">
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Chính sách / Phân nhóm</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Mức hỗ trợ quy định</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-center" role="columnheader">Số giấy tờ yêu cầu</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-right" role="columnheader">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="py-6 text-center text-on-surface-variant/60">Không có chính sách quyền lợi nào.</td>
                        </tr>
                      ) : (
                        policies.map((pol) => (
                          <tr key={pol.id} className="border-b border-outline-variant/30 last:border-b-0" role="row">
                            <td className="py-3 pr-2" role="cell">
                              <div className="font-bold text-on-surface dark:text-inverse-on-surface">{pol.name}</div>
                              <div className="text-[10px] text-primary mt-0.5">{pol.category}</div>
                            </td>
                            <td className="py-3 font-semibold text-on-surface-variant" role="cell">
                              {pol.supportRate}
                            </td>
                            <td className="py-3 text-center font-mono text-on-surface-variant" role="cell">
                              {(pol.documents || []).length}
                            </td>
                            <td className="py-3 text-right" role="cell">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleEditPolicy(pol)}
                                  title="Chỉnh sửa"
                                  className="p-1.5 rounded-lg border border-outline hover:bg-surface-variant/50 transition-colors accessibility-focus"
                                >
                                  <Icon name="edit" size="text-sm" />
                                </button>
                                <button
                                  onClick={() => handleDeletePolicy(pol.id)}
                                  title="Xóa"
                                  className="p-1.5 rounded-lg border border-outline hover:bg-error-container/10 text-error hover:border-error transition-colors accessibility-focus"
                                >
                                  <Icon name="delete" size="text-sm" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Phân hệ 2: Văn bản pháp lý */}
            <div className="space-y-4 pt-6 border-t border-outline-variant/50">
              <div className="flex justify-between items-center bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-2xl p-4 md:p-6 shadow-sm theme-transition">
                <div>
                  <h2 className="font-bold text-base text-on-surface dark:text-inverse-on-surface flex items-center gap-2">
                    <Icon name="description" className="text-primary" />
                    Quản lý Văn bản Pháp luật liên quan
                  </h2>
                  <p className="text-xs text-on-surface-variant dark:text-tertiary-fixed-dim">
                    Thêm các nghị định, luật đính kèm liên quan để người dùng tải về tham khảo.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingDocId(null);
                    setDocForm({ title: "", date: "", url: "" });
                    setIsDocFormOpen(!isDocFormOpen);
                  }}
                  className="bg-primary text-on-primary font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-1.5 accessibility-focus active:scale-95"
                >
                  <Icon name={isDocFormOpen ? "expand_less" : "add"} size="text-sm" />
                  {isDocFormOpen ? "Đóng form" : "Thêm văn bản"}
                </button>
              </div>

              {isDocFormOpen && (
                <form onSubmit={handleSaveDoc} className="bg-surface-container dark:bg-tertiary border-2 border-primary/40 dark:border-outline rounded-3xl p-6 shadow-md theme-transition grid grid-cols-1 gap-4 animate-[fadeIn_0.2s_ease-out]">
                  <h3 className="font-bold text-sm text-primary dark:text-inverse-primary border-b border-outline-variant/60 pb-2 flex items-center gap-2">
                    <Icon name="gavel" />
                    {editingDocId ? "Cập nhật văn bản pháp lý" : "Thêm mới văn bản luật"}
                  </h3>
                  <div>
                    <label htmlFor="doc-title" className="block text-xs font-bold mb-1.5">Tiêu đề văn bản (*)</label>
                    <input
                      id="doc-title"
                      type="text"
                      required
                      value={docForm.title}
                      onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent theme-transition"
                      placeholder="Ví dụ: Nghị định 20/2021/NĐ-CP..."
                    />
                  </div>
                  <div>
                    <label htmlFor="doc-date" className="block text-xs font-bold mb-1.5">Ngày ban hành / Mô tả ngắn</label>
                    <input
                      id="doc-date"
                      type="text"
                      value={docForm.date}
                      onChange={(e) => setDocForm({ ...docForm, date: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent theme-transition"
                      placeholder="Ban hành ngày 17/03/2021..."
                    />
                  </div>
                  <div>
                    <label htmlFor="doc-url" className="block text-xs font-bold mb-1.5">Đường dẫn tệp tài liệu (*)</label>
                    <input
                      id="doc-url"
                      type="text"
                      required
                      value={docForm.url}
                      onChange={(e) => setDocForm({ ...docForm, url: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent theme-transition"
                      placeholder="Ví dụ: /documents/nghi_dinh_20_2021_nd_cp.pdf..."
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDocFormOpen(false);
                        setEditingDocId(null);
                      }}
                      className="border border-outline px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-surface-variant/30 accessibility-focus"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm accessibility-focus"
                    >
                      {editingDocId ? "Cập nhật văn bản" : "Lưu văn bản"}
                    </button>
                  </div>
                </form>
              )}

              {/* Table listing documents */}
              <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-3xl p-6 shadow-sm theme-transition">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs" role="table">
                    <thead>
                      <tr className="border-b border-outline-variant/60" role="row">
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Tên văn bản luật</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Ngày ban hành / Ghi chú</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Liên kết tệp</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-right" role="columnheader">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="py-6 text-center text-on-surface-variant/60">Không có văn bản pháp luật nào.</td>
                        </tr>
                      ) : (
                        documents.map((doc) => (
                          <tr key={doc.id} className="border-b border-outline-variant/30 last:border-b-0" role="row">
                            <td className="py-3 font-bold text-on-surface dark:text-inverse-on-surface" role="cell">{doc.title}</td>
                            <td className="py-3 font-semibold text-on-surface-variant" role="cell">{doc.date}</td>
                            <td className="py-3 font-mono text-xs text-primary truncate max-w-[200px]" role="cell">{doc.url}</td>
                            <td className="py-3 text-right" role="cell">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleEditDoc(doc)}
                                  title="Sửa"
                                  className="p-1.5 rounded-lg border border-outline hover:bg-surface-variant/50 transition-colors accessibility-focus"
                                >
                                  <Icon name="edit" size="text-sm" />
                                </button>
                                <button
                                  onClick={() => handleDeleteDoc(doc.id)}
                                  title="Xóa"
                                  className="p-1.5 rounded-lg border border-outline hover:bg-error-container/10 text-error hover:border-error transition-colors accessibility-focus"
                                >
                                  <Icon name="delete" size="text-sm" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 4: Map Locations ── */}
        {activeTab === "locations" && (
          <div className="space-y-6 animate-[fadeIn_0.15s_ease-out]">
            <div className="flex justify-between items-center bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-2xl p-4 md:p-6 shadow-sm theme-transition">
              <div>
                <h2 className="font-bold text-base text-on-surface dark:text-inverse-on-surface flex items-center gap-2">
                  <Icon name="map" className="text-primary" />
                  Quản lý Địa điểm Hỗ trợ trên Bản đồ
                </h2>
                <p className="text-xs text-on-surface-variant dark:text-tertiary-fixed-dim">
                  Nhập thông tin các cơ sở y tế, trung tâm phục hồi chức năng và địa điểm tiếp cận cho NKT.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingLocId(null);
                  setLocForm({
                    name: "",
                    category: "Cơ sở phục hồi chức năng",
                    address: "",
                    phone: "",
                    workingHours: "08:00 - 17:00",
                    lat: "",
                    lng: "",
                    description: "",
                    badgesText: "Dốc xe lăn, Thang máy tiếp cận",
                  });
                  setIsLocFormOpen(!isLocFormOpen);
                }}
                className="bg-primary text-on-primary font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-1.5 accessibility-focus active:scale-95"
              >
                <Icon name={isLocFormOpen ? "expand_less" : "add"} size="text-sm" />
                {isLocFormOpen ? "Đóng form" : "Thêm địa điểm"}
              </button>
            </div>

            {isLocFormOpen && (
              <form onSubmit={handleSaveLocation} className="bg-surface-container dark:bg-tertiary border-2 border-primary/40 dark:border-outline rounded-3xl p-6 shadow-md theme-transition grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fadeIn_0.2s_ease-out]">
                <h3 className="md:col-span-2 font-bold text-sm text-primary dark:text-inverse-primary border-b border-outline-variant/60 pb-2 flex items-center gap-2">
                  <Icon name="edit_location" />
                  {editingLocId ? "Hiệu chỉnh địa điểm bản đồ" : "Thêm địa điểm bản đồ mới"}
                </h3>
                
                <div>
                  <label htmlFor="loc-name" className="block text-xs font-bold mb-1.5">Tên địa điểm (*)</label>
                  <input
                    id="loc-name"
                    type="text"
                    required
                    value={locForm.name}
                    onChange={(e) => setLocForm({ ...locForm, name: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent theme-transition"
                    placeholder="Bệnh viện, Trung tâm..."
                  />
                </div>
                <div>
                  <label htmlFor="loc-category" className="block text-xs font-bold mb-1.5">Phân loại (*)</label>
                  <select
                    id="loc-category"
                    value={locForm.category}
                    onChange={(e) => setLocForm({ ...locForm, category: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                  >
                    <option value="Cơ sở phục hồi chức năng">Cơ sở phục hồi chức năng</option>
                    <option value="Trung tâm giáo dục đặc biệt">Trung tâm giáo dục đặc biệt</option>
                    <option value="Cơ quan nhà nước">Cơ quan nhà nước</option>
                    <option value="Khu vui chơi tiếp cận">Khu vui chơi tiếp cận</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="loc-address" className="block text-xs font-bold mb-1.5">Địa chỉ (*)</label>
                  <input
                    id="loc-address"
                    type="text"
                    required
                    value={locForm.address}
                    onChange={(e) => setLocForm({ ...locForm, address: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="Số nhà, Tên đường, Quận/Huyện..."
                  />
                </div>
                <div>
                  <label htmlFor="loc-phone" className="block text-xs font-bold mb-1.5">Số điện thoại</label>
                  <input
                    id="loc-phone"
                    type="text"
                    value={locForm.phone}
                    onChange={(e) => setLocForm({ ...locForm, phone: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="024 ..."
                  />
                </div>
                <div>
                  <label htmlFor="loc-hours" className="block text-xs font-bold mb-1.5">Giờ làm việc</label>
                  <input
                    id="loc-hours"
                    type="text"
                    value={locForm.workingHours}
                    onChange={(e) => setLocForm({ ...locForm, workingHours: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="08:00 - 17:00"
                  />
                </div>
                <div>
                  <label htmlFor="loc-lat" className="block text-xs font-bold mb-1.5">Vĩ độ (Latitude) (*)</label>
                  <input
                    id="loc-lat"
                    type="number"
                    step="0.000001"
                    required
                    value={locForm.lat}
                    onChange={(e) => setLocForm({ ...locForm, lat: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="Ví dụ: 21.0022"
                  />
                </div>
                <div>
                  <label htmlFor="loc-lng" className="block text-xs font-bold mb-1.5">Kinh độ (Longitude) (*)</label>
                  <input
                    id="loc-lng"
                    type="number"
                    step="0.000001"
                    required
                    value={locForm.lng}
                    onChange={(e) => setLocForm({ ...locForm, lng: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="Ví dụ: 105.8016"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="loc-badges" className="block text-xs font-bold mb-1.5">Tiện ích tiếp cận (phân cách bằng dấu phẩy)</label>
                  <input
                    id="loc-badges"
                    type="text"
                    value={locForm.badgesText}
                    onChange={(e) => setLocForm({ ...locForm, badgesText: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="Có đường dốc xe lăn, Thang máy tiếp cận, Chữ nổi Braille"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="loc-desc" className="block text-xs font-bold mb-1.5">Mô tả chi tiết</label>
                  <textarea
                    id="loc-desc"
                    value={locForm.description}
                    onChange={(e) => setLocForm({ ...locForm, description: e.target.value })}
                    rows="2"
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none resize-none"
                    placeholder="Giới thiệu về cơ sở và dịch vụ..."
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLocFormOpen(false);
                      setEditingLocId(null);
                    }}
                    className="border border-outline px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-surface-variant/30 accessibility-focus"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm accessibility-focus"
                  >
                    {editingLocId ? "Cập nhật địa điểm" : "Thêm địa điểm"}
                  </button>
                </div>
              </form>
            )}

            <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-3xl p-6 shadow-sm theme-transition">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" role="table">
                  <thead>
                    <tr className="border-b border-outline-variant/60" role="row">
                      <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Tên địa điểm / Địa chỉ</th>
                      <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Phân loại</th>
                      <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-center" role="columnheader">Tọa độ GPS</th>
                      <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-right" role="columnheader">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-6 text-center text-on-surface-variant/60">Không có địa điểm nào trên bản đồ.</td>
                      </tr>
                    ) : (
                      locations.map((loc) => (
                        <tr key={loc.id} className="border-b border-outline-variant/30 last:border-b-0" role="row">
                          <td className="py-3 pr-2" role="cell">
                            <div className="font-bold text-on-surface dark:text-inverse-on-surface">{loc.name}</div>
                            <div className="text-[10px] text-on-surface-variant dark:text-tertiary-fixed-dim mt-0.5">{loc.address}</div>
                          </td>
                          <td className="py-3 font-semibold text-on-surface-variant" role="cell">{loc.category}</td>
                          <td className="py-3 text-center text-[10px] font-mono text-on-surface-variant" role="cell">
                            {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                          </td>
                          <td className="py-3 text-right" role="cell">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEditLocation(loc)}
                                title="Sửa"
                                className="p-1.5 rounded-lg border border-outline hover:bg-surface-variant/50 transition-colors accessibility-focus"
                              >
                                <Icon name="edit" size="text-sm" />
                              </button>
                              <button
                                onClick={() => handleDeleteLocation(loc.id)}
                                title="Xóa"
                                className="p-1.5 rounded-lg border border-outline hover:bg-error-container/10 text-error hover:border-error transition-colors accessibility-focus"
                              >
                                <Icon name="delete" size="text-sm" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 5: Community Connections ── */}
        {activeTab === "connections" && (
          <div className="space-y-6 animate-[fadeIn_0.15s_ease-out]">
            <div className="flex justify-between items-center bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-2xl p-4 md:p-6 shadow-sm theme-transition">
              <div>
                <h2 className="font-bold text-base text-on-surface dark:text-inverse-on-surface flex items-center gap-2">
                  <Icon name="diversity_1" className="text-primary" />
                  Quản lý Hồ sơ Kết nối & Tình nguyện viên
                </h2>
                <p className="text-xs text-on-surface-variant dark:text-tertiary-fixed-dim">
                  Đăng ký thông tin các cá nhân hoặc tổ chức thiện nguyện sẵn sàng giúp đỡ NKT.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingConnId(null);
                  setConnForm({
                    name: "",
                    type: "tình nguyện viên",
                    location: "",
                    region: "Hà Nội",
                    supportType: "Hướng dẫn thủ tục",
                    description: "",
                    email: "",
                    phone: "",
                    availability: "Thỏa thuận",
                    details: "",
                  });
                  setIsConnFormOpen(!isConnFormOpen);
                }}
                className="bg-primary text-on-primary font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-1.5 accessibility-focus active:scale-95"
              >
                <Icon name={isConnFormOpen ? "expand_less" : "add"} size="text-sm" />
                {isConnFormOpen ? "Đóng form" : "Thêm hồ sơ"}
              </button>
            </div>

            {isConnFormOpen && (
              <form onSubmit={handleSaveConnection} className="bg-surface-container dark:bg-tertiary border-2 border-primary/40 dark:border-outline rounded-3xl p-6 shadow-md theme-transition grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fadeIn_0.2s_ease-out]">
                <h3 className="md:col-span-2 font-bold text-sm text-primary dark:text-inverse-primary border-b border-outline-variant/60 pb-2 flex items-center gap-2">
                  <Icon name="volunteer_activism" />
                  {editingConnId ? "Hiệu chỉnh hồ sơ kết nối" : "Thêm hồ sơ kết nối mới"}
                </h3>
                <div>
                  <label htmlFor="conn-name" className="block text-xs font-bold mb-1.5">Tên hiển thị (*)</label>
                  <input
                    id="conn-name"
                    type="text"
                    required
                    value={connForm.name}
                    onChange={(e) => setConnForm({ ...connForm, name: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="Nguyễn Văn A / Đội xe..."
                  />
                </div>
                <div>
                  <label htmlFor="conn-type" className="block text-xs font-bold mb-1.5">Phân loại (*)</label>
                  <select
                    id="conn-type"
                    value={connForm.type}
                    onChange={(e) => setConnForm({ ...connForm, type: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                  >
                    <option value="tình nguyện viên">Tình nguyện viên cá nhân</option>
                    <option value="cộng đồng">Cộng đồng / Tổ chức</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="conn-region" className="block text-xs font-bold mb-1.5">Khu vực (*)</label>
                  <select
                    id="conn-region"
                    value={connForm.region}
                    onChange={(e) => setConnForm({ ...connForm, region: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="conn-location" className="block text-xs font-bold mb-1.5">Địa bàn chi tiết (*)</label>
                  <input
                    id="conn-location"
                    type="text"
                    required
                    value={connForm.location}
                    onChange={(e) => setConnForm({ ...connForm, location: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="Quận Cầu Giấy, Hà Nội..."
                  />
                </div>
                <div>
                  <label htmlFor="conn-support" className="block text-xs font-bold mb-1.5">Hình thức hỗ trợ chính</label>
                  <select
                    id="conn-support"
                    value={connForm.supportType}
                    onChange={(e) => setConnForm({ ...connForm, supportType: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                  >
                    <option value="Hướng dẫn thủ tục">Hướng dẫn thủ tục</option>
                    <option value="Vận chuyển">Vận chuyển</option>
                    <option value="Hỗ trợ học tập">Hỗ trợ học tập</option>
                    <option value="Chăm sóc">Chăm sóc sức khỏe tại nhà</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="conn-availability" className="block text-xs font-bold mb-1.5">Thời gian rảnh</label>
                  <input
                    id="conn-availability"
                    type="text"
                    value={connForm.availability}
                    onChange={(e) => setConnForm({ ...connForm, availability: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="Cuối tuần / Tối 3-5-7..."
                  />
                </div>
                <div>
                  <label htmlFor="conn-email" className="block text-xs font-bold mb-1.5">Địa chỉ Email (*)</label>
                  <input
                    id="conn-email"
                    type="email"
                    required
                    value={connForm.email}
                    onChange={(e) => setConnForm({ ...connForm, email: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="email@address.com"
                  />
                </div>
                <div>
                  <label htmlFor="conn-phone" className="block text-xs font-bold mb-1.5">Số điện thoại (*)</label>
                  <input
                    id="conn-phone"
                    type="text"
                    required
                    value={connForm.phone}
                    onChange={(e) => setConnForm({ ...connForm, phone: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="09..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="conn-desc" className="block text-xs font-bold mb-1.5">Mô tả ngắn gọn</label>
                  <input
                    id="conn-desc"
                    type="text"
                    value={connForm.description}
                    onChange={(e) => setConnForm({ ...connForm, description: e.target.value })}
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    placeholder="Có xe lăn nâng, nhận dạy tin học cơ bản..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="conn-details" className="block text-xs font-bold mb-1.5">Thông tin kinh nghiệm chi tiết</label>
                  <textarea
                    id="conn-details"
                    value={connForm.details}
                    onChange={(e) => setConnForm({ ...connForm, details: e.target.value })}
                    rows="3"
                    className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none resize-none"
                    placeholder="Mong muốn trợ giúp và kĩ năng xã hội..."
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsConnFormOpen(false);
                      setEditingConnId(null);
                    }}
                    className="border border-outline px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-surface-variant/30 accessibility-focus"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm accessibility-focus"
                  >
                    {editingConnId ? "Cập nhật hồ sơ" : "Lưu hồ sơ"}
                  </button>
                </div>
              </form>
            )}

            <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-3xl p-6 shadow-sm theme-transition">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" role="table">
                  <thead>
                    <tr className="border-b border-outline-variant/60" role="row">
                      <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Họ tên / Email</th>
                      <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Phân loại</th>
                      <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Địa bàn / Hỗ trợ</th>
                      <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-right" role="columnheader">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {connections.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-6 text-center text-on-surface-variant/60">Không có hồ sơ kết nối nào.</td>
                      </tr>
                    ) : (
                      connections.map((conn) => (
                        <tr key={conn.id} className="border-b border-outline-variant/30 last:border-b-0" role="row">
                          <td className="py-3 pr-2" role="cell">
                            <div className="font-bold text-on-surface dark:text-inverse-on-surface">{conn.name}</div>
                            <div className="text-[10px] text-on-surface-variant dark:text-tertiary-fixed-dim mt-0.5">{conn.email} | SĐT: {conn.phone}</div>
                          </td>
                          <td className="py-3" role="cell">
                            <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase ${
                              conn.type === "tình nguyện viên" ? "bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300" : "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300"
                            }`}>
                              {conn.typeLabel}
                            </span>
                          </td>
                          <td className="py-3 font-semibold text-on-surface-variant" role="cell">
                            <div>{conn.region} ({conn.location})</div>
                            <div className="text-[10px] text-primary mt-0.5">{conn.supportType}</div>
                          </td>
                          <td className="py-3 text-right" role="cell">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEditConnection(conn)}
                                title="Sửa"
                                className="p-1.5 rounded-lg border border-outline hover:bg-surface-variant/50 transition-colors accessibility-focus"
                              >
                                <Icon name="edit" size="text-sm" />
                              </button>
                              <button
                                onClick={() => handleDeleteConnection(conn.id)}
                                title="Xóa"
                                className="p-1.5 rounded-lg border border-outline hover:bg-error-container/10 text-error hover:border-error transition-colors accessibility-focus"
                              >
                                <Icon name="delete" size="text-sm" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 6: Social Allowance Offices & Feedbacks ── */}
        {activeTab === "allowance" && (
          <div className="space-y-8 animate-[fadeIn_0.15s_ease-out]">
            {/* Phân hệ 1: Sở/Phòng Lao động - Thương binh & Xã hội */}
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-2xl p-4 md:p-6 shadow-sm theme-transition">
                <div>
                  <h2 className="font-bold text-base text-on-surface dark:text-inverse-on-surface flex items-center gap-2">
                    <Icon name="store" className="text-primary" />
                    Quản lý Cơ quan Tiếp nhận Trợ cấp Xã hội
                  </h2>
                  <p className="text-xs text-on-surface-variant dark:text-tertiary-fixed-dim">
                    Nhập danh sách các Sở LĐ-TB&XH tỉnh/thành phố để hướng dẫn NKT địa điểm nộp hồ sơ.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingOfficeId(null);
                    setOfficeForm({
                      city: "Hà Nội",
                      name: "",
                      address: "",
                      phone: "",
                      email: "",
                    });
                    setIsOfficeFormOpen(!isOfficeFormOpen);
                  }}
                  className="bg-primary text-on-primary font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-1.5 accessibility-focus active:scale-95"
                >
                  <Icon name={isOfficeFormOpen ? "expand_less" : "add"} size="text-sm" />
                  {isOfficeFormOpen ? "Đóng form" : "Thêm cơ quan"}
                </button>
              </div>

              {isOfficeFormOpen && (
                <form onSubmit={handleSaveOffice} className="bg-surface-container dark:bg-tertiary border-2 border-primary/40 dark:border-outline rounded-3xl p-6 shadow-md theme-transition grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fadeIn_0.2s_ease-out]">
                  <h3 className="md:col-span-2 font-bold text-sm text-primary dark:text-inverse-primary border-b border-outline-variant/60 pb-2 flex items-center gap-2">
                    <Icon name="place" />
                    {editingOfficeId !== null ? "Hiệu chỉnh cơ quan tiếp nhận" : "Thêm mới cơ quan tiếp nhận"}
                  </h3>
                  <div>
                    <label htmlFor="off-city" className="block text-xs font-bold mb-1.5">Tỉnh / Thành phố (*)</label>
                    <select
                      id="off-city"
                      value={officeForm.city}
                      onChange={(e) => setOfficeForm({ ...officeForm, city: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="off-name" className="block text-xs font-bold mb-1.5">Tên cơ quan tiếp nhận (*)</label>
                    <input
                      id="off-name"
                      type="text"
                      required
                      value={officeForm.name}
                      onChange={(e) => setOfficeForm({ ...officeForm, name: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                      placeholder="Sở Lao động - Thương binh & Xã hội..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="off-addr" className="block text-xs font-bold mb-1.5">Địa chỉ (*)</label>
                    <input
                      id="off-addr"
                      type="text"
                      required
                      value={officeForm.address}
                      onChange={(e) => setOfficeForm({ ...officeForm, address: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                      placeholder="Số nhà, Tên đường, Quận/Huyện..."
                    />
                  </div>
                  <div>
                    <label htmlFor="off-phone" className="block text-xs font-bold mb-1.5">Điện thoại liên hệ (*)</label>
                    <input
                      id="off-phone"
                      type="text"
                      required
                      value={officeForm.phone}
                      onChange={(e) => setOfficeForm({ ...officeForm, phone: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                      placeholder="Ví dụ: 024 ..."
                    />
                  </div>
                  <div>
                    <label htmlFor="off-email" className="block text-xs font-bold mb-1.5">Thư điện tử (Email)</label>
                    <input
                      id="off-email"
                      type="email"
                      value={officeForm.email}
                      onChange={(e) => setOfficeForm({ ...officeForm, email: e.target.value })}
                      className="w-full bg-surface-container-high dark:bg-tertiary-container border border-outline rounded-xl p-2.5 text-xs focus:outline-none"
                      placeholder="vanthu@sldtxh.gov.vn..."
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOfficeFormOpen(false);
                        setEditingOfficeId(null);
                      }}
                      className="border border-outline px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-surface-variant/30 accessibility-focus"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm accessibility-focus"
                    >
                      {editingOfficeId !== null ? "Cập nhật cơ quan" : "Thêm cơ quan"}
                    </button>
                  </div>
                </form>
              )}

              {/* Table listing welfare offices */}
              <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-3xl p-6 shadow-sm theme-transition">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs" role="table">
                    <thead>
                      <tr className="border-b border-outline-variant/60" role="row">
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Tên cơ quan / Địa chỉ</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Khu vực</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Điện thoại / Email</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-right" role="columnheader">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offices.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="py-6 text-center text-on-surface-variant/60">Không có cơ quan tiếp nhận hồ sơ nào.</td>
                        </tr>
                      ) : (
                        offices.map((off, idx) => (
                          <tr key={idx} className="border-b border-outline-variant/30 last:border-b-0" role="row">
                            <td className="py-3 pr-2" role="cell">
                              <div className="font-bold text-on-surface dark:text-inverse-on-surface">{off.name}</div>
                              <div className="text-[10px] text-on-surface-variant mt-0.5">{off.address}</div>
                            </td>
                            <td className="py-3 font-semibold text-on-surface-variant" role="cell">{off.city}</td>
                            <td className="py-3 text-on-surface-variant font-mono" role="cell">
                              <div>{off.phone}</div>
                              <div className="text-[10px] mt-0.5">{off.email || "—"}</div>
                            </td>
                            <td className="py-3 text-right" role="cell">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleEditOffice(off, idx)}
                                  title="Chỉnh sửa"
                                  className="p-1.5 rounded-lg border border-outline hover:bg-surface-variant/50 transition-colors accessibility-focus"
                                >
                                  <Icon name="edit" size="text-sm" />
                                </button>
                                <button
                                  onClick={() => handleDeleteOffice(idx)}
                                  title="Xóa"
                                  className="p-1.5 rounded-lg border border-outline hover:bg-error-container/10 text-error hover:border-error transition-colors accessibility-focus"
                                >
                                  <Icon name="delete" size="text-sm" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Phân hệ 2: Xem ý kiến đóng góp */}
            <div className="space-y-4 pt-6 border-t border-outline-variant/50">
              <div className="bg-surface-container dark:bg-tertiary border-2 border-outline-variant dark:border-outline rounded-2xl p-6 shadow-sm theme-transition">
                <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-inverse-on-surface mb-2 flex items-center gap-2">
                  <Icon name="feedback" className="text-primary" />
                  Ý kiến Đóng góp & Báo cáo Rào cản
                </h2>
                <p className="text-xs text-on-surface-variant dark:text-tertiary-fixed-dim mb-6">
                  Hiển thị phản hồi từ người sử dụng dịch vụ. Các báo cáo rào cản tiếp cận của NKT được đánh dấu ưu tiên.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs" role="table">
                    <thead>
                      <tr className="border-b border-outline-variant/60" role="row">
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Người gửi / Ngày gửi</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase" role="columnheader">Chủ đề</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-center" role="columnheader">Phân loại</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-center" role="columnheader">Trạng thái</th>
                        <th className="pb-3 font-bold text-on-surface-variant/70 uppercase text-right" role="columnheader">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="py-6 text-center text-on-surface-variant/60">Không nhận được phản hồi đóng góp nào.</td>
                        </tr>
                      ) : (
                        feedbacks.map((fb) => (
                          <tr key={fb.id} className="border-b border-outline-variant/30 last:border-b-0" role="row">
                            <td className="py-3 pr-2" role="cell">
                              <div className="font-bold text-on-surface dark:text-inverse-on-surface">{fb.name}</div>
                              <div className="text-[10px] text-on-surface-variant dark:text-tertiary-fixed-dim mt-0.5">{fb.contactInfo}</div>
                              <div className="text-[9px] text-on-surface-variant/60 mt-0.5">{new Date(fb.submittedAt).toLocaleString("vi-VN")}</div>
                            </td>
                            <td className="py-3 font-semibold text-on-surface-variant" role="cell">
                              <div>{fb.subject || "Không có tiêu đề"}</div>
                              <div className="text-[10px] text-primary mt-0.5">{fb.feedbackType}</div>
                            </td>
                            <td className="py-3 text-center" role="cell">
                              {fb.isBarrierReport ? (
                                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 font-bold text-[9px] rounded uppercase">
                                  Rào cản tiếp cận
                                </span>
                              ) : (
                                <span className="text-on-surface-variant/40">—</span>
                              )}
                            </td>
                            <td className="py-3 text-center" role="cell">
                              <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase ${
                                fb.status === "resolved" ? "bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300" : "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300"
                              }`}>
                                {fb.status === "resolved" ? "Đã xử lý" : "Chờ xử lý"}
                              </span>
                            </td>
                            <td className="py-3 text-right" role="cell">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => setViewingFeedback(fb)}
                                  title="Xem"
                                  className="p-1.5 rounded-lg border border-outline hover:bg-surface-variant/50 transition-colors accessibility-focus"
                                >
                                  <Icon name="visibility" size="text-sm" />
                                </button>
                                <button
                                  onClick={() => toggleFeedbackStatus(fb.id)}
                                  title={fb.status === "resolved" ? "Đánh dấu Chưa xử lý" : "Đánh dấu Đã xử lý"}
                                  className={`p-1.5 rounded-lg border transition-colors accessibility-focus ${
                                    fb.status === "resolved" ? "border-amber-500 text-amber-600 hover:bg-amber-50" : "border-teal-500 text-teal-600 hover:bg-teal-50"
                                  }`}
                                >
                                  <Icon name={fb.status === "resolved" ? "restart_alt" : "done_all"} size="text-sm" />
                                </button>
                                <button
                                  onClick={() => handleDeleteFeedback(fb.id)}
                                  title="Xóa"
                                  className="p-1.5 rounded-lg border border-outline hover:bg-error-container/10 text-error hover:border-error transition-colors accessibility-focus"
                                >
                                  <Icon name="delete" size="text-sm" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── View Feedback Modal ── */}
      {viewingFeedback && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-surface dark:bg-tertiary border-2 border-outline dark:border-outline-variant w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-outline-variant/50 bg-primary text-on-primary">
              <h2 className="font-bold text-base flex items-center gap-2">
                <Icon name="mail" />
                Chi tiết phản hồi góp ý
              </h2>
              <button
                onClick={() => setViewingFeedback(null)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors accessibility-focus"
              >
                <Icon name="close" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-on-surface dark:text-inverse-on-surface">
              <div>
                <span className="font-bold text-on-surface-variant uppercase block text-[10px] mb-1">Người gửi</span>
                <p className="font-semibold text-sm">{viewingFeedback.name}</p>
                <p className="text-on-surface-variant">{viewingFeedback.contactInfo}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-on-surface-variant uppercase block text-[10px] mb-1">Loại phản hồi</span>
                  <p className="font-semibold">{viewingFeedback.feedbackType}</p>
                </div>
                <div>
                  <span className="font-bold text-on-surface-variant uppercase block text-[10px] mb-1">Thời gian gửi</span>
                  <p className="font-semibold">{new Date(viewingFeedback.submittedAt).toLocaleString("vi-VN")}</p>
                </div>
              </div>
              <div>
                <span className="font-bold text-on-surface-variant uppercase block text-[10px] mb-1">Chủ đề</span>
                <p className="font-semibold text-sm">{viewingFeedback.subject || "Không có chủ đề"}</p>
              </div>
              <div className="bg-surface-container-high dark:bg-tertiary-container p-4 rounded-xl border border-outline-variant/60 leading-relaxed text-sm">
                {viewingFeedback.message}
              </div>
              {viewingFeedback.isBarrierReport && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 rounded-xl border border-red-200">
                  <Icon name="warning" />
                  <span className="font-bold text-[10px] uppercase">Góp ý báo cáo lỗi rào cản tiếp cận của NKT</span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-outline-variant/50 flex justify-end gap-3 bg-surface-container dark:bg-tertiary/40">
              <button
                onClick={() => {
                  toggleFeedbackStatus(viewingFeedback.id);
                  setViewingFeedback(null);
                }}
                className="bg-primary text-on-primary font-bold text-xs px-4 py-2 rounded-lg hover:bg-primary-container transition-all"
              >
                {viewingFeedback.status === "resolved" ? "Đánh dấu chưa xử lý" : "Đánh dấu đã xử lý"}
              </button>
              <button
                onClick={() => setViewingFeedback(null)}
                className="border border-outline px-4 py-2 rounded-lg font-bold text-xs hover:bg-surface-variant/30"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
