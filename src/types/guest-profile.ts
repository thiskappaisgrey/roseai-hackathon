/**
 * Rosewood AI Guest Profile System
 * Core schema defining the structure of a personalized guest profile.
 *
 * Data flows: Social Media + Spotify + Concierge Notes → AI Engine → GuestProfile
 */

// ─── Raw Data Inputs ────────────────────────────────────────────

export interface SocialMediaData {
  platform: "instagram" | "twitter" | "linkedin" | "tiktok" | "facebook";
  handle: string;
  bio?: string;
  recentPosts?: SocialPost[];
  followers?: number;
  interests?: string[]; // extracted hashtags, topics
}

export interface SocialPost {
  content: string;
  date: string; // ISO 8601
  mediaType: "text" | "image" | "video" | "story";
  hashtags?: string[];
  location?: string;
  sentiment?: "positive" | "neutral" | "negative";
}

export interface SpotifyData {
  userId?: string;
  topArtists: SpotifyArtist[];
  topGenres: string[];
  recentPlaylists: SpotifyPlaylist[];
  listeningMood?: MoodProfile;
}

export interface SpotifyArtist {
  name: string;
  genres: string[];
}

export interface SpotifyPlaylist {
  name: string;
  description?: string;
  trackCount: number;
  dominantGenres: string[];
  dominantMood?: string; // e.g., "chill", "upbeat", "focus"
}

export interface MoodProfile {
  dominantMood: string;
  energy: "low" | "medium" | "high";
  valence: "melancholic" | "neutral" | "uplifting";
}

export interface ConciergeNote {
  date: string; // ISO 8601
  author: string; // staff member name
  category: ConciergeCategory;
  content: string;
  priority: "low" | "medium" | "high" | "critical";
}

export type ConciergeCategory =
  | "room_preference"
  | "dining"
  | "complaint"
  | "compliment"
  | "special_request"
  | "allergy"
  | "occasion"
  | "general";

// ─── Derived Preferences (AI-Generated) ────────────────────────

export interface DiningPreferences {
  dietaryRestrictions: string[]; // e.g., ["vegan", "gluten-free"]
  allergies: string[]; // e.g., ["shellfish", "tree nuts"]
  cuisinePreferences: RankedPreference[];
  diningStyle: "casual" | "fine_dining" | "room_service" | "mixed";
  mealNotes?: string; // e.g., "Prefers late dinners, skips breakfast"
  beveragePreferences?: string[]; // e.g., ["oat milk latte", "natural wine"]
  confidence: ConfidenceScore;
}

export interface RoomPreferences {
  temperature: "cool" | "moderate" | "warm";
  pillowType: "soft" | "medium" | "firm";
  bedConfiguration?: string; // e.g., "king, extra blankets"
  lighting: "dim" | "moderate" | "bright";
  minibarRequests?: string[]; // e.g., ["sparkling water", "dark chocolate"]
  bathroomPreferences?: string[]; // e.g., ["extra towels", "bath salts"]
  floorPreference?: "low" | "mid" | "high";
  viewPreference?: string; // e.g., "ocean", "garden", "city"
  turndownPreferences?: string;
  noisePreference: "silent" | "ambient" | "no_preference";
  scent?: string; // e.g., "lavender", "none"
  confidence: ConfidenceScore;
}

export interface AmbiancePreferences {
  musicGenres: string[];
  suggestedPlaylistMood: string; // e.g., "relaxing jazz for evening"
  inRoomMusicVolume: "off" | "soft" | "moderate";
  lobbyMusicNote?: string; // for staff awareness
  confidence: ConfidenceScore;
}

export interface ActivityPreferences {
  interests: RankedPreference[];
  fitnessActivities?: string[]; // e.g., ["yoga", "swimming", "running"]
  culturalInterests?: string[]; // e.g., ["modern art", "live jazz", "wine tasting"]
  outdoorVsIndoor: "outdoor" | "indoor" | "balanced";
  pacePreference: "relaxed" | "moderate" | "active";
  confidence: ConfidenceScore;
}

export interface CommunicationStyle {
  formality: "casual" | "professional" | "formal";
  preferredContactMethod: "phone" | "text" | "email" | "in_person" | "app";
  languagePreferences: string[]; // e.g., ["English", "Mandarin"]
  personalityTraits: string[]; // e.g., ["detail-oriented", "spontaneous", "private"]
  communicationNotes?: string;
  confidence: ConfidenceScore;
}

export interface SpecialOccasion {
  type: "birthday" | "anniversary" | "honeymoon" | "business" | "celebration" | "other";
  date?: string; // ISO 8601
  description: string;
  suggestedGestures: string[]; // e.g., ["champagne on arrival", "handwritten card"]
}

// ─── Utility Types ─────────────────────────────────────────────

export interface RankedPreference {
  name: string;
  rank: number; // 1 = highest
  source: DataSource;
}

export type DataSource = "social_media" | "spotify" | "concierge" | "inferred";

export interface ConfidenceScore {
  level: "low" | "medium" | "high";
  basedOn: DataSource[];
  notes?: string; // e.g., "Dietary preference inferred from 2 IG posts — confirm at check-in"
}

// ─── The Complete Guest Profile ────────────────────────────────

export interface GuestProfile {
  // Identity
  id: string;
  name: string;
  email?: string;
  phone?: string;
  loyaltyTier?: "standard" | "silver" | "gold" | "platinum";
  stayHistory: number; // total previous stays

  // Raw data (stored for re-analysis)
  rawData: {
    socialMedia: SocialMediaData[];
    spotify?: SpotifyData;
    conciergeNotes: ConciergeNote[];
  };

  // AI-derived preferences
  preferences: {
    dining: DiningPreferences;
    room: RoomPreferences;
    ambiance: AmbiancePreferences;
    activities: ActivityPreferences;
    communication: CommunicationStyle;
  };

  // Actionable outputs
  specialOccasions: SpecialOccasion[];
  staffBriefing: StaffBriefing;
  conciergeSummary: string; // markdown-formatted summary for the guest-facing page

  // Metadata
  profileVersion: number;
  generatedAt: string; // ISO 8601
  lastUpdated: string; // ISO 8601
  dataSourcesUsed: DataSource[];
  overallConfidence: ConfidenceScore;
}

// ─── Staff Briefing Output ─────────────────────────────────────

export interface StaffBriefing {
  guestName: string;
  stayDates: { checkIn: string; checkOut: string };

  /** Top 3-5 things staff must know before guest arrives */
  mustKnow: StaffNote[];

  /** Things the guest likes — use to delight */
  likes: string[];

  /** Things the guest dislikes or is sensitive to — avoid */
  dislikes: string[];

  /** Specific room setup instructions */
  roomSetup: string[];

  /** Pre-arrival tasks that should be completed */
  arrivalChecklist: ChecklistItem[];

  /** Any flags or warnings */
  alerts: StaffAlert[];
}

export interface StaffNote {
  category: string; // e.g., "Allergy", "VIP", "Occasion"
  note: string;
  priority: "info" | "important" | "critical";
}

export interface ChecklistItem {
  task: string;
  assignedTo: "housekeeping" | "front_desk" | "f_and_b" | "concierge" | "management";
  completed: boolean;
}

export interface StaffAlert {
  type: "allergy" | "complaint_history" | "vip" | "special_request" | "conflict";
  message: string;
  severity: "info" | "warning" | "critical";
}
