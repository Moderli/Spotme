export type EventStatus = "Live matching" | "Processing" | "Ready";

export type EventRecord = {
  id: string;
  name: string;
  venue: string;
  date: string;
  cover: string;
  photos: number;
  guests: number;
  matches: number;
  status: EventStatus;
  progress: number;
  qrActive: boolean;
};

export const dashboardEvents: EventRecord[] = [
  {
    id: "lake-como-wedding",
    name: "Lake Como Celebration",
    venue: "Villa Erba, Lake Como",
    date: "May 24, 2026",
    cover:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    photos: 2480,
    guests: 184,
    matches: 1206,
    status: "Live matching",
    progress: 92,
    qrActive: true,
  },
  {
    id: "atelier-launch",
    name: "Atelier Product Launch",
    venue: "Soho Studio, London",
    date: "May 20, 2026",
    cover:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    photos: 1642,
    guests: 328,
    matches: 987,
    status: "Ready",
    progress: 100,
    qrActive: true,
  },
  {
    id: "founders-retreat",
    name: "Founders Retreat",
    venue: "Aman Kyoto, Japan",
    date: "June 03, 2026",
    cover:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    photos: 384,
    guests: 42,
    matches: 126,
    status: "Processing",
    progress: 46,
    qrActive: false,
  },
];

export const activityFeed = [
  {
    title: "248 photos uploaded",
    detail: "Lake Como Celebration - 2 min ago",
    icon: "upload_file",
  },
  {
    title: "12 guests uploaded selfies",
    detail: "Atelier Product Launch - 18 min ago",
    icon: "face",
  },
  {
    title: "AI processing complete",
    detail: "1,206 matches made available - 43 min ago",
    icon: "auto_awesome",
  },
  {
    title: "WhatsApp notifications sent",
    detail: "87 guests reached - 1 hour ago",
    icon: "forum",
  },
];

export const eventActivity = [
  "248 original files received from Camera 03",
  "AI grouped 64 new faces with confirmed guests",
  "WhatsApp delivery completed for 87 guests",
  "QR access opened for reception gallery",
];

export const attendeeRows = [
  { name: "Amelia Stone", phone: "+44 7700 900 123", matches: 28, status: "Delivered", lastActive: "2 min ago" },
  { name: "Theo Parker", phone: "+44 7700 900 412", matches: 14, status: "Ready", lastActive: "11 min ago" },
  { name: "Maya Laurent", phone: "+33 6 12 34 56 78", matches: 31, status: "Delivered", lastActive: "22 min ago" },
  { name: "Daniel Cho", phone: "+1 415 555 0141", matches: 0, status: "Waiting", lastActive: "38 min ago" },
  { name: "Isla Bennett", phone: "+44 7700 900 811", matches: 19, status: "Ready", lastActive: "1 hour ago" },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
];

export function getEvent(eventId: string) {
  return dashboardEvents.find((event) => event.id === eventId);
}
