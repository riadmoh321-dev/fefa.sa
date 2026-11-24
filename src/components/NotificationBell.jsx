/**
 * NotificationBell — bell icon with unread count badge, Radix Portal dropdown modal,
 * Web Audio chimes, native browser notifications, and in-app toasts.
 * Polls every 30 seconds for new notifications.
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Bell, UserPlus, Users, X, Check, Volume2, VolumeX, Sparkles, StickyNote, ExternalLink, AlertTriangle } from "lucide-react";
import { getNotifications, markNotificationsRead } from "../lib/dashboardActions";
import { useLanguage } from "../i18n/LanguageContext";
import {
  isSoundEnabled,
  setSoundEnabled,
  playNotificationChime,
  getBrowserNotificationPermission,
  requestBrowserNotificationPermission,
  triggerNotificationAlert,
  unlockAudio,
} from "../lib/notificationService";

export function NotificationBell({
  collapsed = false,
  side,
  align,
}) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const isRtl = language === "ar";
  const n = t("dashboard.notifications") || {};

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [browserPerm, setBrowserPerm] = useState(getBrowserNotificationPermission());

  // Track known notification IDs to detect newly arrived notifications during polling
  const initialFetchDoneRef = useRef(false);
  const knownIdsRef = useRef(new Set());

  // Listen to open event (e.g. from toast or native notification click)
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-fefa-notifications", handleOpen);
    return () => window.removeEventListener("open-fefa-notifications", handleOpen);
  }, []);

  // Listen to sound preference change from another instance
  useEffect(() => {
    const handleSoundChange = (e) => {
      if (e?.detail?.enabled !== undefined) {
        setSoundActive(e.detail.enabled);
      }
    };
    window.addEventListener("fefa-sound-pref-change", handleSoundChange);
    return () => window.removeEventListener("fefa-sound-pref-change", handleSoundChange);
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await getNotifications();
      const list = res.notifications || [];
      const unread = res.unreadCount ?? 0;

      // Detect newly arrived notifications
      if (initialFetchDoneRef.current) {
        const newUnread = list.filter(
          (item) => !knownIdsRef.current.has(item.id) && !item.isRead
        );
        if (newUnread.length > 0) {
          // Trigger chime + browser popup + in-app toast for newest notification
          triggerNotificationAlert(newUnread[0], { isRtl });
        }
      } else {
        initialFetchDoneRef.current = true;
      }

      // Record known IDs
      list.forEach((item) => knownIdsRef.current.add(item.id));

      setNotifications(list);
      setUnreadCount(unread);
    } catch (err) {
      console.warn("Failed to fetch notifications:", err);
    }
  }, [isRtl]);

  // Initial fetch + poll every 30 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;
    try {
      setLoading(true);
      const unreadIds = notifications.filter((item) => !item.isRead).map((item) => item.id);
      if (unreadIds.length > 0) {
        await markNotificationsRead({ data: { ids: unreadIds } });
        setNotifications((prev) =>
          prev.map((item) => (unreadIds.includes(item.id) ? { ...item, isRead: true } : item))
        );
        setUnreadCount(0);
      }
    } catch (err) {
      console.warn("Failed to mark notifications read:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkOneRead = async (id) => {
    try {
      await markNotificationsRead({ data: { ids: [id] } });
      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (err) {
      console.warn("Failed to mark notification read:", err);
    }
  };

  /** Navigate to the client detail when a notification has metadata. */
  const handleNotificationClick = async (item) => {
    // Mark as read if not already
    if (!item.isRead) {
      handleMarkOneRead(item.id);
    }

    const rowIndex = item.metadata?.clientRowIndex;
    if (rowIndex && item.type !== "sync_leads") {
      // Close the popover
      setOpen(false);

      // Navigate to dashboard with search param to auto-open client detail
      navigate({
        to: "/dashboard",
        search: { openClient: rowIndex },
      });

      // Dispatch custom event for pages already on /dashboard
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("open-fefa-client-detail", { detail: { rowIndex } })
        );
      }, 100);
    }
  };

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
    if (next) {
      playNotificationChime({ force: true });
    }
  };

  const handleRequestPermission = async () => {
    const perm = await requestBrowserNotificationPermission();
    setBrowserPerm(perm);
  };

  const formatTime = (ts) => {
    if (!ts) return "";
    const parts = ts.split(", ");
    if (parts.length === 2) {
      const timePart = parts[1];
      const datePart = parts[0];
      const [dd, mm] = datePart.split("/");
      return `${dd}/${mm} ${timePart.slice(0, 5)}`;
    }
    return ts;
  };

  const getIcon = (type) => {
    switch (type) {
      case "new_client":
      case "sync_leads":
        return <UserPlus className="h-4 w-4 text-emerald-600" />;
      case "client_transfer":
        return <Users className="h-4 w-4 text-blue-600" />;
      case "admin_note":
        return <StickyNote className="h-4 w-4 text-amber-600" />;
      case "admin_alert":
      case "staff_alert":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      default:
        return <Bell className="h-4 w-4 text-[#c5a044]" />;
    }
  };

  const effectiveSide = side || (collapsed ? (isRtl ? "left" : "right") : "top");
  const effectiveAlign = align || (collapsed ? "start" : (isRtl ? "end" : "start"));

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(val) => {
        if (val) unlockAudio();
        setOpen(val);
      }}
    >
      {/* Bell Trigger Button */}
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className={`relative inline-flex items-center justify-center rounded-xl transition-all hover:bg-[#efe8dc] active:scale-95 cursor-pointer ${collapsed ? "h-10 w-10" : "h-9 w-9"
            } ${open ? "bg-[#efe8dc] text-[#1a1510]" : "text-[#9e9385] hover:text-[#1a1510]"}`}
          title={n.title || "Notifications"}
          aria-label={n.title || "Notifications"}
        >
          <Bell className={collapsed ? "h-5 w-5" : "h-4 w-4"} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-xs ring-2 ring-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverPrimitive.Trigger>

      {/* Dropdown Panel rendered into document.body Portal */}
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={effectiveSide}
          align={effectiveAlign}
          sideOffset={10}
          collisionPadding={16}
          dir={isRtl ? "rtl" : "ltr"}
          className="z-[999] w-84 sm:w-96 max-w-[calc(100vw-32px)] max-h-[500px] overflow-hidden rounded-2xl border border-[#e5ddd0] bg-white shadow-[0_25px_60px_-15px_rgba(26,21,16,0.25)] flex flex-col focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#ede7dd] px-4 py-3 bg-[#faf7f2]">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#1a1510]">
                {n.title || "Notifications"}
              </h3>
              {unreadCount > 0 && (
                <span className="rounded-full bg-[#c5a044]/15 px-2 py-0.5 text-[10px] font-bold text-[#967420]">
                  {unreadCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={handleToggleSound}
                className={`rounded-lg p-1.5 transition cursor-pointer ${soundActive
                    ? "text-[#c5a044] hover:bg-[#c5a044]/10"
                    : "text-[#b5ab9b] hover:bg-[#efe8dc]"
                  }`}
                title={soundActive ? (n.soundOn || "Mute sound") : (n.soundOff || "Enable sound")}
              >
                {soundActive ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>

              {/* Test Sound Button */}
              {/* <button
                type="button"
                onClick={() => playNotificationChime({ force: true })}
                className="rounded-lg p-1.5 text-[#9e9385] hover:text-[#c5a044] hover:bg-[#efe8dc] transition cursor-pointer"
                title={n.testSound || "Test sound"}
              >
                <Sparkles className="h-3.5 w-3.5" />
              </button> */}

              {/* Mark all read */}
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  disabled={loading}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-[#c5a044] hover:bg-[#c5a044]/10 transition cursor-pointer"
                  title={n.markAllRead || "Mark all read"}
                >
                  <Check className="h-3 w-3" />
                  <span>{n.markAllRead || "Mark all read"}</span>
                </button>
              )}

              {/* Close */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-[#9e9385] hover:text-[#1a1510] hover:bg-[#efe8dc] transition cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Browser Notification Permission Banner (Desktop & Mobile) */}
          {browserPerm !== "granted" && browserPerm !== "unsupported" && (
            <div className="flex items-center justify-between gap-2 border-b border-[#ebdcc9] bg-[#fbf5eb] px-3.5 py-2 text-xs">
              <div className="flex items-center gap-2 text-[#7d5d17] min-w-0">
                <Bell className="h-3.5 w-3.5 shrink-0 text-[#c5a044]" />
                <span className="truncate text-[11px] font-medium">
                  {n.browserPrompt || "Enable browser pop-ups for desktop & mobile"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleRequestPermission}
                className="shrink-0 rounded-md bg-[#c5a044] px-2.5 py-1 text-[10px] font-bold text-white shadow-xs hover:bg-[#b59039] transition active:scale-95 cursor-pointer"
              >
                {n.enableBtn || "Enable"}
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#f0ebe3]">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-[#b5ab9b]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f0e8] mb-2.5 text-[#c5a044]/60">
                  <Bell className="h-6 w-6" />
                </div>
                <p className="text-xs font-medium">{n.noNotifications || "No notifications yet"}</p>
              </div>
            ) : (
              notifications.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`w-full text-start px-4 py-3 flex items-start gap-3 transition hover:bg-[#faf7f2] cursor-pointer ${!item.isRead ? "bg-[#c5a044]/[0.05]" : "bg-transparent"
                    }`}
                >
                  {/* Icon */}
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition ${!item.isRead
                        ? "bg-[#c5a044]/15 text-[#967420] shadow-xs"
                        : "bg-[#f5f0e8] text-[#9e9385]"
                      }`}
                  >
                    {getIcon(item.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs leading-relaxed ${!item.isRead
                          ? "text-[#1a1510] font-semibold"
                          : "text-[#5c5346]"
                        }`}
                    >
                      {item.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-[#b5ab9b]">
                        {formatTime(item.timestamp)}
                      </span>
                      {item.addedBy && (
                        <span className="text-[10px] text-[#b5ab9b]">
                          · {item.addedBy}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action indicator or unread dot */}
                  {item.metadata?.clientRowIndex && item.type !== "sync_leads" ? (
                    <span className={`mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition ${
                      !item.isRead
                        ? "bg-[#c5a044]/15 text-[#c5a044]"
                        : "bg-[#f0ebe3] text-[#b5ab9b] group-hover:text-[#967420]"
                    }`}>
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  ) : !item.isRead ? (
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c5a044] ring-2 ring-[#c5a044]/20" />
                  ) : null}
                </button>
              ))
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
