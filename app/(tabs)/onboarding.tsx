import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { onboardingPreferences, profiles } from "@/constants/data";
import { useLocalSearchParams, useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Type definitions
interface Profile {
  id: number;
  name: string;
  age: number;
  distance?: string;
  image: string;
  bio?: string;
  interests?: BadgeItem[];
}

interface BadgeItem {
  icon?: string;
  label: string;
  color?: string;
  textColor?: string;
}

interface OnboardingPreference {
  name: string;
  subheading: string;
  select_count: number;
  options: string[];
}

interface ProfileHeaderProps {
  profile: Profile;
  matchPercentage?: number;
  isOnline?: boolean;
}

interface InfoBadgeProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  text: string;
}

interface BioSectionProps {
  bio: string;
}

interface BadgeProps {
  item: string;
  index: number;
  isSelected?: boolean;
  onPress?: () => void;
}

interface BadgeSectionProps {
  title: string;
  subheading?: string;
  items: string[];
  selectCount?: number;
  selectedItems?: string[];
  onItemPress?: (item: string) => void;
  isLastSection?: boolean;
}

interface ActionButtonProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
}

// Header Component with dynamic badge
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  matchPercentage = 10,
  isOnline = true,
}) => (
  <View style={styles.imageContainer}>
    <Image source={{ uri: profile?.image }} style={styles.profileImage} />
    <View style={styles.discountBadge}>
      <Text style={styles.discountText}>{matchPercentage}% Match</Text>
    </View>
    <View style={styles.profileOverlay}>
      <Text style={styles.profileName}>
        {profile?.name}, {profile?.age}
      </Text>
      <View style={styles.infoRow}>
        <InfoBadge
          icon="location"
          iconColor="#f87171"
          text={profile?.distance || "2 km away"}
        />
        <InfoBadge
          icon="ellipse"
          iconColor={isOnline ? "lightgreen" : "gray"}
          text={isOnline ? "Active today" : "Offline"}
        />
      </View>
    </View>
  </View>
);

// Reusable Info Badge Component
const InfoBadge: React.FC<InfoBadgeProps> = ({ icon, iconColor, text }) => (
  <View style={styles.infoBadge}>
    <Ionicons name={icon} size={16} color={iconColor} />
    <Text style={styles.infoBadgeText}>{text}</Text>
  </View>
);

// Bio Section Component
const BioSection: React.FC<BioSectionProps> = ({ bio }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Bio</Text>
    <Text style={styles.bioText}>{bio}</Text>
  </View>
);

// Generic Badge Component for preferences
const Badge: React.FC<BadgeProps> = ({
  item,
  index,
  isSelected = false,
  onPress,
}) => (
  <TouchableOpacity
    key={index}
    style={[styles.badge, isSelected && styles.selectedBadge]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.badgeText, { color: isSelected ? "white" : "gray" }]}>
      {item}
    </Text>
  </TouchableOpacity>
);

// Badge Section Component (reusable for preferences)
const BadgeSection: React.FC<BadgeSectionProps> = ({
  title,
  subheading,
  items,
  selectCount = 1,
  selectedItems = [],
  onItemPress,
  isLastSection = false,
}) => (
  <View style={[styles.section, isLastSection && styles.lastSection]}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {subheading && <Text style={styles.sectionSubheading}>{subheading}</Text>}
    <View style={styles.badgesContainer}>
      {items.map((item, index) => (
        <Badge
          key={`${title}-${index}`}
          item={item}
          index={index}
          isSelected={selectedItems.includes(item)}
          onPress={() => onItemPress?.(item)}
        />
      ))}
    </View>
  </View>
);

// Main Onboarding Screen Component
const OnboardingScreen: React.FC = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<{
    [key: string]: string[];
  }>({});
  const { id } = useLocalSearchParams<{ id: string }>();

  const handlePreferenceSelect = (
    sectionName: string,
    item: string,
    selectCount: number
  ): void => {
    setSelectedPreferences((prev) => {
      const currentSelected = prev[sectionName] || [];

      if (currentSelected.includes(item)) {
        // Remove item if already selected
        return {
          ...prev,
          [sectionName]: currentSelected.filter(
            (selectedItem) => selectedItem !== item
          ),
        };
      } else {
        // Add item, but respect select_count limit
        const newSelected = [...currentSelected, item];
        if (newSelected.length > selectCount) {
          // Remove first item if we exceed the limit
          newSelected.shift();
        }
        return {
          ...prev,
          [sectionName]: newSelected,
        };
      }
    });
  };

  const handleSubmit = (): void => {
    console.log("Selected preferences:", selectedPreferences);
    // Handle form submission here
  };

  const getButtonText = (): string => {
    const totalSelected = Object.values(selectedPreferences).flat().length;
    return totalSelected > 0
      ? `Continue (${totalSelected} selected)`
      : "Continue";
  };

  const isFormComplete = (): boolean => {
    return onboardingPreferences.every((pref) => {
      const selected = selectedPreferences[pref.name] || [];
      return selected.length >= pref.select_count;
    });
  };

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {onboardingPreferences.map((preference, index) => (
          <BadgeSection
            key={`preference-${index}`}
            title={preference.name}
            subheading={preference.subheading}
            items={preference.options}
            selectCount={preference.select_count}
            selectedItems={selectedPreferences[preference.name] || []}
            onItemPress={(item) =>
              handlePreferenceSelect(
                preference.name,
                item,
                preference.select_count
              )
            }
            isLastSection={index === onboardingPreferences.length - 1}
          />
        ))}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <View style={styles.actionButtonWrapper}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#f3f3f3'}]} activeOpacity={0.7}>
            <Text style={[styles.likeButtonText, { color: 'black'}]}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionButtonWrapper}>
          <TouchableOpacity onPress={() => router.navigate('/(tabs)/pricing')} style={styles.actionButton} activeOpacity={0.7}>
            <Text style={styles.likeButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    paddingVertical: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    marginTop: 16,
    aspectRatio: 4 / 5,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor:
      "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)",
  },
  profileName: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  discountBadge: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "#ae2039",
    paddingHorizontal: 12,
    paddingVertical: 4,
    right: 16,
    top: 16,
    borderRadius: 7,
  },
  discountText: {
    color: "white",
    fontSize: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  infoBadgeText: {
    color: "white",
    fontSize: 14,
  },
  section: {
    paddingVertical: 20,
  },
  lastSection: {
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  sectionSubheading: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 16,
  },
  bioText: {
    color: "#374151",
    fontSize: 16,
    lineHeight: 24,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 25,
    backgroundColor: "#f9fafb",
    gap: 6,
  },
  selectedBadge: {
    backgroundColor: "#ae2039",
    borderColor: "#ae2039",
  },
  badgeIcon: {
    fontSize: 14,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    gap: 12,
  },
  
  actionButtonWrapper: {
    flex: 1,
  },
  
  actionButton: {
    height: 50,
    borderRadius: 40,
    backgroundColor: "#ae2039",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  likeButton: {
    width: "100%",
    flexDirection: "row",
    height: 50,
    borderRadius: 40,
    gap: 8,
    backgroundColor: "#ae2039",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  likeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
