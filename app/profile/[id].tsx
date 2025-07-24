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
import { profiles } from "@/constants/data";
import { useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

const profileData = {
  id: 1,
  name: "Shafa Asadel",
  age: 20,
  distance: "2 km away",
  commonInterests: 4,
  image:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face",
  bio: "Music enthusiast, always on the lookout for new tunes and ready to share playlists. Let's discover new sounds and enjoy the rhythm of ❤️✨",
  aboutMe: [
    { icon: "👩", label: "Woman", color: "#f3e8ff", textColor: "#7c3aed" },
    { icon: "🌙", label: "Muslims", color: "#fef3c7", textColor: "#d97706" },
    { icon: "♉", label: "Taurus", color: "#f3e8ff", textColor: "#7c3aed" },
    { icon: "🚫", label: "Never", color: "#f3f4f6", textColor: "#374151" },
    { icon: "🍺", label: "Sometimes", color: "#fed7aa", textColor: "#ea580c" },
  ],
  interests: [
    { icon: "🎵", label: "Pop Punk", color: "#dbeafe", textColor: "#2563eb" },
    { icon: "☕", label: "Coffee", color: "#fef3c7", textColor: "#d97706" },
    { icon: "🥊", label: "Boxing", color: "#fecaca", textColor: "#dc2626" },
    {
      icon: "🎮",
      label: "Fifa Mobile",
      color: "#dcfce7",
      textColor: "#16a34a",
    },
    {
      icon: "⚽",
      label: "Real Madrid",
      color: "#dbeafe",
      textColor: "#2563eb",
    },
  ],
};

export default function ProfileDetails() {
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useLocalSearchParams();

  const profile = profiles.find((pro: any) => pro.id == id);

  // const user = profiles.find()

  const handlePass = () => {
    console.log("Passed on profile");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log("Liked profile");
  };

  const renderBadge = (item: any, index: number) => (
    <View key={index} style={[styles.badge]}>
      <Text style={[styles.badgeText, { color: "gray" }]}>{item.label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Profile Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: profile?.image }} style={styles.profileImage} />
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>10% Match</Text>
          </View>
          {/* Profile Info Overlay */}
          <View style={styles.profileOverlay}>
            <Text style={styles.profileName}>
              {profile?.name}, {profile?.age}
            </Text>

            <View style={styles.infoRow}>
              <View style={styles.infoBadge}>
                <Ionicons name="location" size={16} color="#f87171" />
                <Text style={styles.infoBadgeText}>{profileData.distance}</Text>
              </View>

              <View style={styles.infoBadge}>
                <Ionicons name="ellipse" size={16} color="lightgreen" />
                <Text style={styles.infoBadgeText}>Active today</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.bioText}>{profileData.bio}</Text>
        </View>

        {/* About Me Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <View style={styles.badgesContainer}>
            {profileData.aboutMe.map(renderBadge)}
          </View>
        </View>

        {/* Interest Section */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Interest</Text>
          <View style={styles.badgesContainer}>
            {profileData.interests.map(renderBadge)}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {/* Send Request */}
        <TouchableOpacity
          onPress={handleLike}
          style={styles.likeButton}
          activeOpacity={0.7}
        >
          <Ionicons name={"heart"} size={20} color="white" />
          <Text style={styles.likeButtonText}>Send Request</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 24,
    paddingVertical: 8,
  },
  statusTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  statusRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  signalDots: {
    flexDirection: "row",
    gap: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  imageContainer: {
    // marginHorizontal: 16,
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
    paddingVertical: 24,
  },
  lastSection: {
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "",
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
    backgroundColor: "transparent",
    paddingHorizontal: 32,
    paddingVertical: 24,
    alignItems: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginBottom: 16,
  },

  likeButton: {
    width: "100%",
    flexDirection: 'row',
    height: 50,
    borderRadius: 40,
    gap:8,
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
    color: 'white',
    fontSize:18,
  }
});
