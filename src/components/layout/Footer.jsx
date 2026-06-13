import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

/**
 * Footer — Premium site footer with brand info, navigation links, and social
 *
 * Accessibility:
 *  - Semantic <footer> element
 *  - aria-label on footer nav
 *  - All links have focus-visible rings
 *  - Responsive: stacks vertically on mobile
 */

const FOOTER_LINKS = [
  { to: "/ve-chung-toi", label: "Về chúng tôi", icon: "info" },
  { to: "/dieu-khoan", label: "Điều khoản", icon: "description" },
  { to: "/bao-mat", label: "Bảo mật", icon: "shield" },
  { to: "/lien-he", label: "Liên hệ", icon: "mail" },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#111318] dark:bg-[#0a0c10]
                 text-gray-400 w-full mt-auto
                 border-t border-white/5 theme-transition"
    >
      <div
        className="max-w-[1440px] mx-auto px-4 md:px-margin-desktop
                   py-12 md:py-16"
      >
        {/* ── Top: Brand + Links ── */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                <Icon name="diversity_1" size="text-2xl" className="text-primary-fixed-dim" />
              </div>
              <span className="font-extrabold text-xl text-white">Hoà Nhập</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Cổng thông tin hỗ trợ tiếp cận dịch vụ, chính sách và cơ hội
              việc làm dành cho người khuyết tật tại Việt Nam.
            </p>
          </div>

          {/* Navigation Links */}
          <nav
            aria-label="Liên kết chân trang"
            className="flex flex-wrap gap-x-8 gap-y-3"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 text-sm text-gray-400
                           hover:text-white transition-colors duration-200
                           focus-visible:ring-2 focus-visible:ring-primary
                           rounded-md p-1 group"
              >
                <Icon name={link.icon} size="text-base"
                      className="opacity-50 group-hover:opacity-100 transition-opacity" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Hoà Nhập — Mọi quyền được bảo lưu.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Xây dựng với
            <Icon name="favorite" filled size="text-xs" className="text-rose-500" />
            cho cộng đồng NKT Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
