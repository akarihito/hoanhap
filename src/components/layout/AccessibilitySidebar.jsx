import { useState, useCallback, useEffect } from "react";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import Icon from "../ui/Icon";
import SOSModal from "./SOSModal";

/**
 * AccessibilitySidebar — Fixed left toolbar (80px wide)
 *
 * Contains 7 accessibility tool buttons as specified in DESIGN.md:
 * 1. Đọc nội dung (TTS toggle)
 * 2. Tăng chữ (increase font scale)
 * 3. Giảm chữ (decrease font scale)
 * 4. Tương phản (high contrast toggle)
 * 5. Giao diện tối (dark mode toggle)
 * 6. Điều hướng (keyboard nav toggle)
 * 7. SOS (emergency — pinned to bottom)
 *
 * Each button is 64×64px with aria-label and aria-pressed (for toggles).
 * Tab order flows top-to-bottom within the sidebar.
 */

export default function AccessibilitySidebar() {
  const {
    state,
    increaseFontScale,
    decreaseFontScale,
    toggleDarkMode,
    toggleHighContrast,
    toggleScreenReader,
    toggleKeyboardNav,
  } = useAccessibility();

  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for SOS behavior
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSOS = useCallback(() => {
    if (isMobile) {
      // On mobile: directly trigger phone call
      window.location.href = "tel:115";
    } else {
      // On desktop/tablet: show modal
      setSosModalOpen(true);
    }
  }, [isMobile]);

  // Active state styling for toggle buttons
  const activeClasses =
    "bg-primary text-on-primary shadow-md";
  const inactiveClasses =
    "text-on-surface-variant/70 dark:text-gray-500 hover:bg-surface-variant dark:hover:bg-white/5 hover:text-primary dark:hover:text-inverse-primary";

  return (
    <>
      <aside
        aria-label="Thanh công cụ trợ năng"
        className="accessibility-sidebar fixed left-0 top-0 h-full w-sidebar-width z-50
                   bg-surface-container-lowest dark:bg-[#111318]
                   border-r border-outline-variant/30 dark:border-white/5
                   shadow-xl shadow-black/[0.03]
                   flex flex-col items-center py-6 space-y-2
                   theme-transition"
      >
        {/* Tool 1: Read Content (TTS) */}
        <button
          onClick={toggleScreenReader}
          aria-label="Đọc nội dung"
          aria-pressed={state.screenReader}
          className={`sidebar-tool-btn group transition-all duration-200 rounded-xl ${
            state.screenReader ? activeClasses : inactiveClasses
          }`}
        >
          <Icon
            name="volume_up"
            size="text-2xl"
            className="group-hover:scale-110 transition-transform"
          />
          <span className="icon-label">
            Đọc
            <br />
            nội dung
          </span>
        </button>

        {/* Tool 2: Increase Font Size */}
        <button
          onClick={increaseFontScale}
          aria-label={`Tăng cỡ chữ. Cỡ chữ hiện tại: ${Math.round(state.fontScale * 100)}%`}
          className={`sidebar-tool-btn group transition-all duration-200 rounded-xl ${inactiveClasses}`}
          disabled={state.fontScale >= 2.0}
        >
          <Icon
            name="text_increase"
            size="text-2xl"
            className="group-hover:scale-110 transition-transform"
          />
          <span className="icon-label">
            Tăng
            <br />
            chữ
          </span>
        </button>

        {/* Tool 3: Decrease Font Size */}
        <button
          onClick={decreaseFontScale}
          aria-label={`Giảm cỡ chữ. Cỡ chữ hiện tại: ${Math.round(state.fontScale * 100)}%`}
          className={`sidebar-tool-btn group transition-all duration-200 rounded-xl ${inactiveClasses}`}
          disabled={state.fontScale <= 0.8}
        >
          <Icon
            name="text_decrease"
            size="text-2xl"
            className="group-hover:scale-110 transition-transform"
          />
          <span className="icon-label">
            Giảm
            <br />
            chữ
          </span>
        </button>

        {/* Tool 4: High Contrast */}
        <button
          onClick={toggleHighContrast}
          aria-label="Tương phản cao"
          aria-pressed={state.highContrast}
          className={`sidebar-tool-btn group transition-all duration-200 rounded-xl ${
            state.highContrast ? activeClasses : inactiveClasses
          }`}
        >
          <Icon
            name="contrast"
            size="text-2xl"
            className="group-hover:scale-110 transition-transform"
          />
          <span className="icon-label">
            Tương
            <br />
            phản
          </span>
        </button>

        {/* Tool 5: Dark Mode */}
        <button
          onClick={toggleDarkMode}
          aria-label="Chế độ tối"
          aria-pressed={state.darkMode}
          className={`sidebar-tool-btn group transition-all duration-200 rounded-xl ${
            state.darkMode ? activeClasses : inactiveClasses
          }`}
        >
          <Icon
            name="dark_mode"
            size="text-2xl"
            className="group-hover:scale-110 transition-transform"
          />
          <span className="icon-label">
            Giao
            <br />
            diện tối
          </span>
        </button>

        {/* Tool 6: Keyboard Navigation */}
        <button
          onClick={toggleKeyboardNav}
          aria-label="Điều hướng bằng bàn phím"
          aria-pressed={state.keyboardNav}
          className={`sidebar-tool-btn group transition-all duration-200 rounded-xl ${
            state.keyboardNav ? activeClasses : inactiveClasses
          }`}
        >
          <Icon
            name="keyboard"
            size="text-2xl"
            className="group-hover:scale-110 transition-transform"
          />
          <span className="icon-label">
            Điều
            <br />
            hướng
          </span>
        </button>

        {/* Spacer — pushes SOS to bottom */}
        <div className="flex-grow" aria-hidden="true" />

        {/* Tool 7: SOS Emergency (pinned to bottom) */}
        <button
          onClick={handleSOS}
          aria-label="SOS Khẩn cấp — Liên hệ đường dây nóng"
          className="sidebar-tool-btn group
                     bg-gradient-to-b from-red-600 to-red-700
                     text-white
                     hover:from-red-500 hover:to-red-600
                     shadow-lg shadow-red-600/20
                     rounded-xl"
        >
          <Icon
            name="sos"
            size="text-2xl"
            className="font-bold group-hover:scale-110 transition-transform"
          />
          <span className="icon-label font-bold">SOS</span>
        </button>
      </aside>

      {/* SOS Modal (desktop only) */}
      <SOSModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
      />
    </>
  );
}
