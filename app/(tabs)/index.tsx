import { navigationItems, profiles, tabs } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2;

export default function LikeYouScreen() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [likedProfiles, setLikedProfiles] = useState(new Set([3]));
  const router = useRouter();

  const toggleLike = (profileId: number) => {
    const newLikedProfiles = new Set(likedProfiles);
    newLikedProfiles.has(profileId)
      ? newLikedProfiles.delete(profileId)
      : newLikedProfiles.add(profileId);
    setLikedProfiles(newLikedProfiles);
  };

  const onProfilePress = (profileId: number) => {
    router.push(`/profile/${profileId}`);
  };

  const renderTabButton = (tab: any) => (
    <TouchableOpacity
      key={tab.label}
      style={[
        styles.tabButton,
        activeTab.label === tab.label
          ? styles.activeTabButton
          : styles.inactiveTabButton,
      ]}
      onPress={() => setActiveTab(tab)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.tabButtonText,
          activeTab.label === tab.label
            ? styles.activeTabText
            : styles.inactiveTabText,
        ]}
      >
        {tab.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <View style={styles.tabsContainer}>{tabs.map(renderTabButton)}</View>

      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>
          {activeTab?.title || "Hot Matched Users"}
        </Text>
        <TouchableOpacity>
          <Text>View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={profiles}
        renderItem={({ item, index }) => (
          <ProfileCard
            item={item}
            index={index}
            liked={likedProfiles.has(item.id)}
            onPress={onProfilePress}
            onLike={toggleLike}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.profileGrid}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
}

// COMPONENT: Profile Interests
const ProfileInterests = () => {
  const interests = ["cosplay", "shouju"];
  return (
    <View style={{ flexDirection: "row", gap: 4, marginTop: 5 }}>
      {interests.map((i) => (
        <Text
          key={i}
          style={{
            backgroundColor: "white",
            color: "black",
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 8,
            fontSize: 11,
          }}
        >
          {i}
        </Text>
      ))}
    </View>
  );
};

// COMPONENT: Profile Card
const ProfileCard = ({ item, index, liked, onPress, onLike }: any) => (
  <TouchableOpacity
    style={[styles.profileCard, { marginLeft: index % 2 === 0 ? 0 : 12 }]}
    onPress={() => onPress(item.id)}
    activeOpacity={0.8}
  >
    <Image source={{ uri: item.image }} style={styles.profileImage} />
    <View style={styles.gradientOverlay} />


    <View style={styles.discountBadge}>
      <Text style={styles.discountText}>10%</Text>
    </View>

    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>
        {item.name}, {item.age}
      </Text>
      <ProfileInterests />
    </View>

    {/* Like Overlay */}
    {liked && (
      <TouchableOpacity
        style={styles.likeOverlay}
        onPress={() => onLike(item.id)}
      >
        <View style={styles.likeButton}>
          <Ionicons name="heart" size={32} color="#ec4899" />
        </View>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: Number(StatusBar.currentHeight) + 16,
    paddingHorizontal: 24,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderRadius: 22,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: "#ae2039",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  inactiveTabButton: {
    backgroundColor: "transparent",
  },
  tabButtonText: {
    fontSize: 14,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "500",
  },
  inactiveTabText: {
    color: "#6b7280",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ae2039",
  },
  profileGrid: {
    paddingBottom: 120,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  profileCard: {
    width: cardWidth,
    aspectRatio: 3 / 4,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#e5e7eb",
    position: "relative",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "transparent",
  },
  discountBadge: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "#ae2039",
    paddingHorizontal: 8,
    right: 9,
    top: 9,
    borderRadius: 7,
  },
  discountText: {
    color: "white",
    fontSize: 12,
  },
  profileInfo: {
    position: "absolute",
    backgroundColor: "#00000044",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  profileName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  likeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  likeButton: {
    width: 64,
    height: 64,
    backgroundColor: "white",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
